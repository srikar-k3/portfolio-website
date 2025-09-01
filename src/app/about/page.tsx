'use client';

import Navigation from '@/components/Navigation';
import AboutSection from '@/components/AboutSection';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function About() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

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
        className="fixed pointer-events-none z-0"
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
      
      <main className="px-6 md:px-12 pt-32">
        <div className="max-w-6xl mx-auto py-12">
          {/* About Section */}
          <AboutSection />

          {/* Two Column Layout */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid md:grid-cols-2 gap-12 mt-16"
          >
            {/* Left Column */}
            <div>
              {/* Education */}
              <div className="mb-12">
                <h2 className="text-4xl md:text-5xl font-bold text-white uppercase mb-6">Education</h2>
                <h3 className="text-2xl font-medium text-gray-300 mb-4">Rutgers School of Arts and Sciences</h3>
                <p className="text-gray-400 text-lg leading-relaxed font-nunito-sans mb-2 font-nunito-sans">
                  Major in Computer Science (B.S.)
                </p>
                <p className="text-gray-400 text-lg leading-relaxed font-nunito-sans">
                  Minors in Business Administration, Cognitive Science, and Philosophy
                </p>
              </div>

              {/* Experience */}
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-white uppercase mb-6">Technical Skills</h2>
                
                {/* Development */}
                <div className="mb-6">
                  <h3 className="text-2xl font-medium text-gray-300 mb-3 font-nunito-sans">Software Development</h3>
                  <p className="text-gray-400 text-lg leading-relaxed font-nunito-sans mb-1 font-nunito-sans">iOS Development</p>
                  <p className="text-gray-400 text-lg leading-relaxed font-nunito-sans">Web Development</p>
                </div>

                {/* Product Design */}
                <div className="mb-6">
                  <h3 className="text-2xl font-medium text-gray-300 mb-3 font-nunito-sans">Product Design</h3>
                  <p className="text-gray-400 text-lg leading-relaxed font-nunito-sans mb-1 font-nunito-sans">User Research & Strategy</p>
                  <p className="text-gray-400 text-lg leading-relaxed font-nunito-sans mb-1 font-nunito-sans">Wireframing & Prototyping</p>
                  <p className="text-gray-400 text-lg leading-relaxed font-nunito-sans mb-1 font-nunito-sans">UI/UX Design</p>
                  <p className="text-gray-400 text-lg leading-relaxed font-nunito-sans">Design Systems</p>
                </div>

                {/* Visual Design */}
                <div className="mb-6">
                  <h3 className="text-2xl font-medium text-gray-300 mb-3 font-nunito-sans">Visual Design</h3>
                  <p className="text-gray-400 text-lg leading-relaxed font-nunito-sans mb-1 font-nunito-sans">Brand Identity & Logo Design</p>
                  <p className="text-gray-400 text-lg leading-relaxed font-nunito-sans mb-1 font-nunito-sans">Typography & Color Systems</p>
                  <p className="text-gray-400 text-lg leading-relaxed font-nunito-sans mb-1 font-nunito-sans">Graphic Design</p>
                  <p className="text-gray-400 text-lg leading-relaxed font-nunito-sans">Marketing & Social Content</p>
                </div>

                {/* Video Production */}
                <div>
                  <h3 className="text-2xl font-medium text-gray-300 mb-3 font-nunito-sans">Video Production</h3>
                  <p className="text-gray-400 text-lg leading-relaxed font-nunito-sans mb-1 font-nunito-sans">Filming</p>
                  <p className="text-gray-400 text-lg leading-relaxed font-nunito-sans mb-1 font-nunito-sans">Post-Production</p>
                  <p className="text-gray-400 text-lg leading-relaxed font-nunito-sans">Motion Graphics & Animations</p>
                </div>
              </div>
            </div>

            {/* Right Column - Tools */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white uppercase mb-6">Software & Tools</h2>
              <div className="space-y-12">
                {/* Row 1: swift xcode firebase */}
                <div className="flex gap-6 items-center">
                  <div className="p-2 hover:scale-110 transition-transform duration-200 cursor-pointer">
                    <Image src="/Swift.png" alt="Swift" width={64} height={64} className="object-contain" />
                  </div>
                  <Image src="/Xcode.png" alt="Xcode" width={80} height={80} className="object-contain hover:scale-110 transition-transform duration-200 cursor-pointer" />
                  <div className="p-2 hover:scale-110 transition-transform duration-200 cursor-pointer">
                    <Image src="/Firebase.png" alt="Firebase" width={64} height={64} className="object-contain" />
                  </div>
                </div>
                
                {/* Row 2: react tailwind html css */}
                <div className="flex gap-6 items-center">
                  <div className="p-2 hover:scale-110 transition-transform duration-200 cursor-pointer">
                    <Image src="/React.png" alt="React" width={64} height={64} className="object-contain" />
                  </div>
                  <div className="p-2 hover:scale-110 transition-transform duration-200 cursor-pointer">
                    <Image src="/TailwindCSS.png" alt="TailwindCSS" width={64} height={64} className="object-contain" />
                  </div>
                  <div className="p-2 hover:scale-110 transition-transform duration-200 cursor-pointer">
                    <Image src="/HTML5.png" alt="HTML5" width={64} height={64} className="object-contain" />
                  </div>
                  <div className="p-2 hover:scale-110 transition-transform duration-200 cursor-pointer">
                    <Image src="/CSS3.png" alt="CSS3" width={64} height={64} className="object-contain" />
                  </div>
                  <div className="p-2 hover:scale-110 transition-transform duration-200 cursor-pointer">
                    <Image src="/AWS Amplify.png" alt="AWS Amplify" width={64} height={64} className="object-contain" />
                  </div>
                </div>
                
                {/* Row 3: figma vscode aws amplify github */}
                <div className="flex gap-6 items-center">
                  <div className="p-2 hover:scale-110 transition-transform duration-200 cursor-pointer">
                    <Image src="/Figma.png" alt="Figma" width={64} height={64} className="object-contain" />
                  </div>
                  <div className="p-2 hover:scale-110 transition-transform duration-200 cursor-pointer">
                    <Image src="/Visual Studio Code.png" alt="VSCode" width={64} height={64} className="object-contain" />
                  </div>
                  <div className="p-2 hover:scale-110 transition-transform duration-200 cursor-pointer">
                    <Image src="/AWS.png" alt="AWS" width={64} height={64} className="object-contain" />
                  </div>
                  <div className="p-2 hover:scale-110 transition-transform duration-200 cursor-pointer">
                    <Image src="/Github.png" alt="Github" width={64} height={64} className="object-contain" />
                  </div>
                </div>
                
                {/* Row 4: ps ai pr ae blender */}
                <div className="flex gap-6 items-center">
                  <div className="p-2 hover:scale-110 transition-transform duration-200 cursor-pointer">
                    <Image src="/Adobe Photoshop.png" alt="Photoshop" width={64} height={64} className="object-contain" />
                  </div>
                  <div className="p-2 hover:scale-110 transition-transform duration-200 cursor-pointer">
                    <Image src="/Adobe Illustrator.png" alt="Illustrator" width={64} height={64} className="object-contain" />
                  </div>
                  <div className="p-2 hover:scale-110 transition-transform duration-200 cursor-pointer">
                    <Image src="/Adobe Premiere.png" alt="Premiere Pro" width={64} height={64} className="object-contain" />
                  </div>
                  <div className="p-2 hover:scale-110 transition-transform duration-200 cursor-pointer">
                    <Image src="/Adobe After Effects.png" alt="After Effects" width={64} height={64} className="object-contain" />
                  </div>
                  <div className="p-2 hover:scale-110 transition-transform duration-200 cursor-pointer">
                    <Image src="/Blender.png" alt="Blender" width={64} height={64} className="object-contain" />
                  </div>
                </div>
                
                {/* Row 5: final cut logic */}
                <div className="flex gap-6 items-center">
                  <Image src="/Final Cut Pro.png" alt="Final Cut Pro" width={80} height={80} className="object-contain hover:scale-110 transition-transform duration-200 cursor-pointer" />
                  <Image src="/Logic Pro.png" alt="Logic Pro" width={80} height={80} className="object-contain hover:scale-110 transition-transform duration-200 cursor-pointer" />
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