/**
 * Article slugs required to earn the HexiLearn certificate.
 * Must match the articles we track in ProgressTracker (detail pages only).
 */
export const REQUIRED_CERTIFICATE_SLUGS = [
  'vulnerabilities/reentrancy-attack',
  'vulnerabilities/flash-loan-attacks',
  'vulnerabilities/access-control-vulnerabilities',
  'vulnerabilities/tx-origin-phishing',
  'vulnerabilities/integer-overflow-underflow',
  'vulnerabilities/signature-replay',
  'vulnerabilities/front-running',
  'vulnerabilities/denial-of-service',
  'vulnerabilities/storage-collision',
  'vulnerabilities/timestamp-dependence',
  'vulnerabilities/unchecked-return-values',
  'vulnerabilities/oracle-manipulation',
  'case-studies/euler-finance-2023',
  'best-practices/audit-preparation-guide',
  'best-practices/checks-effects-interactions',
  'best-practices/secure-access-control',
] as const;

export const CERTIFICATE_TITLE = 'HexiLearn Security Fundamentals';

export function isCertificateEligible(completedSlugs: string[]): boolean {
  const set = new Set(completedSlugs);
  return REQUIRED_CERTIFICATE_SLUGS.every((slug) => set.has(slug));
}
