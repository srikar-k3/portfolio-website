'use client';

import Tilt from 'react-parallax-tilt';
import { useState } from 'react';

export default function BusinessCard() {
  const [isFlipped, setIsFlipped] = useState(true);
  const [isFlipping, setIsFlipping] = useState(false);

  const handleFlip = () => {
    // Instantly disable lighting and start flip
    setIsFlipping(true);
    setIsFlipped(!isFlipped);
    
    // Reset flipping state after animation completes
    setTimeout(() => {
      setIsFlipping(false);
    }, 700);
  };

  const handleArrowClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById('projects');
    if (!target) return;
    const wrapperEl = document.querySelector('div.fixed.top-0');
    const navbarHeight = wrapperEl
      ? (wrapperEl as HTMLElement).getBoundingClientRect().height
      : (document.querySelector('nav') as HTMLElement | null)?.getBoundingClientRect().height || 0;
    const y = target.getBoundingClientRect().top + window.scrollY - navbarHeight;
    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center py-8 bg-white" data-business-card>
      <div className="w-full max-w-sm sm:max-w-lg md:max-w-2xl mx-auto">
        <Tilt
          tiltMaxAngleX={10}
          tiltMaxAngleY={10}
          scale={1.02}
          glareEnable={true}
          glareMaxOpacity={isFlipping ? 0 : 0.2}
          glareColor="#ffffff"
          glareBorderRadius="8px"
          transitionSpeed={isFlipping ? 0 : 400}
        >
          <div 
            className="relative cursor-pointer"
            style={{ 
              perspective: '1000px',
              aspectRatio: '3.5 / 2'
            }}
            onClick={handleFlip}
          >
            <div
              className="relative w-full h-full transition-transform duration-700 ease-in-out"
              style={{
                transformStyle: 'preserve-3d',
                transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
              }}
            >
              {/* Front Side */}
              <div 
                className="absolute inset-0 rounded-xl shadow-lg flex items-center justify-center p-8"
                style={{ 
                  backfaceVisibility: 'hidden',
                  background: 'rgba(0, 0, 0, 0.35)',
                  backdropFilter: 'blur(15px)',
                  border: '1px solid rgba(255, 255, 255, 0.10)'
                }}
              >
                {/* Subtle reflection of back side */}
                <div 
                  className="absolute inset-0 flex flex-col justify-center p-8 opacity-[0.08] pointer-events-none"
                  style={{ 
                    transform: 'scaleX(-1)',
                    filter: 'blur(2px)'
                  }}
                >
                  <h2 className="text-2xl font-semibold mb-2 text-white uppercase">SRIKAR KANDULAPATI</h2>
                  <div className="w-12 h-px bg-white mb-4"></div>
                  <p className="text-base text-white mb-6">Visual & Product Designer</p>
                  <div className="space-y-2 text-sm text-white">
                    <p>srkandulapati@gmail.com</p>
                    <p>(732) 336 9707</p>
                  </div>
                </div>
                
                <div className="text-center relative z-10">
                  <div className="text-2xl font-light text-white mb-2">Portfolio</div>
                </div>
              </div>

              {/* Back Side */}
              <div 
                className="absolute inset-0 rounded-xl shadow-lg flex flex-col justify-center p-8"
                style={{ 
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                  background: 'rgba(0, 0, 0, 0.35)',
                  backdropFilter: 'blur(15px)',
                  border: '1px solid rgba(255, 255, 255, 0.10)'
                }}
              >
                {/* Subtle reflection of front side */}
                <div 
                  className="absolute inset-0 flex items-center justify-center p-8 opacity-[0.08] pointer-events-none"
                  style={{ 
                    transform: 'scaleX(-1)',
                    filter: 'blur(2px)'
                  }}
                >
                  <div className="text-2xl font-light text-white">Portfolio</div>
                </div>
                
                <div className="relative z-10">
                  <h2 className="text-2xl font-semibold mb-2 text-white uppercase">SRIKAR KANDULAPATI</h2>
                  <div className="w-12 h-px bg-white mb-4"></div>
                  <p className="text-base text-white mb-6">Visual & Product Designer</p>
                  <div className="space-y-2 text-sm text-white">
                    <p>srkandulapati@gmail.com</p>
                    <p>(732) 336 9707</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Tilt>
        {/* No gradient under header */}
        {/* Arrow like project headers */}
        <a
          href="#projects"
          onClick={handleArrowClick}
          aria-label="Scroll to projects"
          className="absolute left-1/2 -translate-x-1/2 bottom-6 text-black/80 hover:text-black transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 animate-bounce">
            <path d="M12 16.5a1 1 0 0 1-.7-.29l-6-6a1 1 0 1 1 1.4-1.42L12 14.09l5.3-5.3a1 1 0 0 1 1.4 1.42l-6 6a1 1 0 0 1-.7.29Z" />
          </svg>
        </a>
      </div>
    </section>
  );
}
