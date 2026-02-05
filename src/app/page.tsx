'use client';
import HourglassHero from '@/components/HourglassHero';
import AboutSection from '@/components/AboutSection';
import ProjectsSection from '@/components/ProjectsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import { useEffect, useState, useRef } from 'react';

type XY = { x: number; y: number };

export default function Home() {
  const [mousePos, setMousePos] = useState<XY>({ x: 0, y: 0 });
  const [isOverBusinessCard, setIsOverBusinessCard] = useState<boolean>(false);
  const [isOverProject, setIsOverProject] = useState<boolean>(false);
  const [isLoadingHero, setIsLoadingHero] = useState<boolean>(true);
  const [, setLoadPct] = useState<number>(1);
  const [hideOverlay, setHideOverlay] = useState<boolean>(false);
  const [playSplit, setPlaySplit] = useState<boolean>(false);
  const loaderRootRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const loaderLeftRef = useRef<HTMLSpanElement | null>(null);
  const loaderRightRef = useRef<HTMLSpanElement | null>(null);
  const [overlayFade, setOverlayFade] = useState(false);
  const [loaderReady, setLoaderReady] = useState(false);

  useEffect(() => {
    let done = false;
    (async () => {
      try {
        if (document.fonts?.ready) { await document.fonts.ready; }
      } catch {}
      if (done) return;
      requestAnimationFrame(() => setLoaderReady(true));
    })();
    return () => { done = true; };
  }, []);
  const [rampActive, setRampActive] = useState<boolean>(true);

  // Time-based ramp to ensure visible progression even without total bytes
  useEffect(() => {
    if (!isLoadingHero || !rampActive) return;
    let raf: number | null = null;
    const start = performance.now();
    const duration = 2800; // slower: ms to reach ~95%
    const tick = () => {
      const t = Math.min(1, (performance.now() - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      // Chunky/blocky steps: snap to 4% increments
      const raw = 1 + eased * 94; // 1..95
      const step = 4; // percent per block
      const target = Math.min(95, Math.max(1, Math.round(raw / step) * step));
      setLoadPct((prev) => (prev < target ? target : prev));
      if (t < 1 && isLoadingHero && rampActive) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { if (raf) cancelAnimationFrame(raf); };
  }, [isLoadingHero, rampActive]);

  // ---- helpers --------------------------------------------------------------
  const getNavHeight = (): number => 0;
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
      {/* Subtle noise overlay - using CSS class from globals */}
      <div className="noise-overlay" />

      {/* Global mouse glow effect - enhanced */}
      <div
        className="mouse-glow"
        style={{
          left: mousePos.x - 90,
          top: mousePos.y - 90,
          opacity: isOverBusinessCard || isOverProject ? 0 : 1,
        }}
      />

      {/* Navigation removed per request */}

      {/* Loading overlay for hourglass - enhanced */}
      {!hideOverlay && (
        <div ref={overlayRef} className={`overlay fixed inset-0 z-[1000] flex items-center justify-center bg-black ${overlayFade ? 'fadeout' : ''}`}>
          {/* Subtle radial gradient behind loader */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.08)_0%,transparent_50%)]" />

          <div ref={loaderRootRef} className={`loader ${playSplit ? 'split' : 'idle'}`} aria-hidden>
            <div className={`loader-words ${loaderReady ? 'ready' : 'hidden'} uppercase tracking-[0.18em] text-white text-xs sm:text-sm font-normal`}>
              <span className="combined">SRKRFOLIO</span>
              <span ref={loaderLeftRef} className="left" style={{ opacity: 0, visibility: 'hidden' }}>SRKR</span>
              <span ref={loaderRightRef} className="right" style={{ opacity: 0, visibility: 'hidden' }}>PORTFOLIO</span>
            </div>
          </div>
          <style jsx>{`
            .overlay {
              opacity: 1;
              transition: opacity 1.8s cubic-bezier(0.16, 1, 0.3, 1);
              will-change: opacity;
            }
            .overlay.fadeout { opacity: 0; }
            .loader { position: relative; }
            .loader-words { position: relative; width: 100%; height: 1em; }
            .loader-words.hidden { opacity: 0; }
            .loader-words.ready { opacity: 1; transition: opacity .3s ease; }
            /* Combined word fades in smoothly */
            .loader-words .combined {
              opacity: 0;
              transform: translate(-50%, -50%) scale(.97);
              letter-spacing: 0.22em;
            }
            .loader-words.ready .combined {
              opacity: 1;
              transform: translate(-50%, -50%) scale(1);
              transition: opacity .6s ease, transform .6s cubic-bezier(0.16, 1, 0.3, 1), letter-spacing .6s ease;
              letter-spacing: 0.18em;
            }
            /* Center only top-level loader spans */
            .loader-words > span { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); white-space: nowrap; }
            /* Prevent pre-split bleed */
            .loader-words .left, .loader-words .right { opacity: 0; visibility: hidden; }
            /* Idle state */
            .loader.idle .left, .loader.idle .right {
              opacity: 0;
              visibility: hidden;
              transform: translate(-50%, -50%);
              transition: transform 1.1s cubic-bezier(.16,1,.3,1), opacity .3s ease;
            }
            /* Split animation */
            .loader.split .combined {
              opacity: 0;
              visibility: hidden;
              transform: translate(-50%, -50%) scale(.97);
              transition: opacity .25s ease, transform .25s ease;
            }
            .loader.split .left, .loader.split .right { opacity: 1; visibility: visible; }
            .loader.split .left {
              transform: translate(-50%, -50%) translate(var(--left-x, -42vw), var(--left-y, 0px));
              transition: transform 1.1s cubic-bezier(.16,1,.3,1);
            }
            .loader.split .right {
              transform: translate(-50%, -50%) translate(var(--right-x, 42vw), var(--right-y, 0px));
              transition: transform 1.1s cubic-bezier(.16,1,.3,1);
            }
          `}</style>
        </div>
      )}

      {/* HERO — sticky scene over a tall track, white background */}
      <section id="hero" className="relative h-[200vh] bg-white">
        <div className="sticky top-0 h-screen overflow-hidden flex items-stretch">
          <HourglassHero
            onProgress={(p) => {
              setRampActive(false);
              setLoadPct((prev) => (p > prev ? p : prev));
            }}
            onLoaded={() => {
              setLoadPct(100);
              setIsLoadingHero(false);
              const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
              if (prefersReduced) {
                // Skip split: fade overlay only
                setOverlayFade(true);
                setTimeout(() => setHideOverlay(true), 2000);
                return;
              }
              // Measure target positions and animate to exact hero overlay positions
              const measureAndPlay = async () => {
                try {
                  // Ensure fonts/layout are ready
                  if (document.fonts?.ready) { await document.fonts.ready; }
                } catch {}
                // Two RAFs to settle layout
                await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
                try {
                  const leftTarget = document.getElementById('hero-label-left');
                  const rightTarget = document.getElementById('hero-label-right');
                  const leftNode = loaderLeftRef.current;
                  const rightNode = loaderRightRef.current;
                  const root = loaderRootRef.current;
                  if (leftTarget && rightTarget && leftNode && rightNode && root) {
                    // Clear inline hiding so measurements are correct post-split start
                    leftNode.style.removeProperty('opacity');
                    leftNode.style.removeProperty('visibility');
                    rightNode.style.removeProperty('opacity');
                    rightNode.style.removeProperty('visibility');
                    const ltr = leftTarget.getBoundingClientRect();
                    const rtr = rightTarget.getBoundingClientRect();
                    const lsr = leftNode.getBoundingClientRect();
                    const rsr = rightNode.getBoundingClientRect();
                    // Edge-aligned deltas for optical precision
                    const dxL = ltr.left - lsr.left; const dyL = ltr.top - lsr.top;
                    const dxR = rtr.right - rsr.right; const dyR = rtr.top - rsr.top;
                    root.style.setProperty('--left-x', `${dxL}px`);
                    root.style.setProperty('--left-y', `${dyL}px`);
                    root.style.setProperty('--right-x', `${dxR}px`);
                    root.style.setProperty('--right-y', `${dyR}px`);
                  }
                } catch {}
                const overlayEl = overlayRef.current;
                const leftEl = loaderLeftRef.current;
                const rightEl = loaderRightRef.current;
                let doneCount = 0;
                const tryFade = () => {
                  if (++doneCount < 2) return; // wait for both left and right
                  setOverlayFade(true);
                  if (overlayEl) {
                    const onFadeEnd = (ev: Event) => {
                      if ((ev as TransitionEvent).propertyName === 'opacity') {
                        setHideOverlay(true);
                        overlayEl.removeEventListener('transitionend', onFadeEnd);
                      }
                    };
                    overlayEl.addEventListener('transitionend', onFadeEnd);
                  } else {
                    setHideOverlay(true);
                  }
                  // cleanup listeners
                  if (leftEl) leftEl.removeEventListener('transitionend', onLeftEnd);
                  if (rightEl) rightEl.removeEventListener('transitionend', onRightEnd);
                };
                const onLeftEnd = (e: Event) => { if ((e as TransitionEvent).propertyName === 'transform') tryFade(); };
                const onRightEnd = (e: Event) => { if ((e as TransitionEvent).propertyName === 'transform') tryFade(); };
                if (leftEl) leftEl.addEventListener('transitionend', onLeftEnd);
                if (rightEl) rightEl.addEventListener('transitionend', onRightEnd);
                // Small delay so combined has presence before splitting
                setTimeout(() => setPlaySplit(true), 600);
                // Safety: ensure overlay disappears even if transitionend is missed
                // Safety fallback: start fade after a comfortable timeout if events are missed
                setTimeout(() => { setOverlayFade(true); setTimeout(() => setHideOverlay(true), 2000); }, 3000);
              };
              measureAndPlay();
            }}
            hideOverlays={!hideOverlay}
          />
        </div>
      </section>

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
