'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import ProjectLayout, {
  ProjectSection,
  SectionTitle,
  SectionText,
} from '@/components/ProjectLayout';

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

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

  const handleTouchStart = () => {
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

export default function UAndIStudios() {
  // Handle hash navigation for #elevating section
  useEffect(() => {
    const { hash } = window.location;
    if (!hash) return;
    const id = hash.replace('#', '');
    const el = document.getElementById(id);
    if (!el) return;
    requestAnimationFrame(() => {
      const y = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    });
  }, []);

  return (
    <ProjectLayout
      projectId="u-and-i-studios"
      meta={{
        title: 'U&I Studios',
        subtitle: 'A YouTube channel sharing personal stories of people who left home to build a new life in the United States, with authentic, emotionally resonant branding.',
        category: 'Brand Identity',
        year: '2024',
        client: 'U&I Studios',
        roles: ['Digital Design', 'Visual Design', 'Logo Design', 'Brand Identity', 'Video Editing', 'Motion Graphics'],
      }}
      heroImage="/thumbnail_V2.png"
      heroAlt="U&I Studios Brand Identity Showcase"
    >
      {/* Overview */}
      <ProjectSection>
        <SectionTitle>Overview</SectionTitle>
        <SectionText>
          <p>
            U&I Studios is a YouTube channel created to share the real, personal stories of people who left home to build a new life in the United States. My task was to develop the channel&apos;s visual and brand identity, from the logo to the overall aesthetic, with a focus on creating authentic, emotionally resonant branding that honors each story.
          </p>
          <p>
            I also created the intro sequence and edited a filmed interview for the channel.
          </p>
        </SectionText>
      </ProjectSection>

      {/* Logo Design */}
      <ProjectSection delay={0.1}>
        <SectionTitle>Logo Design</SectionTitle>
        <SectionText>
          <p>
            The logo is intentionally not minimal; it is designed to convey its message directly. The &ldquo;U&rdquo; represents the United States, while the &ldquo;I&rdquo; represents India, and their merging symbolizes the blending of these two cultures.
          </p>
          <p>
            By unifying U&I into a single form, the logo reflects the cultural interplay and the collective journeys of Indian-Americans.
          </p>
        </SectionText>
      </ProjectSection>

      {/* Logo Display */}
      <ProjectSection delay={0.15}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
          className="relative rounded-xl md:rounded-2xl overflow-hidden bg-black border border-white/10 max-h-[70vh] max-w-[1100px] mx-auto"
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

      {/* Visual Identity */}
      <ProjectSection delay={0.2}>
        <SectionTitle>Visual Identity</SectionTitle>
        <SectionText>
          <p>
            The overall aesthetic centers on themes of collage and journey. I developed a visual identity system inspired by scrapbooks, using paper textures, layered cutout elements, and subtle gradient treatments to create a playful yet intimate mixed-media feel.
          </p>
          <p>
            This approach reflects the personal nature of immigration stories, grounding the visuals in nostalgia and lived experience. The scrapbook aesthetic extends into the custom introduction sequence and supporting digital assets, where original elements are combined to form a cohesive visual language.
          </p>
        </SectionText>
      </ProjectSection>

      {/* Elevating the Interview Setting */}
      <ProjectSection delay={0.25}>
        <div id="elevating">
          <SectionTitle>Elevating the Interview Setting</SectionTitle>
          <SectionText>
            <p>
              Working within budget constraints and 1080p green-screen footage presented technical challenges that required thoughtful and creative problem-solving throughout production.
            </p>
            <p>
              To overcome the limitations of the filmed environment, I built custom scenes in Blender, designing and integrating 3D assets to create immersive backgrounds that elevated the production value within the project&apos;s constraints.
            </p>
          </SectionText>
        </div>
      </ProjectSection>

      {/* Before/After Slider */}
      <ProjectSection delay={0.3}>
        <BeforeAfterSlider />
      </ProjectSection>
    </ProjectLayout>
  );
}
