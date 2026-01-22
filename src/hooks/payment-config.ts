export interface PaymentResult {
  success: boolean;
  signature?: string;
  error?: string;
}

export const PAYMENT_CONFIG = {
  RECEIVER_ADDRESS: '9UpVXGUJo2Hbgt2uw7UhUyNgusuYVdoHYnstV8J7wGt3',
  HEXI_TOKEN_MINT_ADDRESS: '3ghjaogpDVt7QZ6eNauoggmj4WYw23TkpyVN2yZjpump',
  AMOUNT_LAMPORTS: 5_000_000, // 0.005 SOL
  AMOUNT_HEXI_TOKENS: 15_000_000_000, // 15,000 HEXI Tokens
  CONFIRMATION_TIMEOUT_SECONDS: 30,
  POLL_INTERVAL_MS: 1000,
} as const;