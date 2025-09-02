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
        className="w-full h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-screen overflow-hidden"
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
      </motion.section>

      <main>
        {/* Alternating Content Sections */}
        <div>
            {/* Row 1: App Overview */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="min-h-screen flex items-center px-6 md:px-12 py-20"
            >
              <div className="max-w-6xl mx-auto w-full">
              <h3 className="text-4xl font-semibold text-white mb-8 text-center">APP OVERVIEW</h3>
              
              <div className="mb-8">
                <h4 className="text-2xl font-medium text-gray-300 mb-4">Problem</h4>
                <p className="text-gray-400 text-lg leading-relaxed mb-4">
                In on-campus housing, roommate agreements are required at move-in to outline expectations around cleaning, guests, and shared spaces. In practice, these agreements are treated as paperwork that is quickly forgotten. With no follow-up, rules lose meaning, boundaries fade, and tensions gradually build.
                </p>
                <p className="text-gray-400 text-lg leading-relaxed mb-4">
                Off-campus housing typically has no agreements at all. Roommates depend on vague verbal understandings that are difficult to enforce or even recall. When issues come up around chores, noise, bills, or guests, there is no accountability, and conflicts often remain unresolved.
                </p>
                <p className="text-gray-400 text-lg leading-relaxed">
                Chores, in particular, are a recurring flashpoint. Without a structured way to assign and track responsibilities, they are either forgotten, unevenly distributed, or casually passed off, creating resentment among housemates. Over time, these small breakdowns compound, straining roommate relationships and making shared living more stressful than it needs to be.
                </p>
              </div>
              
              <div>
                <h4 className="text-2xl font-medium text-gray-300 mb-4">Solution</h4>
                <p className="text-gray-400 text-lg leading-relaxed mb-4">
                House Rules is not a replacement for conversation; it is a tool that supports and sustains it. By keeping roommate agreements active through timely reminders and flexible chore management, the app creates a foundation for healthier discussions where accountability is shared and responsibility is clear.

                </p>
                {/* <p className="text-gray-400 text-lg leading-relaxed">
                The app emphasizes accountability through social systems designed for real-life situations: bumping chores that need urgent attention, passing tasks when someone is unavailable, and tracking reliability across houses over time. This structure reduces ambiguity, sets transparent expectations, and gives roommates a constructive framework for resolving issues before they escalate.
                </p> */}
              </div>
              </div>
            </motion.section>

            {/* Row 2: Carousel (Left) + Key Features (Right) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="px-6 md:px-12"
            >
              <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
              {/* Features Image */}
              <div className="aspect-[4/3] rounded-lg overflow-hidden">
                <Image 
                  src="/house_rules_features.png" 
                  alt="House Rules Key Features Overview" 
                  width={800} 
                  height={600}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Interactive Carousel - Commented Out */}
              {/* <div className="relative">
                <div className="bg-gray-200 aspect-[4/3] rounded-lg overflow-hidden">
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
                <h3 className="text-4xl font-semibold text-white mb-6 text-center md:text-left">KEY FEATURES</h3>
                <div className="space-y-4">
                  {features.map((feature, index) => (
                    <div 
                      key={index}
                      // onMouseEnter={() => setActiveFeatureIndex(index)}
                      className="cursor-pointer transition-all duration-300 hover:bg-white/5 p-4 -m-4 rounded-lg"
                    >
                      <h4 className="text-2xl font-medium text-gray-300 mb-2">{feature.title}</h4>
                      <p className="text-gray-400 text-lg leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              </div>
            </motion.div>
          </div>

          {/* Technical Stack - Centered Three Columns */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-24 text-center"
          >
            <h3 className="text-4xl font-semibold text-white mb-8">TECHNICAL STACK</h3>
            <div className="grid md:grid-cols-3 gap-12">
              <div>
                <h4 className="text-2xl font-medium text-gray-300 mb-4">FRONTEND</h4>
                <p className="text-gray-400 text-lg leading-relaxed">
                  Built natively for iOS using Swift and SwiftUI, providing a seamless and responsive user experience optimized for mobile devices.
                </p>
              </div>
              <div>
                <h4 className="text-2xl font-medium text-gray-300 mb-4">BACKEND</h4>
                <p className="text-gray-400 text-lg leading-relaxed">
                  Firebase handles real-time data synchronization, user authentication, and cloud storage, ensuring reliable performance and instant updates across all devices.
                </p>
              </div>
              <div>
                <h4 className="text-2xl font-medium text-gray-300 mb-4">ARCHITECTURE</h4>
                <p className="text-gray-400 text-lg leading-relaxed">
                Designed with an MVVM-inspired structure, where SwiftUI views bind to observable view models connected to Firestore and Cloud Functions, enabling clean data flow and real-time updates.
                </p>
              </div>
            </div>
          </motion.section>

        {/* App Icon Design - Title + Full Width Image */}
        <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="mt-8 mb-16 px-6 md:px-12"
      >
        <div className="max-w-6xl mx-auto">
          <h3 className="text-4xl font-semibold text-white mb-8 text-center">APP ICON DESIGN</h3>
          
          <div className="bg-white aspect-[7/2] overflow-hidden">
          <Image 
            src="/house_rules_icon_blue.png" 
            alt="House Rules App Icon Design Blueprint" 
            width={1200} 
            height={800}
            quality={100}
            priority
            className="w-full h-full object-cover"
          />
          </div>
        </div>
      </motion.section>

      {/* Coming Soon Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="pt-4 pb-16 px-6 md:px-12"
      >
        <div className="max-w-6xl mx-auto">
          <h3 className="text-4xl font-semibold text-white text-center mb-16">COMING SOON TO APP STORE</h3>
          
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
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
