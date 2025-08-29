'use client';

import Tilt from 'react-parallax-tilt';
import { useState } from 'react';

export default function BusinessCard() {
  const [isFlipped, setIsFlipped] = useState(true);

  return (
    <section className="mb-20">
      <div className="w-full max-w-2xl mx-auto">
        <Tilt
          tiltMaxAngleX={8}
          tiltMaxAngleY={8}
          glareEnable={true}
          glareMaxOpacity={0.2}
          glareColor="#ffffff"
          glareBorderRadius="8px"
        >
          <div 
            className="relative cursor-pointer"
            style={{ 
              perspective: '1000px',
              aspectRatio: '3.5 / 2'
            }}
            onClick={() => setIsFlipped(!isFlipped)}
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
                className="absolute inset-0 bg-white border border-gray-200 rounded-lg shadow-lg flex items-center justify-center p-8"
                style={{ backfaceVisibility: 'hidden' }}
              >
                <div className="text-center">
                  <div className="text-2xl font-light text-gray-600 mb-2">portfolio</div>
                </div>
              </div>

              {/* Back Side */}
              <div 
                className="absolute inset-0 bg-white border border-gray-200 rounded-lg shadow-lg flex flex-col justify-center p-8"
                style={{ 
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)'
                }}
              >
                <h2 className="text-2xl font-semibold mb-2">Srikar Kandulapati</h2>
                <div className="w-12 h-px bg-black mb-4"></div>
                <p className="text-base text-gray-600 mb-6">visual & product designer</p>
                <div className="space-y-2 text-sm text-gray-500">
                  <p>srkandulapati@gmail.com</p>
                  <p>(732) 336 9707</p>
                </div>
              </div>
            </div>
          </div>
        </Tilt>
      </div>
    </section>
  );
}