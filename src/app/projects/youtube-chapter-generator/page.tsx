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
  
  const handleArrowClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const container = document.getElementById('ytcg-content');
    if (!container) return;
    const firstSection = container.querySelector('section');
    const el = (firstSection as HTMLElement) || (container as HTMLElement);
    const wrapperEl = document.querySelector('div.fixed.top-0');
    const navbarHeight = wrapperEl
      ? (wrapperEl as HTMLElement).getBoundingClientRect().height
      : (document.querySelector('nav') as HTMLElement | null)?.getBoundingClientRect().height || 0;
    const paddingTop = parseFloat(window.getComputedStyle(el).paddingTop || '0') || 0;
    const y = el.getBoundingClientRect().top + window.scrollY + paddingTop - navbarHeight;
    window.scrollTo({ top: y, behavior: 'smooth' });
  };
  
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
        className="relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-screen overflow-hidden"
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
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent via-black/30 to-black/60" />
        <a href="#ytcg-content" onClick={handleArrowClick} aria-label="Scroll to content" className="absolute left-1/2 -translate-x-1/2 bottom-6 text-white/80 hover:text-white transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 animate-bounce">
            <path d="M12 16.5a1 1 0 0 1-.7-.29l-6-6a1 1 0 1 1 1.4-1.42L12 14.09l5.3-5.3a1 1 0 0 1 1.4 1.42l-6 6a1 1 0 0 1-.7.29Z" />
          </svg>
        </a>
      </motion.section>

      <main className="px-6 md:px-12">
        <div className="max-w-[1300px] mx-auto" id="ytcg-content">
          {/* Overview */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid md:grid-cols-12 gap-12 items-start pt-[144px] pb-[72px]"
          >
            <div className="md:col-span-8">
              <h3 className="text-2xl font-semibold text-white mb-3 text-left">Overview</h3>
              <p className="text-gray-300 text-[20px] leading-relaxed mb-4">
                A creator-first tool that turns raw speech into accurate, audience-friendly YouTube chapters — combining multi‑language transcription, AI analysis, and human-in-the-loop editing so structure matches intent.
              </p>
              <p className="text-gray-300 text-[20px] leading-relaxed">
                Built to solve real workflow pain: control over titles and boundaries, reliable timestamps, and export-ready chapters that improve discoverability and retention.
              </p>
            </div>
            <div className="md:col-span-4">
              <div className="mb-7">
                <p className="text-[20px] text-white/90">Client</p>
                <p className="text-[20px] text-white/60 mt-1">Personal Project</p>
              </div>
              <div className="flex flex-wrap gap-x-3 gap-y-3">
                {['Product Design','React','Express','AWS Transcribe','Gemini AI'].map((label) => (
                  <span key={label} className="inline-flex items-center rounded-full border border-white/20 text-white/80 text-xs tracking-wide px-3 py-1">{label}</span>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Key Features (combined like House Rules) */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="py-[72px]"
          >
            <div className="grid md:grid-cols-2 gap-16 items-center">
              {/* Text column */}
              <div>
                <h3 className="text-2xl font-semibold text-white mb-3">Key Features</h3>
                <div className="space-y-4">
                  {features.map((feature, index) => (
                    <div
                      key={index}
                      onMouseEnter={() => setActiveFeatureIndex(index)}
                      className="cursor-pointer transition-all duration-300 hover:bg-black/30 p-4 -m-4 rounded-xl"
                    >
                      <h4 className="text-xl font-medium text-gray-200 mb-1">{feature.title}</h4>
                      <p className="text-gray-300 text-[18px] leading-relaxed">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Carousel column */}
              <div>
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
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
            </div>
          </motion.section>

          {/* Technical Stack - Centered Three Columns */}
          {/* Technical Stack */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="py-[72px]"
          >
            <div className="text-left">
              <h3 className="text-2xl font-semibold text-white mb-6">Technical Stack</h3>
              <div className="grid md:grid-cols-3 gap-12">
                <div>
                  <h4 className="text-lg font-medium text-gray-300 mb-2">Frontend</h4>
                  <p className="text-gray-300 text-[18px] leading-relaxed">React + modern JS; responsive UI for clean workflows.</p>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-gray-300 mb-2">Backend</h4>
                  <p className="text-gray-300 text-[18px] leading-relaxed">Express with AWS Transcribe; reliable speech-to-text.</p>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-gray-300 mb-2">AI & Cloud</h4>
                  <p className="text-gray-300 text-[18px] leading-relaxed">Gemini AI for analysis; exportable chapter output.</p>
                </div>
              </div>
            </div>
          </motion.section>
          {/* Next Steps */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="py-[72px]"
          >
            <div>
              <h3 className="text-2xl font-semibold text-white text-left mb-6">Next Steps</h3>
            
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
    className="group relative inline-flex items-center justify-center w-full md:w-auto px-8 py-4 border border-white/20 rounded-xl text-lg font-medium text-white/90 hover:text-white transition-colors overflow-hidden"
  >
    {/* Hover background sweep */}
    <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>

    <svg
      className="mr-3 h-6 w-6 text-white/70 group-hover:text-white transition-colors duration-200"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
    
    <span className="relative z-10">View Source Code</span>
  </a>
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
