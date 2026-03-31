'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { WalletConnectButton } from "@/components/wallet-connect-button";
import ContactSection from '@/components/landing/ContactSection';
import IntegrationsSection from '@/components/landing/IntegrationsSection';
import ProcessSection from '@/components/landing/ProcessSection';
import RoadmapSection from '@/components/landing/RoadmapSection';
import ServicesSection from '@/components/landing/ServicesSection';
import SiteFooter from '@/components/landing/SiteFooter';

type RugRiskResult = {
  risk_score?: number;
  risk_level?: 'HIGH' | 'MEDIUM' | 'LOW' | string;
  reasons?: string[];
  metrics?: {
    top_holder_percent?: number;
    top10_holder_percent?: number;
    total_holders?: number;
    token_age_days?: number;
    mint_authority_active?: boolean;
    freeze_authority_active?: boolean;
    clustered_wallets_detected?: boolean;
    suspected_cluster_size?: number;
    liquidity_estimate_usd?: number;
  };
};

export default function Page() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [countersStarted, setCountersStarted] = useState(false);
  const [hexiPrice, setHexiPrice] = useState<number | null>(null);
  const [priceChange24h, setPriceChange24h] = useState<number | null>(null);
  const [platformStats, setPlatformStats] = useState<{ vulnerabilitiesFound: number; contractsAudited: number }>({ vulnerabilitiesFound: 700, contractsAudited: 50 });
  const [statsLoaded, setStatsLoaded] = useState(false);
  const [displayVulns, setDisplayVulns] = useState(0);
  const [displayContracts, setDisplayContracts] = useState(0);
  const animationPlayedRef = useRef(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentTranslateX, setCurrentTranslateX] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mintInput, setMintInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<RugRiskResult | null>(null);
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

    const handleMouseUp = () => {
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

    const matrixChars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(0);
    const active = Array(columns).fill(false);
    const delay = Array.from({ length: columns }, () =>
      Math.floor(Math.random() * 150)
    );
    let tick = 0;

    const drawMatrix = () => {
      ctx.fillStyle = 'rgba(8, 9, 13, 0.06)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#D6ED17';
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < drops.length; i++) {
        if (!active[i]) {
          if (tick >= delay[i]) active[i] = true;
          else continue;
        }
        const text = matrixChars[Math.floor(Math.random() * matrixChars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      tick++;
    };

    const interval = setInterval(drawMatrix, 100);
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resize);
    };
  }, []);

  // Observe when stats bar scrolls into view for slide-up and counter trigger
  useEffect(() => {
    if (countersStarted) return;

    const slideObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.id === 'contracts-audited') {
          setCountersStarted(true);
          observer.disconnect();
        }
        if (entry.isIntersecting) {
          entry.target.classList.add('slide-up');
        }
      });
    }, { threshold: 0.3 });

    document
      .querySelectorAll<HTMLElement>('.feature-card, #contracts-audited')
      .forEach(el => slideObserver.observe(el));

    return () => slideObserver.disconnect();
  }, [countersStarted]);

  // Animate counters only when BOTH the element is visible AND real API data has loaded.
  // This prevents the animation from running with fallback default values.
  useEffect(() => {
    if (!countersStarted || !statsLoaded) return;

    if (animationPlayedRef.current) {
      // Subsequent API refresh — update directly without re-animating
      setDisplayVulns(platformStats.vulnerabilitiesFound);
      setDisplayContracts(platformStats.contractsAudited);
      return;
    }

    animationPlayedRef.current = true;

    const animateTo = (target: number, setter: (v: number) => void) => {
      const duration = 1800;
      const startTime = performance.now();
      const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
      const tick = (now: number) => {
        const progress = Math.min((now - startTime) / duration, 1);
        setter(Math.floor(easeOut(progress) * target));
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    animateTo(platformStats.vulnerabilitiesFound, setDisplayVulns);
    animateTo(platformStats.contractsAudited, setDisplayContracts);
  }, [countersStarted, statsLoaded, platformStats]);

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
        setStatsLoaded(true);
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
      <section className="relative min-h-screen flex flex-col pt-24 md:pt-0 floating-orbs cyber-grid">
        <div className="flex-1 flex items-center md:pt-28 pb-8 md:pb-0">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-0 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
              <div className="slide-up">
                <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 py-1.5 md:px-4 md:py-2 mb-5 md:mb-6">
                  <div className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-pulse" />
                  <span className="text-xs md:text-sm font-medium text-gray-300">Trusted by 50+ Web3 Projects</span>
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl md:text-6xl xl:text-7xl font-black mb-4 md:mb-6 leading-tight md:leading-[1.05]">
                  <span className="gradient-text">Smart Contract</span>
                  <br />
                  <span className="text-white">Audit Services</span>
                </h1>
                <p className="text-sm md:text-lg text-gray-400 mb-6 md:mb-8 max-w-sm md:max-w-lg leading-relaxed">
                  Advanced AI-powered security analysis combined with expert manual review. Protect your DeFi protocol from exploits before they happen.
                </p>
                <div className="flex flex-col md:flex-row gap-3 md:gap-4 mb-8 md:mb-0">
                  <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="bg-lime-400 text-black px-6 py-3 md:px-8 md:py-4 rounded-xl text-base font-bold hover:bg-lime-300 transition-all cursor-pointer pulse-glow">
                    Start Free Audit
                  </button>
                  <button onClick={() => window.open('https://github.com/Hexific/audit-reports', '_blank')} className="bg-white/5 border border-white/10 md:border-white/[0.08] px-6 py-3 md:px-8 md:py-4 rounded-xl text-base font-semibold hover:bg-white/8 transition-all cursor-pointer text-gray-200 md:hover:border-white/20">
                    View Sample Report<span className="hidden md:inline"> →</span>
                  </button>
                </div>
              </div>

              {/* Right: Security visual (desktop only) */}
              <div className="hidden md:flex items-center justify-center">
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

          {/* Stats bar — mobile (compact 3-col) */}
          <div className="md:hidden border-t border-white/[0.07] bg-[#0a0b10]/60">
            <div className="grid grid-cols-3">
              <div className="py-4 px-3 text-center border-r border-white/[0.07]">
                <div className="text-xl font-bold text-white mb-0.5">{displayVulns}</div>
                <div className="text-[11px] text-gray-500 uppercase tracking-wide">Vulns Found</div>
              </div>
              <div className="py-4 px-3 text-center border-r border-white/[0.07]">
                <div className="text-xl font-bold text-white mb-0.5">{displayContracts}</div>
                <div className="text-[11px] text-gray-500 uppercase tracking-wide">Contracts</div>
              </div>
              <div className="py-4 px-3 text-center">
                <div className="text-xl font-bold text-white mb-0.5">24h</div>
                <div className="text-[11px] text-gray-500 uppercase tracking-wide">Avg Response</div>
              </div>
            </div>
          </div>

          {/* Bottom stats bar — desktop */}
          <div className="hidden md:block border-t border-white/[0.07] bg-[#0a0b10]/40 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex items-stretch divide-x divide-white/[0.07]">
                <div className="flex-1 py-5 px-6">
                  <div className="text-2xl font-bold text-white mb-1" id="vulnerabilities">{displayVulns}</div>
                  <div className="flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                    <span className="text-xs uppercase tracking-wider text-gray-500 font-medium">Vulnerabilities Found</span>
                  </div>
                </div>
                <div className="flex-1 py-5 px-6">
                  <div className="text-2xl font-bold text-white mb-1" id="contracts-audited">{displayContracts}</div>
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
                  <div className="text-2xl font-bold text-white mb-1">$5k+</div>
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
      <ServicesSection onScrollToContact={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} onScheduleAudit={handleClick} />
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
      
      <IntegrationsSection />
      <ProcessSection carouselRef={carouselRef} onMouseDown={handleMouseDown} />
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
      <ContactSection onUploadContract={scrollDown} onScheduleCall={handleClick} />
      {/* Roadmap Section */}
      {false && (<><section id="roadmap" className="py-12 md:py-20 relative">
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
      </section></>)}
      <RoadmapSection />
      <SiteFooter onScrollToContact={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} />
    </div>
  );
};