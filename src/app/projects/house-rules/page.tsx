'use client';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function HouseRules() {
  // const [activeFeatureIndex, setActiveFeatureIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleArrowClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const container = document.getElementById('house-rules-content');
    if (!container) return;
    const firstSection = container.querySelector('section');
    const el = (firstSection as HTMLElement) || container as HTMLElement;
    const wrapperEl = document.querySelector('div.fixed.top-0');
    const navbarHeight = wrapperEl
      ? (wrapperEl as HTMLElement).getBoundingClientRect().height
      : (document.querySelector('nav') as HTMLElement | null)?.getBoundingClientRect().height || 0;
    const paddingTop = parseFloat(window.getComputedStyle(el).paddingTop || '0') || 0;
    const y = el.getBoundingClientRect().top + window.scrollY + paddingTop - navbarHeight;
    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  const features = [
    {
      title: "Flexible Chore Management",
      description: "Bump overdue chores to extend deadlines by 24 hours, pass chores when unavailable for others to pick up, and automatically open past-due chores to all housemates for completion."
    },
    {
      title: "Rule Change Approval", 
      description: "Any modifications to house rules require consensus from all housemates before becoming permanent, ensuring everyone stays on the same page and preventing unilateral changes."
    },
    {
      title: "Reputation Tracking",
      description: "Activity tracking records all bumps, passes, and pickups to show reliability. Stats carry over to new houses so future roommates can see your track record as a housemate."
    }
  ];

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
            src="/house_rules_hero_section_V2.png" 
            alt="House Rules App Hero Section" 
            width={1920} 
            height={1080}
            priority
            className="w-full h-full object-cover"
          />
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent via-black/30 to-black/60" />
        <a href="#house-rules-content" onClick={handleArrowClick} aria-label="Scroll to content" className="absolute left-1/2 -translate-x-1/2 bottom-6 text-white/80 hover:text-white transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 animate-bounce">
            <path d="M12 16.5a1 1 0 0 1-.7-.29l-6-6a1 1 0 1 1 1.4-1.42L12 14.09l5.3-5.3a1 1 0 0 1 1.4 1.42l-6 6a1 1 0 0 1-.7.29Z" />
          </svg>
        </a>
      </motion.section>

      <main className="px-6 md:px-12">
        {/* Alternating Content Sections */}
        <div className="max-w-[1300px] mx-auto" id="house-rules-content">
            {/* Row 1: App Overview */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid md:grid-cols-12 gap-12 items-start pt-[144px] pb-[72px]"
            >
              <div className="md:col-span-8">
                <h3 className="text-2xl font-semibold text-white mb-3 text-left">Overview</h3>
                <p className="text-gray-300 text-[20px] leading-relaxed mb-4">
                  House Rules is an iOS app that turns roommate agreements into living systems — clear rules, flexible chore management, and transparent accountability that reduce friction and keep households running smoothly.
                </p>
                <p className="text-gray-300 text-[20px] leading-relaxed">
                  Built with SwiftUI and Firebase for real‑time collaboration, it helps houses adapt rules together, track activity fairly, and stay aligned without constant reminders.
                </p>
              </div>
              <div className="md:col-span-4">
                <div className="mb-7">
                  <p className="text-[20px] text-white/90">Client</p>
                  <p className="text-[20px] text-white/60 mt-1">Personal Project</p>
                </div>
                <div className="flex flex-wrap gap-x-3 gap-y-3">
                  {['Product Design','iOS (SwiftUI)','Firebase','UX Writing','Prototyping'].map((label) => (
                    <span key={label} className="inline-flex items-center rounded-full border border-white/20 text-white/80 text-xs tracking-wide px-3 py-1">{label}</span>
                  ))}
                </div>
              </div>
            </motion.section>

            {/* Row 2: Carousel (Left) + Key Features (Right) */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="py-[72px]"
            >
              <div className="grid md:grid-cols-2 gap-16 items-center">
              {/* Interactive Carousel - Commented Out */}
              {/* <div className="relative">
                <div className="bg-gray-200 aspect-[4/3] rounded-xl overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-300 flex items-center justify-center relative">
                    <div 
                      className={`text-gray-400 text-sm absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                        activeFeatureIndex === 0 ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      Chore Rotation Image
                    </div>
                    <div 
                      className={`text-gray-400 text-sm absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                        activeFeatureIndex === 1 ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      Voting System Image
                    </div>
                    <div 
                      className={`text-gray-400 text-sm absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                        activeFeatureIndex === 2 ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      Activity Tracking Image
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-center space-x-2 mt-4">
                  {[0, 1, 2].map((index) => (
                    <button
                      key={index}
                      className={`w-3 h-3 rounded-full transition-colors duration-300 bg-gray-300`}
                      aria-label={`Carousel dot ${index + 1}`}
                    />
                  ))}
                </div>
              </div> */}
              <div>
                <h3 className="text-2xl font-semibold text-white mb-3">Key Features</h3>
                <div className="space-y-4">
                  {features.map((feature, index) => (
                    <div 
                      key={index}
                      // onMouseEnter={() => setActiveFeatureIndex(index)}
                      className="cursor-pointer transition-all duration-300 hover:bg-black/30 p-4 -m-4 rounded-xl"
                    >
                      <h4 className="text-xl font-medium text-gray-200 mb-1">{feature.title}</h4>
                      <p className="text-gray-300 text-[18px] leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features Image */}
              <div className="aspect-[4/3] rounded-xl overflow-hidden">
                <Image 
                  src="/house_rules_features.png" 
                  alt="House Rules Key Features Overview" 
                  width={800} 
                  height={600}
                  className="w-full h-full object-cover"
                />
              </div>
              </div>
            </motion.section>
          </div>

          <div className="max-w-[1300px] mx-auto">
          {/* Technical Stack - Centered Three Columns */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="py-[72px]"
          >
            <div className="text-left">
              <h3 className="text-2xl font-semibold text-white mb-6">Technical Stack</h3>
              <div className="grid md:grid-cols-3 gap-12">
              <div>
                <h4 className="text-lg font-medium text-gray-300 mb-2">Frontend</h4>
                <p className="text-gray-300 text-[18px] leading-relaxed">
                  Swift + SwiftUI for a smooth native iOS experience.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-medium text-gray-300 mb-2">Backend</h4>
                <p className="text-gray-300 text-[18px] leading-relaxed">
                  Firebase for auth, real-time sync, and storage.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-medium text-gray-300 mb-2">Architecture</h4>
                <p className="text-gray-300 text-[18px] leading-relaxed">
                  MVVM-inspired with observable view models and Cloud Functions.
                </p>
              </div>
              </div>
            </div>
          </motion.section>

        {/* App Icon Design - Title + Full Width Image */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="py-[72px]"
        >
          <h3 className="text-2xl font-semibold text-white mb-6">App Icon Design</h3>
          <div className="bg-white aspect-[7/2] overflow-hidden rounded-xl">
            <Image src="/house_rules_icon_blue.png" alt="House Rules App Icon Design Blueprint" width={1600} height={800} quality={100} priority className="w-full h-full object-cover" />
          </div>
        </motion.section>

      {/* Coming Soon Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.0 }}
        className="py-[72px]"
      >
        <div>
          <h3 className="text-2xl font-semibold text-white text-left mb-8">Progress</h3>
          
          {/* Progress Bar */}
          <div className="relative">
            {/* Progress Line */}
            <div className="absolute top-6 left-0 right-0 h-1 bg-gray-700"></div>
            <div className="absolute top-6 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500" style={{width: '60%'}}></div>
            
            {/* Progress Steps */}
            <div className="flex justify-between relative">
              {/* Design (Figma) - Completed */}
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mb-4">
                  <div className="w-4 h-4 rounded-full bg-white"></div>
                </div>
                <div className="text-center">
                  <h4 className="font-medium text-white text-lg mb-1">DESIGN</h4>
                  <p className="text-gray-400 text-sm">Figma</p>
                </div>
              </div>
              
              {/* Development/Testing (Xcode) - Completed */}
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mb-4">
                  <div className="w-4 h-4 rounded-full bg-white"></div>
                </div>
                <div className="text-center">
                  <h4 className="font-medium text-white text-lg mb-1">DEVELOPMENT</h4>
                  <p className="text-gray-400 text-sm">Xcode</p>
                </div>
              </div>
              
              {/* Apple App Review - Current */}
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mb-4">
                  <div className="w-4 h-4 rounded-full bg-white animate-pulse"></div>
                </div>
                <div className="text-center">
                  <h4 className="font-medium text-white text-lg mb-1">APP REVIEW</h4>
                  <p className="text-gray-400 text-sm">Apple</p>
                </div>
              </div>
              
              {/* Beta Testing (TestFlight) - Pending */}
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center mb-4">
                  <div className="w-4 h-4 rounded-full bg-gray-400"></div>
                </div>
                <div className="text-center">
                  <h4 className="font-medium text-gray-500 text-lg mb-1">BETA TESTING</h4>
                  <p className="text-gray-500 text-sm">TestFlight</p>
                </div>
              </div>
              
              {/* App Store - Pending */}
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center mb-4">
                  <div className="w-4 h-4 rounded-full bg-gray-400"></div>
                </div>
                <div className="text-center">
                  <h4 className="font-medium text-gray-500 text-lg mb-1">LAUNCH</h4>
                  <p className="text-gray-500 text-sm">App Store</p>
                </div>
              </div>
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
