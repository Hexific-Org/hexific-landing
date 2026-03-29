'use client';

import { useState, useCallback, useRef } from "react";

// ─────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────

type RiskLevel = "LOW" | "MEDIUM" | "HIGH";
type FlagLevel = "ok" | "warn" | "bad";

interface Holder {
  tokenAccount: string;
  owner: string;
  balance: number;
  pct: number;
}

interface WalletData {
  address: string;
  txCount: number;
  oldestBlockTime: number | null;
  lowActivity: boolean;
}

interface Flag {
  text: string;
  lvl: FlagLevel;
}

interface AnalysisResult {
  token: string;
  risk_score: number;
  risk_level: RiskLevel;
  reasons: string[];
  metrics: {
    top_holder_percent: number;
    top10_holder_percent: number;
    total_holders: number;
    liquidity_estimate_usd: string;
    token_age_hours: number | null;
    mint_authority_active: boolean;
    freeze_authority_active: boolean;
    clustered_wallets_detected: boolean;
    suspected_cluster_size: number;
  };
  cluster_analysis: {
    funding_wallet_overlap: boolean;
    wallet_creation_window_detected: boolean;
    shared_token_distribution_wallet: boolean;
    low_activity_wallets: boolean;
  };
  // Internal — not in output JSON
  _flags: Flag[];
  _holders: Holder[];
}

type AppPhase = "idle" | "analyzing" | "done" | "error";

const STEPS = [
  { id: 1, lbl: "Metadata" },
  { id: 2, lbl: "Holders" },
  { id: 3, lbl: "Liquidity" },
  { id: 4, lbl: "Clustering" },
  { id: 5, lbl: "Scoring" },
];

// ─────────────────────────────────────────────────────────────────
// Utilities
// ─────────────────────────────────────────────────────────────────

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

function fmtNum(n: number): string {
  if (isNaN(n)) return "N/A";
  if (n >= 1e9) return (n / 1e9).toFixed(2) + "B";
  if (n >= 1e6) return (n / 1e6).toFixed(2) + "M";
  if (n >= 1e3) return (n / 1e3).toFixed(1) + "K";
  return n.toFixed(2);
}

function fmtAddr(a: string): string {
  return a ? `${a.slice(0, 6)}…${a.slice(-6)}` : "—";
}

async function rpc(key: string, method: string, params: unknown[]): Promise<unknown> {
  const res = await fetch(`https://mainnet.helius-rpc.com/?api-key=${key}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ jsonrpc: "2.0", id: "hexific", method, params }),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} — verify your Helius API key`);
  const j = await res.json();
  if (j.error) throw new Error(`RPC: ${j.error.message}`);
  return j.result;
}

// ─────────────────────────────────────────────────────────────────
// Gauge SVG
// ─────────────────────────────────────────────────────────────────

