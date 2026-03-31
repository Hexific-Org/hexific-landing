import type { MouseEventHandler, RefObject } from 'react';

type ProcessSectionProps = {
  carouselRef: RefObject<HTMLDivElement | null>;
  onMouseDown: MouseEventHandler<HTMLDivElement>;
};

const processSteps = [
  {
    number: '1',
    title: 'Contract Submission',
    description:
      'Upload your smart contracts through our secure platform. We support Solidity, Vyper, and other major languages.',
    duration: 'Average time: 5 minutes',
  },
  {
    number: '2',
    title: 'Automated Analysis',
    description:
      'Our AI engines perform comprehensive static and dynamic analysis, checking for 200+ vulnerability patterns.',
    duration: 'Average time: 2-4 hours',
  },
  {
    number: '3',
    title: 'Expert Review',
    description:
      'Senior auditors manually review findings, test edge cases, and analyze business logic vulnerabilities.',
    duration: 'Average time: 1-3 days',
  },
  {
    number: '4',
    title: 'Report Generation',
    description:
      'Comprehensive report with findings, severity ratings, and detailed remediation recommendations.',
    duration: 'Average time: 4-6 hours',
  },
  {
    number: '5',
    title: 'Remediation Support',
    description:
      'Direct consultation with our team to resolve issues and validate fixes before deployment.',
    duration: 'Ongoing support included',
  },
];

export default function ProcessSection({ carouselRef, onMouseDown }: ProcessSectionProps) {
  return (
    <section id="process" className="py-12 md:py-20 code-pattern overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-10 md:mb-16 px-4">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold gradient-text mb-4 md:mb-6">Audit Process</h2>
          <p className="text-base md:text-xl text-gray-300 max-w-3xl mx-auto">
            Our streamlined process delivers comprehensive security analysis in record time.
          </p>
        </div>
      </div>

      <div className="relative overflow-hidden group">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#08090d] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#08090d] to-transparent z-10 pointer-events-none" />

        <div
          ref={carouselRef}
          className="carousel-track flex gap-6 py-4 cursor-grab select-none"
          onMouseDown={onMouseDown}
        >
          {[...Array(2)].map((_, setIndex) => (
            <div key={setIndex} className="carousel-slide flex gap-6 flex-shrink-0">
              {processSteps.map((step) => (
                <div key={`${setIndex}-${step.number}`} className="w-[350px] md:w-[400px] flex-shrink-0 group">
                  <div className="bg-[#0d0f16] border border-white/[0.06] hover:border-lime-400/20 rounded-2xl p-6 h-full hover:scale-[1.02] transition-all duration-300">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 neon-border rounded-full flex items-center justify-center text-xl font-bold group-hover:scale-110 transition-transform">
                        {step.number}
                      </div>
                      <h3 className="text-xl font-bold text-white">{step.title}</h3>
                    </div>
                    <p className="text-gray-400 mb-4 text-sm leading-relaxed">{step.description}</p>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-sm text-lime-400 font-medium">{step.duration}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
