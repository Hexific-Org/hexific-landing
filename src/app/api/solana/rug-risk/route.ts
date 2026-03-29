import { NextRequest, NextResponse } from 'next/server';

const HELIUS_API_KEY = process.env.NEXT_PUBLIC_HELIUS_API_KEY;
const HELIUS_RPC_URL = HELIUS_API_KEY
  ? `https://mainnet.helius-rpc.com/?api-key=${HELIUS_API_KEY}`
  : '';

type HolderInfo = {
  address: string;
  amountRaw: bigint;
  amountUi: number;
  percentOfSupply: number;
};

type ClusterAnalysis = {
  funding_wallet_overlap: boolean;
  wallet_creation_window_detected: boolean;
  shared_token_distribution_wallet: boolean;
  low_activity_wallets: boolean;
};

type Metrics = {
  top_holder_percent: number;
  top10_holder_percent: number;
  total_holders: number | null;
  liquidity_estimate_usd: number | null;
  token_age_days: number | null;
  mint_authority_active: boolean;
  freeze_authority_active: boolean;
  clustered_wallets_detected: boolean;
  suspected_cluster_size: number;
};

async function heliusRpc<T>(method: string, params: unknown[]): Promise<T> {
  if (!HELIUS_RPC_URL) {
    throw new Error('Missing Helius API key (HELIUS_API_KEY).');
  }

  const res = await fetch(HELIUS_RPC_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 'hexific-rug-risk',
      method,
      params,
    }),
    // Static analysis, no need for long-lived connections
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(`Helius RPC error: HTTP ${res.status}`);
  }

  const json = (await res.json()) as {
    result?: T;
    error?: { message?: string };
  };

  if (json.error) {
    throw new Error(json.error.message || 'Unknown Helius RPC error');
  }

  if (!('result' in json)) {
    throw new Error('Malformed Helius RPC response: missing result');
  }

  return json.result as T;
}

async function fetchTokenMetadata(mint: string) {
  type GetTokenSupplyResult = {
    value: {
      amount: string;
      decimals: number;
    };
  };

  type GetAccountInfoResult = {
    value: {
      data: {
        parsed: {
          info: {
            mintAuthority: string | null;
            freezeAuthority: string | null;
          };
        };
      };
    } | null;
  };

  const [supplyRes, accountInfo] = await Promise.all([
    heliusRpc<GetTokenSupplyResult>('getTokenSupply', [mint]),
    heliusRpc<GetAccountInfoResult>('getAccountInfo', [
      mint,
      { encoding: 'jsonParsed' },
    ]),
  ]);

  const parsedInfo = accountInfo.value?.data?.parsed?.info;

  let mintAuthorityActive = false;
  let freezeAuthorityActive = false;
  let totalSupplyRaw: bigint | null = null;
  let decimals = supplyRes?.value?.decimals ?? 0;

  if (parsedInfo) {
    mintAuthorityActive = parsedInfo.mintAuthority !== null;
    freezeAuthorityActive = parsedInfo.freezeAuthority !== null;
  }
  if (supplyRes?.value?.amount) {
    totalSupplyRaw = BigInt(supplyRes.value.amount);
  }

  type GetSignaturesResult = {
    value?: {
      signature: string;
      blockTime: number | null;
    }[];
  };

  // Use the earliest signature on the mint account as a proxy for token creation time.
  let creationBlockTime: number | null = null;
  try {
    const sigs = await heliusRpc<GetSignaturesResult>(
      'getSignaturesForAddress',
      [mint, { limit: 100 }],
    );
    const list = sigs.value ?? [];
    if (Array.isArray(list) && list.length > 0) {
      const earliest = list[list.length - 1];
      creationBlockTime = earliest?.blockTime ?? null;
      if (creationBlockTime == null && earliest?.signature) {
        try {
          const tx = await heliusRpc<{ blockTime: number | null } | null>(
            'getTransaction',
            [
              earliest.signature,
              { encoding: 'jsonParsed', maxSupportedTransactionVersion: 0 },
            ],
          );
          creationBlockTime = tx?.blockTime ?? null;
        } catch {
          creationBlockTime = null;
        }
      }
    }
  } catch {
    // If we cannot infer creation time from signatures, we leave it as null.
    creationBlockTime = null;
  }

  return {
    totalSupplyRaw,
    decimals,
    mintAuthorityActive,
    freezeAuthorityActive,
    creationBlockTime,
  };
}

