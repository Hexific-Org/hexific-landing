import FreeAuditUpload from '@/components/FreeAuditUpload';

type ContactSectionProps = {
  onUploadContract: () => void;
  onScheduleCall: () => void;
};

export default function ContactSection({ onUploadContract, onScheduleCall }: ContactSectionProps) {
  return (
    <section id="contact" className="py-12 md:py-20 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(214,237,23,0.04),transparent_60%)]" />
      </div>
      <div className="max-w-4xl mx-auto px-4 md:px-6 text-center relative z-10">
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 md:mb-6">
          <span className="text-white">Ready to Secure</span>{' '}
          <span className="gradient-text">Your Protocol?</span>
        </h2>
        <p className="text-base md:text-lg text-gray-500 mb-6 md:mb-8 max-w-2xl mx-auto">
          Join hundreds of projects that trust Hexific to protect their smart contracts and users&apos; funds.
        </p>
        <div className="bg-[#0d0f16] border border-white/[0.06] rounded-2xl p-4 sm:p-6 md:p-8 mb-6 md:mb-8">
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 divide-y md:divide-y-0 md:divide-x divide-white/[0.06]">
            <div className="text-center md:pr-8">
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-white">Start Free Audit</h3>
              <p className="text-sm md:text-base text-gray-500 mb-4">Get started with our AI-powered vulnerability detection for free.</p>
              <button onClick={onUploadContract} className="bg-lime-400 text-black px-6 md:px-8 py-2.5 md:py-3 rounded-xl text-sm md:text-base font-bold hover:bg-lime-300 transition-all pulse-glow cursor-pointer">
                Upload Contract
              </button>
            </div>
            <div className="text-center pt-6 md:pt-0 md:pl-8">
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-white">Book Consultation</h3>
              <p className="text-sm md:text-base text-gray-500 mb-4">Speak with our security experts about your specific needs.</p>
              <button onClick={onScheduleCall} className="border border-lime-400/40 text-lime-400 px-6 md:px-8 py-2.5 md:py-3 rounded-xl text-sm md:text-base hover:bg-lime-400 hover:text-black hover:border-transparent transition-all cursor-pointer font-semibold">
                Schedule Call
              </button>
            </div>
          </div>
        </div>

        <div id="free-audit-upload" className="scroll-mt-20">
          <FreeAuditUpload />
        </div>

        <div className="grid md:grid-cols-3 gap-6 text-center mt-10">
          <div className="bg-[#0d0f16] border border-white/[0.06] rounded-xl p-5 hover:border-white/10 transition-all">
            <div className="w-10 h-10 bg-lime-400/[0.08] rounded-xl flex items-center justify-center mx-auto mb-3 border border-lime-400/10">
              <svg className="w-5 h-5 text-lime-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h4 className="font-semibold mb-1 text-white text-sm">Email</h4>
            <p className="text-gray-500 text-sm">admin@hexific.com</p>
          </div>
          <div className="bg-[#0d0f16] border border-white/[0.06] rounded-xl p-5 hover:border-white/10 transition-all">
            <div className="w-10 h-10 bg-lime-400/[0.08] rounded-xl flex items-center justify-center mx-auto mb-3 border border-lime-400/10">
              <svg className="w-5 h-5 text-lime-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h4 className="font-semibold mb-1 text-white text-sm">Response Time</h4>
            <p className="text-gray-500 text-sm">&lt; 24 hours</p>
          </div>
          <div className="bg-[#0d0f16] border border-white/[0.06] rounded-xl p-5 hover:border-white/10 transition-all">
            <div className="w-10 h-10 bg-lime-400/[0.08] rounded-xl flex items-center justify-center mx-auto mb-3 border border-lime-400/10">
              <svg className="w-5 h-5 text-lime-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h4 className="font-semibold mb-1 text-white text-sm">Security</h4>
            <p className="text-gray-500 text-sm">SOC 2 Compliant</p>
          </div>
        </div>
      </div>
    </section>
  );
}
