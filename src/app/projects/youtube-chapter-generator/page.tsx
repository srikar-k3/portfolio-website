'use client';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function YouTubeChapterGenerator() {
  const [activeFeatureIndex, setActiveFeatureIndex] = useState(0);
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
      title: "Multi-language Audio Input",
      description: "Support for multiple languages in audio input with intelligent detection and processing, automatically converting speech to text regardless of the source language."
    },
    {
      title: "AI-Powered Chapter Generation", 
      description: "Advanced AI analysis using Gemini AI to identify natural break points, topic changes, and content flow to generate meaningful chapter markers with descriptive titles."
    },
    {
      title: "Human-in-the-loop Transcript Editing",
      description: "Interactive transcript editing interface allowing users to review, correct, and refine AI-generated transcripts before chapter generation for maximum accuracy."
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
            src="/yt_hero.png" 
            alt="YouTube Chapter Generator Hero Section" 
            width={1920} 
            height={1080}
            priority
            className="w-full h-full object-cover scale-110" style={{ objectPosition: '50% 20%' }}
          />
        </div>
      </motion.section>

      <main className="px-6 md:px-12">
        <div className="max-w-6xl mx-auto py-24">

          {/* Alternating Content Sections */}
          <div className="space-y-24">
            {/* Row 1: App Overview */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-6xl mx-auto"
            >
              <h3 className="text-4xl font-semibold text-white mb-8 text-center">APP OVERVIEW</h3>
              
              <div className="mb-8">
                <h4 className="text-2xl font-medium text-gray-300 mb-4">Problem</h4>
                <p className="text-gray-400 text-lg leading-relaxed mb-4">
                  YouTube&apos;s automatic captioning and chapter tools suffer from poor accuracy and generate generic, unhelpful chapter titles that fail to capture the actual content flow. Creators have no control over the automated process, resulting in chapters that don&apos;t reflect their content strategy or audience needs.
                </p>
                <p className="text-gray-400 text-lg leading-relaxed mb-4">
                  The workflow problem is compounded for multilingual creators: existing chapter generation tools only accept English input, while YouTube&apos;s auto-translation produces inaccurate results that hurt discoverability. This forces creators to choose between authentic content in their native language or optimized English metadata for broader reach.
                </p>
                <p className="text-gray-400 text-lg leading-relaxed">
                  Manual chapter creation remains time-intensive and impractical for regular content production, while fully automated solutions lack the nuance and accuracy that quality content demands. Creators need a solution that combines automation efficiency with human oversight and control.
                </p>
              </div>
              
              <div>
                <h4 className="text-2xl font-medium text-gray-300 mb-4">Solution</h4>
                <p className="text-gray-400 text-lg leading-relaxed mb-4">
                  YouTube Chapter Generator uses a unique two-step pipeline: ASR (Automatic Speech Recognition) followed by LLM (Large Language Model) analysis. AWS Transcribe handles multi-language audio transcription with high accuracy, then Gemini AI analyzes the content flow to generate contextually relevant English chapter titles with precise timestamps.
                </p>
                <p className="text-gray-400 text-lg leading-relaxed">
                  The human-in-the-loop design gives creators control over the final output: review and edit AI-generated transcripts, adjust chapter boundaries, and refine titles before export. This approach delivers the efficiency of automation while preserving creator agency and ensuring chapters align with content strategy and brand voice.
                </p>
              </div>
            </motion.div>

            {/* Row 2: Carousel (Left) + Key Features (Right) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid md:grid-cols-2 gap-16 items-center"
            >
              {/* Interactive Carousel */}
              <div className="relative">
                <div className="aspect-[4/3] rounded-lg overflow-hidden relative">
                  {/* yt-lang image */}
                  <div 
                    className={`absolute inset-0 transition-opacity duration-300 ${
                      activeFeatureIndex === 0 ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <Image 
                      src="/yt-lang.png" 
                      alt="Multi-language Audio Input Interface" 
                      width={800} 
                      height={600}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  
                  {/* gemini logo */}
                  <div 
                    className={`absolute inset-0 transition-opacity duration-300 ${
                      activeFeatureIndex === 1 ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <Image 
                      src="/gemini_logo.png" 
                      alt="Gemini AI Chapter Generation" 
                      width={800} 
                      height={600}
                      className="w-full h-full object-contain bg-white"
                    />
                  </div>
                  
                  {/* yt-edit image */}
                  <div 
                    className={`absolute inset-0 transition-opacity duration-300 ${
                      activeFeatureIndex === 2 ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <Image 
                      src="/yt-edit.png" 
                      alt="Human-in-the-loop Transcript Editor" 
                      width={800} 
                      height={600}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
                
                {/* Dot Navigation */}
                <div className="flex justify-center space-x-2 mt-4">
                  {[0, 1, 2].map((index) => (
                    <button
                      key={index}
                      onClick={() => setActiveFeatureIndex(index)}
                      className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                        activeFeatureIndex === index ? 'bg-white' : 'bg-gray-600'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-4xl font-semibold text-white mb-6">KEY FEATURES</h3>
                <div className="space-y-4">
                  {features.map((feature, index) => (
                    <div 
                      key={index}
                      onMouseEnter={() => setActiveFeatureIndex(index)}
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
                  Built with React and modern JavaScript, featuring responsive design and intuitive user interface for seamless audio processing and chapter management workflows.
                </p>
              </div>
              <div>
                <h4 className="text-2xl font-medium text-gray-300 mb-4">BACKEND</h4>
                <p className="text-gray-400 text-lg leading-relaxed">
                  Express.js server with AWS Transcribe integration for accurate speech-to-text conversion and Gemini AI for intelligent content analysis and chapter generation.
                </p>
              </div>
              <div>
                <h4 className="text-2xl font-medium text-gray-300 mb-4">AI & CLOUD</h4>
                <p className="text-gray-400 text-lg leading-relaxed">
                  Leverages AWS Transcribe for multi-language audio processing and Google&apos;s Gemini AI for advanced natural language understanding and chapter optimization.
                </p>
              </div>
            </div>
          </motion.section>
          {/* Next Steps Section */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="py-16"
          >
            <h3 className="text-4xl font-semibold text-white text-center mb-8">NEXT STEPS</h3>
            
            <div className="text-gray-400 text-lg leading-relaxed space-y-6">
              <p>
                Looking ahead, there are two promising directions for expanding the YouTube Chapter Generator:
              </p>
              <ol className="list-decimal pl-6 space-y-4">
                <li>
                  <span className="font-medium text-white">Open-Source Version</span>
                  <ul className="list-disc pl-6 mt-2 space-y-2">
                    <li>Allow users to choose their own ASR system for transcription (AWS Transcribe, Whisper, etc.).</li>
                    <li>Let them pair that with their preferred LLM (Gemini, OpenAI, local models, etc.) for chapter generation.</li>
                    <li>Distribute with simple CLI or Docker setup so it&apos;s easy to run locally.</li>
                  </ul>
                </li>
                <li>
                  <span className="font-medium text-white">Native macOS App</span>
                  <ul className="list-disc pl-6 mt-2 space-y-2">
                    <li>Build a desktop app that runs the two-step process (ASR → LLM) directly on the machine.</li>
                    <li>Integrate chapter generation into the YouTube upload workflow, so chapters attach automatically.</li>
                    <li>Simplify the publishing process for creators who upload frequently from their Macs.</li>
                  </ul>
                </li>
              </ol>
            </div>
            
            <div className="text-center mt-12">
              <a 
                href="https://github.com/srikar-k3/audio-to-youtube-chapters/tree/main" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 bg-white text-black rounded-lg hover:bg-gray-200 transition-all duration-200 text-lg font-medium group"
              >
                <svg className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform duration-200" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                View Source Code
              </a>
            </div>
          </motion.section>
        </div>
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
