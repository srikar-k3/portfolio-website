'use client';

import { useEffect, useRef, useState } from 'react';

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const [hlActive, setHlActive] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (e && e.isIntersecting) setHlActive(true);
      },
      {
        root: null,
        rootMargin: '0px 0px -5% 0px',
        threshold: 0,
      }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  // Entrance animation trigger
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className={`relative z-10 -mt-[100vh] min-h-[100svh] flex items-center bg-black mx-[calc(50%-50vw)] rounded-t-[48px] md:rounded-t-[56px] overflow-hidden ${hlActive ? 'hl-active' : ''}`}
    >
      {/* Subtle top gradient for depth */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/50 to-transparent pointer-events-none" />

      <div className="w-full max-w-[1300px] mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          {/* Section header with refined typography */}
          <div className={`text-center mb-12 md:mb-16 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-white uppercase select-none">
              Background
            </h2>
          </div>

          {/* Content with staggered entrance */}
          <div className="space-y-6 md:space-y-8">
            <p className={`text-gray-300 text-[17px] sm:text-[19px] md:text-[21px] leading-[1.8] transition-all duration-700 ease-out delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              With a B.S. in Computer Science, I&apos;ve always carried an equal pull toward art, and the
              blend of those interests naturally evolved into a passion for
              {' '}
              <span className="relative inline-block">
                <span className="relative z-10 font-medium text-white">digital design and products</span>
                <span aria-hidden className="hl-underline" />
              </span>
              . What started as small projects for student organizations and personal ideas eventually
              grew into an agency where I could build this work alongside others and for the clients who
              needed it.
            </p>

            {/* Highlight trigger sentinel */}
            <div ref={sentinelRef} className="h-1 w-1 opacity-0 pointer-events-none absolute" />

            <p className={`text-gray-300 text-[17px] sm:text-[19px] md:text-[21px] leading-[1.8] transition-all duration-700 ease-out delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              Along the way, I spent time exploring filmmaking and 3D media, which sharpened my sense
              for{' '}
              <span className="relative inline-block">
                <span className="relative z-10 font-medium text-white">visual storytelling</span>
                <span aria-hidden className="hl-underline delay-1" />
              </span>
              . That perspective naturally carried into the way I approach digital experiences today.
            </p>

            <p className={`text-gray-300 text-[17px] sm:text-[19px] md:text-[21px] leading-[1.8] transition-all duration-700 ease-out delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              My work brings together design and technical thinking to create digital products that feel
              {' '}
              <span className="relative inline-block">
                <span className="relative z-10 font-medium text-white">intuitive and engaging</span>
                <span aria-hidden className="hl-underline delay-2" />
              </span>
              .
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes hlSweep {
          from { transform: translateY(-50%) scaleX(0); }
          to { transform: translateY(-50%) scaleX(1); }
        }
        .hl-underline {
          position: absolute;
          left: -4px;
          right: -4px;
          top: 50%;
          height: 100%;
          background: rgba(99, 102, 241, 0.35);
          border-radius: 4px;
          transform: translateY(-50%) scaleX(0);
          transform-origin: left center;
          z-index: 0;
        }
        :global(.hl-active) .hl-underline {
          animation: hlSweep 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        :global(.hl-active) .hl-underline.delay-1 {
          animation-delay: 0.2s;
        }
        :global(.hl-active) .hl-underline.delay-2 {
          animation-delay: 0.35s;
        }
      `}</style>
    </section>
  );
}
