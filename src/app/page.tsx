'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import FreeAuditUpload from '@/components/FreeAuditUpload';
import { WalletConnectButton } from "@/components/wallet-connect-button";

export default function Page() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [countersStarted, setCountersStarted] = useState(false);
  const [hexiPrice, setHexiPrice] = useState<number | null>(null);
  const [priceChange24h, setPriceChange24h] = useState<number | null>(null);
  const [platformStats, setPlatformStats] = useState<{ vulnerabilitiesFound: number; contractsAudited: number }>({ vulnerabilitiesFound: 700, contractsAudited: 50 });
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentTranslateX, setCurrentTranslateX] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mintInput, setMintInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<any | null>(null);


  const carouselAnimNameRef = useRef<string>('');
  const carouselAnimDurationSecRef = useRef<number>(0);
  const carouselAnimTimingRef = useRef<string>('linear');

  const parseCssTimeToSeconds = (value: string): number => {
    const raw = value.trim();
    if (!raw) return 0;
    if (raw.endsWith('ms')) {
      const n = Number.parseFloat(raw.slice(0, -2));
      return Number.isFinite(n) ? n / 1000 : 0;
    }
    if (raw.endsWith('s')) {
      const n = Number.parseFloat(raw.slice(0, -1));
      return Number.isFinite(n) ? n : 0;
    }
    const n = Number.parseFloat(raw);
    return Number.isFinite(n) ? n : 0;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!carouselRef.current) return;

    const track = carouselRef.current;

    setIsDragging(true);
    setStartX(e.pageX);

    // 1. Get the current position from the computed style
    const style = window.getComputedStyle(track);
    const matrix = new DOMMatrix(style.transform);
    const currentX = matrix.m41;

    setCurrentTranslateX(currentX);

    // Store the active animation config so it can resume from the drag position
    const animName = (style.animationName || '').split(',')[0]?.trim() || '';
    const animDuration = (style.animationDuration || '').split(',')[0]?.trim() || '';
    const animTiming = (style.animationTimingFunction || '').split(',')[0]?.trim() || 'linear';
    carouselAnimNameRef.current = animName !== 'none' ? animName : '';
    carouselAnimDurationSecRef.current = parseCssTimeToSeconds(animDuration);
    carouselAnimTimingRef.current = animTiming || 'linear';

    // 2. Disable the animation and set a fixed position so it doesn't move while holding
    track.style.animation = 'none';
    track.style.animationDelay = '';
    track.style.animationPlayState = 'running';
    track.style.transform = `translateX(${currentX}px)`;
    track.style.cursor = 'grabbing';
  };

  useEffect(() => {
    if (!isDragging) return;

    const track = carouselRef.current;
    if (!track) return;

    const handleMouseMove = (e: MouseEvent) => {
      e.preventDefault();
      const x = e.pageX - startX;
      const walk = x * 1.5; // Drag speed
      track.style.transform = `translateX(${currentTranslateX + walk}px)`;
    };

    const handleMouseUp = (e: MouseEvent) => {
      setIsDragging(false);
      track.style.cursor = 'grab';

      // Get the final position after dragging
      const style = window.getComputedStyle(track);
      const matrix = new DOMMatrix(style.transform);
      const finalX = matrix.m41;

      // -50% in the keyframes = half of the track width (because width: fit-content)
      const halfWidth = track.scrollWidth / 2;
      if (!halfWidth) {
        track.style.transform = '';
        track.style.animation = '';
        track.style.animationDelay = '';
        return;
      }

      // Normalize so it always stays within the range [-halfWidth, 0]
      let normalizedX = finalX % halfWidth;
      if (normalizedX > 0) normalizedX -= halfWidth;
      if (normalizedX < -halfWidth) normalizedX += halfWidth;

      // Compute animation progress based on the position
      const progress = Math.min(1, Math.max(0, Math.abs(normalizedX) / halfWidth));

      // Use the stored animation config (fall back to computed style if needed)
      const fallbackName = (style.animationName || '').split(',')[0]?.trim() || '';
      const animName = carouselAnimNameRef.current || (fallbackName !== 'none' ? fallbackName : '');
      const fallbackDurationSec = parseCssTimeToSeconds((style.animationDuration || '').split(',')[0]?.trim() || '');
      const durationSec = carouselAnimDurationSecRef.current || fallbackDurationSec || 50;
      const timingFn = carouselAnimTimingRef.current || 'linear';

      // Restart the animation from the current position using a negative delay
      // (Toggle 'none' -> reflow -> set animation) so the browser actually restarts it.
      track.style.animation = 'none';
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      track.offsetHeight;

      track.style.transform = '';
      track.style.animation = `${animName} ${durationSec}s ${timingFn} infinite`;
      track.style.animationDelay = `${-(progress * durationSec)}s`;
      track.style.animationPlayState = 'running';
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, startX, currentTranslateX]);

  // Matrix animation for background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const matrixChars = '01アイウエオ…ワヲン';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    const drawMatrix = () => {
      ctx.fillStyle = 'rgba(8, 9, 13, 0.06)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#D6ED17';
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = matrixChars[Math.floor(Math.random() * matrixChars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(drawMatrix, 100);
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resize);
    };
  }, []);

  // Animate stats counters
  useEffect(() => {
    if (countersStarted) return;

    const animateCounters = () => {
      setCountersStarted(true);
      const counters = [
        { id: 'contracts-audited', target: 500, suffix: '+' },
        { id: 'vulnerabilities', target: 2847, suffix: '' },
        { id: 'saved-funds', target: 50, suffix: 'M+' },
        { id: 'response-time', target: 24, suffix: 'h' }
      ];
      counters.forEach(({ id, target, suffix }) => {
        const el = document.getElementById(id);
        if (!el) return;
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          el.textContent = id === 'saved-funds'
            ? '$' + Math.floor(current) + suffix
            : Math.floor(current) + suffix;
        }, 50);
      });
    };

    const slideObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.id === 'contracts-audited') {
          animateCounters();
          observer.disconnect(); // stop after first trigger
        }
        if (entry.isIntersecting) {
          entry.target.classList.add('slide-up');
        }
      });
    }, { threshold: 0.3 });

    document
      .querySelectorAll<HTMLElement>('.feature-card, #contracts-audited')
      .forEach(el => {
        slideObserver.observe(el);
      });

    return () => slideObserver.disconnect();
  }, [countersStarted]);

  // Progress bars animation
  useEffect(() => {
    const processSection = document.getElementById('process');
    if (!processSection) return;
    let progressStarted = false;
    const processObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !progressStarted) {
          progressStarted = true; // prevent re-run

          document.querySelectorAll<HTMLElement>('.audit-progress').forEach(bar => {
            // Set background color
            bar.style.backgroundColor = 'rgb(55, 65, 81)'; // bg-gray-700 equivalent

            // Add smooth transition
            bar.style.transition = 'all 1.5s ease-in-out';

            const prog = bar.style.getPropertyValue('--progress') || '0%';
            bar.style.setProperty('--progress', '0%');
            setTimeout(() => {
              bar.style.setProperty('--progress', prog);
            }, 500);
          });
          processObserver.disconnect(); // stop observing after first trigger
        }
      });
    }, { threshold: 0.3 });

    processObserver.observe(processSection);

    return () => processObserver.disconnect();
  }, []);

  // Fetch HEXI price every 30 seconds
  useEffect(() => {
    const fetchHexiPrice = async () => {
      try {
        const response = await fetch(
          'https://api.dexscreener.com/latest/dex/tokens/3ghjaogpDVt7QZ6eNauoggmj4WYw23TkpyVN2yZjpump'
        );
        const data = await response.json();

        if (data.pairs && data.pairs.length > 0) {
          const pair = data.pairs[0];
          setHexiPrice(parseFloat(pair.priceUsd));
          setPriceChange24h(parseFloat(pair.priceChange.h24));
        }
      } catch (error) {
        console.error('Failed to fetch HEXI price:', error);
      }
    };

    fetchHexiPrice();
    const interval = setInterval(fetchHexiPrice, 30000);
    return () => clearInterval(interval);
  }, []);

  // Fetch platform stats (vulnerabilities found, contracts audited)
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/stats');
        const data = await response.json();
        setPlatformStats({
          vulnerabilitiesFound: data.vulnerabilitiesFound,
          contractsAudited: data.contractsAudited,
        });
      } catch (error) {
        console.error('Failed to fetch platform stats:', error);
      }
    };

    fetchStats();
    // Refresh stats every 5 minutes
    const interval = setInterval(fetchStats, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Hover & click effects (feature-card, all buttons, mobile menu)
  useEffect(() => {
    // feature-card hover
    const cards = document.querySelectorAll<HTMLElement>('.feature-card');
    const enterCard = function (this: HTMLElement) {
      this.style.transform = 'translateY(-10px) scale(1.02)';
      this.style.boxShadow = '0 20px 40px rgba(214, 237, 23, 0.2)';
    };
    const leaveCard = function (this: HTMLElement) {
      this.style.transform = 'translateY(0) scale(1)';
      this.style.boxShadow = 'none';
    };
    cards.forEach(c => {
      c.addEventListener('mouseenter', enterCard);
      c.addEventListener('mouseleave', leaveCard);
    });

    // button hover & click
    const buttons = document.querySelectorAll<HTMLElement>('button');
    const scaleUp = function (this: HTMLElement) { this.style.transform = 'scale(1.05)'; };
    const scaleDown = function (this: HTMLElement) { this.style.transform = 'scale(1)'; };
    const onClick = function (this: HTMLElement) {
      const txt = this.textContent || '';
      if (txt.includes('Upload') || txt.includes('Schedule')) {
        const orig = this.textContent!;
        this.textContent = 'Loading...';
        this.setAttribute('disabled', 'true');
        setTimeout(() => {
          this.textContent = orig;
          this.removeAttribute('disabled');
        }, 2000);
      }
    };
    buttons.forEach(b => {
      b.addEventListener('mouseenter', scaleUp);
      b.addEventListener('mouseleave', scaleDown);
      b.addEventListener('click', onClick);
    });

    // mobile menu toggle is now handled via React state

    return () => {
      cards.forEach(c => {
        c.removeEventListener('mouseenter', enterCard);
        c.removeEventListener('mouseleave', leaveCard);
      });
      buttons.forEach(b => {
        b.removeEventListener('mouseenter', scaleUp);
        b.removeEventListener('mouseleave', scaleDown);
        b.removeEventListener('click', onClick);
      });
    };
  }, []);

  const handleClick = () => {
    window.location.href = "/manual-audit";
  };

  const scrollDown = () => {
    const element = document.getElementById('free-audit-upload');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleRugRiskAnalyze = async () => {
    if (!mintInput.trim()) {
      setAnalysisError('Please enter a Solana token mint address.');
      setAnalysisResult(null);
      return;
    }

    setIsAnalyzing(true);
    setAnalysisError(null);
    setAnalysisResult(null);

    try {
      const res = await fetch('/api/solana/rug-risk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mint: mintInput.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        setAnalysisError(
          data?.error ??
            'Failed to analyze this token. Please try again or use a different mint address.',
        );
        return;
      }

      setAnalysisResult(data);
    } catch (err) {
      console.error('Failed to analyze rug risk:', err);
      setAnalysisError(
        'Unexpected error while analyzing this token. Please try again in a moment.',
      );
    } finally {
      setIsAnalyzing(false);
    }
  };


  return (
    <div>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Smart Contract Audit | HEXIFIC</title>
      <style dangerouslySetInnerHTML={{ __html: "\n        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');\n        \n        * {\n            font-family: 'Inter', sans-serif;\n        }\n        \n        html {\n            scroll-behavior: smooth;\n        }\n        \n        body {\n            background: #08090d;\n            color: white;\n            overflow-x: hidden;\n        }\n        \n        .gradient-text {\n            background: linear-gradient(135deg, #D6ED17 0%, #f0f8a0 50%, #ffffff 100%);\n            -webkit-background-clip: text;\n            -webkit-text-fill-color: transparent;\n            background-clip: text;\n        }\n        \n        .glass-effect {\n            background: rgba(13, 15, 22, 0.85);\n            backdrop-filter: blur(20px);\n            border: 1px solid rgba(255, 255, 255, 0.07);\n        }\n        \n        .feature-card:hover {\n            transform: translateY(-10px);\n            transition: all 0.3s ease;\n        }\n        \n        .cyber-grid {\n            background-image: \n                linear-gradient(rgba(214, 237, 23, 0.025) 1px, transparent 1px),\n                linear-gradient(90deg, rgba(214, 237, 23, 0.025) 1px, transparent 1px);\n            background-size: 60px 60px;\n        }\n        \n        .floating-orbs::after {\n            content: '';\n            position: absolute;\n            width: 500px;\n            height: 500px;\n            background: radial-gradient(circle, rgba(214, 237, 23, 0.04) 0%, transparent 70%);\n            border-radius: 50%;\n            top: -80px;\n            right: -80px;\n            animation: float 8s ease-in-out infinite;\n            z-index: -1;\n        }\n        \n        .floating-orbs::before {\n            content: '';\n            position: absolute;\n            width: 400px;\n            height: 400px;\n            background: radial-gradient(circle, rgba(214, 237, 23, 0.03) 0%, transparent 70%);\n            border-radius: 50%;\n            bottom: -60px;\n            left: -60px;\n            animation: float 10s ease-in-out infinite reverse;\n            z-index: -1;\n        }\n        \n        @keyframes float {\n            0%, 100% { transform: translateY(0px); }\n            50% { transform: translateY(-30px); }\n        }\n        \n        .pulse-glow {\n            animation: pulse-glow 3s ease-in-out infinite;\n        }\n        \n        @keyframes pulse-glow {\n            0%, 100% { box-shadow: 0 0 14px rgba(214, 237, 23, 0.25); }\n            50% { box-shadow: 0 0 28px rgba(214, 237, 23, 0.45); }\n        }\n        \n        .slide-up {\n            animation: slide-up 0.8s ease-out forwards;\n        }\n        \n        @keyframes slide-up {\n            from { opacity: 0; transform: translateY(50px); }\n            to { opacity: 1; transform: translateY(0); }\n        }\n        \n        .code-pattern {\n            background-image:\n                linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),\n                linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);\n            background-size: 40px 40px;\n        }\n        \n        .neon-border {\n            border: 1.5px solid rgba(214, 237, 23, 0.4);\n            box-shadow: 0 0 10px rgba(214, 237, 23, 0.12), inset 0 0 8px rgba(214, 237, 23, 0.06);\n            color: #d6ed17;\n        }\n        \n        .scan-line {\n            position: relative;\n            overflow: hidden;\n        }\n        \n        .scan-line::after {\n            content: '';\n            position: absolute;\n            top: -100%;\n            left: 0;\n            width: 100%;\n            height: 2px;\n            background: linear-gradient(90deg, transparent, rgba(214, 237, 23, 0.15), transparent);\n            animation: scan 4s linear infinite;\n        }\n        \n        @keyframes scan {\n            0% { top: -5%; }\n            100% { top: 105%; }\n        }\n        \n        .matrix-bg {\n            position: fixed;\n            top: 0;\n            left: 0;\n            width: 100%;\n            height: 100%;\n            pointer-events: none;\n            z-index: -2;\n            opacity: 0.1;\n        }\n        \n        .audit-progress {\n            background: linear-gradient(90deg, #D6ED17 var(--progress, 0%), transparent var(--progress, 0%));\n            transition: all 0.3s ease;\n        }\n        \n        /* Infinite Carousel Animation */\n        .carousel-track {\n            animation: carousel-scroll 50s linear infinite;\n            width: fit-content;\n        }\n        \n        .carousel-track:hover {\n            animation-play-state: paused;\n        }\n        \n        .carousel-slide {\n            display: flex;\n            gap: 1.5rem;\n        }\n        \n        @keyframes carousel-scroll {\n            0% { transform: translateX(0); }\n            100% { transform: translateX(-50%); }\n        }\n        \n        /* Service Card Animations */\n        .service-card {\n            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);\n        }\n        \n        .service-card:hover {\n            transform: translateY(-8px);\n        }\n        \n        .service-card::before {\n            content: '';\n            position: absolute;\n            inset: 0;\n            border-radius: 1.5rem;\n            padding: 2px;\n            background: linear-gradient(135deg, transparent 40%, rgba(214, 237, 23, 0.2) 50%, transparent 60%);\n            -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);\n            mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);\n            -webkit-mask-composite: xor;\n            mask-composite: exclude;\n            opacity: 0;\n            transition: opacity 0.4s ease;\n        }\n        \n        .service-card:hover::before {\n            opacity: 1;\n        }\n        \n        /* Shimmer effect for badges */\n        .shimmer {\n            position: relative;\n            overflow: hidden;\n        }\n        \n        .shimmer::after {\n            content: '';\n            position: absolute;\n            top: 0;\n            left: -100%;\n            width: 50%;\n            height: 100%;\n            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);\n            animation: shimmer 2.5s infinite;\n        }\n        \n        @keyframes shimmer {\n            100% { left: 160%; }\n        }\n        \n        .icon-float {\n            animation: icon-float 3s ease-in-out infinite;\n        }\n        \n        @keyframes icon-float {\n            0%, 100% { transform: translateY(0); }\n            50% { transform: translateY(-5px); }\n        }" }} />
      {/* Matrix Background */}
      <div className="matrix-bg">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 px-4 pt-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between w-full bg-[#0c0e14]/90 backdrop-blur-2xl border border-white/[0.08] rounded-2xl px-5 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
            <div className="flex items-center space-x-4 md:space-x-10">
              <div className="flex items-center space-x-2 md:space-x-3">
                <div className="w-8 h-8 md:w-9 md:h-9 bg-lime-400 rounded-lg flex items-center justify-center">
                  <Image src="./logo.svg" alt="Hexific Logo" width={24} height={24} className="w-5 h-5 md:w-5 md:h-5" />
                </div>
                <span className="text-lg md:text-xl font-bold gradient-text">Hexific</span>
              </div>

              <div className="hidden md:flex items-center space-x-1">
                <a href="#services" className="px-3 py-1.5 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-all">Services</a>
                <a href="#process" className="px-3 py-1.5 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-all">Process</a>
                <a href="#roadmap" className="px-3 py-1.5 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-all">Roadmap</a>
                <Link href="/learn" className="px-3 py-1.5 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-all flex items-center gap-1.5">
                  <span>Learn</span>
                  <span className="relative px-1.5 py-px text-[9px] font-semibold bg-lime-400 text-black rounded-sm uppercase tracking-wide">New</span>
                </Link>
                <Link href="/docs" className="px-3 py-1.5 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-all">
                  Docs
                </Link>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-3">
              {/* HEXI price chip */}
              {hexiPrice !== null && (
                <a
                  href="https://dexscreener.com/solana/3ghjaogpDVt7QZ6eNauoggmj4WYw23TkpyVN2yZjpump"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/[0.07] hover:bg-white/8 transition-all group"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-lime-400" />
                  <span className="text-xs font-mono text-lime-300 font-semibold">
                    ${hexiPrice < 0.0001
                      ? `0.0₄${hexiPrice.toFixed(8).replace(/^0\.0+/, '')}`
                      : hexiPrice.toFixed(4)}
                  </span>
                  {priceChange24h !== null && (
                    <span className={`text-[11px] font-medium ${priceChange24h >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                      {priceChange24h >= 0 ? '+' : ''}{priceChange24h.toFixed(2)}%
                    </span>
                  )}
                </a>
              )}
              <WalletConnectButton onMobile={false} />
            </div>
            <div className="flex items-center space-x-3 md:hidden">
              <WalletConnectButton onMobile={true} />
              <button
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 text-gray-300"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Full Screen Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-[#08090d] md:hidden overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 -left-20 w-64 h-64 bg-lime-400/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-lime-400/5 rounded-full blur-3xl" />
          </div>

          {/* Header */}
          <div className="relative flex items-center justify-between px-6 py-5 border-b border-gray-800/50">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 bg-lime-400 rounded-lg flex items-center justify-center shadow-lg shadow-lime-400/20">
                <Image src="./logo.svg" alt="Hexific Logo" width={22} height={22} />
              </div>
              <span className="text-xl font-bold gradient-text">Hexific</span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800/50 text-gray-400 hover:text-lime-400 hover:bg-gray-800 transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation Links - Centered */}
          <div className="relative flex flex-col items-center justify-center h-[calc(100vh-160px)] space-y-8 px-6">
            <a
              href="#services"
              className="text-2xl font-medium text-white hover:text-lime-400 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Services
            </a>
            <a
              href="#process"
              className="text-2xl font-medium text-white hover:text-lime-400 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Process
            </a>
            <a
              href="#roadmap"
              className="text-2xl font-medium text-white hover:text-lime-400 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Roadmap
            </a>
            <Link
              href="/learn"
              className="text-2xl font-medium text-white hover:text-lime-400 transition-colors flex items-center gap-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Learn
              <span className="px-2 py-0.5 text-[10px] font-bold bg-lime-400 text-black rounded">NEW</span>
            </Link>
            <Link
              href="/docs"
              className="text-2xl font-medium text-white hover:text-lime-400 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Docs
            </Link>

            {/* CTA Button */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="mt-10 bg-lime-400 text-black px-10 py-4 rounded-xl font-bold text-lg hover:bg-lime-300 transition-all shadow-lg shadow-lime-400/20 hover:shadow-lime-400/40"
            >
              Start Free Audit
            </button>
          </div>
        </div>
      )}
      {/* HEXI Price Tag - Mobile only (desktop shown in navbar) */}
      <a
        href="https://dexscreener.com/solana/3ghjaogpDVt7QZ6eNauoggmj4WYw23TkpyVN2yZjpump"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 md:hidden bg-[#0c0e14]/90 backdrop-blur-xl border border-white/[0.08] rounded-xl p-2.5 hover:border-lime-400/30 transition-all hover:scale-105 group"
      >
        {hexiPrice !== null ? (
          <div className="flex flex-col items-center">
            <span className="text-xs font-semibold text-gray-400">HEXI</span>
            <span className="text-sm font-bold gradient-text">
              ${hexiPrice < 0.0001
                ? `0.0₄${hexiPrice.toFixed(8).replace(/^0\.0+/, '')}`
                : hexiPrice.toFixed(4)}
            </span>
            {priceChange24h !== null && (
              <span className={`text-xs font-medium ${priceChange24h >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                {priceChange24h >= 0 ? '+' : ''}{priceChange24h.toFixed(2)}%
              </span>
            )}
          </div>
        ) : (
          <span className="text-xs font-medium text-gray-400">HEXI</span>
        )}
      </a>

      {/* Hero Section */}
      <div>
        {/* Mobile hero */}
        <section className="md:hidden min-h-screen flex flex-col pt-24">
          <div className="flex-1 flex items-center">
            <div className="max-w-7xl mx-auto px-4 py-8 w-full">
              <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 py-1.5 mb-5">
                <div className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-pulse" />
                <span className="text-xs font-medium text-gray-300">Trusted by 50+ Web3 Projects</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black mb-4 leading-tight">
                <span className="gradient-text">Bulletproof</span>
                <br />
                <span className="text-white">Smart Contract</span>
                <br />
                <span className="text-white">Audits</span>
              </h1>
              <p className="text-sm text-gray-400 mb-6 max-w-sm leading-relaxed">
                Advanced AI-powered security analysis combined with expert manual review. Protect your DeFi protocol from exploits before they happen.
              </p>
              <div className="flex flex-col gap-3 justify-center mb-8">
                <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="bg-lime-400 text-black px-6 py-3 rounded-xl text-base font-bold hover:bg-lime-300 transition-all cursor-pointer pulse-glow">
                  Start Free Audit
                </button>
                <button onClick={() => window.open('https://github.com/Hexific/audit-reports', '_blank')} className="bg-white/5 border border-white/10 px-6 py-3 rounded-xl text-base font-semibold hover:bg-white/8 transition-all cursor-pointer text-gray-200">
                  View Sample Report
                </button>
              </div>
            </div>
          </div>
          {/* Stats bar - mobile */}
          <div className="border-t border-white/[0.07] bg-[#0a0b10]/60">
            <div className="grid grid-cols-3">
              <div className="py-4 px-3 text-center border-r border-white/[0.07]">
                <div className="text-xl font-bold text-white mb-0.5">{platformStats.vulnerabilitiesFound}</div>
                <div className="text-[11px] text-gray-500 uppercase tracking-wide">Vulns Found</div>
              </div>
              <div className="py-4 px-3 text-center border-r border-white/[0.07]">
                <div className="text-xl font-bold text-white mb-0.5">{platformStats.contractsAudited}</div>
                <div className="text-[11px] text-gray-500 uppercase tracking-wide">Contracts</div>
              </div>
              <div className="py-4 px-3 text-center">
                <div className="text-xl font-bold text-white mb-0.5">24h</div>
                <div className="text-[11px] text-gray-500 uppercase tracking-wide">Avg Response</div>
              </div>
            </div>
          </div>
        </section>

        {/* Desktop hero — split layout: left text + right visual */}
        <section className="hidden md:flex relative min-h-screen flex-col floating-orbs cyber-grid">
          {/* Top section: content */}
          <div className="flex-1 flex items-center pt-28">
            <div className="max-w-7xl mx-auto px-6 w-full">
              <div className="grid grid-cols-2 gap-16 items-center">
                {/* Left: text */}
                <div className="slide-up">
                  <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 mb-6">
                    <div className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-pulse" />
                    <span className="text-sm font-medium text-gray-300">Trusted by 50+ Web3 Projects</span>
                  </div>
                  <h1 className="text-5xl md:text-6xl xl:text-7xl font-black mb-6 leading-[1.05]">
                    <span className="gradient-text">Bulletproof</span>
                    <br />
                    <span className="text-white">Smart Contract</span>
                    <br />
                    <span className="text-white">Audits</span>
                  </h1>
                  <p className="text-lg text-gray-400 mb-8 max-w-lg leading-relaxed">
                    Advanced AI-powered security analysis combined with expert manual review. Protect your DeFi protocol from exploits before they happen.
                  </p>
                  <div className="flex items-center gap-4">
                    <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="bg-lime-400 text-black px-8 py-4 rounded-xl text-base font-bold hover:bg-lime-300 transition-all pulse-glow cursor-pointer">
                      Start Free Audit
                    </button>
                    <button onClick={() => window.open('https://github.com/Hexific/audit-reports', '_blank')} className="bg-white/5 border border-white/[0.08] px-8 py-4 rounded-xl text-base font-semibold hover:bg-white/8 transition-all cursor-pointer text-gray-200 hover:border-white/20">
                      View Sample Report →
                    </button>
                  </div>
                </div>

                {/* Right: Security visual */}
                <div className="flex items-center justify-center">
                  <div className="relative w-80 h-80 xl:w-96 xl:h-96">
                    {/* Outer ring */}
                    <div className="absolute inset-0 rounded-full border border-lime-400/10 ring-rotate" style={{ animationDuration: '25s' }}>
                      {[0, 60, 120, 180, 240, 300].map((deg) => (
                        <div
                          key={deg}
                          className="absolute w-2 h-2 rounded-full bg-lime-400/30"
                          style={{
                            top: '50%',
                            left: '50%',
                            transform: `rotate(${deg}deg) translateX(calc(50% - 4px + 8rem)) translateY(-50%)`,
                          }}
                        />
                      ))}
                    </div>
                    {/* Middle ring */}
                    <div className="absolute inset-8 rounded-full border border-lime-400/15 ring-rotate-reverse" style={{ animationDuration: '18s' }}>
                      {[0, 90, 180, 270].map((deg) => (
                        <div
                          key={deg}
                          className="absolute w-1.5 h-1.5 rounded-full bg-lime-400/40"
                          style={{
                            top: '50%',
                            left: '50%',
                            transform: `rotate(${deg}deg) translateX(calc(50% - 3px + 5.5rem)) translateY(-50%)`,
                          }}
                        />
                      ))}
                    </div>
                    {/* Inner ring */}
                    <div className="absolute inset-16 rounded-full border border-lime-400/20 ring-rotate" style={{ animationDuration: '12s' }} />
                    {/* Center shield */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-32 h-32 xl:w-40 xl:h-40 bg-gradient-to-br from-[#0e1018] to-[#13161f] rounded-2xl border border-white/10 flex items-center justify-center pulse-slow shadow-2xl shadow-lime-400/10">
                        <svg className="w-16 h-16 xl:w-20 xl:h-20 text-lime-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                        </svg>
                      </div>
                    </div>
                    {/* Glow */}
                    <div className="absolute inset-0 rounded-full bg-lime-400/5 blur-3xl scale-75 pulse-slow" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom stats bar with dividers */}
          <div className="border-t border-white/[0.07] bg-[#0a0b10]/40 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex items-stretch divide-x divide-white/[0.07]">
                <div className="flex-1 py-5 px-6">
                  <div className="text-2xl font-bold text-white mb-1" id="vulnerabilities">{platformStats.vulnerabilitiesFound}</div>
                  <div className="flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                    <span className="text-xs uppercase tracking-wider text-gray-500 font-medium">Vulnerabilities Found</span>
                  </div>
                </div>
                <div className="flex-1 py-5 px-6">
                  <div className="text-2xl font-bold text-white mb-1" id="contracts-audited">{platformStats.contractsAudited}</div>
                  <div className="flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    <span className="text-xs uppercase tracking-wider text-gray-500 font-medium">Contracts Audited</span>
                  </div>
                </div>
                <div className="flex-1 py-5 px-6">
                  <div className="text-2xl font-bold text-white mb-1">24h</div>
                  <div className="flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span className="text-xs uppercase tracking-wider text-gray-500 font-medium">Avg Response Time</span>
                  </div>
                </div>
                <div className="flex-1 py-5 px-6">
                  <div className="text-2xl font-bold text-white mb-1">$50M+</div>
                  <div className="flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                    <span className="text-xs uppercase tracking-wider text-gray-500 font-medium">Funds Secured</span>
                  </div>
                </div>
                <div className="flex-1 py-5 px-6">
                  <div className="text-2xl font-bold text-white mb-1">EVM + Solana</div>
                  <div className="flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                    <span className="text-xs uppercase tracking-wider text-gray-500 font-medium">Chains Supported</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* ═══════════════════════════════════════
           SERVICES SECTION — Bento Grid, Web3-native
           ═══════════════════════════════════════ */}
      <section id="services" className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-lime-400/[0.025] rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">

          {/* ── Section Header ── */}
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

          {/* ── BENTO GRID ── */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-auto">

            {/* ╔══════════════════════════════════╗
                ║  CARD 1: FAST AUDIT  (6 cols)    ║  ← LIVE / Featured
                ╚══════════════════════════════════╝ */}
            <div className="md:col-span-7 group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0c0e14] hover:border-lime-400/25 transition-all duration-500 service-card">
              {/* Ambient glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-[radial-gradient(ellipse_at_top-left,rgba(214,237,23,0.06),transparent_60%)]" />

              {/* Top bar with live indicator */}
              <div className="flex items-center justify-between px-6 pt-5 pb-0">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 bg-lime-400/10 border border-lime-400/20 rounded-full px-2.5 py-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-pulse" />
                    <span className="text-[10px] font-bold text-lime-400 uppercase tracking-widest">Live</span>
                  </div>
                  <span className="text-[10px] font-mono text-gray-600 bg-white/[0.04] rounded px-2 py-1">v2.4.1-beta</span>
                </div>
                {/* Chain badges */}
                <div className="flex items-center gap-1.5">
                  {['ETH', 'SOL', 'BASE', 'ARB'].map((chain) => (
                    <span key={chain} className="text-[9px] font-bold font-mono px-1.5 py-0.5 rounded bg-white/[0.05] border border-white/[0.07] text-gray-400">{chain}</span>
                  ))}
                </div>
              </div>

              <div className="p-6">
                {/* Title row */}
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

                {/* Terminal preview */}
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

                {/* Feature pills */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {['200+ patterns', 'RAG-powered AI', 'PDF report', 'Solidity & Rust', 'Gas-free scan'].map((f) => (
                    <span key={f} className="text-[11px] px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.06] text-gray-400 font-medium">{f}</span>
                  ))}
                </div>

                {/* Risk severity legend */}
                <div className="flex items-center gap-3 mb-5 text-[11px] font-mono">
                  <span className="text-gray-600">Detects:</span>
                  {[['CRITICAL', 'bg-red-500/20 text-red-400 border-red-500/30'], ['HIGH', 'bg-orange-500/20 text-orange-400 border-orange-500/30'], ['MEDIUM', 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'], ['LOW', 'bg-blue-500/20 text-blue-400 border-blue-500/30']].map(([label, cls]) => (
                    <span key={label} className={`px-2 py-0.5 rounded border font-bold text-[9px] ${cls}`}>{label}</span>
                  ))}
                </div>

                <button
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full py-3 px-5 rounded-xl bg-lime-400 text-black text-sm font-black hover:bg-lime-300 transition-all duration-200 flex items-center justify-center gap-2 group/btn shadow-lg shadow-lime-400/15"
                >
                  Run Free Scan
                  <svg className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                </button>
              </div>
            </div>

            {/* ╔══════════════════════════════════╗
                ║  CARD 2: FULL AUDIT  (5 cols)    ║  ← RECOMMENDED, tall
                ╚══════════════════════════════════╝ */}
            <div className="md:col-span-5 group relative overflow-hidden rounded-2xl border border-lime-400/30 bg-[#0c0e14] hover:border-lime-400/50 transition-all duration-500 service-card">
              {/* Top glow */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-lime-400/50 to-transparent" />
              <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,rgba(214,237,23,0.05),transparent_55%)]" />

              {/* RECOMMENDED label */}
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
                  Human experts who&apos;ve seen every rug, every exploit, every edge case. They audit like hackers think — because some of them were.
                </p>

                {/* Checklist — Web3 specific */}
                <div className="space-y-2.5 mb-6">
                  {[
                    ['Reentrancy & flash loan vectors', 'lime'],
                    ['MEV sandwich & frontrun exposure', 'lime'],
                    ['Business logic & tokenomics', 'lime'],
                    ['Oracle manipulation risks', 'lime'],
                    ['Access control & proxy upgrades', 'lime'],
                    ['Cross-chain bridge vulnerabilities', 'lime'],
                  ].map(([text, color]) => (
                    <div key={text} className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full bg-lime-400/10 border border-lime-400/25 flex items-center justify-center flex-shrink-0">
                        <svg className="w-2.5 h-2.5 text-lime-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                      </div>
                      <span className="text-xs text-gray-400">{text}</span>
                    </div>
                  ))}
                </div>

                {/* Trust indicators */}
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
                  onClick={handleClick}
                  className="w-full py-3 px-5 rounded-xl border border-lime-400/40 text-lime-400 text-sm font-bold hover:bg-lime-400 hover:text-black hover:border-transparent transition-all duration-200 flex items-center justify-center gap-2 group/btn"
                >
                  Schedule Full Audit
                  <svg className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                </button>
              </div>
            </div>

            {/* ╔══════════════════════════════════╗
                ║  CARD 3: HEXICHAT  (7 cols)      ║  ← Coming Soon, AI vibes
                ╚══════════════════════════════════╝ */}
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

                {/* Fake chat preview */}
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
                  {['Reentrancy help', 'Exploit patterns', 'Code review', 'MEV queries', 'Best practices'].map(q => (
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

            {/* ╔══════════════════════════════════╗
                ║  CARD 4: AI PLAYGROUND  (5 cols) ║  ← COMING SOON, danger
                ╚══════════════════════════════════╝ */}
            <div className="md:col-span-5 group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0c0e14] hover:border-red-400/20 transition-all duration-500 service-card">
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(ellipse_at_top-right,rgba(239,68,68,0.05),transparent_60%)]" />

              {/* Danger stripe top */}
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

                {/* Attack types */}
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

          </div>{/* end bento grid */}

          {/* ── Chain / Stack Trust Bar ── */}
          <div className="mt-10 pt-8 border-t border-white/[0.05]">
            <div className="flex flex-wrap items-center justify-between gap-y-4 gap-x-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-[10px] uppercase tracking-widest text-gray-600 font-semibold">Supported:</span>
                {[
                  'Solidity', 'Vyper', 'Rust / Anchor', 'Move', 'Yul',
                ].map(lang => (
                  <span key={lang} className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/[0.06] text-gray-500">{lang}</span>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-[10px] uppercase tracking-widest text-gray-600 font-semibold">Chains:</span>
                {[
                  'Ethereum', 'Solana', 'Base', 'Arbitrum', 'Polygon', 'BNB', '+more',
                ].map(chain => (
                  <span key={chain} className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/[0.06] text-gray-500">{chain}</span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>
      {/* Solana Rug Pull Risk Analyzer */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-10 left-0 w-80 h-80 bg-lime-400/[0.03] rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-lime-400/[0.02] rounded-full blur-3xl" />
        </div>
        <div className="max-w-5xl mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-8 md:mb-10">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-xs font-semibold uppercase tracking-wide text-gray-300 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-lime-300 animate-pulse" />
              On-chain Risk Detection
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3">
              <span className="gradient-text">Solana Token</span>{' '}
              <span className="text-white">Rug Pull Risk Analyzer</span>
            </h2>
            <p className="text-sm md:text-base text-gray-500 max-w-2xl mx-auto">
              Paste any Solana SPL token mint address to run a static, on-chain
              risk detection scan. We highlight common rug-pull patterns –
              concentration of supply, control over minting, low liquidity, and
              clustered wallets. This is risk detection, not a scam verdict.
            </p>
          </div>

          <div className="bg-[#0d0f16] border border-white/[0.06] rounded-2xl p-4 md:p-6">
            <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-stretch">
              <div className="flex-1 space-y-3">
                <label className="block text-xs font-semibold text-gray-300 tracking-wide">
                  Solana Token Mint Address
                </label>
                <input
                  value={mintInput}
                  onChange={(e) => setMintInput(e.target.value)}
                  placeholder="e.g. So11111111111111111111111111111111111111112"
                  className="w-full px-3 py-2.5 rounded-lg bg-black/40 border border-gray-700 focus:border-lime-400 focus:outline-none text-sm md:text-base text-gray-100 placeholder:text-gray-500"
                />
                <p className="text-[11px] md:text-xs text-gray-400">
                  Static analysis only. We do not monitor live trading behavior
                  yet. Results are best-effort and do not guarantee that a token
                  is safe or unsafe.
                </p>
              </div>
              <div className="flex md:flex-col justify-end gap-2 md:gap-3">
                <button
                  onClick={handleRugRiskAnalyze}
                  disabled={isAnalyzing}
                  className="px-5 md:px-6 py-2.5 md:py-3 rounded-xl bg-gradient-to-r from-lime-400 to-lime-300 text-black font-semibold text-sm md:text-base hover:from-lime-300 hover:to-lime-200 disabled:opacity-60 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-lg shadow-lime-400/20"
                >
                  {isAnalyzing ? (
                    <>
                      <span className="h-4 w-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      Analyzing…
                    </>
                  ) : (
                    <>
                      Run Risk Scan
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </div>

            {analysisError && (
              <div className="mt-4 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs md:text-sm text-red-200">
                {analysisError}
              </div>
            )}

            {analysisResult && (
              <div className="mt-6 grid gap-6 md:grid-cols-[minmax(0,1.3fr),minmax(0,1fr)]">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-gray-400">
                        Overall Risk Score
                      </p>
                      <p className="text-3xl font-bold text-white">
                        {analysisResult.risk_score}
                        <span className="text-sm text-gray-400"> / 100</span>
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs uppercase tracking-wide text-gray-400">
                        Risk Level
                      </p>
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                          analysisResult.risk_level === 'HIGH'
                            ? 'bg-red-500/20 text-red-300 border border-red-500/50'
                            : analysisResult.risk_level === 'MEDIUM'
                            ? 'bg-yellow-400/10 text-yellow-200 border border-yellow-400/40'
                            : 'bg-emerald-400/10 text-emerald-200 border border-emerald-400/40'
                        }`}
                      >
                        {analysisResult.risk_level}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-gray-300 uppercase tracking-wide">
                      Key Signals
                    </p>
                    <ul className="space-y-1.5 text-xs md:text-sm text-gray-200">
                      {analysisResult.reasons?.map(
                        (reason: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-lime-300" />
                            <span>{reason}</span>
                          </li>
                        ),
                      )}
                    </ul>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-[11px] md:text-xs text-gray-300">
                    <div className="space-y-1">
                      <p className="text-gray-400">Top holder</p>
                      <p className="font-semibold">
                        {analysisResult.metrics?.top_holder_percent?.toFixed(2)}
                        %
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-gray-400">Top 10 holders</p>
                      <p className="font-semibold">
                        {analysisResult.metrics?.top10_holder_percent?.toFixed(
                          2,
                        )}
                        %
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-gray-400">Total holders</p>
                      <p className="font-semibold">
                        {analysisResult.metrics?.total_holders ?? 'Unknown'}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-gray-400">Token age</p>
                      <p className="font-semibold">
                        {analysisResult.metrics?.token_age_days != null
                          ? `${analysisResult.metrics.token_age_days.toFixed(
                              2,
                            )} days`
                          : 'Unknown'}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-gray-400">Mint authority</p>
                      <p className="font-semibold">
                        {analysisResult.metrics?.mint_authority_active
                          ? 'Active'
                          : 'Renounced / None'}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-gray-400">Freeze authority</p>
                      <p className="font-semibold">
                        {analysisResult.metrics?.freeze_authority_active
                          ? 'Active'
                          : 'None'}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-gray-400">Clustered wallets</p>
                      <p className="font-semibold">
                        {analysisResult.metrics?.clustered_wallets_detected
                          ? `Yes (${analysisResult.metrics.suspected_cluster_size} wallet cluster)`
                          : 'Not detected'}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-gray-400">Liquidity estimate</p>
                      <p className="font-semibold">
                        {analysisResult.metrics?.liquidity_estimate_usd != null
                          ? `$${analysisResult.metrics.liquidity_estimate_usd.toLocaleString()}`
                          : 'Unknown'}
                      </p>
                    </div>
                  </div>

                  <p className="mt-2 text-[10px] text-gray-500">
                    This is an automated, static on-chain risk detection
                    feature. It highlights patterns often seen in rug pulls but
                    does not prove that a token is a scam or guarantee future
                    safety.
                  </p>
                </div>

                <div className="bg-black/40 border border-gray-800 rounded-xl p-3 md:p-4 text-[10px] md:text-xs text-gray-300 overflow-auto max-h-[320px]">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold text-gray-200">
                      Raw Analyzer Output
                    </p>
                    <span className="text-[10px] text-gray-500">
                      For power users & integrators
                    </span>
                  </div>
                  <pre className="whitespace-pre-wrap break-words">
                    {JSON.stringify(analysisResult, null, 2)}
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Integrations Section */}
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

          {/* Logo Grid */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            {/* Ethereum */}
            <div className="group flex items-center justify-center h-20 w-36 sm:h-24 sm:w-40 md:h-24 md:w-44 rounded-2xl bg-white/5 border border-white/10 hover:border-lime-400/50 hover:bg-white/10 transition-all duration-300">
              <Image
                src="/integrations/ethereum.svg"
                alt="Ethereum"
                width={120}
                height={40}
                className="opacity-60 transition-all duration-300 brightness-0 invert max-h-full max-w-full object-contain"
              />
            </div>

            {/* Solana */}
            <div className="group flex items-center justify-center h-20 w-36 sm:h-24 sm:w-40 md:h-24 md:w-44 rounded-2xl bg-white/5 border border-white/10 hover:border-lime-400/50 hover:bg-white/10 transition-all duration-300">
              <Image
                src="/integrations/solana.svg"
                alt="Solana"
                width={120}
                height={40}
                className="opacity-60 transition-all duration-300 brightness-0 invert max-h-full max-w-full object-contain"
              />
            </div>

            {/* Base */}
            <div className="group flex items-center justify-center h-20 w-36 sm:h-24 sm:w-40 md:h-24 md:w-44 rounded-2xl bg-white/5 border border-white/10 hover:border-lime-400/50 hover:bg-white/10 transition-all duration-300">
              <Image
                src="/integrations/base.svg"
                alt="Base"
                width={120}
                height={40}
                className="opacity-60 transition-all duration-300 brightness-0 invert max-h-full max-w-full object-contain"
              />
            </div>

            {/* Etherscan */}
            <div className="group flex items-center justify-center h-20 w-36 sm:h-24 sm:w-40 md:h-24 md:w-44 rounded-2xl bg-white/5 border border-white/10 hover:border-lime-400/50 hover:bg-white/10 transition-all duration-300">
              <Image
                src="/integrations/etherscan.svg"
                alt="Etherscan"
                width={120}
                height={40}
                className="opacity-60 transition-all duration-300 brightness-0 invert max-h-full max-w-full object-contain"
              />
            </div>

            {/* x402scan */}
            <div className="group flex items-center justify-center h-20 w-36 sm:h-24 sm:w-40 md:h-24 md:w-44 rounded-2xl bg-white/5 border border-white/10 hover:border-lime-400/50 hover:bg-white/10 transition-all duration-300">
              <Image
                src="/integrations/x402scan.svg"
                alt="x402scan"
                width={120}
                height={40}
                className="opacity-60 transition-all duration-300 brightness-0 invert max-h-full max-w-full object-contain"
              />
            </div>

            {/* Claude AI */}
            <div className="group flex items-center justify-center h-20 w-36 sm:h-24 sm:w-40 md:h-24 md:w-44 rounded-2xl bg-white/5 border border-white/10 hover:border-lime-400/50 hover:bg-white/10 transition-all duration-300">
              <Image
                src="/integrations/claude-ai.svg"
                alt="Claude AI"
                width={120}
                height={40}
                className="opacity-60 transition-all duration-300 brightness-0 invert max-h-full max-w-full object-contain"
              />
            </div>

            {/* Open AI */}
            <div className="group flex items-center justify-center h-20 w-36 sm:h-24 sm:w-40 md:h-24 md:w-44 rounded-2xl bg-white/5 border border-white/10 hover:border-lime-400/50 hover:bg-white/10 transition-all duration-300">
              <Image
                src="/integrations/open-ai.svg"
                alt="Open AI"
                width={120}
                height={40}
                className="opacity-60 transition-all duration-300 brightness-0 invert max-h-full max-w-full object-contain"
              />
            </div>

            {/* Langchain */}
            <div className="group flex items-center justify-center h-20 w-36 sm:h-24 sm:w-40 md:h-24 md:w-44 rounded-2xl bg-white/5 border border-white/10 hover:border-lime-400/50 hover:bg-white/10 transition-all duration-300">
              <Image
                src="/integrations/langchain.svg"
                alt="Langchain"
                width={120}
                height={40}
                className="opacity-60 transition-all duration-300 brightness-0 invert max-h-full max-w-full object-contain"
              />
            </div>

            {/* Resend */}
            <div className="group flex items-center justify-center h-20 w-36 sm:h-24 sm:w-40 md:h-24 md:w-44 rounded-2xl bg-white/5 border border-white/10 hover:border-lime-400/50 hover:bg-white/10 transition-all duration-300">
              <Image
                src="/integrations/resend.svg"
                alt="Resend"
                width={120}
                height={40}
                className="opacity-60 transition-all duration-300 brightness-0 invert max-h-full max-w-full object-contain"
              />
            </div>

            {/* Helius */}
            <div className="group flex items-center justify-center h-20 w-36 sm:h-24 sm:w-40 md:h-24 md:w-44 rounded-2xl bg-white/5 border border-white/10 hover:border-lime-400/50 hover:bg-white/10 transition-all duration-300">
              <Image
                src="/integrations/helius.svg"
                alt="Helius"
                width={120}
                height={40}
                className="opacity-60 transition-all duration-300 brightness-0 invert max-h-full max-w-full object-contain"
              />
            </div>

            {/* Slither */}
            <div className="group flex items-center justify-center h-20 w-36 sm:h-24 sm:w-40 md:h-24 md:w-44 rounded-2xl bg-white/5 border border-white/10 hover:border-lime-400/50 hover:bg-white/10 transition-all duration-300">
              <Image
                src="/integrations/slither.svg"
                alt="Slither"
                width={120}
                height={40}
                className="opacity-60 transition-all duration-300 brightness-0 invert max-h-full max-w-full object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Audit Process Section */}
      <section id="process" className="py-12 md:py-20 code-pattern overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-10 md:mb-16 px-4">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold gradient-text mb-4 md:mb-6">Audit Process</h2>
            <p className="text-base md:text-xl text-gray-300 max-w-3xl mx-auto">
              Our streamlined process delivers comprehensive security analysis in record time.
            </p>
          </div>
        </div>

        {/* Infinite Carousel */}
        <div className="relative overflow-hidden group">
          {/* Gradient Masks */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#08090d] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#08090d] to-transparent z-10 pointer-events-none" />

          {/* Carousel Track - Infinite Animation + Draggable */}
          <div
            ref={carouselRef}
            className={`carousel-track flex gap-6 py-4 cursor-grab select-none`}
            onMouseDown={handleMouseDown}
          // onMouseUp={handleMouseUp}
          // onMouseMove={handleMouseMove}
          // onMouseLeave={handleMouseLeave}
          // style={{ animationPlayState: animationPaused ? 'paused' : 'running' }}
          >
            {/* Duplicate cards for infinite loop - First set */}
            {[...Array(2)].map((_, setIndex) => (
              <div key={setIndex} className="carousel-slide flex gap-6 flex-shrink-0">
                {/* Step 1 */}
                <div className="w-[350px] md:w-[400px] flex-shrink-0 group">
                  <div className="bg-[#0d0f16] border border-white/[0.06] hover:border-lime-400/20 rounded-2xl p-6 h-full hover:scale-[1.02] transition-all duration-300">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 neon-border rounded-full flex items-center justify-center text-xl font-bold group-hover:scale-110 transition-transform">1</div>
                      <h3 className="text-xl font-bold text-white">Contract Submission</h3>
                    </div>
                    <p className="text-gray-400 mb-4 text-sm leading-relaxed">Upload your smart contracts through our secure platform. We support Solidity, Vyper, and other major languages.</p>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-sm text-lime-400 font-medium">Average time: 5 minutes</span>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="w-[350px] md:w-[400px] flex-shrink-0 group">
                  <div className="bg-[#0d0f16] border border-white/[0.06] hover:border-lime-400/20 rounded-2xl p-6 h-full hover:scale-[1.02] transition-all duration-300">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 neon-border rounded-full flex items-center justify-center text-xl font-bold group-hover:scale-110 transition-transform">2</div>
                      <h3 className="text-xl font-bold text-white">Automated Analysis</h3>
                    </div>
                    <p className="text-gray-400 mb-4 text-sm leading-relaxed">Our AI engines perform comprehensive static and dynamic analysis, checking for 200+ vulnerability patterns.</p>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-sm text-lime-400 font-medium">Average time: 2-4 hours</span>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="w-[350px] md:w-[400px] flex-shrink-0 group">
                  <div className="bg-[#0d0f16] border border-white/[0.06] hover:border-lime-400/20 rounded-2xl p-6 h-full hover:scale-[1.02] transition-all duration-300">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 neon-border rounded-full flex items-center justify-center text-xl font-bold group-hover:scale-110 transition-transform">3</div>
                      <h3 className="text-xl font-bold text-white">Expert Review</h3>
                    </div>
                    <p className="text-gray-400 mb-4 text-sm leading-relaxed">Senior auditors manually review findings, test edge cases, and analyze business logic vulnerabilities.</p>
                    <p> </p>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-sm text-lime-400 font-medium">Average time: 1-3 days</span>
                    </div>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="w-[350px] md:w-[400px] flex-shrink-0 group">
                  <div className="bg-[#0d0f16] border border-white/[0.06] hover:border-lime-400/20 rounded-2xl p-6 h-full hover:scale-[1.02] transition-all duration-300">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 neon-border rounded-full flex items-center justify-center text-xl font-bold group-hover:scale-110 transition-transform">4</div>
                      <h3 className="text-xl font-bold text-white">Report Generation</h3>
                    </div>
                    <p className="text-gray-400 mb-4 text-sm leading-relaxed">Comprehensive report with findings, severity ratings, and detailed remediation recommendations.</p>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-sm text-lime-400 font-medium">Average time: 4-6 hours</span>
                    </div>
                  </div>
                </div>

                {/* Step 5 */}
                <div className="w-[350px] md:w-[400px] flex-shrink-0 group">
                  <div className="bg-[#0d0f16] border border-white/[0.06] hover:border-lime-400/20 rounded-2xl p-6 h-full hover:scale-[1.02] transition-all duration-300">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 neon-border rounded-full flex items-center justify-center text-xl font-bold group-hover:scale-110 transition-transform">5</div>
                      <h3 className="text-xl font-bold text-white">Remediation Support</h3>
                    </div>
                    <p className="text-gray-400 mb-4 text-sm leading-relaxed">Direct consultation with our team to resolve issues and validate fixes before deployment.</p>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-sm text-lime-400 font-medium">Ongoing support included</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Testimonials Section */}
      {/* <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-4xl md:text-6xl font-bold gradient-text mb-6">Trusted by Leaders</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Top DeFi protocols trust Hexific to protect their smart contracts and users&#39; funds.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-effect rounded-2xl p-8">
              <p className="text-lg mb-6">&quot;Hexific found critical vulnerabilities that other auditors missed. Their AI-powered analysis combined with expert review is unmatched.&quot;</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-lime-400/20 rounded-full flex items-center justify-center mr-4">
                  <span className="text-lime-400 font-bold text-lg">A</span>
                </div>
                <div>
                  <div className="font-bold">Alex Chen</div>
                  <div className="text-gray-400 text-sm">CTO, DeFiProtocol</div>
                </div>
              </div>
            </div>
            <div className="glass-effect rounded-2xl p-8">
              <p className="text-lg mb-6">&quot;The real-time dashboard and continuous monitoring gave us confidence to launch. Best audit experience we&#39;ve had.&quot;</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-lime-400/20 rounded-full flex items-center justify-center mr-4">
                  <span className="text-lime-400 font-bold text-lg">S</span>
                </div>
                <div>
                  <div className="font-bold">Sarah Kim</div>
                  <div className="text-gray-400 text-sm">Founder, YieldFarm</div>
                </div>
              </div>
            </div>
            <div className="glass-effect rounded-2xl p-8">
              <p className="text-lg mb-6">&quot;Their emergency response team saved us $2M when a vulnerability was discovered post-launch. Incredible service.&quot;</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-lime-400/20 rounded-full flex items-center justify-center mr-4">
                  <span className="text-lime-400 font-bold text-lg">M</span>
                </div>
                <div>
                  <div className="font-bold">Marcus Johnson</div>
                  <div className="text-gray-400 text-sm">Security Lead, LendingDAO</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      {/* CTA Section */}
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
            Join hundreds of projects that trust Hexific to protect their smart contracts and users&#39; funds.
          </p>
          <div className="bg-[#0d0f16] border border-white/[0.06] rounded-2xl p-4 sm:p-6 md:p-8 mb-6 md:mb-8">
            <div className="grid md:grid-cols-2 gap-6 md:gap-8 divide-y md:divide-y-0 md:divide-x divide-white/[0.06]">
              <div className="text-center md:pr-8">
                <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-white">Start Free Audit</h3>
                <p className="text-sm md:text-base text-gray-500 mb-4">Get started with our AI-powered vulnerability detection for free.</p>
                <button onClick={scrollDown} className="bg-lime-400 text-black px-6 md:px-8 py-2.5 md:py-3 rounded-xl text-sm md:text-base font-bold hover:bg-lime-300 transition-all pulse-glow cursor-pointer">
                  Upload Contract
                </button>
              </div>
              <div className="text-center pt-6 md:pt-0 md:pl-8">
                <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-white">Book Consultation</h3>
                <p className="text-sm md:text-base text-gray-500 mb-4">Speak with our security experts about your specific needs.</p>
                <button onClick={handleClick} className="border border-lime-400/40 text-lime-400 px-6 md:px-8 py-2.5 md:py-3 rounded-xl text-sm md:text-base hover:bg-lime-400 hover:text-black hover:border-transparent transition-all cursor-pointer font-semibold">
                  Schedule Call
                </button>
              </div>
            </div>
          </div>
          <div id="free-audit-upload" className="scroll-mt-20">
            <FreeAuditUpload />
          </div>
          {/* Contact Info */}
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
      {/* Roadmap Section */}
      <section id="roadmap" className="py-12 md:py-20 relative">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 md:mb-6 text-white">Roadmap</h2>
            <p className="text-base md:text-lg text-gray-500 max-w-2xl mx-auto">
              Our journey to make smart contract security accessible and comprehensive for everyone
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-px h-full bg-gradient-to-b from-lime-400/60 via-lime-400/20 to-transparent" />

            <div className="space-y-12">
              {/* Q4 2025 - COMPLETED */}
              <div className="relative">
                <div className="md:flex items-center">
                  {/* Timeline dot */}
                  <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-lime-400 rounded-full border-4 border-[#08090d] z-10 items-center justify-center">
                    <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>

                  {/* Content */}
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
                        <li className="flex items-start">
                          <svg className="w-5 h-5 text-lime-400 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-400">Launch on mainnet</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="w-5 h-5 text-lime-400 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-400">Real USDC payment system live</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="w-5 h-5 text-lime-400 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-400">Crypto Twitter, Discord communities engagement</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="w-5 h-5 text-lime-400 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-400">Integrate with Claude Sonnet API for AI audits</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="w-5 h-5 text-lime-400 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-400">Track which findings users ask AI about most</span>
                        </li>
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

              {/* Q1 2026 - IN PROGRESS */}
              <div className="relative">
                <div className="md:flex items-center md:flex-row-reverse">
                  {/* Timeline dot */}
                  <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-lime-400 rounded-full border-4 border-[#08090d] z-10 items-center justify-center">
                    <div className="w-3 h-3 bg-black rounded-full pulse-glow" />
                  </div>

                  {/* Content */}
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
                        <li className="flex items-start">
                          <svg className="w-5 h-5 text-lime-400 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-400">Utilize $HEXI token for enhanced AI audit capabilities</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="w-5 h-5 text-lime-400 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-400">$HEXI buy back & burn program from platform revenue</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0 rounded-full border border-lime-400/40 bg-transparent flex items-center justify-center">
                            <div className="w-1.5 h-0.5 bg-lime-400/60 rounded-full" />
                          </div>
                          <span className="text-gray-400">Audit history storage (users want to see past audits)</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0 rounded-full border border-lime-400/40 bg-transparent flex items-center justify-center">
                            <div className="w-1.5 h-0.5 bg-lime-400/60 rounded-full" />
                          </div>
                          <span className="text-gray-400">Email notifications when audit completes</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="w-5 h-5 text-lime-400 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-400">Multi-AI ensemble for better audit quality</span>
                        </li>
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

              {/* Q2 2026 - PLANNED */}
              {/* <div className="relative">
              <div className="md:flex items-center">
                
                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-lime-400/30 rounded-full border-4 border-[#000E1B] z-10 items-center justify-center">
                <div className="w-3 h-3 bg-lime-400/50 rounded-full" />
                </div>

                
                <div className="md:w-1/2 md:pr-12">
                <div className="glass-effect rounded-2xl p-8 border border-lime-400/20 hover:border-lime-400/40 transition-all">
                  <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold gradient-text">Q2 2026</h3>
                  <span className="bg-gray-700 text-lime-400 px-3 py-1 rounded-full text-xs font-bold">
                    PLANNED
                  </span>
                  </div>
                  <p className="text-gray-400 text-sm mb-6">May - Aug 2026</p>
                  
                  <h4 className="text-xl font-bold mb-4 text-white">Platform Expansion</h4>
                  
                  <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-lime-400/60 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span className="text-gray-300">Advanced security scanning features</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-lime-400/60 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span className="text-gray-300">Community-driven vulnerability database</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-lime-400/60 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    <span className="text-gray-300">Detailed analytics dashboard for audit insights</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-lime-400/60 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    <span className="text-gray-300">Referral program for community growth</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-lime-400/60 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                    <span className="text-gray-300">API access for enterprise integrations</span>
                  </li>
                  </ul>

                  <div className="mt-6 pt-6 border-t border-lime-400/20">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-lime-400">Goal:</span>
                    <span className="text-white font-bold">1000+ audits findings</span>
                  </div>
                  </div>
                </div>
                </div>
              </div>
              </div> */}

              {/* Continuous Improvements */}
              <div className="relative">
                <div className="md:flex items-center justify-center">
                  {/* Content */}
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
                        <span className="px-3 py-1.5 bg-white/[0.04] border border-white/[0.07] rounded-full text-xs text-gray-300 font-medium">
                          AI Accuracy
                        </span>
                        <span className="px-3 py-1.5 bg-white/[0.04] border border-white/[0.07] rounded-full text-xs text-gray-300 font-medium">
                          Privacy First
                        </span>
                        <span className="px-3 py-1.5 bg-white/[0.04] border border-white/[0.07] rounded-full text-xs text-gray-300 font-medium">
                          User Experience
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
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
      {/* Footer */}
      <footer className="py-8 md:py-12 border-t border-white/[0.07]">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-7 h-7 bg-lime-400 rounded-lg flex items-center justify-center">
                  <Image src="./logo.svg" alt="Hexific Logo" width={16} height={16} />
                </div>
                <span className="text-lg font-bold gradient-text">Hexific</span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">Advanced smart contract security auditing platform powered by AI and expert analysis.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-gray-300 text-sm uppercase tracking-wider">Services</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}><a className="hover:text-gray-300 hover:cursor-pointer transition-colors">Smart Contract Audits</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); alert('This feature is under development. Stay tuned!'); }} className="hover:text-gray-300 transition-colors">Continuous Monitoring</a></li>
                <li><a href="/manual-audit" className="hover:text-gray-300 transition-colors">Security Consulting</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); alert('This feature is under development. Stay tuned!'); }} className="hover:text-gray-300 transition-colors cursor-pointer">Emergency Response</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-gray-300 text-sm uppercase tracking-wider">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="/docs" className="hover:text-gray-300 transition-colors">Documentation</a></li>
                <li><a href="/learn/case-studies" className="hover:text-gray-300 transition-colors">Security Blog</a></li>
                <li><a href="/learn/vulnerabilities" className="hover:text-gray-300 transition-colors">Vulnerability Database</a></li>
                <li><a href="/learn/best-practices" className="hover:text-gray-300 transition-colors">Best Practices</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-gray-300 text-sm uppercase tracking-wider">Company</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <Link href="/privacy-policy" className="hover:text-gray-300 transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms-of-service" className="hover:text-gray-300 transition-colors">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/[0.07] pt-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-gray-600 text-sm">© 2025 Hexific. All rights reserved.</p>
              {/* Social Links */}
              <div className="flex space-x-5">
                <a
                  href="https://x.com/hexific"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-300 transition-all"
                  aria-label="X"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                </a>
                <a
                  href="https://www.linkedin.com/company/hexific/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-300 transition-all"
                  aria-label="LinkedIn"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                </a>
                <a
                  href="https://discord.gg/5v8v3X9Qhf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-300 transition-all"
                  aria-label="Discord"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" /></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};