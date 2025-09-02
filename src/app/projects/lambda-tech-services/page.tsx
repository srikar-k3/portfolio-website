'use client';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function LambdaTechServices() {
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
        className="w-full h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-screen overflow-hidden"
      >
        <div 
          className="h-full"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        >
          <Image 
            src="/lambda_mockup_1.jpg" 
            alt="Lambda Tech Services Brand Identity" 
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
            {/* Row 1: Project Overview */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-6xl mx-auto"
            >
              <h3 className="text-4xl font-semibold text-white mb-8 text-center">PROJECT OVERVIEW</h3>
              <div>
                <p className="text-gray-400 text-lg leading-relaxed mb-4">
                  Lambda Tech Services required a comprehensive brand identity and UI/UX design system that would position them as a premium technology consultancy. The project encompassed complete visual identity development, digital design systems, and collaborative development work.
                </p>
                <p className="text-gray-400 text-lg leading-relaxed">
                  Working directly with clients in an Agile environment, I created wireframes, interactive prototypes, and contributed Flutter development across multiple applications while establishing a cohesive brand presence that communicates technical expertise and reliability.
                </p>
              </div>
            </motion.div>

            {/* Row 2: Image (Left) + Logo Design (Right) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid md:grid-cols-2 gap-16 items-center"
            >
              <div className="aspect-[4/3] rounded-lg overflow-hidden">
                <Image 
                  src="/lambdaPFP.png" 
                  alt="Lambda Tech Services Logo Variations" 
                  width={800} 
                  height={600}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="text-4xl font-semibold text-white mb-6">LOGO DESIGN</h3>
                <p className="text-gray-400 text-lg leading-relaxed mb-4">
                  The Lambda Tech Services logo combines mathematical precision with modern technology aesthetics. The lambda symbol (λ) represents functional programming and mathematical elegance, core principles in advanced software development.
                </p>
                <p className="text-gray-400 text-lg leading-relaxed mb-4">
                  Created multiple logo variations including horizontal, stacked, and icon-only versions to ensure versatility across all applications - from business cards to large-scale digital displays.
                </p>
                <p className="text-gray-400 text-lg leading-relaxed">
                  The design maintains readability and impact at any size while establishing immediate recognition in the competitive tech consultancy landscape.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Color Palette - Centered Title + Full Width Display */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-24"
          >
            <h3 className="text-4xl font-semibold text-white mb-4 text-center">COLOR PALETTE</h3>
          </motion.section>
        </div>
      </main>

      {/* Full Width Color Palette Display */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="w-full mb-16"
      >
        <div className="bg-gray-200 aspect-[4/1] overflow-hidden">
          <div className="w-full h-full flex group">
            {/* Rich Black */}
            <div className="flex-1 flex flex-col items-center justify-center text-white cursor-pointer transition-all duration-300 group-hover:opacity-50 hover:!opacity-100" style={{backgroundColor: '#020025'}}>
              <div className="text-lg font-medium transition-all duration-300 hover:scale-110">#020025</div>
              <div className="text-sm opacity-90 transition-all duration-300 hover:scale-110">Rich Black</div>
            </div>
            {/* Slate Gray */}
            <div className="flex-1 flex flex-col items-center justify-center text-white cursor-pointer transition-all duration-300 group-hover:opacity-50 hover:!opacity-100" style={{backgroundColor: '#61727d'}}>
              <div className="text-lg font-medium transition-all duration-300 hover:scale-110">#61727d</div>
              <div className="text-sm opacity-90 transition-all duration-300 hover:scale-110">Slate Gray</div>
            </div>
            {/* Red Orange */}
            <div className="flex-1 flex flex-col items-center justify-center text-white cursor-pointer transition-all duration-300 group-hover:opacity-50 hover:!opacity-100" style={{backgroundColor: '#e86637'}}>
              <div className="text-lg font-medium transition-all duration-300 hover:scale-110">#e86637</div>
              <div className="text-sm opacity-90 transition-all duration-300 hover:scale-110">Red Orange</div>
            </div>
            {/* Ghost White */}
            <div className="flex-1 flex flex-col items-center justify-center text-gray-300 cursor-pointer transition-all duration-300 group-hover:opacity-50 hover:!opacity-100" style={{backgroundColor: '#fbf7f8'}}>
              <div className="text-lg font-medium transition-all duration-300 hover:scale-110">#fbf7f8</div>
              <div className="text-sm opacity-90 transition-all duration-300 hover:scale-110">Ghost White</div>
            </div>
          </div>
        </div>
      </motion.section>

      <main className="px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          {/* Typography Section */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="py-16"
          >
            <h3 className="text-4xl font-semibold text-white mb-12 text-center">TYPOGRAPHY</h3>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-8 rounded-lg">
                <h4 className="text-2xl font-medium text-white mb-6">Primary Font</h4>
                <div className="space-y-4">
                  <div className="text-4xl font-bold text-white">Inter Bold</div>
                  <div className="text-2xl font-semibold text-gray-200">Inter Semibold</div>
                  <div className="text-lg font-medium text-gray-300">Inter Medium</div>
                  <div className="text-base font-normal text-gray-400">Inter Regular</div>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-8 rounded-lg">
                <h4 className="text-2xl font-medium text-white mb-6">Usage Guidelines</h4>
                <div className="space-y-3">
                  <p className="text-gray-300 text-sm"><span className="font-semibold text-white">Headlines:</span> Inter Bold, 32-48px</p>
                  <p className="text-gray-300 text-sm"><span className="font-semibold text-white">Subheadings:</span> Inter Semibold, 20-28px</p>
                  <p className="text-gray-300 text-sm"><span className="font-semibold text-white">Body Text:</span> Inter Regular, 16-18px</p>
                  <p className="text-gray-300 text-sm"><span className="font-semibold text-white">Captions:</span> Inter Medium, 12-14px</p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Website Design Section */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="py-16 grid md:grid-cols-2 gap-16 items-center"
          >
            <div>
              <h3 className="text-4xl font-semibold text-white mb-6">WEBSITE DESIGN</h3>
              <p className="text-gray-400 text-lg leading-relaxed mb-4">
                Designed and prototyped a comprehensive website experience that showcases Lambda Tech Services&apos; technical capabilities while maintaining user-friendly navigation and clear service communication.
              </p>
              <p className="text-gray-400 text-lg leading-relaxed mb-4">
                Created detailed wireframes and interactive prototypes that guided the development process, ensuring seamless user experience across all devices and touchpoints.
              </p>
              <p className="text-gray-400 text-lg leading-relaxed">
                The design system emphasizes clean layouts, strategic use of whitespace, and intuitive information architecture that converts visitors into qualified leads.
              </p>
            </div>
            <div className="aspect-[4/3] rounded-lg overflow-hidden">
              <Image 
                src="/lambda_website_mockup.jpg" 
                alt="Lambda Tech Services Website Mockup" 
                width={800} 
                height={600}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.section>

        </div>
      </main>
      *
      {/* Footer */}
      <Footer />
    </div>
  );
}
