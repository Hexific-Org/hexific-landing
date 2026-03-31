import Image from 'next/image';

const integrations = [
  { src: '/integrations/ethereum.svg', alt: 'Ethereum' },
  { src: '/integrations/solana.svg', alt: 'Solana' },
  { src: '/integrations/base.svg', alt: 'Base' },
  { src: '/integrations/etherscan.svg', alt: 'Etherscan' },
  { src: '/integrations/x402scan.svg', alt: 'x402scan' },
  { src: '/integrations/claude-ai.svg', alt: 'Claude AI' },
  { src: '/integrations/open-ai.svg', alt: 'Open AI' },
  { src: '/integrations/langchain.svg', alt: 'Langchain' },
  { src: '/integrations/resend.svg', alt: 'Resend' },
  { src: '/integrations/helius.svg', alt: 'Helius' },
  { src: '/integrations/slither.svg', alt: 'Slither' },
];

export default function IntegrationsSection() {
  return (
    <section id="integrations" className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-lime-400/5 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text mb-4 md:mb-6">
            Powered By Industry Leaders
          </h2>
          <p className="text-base md:text-xl text-gray-300 max-w-2xl mx-auto">
            Integrated with the most trusted protocols and technologies in Web3
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
          {integrations.map((integration) => (
            <div
              key={integration.alt}
              className="group flex items-center justify-center h-20 w-36 sm:h-24 sm:w-40 md:h-24 md:w-44 rounded-2xl bg-white/5 border border-white/10 hover:border-lime-400/50 hover:bg-white/10 transition-all duration-300"
            >
              <Image
                src={integration.src}
                alt={integration.alt}
                width={120}
                height={40}
                className="opacity-60 transition-all duration-300 brightness-0 invert max-h-full max-w-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
