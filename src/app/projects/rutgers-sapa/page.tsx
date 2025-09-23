'use client';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';


function MerchScroller() {
  const items = [
    { src: '/sapateammerch2025.png', title: '2025 Team Uniform', subtitle: 'Competition Uniform' },
    { src: '/sapamerch2025.png', title: '2025 Crewneck', subtitle: 'Casual Wear' },
    { src: '/sapamerchshirt2025.png', title: '2025 T‑Shirt', subtitle: 'Casual Wear' },
    { src: '/sapateammerch2024.png', title: '2024 Team Uniform', subtitle: 'Competition Uniform' },
    { src: '/sapamerch2024.png', title: '2024 Crewneck', subtitle: 'Casual Wear' },
  ];

  const copies = 3;
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const offsetRef = useRef(0);
  const segmentWidthRef = useRef(0);

  const measure = () => {
    const track = trackRef.current;
    if (!track) return;
    segmentWidthRef.current = track.scrollWidth / copies;
  };

  useEffect(() => {
    measure();
    const onResize = () => measure();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const step = () => {
      const track = trackRef.current;
      if (track && !pausedRef.current) {
        offsetRef.current += 0.8;
        const seg = segmentWidthRef.current || track.scrollWidth / copies;
        if (offsetRef.current >= seg) offsetRef.current -= seg;
        track.style.transform = `translateX(${-offsetRef.current}px)`;
      }
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const adjust = (delta: number) => {
    const track = trackRef.current;
    if (!track) return;
    const seg = segmentWidthRef.current || track.scrollWidth / copies;
    offsetRef.current = (offsetRef.current + delta) % seg;
    if (offsetRef.current < 0) offsetRef.current += seg;
    track.style.transform = `translateX(${-offsetRef.current}px)`;
  };

  const loopItems = Array.from({ length: copies }).flatMap(() => items);

  return (
    <div className="relative">
      <button
        aria-label="Scroll left"
        onClick={() => adjust(-300)}
        className="hidden md:flex items-center justify-center absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 rotate-90">
          <path d="M12 16.5a1 1 0 0 1-.7-.29l-6-6a1 1 0 1 1 1.4-1.42L12 14.09l5.3-5.3a1 1 0 0 1 1.4 1.42l-6 6a1 1 0 0 1-.7.29Z" />
        </svg>
      </button>
      <button
        aria-label="Scroll right"
        onClick={() => adjust(300)}
        className="hidden md:flex items-center justify-center absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 -rotate-90">
          <path d="M12 16.5a1 1 0 0 1-.7-.29l-6-6a1 1 0 1 1 1.4-1.42L12 14.09l5.3-5.3a1 1 0 0 1 1.4 1.42l-6 6a1 1 0 0 1-.7.29Z" />
        </svg>
      </button>
      <div
        ref={viewportRef}
        className="overflow-hidden"
        onMouseEnter={() => (pausedRef.current = true)}
        onMouseLeave={() => (pausedRef.current = false)}
      >
        <div ref={trackRef} className="flex gap-8 pr-8 will-change-transform">
          {loopItems.map(({ src, title, subtitle }, idx) => (
            <div key={`${src}-${idx}`} className="shrink-0 w-80">
              <div className="relative rounded-xl overflow-hidden aspect-[3/4] bg-black/20">
                <Image src={src} alt={title} fill sizes="320px" className="object-contain" />
              </div>
              <div className="mt-3">
                <p className="text-[20px] text-white/90 leading-relaxed">{title}</p>
                <span className="inline-flex items-center mt-1 rounded-full border border-white/20 text-white/80 text-xs tracking-wide px-3 py-1">{subtitle}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function RutgersSAPA() {
  const [scrollY, setScrollY] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const introVideoRef = useRef<HTMLVideoElement>(null);
  const introVideoSectionRef = useRef<HTMLDivElement>(null);
  const introVideoStartedRef = useRef(false);
  const handleArrowClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const container = document.getElementById('sapa-content');
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
  
  const exportImages = [
    '/Export_Varun-20250419143334.jpg',
    '/Export_Varun-20250419143725-2.jpg',
    '/Export_Varun-20250419143833.jpg',
    '/Export_Varun-20250419143926.jpg',
    '/Export_Varun-20250419144033.jpg'
  ];

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

  // Pause on last frame for 5s, then reset intro video
  useEffect(() => {
    const el = introVideoRef.current;
    if (!el) return;
    const onEnded = () => {
      setTimeout(() => {
        const v = introVideoRef.current;
        if (!v) return;
        try { v.currentTime = 0; v.play(); } catch {}
      }, 5000);
    };
    el.addEventListener('ended', onEnded);
    return () => { el.removeEventListener('ended', onEnded); };
  }, []);

  // Only start intro video when top of section is seen once; do not pause again
  useEffect(() => {
    const section = introVideoSectionRef.current;
    const video = introVideoRef.current;
    if (!section || !video) return;
    // do not force a pause here to avoid StrictMode double‑invoke stutter
    const observer = new IntersectionObserver(
      (entries, obs) => {
        const entry = entries[0];
        if (!entry || !video) return;
        if (!introVideoStartedRef.current && entry.isIntersecting) {
          introVideoStartedRef.current = true;
          video.play().catch(() => {});
          // do not pause on subsequent scroll; stop observing further events
          obs.disconnect();
        }
      },
      { root: null, threshold: 0 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // no lightbox key handlers (static media)
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
            src="/Minza7_RUSAPA-396.jpg" 
            alt="Rutgers SAPA Brand Identity" 
            width={1920} 
            height={1080}
            className="w-full h-full object-cover"
          />
        </div>
        {/* Subtle bottom gradient over hero for separation (bland, not heavy) */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent via-black/30 to-black/60" />
        {/* Minimal bouncing arrow cue */}
        <a
          href="#sapa-content"
          onClick={handleArrowClick}
          aria-label="Scroll to content"
          className="absolute left-1/2 -translate-x-1/2 bottom-6 text-white/80 hover:text-white transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 animate-bounce">
            <path d="M12 16.5a1 1 0 0 1-.7-.29l-6-6a1 1 0 1 1 1.4-1.42L12 14.09l5.3-5.3a1 1 0 0 1 1.4 1.42l-6 6a1 1 0 0 1-.7.29Z" />
          </svg>
        </a>
      </motion.section>

      <main className="px-6 md:px-12">
        <div className="max-w-[1300px] mx-auto" id="sapa-content">

          {/* Overview */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid md:grid-cols-12 gap-12 items-start pt-[144px] pb-[72px]"
          >
            <div className="md:col-span-8">
              <h3 className="text-2xl font-semibold text-white mb-3 text-left">Overview</h3>
              <p className="text-gray-300 text-[20px] leading-relaxed">
                As Tech Chair and Dancer for Rutgers SAPA, I led comprehensive brand identity and digital content creation for the nationally competing dance team — combining creative design, strategic marketing, and video production to elevate the team’s competitive presence. The work spanned strategic Instagram branding with progressive reveal campaigns, merchandise collections, SoundCloud cover art, and cinematic intros and stage visuals produced with professional editing and motion tools.
              </p>
            </div>
            <div className="md:col-span-4">
              <div className="mb-7">
                <p className="text-[20px] text-white/90">Client</p>
                <p className="text-[20px] text-white/60 mt-1">Rutgers SAPA</p>
              </div>
              <div className="flex flex-wrap gap-x-3 gap-y-3">
                {[
                  'Digital Design',
                  'Content Creation',
                  'Brand Identity',
                  'Merchandise Design',
                  'Video Production'
                ].map((label) => (
                  <span key={label} className="inline-flex items-center rounded-full border border-white/20 text-white/80 text-xs tracking-wide px-3 py-1">
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Alternating Content Sections */}
          {/* Overview image as its own section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="py-[72px]"
          >
              <div className="grid md:grid-cols-12">
                <div className="md:col-span-12">
                  <div className="w-full overflow-hidden rounded-xl">
                    <Image
                      src="/sapaOverviewImage.png"
                      alt="SAPA Overview Image"
                      width={1920}
                      height={1080}
                      className="w-full h-auto object-contain"
                    />
                  </div>
                </div>
              </div>
          </motion.section>


            {/* Introduction Video Production (text) */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="py-[72px]"
            >
              <div className="grid md:grid-cols-12">
                <div className="md:col-span-8">
                  <h3 className="text-2xl font-semibold text-white mb-3">Introduction Video Production</h3>
                  <p className="text-gray-300 text-[20px] leading-relaxed">
                    Cinematic opening sequences that set the season’s theme and energy. I wrote, storyboarded, directed, and edited these intros to build anticipation before performances and establish the narrative tone on stage and online.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Row 2: Video Production (Text column matches Overview width; images below) */}
            {/* Intro video clip (no extra container/padding; aligns with page padding) */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="py-[72px]"
            >
              <div ref={introVideoSectionRef} className="rounded-xl overflow-hidden">
                <video
                  ref={introVideoRef}
                  muted
                  playsInline
                  preload="auto"
                  className="block w-full h-auto object-contain focus:outline-none"
                >
                  <source src="/sapaIntroVideo_p.mp4" type="video/mp4" />
                </video>
              </div>
            </motion.section>

            {/* Row 2: Background Video Production (text) */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="py-[72px]"
            >
              <div className="grid md:grid-cols-12">
<div className="md:col-span-8">
                <h3 className="text-2xl font-semibold text-white mb-3">Background Video Production</h3>
                {/* <h4 className="text-lg font-medium text-gray-300 mb-2">Introduction Videos</h4> */}
                {/* <p className="text-gray-300 text-[20px] leading-relaxed mb-4">
                  Wrote, storyboarded, directed, and edited multi-year cinematic openings for the 2024 and 2025 competition seasons, setting the theme and narrative tone for each performance. These short films introduced the concept, built anticipation, and elevated the team's stage presence.
                </p> */}
                {/* <h4 className="text-lg font-medium text-gray-300 mb-2">Background Videos</h4> */}
                <p className="text-gray-300 text-[20px] leading-relaxed">
                  Designed and produced synchronized visuals that played behind live performances, with each segment tailored to the style and energy of the dance piece. This required layering custom assets, integrating motion graphics, and balancing color, mood, and lighting to amplify choreography and atmosphere.
                </p>
              </div>
              </div>
            </motion.section>
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="py-[72px]"
            >
              <div className="grid md:grid-cols-12">
                <div className="md:col-span-12">
                  <div className="grid grid-cols-2 gap-4">
                    {[exportImages[0], exportImages[1]].map((image, index) => (
                      <div key={`${image}-${index}`} className="relative overflow-hidden rounded-xl aspect-[4/3]">
                        <Image
                          src={image}
                          alt={`Video Production Frame ${index + 1}`}
                          fill
                          sizes="(min-width: 768px) 50vw, 100vw"
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="py-[72px]"
            >
              <blockquote className="max-w-[900px] mx-auto text-center">
                <p className="text-white/90 text-2xl italic leading-snug">
                  “Great production with the [background] video, really high quality. It adds to your impact in every segment.”
                </p>
                <cite className="block mt-3 text-white/60 text-base">— Harji Charaia, Legends 2025 Judge</cite>
              </blockquote>
            </motion.section>


                    {/* Merchandise */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="py-[72px]"
          >
            <h3 className="text-2xl font-semibold text-white mb-3">Merchandise</h3>
            <p className="text-gray-300 text-[20px] leading-relaxed mb-6 max-w-[65ch]">
              A complete set of uniforms and casual wear designed across 2024–2025. Team pieces prioritize legibility on stage and durability on tour; casual pieces carry the season theme with restrained graphics and consistent typography — over 200 units sold across casual wear.
            </p>
          </motion.section>
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="py-[72px]"
          >
            <div className="max-w-[1300px] mx-auto">
              <MerchScroller />
            </div>
          </motion.section>
        </div>
      </main>


      <main className="px-6 md:px-12">
        <div className="max-w-[1300px] mx-auto">
          {/* Instagram Strategy (text only) */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="py-[72px]"
          >
            <div className="grid md:grid-cols-12">
              <div className="md:col-span-8">
                <h3 className="text-2xl font-semibold text-white mb-3">Instagram Strategy</h3>
                <p className="text-gray-300 text-[20px] leading-relaxed mb-4">
                  Developed and executed strategic Instagram branding for competition seasons, focusing on progressive reveal campaigns that build anticipation without disclosing themes too early.
                </p>
                <p className="text-gray-300 text-[20px] leading-relaxed mb-4">
                  Themes are central to the reveal experience and generate significant anticipation before official debuts. I implemented carefully timed progression of design elements throughout the feed, building visual intrigue while preserving the surprise element. Despite incorporating distinctive fonts, colors, and design assets, the actual theme was never guessed beforehand by the audience.
                </p>
                <p className="text-gray-300 text-[20px] leading-relaxed">
                  This strategic approach maintained audience engagement throughout the competition season while creating a cohesive visual narrative that enhanced the team&apos;s professional image.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Instagram Grid (4x2, larger tiles) */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.05 }}
            className="py-[72px]"
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {[
                { src: "/sapaig9.png", alt: "SAPA Instagram Post 9" },
                { src: "/sapaig10.jpg", alt: "SAPA Instagram Post 10" },
                { src: "/sapaig8.png", alt: "SAPA Instagram Post 8" },
                { src: "/sapaig7.jpg", alt: "SAPA Instagram Post 7" },
                { src: "/sapaig6.png", alt: "SAPA Instagram Post 6" },
                { src: "/sapaig5.png", alt: "SAPA Instagram Post 5" },
                { src: "/sapaig3.jpg", alt: "SAPA Instagram Post 3" }, 
                { src: "/sapaig2.jpg", alt: "SAPA Instagram Post 2" }
              ].map((image, index) => (
                <div key={index} className="relative overflow-hidden rounded-xl aspect-square">
                  <Image 
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                    className={`object-cover ${
                      image.src === "/sapaig10.jpg"
                        ? "object-[50%_80%]"
                        : image.src === "/sapaig2.jpg"
                        ? "object-center"
                        : "object-top"
                    }`}
                  />
                </div>
              ))}
            </div>
          </motion.section>

          {/* SoundCloud Covers (text) */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="py-[72px]"
          >
            <div className="grid md:grid-cols-12">
              <div className="md:col-span-8">
                <h3 className="text-2xl font-semibold text-white mb-3">SoundCloud Covers</h3>
                <p className="text-gray-300 text-[20px] leading-relaxed">
                  Created two custom SoundCloud track covers for the 2025 season, aligned to the Mad Max: Fury Road–inspired theme. Remixed franchise assets into a cohesive visual system, refined for platform legibility and square canvases.
                </p>
              </div>
            </div>
          </motion.section>

          {/* SoundCloud Covers (grid) */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.25 }}
            className="py-[72px]"
          >
            <div className="grid grid-cols-2 gap-4">
              {[{ href: 'https://on.soundcloud.com/46rLiomQzyzw2zZCGS', src: '/southieCoverV1.3.1.png', alt: 'Southie SoundCloud Cover' },
                { href: 'https://on.soundcloud.com/bjATpbuUGyDZIujJSj', src: '/sapaCoverV2.png', alt: 'SAPA SoundCloud Cover' }].map((c) => (
                <a key={c.src} href={c.href} target="_blank" rel="noopener noreferrer" className="block">
                  <div className="relative aspect-square rounded-xl overflow-hidden">
                    <Image src={c.src} alt={c.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
                  </div>
                </a>
              ))}
            </div>
          </motion.section>

        </div>
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
