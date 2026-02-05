'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import ProjectLayout, {
  ProjectSection,
  SectionTitle,
  SectionText,
  ProjectImage,
  ImageGrid,
} from '@/components/ProjectLayout';

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1];

function MerchScroller() {
  const items = [
    { src: '/sapateammerch2025.png', title: '2025 Team Uniform', subtitle: 'Competition Uniform' },
    { src: '/sapamerch2025.png', title: '2025 Crewneck', subtitle: 'Casual Wear' },
    { src: '/sapamerchshirt2025.png', title: '2025 T‑Shirt', subtitle: 'Casual Wear' },
    { src: '/sapateammerch2024.png', title: '2024 Team Uniform', subtitle: 'Competition Uniform' },
    { src: '/sapamerch2024.png', title: '2024 Crewneck', subtitle: 'Casual Wear' },
  ];

  const copies = 3;
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
    <div className="relative -mx-6 md:-mx-12">
      <button
        aria-label="Scroll left"
        onClick={() => adjust(-300)}
        className="hidden md:flex items-center justify-center absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm border border-white/10 transition-all duration-200"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 rotate-90">
          <path d="M12 16.5a1 1 0 0 1-.7-.29l-6-6a1 1 0 1 1 1.4-1.42L12 14.09l5.3-5.3a1 1 0 0 1 1.4 1.42l-6 6a1 1 0 0 1-.7.29Z" />
        </svg>
      </button>
      <button
        aria-label="Scroll right"
        onClick={() => adjust(300)}
        className="hidden md:flex items-center justify-center absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm border border-white/10 transition-all duration-200"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 -rotate-90">
          <path d="M12 16.5a1 1 0 0 1-.7-.29l-6-6a1 1 0 1 1 1.4-1.42L12 14.09l5.3-5.3a1 1 0 0 1 1.4 1.42l-6 6a1 1 0 0 1-.7.29Z" />
        </svg>
      </button>
      <div
        className="overflow-hidden px-6 md:px-12"
        onMouseEnter={() => (pausedRef.current = true)}
        onMouseLeave={() => (pausedRef.current = false)}
      >
        <div ref={trackRef} className="flex gap-6 md:gap-8 will-change-transform">
          {loopItems.map(({ src, title, subtitle }, idx) => (
            <div key={`${src}-${idx}`} className="shrink-0 w-64 md:w-80">
              <div className="relative rounded-xl md:rounded-2xl overflow-hidden aspect-[3/4] bg-white/[0.02] border border-white/10">
                <Image src={src} alt={title} fill sizes="320px" className="object-contain" unoptimized />
              </div>
              <div className="mt-3">
                <p className="text-base md:text-lg text-white/90 font-medium">{title}</p>
                <span className="inline-flex items-center mt-1.5 rounded-full border border-white/20 text-white/60 text-xs tracking-wide px-2.5 py-1">
                  {subtitle}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function RutgersSAPA() {

  return (
    <ProjectLayout
      projectId="rutgers-sapa"
      meta={{
        title: 'Rutgers SAPA',
        subtitle: 'Comprehensive brand identity and digital content creation for a nationally competing dance team—spanning creative design, strategic marketing, and video production.',
        category: 'Brand Identity',
        year: '2024-2025',
        client: 'Rutgers SAPA',
        roles: ['Digital Design', 'Content Creation', 'Brand Identity', 'Merchandise Design', 'Video Production'],
      }}
      heroImage="/Minza7_RUSAPA-396.jpg"
      heroAlt="Rutgers SAPA Brand Identity"
    >
      {/* Overview */}
      <ProjectSection>
        <SectionTitle>Overview</SectionTitle>
        <SectionText>
          <p>
          RU SAPA is the first Bollywood collegiate dance team in the United States, founded in 1999. My role was to design a visual identity that captured the year’s theme and translated well to the stage. I developed the color palette, social media graphics, and merchandise, aiming to preserve the energy of dance while subtly weaving in our theme: Mad Max: Fury Road.
          </p>
        </SectionText>
      </ProjectSection>

      {/* Overview Image */}
      <ProjectSection delay={0.1}>
        <ProjectImage
          src="/sapaOverviewImage.png"
          alt="SAPA Overview Image"
          aspectRatio="16/9"
        />
      </ProjectSection>

      {/* Introduction Video moved to Introduction Videos project */}

      {/* Background Video section moved to Stage Background Visuals project */}

      {/* Quote removed per request */}

      {/* Merchandise */}
      <ProjectSection delay={0.35}>
        <SectionTitle>Merchandise</SectionTitle>
        <SectionText>
          <p>
            A complete set of uniforms and casual wear designed across 2024–2025. Team pieces prioritize legibility on stage and durability on tour; casual pieces carry the season theme with restrained graphics and consistent typography—over 200 units sold across casual wear.
          </p>
        </SectionText>
      </ProjectSection>

      {/* Merch Scroller */}
      <ProjectSection delay={0.4}>
        <MerchScroller />
      </ProjectSection>

      {/* Instagram Strategy */}
      <ProjectSection delay={0.45}>
        <SectionTitle>Instagram Strategy</SectionTitle>
        <SectionText>
          <p>
            Developed and executed strategic Instagram branding for competition seasons, focusing on progressive reveal campaigns that build anticipation without disclosing themes too early.
          </p>
          <p>
            Themes are central to the reveal experience and generate significant anticipation before official debuts. I implemented carefully timed progression of design elements throughout the feed, building visual intrigue while preserving the surprise element. Despite incorporating distinctive fonts, colors, and design assets, the actual theme was never guessed beforehand by the audience.
          </p>
        </SectionText>
      </ProjectSection>

      {/* Instagram Grid */}
      <ProjectSection delay={0.5}>
        <ImageGrid
          images={[
            { src: '/sapaig9.png', alt: 'SAPA Instagram Post 9' },
            { src: '/sapaig10.jpg', alt: 'SAPA Instagram Post 10' },
            { src: '/sapaig8.png', alt: 'SAPA Instagram Post 8' },
            { src: '/sapaig7.jpg', alt: 'SAPA Instagram Post 7' },
            { src: '/sapaig6.png', alt: 'SAPA Instagram Post 6' },
            { src: '/sapaig5.png', alt: 'SAPA Instagram Post 5' },
            { src: '/sapaig3.jpg', alt: 'SAPA Instagram Post 3' },
            { src: '/sapaig2.jpg', alt: 'SAPA Instagram Post 2' },
          ]}
          columns={4}
          aspectRatio="1/1"
        />
      </ProjectSection>

      {/* SoundCloud Covers */}
      <ProjectSection delay={0.55}>
        <SectionTitle>SoundCloud Covers</SectionTitle>
        <SectionText>
          <p>
            Created two custom SoundCloud track covers for the 2025 season, aligned to the Mad Max: Fury Road–inspired theme. Remixed franchise assets into a cohesive visual system, refined for platform legibility and square canvases.
          </p>
        </SectionText>
      </ProjectSection>

      {/* SoundCloud Cover Grid */}
      <ProjectSection delay={0.6}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-[1100px] mx-auto">
          {[
            { href: 'https://on.soundcloud.com/46rLiomQzyzw2zZCGS', src: '/southieCoverV1.3.1.png', alt: 'Southie SoundCloud Cover' },
            { href: 'https://on.soundcloud.com/bjATpbuUGyDZIujJSj', src: '/sapaCoverV2.png', alt: 'SAPA SoundCloud Cover' },
          ].map((c) => (
            <motion.a
              key={c.src}
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
              className="block group"
            >
              <div className="relative aspect-square rounded-xl md:rounded-2xl overflow-hidden border border-white/10 group-hover:border-white/20 transition-all duration-300">
                <Image src={c.src} alt={c.alt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </div>
            </motion.a>
          ))}
        </div>
      </ProjectSection>
    </ProjectLayout>
  );
}
