'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

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

  // keep nav visible during programmatic scrolls
  const forceVisibleUntil = useRef<number>(0);

  // Scroll with padding compensation
  function scrollToSection(id: string) {
    const el = document.getElementById(id);
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const pageY = rect.top + window.pageYOffset;

    const navEl = document.querySelector('nav') as HTMLElement | null;
    const navH = navEl?.getBoundingClientRect().height || 80;

    const padTop = parseFloat(getComputedStyle(el).paddingTop || '0') || 0;

    // Baseline compensation
    const PAD_FRACTION = 0.15;
    const PAD_COMP = Math.min(48, padTop * PAD_FRACTION);

    // Give headings some air under the nav
    let NUDGE = -6;

    // Fine-tune contact lower by ~20px
    if (id === 'contact') NUDGE += 20;

    const targetY = Math.max(0, pageY - navH - PAD_COMP + NUDGE);

    sessionStorage.setItem('programmaticScrollActive', 'true');
    forceVisibleUntil.current = Date.now() + 1200;

    window.scrollTo({ top: targetY, behavior: 'smooth' });

    setTimeout(() => {
      sessionStorage.removeItem('programmaticScrollActive');
    }, 900);
  }

  // Handle initial hash (reload or cross-page nav)
  useEffect(() => {
    const hash = window.location.hash?.replace('#', '');
    if (hash === 'projects' || hash === 'contact') {
      requestAnimationFrame(() => {
        forceVisibleUntil.current = Date.now() + 1500;
        sessionStorage.setItem('programmaticScrollActive', 'true');
        scrollToSection(hash);
        setTimeout(() => {
          sessionStorage.removeItem('navigatingToSection');
          sessionStorage.removeItem('navHash');
          sessionStorage.removeItem('programmaticScrollActive');
        }, 1600);
      });
    }
  }, []);

  // Show/hide nav on manual scroll, but keep visible during programmatic jumps
  useEffect(() => {
    const onScroll = () => {
      const now = Date.now();
      const y = window.scrollY;

      // pages with a light hero for visual state (preps you to style on this)
      const path = window.location.pathname;
      const hasLightHero = path.includes('/youtube-chapter-generator') || path.includes('/rutgers-sapa');
      if (hasLightHero) {
        const heroH = window.innerHeight;
        setIsOverLightBackground(y < heroH - 100);
      } else {
        setIsOverLightBackground(false);
      }

      const hashNav = sessionStorage.getItem('navigatingToSection') === 'true';
      const programmatic = sessionStorage.getItem('programmaticScrollActive') === 'true';

      if (isNavigating || hashNav || programmatic || now < forceVisibleUntil.current) {
        setIsVisible(true);
        setLastScrollY(y);
        return;
      }

      if (y < 100) setIsVisible(true);
      else if (y > lastScrollY + 4) setIsVisible(false);
      else if (y < lastScrollY - 2) setIsVisible(true);

      setLastScrollY(y);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [lastScrollY, isNavigating]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleNavigation = () => {
    setIsNavigating(true);
    setIsVisible(true);
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
        data-light={isOverLightBackground ? 'true' : 'false'}
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
              if (document.getElementById('projects')) {
                scrollToSection('projects');
              } else {
                sessionStorage.setItem('navigatingToSection', 'true');
                sessionStorage.setItem('navHash', '#projects');
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
              if (document.getElementById('contact')) {
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