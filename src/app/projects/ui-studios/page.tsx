'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import ProjectLayout, {
  ProjectSection,
  SectionTitle,
  SectionText,
  ProjectImage,
} from '@/components/ProjectLayout';

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1];

function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
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
  };

  const handleTouchStart = (_e: React.TouchEvent) => {
    const container = sliderRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();

    const onMove = (ev: TouchEvent) => {
      const touch = ev.touches[0];
      if (!touch) return;
      const x = touch.clientX - rect.left;
      const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setSliderPosition(pct);
    };

    const onEnd = () => {
      document.removeEventListener('touchmove', onMove);
      document.removeEventListener('touchend', onEnd);
    };

    document.addEventListener('touchmove', onMove, { passive: true });
    document.addEventListener('touchend', onEnd);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
      ref={sliderRef}
      className="relative select-none rounded-xl md:rounded-2xl overflow-hidden border border-white/10 max-h-[70vh] max-w-[1100px] mx-auto"
      style={{ aspectRatio: '4/3' }}
    >
      {/* Before Image (Green Screen) */}
      <div className="absolute inset-0">
        <Image
          src="/before green screen.png"
          alt="Before: Green Screen Raw Footage"
          fill
          className="object-cover object-top"
          sizes="(max-width: 768px) 100vw, 1300px"
        />
      </div>

      {/* After Image (Final Edit) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
      >
        <Image
          src="/after green screen.png"
          alt="After: Final Edited Interview"
          fill
          className="object-cover object-top"
          sizes="(max-width: 768px) 100vw, 1300px"
        />
      </div>

      {/* Slider Handle */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white cursor-ew-resize flex items-center justify-center z-20"
        style={{ left: `${sliderPosition}%` }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center border border-white/20">
          <svg className="w-5 h-5 text-black/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
          </svg>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute left-3 top-3 text-xs font-medium bg-black/60 backdrop-blur-sm px-2.5 py-1.5 rounded-full text-white/90 z-10">
        Before
      </div>
      <div className="absolute right-3 top-3 text-xs font-medium bg-black/60 backdrop-blur-sm px-2.5 py-1.5 rounded-full text-white/90 z-10">
        After
      </div>
    </motion.div>
  );
}

export default function UIStudios() {
  return (
    <ProjectLayout
      projectId="u-and-i-studios"
      meta={{
        title: 'U&I Studios',
        subtitle: 'A comprehensive visual identity and video production project for an immigration interview series, creating authentic, emotionally resonant branding.',
        category: 'Video Production',
        year: '2024',
        client: 'U&I Studios',
        roles: ['Brand Identity', 'Logo Design', 'Motion Graphics', 'Video Editing', 'Thumbnail Design'],
      }}
      heroImage="/thumbnail_V2.png"
      heroAlt="U&I Studios Brand Identity Showcase"
    >
      {/* Overview */}
      <ProjectSection>
        <SectionTitle>Overview</SectionTitle>
        <SectionText>
          <p>
            U&I Studios is a comprehensive visual identity and video production project for an immigration interview series. The project focuses on creating authentic, emotionally resonant branding that honors the personal stories of people building new lives in America.
          </p>
          <p>
            From logo design to video editing, every element was crafted to reflect the human experience of immigration while maintaining professional standards for interview content distribution and audience engagement.
          </p>
        </SectionText>
      </ProjectSection>

      {/* Logo Display */}
      <ProjectSection delay={0.1}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
          className="relative rounded-xl md:rounded-2xl overflow-hidden bg-black max-h-[70vh] max-w-[1100px] mx-auto"
          style={{ aspectRatio: '16/10' }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              src="/u&i_white_logo_trans.png"
              alt="U&I Studios Logo"
              width={800}
              height={800}
              className="max-w-[85%] max-h-[85%] w-auto h-auto object-contain"
            />
          </div>
        </motion.div>
      </ProjectSection>

      {/* Channel Identity */}
      <ProjectSection delay={0.15}>
        <SectionTitle>Channel Identity</SectionTitle>
        <SectionText>
          <p>
            I developed a comprehensive visual identity system that captures the essence of personal immigration stories through a scrapbook-like aesthetic. This nostalgic approach creates an intimate connection to memories and personal narratives, using layered textures and handcrafted elements that honor the human stories being shared.
          </p>
          <p>
            The scrapbook aesthetic extends to the custom introduction animation created in After Effects, featuring original assets and a personally composed audio track. This cohesive approach reinforces the intimate, memory-driven brand identity across all interview episodes and thumbnails.
          </p>
        </SectionText>
      </ProjectSection>

      <ProjectSection delay={0.2}>
        <ProjectImage
          src="/u&i channel identity.png"
          alt="U&I Studios Channel Identity Design"
          aspectRatio="16/10"
        />
      </ProjectSection>

      {/* Post-Production */}
      <ProjectSection delay={0.25}>
        <SectionTitle>Post-Production</SectionTitle>
        <SectionText>
          <p>
            Working within budget constraints and 1080p green screen footage presented significant technical challenges that required creative problem-solving throughout the production process.
          </p>
          <p>
            To overcome environmental limitations, I created custom environments in Blender, designing and utilizing 3D assets to build immersive backgrounds that elevated the production value within the technical constraints of the available footage.
          </p>
        </SectionText>
      </ProjectSection>

      {/* Before/After Slider */}
      <ProjectSection delay={0.3}>
        <BeforeAfterSlider />
      </ProjectSection>

      {/* Next Steps */}
      <ProjectSection delay={0.35}>
        <SectionTitle>Next Steps</SectionTitle>
        <SectionText>
          <p>
            The interview series will continue expanding with additional guests, featuring more personal immigration stories that showcase the diverse experiences of people building new lives in America.
          </p>
          <p>
            Marketing strategy will focus on building stronger social media engagement across platforms, creating more touchpoints for audience interaction and community building around the immigration narrative.
          </p>
          <p>
            Development of YouTube Shorts content will boost overall views and engagement, utilizing bite-sized storytelling formats to reach broader audiences and drive traffic to the full-length interview episodes.
          </p>
        </SectionText>
      </ProjectSection>
    </ProjectLayout>
  );
}
