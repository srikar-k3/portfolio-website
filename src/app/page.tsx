'use client';

import Navigation from '@/components/Navigation';
import HourglassHero from '@/components/HourglassHero';
import AboutSection from '@/components/AboutSection';
import ProjectsSection from '@/components/ProjectsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import { useEffect, useState } from 'react';

type XY = { x: number; y: number };

export default function Home() {
  const [mousePos, setMousePos] = useState<XY>({ x: 0, y: 0 });
  const [isOverBusinessCard, setIsOverBusinessCard] = useState<boolean>(false);
  const [isOverProject, setIsOverProject] = useState<boolean>(false);
  const [isLoadingHero, setIsLoadingHero] = useState<boolean>(true);
  const [loadPct, setLoadPct] = useState<number>(1);
  const [hideOverlay, setHideOverlay] = useState<boolean>(false);

  // ---- helpers --------------------------------------------------------------
  const getNavHeight = (): number => {
    const navEl = document.querySelector('nav') as HTMLElement | null;
    return navEl?.getBoundingClientRect().height ?? 80;
  };
  // --------------------------------------------------------------------------

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });

      // OPTIONAL: if you still have a business card element you want to suppress glow over
      const businessCardElement = document.querySelector('[data-business-card]');
      if (businessCardElement) {
        const rect = businessCardElement.getBoundingClientRect();
        const over =
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom;
        setIsOverBusinessCard(over);
      } else {
        setIsOverBusinessCard(false);
      }

      // suppress glow over any project tiles
      const projectElements: NodeListOf<Element> = document.querySelectorAll('[data-project-item]');
      let overProject = false;
      for (const element of projectElements) {
        const r = element.getBoundingClientRect();
        if (e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom) {
          overProject = true;
          break;
        }
      }
      setIsOverProject(overProject);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Handle scrolling to #projects / #contact on initial load or when coming from another page
  // Inlined logic to avoid react-hooks/exhaustive-deps warning.
  useEffect(() => {
    const { hash } = window.location; // e.g., "#projects" or "#contact"
    if (!hash) return;

    // wait a tick to ensure layout is stable and nav has mounted
    requestAnimationFrame(() => {
      const id = hash.replace('#', '');
      const el = document.getElementById(id);
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const pageY = rect.top + window.pageYOffset;

      const navH = getNavHeight();
      const padTop = parseFloat(getComputedStyle(el).paddingTop || '0') || 0;

      // use a fraction of the padding so we don't overshoot when sections have big top padding
      const PAD_FRACTION = 0.25;
      const PAD_COMP = Math.min(56, padTop * PAD_FRACTION);

      // baseline nudge
      let NUDGE = 10;

      // special-case nudges
      if (id === 'contact') {
        // per your request, push contact slightly LOWER (further from nav)
        NUDGE += 20;
      }

      const targetY = Math.max(0, pageY - navH - PAD_COMP + NUDGE);

      // keep nav visible during programmatic jump
      window.sessionStorage.setItem('navigatingToSection', 'true');
      window.scrollTo({ top: targetY, behavior: 'auto' });

      // clear after a short window so Navigation can resume normal hide/show
      window.setTimeout(() => {
        window.sessionStorage.removeItem('navigatingToSection');
      }, 1200);
    });
  }, []);
  // --------------------------------------------------------------------------

  return (
    <div
      className="min-h-screen text-white relative w-full"
      style={{ background: 'linear-gradient(135deg, #000000 0%, #0d0d0d 50%, #000000 100%)' }}
    >
      {/* Subtle noise overlay */}
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='5.0' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Global mouse glow effect - behind all content */}
      <div
        className="fixed pointer-events-none z-0 transition-opacity duration-300"
        style={{
          left: mousePos.x - 75,
          top: mousePos.y - 75,
          width: 150,
          height: 150,
          background:
            'radial-gradient(circle, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.02) 30%, transparent 60%)',
          borderRadius: '50%',
          filter: 'blur(30px)',
          opacity: isOverBusinessCard || isOverProject ? 0 : 1,
        }}
      />

      {/* Navigation */}
      <Navigation />

      {/* Loading overlay for hourglass */}
      {(!hideOverlay && isLoadingHero) && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black transition-opacity duration-500" style={{ opacity: isLoadingHero ? 1 : 0 }}>
          <div className="w-[72%] max-w-[560px]">
            <div className="h-2 w-full bg-white/20 overflow-hidden" aria-label="Loading hourglass" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={loadPct}>
              <div className="h-full bg-indigo-400 transition-[width] duration-200 ease-out" style={{ width: `${loadPct}%` }} />
            </div>
            <div className="mt-3 text-xs text-white/70 text-center">{loadPct < 100 ? `${loadPct}%` : 'Completed'}</div>
          </div>
        </div>
      )}

      {/* Full-bleed Home Header */}
      <HourglassHero
        onProgress={(p) => setLoadPct(p)}
        onLoaded={() => {
          setLoadPct(100);
          setIsLoadingHero(false);
          // allow fade-out to complete before removing from DOM
          setTimeout(() => setHideOverlay(true), 550);
        }}
      />

      {/* Main content (matches your site gutters) */}
      <main className="px-6 md:px-12">
        <div className="max-w-[1300px] mx-auto">
          {/* About Section */}
          <AboutSection />

          {/* Projects Section */}
          <ProjectsSection />

          {/* Contact Section */}
          <ContactSection />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