function Gauge({ score }: { score: number }) {
  const cx = 110, cy = 100, r = 82;
  const toRad = (a: number) => (a * Math.PI) / 180;
  const pt = (a: number) => ({
    x: +(cx + r * Math.cos(toRad(a))).toFixed(2),
    y: +(cy - r * Math.sin(toRad(a))).toFixed(2),
  });
  const arcPath = (from: number, to: number) => {
    if (Math.abs(from - to) < 0.05) return "";
    const s = pt(from), e = pt(to);
    return `M ${s.x} ${s.y} A ${r} ${r} 0 0 1 ${e.x} ${e.y}`;
  };
  const scoreAngle = 180 - score * 1.8;
  const needle = pt(scoreAngle);
  const c = score <= 30 ? "#22c55e" : score <= 60 ? "#f59e0b" : "#ef4444";

  return (
    <svg width="220" height="160" viewBox="0 0 220 160" style={{ overflow: "visible" }}>
      <path d={arcPath(180, 0)} fill="none" stroke="#0c1d35" strokeWidth="20" strokeLinecap="round" />
      <path d={arcPath(180, 126)} fill="none" stroke="#22c55e1a" strokeWidth="20" />
      <path d={arcPath(126, 72)} fill="none" stroke="#f59e0b1a" strokeWidth="20" />
      <path d={arcPath(72, 0)} fill="none" stroke="#ef44441a" strokeWidth="20" />
      {score > 0 && (
        <path d={arcPath(180, scoreAngle)} fill="none" stroke={c} strokeWidth="20" strokeLinecap="round" />
      )}
      <line x1={cx} y1={cy} x2={needle.x} y2={needle.y} stroke={c} strokeWidth="3" strokeLinecap="round" />
      <circle cx={cx} cy={cy} r="7" fill={c} />
      <text x={cx} y={cy + 36} textAnchor="middle" fill={c} fontSize="34"
        fontFamily="Orbitron,monospace" fontWeight="900">{score}</text>
      <text x={cx} y={cy + 54} textAnchor="middle" fill="#3d5870"
        fontSize="9" fontFamily="JetBrains Mono,monospace" letterSpacing="2">RISK SCORE / 100</text>
      <text x="18"  y={cy + 16} fill="#22c55e55" fontSize="9" fontFamily="monospace">LOW</text>
      <text x={cx}  y="14" textAnchor="middle" fill="#f59e0b55" fontSize="9" fontFamily="monospace">MEDIUM</text>
      <text x="202" y={cy + 16} textAnchor="end" fill="#ef444455" fontSize="9" fontFamily="monospace">HIGH</text>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────

function CardTitle({ children }: { children: React.ReactNode }) {
  return <div className="hx-card-title">{children}</div>;
}

function MetricCard({ label, value, cls }: { label: string; value: string | number; cls?: string }) {
  return (
    <div className="hx-mc">
      <div className="hx-mc-label">{label}</div>
      <div className={`hx-mc-val${cls ? " hx-" + cls : ""}`}>{value}</div>
    </div>
  );
}

function StepsRow({ current }: { current: number }) {
  return (
    <div className="hx-steps-row">
      {STEPS.map((s) => {
        const state = s.id < current ? "done" : s.id === current ? "active" : "";
        return (
          <div key={s.id} className={`hx-step-item${state ? " hx-" + state : ""}`}>
            <span className="hx-step-num">0{s.id}</span>
            <span className="hx-step-lbl">{s.lbl}</span>
          </div>
        );
      })}
    </div>
  );
}

function HoldersTable({ holders }: { holders: Holder[] }) {
  const maxPct = holders[0]?.pct || 1;
  return (
    <table className="hx-ht">
      <thead>
        <tr>
          <th style={{ width: 28 }}>#</th>
          <th>Owner Wallet</th>
          <th>Token Account</th>
          <th>Balance</th>
          <th>Share</th>
        </tr>
      </thead>
      <tbody>
        {holders.map((h, i) => {
          const barColor = h.pct > 20 ? "#ef4444" : h.pct > 10 ? "#f59e0b" : "#00c8e0";
          const barW = Math.min(100, (h.pct / maxPct) * 100).toFixed(1);
          return (
            <tr key={h.tokenAccount}>
              <td style={{ color: "var(--hx-dim)" }}>{i + 1}</td>
              <td title={h.owner}>{fmtAddr(h.owner)}</td>
              <td title={h.tokenAccount} style={{ color: "var(--hx-dim)" }}>{fmtAddr(h.tokenAccount)}</td>
              <td>{fmtNum(h.balance)}</td>
              <td>
                <div className="hx-bar-wrap">
                  <div className="hx-bar-fill" style={{ width: `${barW}%`, background: barColor }} />
                </div>
                {h.pct.toFixed(2)}%
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

// ─────────────────────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────────────────────

export default function HexificAnalyzer() {
  const [apiKey, setApiKey]     = useState("");
  const [mintAddr, setMintAddr] = useState("");
  const [phase, setPhase]       = useState<AppPhase>("idle");
  const [stepNum, setStepNum]   = useState(1);
  const [stepMsg, setStepMsg]   = useState("Initializing…");
  const [error, setError]       = useState<string | null>(null);
  const [result, setResult]     = useState<AnalysisResult | null>(null);
  const [jsonOpen, setJsonOpen] = useState(false);

  const abortRef = useRef(false);

  // ── Analysis runner ────────────────────────────────────────────
  const runAnalysis = useCallback(async () => {
    const key  = apiKey.trim();
    const mint = mintAddr.trim();
    if (!key || !mint) { setError("Please enter both your Helius API key and a token mint address."); return; }

    setError(null);
    setResult(null);
    setJsonOpen(false);
    setPhase("analyzing");
    abortRef.current = false;

    const step = (n: number, msg: string) => { setStepNum(n); setStepMsg(msg); };

    try {
      // ── STEP 1: Metadata ───────────────────────────────────────
      step(1, "Fetching token supply, decimals, and authorities…");

      const supplyRes = await rpc(key, "getTokenSupply", [mint]) as { value: { decimals: number; amount: string } };
      const decimals  = supplyRes.value.decimals;
      const totalSupply = Number(BigInt(supplyRes.value.amount)) / Math.pow(10, decimals);

      const mintInfoRes = await rpc(key, "getAccountInfo", [mint, { encoding: "jsonParsed" }]) as {
        value: { data: { parsed: { info: { mintAuthority: string | null; freezeAuthority: string | null } } } }
      };
      const mintParsed = mintInfoRes?.value?.data?.parsed?.info || {};
      const mintAuth   = mintParsed.mintAuthority   ?? null;
      const freezeAuth = mintParsed.freezeAuthority ?? null;

      let tokenAgeHours: number | null = null;
      try {
        const sigs = await rpc(key, "getSignaturesForAddress", [mint, { limit: 1000 }]) as Array<{ blockTime?: number }>;
        if (sigs?.length) {
          const oldest = sigs[sigs.length - 1];
          if (oldest.blockTime) tokenAgeHours = (Date.now() / 1000 - oldest.blockTime) / 3600;
        }
      } catch (_) {}

      await sleep(100);

      // ── STEP 2: Holder Distribution ────────────────────────────
      step(2, "Resolving top 20 token accounts and owner wallets…");

      const largestRes = await rpc(key, "getTokenLargestAccounts", [mint]) as {
        value: Array<{ address: string; amount: string; uiAmountString?: string }>
      };
      const tokenAccounts = (largestRes?.value || []).slice(0, 20);

      const holders: Holder[] = [];
      for (const acct of tokenAccounts) {
        try {
          const info = await rpc(key, "getAccountInfo", [acct.address, { encoding: "jsonParsed" }]) as {
            value: { data: { parsed: { info: { owner: string } } } }
          };
          const owner = info?.value?.data?.parsed?.info?.owner || acct.address;
          const bal   = parseFloat(acct.amount) / Math.pow(10, decimals);
          const pct   = totalSupply > 0 ? (bal / totalSupply) * 100 : 0;
          holders.push({ tokenAccount: acct.address, owner, balance: bal, pct });
        } catch (_) {
          const bal = parseFloat(acct.uiAmountString || "0");
          holders.push({
            tokenAccount: acct.address,
            owner: acct.address,
            balance: bal,
            pct: totalSupply > 0 ? (bal / totalSupply) * 100 : 0,
          });
        }
        await sleep(55);
      }

      const top1Pct  = holders[0]?.pct || 0;
      const top10Pct = holders.slice(0, 10).reduce((s, h) => s + h.pct, 0);

      // ── STEP 3: Liquidity ──────────────────────────────────────
      step(3, "Querying Jupiter for on-chain liquidity signals…");
      await sleep(180);

      let hasLiquidity   = false;
      let liquidityLabel = "None detected";

      const jupUrls = [
        `https://lite-api.jup.ag/price/v2?ids=${mint}`,
        `https://api.jup.ag/price/v2?ids=${mint}`,
      ];
      for (const url of jupUrls) {
        try {
          const r2 = await fetch(url);
          if (r2.ok) {
            const j2 = await r2.json() as { data: { [k: string]: { price: string } } };
            if (j2?.data?.[mint]?.price) {
              const price = parseFloat(j2.data[mint].price);
              hasLiquidity   = true;
              liquidityLabel = `$${price < 0.000001 ? price.toExponential(3) : price.toFixed(6)} / token`;
              break;
            }
          }
        } catch (_) {}
      }

      // ── STEP 4: Wallet Clustering ──────────────────────────────
      step(4, "Fetching wallet histories and detecting cluster patterns…");
      await sleep(100);

      const uniqueOwners = [...new Set(holders.map((h) => h.owner))].slice(0, 14);
      const walletData: WalletData[] = [];

      for (const owner of uniqueOwners) {
        try {
          const sigs = await rpc(key, "getSignaturesForAddress", [owner, { limit: 10 }]) as Array<{ blockTime?: number }>;
          walletData.push({
            address: owner,
            txCount: sigs?.length || 0,
            oldestBlockTime: sigs?.length ? sigs[sigs.length - 1]?.blockTime ?? null : null,
            lowActivity: (sigs?.length || 0) <= 3,
          });
        } catch (_) {
          walletData.push({ address: owner, txCount: 0, oldestBlockTime: null, lowActivity: true });
        }
        await sleep(70);
      }

      const times = walletData
        .filter((w) => w.oldestBlockTime !== null)
        .map((w) => w.oldestBlockTime as number)
        .sort((a, b) => a - b);

      let walletWindowDetected = false;
      if (times.length >= 3) {
        for (let i = 0; i <= times.length - 3; i++) {
          if (times[i + 2] - times[i] <= 1800) { walletWindowDetected = true; break; }
        }
      }

      const lowActivityCount  = walletData.filter((w) => w.lowActivity).length;
      const lowActivityFlag   = lowActivityCount >= 3;
      const fundingOverlap    = false;
      const sharedDistrib     = false;
      const clustersDetected  = walletWindowDetected || lowActivityFlag;

      // ── STEP 5: Scoring ────────────────────────────────────────
      step(5, "Computing deterministic risk score from all signals…");
      await sleep(420);

      let score = 0;
      const flags: Flag[] = [];

      if (top10Pct > 50) {
        score += 25;
        flags.push({ text: `Top 10 holders control ${top10Pct.toFixed(1)}% of supply — heavy concentration risk`, lvl: "bad" });
      }
      if (top1Pct > 20) {
        score += 20;
        flags.push({ text: `A single wallet holds ${top1Pct.toFixed(1)}% of all tokens — potential developer or whale wallet`, lvl: "bad" });
      }
      if (mintAuth) {
        score += 25;
        flags.push({ text: "Mint authority is still active — the creator can mint unlimited new tokens at any time, diluting your holdings", lvl: "bad" });
      }
      if (freezeAuth) {
        score += 10;
        flags.push({ text: "Freeze authority is active — the developer can freeze your token account, preventing you from selling", lvl: "warn" });
      }
      if (!hasLiquidity) {
        score += 20;
        flags.push({ text: "No liquidity detected on Solana DEXes — this token may be impossible to sell on the open market", lvl: "bad" });
      }
      if (tokenAgeHours !== null && tokenAgeHours < 24) {
        score += 10;
        flags.push({ text: `Token was created only ${tokenAgeHours.toFixed(1)} hours ago — no track record, extremely high uncertainty`, lvl: "warn" });
      }
      if (walletWindowDetected) {
        score += 30;
        flags.push({ text: "Multiple top-holder wallets appear to have been created within a 30-minute window — strong signal of developer wallet splitting (Pattern B)", lvl: "bad" });
      }
      if (lowActivityFlag) {
        score += 20;
        flags.push({ text: `${lowActivityCount} of ${walletData.length} analyzed holder wallets have very little on-chain history — likely shill or developer-controlled accounts (Pattern D)`, lvl: "bad" });
      }

      score = Math.max(0, Math.min(100, score));
      const riskLevel: RiskLevel = score <= 30 ? "LOW" : score <= 60 ? "MEDIUM" : "HIGH";

      if (flags.length === 0) {
        flags.push({ text: "No major risk signals detected. This token passed all static checks — always conduct further research before investing.", lvl: "ok" });
      }

      setResult({
        token: mint,
        risk_score: score,
        risk_level: riskLevel,
        reasons: flags.map((f) => f.text),
        metrics: {
          top_holder_percent:         +top1Pct.toFixed(2),
          top10_holder_percent:       +top10Pct.toFixed(2),
          total_holders:              holders.length,
          liquidity_estimate_usd:     liquidityLabel,
          token_age_hours:            tokenAgeHours !== null ? +tokenAgeHours.toFixed(1) : null,
          mint_authority_active:      !!mintAuth,
          freeze_authority_active:    !!freezeAuth,
          clustered_wallets_detected: clustersDetected,
          suspected_cluster_size:     lowActivityCount,
        },
        cluster_analysis: {
          funding_wallet_overlap:           fundingOverlap,
          wallet_creation_window_detected:  walletWindowDetected,
          shared_token_distribution_wallet: sharedDistrib,
          low_activity_wallets:             lowActivityFlag,
        },
        _flags:   flags,
        _holders: holders,
      });

      setPhase("done");
    } catch (err) {
      setError((err as Error).message || "Analysis failed. Check your API key and mint address.");
      setPhase("error");
    }
  }, [apiKey, mintAddr]);

  // ── Derived render state ───────────────────────────────────────
  const isAnalyzing = phase === "analyzing";
  const showResults = phase === "done" && result !== null;

  const riskColor = result
    ? result.risk_level === "LOW" ? "#22c55e"
    : result.risk_level === "MEDIUM" ? "#f59e0b" : "#ef4444"
    : "#00c8e0";

  const lvlColors: Record<FlagLevel, string> = { bad: "#ef4444", warn: "#f59e0b", ok: "#22c55e" };

  const clusterItems = result
    ? [
        { lbl: "Wallet creation time clustering (Pattern B)", detected: result.cluster_analysis.wallet_creation_window_detected, partial: false },
        { lbl: "Low on-chain activity wallets (Pattern D)",   detected: result.cluster_analysis.low_activity_wallets,            partial: false },
        { lbl: "Shared funding source wallet (Pattern A)",    detected: result.cluster_analysis.funding_wallet_overlap,          partial: true  },
        { lbl: "Shared token distribution wallet (Pattern C)",detected: result.cluster_analysis.shared_token_distribution_wallet,partial: true  },
      ]
    : [];

  const metricCards = result
    ? [
        { lbl: "Top Holder",           value: `${result.metrics.top_holder_percent}%`,   cls: result.metrics.top_holder_percent > 20 ? "bad" : result.metrics.top_holder_percent > 10 ? "warn" : "ok" },
        { lbl: "Top 10 Holders",       value: `${result.metrics.top10_holder_percent}%`,  cls: result.metrics.top10_holder_percent > 50 ? "bad" : result.metrics.top10_holder_percent > 35 ? "warn" : "ok" },
        { lbl: "Accounts Analyzed",    value: result.metrics.total_holders,               cls: "" },
        { lbl: "DEX Liquidity",        value: result.metrics.liquidity_estimate_usd !== "None detected" ? "Detected" : "None", cls: result.metrics.liquidity_estimate_usd !== "None detected" ? "ok" : "bad" },
        { lbl: "Token Age",            value: result.metrics.token_age_hours !== null ? `${Math.round(result.metrics.token_age_hours)}h` : "Unknown", cls: result.metrics.token_age_hours !== null && result.metrics.token_age_hours < 24 ? "warn" : "ok" },
        { lbl: "Mint Authority",       value: result.metrics.mint_authority_active ? "Active" : "Revoked",   cls: result.metrics.mint_authority_active ? "bad" : "ok" },
        { lbl: "Freeze Authority",     value: result.metrics.freeze_authority_active ? "Active" : "Revoked", cls: result.metrics.freeze_authority_active ? "warn" : "ok" },
        { lbl: "Low-Activity Wallets", value: result.metrics.suspected_cluster_size,     cls: result.metrics.suspected_cluster_size >= 3 ? "bad" : result.metrics.suspected_cluster_size >= 1 ? "warn" : "ok" },
      ]
    : [];

  const outputJson = result
    ? (() => {
        const { _flags, _holders, ...clean } = result;
        void _flags; void _holders;
        return JSON.stringify(clean, null, 2);
      })()
    : "";

  const summaries: Record<RiskLevel, string> = {
    LOW:    "This token shows few notable red flags in our static analysis. Proceed with standard caution and always do your own research.",
    MEDIUM: "Several risk indicators were detected. This token exhibits patterns common in high-risk or early-stage projects. Significant caution is advised.",
    HIGH:   "Multiple serious risk signals detected. This token matches several patterns strongly associated with rug pulls. Extreme caution is advised.",
  };

  // ─────────────────────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────────────────────
  return (
    <>
      <style>{CSS}</style>

      {/* ── Header ───────────────────────────────────────────── */}
      <header className="hx-header">
        <div className="hx-logo">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.18L20 8.5v7L12 19.82 4 15.5v-7L12 4.18z" />
          </svg>
          Hexific
        </div>
        <div className="hx-tagline">SPL Token Rug Pull Risk Analyzer · v1.0</div>
      </header>

      <div className="hx-wrap">

        {/* ── Input Card ──────────────────────────────────────── */}
        <div className="hx-card">
          <CardTitle>Configuration</CardTitle>

          <label className="hx-label">Helius API Key</label>
          <input
            className="hx-input"
            type="password"
            placeholder="Enter your Helius API key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            disabled={isAnalyzing}
          />

          <label className="hx-label">Token Mint Address</label>
          <input
            className="hx-input"
            type="text"
            placeholder="e.g. So11111111111111111111111111111111111111112"
            value={mintAddr}
            onChange={(e) => setMintAddr(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !isAnalyzing && runAnalysis()}
            disabled={isAnalyzing}
          />

          <div className="hx-btn-row">
            <button
              className="hx-btn hx-btn-primary"
              onClick={runAnalysis}
              disabled={isAnalyzing}
            >
              {isAnalyzing ? "Analyzing…" : "Analyze Token"}
            </button>
            <button
              className="hx-btn hx-btn-ghost"
              onClick={() => setMintAddr("So11111111111111111111111111111111111111112")}
              disabled={isAnalyzing}
            >
              Demo
            </button>
          </div>

          <p className="hx-hint">
            Get a free Helius API key at{" "}
            <a href="https://dev.helius.xyz" className="hx-link">dev.helius.xyz</a>.
            Analysis makes ~60 RPC calls — free tier is sufficient for occasional use.
          </p>
        </div>

        {/* ── Error ────────────────────────────────────────────── */}
        {(phase === "error" || error) && error && (
          <div className="hx-err-panel">⚠ {error}</div>
        )}

        {/* ── Progress ─────────────────────────────────────────── */}
        {isAnalyzing && (
          <div className="hx-card">
            <StepsRow current={stepNum} />
            <div className="hx-step-msg">
              <div className="hx-pulse" />
              <span>{stepMsg}</span>
            </div>
          </div>
        )}

        {/* ── Results ──────────────────────────────────────────── */}
        {showResults && result && (
          <>
            {/* Gauge + badge */}
            <div className="hx-gauge-card">
              <div className="hx-gauge-wrap">
                <Gauge score={result.risk_score} />
              </div>
              <div className="hx-gauge-info">
                <div
                  className="hx-risk-badge"
                  style={{ color: riskColor, borderColor: riskColor, background: `${riskColor}12` }}
                >
                  {result.risk_level} RISK
                </div>
                <p className="hx-risk-summary">{summaries[result.risk_level]}</p>
                <div className="hx-token-addr">{result.token}</div>
              </div>
            </div>

            {/* Metrics */}
            <div className="hx-metrics-grid">
              {metricCards.map((m) => (
                <MetricCard key={m.lbl} label={m.lbl} value={m.value} cls={m.cls} />
              ))}
            </div>

            {/* Reasons */}
            <div className="hx-card">
              <CardTitle>Risk Signals Detected</CardTitle>
              <div>
                {result._flags.map((f, i) => (
                  <div key={i} className="hx-reason-item">
                    <div className="hx-rdot" style={{ background: lvlColors[f.lvl] }} />
                    <div className="hx-rtxt">{f.text}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Clustering */}
            <div className="hx-card">
              <CardTitle>Wallet Clustering Analysis</CardTitle>
              <div className="hx-cluster-grid">
                {clusterItems.map((ci) => {
                  const color  = ci.detected ? "#ef4444" : ci.partial ? "#3d5870" : "#22c55e";
                  const status = ci.detected ? "DETECTED" : ci.partial ? "PARTIAL" : "CLEAR";
                  return (
                    <div key={ci.lbl} className="hx-ci">
                      <div className="hx-cdot" style={{ background: color }} />
                      <div className="hx-clbl">{ci.lbl}</div>
                      <div className="hx-cstatus" style={{ color }}>{status}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Holders */}
            <div className="hx-card">
              <CardTitle>Top Holder Distribution</CardTitle>
              <HoldersTable holders={result._holders} />
            </div>

            {/* JSON toggle */}
            <button className="hx-json-btn" onClick={() => setJsonOpen((o) => !o)}>
              <span>{jsonOpen ? "▼" : "▶"}</span> View Raw JSON Output
            </button>
            {jsonOpen && <pre className="hx-json-pre">{outputJson}</pre>}

            {/* Disclaimer */}
            <div className="hx-disclaimer">
              This tool detects early risk signals associated with rug pulls — it does not guarantee a token is a scam.
              <br />
              Always conduct your own research. Not financial advice.
            </div>
          </>
        )}
      </div>

      <footer className="hx-footer">
        HEXIFIC · SPL TOKEN RUG PULL RISK ANALYZER · NOT FINANCIAL ADVICE
      </footer>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────
// Styles (injected as a <style> tag — no external CSS dependency)
// ─────────────────────────────────────────────────────────────────

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=JetBrains+Mono:wght@400;600&family=Manrope:wght@400;500;600;700&display=swap');

:root {
  --hx-bg:    #020c1a;
  --hx-s1:    #040f20;
  --hx-s2:    #071428;
  --hx-b1:    #0e2038;
  --hx-b2:    #163050;
  --hx-cyan:  #00c8e0;
  --hx-cyan-d:#007a8f;
  --hx-text:  #b2cfe8;
  --hx-dim:   #3d5870;
  --hx-muted: #5a7a94;
  --hx-green: #22c55e;
  --hx-amber: #f59e0b;
  --hx-red:   #ef4444;
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

body {
  background: var(--hx-bg);
  background-image:
    linear-gradient(rgba(0,200,224,.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,200,224,.025) 1px, transparent 1px);
  background-size: 38px 38px;
  color: var(--hx-text);
  font-family: 'Manrope', sans-serif;
  font-size: 15px;
  line-height: 1.6;
  min-height: 100vh;
}

.hx-header {
  display: flex;
  align-items: center;
  padding: 22px 40px;
  border-bottom: 1px solid var(--hx-b1);
  background: rgba(2,12,26,.85);
  backdrop-filter: blur(6px);
  position: sticky;
  top: 0;
  z-index: 10;
}

.hx-logo {
  font-family: 'Orbitron', monospace;
  font-size: 20px;
  font-weight: 900;
  color: var(--hx-cyan);
  letter-spacing: 5px;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 10px;
}
.hx-logo svg { width: 22px; height: 22px; fill: var(--hx-cyan); }

.hx-tagline {
  margin-left: auto;
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  color: var(--hx-dim);
  letter-spacing: 2px;
  text-transform: uppercase;
}

.hx-wrap { max-width: 920px; margin: 0 auto; padding: 36px 24px 60px; }

.hx-card {
  background: var(--hx-s1);
  border: 1px solid var(--hx-b1);
  border-radius: 12px;
  padding: 26px 30px;
  margin-bottom: 18px;
}

.hx-card-title {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  color: var(--hx-cyan);
  letter-spacing: 3px;
  text-transform: uppercase;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.hx-card-title::before {
  content: '';
  width: 5px; height: 5px;
  background: var(--hx-cyan);
  border-radius: 1px;
  transform: rotate(45deg);
  flex-shrink: 0;
}

.hx-label {
  display: block;
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  color: var(--hx-muted);
  letter-spacing: 1.5px;
  text-transform: uppercase;
  margin-bottom: 7px;
}

.hx-input {
  width: 100%;
  background: var(--hx-s2);
  border: 1px solid var(--hx-b2);
  border-radius: 8px;
  padding: 11px 15px;
  color: var(--hx-text);
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  outline: none;
  transition: border-color .2s;
  margin-bottom: 18px;
}
.hx-input:focus { border-color: var(--hx-cyan-d); }
.hx-input::placeholder { color: var(--hx-dim); }
.hx-input:disabled { opacity: .5; }

.hx-btn-row { display: flex; gap: 10px; margin-top: 4px; }

.hx-btn {
  padding: 13px;
  border-radius: 8px;
  font-family: 'Orbitron', monospace;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 3px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all .2s;
  border: none;
}

.hx-btn-primary {
  flex: 1;
  background: transparent;
  border: 1px solid var(--hx-cyan);
  color: var(--hx-cyan);
}
.hx-btn-primary:hover:not(:disabled) { background: var(--hx-cyan); color: #000; }
.hx-btn-primary:disabled { opacity: .35; cursor: not-allowed; }

.hx-btn-ghost {
  flex: 0 0 auto;
  padding: 13px 20px;
  background: transparent;
  border: 1px solid var(--hx-b2);
  color: var(--hx-muted);
}
.hx-btn-ghost:hover:not(:disabled) { color: var(--hx-text); }
.hx-btn-ghost:disabled { opacity: .35; cursor: not-allowed; }

.hx-hint { margin-top: 14px; font-size: 12px; color: var(--hx-dim); }
.hx-link { color: var(--hx-cyan-d); }

.hx-err-panel {
  background: rgba(239,68,68,.07);
  border: 1px solid rgba(239,68,68,.28);
  border-radius: 10px;
  padding: 14px 18px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  color: var(--hx-red);
  margin-bottom: 18px;
}

.hx-steps-row { display: flex; margin-bottom: 18px; }
.hx-step-item {
  flex: 1; text-align: center;
  padding: 10px 4px;
  position: relative;
}
.hx-step-item + .hx-step-item::before {
  content: '';
  position: absolute; top: 50%; left: 0;
  width: 1px; height: 50%;
  transform: translateY(-50%);
  background: var(--hx-b2);
}
.hx-step-num {
  display: block;
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px; color: var(--hx-dim);
  margin-bottom: 3px;
}
.hx-step-lbl { font-size: 11px; color: var(--hx-dim); }
.hx-done .hx-step-num, .hx-done .hx-step-lbl { color: var(--hx-green); }
.hx-active .hx-step-num, .hx-active .hx-step-lbl { color: var(--hx-cyan); }

.hx-step-msg {
  display: flex; align-items: center; justify-content: center; gap: 8px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px; color: var(--hx-muted);
  padding: 8px;
}
.hx-pulse {
  width: 6px; height: 6px;
  background: var(--hx-cyan); border-radius: 50%;
  animation: hx-pulse 1s ease-in-out infinite;
}
@keyframes hx-pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: .25; transform: scale(.5); }
}

.hx-gauge-card {
  background: var(--hx-s1);
  border: 1px solid var(--hx-b1);
  border-radius: 12px;
  padding: 30px 36px;
  display: flex; align-items: center; gap: 40px;
  margin-bottom: 18px;
}
.hx-gauge-wrap { flex-shrink: 0; }
.hx-gauge-info { flex: 1; }

.hx-risk-badge {
  display: inline-block;
  font-family: 'Orbitron', monospace;
  font-size: 20px; font-weight: 900;
  letter-spacing: 4px; padding: 6px 16px;
  border-radius: 4px; margin-bottom: 14px;
  border: 1px solid;
}
.hx-risk-summary { font-size: 14px; color: var(--hx-muted); line-height: 1.7; max-width: 380px; }
.hx-token-addr {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px; color: var(--hx-dim);
  margin-top: 12px; word-break: break-all;
}

.hx-metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 12px; margin-bottom: 18px;
}
.hx-mc {
  background: var(--hx-s1); border: 1px solid var(--hx-b1);
  border-radius: 10px; padding: 15px 18px;
}
.hx-mc-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px; color: var(--hx-dim);
  letter-spacing: 1.5px; text-transform: uppercase;
  margin-bottom: 7px;
}
.hx-mc-val {
  font-family: 'JetBrains Mono', monospace;
  font-size: 17px; font-weight: 600; color: var(--hx-text);
}
.hx-mc-val.hx-ok   { color: var(--hx-green); }
.hx-mc-val.hx-warn { color: var(--hx-amber); }
.hx-mc-val.hx-bad  { color: var(--hx-red);   }

.hx-reason-item {
  display: flex; align-items: flex-start; gap: 12px;
  padding: 12px 0; border-bottom: 1px solid var(--hx-b1);
}
.hx-reason-item:last-child { border-bottom: none; }
.hx-rdot {
  width: 6px; height: 6px; border-radius: 50%;
  flex-shrink: 0; margin-top: 7px;
}
.hx-rtxt { font-size: 14px; color: var(--hx-text); line-height: 1.65; }

.hx-cluster-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }
.hx-ci {
  background: var(--hx-s2); border: 1px solid var(--hx-b1);
  border-radius: 8px; padding: 13px 16px;
  display: flex; align-items: center; gap: 10px;
}
.hx-cdot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }
.hx-clbl { font-size: 12px; color: var(--hx-muted); flex: 1; }
.hx-cstatus {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px; font-weight: 600; letter-spacing: 1px;
}

.hx-ht { width: 100%; border-collapse: collapse; font-family: 'JetBrains Mono', monospace; font-size: 11px; }
.hx-ht th {
  text-align: left; color: var(--hx-dim);
  font-size: 9px; letter-spacing: 1.5px; text-transform: uppercase;
  padding: 8px 0; border-bottom: 1px solid var(--hx-b2);
}
.hx-ht td {
  padding: 9px 0; border-bottom: 1px solid var(--hx-b1);
  color: var(--hx-muted); vertical-align: middle;
}
.hx-ht tr:last-child td { border-bottom: none; }

.hx-bar-wrap {
  width: 70px; height: 3px;
  background: var(--hx-b2); border-radius: 2px;
  display: inline-block; margin-right: 6px;
  vertical-align: middle;
}
.hx-bar-fill { height: 100%; border-radius: 2px; transition: width .4s; }

.hx-json-btn {
  width: 100%;
  background: none; border: 1px solid var(--hx-b2);
  border-radius: 8px; padding: 10px 16px;
  color: var(--hx-muted);
  font-family: 'JetBrains Mono', monospace; font-size: 11px;
  cursor: pointer; letter-spacing: 1px;
  display: flex; align-items: center; gap: 8px;
  margin-bottom: 10px; text-align: left;
}
.hx-json-btn:hover { border-color: var(--hx-cyan-d); color: var(--hx-cyan); }

.hx-json-pre {
  background: var(--hx-s2); border: 1px solid var(--hx-b1);
  border-radius: 8px; padding: 20px;
  font-family: 'JetBrains Mono', monospace; font-size: 11px;
  color: var(--hx-muted); white-space: pre; overflow: auto;
  line-height: 1.7; max-height: 480px;
  margin-bottom: 18px;
}

.hx-disclaimer {
  text-align: center; padding: 16px 0 0;
  color: var(--hx-dim); font-size: 11px;
  font-family: 'JetBrains Mono', monospace;
  line-height: 2; border-top: 1px solid var(--hx-b1); margin-top: 8px;
}

.hx-footer {
  text-align: center; padding: 22px;
  border-top: 1px solid var(--hx-b1);
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px; color: var(--hx-dim); letter-spacing: 2px;
}

@media (max-width: 640px) {
  .hx-header    { padding: 16px 20px; flex-wrap: wrap; }
  .hx-tagline   { display: none; }
  .hx-wrap      { padding: 20px 16px 40px; }
  .hx-card      { padding: 20px; }
  .hx-gauge-card{ padding: 20px; flex-direction: column; align-items: center; text-align: center; }
  .hx-cluster-grid { grid-template-columns: 1fr; }
  .hx-step-lbl  { display: none; }
}
`;