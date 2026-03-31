export default function RoadmapSection() {
  return (
    <section id="roadmap" className="py-12 md:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 md:mb-6 text-white">Roadmap</h2>
          <p className="text-base md:text-lg text-gray-500 max-w-2xl mx-auto">
            Our journey to make smart contract security accessible and comprehensive for everyone
          </p>
        </div>

        <div className="relative">
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-px h-full bg-gradient-to-b from-lime-400/60 via-lime-400/20 to-transparent" />

          <div className="space-y-12">
            <div className="relative">
              <div className="md:flex items-center">
                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-lime-400 rounded-full border-4 border-[#08090d] z-10 items-center justify-center">
                  <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>

                <div className="md:w-1/2 md:pr-12">
                  <div className="bg-[#0d0f16] border border-white/[0.06] hover:border-lime-400/20 rounded-2xl p-8 transition-all">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-bold gradient-text">Q4 2025</h3>
                      <span className="bg-lime-400 text-black px-3 py-1 rounded-full text-xs font-bold">
                        COMPLETED
                      </span>
                    </div>
                    <p className="text-gray-500 text-sm mb-6">Sep - Dec 2025</p>

                    <h4 className="text-xl font-bold mb-4 text-white">Foundation & Core Features</h4>

                    <ul className="space-y-3">
                      {[
                        'Launch on mainnet',
                        'Real USDC payment system live',
                        'Crypto Twitter, Discord communities engagement',
                        'Integrate with Claude Sonnet API for AI audits',
                        'Track which findings users ask AI about most',
                      ].map((item) => (
                        <li key={item} className="flex items-start">
                          <svg className="w-5 h-5 text-lime-400 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-400">{item}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 pt-6 border-t border-white/[0.06]">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-lime-400">Goal:</span>
                        <span className="text-white font-bold">100+ audits findings</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="md:flex items-center md:flex-row-reverse">
                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-lime-400 rounded-full border-4 border-[#08090d] z-10 items-center justify-center">
                  <div className="w-3 h-3 bg-black rounded-full pulse-glow" />
                </div>

                <div className="md:w-1/2 md:pl-12">
                  <div className="bg-[#0d0f16] border border-lime-400/20 rounded-2xl p-8 shadow-[0_0_30px_rgba(214,237,23,0.05)]">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-bold gradient-text">Q1 2026</h3>
                      <span className="bg-lime-400 text-black px-3 py-1 rounded-full text-xs font-bold">
                        IN PROGRESS
                      </span>
                    </div>
                    <p className="text-gray-500 text-sm mb-6">Jan - Apr 2026</p>

                    <h4 className="text-xl font-bold mb-4 text-white">AI Enhancement</h4>

                    <ul className="space-y-3">
                      {[
                        'Utilize $HEXI token for enhanced AI audit capabilities',
                        '$HEXI buy back & burn program from platform revenue',
                        'Multi-AI ensemble for better audit quality',
                      ].map((item) => (
                        <li key={item} className="flex items-start">
                          <svg className="w-5 h-5 text-lime-400 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-400">{item}</span>
                        </li>
                      ))}
                      {[
                        'Audit history storage (users want to see past audits)',
                        'Email notifications when audit completes',
                      ].map((item) => (
                        <li key={item} className="flex items-start">
                          <div className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0 rounded-full border border-lime-400/40 bg-transparent flex items-center justify-center">
                            <div className="w-1.5 h-0.5 bg-lime-400/60 rounded-full" />
                          </div>
                          <span className="text-gray-400">{item}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 pt-6 border-t border-white/[0.06]">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-lime-400">Goal:</span>
                        <span className="text-white font-bold">500+ audits findings</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="md:flex items-center justify-center">
                <div className="md:w-2/3">
                  <div className="bg-[#0d0f16] border border-white/[0.06] rounded-2xl p-8 text-center hover:border-lime-400/10 transition-all">
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-lime-400/[0.08] border border-lime-400/10 rounded-xl mb-4">
                      <svg className="w-7 h-7 text-lime-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold gradient-text mb-3">Continuous Improvements</h3>
                    <p className="text-gray-400 text-base">
                      Ongoing enhancements for <strong className="text-lime-400 font-semibold">AI Audit Quality</strong> and <strong className="text-lime-400 font-semibold">Privacy Protection</strong>
                    </p>
                    <div className="mt-6 flex flex-wrap gap-2 justify-center">
                      <span className="px-3 py-1.5 bg-white/[0.04] border border-white/[0.07] rounded-full text-xs text-gray-300 font-medium">AI Accuracy</span>
                      <span className="px-3 py-1.5 bg-white/[0.04] border border-white/[0.07] rounded-full text-xs text-gray-300 font-medium">Privacy First</span>
                      <span className="px-3 py-1.5 bg-white/[0.04] border border-white/[0.07] rounded-full text-xs text-gray-300 font-medium">User Experience</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="bg-[#0d0f16] border border-white/[0.06] rounded-2xl p-8 max-w-2xl mx-auto relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(214,237,23,0.04),transparent_60%)] pointer-events-none" />
            <h3 className="text-2xl font-bold mb-4 text-white">Want to influence our roadmap?</h3>
            <p className="text-gray-500 mb-6">
              Join our community and share your feedback to help shape the future of Hexific
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="mailto:admin@hexific.com"
                className="bg-lime-400 text-black px-6 py-3 rounded-xl font-bold hover:bg-lime-300 transition-all inline-block text-sm"
              >
                Contact Us
              </a>
              <a
                href="https://x.com/i/communities/1994420483463528685"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/[0.05] border border-white/[0.08] text-gray-200 px-6 py-3 rounded-xl font-semibold hover:bg-white/[0.08] hover:border-white/[0.15] transition-all inline-flex items-center justify-center gap-2 text-sm"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                Join Community
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
