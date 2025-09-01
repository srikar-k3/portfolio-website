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

  return (
    <section className="mb-20" data-business-card>
      <div className="w-full max-w-2xl mx-auto">
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
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255, 255, 255, 0.15)'
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
                  <h2 className="text-2xl font-semibold mb-2 text-white">Srikar Kandulapati</h2>
                  <div className="w-12 h-px bg-white mb-4"></div>
                  <p className="text-base text-gray-300 mb-6">visual & product designer</p>
                  <div className="space-y-2 text-sm text-gray-400">
                    <p>srkandulapati@gmail.com</p>
                    <p>(732) 336 9707</p>
                  </div>
                </div>
                
                <div className="text-center relative z-10">
                  <div className="text-2xl font-light text-white mb-2">portfolio</div>
                </div>
              </div>

              {/* Back Side */}
              <div 
                className="absolute inset-0 rounded-xl shadow-lg flex flex-col justify-center p-8"
                style={{ 
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255, 255, 255, 0.15)'
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
                  <div className="text-2xl font-light text-white">portfolio</div>
                </div>
                
                <div className="relative z-10">
                  <h2 className="text-2xl font-semibold mb-2 text-white">Srikar Kandulapati</h2>
                  <div className="w-12 h-px bg-white mb-4"></div>
                  <p className="text-base text-gray-300 mb-6">visual & product designer</p>
                  <div className="space-y-2 text-sm text-gray-400">
                    <p>srkandulapati@gmail.com</p>
                    <p>(732) 336 9707</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Tilt>
      </div>
    </section>
  );
}