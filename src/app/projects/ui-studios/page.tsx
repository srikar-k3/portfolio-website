'use client';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

export default function UIStudios() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleArrowClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const container = document.getElementById('ui-content');
    if (!container) return;
    const firstSection = container.querySelector('section');
    const el = (firstSection as HTMLElement) || container;
    const wrapperEl = document.querySelector('div.fixed.top-0');
    const navbarHeight = wrapperEl
      ? (wrapperEl as HTMLElement).getBoundingClientRect().height
      : (document.querySelector('nav') as HTMLElement | null)?.getBoundingClientRect().height || 0;
    const paddingTop = parseFloat(window.getComputedStyle(el).paddingTop || '0') || 0;
    const y = el.getBoundingClientRect().top + window.scrollY + paddingTop - navbarHeight;
    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen text-white relative w-full max-w-full overflow-x-hidden" style={{background: 'linear-gradient(135deg, #000000 0%, #0d0d0d 50%, #000000 100%)'}}>
      {/* Subtle noise overlay */}
      <div className="absolute inset-0 opacity-[0.08] pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='5.0' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
      }}></div>

      {/* Global mouse glow effect - behind all content */}
      <div
        className="fixed pointer-events-none z-0 transition-opacity duration-300"
        style={{
          left: mousePos.x - 75,
          top: mousePos.y - 75,
          width: 150,
          height: 150,
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.02) 30%, transparent 60%)',
          borderRadius: '50%',
          filter: 'blur(30px)',
        }}
      />
      {/* Navigation */}
      <Navigation />
      
      {/* Full Width Hero Image */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-screen overflow-hidden"
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
        {/* Bottom gradient + arrow */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent via-black/30 to-black/60" />
        <a href="#ui-content" onClick={handleArrowClick} aria-label="Scroll to content" className="absolute left-1/2 -translate-x-1/2 bottom-6 text-white/80 hover:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 animate-bounce">
            <path d="M12 16.5a1 1 0 0 1-.7-.29l-6-6a1 1 0 1 1 1.4-1.42L12 14.09l5.3-5.3a1 1 0 0 1 1.4 1.42l-6 6a1 1 0 0 1-.7.29Z" />
          </svg>
        </a>
      </motion.section>

      <main className="px-6 md:px-12" id="ui-content">
        <div className="max-w-[1300px] mx-auto">

          {/* Project Overview (text + meta) */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="pt-[144px] pb-[72px]"
          >
            <div className="grid md:grid-cols-12 gap-12 items-start">
              <div className="md:col-span-8">
                <h3 className="text-2xl font-semibold text-white mb-3 text-center md:text-left">Overview</h3>
                <p className="text-gray-300 text-[20px] leading-relaxed mb-4">
                  U&I Studios is a comprehensive visual identity and video production project for an immigration interview series. The project focuses on creating authentic, emotionally resonant branding that honors the personal stories of people building new lives in America.
                </p>
                <p className="text-gray-300 text-[20px] leading-relaxed">
                  From logo design to video editing, every element was crafted to reflect the human experience of immigration while maintaining professional standards for interview content distribution and audience engagement.
                </p>
              </div>
              <div className="md:col-span-4">
                <div className="mb-7">
                  <p className="text-[20px] text-white/90">Client</p>
                  <p className="text-[20px] text-white/60 mt-1">U&amp;I Studios</p>
                </div>
                <div className="flex flex-wrap gap-x-3 gap-y-3">
                  {[
                    'Brand Identity',
                    'Logo Design',
                    'Motion Graphics',
                    'Video Editing',
                    'Thumbnail Design'
                  ].map((label) => (
                    <span key={label} className="inline-flex items-center rounded-full border border-white/20 text-white/80 text-xs tracking-wide px-3 py-1">
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>

          {/* Project Overview (image) */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="py-[72px]"
          >
            <div className="grid md:grid-cols-12">
              <div className="md:col-span-12 rounded-xl bg-black flex items-center justify-center h-[85vh]">
                <Image 
                  src="/u&i_white_logo_trans.png" 
                  alt="U&I Studios Logo" 
                  width={1600} 
                  height={1600}
                  className="w-[90%] md:w-[95%] h-auto max-h-[95%] object-contain"
                />
              </div>
            </div>
          </motion.section>

          {/* Channel Identity (text) */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="py-[72px]"
          >
            <div className="grid md:grid-cols-12">
              <div className="md:col-span-8">
                <h3 className="text-2xl font-semibold text-white mb-3 text-center md:text-left">Channel Identity</h3>
                <p className="text-gray-300 text-[20px] leading-relaxed mb-4">
                  I developed a comprehensive visual identity system that captures the essence of personal immigration stories through a scrapbook-like aesthetic. This nostalgic approach creates an intimate connection to memories and personal narratives, using layered textures and handcrafted elements that honor the human stories being shared.
                </p>
                <p className="text-gray-300 text-[20px] leading-relaxed">
                  The scrapbook aesthetic extends to the custom introduction animation created in After Effects, featuring original assets and a personally composed audio track. This cohesive approach reinforces the intimate, memory-driven brand identity across all interview episodes and thumbnails.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Channel Identity (image) */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="py-[72px]"
          >
            <div className="grid md:grid-cols-12">
              <div className="md:col-span-12 rounded-xl overflow-hidden">
                <Image 
                  src="/u&i channel identity.png" 
                  alt="U&I Studios Channel Identity Design" 
                  width={2000} 
                  height={1500}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </motion.section>

          {/* Post-Production */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="py-[72px]"
          >
            <h3 className="text-2xl font-semibold text-white mb-6 text-center md:text-left">Post‑Production</h3>
            <div className="grid md:grid-cols-12">
              <div className="md:col-span-8">
                <p className="text-gray-300 text-[20px] leading-relaxed mb-4">
                  Working within budget constraints and 1080p green screen footage presented significant technical challenges that required creative problem‑solving throughout the production process.
                </p>
                <p className="text-gray-300 text-[20px] leading-relaxed">
                  To overcome environmental limitations, I created custom environments in Blender, designing and utilizing 3D assets to build immersive backgrounds that elevated the production value within the technical constraints of the available footage.
                </p>
              </div>
            </div>
          </motion.section>
        </div>
      </main>

      {/* Interactive Before/After Green Screen Slider */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="w-full py-[72px]"
      >
        <div ref={sliderRef} className="bg-black relative select-none max-w-[1300px] mx-auto rounded-xl overflow-hidden aspect-[4/3]">
          {/* Before Image (Green Screen) - Now as base */}
          <div className="absolute inset-0">
            <Image 
              src="/before green screen.png" 
              alt="Before: Green Screen Raw Footage" 
              width={1920} 
              height={640}
              className="w-full h-full object-cover object-top"
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
              className="w-full h-full object-cover object-top"
            />
          </div>
          
          {/* Slider Handle */}
          <div 
            className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize flex items-center justify-center shadow-lg select-none"
            style={{ left: `${sliderPosition}%` }}
            onMouseDown={(e) => {
              e.preventDefault();
              const container = sliderRef.current;
              if (!container) return;
              const rect = container.getBoundingClientRect();
              const onMove = (ev: MouseEvent) => {
                const x = ev.clientX - rect.left;
                const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
                setSliderPosition(pct);
              };
              const onUp = () => {
                document.removeEventListener('mousemove', onMove);
                document.removeEventListener('mouseup', onUp);
              };
              document.addEventListener('mousemove', onMove);
              document.addEventListener('mouseup', onUp);
            }}
          >
            <div className="w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center select-none">
              <div className="w-1 h-4 bg-gray-400 rounded"></div>
            </div>
          </div>
          {/* Labels */}
          <div className="absolute left-3 top-3 text-xs font-medium bg-black/50 px-2 py-1 rounded">Before</div>
          <div className="absolute right-3 top-3 text-xs font-medium bg-black/50 px-2 py-1 rounded">After</div>
        </div>
      </motion.section>

      <main className="px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          {/* (Removed Limitations section; content merged into Post‑Production) */}
          
          {/* Next Steps (text block, consistent with others) */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="py-[72px]"
          >
            <div className="grid md:grid-cols-12">
              <div className="md:col-span-12">
                <h3 className="text-2xl font-semibold text-white mb-3 text-center md:text-left">Next Steps</h3>
                <div className="max-w-[900px]">
                  <p className="text-gray-300 text-[20px] leading-relaxed mb-4">
                    The interview series will continue expanding with additional guests, featuring more personal immigration stories that showcase the diverse experiences of people building new lives in America.
                  </p>
                  <p className="text-gray-300 text-[20px] leading-relaxed mb-4">
                    Marketing strategy will focus on building stronger social media engagement across platforms, creating more touchpoints for audience interaction and community building around the immigration narrative.
                  </p>
                  <p className="text-gray-300 text-[20px] leading-relaxed">
                    Development of YouTube Shorts content will boost overall views and engagement, utilizing bite-sized storytelling formats to reach broader audiences and drive traffic to the full‑length interview episodes.
                  </p>
                </div>
              </div>
            </div>
          </motion.section>
        </div>
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