async function fetchHolderDistribution(
  mint: string,
  totalSupplyRaw: bigint | null,
): Promise<{ holders: HolderInfo[]; topHolderPercent: number; top10Percent: number; totalHolders: number | null }> {
  type GetLargestResult = {
    value: {
      address: string;
      amount: string;
      uiAmount: number | null;
      uiAmountString: string;
    }[];
  };

  let holders: HolderInfo[] = [];
  let topHolderPercent = 0;
  let top10Percent = 0;

  try {
    const largest = await heliusRpc<GetLargestResult>(
      'getTokenLargestAccounts',
      [mint],
    );

    const supply =
      totalSupplyRaw ??
      largest.value.reduce<bigint>((acc, h) => acc + BigInt(h.amount), 0n);

    holders = largest.value.map((h) => {
      const amountRaw = BigInt(h.amount);
      const percentOfSupply =
        supply === 0n ? 0 : (Number(amountRaw) / Number(supply)) * 100;

      return {
        address: h.address,
        amountRaw,
        amountUi: h.uiAmount ?? parseFloat(h.uiAmountString),
        percentOfSupply,
      };
    });

    topHolderPercent = holders[0]?.percentOfSupply ?? 0;
    top10Percent = holders
      .slice(0, 10)
      .reduce((sum, h) => sum + h.percentOfSupply, 0);
  } catch (e: any) {
    const msg = (e?.message ?? String(e)).toLowerCase();
    // Some RPC providers incorrectly return "not a Token mint" for valid,
    // established tokens. In that case we gracefully fall back to having
    // no holder distribution rather than failing the entire analysis.
    if (
      msg.includes('not a token mint') ||
      msg.includes('invalid param')
    ) {
      holders = [];
      topHolderPercent = 0;
      top10Percent = 0;
    } else {
      throw e;
    }
  }

  // Rough holder count via program accounts; may be null if the query fails.
  let totalHolders: number | null = null;
  try {
    type GetProgramAccountsResult = {
      pubkey: string;
    }[];

    // SPL Token program id (Tokenkeg...) – standard for fungible tokens.
    const TOKEN_PROGRAM_ID = 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA';

    const programAccounts = await heliusRpc<GetProgramAccountsResult>(
      'getProgramAccounts',
      [
        TOKEN_PROGRAM_ID,
        {
          commitment: 'confirmed',
          encoding: 'base64',
          filters: [
            { dataSize: 165 },
            {
              memcmp: {
                offset: 0,
                bytes: mint,
              },
            },
          ],
        },
      ],
    );

    totalHolders = programAccounts.length;
  } catch {
    totalHolders = null;
  }

  return { holders, topHolderPercent, top10Percent, totalHolders };
}

async function estimateLiquidityUsd(_mint: string): Promise<number | null> {
  // Placeholder: precise on-chain AMM pool scraping is out-of-scope here.
  // For now we return null to mean "unknown", and we only add liquidity risk
  // points when we can confidently say liquidity is low.
  return null;
}

type WalletActivitySummary = {
  address: string;
  firstActivityTime: number | null;
  fundingWallet: string | null;
  txCount: number;
};

async function fetchWalletActivitySummary(
  address: string,
): Promise<WalletActivitySummary> {
  type GetSigs = {
    value?: {
      signature: string;
      blockTime: number | null;
    }[];
  };

  const sigs = await heliusRpc<GetSigs>('getSignaturesForAddress', [
    address,
    { limit: 50 },
  ]);

  const list = sigs.value ?? [];

  if (!Array.isArray(list) || list.length === 0) {
    return {
      address,
      firstActivityTime: null,
      fundingWallet: null,
      txCount: 0,
    };
  }

  const earliest = list[list.length - 1];
  const firstSignature = earliest.signature;

  type GetTx = {
    transaction: {
      message: {
        accountKeys: { pubkey: string }[];
      };
    };
    meta: {
      preBalances: number[];
      postBalances: number[];
    } | null;
    blockTime: number | null;
  } | null;

  let fundingWallet: string | null = null;
  let firstActivityTime: number | null = earliest.blockTime ?? null;

  try {
    const tx = await heliusRpc<GetTx>('getTransaction', [
      firstSignature,
      {
        encoding: 'jsonParsed',
        maxSupportedTransactionVersion: 0,
      },
    ]);

    if (tx && tx.meta) {
      const idx = tx.transaction.message.accountKeys.findIndex(
        (k) => k.pubkey === address,
      );
      if (idx >= 0) {
        let maxDecrease = 0;
        let sourceIdx = -1;
        tx.meta.preBalances.forEach((pre, i) => {
          const post = tx.meta?.postBalances[i] ?? pre;
          const diff = pre - post;
          if (diff > maxDecrease) {
            maxDecrease = diff;
            sourceIdx = i;
          }
        });
        if (sourceIdx >= 0) {
          fundingWallet = tx.transaction.message.accountKeys[sourceIdx]?.pubkey;
        }
      }
      firstActivityTime = tx.blockTime ?? firstActivityTime;
    }
  } catch {
    // Swallow transaction detail failures; we still have signatures.
  }

  return {
    address,
    firstActivityTime,
    fundingWallet,
    txCount: list.length,
  };
}

