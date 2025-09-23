'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface NavigationProps {
  className?: string;
}

export default function Navigation({ className = '' }: NavigationProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isNavigating, setIsNavigating] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isOverLightBackground, setIsOverLightBackground] = useState(false);
  const router = useRouter();

  // hold a short window to force nav visible during programmatic scrolls
  const forceVisibleUntil = useRef<number>(0);

  // ------- helpers -----------------------------------------------------------
  function scrollToSection(id: string) {
    const el = document.getElementById(id);
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const pageY = rect.top + window.pageYOffset;

    const navEl = document.querySelector('nav') as HTMLElement | null;
    const navH = navEl?.getBoundingClientRect().height || 80;

    const padTop = parseFloat(getComputedStyle(el).paddingTop || '0') || 0;

    // Baseline compensation
    let PAD_FRACTION = 0.15;
    let PAD_COMP = Math.min(48, padTop * PAD_FRACTION);
    let NUDGE = -6; // slight lift so heading breathes under nav

    // Fine-tune Contact a smidge lower (requested)
    if (id === 'contact') {
      // push down ~10px more vs others
      NUDGE += 20;
    }

    const targetY = Math.max(0, pageY - navH - PAD_COMP + NUDGE);

    // Mark programmatic scroll so the hide-on-scroll logic doesn't kick in
    sessionStorage.setItem('programmaticScrollActive', 'true');
    forceVisibleUntil.current = Date.now() + 1200; // keep it visible ~1.2s

    window.scrollTo({ top: targetY, behavior: 'smooth' });

    // clear the flag shortly after
    window.setTimeout(() => {
      sessionStorage.removeItem('programmaticScrollActive');
    }, 900);
  }
  // ---------------------------------------------------------------------------

  useEffect(() => {
    const controlNavbar = () => {
      const now = Date.now();
      const currentScrollY = window.scrollY;

      // pages with a light hero (for tinting if you use it later)
      const path = window.location.pathname;
      const isYouTubePage = path.includes('/youtube-chapter-generator');
      const isSapaPage = path.includes('/rutgers-sapa');
      const hasLightHero = isYouTubePage || isSapaPage;

      if (hasLightHero) {
        const heroH = window.innerHeight;
        const isOverHero = currentScrollY < heroH - 100;
        setIsOverLightBackground(isOverHero);
      } else {
        setIsOverLightBackground(false);
      }

      const isHashNavigating = sessionStorage.getItem('navigatingToSection') === 'true';
      const programmatic = sessionStorage.getItem('programmaticScrollActive') === 'true';

      // During programmatic/hash navigation or the force-visible window: keep shown
      if (isNavigating || isHashNavigating || programmatic || now < forceVisibleUntil.current) {
        setIsVisible(true);
        setLastScrollY(currentScrollY);
        return;
      }

      if (currentScrollY < 100) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY + 4) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY - 2) {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', controlNavbar, { passive: true });
    controlNavbar();
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY, isNavigating]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleNavigation = () => {
    setIsNavigating(true);
    setIsVisible(true);
    // keep nav forced-visible for navigation window
    forceVisibleUntil.current = Date.now() + 1500;
    setTimeout(() => setIsNavigating(false), 2000);
  };

  return (
    <div
      className={`w-full fixed top-0 z-50 p-4 transition-transform ${
        isVisible ? 'duration-500 translate-y-0' : 'duration-200 -translate-y-full'
      } ${className}`}
      style={{
        transitionTimingFunction: isVisible
          ? 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
          : 'ease-out',
      }}
    >
      <nav
        className="mx-auto max-w-max px-2 py-2 rounded-full relative overflow-visible transition-all duration-500 flex items-center gap-5"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* liquid glow */}
        <div
          className="absolute pointer-events-none transition-opacity duration-300"
          style={{
            left: mousePos.x - 75,
            top: mousePos.y - 75,
            width: 150,
            height: 150,
            background:
              'radial-gradient(circle, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.12) 35%, transparent 65%)',
            borderRadius: '50%',
            opacity: isHovering ? 1 : 0,
            filter: 'blur(30px)',
          }}
        />

        {/* S (home) */}
        <Link
          href="/"
          onClick={handleNavigation}
          className="rounded-full flex items-center justify-center shadow-[0_8px_30px_rgba(0,0,0,0.45)] text-white/90 hover:text-white text-lg font-semibold w-12 h-12"
          style={{
            background: 'rgba(0, 0, 0, 0.35)',
            backdropFilter: 'blur(14px)',
            border: '1px solid rgba(255,255,255,0.12)',
          }}
          aria-label="Home"
        >
          S
        </Link>

        {/* tabs */}
        <div
          className="flex items-center gap-3 rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.45)] px-3.5 py-2"
          style={{
            background: 'rgba(0, 0, 0, 0.35)',
            backdropFilter: 'blur(14px)',
            border: '1px solid rgba(255,255,255,0.12)',
          }}
        >
          <Link
            href="/about"
            onClick={handleNavigation}
            className="text-white/90 hover:text-white text-[15px] font-medium px-5 py-2 rounded-full transition-colors"
          >
            About
          </Link>

          {/* Projects */}
          <button
            className="text-white/90 hover:text-white text-[15px] font-medium px-5 py-2 rounded-full transition-colors cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              handleNavigation();

              const onPage = !!document.getElementById('projects');
              if (onPage) {
                scrollToSection('projects');
              } else {
                sessionStorage.setItem('navigatingToSection', 'true');
                sessionStorage.setItem('navHash', '#projects');
                // mark programmatic before navigation
                sessionStorage.setItem('programmaticScrollActive', 'true');
                window.location.href = '/#projects';
              }
            }}
          >
            Projects
          </button>

          {/* Contact */}
          <button
            className="text-white/90 hover:text-white text-[15px] font-medium px-5 py-2 rounded-full transition-colors cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              handleNavigation();

              const onPage = !!document.getElementById('contact');
              if (onPage) {
                scrollToSection('contact');
              } else {
                sessionStorage.setItem('navigatingToSection', 'true');
                sessionStorage.setItem('navHash', '#contact');
                sessionStorage.setItem('programmaticScrollActive', 'true');
                window.location.href = '/#contact';
              }
            }}
          >
            Contact
          </button>
        </div>
      </nav>
    </div>
  );
}