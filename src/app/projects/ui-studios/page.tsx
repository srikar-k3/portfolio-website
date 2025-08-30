'use client';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function UIStudios() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Navigation */}
      <Navigation />
      
      {/* Full Width Hero Image */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full h-[calc(100vh-80px)] overflow-hidden"
      >
        <div 
          className="h-full"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        >
          <Image 
            src="/thumbnail_V2.png" 
            alt="U&I Studios Brand Identity Showcase" 
            width={1920} 
            height={1080}
            className="w-full h-full object-cover"
          />
        </div>
      </motion.section>

      <main className="px-6 md:px-12">
        <div className="max-w-6xl mx-auto py-24">

          {/* Alternating Content Sections */}
          <div className="space-y-24">
            {/* Row 1: Project Overview (Left) + Image (Right) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid md:grid-cols-2 gap-16 items-center"
            >
              <div>
                <h3 className="text-4xl font-semibold text-black mb-6 text-center md:text-left">PROJECT OVERVIEW</h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-4">
                  U&I Studios is a comprehensive visual identity and video production project for an immigration interview series. The project focuses on creating authentic, emotionally resonant branding that honors the personal stories of people building new lives in America.
                </p>
                <p className="text-gray-600 text-lg leading-relaxed">
                  From logo design to video editing, every element was crafted to reflect the human experience of immigration while maintaining professional standards for interview content distribution and audience engagement.
                </p>
              </div>
              <div className="bg-black aspect-[4/3] rounded-lg overflow-hidden flex items-center justify-center">
                <Image 
                  src="/u&i_white_logo_trans.png" 
                  alt="U&I Studios Logo" 
                  width={400} 
                  height={400}
                  className="w-auto h-auto max-w-full max-h-full object-contain"
                />
              </div>
            </motion.div>

            {/* Row 2: Image (Left) + Channel Identity (Right) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid md:grid-cols-2 gap-16 items-center"
            >
              <div className="aspect-[4/3] bg-white rounded-lg overflow-hidden">
                <Image 
                  src="/u&i channel identity.png" 
                  alt="U&I Studios Channel Identity Design" 
                  width={800} 
                  height={600}
                  className="w-full h-full object-contain"
                />
              </div>

              <div>
                <h3 className="text-4xl font-semibold text-black mb-6 text-center md:text-left">CHANNEL IDENTITY</h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-4">
                  I developed a comprehensive visual identity system that captures the essence of personal immigration stories through a scrapbook-like aesthetic. This nostalgic approach creates an intimate connection to memories and personal narratives, using layered textures and handcrafted elements that honor the human stories being shared.
                </p>
                <p className="text-gray-600 text-lg leading-relaxed mb-4">
                  The scrapbook aesthetic extends to the custom introduction animation created in After Effects, featuring original assets and a personally composed audio track. This cohesive approach reinforces the intimate, memory-driven brand identity across all interview episodes and thumbnails.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Post-Production - Centered Title + Full Width Image */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-24"
          >
            <h3 className="text-4xl font-semibold text-black mb-4 text-center">POST-PRODUCTION</h3>
          </motion.section>
        </div>
      </main>

      {/* Interactive Before/After Green Screen Slider */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="w-full mb-16"
      >
        <div className="bg-black aspect-[3/1] overflow-hidden relative select-none">
          {/* Before Image (Green Screen) - Now as base */}
          <div className="absolute inset-0">
            <Image 
              src="/before green screen.png" 
              alt="Before: Green Screen Raw Footage" 
              width={1920} 
              height={640}
              className="w-full h-full object-contain"
            />
          </div>
          
          {/* After Image (Final Edit) - Now reveals on drag */}
          <div 
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
          >
            <Image 
              src="/after green screen.png" 
              alt="After: Final Edited Interview" 
              width={1920} 
              height={640}
              className="w-full h-full object-contain"
            />
          </div>
          
          {/* Slider Handle */}
          <div 
            className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize flex items-center justify-center shadow-lg select-none"
            style={{ left: `${sliderPosition}%` }}
            onMouseDown={(e) => {
              e.preventDefault();
              const container = e.currentTarget.parentElement;
              const img = container?.querySelector('img');
              if (!container || !img) return;
              
              const containerRect = container.getBoundingClientRect();
              
              // Wait for next frame to ensure image is rendered
              requestAnimationFrame(() => {
                const imgComputedStyle = window.getComputedStyle(img);
                const imgNaturalWidth = img.naturalWidth;
                const imgNaturalHeight = img.naturalHeight;
                const containerWidth = containerRect.width;
                const containerHeight = containerRect.height;
                
                // Calculate the displayed image dimensions with object-contain
                const imgAspectRatio = imgNaturalWidth / imgNaturalHeight;
                const containerAspectRatio = containerWidth / containerHeight;
                
                let displayedWidth, displayedHeight;
                
                if (imgAspectRatio > containerAspectRatio) {
                  // Image is wider - constrained by container width
                  displayedWidth = containerWidth;
                  displayedHeight = containerWidth / imgAspectRatio;
                } else {
                  // Image is taller - constrained by container height  
                  displayedHeight = containerHeight;
                  displayedWidth = containerHeight * imgAspectRatio;
                }
                
                const leftOffset = (containerWidth - displayedWidth) / 2;
                const rightOffset = leftOffset + displayedWidth;
                
                const leftPercent = (leftOffset / containerWidth) * 100;
                const rightPercent = (rightOffset / containerWidth) * 100;
                
                const handleMouseMove = (e: MouseEvent) => {
                  e.preventDefault();
                  const x = e.clientX - containerRect.left;
                  const percentage = (x / containerWidth) * 100;
                  
                  const constrainedPercentage = Math.max(
                    leftPercent, 
                    Math.min(rightPercent, percentage)
                  );
                  
                  setSliderPosition(constrainedPercentage);
                };
                
                const handleMouseUp = (e: MouseEvent) => {
                  e.preventDefault();
                  document.removeEventListener('mousemove', handleMouseMove);
                  document.removeEventListener('mouseup', handleMouseUp);
                };
                
                document.addEventListener('mousemove', handleMouseMove);
                document.addEventListener('mouseup', handleMouseUp);
              });
            }}
          >
            <div className="w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center select-none">
              <div className="w-1 h-4 bg-gray-400 rounded"></div>
            </div>
          </div>
        </div>
      </motion.section>

      <main className="px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          {/* New Section 1: Title left, text right */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="py-16 grid md:grid-cols-2 gap-16 items-center"
          >
            <div>
              <h3 className="text-4xl font-semibold text-black text-center md:text-left">LIMITATIONS</h3>
            </div>
            <div>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                Working within budget constraints and 1080p green screen footage presented significant technical challenges that required creative problem-solving throughout the production process.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                The limitations of the source footage quality meant I could only push the post-production work so far before encountering resolution and compression artifacts that would compromise the final output quality.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                To overcome environmental limitations, I created custom environments in Blender, designing and utilizing 3D assets to build immersive backgrounds that elevated the production value within the technical constraints of the available footage.
              </p>
            </div>
          </motion.section>
          
          {/* New Section 2: Title left, text right */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="py-16 grid md:grid-cols-2 gap-16 items-center"
          >
            <div>
              <h3 className="text-4xl font-semibold text-black text-center md:text-left">NEXT STEPS</h3>
            </div>
            <div>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                The interview series will continue expanding with additional guests, featuring more personal immigration stories that showcase the diverse experiences of people building new lives in America.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                Marketing strategy will focus on building stronger social media engagement across platforms, creating more touchpoints for audience interaction and community building around the immigration narrative.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Development of YouTube Shorts content will boost overall views and engagement, utilizing bite-sized storytelling formats to reach broader audiences and drive traffic to the full-length interview episodes.
              </p>
            </div>
          </motion.section>
        </div>
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}