async function analyzeWalletClustering(
  holders: HolderInfo[],
): Promise<{
  metrics: Pick<Metrics, 'clustered_wallets_detected' | 'suspected_cluster_size'>;
  clusterAnalysis: ClusterAnalysis;
}> {
  const topHolders = holders.slice(0, 20);

  const summaries = await Promise.all(
    topHolders.map((h) => fetchWalletActivitySummary(h.address)),
  );

  const fundingMap = new Map<string, string[]>();
  for (const s of summaries) {
    if (s.fundingWallet) {
      const list = fundingMap.get(s.fundingWallet) ?? [];
      list.push(s.address);
      fundingMap.set(s.fundingWallet, list);
    }
  }

  let fundingWalletOverlap = false;
  let largestClusterSize = 0;
  for (const [, wallets] of fundingMap) {
    if (wallets.length >= 2) {
      fundingWalletOverlap = true;
    }
    if (wallets.length > largestClusterSize) {
      largestClusterSize = wallets.length;
    }
  }

  const times = summaries
    .map((s) => s.firstActivityTime)
    .filter((t): t is number => t != null);
  let walletCreationWindowDetected = false;
  if (times.length >= 2) {
    const minTime = Math.min(...times);
    const maxTime = Math.max(...times);
    walletCreationWindowDetected = maxTime - minTime <= 30 * 60;
  }

  const lowActivityCount = summaries.filter((s) => s.txCount <= 3).length;
  const lowActivityWallets =
    summaries.length > 0 &&
    lowActivityCount / summaries.length >= 0.5;

  // We do not have a robust token distribution trace here; approximate by
  // treating strong funding overlap as a proxy for shared distribution.
  const sharedTokenDistributionWallet = fundingWalletOverlap;

  const clusteredWalletsDetected =
    fundingWalletOverlap ||
    walletCreationWindowDetected ||
    sharedTokenDistributionWallet ||
    lowActivityWallets;

  return {
    metrics: {
      clustered_wallets_detected: clusteredWalletsDetected,
      suspected_cluster_size: largestClusterSize,
    },
    clusterAnalysis: {
      funding_wallet_overlap: fundingWalletOverlap,
      wallet_creation_window_detected: walletCreationWindowDetected,
      shared_token_distribution_wallet: sharedTokenDistributionWallet,
      low_activity_wallets: lowActivityWallets,
    },
  };
}

function computeRiskScore(
  params: {
    topHolderPercent: number;
    top10Percent: number;
    mintAuthorityActive: boolean;
    freezeAuthorityActive: boolean;
    liquidityUsd: number | null;
    tokenAgeDays: number | null;
    clusteredWalletsDetected: boolean;
    fundingWalletOverlap: boolean;
  },
): { score: number; reasons: string[] } {
  let score = 0;
  const reasons: string[] = [];

  if (params.top10Percent > 50) {
    score += 25;
    reasons.push(
      `Top 10 holders control approximately ${params.top10Percent.toFixed(
        1,
      )}% of the total supply.`,
    );
  }

  if (params.topHolderPercent > 20) {
    score += 20;
    reasons.push(
      `The largest holder controls approximately ${params.topHolderPercent.toFixed(
        1,
      )}% of the total supply.`,
    );
  }

  if (params.mintAuthorityActive) {
    score += 25;
    reasons.push(
      'The mint authority is still active, so more tokens can be created at any time.',
    );
  }

  if (params.freezeAuthorityActive) {
    score += 10;
    reasons.push(
      'The freeze authority is still active, so wallets could potentially be frozen.',
    );
  }

  if (params.liquidityUsd != null && params.liquidityUsd < 10_000) {
    score += 20;
    reasons.push(
      `On-chain liquidity appears to be low (estimated below $10,000), which makes it easier for large holders to move the price.`,
    );
  }

  if (params.tokenAgeDays != null && params.tokenAgeDays < 1) {
    score += 10;
    reasons.push(
      'The token is very new (less than 24 hours old), so there is limited market history.',
    );
  }

  if (params.clusteredWalletsDetected) {
    score += 30;
    reasons.push(
      'Multiple large holders show similar funding and activity patterns, which may indicate they are controlled by the same entity.',
    );
  }

  if (params.fundingWalletOverlap) {
    score += 20;
    reasons.push(
      'Several large holders were funded by the same wallet, suggesting possible developer-controlled wallets.',
    );
  }

  const clampedScore = Math.max(0, Math.min(100, score));
  return { score: clampedScore, reasons };
}

