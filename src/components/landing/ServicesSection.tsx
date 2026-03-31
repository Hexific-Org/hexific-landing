type ServicesSectionProps = {
  onScrollToContact: () => void;
  onScheduleAudit: () => void;
};

export default function ServicesSection({ onScrollToContact, onScheduleAudit }: ServicesSectionProps) {
  return (
    <section id="services" className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-lime-400/[0.025] rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <div className="mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 bg-white/[0.05] border border-white/[0.08] rounded-full px-3 py-1.5 mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-pulse" />
            <span className="text-xs font-mono font-semibold text-lime-400 uppercase tracking-wider">Security Stack</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight">
                <span className="text-white">Ship fast.</span>
                <br />
                <span className="gradient-text">Stay SAFU.</span>
              </h2>
            </div>
            <p className="text-sm md:text-base text-gray-500 max-w-xs leading-relaxed md:text-right">
              From 5-min AI scans to full expert audits. Built for builders who can&apos;t afford to get rekt.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-auto">
          <div className="md:col-span-7 group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0c0e14] hover:border-lime-400/25 transition-all duration-500 service-card">
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-[radial-gradient(ellipse_at_top-left,rgba(214,237,23,0.06),transparent_60%)]" />

            <div className="flex items-center justify-between px-6 pt-5 pb-0">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 bg-lime-400/10 border border-lime-400/20 rounded-full px-2.5 py-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-pulse" />
                  <span className="text-[10px] font-bold text-lime-400 uppercase tracking-widest">Live</span>
                </div>
                <span className="text-[10px] font-mono text-gray-600 bg-white/[0.04] rounded px-2 py-1">v2.4.1-beta</span>
              </div>
              <div className="flex items-center gap-1.5">
                {['ETH', 'SOL', 'BASE', 'ARB'].map((chain) => (
                  <span key={chain} className="text-[9px] font-bold font-mono px-1.5 py-0.5 rounded bg-white/[0.05] border border-white/[0.07] text-gray-400">{chain}</span>
                ))}
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-start gap-4 mb-5">
                <div className="w-12 h-12 rounded-xl bg-lime-400/10 border border-lime-400/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-lime-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-black text-white">Fast Audit</h3>
                  <p className="text-xs text-gray-500 font-mono mt-0.5">AI + Static Analysis · FREE</p>
                </div>
              </div>

              <div className="mb-5 rounded-xl bg-[#080a0f] border border-white/[0.06] p-4 font-mono text-xs overflow-hidden">
                <div className="flex items-center gap-1.5 mb-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-lime-400/70" />
                  <span className="ml-2 text-gray-600 text-[10px]">hexific-scanner.sh</span>
                </div>
                <div className="space-y-1.5">
                  <div className="text-gray-600"><span className="text-lime-400/80">$</span> hexific scan ./contracts/Vault.sol</div>
                  <div className="text-gray-500">→ Loading 247 vuln patterns...</div>
                  <div className="text-gray-500">→ Running AI contextual analysis...</div>
                  <div className="flex items-center gap-2">
                    <span className="text-red-400 font-bold">[CRITICAL]</span>
                    <span className="text-gray-400">Reentrancy in withdraw() · L:142</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-400 font-bold">[HIGH]</span>
                    <span className="text-gray-400">Unchecked return value · L:89</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-blue-400 font-bold">[MED]</span>
                    <span className="text-gray-400">Missing access control · L:201</span>
                  </div>
                  <div className="text-lime-400/80">✓ Scan complete in 4m 23s · 3 issues found</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-5">
                {['200+ patterns', 'RAG-powered AI', 'PDF report', 'Solidity & Rust', 'Gas-free scan'].map((f) => (
                  <span key={f} className="text-[11px] px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.06] text-gray-400 font-medium">{f}</span>
                ))}
              </div>

              <div className="flex items-center gap-3 mb-5 text-[11px] font-mono">
                <span className="text-gray-600">Detects:</span>
                {[['CRITICAL', 'bg-red-500/20 text-red-400 border-red-500/30'], ['HIGH', 'bg-orange-500/20 text-orange-400 border-orange-500/30'], ['MEDIUM', 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'], ['LOW', 'bg-blue-500/20 text-blue-400 border-blue-500/30']].map(([label, cls]) => (
                  <span key={label} className={`px-2 py-0.5 rounded border font-bold text-[9px] ${cls}`}>{label}</span>
                ))}
              </div>

              <button
                onClick={onScrollToContact}
                className="w-full py-3 px-5 rounded-xl bg-lime-400 text-black text-sm font-black hover:bg-lime-300 transition-all duration-200 flex items-center justify-center gap-2 group/btn shadow-lg shadow-lime-400/15"
              >
                Run Free Scan
                <svg className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
              </button>
            </div>
          </div>

          <div className="md:col-span-5 group relative overflow-hidden rounded-2xl border border-lime-400/30 bg-[#0c0e14] hover:border-lime-400/50 transition-all duration-500 service-card">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-lime-400/50 to-transparent" />
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,rgba(214,237,23,0.05),transparent_55%)]" />
            <div className="flex items-center justify-between px-6 pt-5">
              <span className="inline-flex items-center gap-1.5 bg-lime-400 text-black text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                Recommended
              </span>
              <span className="text-[10px] font-mono text-gray-600">WAR ROOM AUDIT</span>
            </div>

            <div className="p-6">
              <div className="flex items-start gap-3 mb-5">
                <div className="w-12 h-12 rounded-xl bg-lime-400/10 border border-lime-400/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-lime-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-black text-white">Full Audit</h3>
                  <p className="text-xs text-gray-500 font-mono mt-0.5">Human Experts · DeFi-Grade</p>
                </div>
              </div>

              <p className="text-sm text-gray-400 mb-5 leading-relaxed">
                Human experts who&apos;ve seen every rug, every exploit, every edge case. They audit like hackers think, because some of them were.
              </p>

              <div className="space-y-2.5 mb-6">
                {[
                  'Reentrancy & flash loan vectors',
                  'MEV sandwich & frontrun exposure',
                  'Business logic & tokenomics',
                  'Oracle manipulation risks',
                  'Access control & proxy upgrades',
                  'Cross-chain bridge vulnerabilities',
                ].map((text) => (
                  <div key={text} className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-lime-400/10 border border-lime-400/25 flex items-center justify-center flex-shrink-0">
                      <svg className="w-2.5 h-2.5 text-lime-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    </div>
                    <span className="text-xs text-gray-400">{text}</span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-2 mb-6">
                <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3 text-center">
                  <div className="text-lg font-black text-white">1–3</div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-wide">Days avg.</div>
                </div>
                <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3 text-center">
                  <div className="text-lg font-black text-white">100%</div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-wide">NDA covered</div>
                </div>
              </div>

              <button
                onClick={onScheduleAudit}
                className="w-full py-3 px-5 rounded-xl border border-lime-400/40 text-lime-400 text-sm font-bold hover:bg-lime-400 hover:text-black hover:border-transparent transition-all duration-200 flex items-center justify-center gap-2 group/btn"
              >
                Schedule Full Audit
                <svg className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
              </button>
            </div>
          </div>

          <div className="md:col-span-7 group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0c0e14] hover:border-blue-400/20 transition-all duration-500 service-card">
            <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(ellipse_at_bottom-left,rgba(59,130,246,0.05),transparent_60%)]" />
            <div className="p-6">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-400/10 border border-blue-400/15 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" /></svg>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-black text-white">HexiChat</h3>
                      <span className="text-[9px] font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30 px-1.5 py-0.5 rounded uppercase tracking-wide">Soon</span>
                    </div>
                    <p className="text-[11px] text-gray-600 font-mono">AI Security Advisor · 24/7</p>
                  </div>
                </div>
              </div>
              <div className="rounded-xl bg-[#080a0f] border border-white/[0.05] p-4 mb-5 space-y-3">
                <div className="flex gap-2 items-start">
                  <div className="w-5 h-5 rounded-full bg-gray-700 flex-shrink-0 flex items-center justify-center text-[8px] text-gray-400 font-bold mt-0.5">U</div>
                  <div className="bg-white/[0.06] rounded-xl rounded-tl-none px-3 py-2 text-xs text-gray-300 max-w-[80%]">Is my staking contract vulnerable to reentrancy if I use a mapping for balances?</div>
                </div>
                <div className="flex gap-2 items-start justify-end">
                  <div className="bg-blue-500/15 border border-blue-400/20 rounded-xl rounded-tr-none px-3 py-2 text-xs text-blue-200 max-w-[85%]">
                    Yes — CEI pattern violation. Your <span className="text-blue-400 font-mono">withdraw()</span> should update state <em>before</em> external calls. Also check for <span className="text-blue-400 font-mono">msg.sender</span> call hooks if you support ERC-777 tokens.
                  </div>
                  <div className="w-5 h-5 rounded-full bg-blue-500/30 flex-shrink-0 flex items-center justify-center text-[8px] text-blue-300 font-bold mt-0.5">AI</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-5">
                {['Reentrancy help', 'Exploit patterns', 'Code review', 'MEV queries', 'Best practices'].map((q) => (
                  <span key={q} className="text-[10px] px-2.5 py-1 rounded-lg bg-blue-400/[0.07] border border-blue-400/15 text-blue-400/80 font-medium cursor-default">{q}</span>
                ))}
              </div>
              <a href="https://x.com/hexific" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs text-gray-500 hover:text-gray-300 transition-colors group/link font-medium">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" /></svg>
                Get notified on launch
                <svg className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
              </a>
            </div>
          </div>

          <div className="md:col-span-5 group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0c0e14] hover:border-red-400/20 transition-all duration-500 service-card">
            <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(ellipse_at_top-right,rgba(239,68,68,0.05),transparent_60%)]" />
            <div className="h-1 w-full bg-gradient-to-r from-orange-500/40 via-red-500/60 to-orange-500/40" />
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/15 flex items-center justify-center">
                    <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-black text-white">AI Playground</h3>
                      <span className="text-[9px] font-bold bg-red-500/20 text-red-400 border border-red-500/30 px-1.5 py-0.5 rounded uppercase tracking-wide animate-pulse">Soon</span>
                    </div>
                    <p className="text-[11px] text-gray-600 font-mono">Attack Simulation Engine</p>
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-500 mb-4 leading-relaxed">
                Watch AI agents try to <span className="text-red-400 font-semibold">rekt your contracts</span> — flash loans, MEV sandwiches, reentrancy attacks — in real-time. Find the holes before the hackers do.
              </p>
              <div className="space-y-2 mb-5">
                {[
                  ['⚡', 'Flash Loan Attacks'],
                  ['🥪', 'MEV Sandwich'],
                  ['🔄', 'Reentrancy Exploits'],
                  ['🔮', 'Oracle Manipulation'],
                ].map(([icon, label]) => (
                  <div key={label} className="flex items-center gap-2 text-[11px] text-gray-500">
                    <span>{icon}</span>
                    <span>{label}</span>
                  </div>
                ))}
              </div>
              <a href="https://x.com/hexific" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs text-gray-600 hover:text-gray-300 transition-colors group/link font-medium">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" /></svg>
                Notify me on launch
                <svg className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-white/[0.05]">
          <div className="flex flex-wrap items-center justify-between gap-y-4 gap-x-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-[10px] uppercase tracking-widest text-gray-600 font-semibold">Supported:</span>
              {['Solidity', 'Vyper', 'Rust / Anchor', 'Move', 'Yul'].map((lang) => (
                <span key={lang} className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/[0.06] text-gray-500">{lang}</span>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-[10px] uppercase tracking-widest text-gray-600 font-semibold">Chains:</span>
              {['Ethereum', 'Solana', 'Base', 'Arbitrum', 'Polygon', 'BNB', '+more'].map((chain) => (
                <span key={chain} className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/[0.06] text-gray-500">{chain}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
