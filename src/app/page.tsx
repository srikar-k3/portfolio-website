'use client';

import Navigation from '@/components/Navigation';
import HourglassHero from '@/components/HourglassHero';
import AboutSection from '@/components/AboutSection';
import ProjectsSection from '@/components/ProjectsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import { useEffect, useState } from 'react';

export default function Home() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isOverBusinessCard, setIsOverBusinessCard] = useState(false);
  const [isOverProject, setIsOverProject] = useState(false);

  // ---- helpers --------------------------------------------------------------
  function getNavHeight() {
    const navEl = document.querySelector('nav') as HTMLElement | null;
    return navEl?.getBoundingClientRect().height || 80;
  }

  /**
   * Scroll to a section id, compensating for:
   * - fixed navbar height
   * - section's own top padding (partial, to avoid overshoot)
   * - per-section nudge (e.g., contact needs to sit a tad lower)
   */
  function scrollToSectionWithComp(id: string, behavior: ScrollBehavior = 'smooth') {
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
    if (id === 'projects') {
      NUDGE += 0; // fine as-is
    } else if (id === 'contact') {
      // per your request, push contact slightly LOWER (further from nav)
      NUDGE += 20;
    }

    const targetY = Math.max(0, pageY - navH - PAD_COMP + NUDGE);

    // keep nav visible during programmatic jump
    window.sessionStorage.setItem('navigatingToSection', 'true');
    window.scrollTo({ top: targetY, behavior });

    // clear after a short window so Navigation can resume normal hide/show
    window.setTimeout(() => {
      window.sessionStorage.removeItem('navigatingToSection');
    }, 1200);
  }
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
      }

      // suppress glow over any project tiles
      const projectElements = document.querySelectorAll('[data-project-item]');
      let overProject = false;
      projectElements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        if (
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom
        ) {
          overProject = true;
        }
      });
      setIsOverProject(overProject);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Handle scrolling to #projects / #contact on initial load or when coming from another page
  useEffect(() => {
    const hash = window.location.hash; // e.g., "#projects" or "#contact"
    if (!hash) return;

    // wait a tick to ensure layout is stable and nav has mounted
    requestAnimationFrame(() => {
      const id = hash.replace('#', '');
      // use instant jump on load to avoid flash; nav stays visible via session flag
      scrollToSectionWithComp(id, 'auto');
    });
  }, []);

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

      {/* Full-bleed Home Header */}
      <HourglassHero />

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