function scoreToLevel(score: number): 'LOW' | 'MEDIUM' | 'HIGH' {
  if (score <= 30) return 'LOW';
  if (score <= 60) return 'MEDIUM';
  return 'HIGH';
}

export async function POST(req: NextRequest) {
  try {
    if (!HELIUS_RPC_URL) {
      return NextResponse.json(
        {
          error:
            'Missing Helius API key. Please set HELIUS_API_KEY in the environment.',
        },
        { status: 500 },
      );
    }

    const body = await req.json().catch(() => ({}));
    const mint = (body.mint as string | undefined)?.trim();

    if (!mint) {
      return NextResponse.json(
        { error: 'Missing required field "mint".' },
        { status: 400 },
      );
    }

    const metadata = await fetchTokenMetadata(mint);
    const { holders, topHolderPercent, top10Percent, totalHolders } =
      await fetchHolderDistribution(mint, metadata.totalSupplyRaw);
    const liquidityUsd = await estimateLiquidityUsd(mint);

    const tokenAgeDays =
      metadata.creationBlockTime != null
        ? (Date.now() / 1000 - metadata.creationBlockTime) / 86400
        : null;

    const { metrics: clusterMetrics, clusterAnalysis } =
      await analyzeWalletClustering(holders);

    const { score, reasons } = computeRiskScore({
      topHolderPercent,
      top10Percent,
      mintAuthorityActive: metadata.mintAuthorityActive,
      freezeAuthorityActive: metadata.freezeAuthorityActive,
      liquidityUsd,
      tokenAgeDays,
      clusteredWalletsDetected: clusterMetrics.clustered_wallets_detected,
      fundingWalletOverlap: clusterAnalysis.funding_wallet_overlap,
    });

    const riskLevel = scoreToLevel(score);

    const response = {
      token: mint,
      risk_score: score,
      risk_level: riskLevel,
      reasons:
        reasons.length > 0
          ? reasons
          : [
              'No major on-chain risk signals were detected based on the current static checks. This is a risk detection result, not a guarantee of safety.',
            ],
      metrics: {
        top_holder_percent: parseFloat(topHolderPercent.toFixed(4)),
        top10_holder_percent: parseFloat(top10Percent.toFixed(4)),
        total_holders: totalHolders,
        liquidity_estimate_usd: liquidityUsd,
        token_age_days:
          tokenAgeDays != null
            ? parseFloat(tokenAgeDays.toFixed(3))
            : null,
        mint_authority_active: metadata.mintAuthorityActive,
        freeze_authority_active: metadata.freezeAuthorityActive,
        clustered_wallets_detected:
          clusterMetrics.clustered_wallets_detected,
        suspected_cluster_size: clusterMetrics.suspected_cluster_size,
      } satisfies Metrics,
      cluster_analysis: {
        funding_wallet_overlap: clusterAnalysis.funding_wallet_overlap,
        wallet_creation_window_detected:
          clusterAnalysis.wallet_creation_window_detected,
        shared_token_distribution_wallet:
          clusterAnalysis.shared_token_distribution_wallet,
        low_activity_wallets: clusterAnalysis.low_activity_wallets,
      } satisfies ClusterAnalysis,
      disclaimer:
        'This is a static on-chain risk detection analysis for potential rug-pull patterns. It does not prove that a token is a scam or guarantee future safety.',
    };

    return NextResponse.json(response);
  } catch (error: any) {
    console.error('Rug risk analyzer error:', error);

    const message = (error?.message ?? String(error)) as string;
    if (
      message.toLowerCase().includes('not a token mint') ||
      message.toLowerCase().includes('invalid param')
    ) {
      return NextResponse.json(
        {
          error:
            'The address you entered is not a valid SPL token mint on Solana. Please double-check the mint address and try again.',
          details: message,
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        error:
          'Failed to compute rug pull risk. This is a best-effort static analysis and not a guarantee of safety.',
        details: message,
      },
      { status: 500 },
    );
  }
}

