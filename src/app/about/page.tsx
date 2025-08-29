'use client';

import Navigation from '@/components/Navigation';
import AboutSection from '@/components/AboutSection';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function About() {
  return (
    <div className="min-h-screen bg-white text-black">
      {/* Navigation */}
      <Navigation />
      
      <main className="px-6 md:px-12">
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
                <h2 className="text-4xl md:text-5xl font-bold text-black uppercase mb-6">Education</h2>
                <h3 className="text-2xl font-medium text-gray-700 mb-4">Rutgers School of Arts and Sciences</h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-2">
                  Major in Computer Science (B.S.)
                </p>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Minors in Business Administration, Cognitive Science, and Philosophy
                </p>
              </div>

              {/* Experience */}
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-black uppercase mb-6">Experience</h2>
                
                {/* Development */}
                <div className="mb-6">
                  <h3 className="text-2xl font-medium text-gray-700 mb-3">Software Development</h3>
                  <p className="text-gray-600 text-lg leading-relaxed mb-1">iOS Development</p>
                  <p className="text-gray-600 text-lg leading-relaxed">Web Development</p>
                </div>

                {/* Product Design */}
                <div className="mb-6">
                  <h3 className="text-2xl font-medium text-gray-700 mb-3">Product Design</h3>
                  <p className="text-gray-600 text-lg leading-relaxed mb-1">User Research & Strategy</p>
                  <p className="text-gray-600 text-lg leading-relaxed mb-1">Wireframing & Prototyping</p>
                  <p className="text-gray-600 text-lg leading-relaxed mb-1">UI/UX Design</p>
                  <p className="text-gray-600 text-lg leading-relaxed">Design Systems</p>
                </div>

                {/* Visual Design */}
                <div className="mb-6">
                  <h3 className="text-2xl font-medium text-gray-700 mb-3">Visual Design</h3>
                  <p className="text-gray-600 text-lg leading-relaxed mb-1">Brand Identity & Logo Design</p>
                  <p className="text-gray-600 text-lg leading-relaxed mb-1">Typography & Color Systems</p>
                  <p className="text-gray-600 text-lg leading-relaxed mb-1">Graphic Design</p>
                  <p className="text-gray-600 text-lg leading-relaxed">Marketing & Social Content</p>
                </div>

                {/* Video Production */}
                <div>
                  <h3 className="text-2xl font-medium text-gray-700 mb-3">Video Production</h3>
                  <p className="text-gray-600 text-lg leading-relaxed mb-1">Filming</p>
                  <p className="text-gray-600 text-lg leading-relaxed mb-1">Post-Production</p>
                  <p className="text-gray-600 text-lg leading-relaxed">Motion Graphics & Animations</p>
                </div>
              </div>
            </div>

            {/* Right Column - Tools */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-black uppercase mb-6">Software & Tools</h2>
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