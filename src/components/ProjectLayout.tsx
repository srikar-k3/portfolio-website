'use client';

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef, ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Footer from './Footer';

// Project metadata for navigation
const projectOrder = [
  { id: 'house-rules', title: 'House Rules', category: 'Mobile Design' },
  { id: 'monitorpad', title: 'MonitorPad', category: 'Mobile Design' },
  { id: 'youtube-chapter-generator', title: 'YouTube Chapter Generator', category: 'Web Design' },
  { id: 'victory-in-volumes', title: 'Victory In Volumes', category: 'Branding' },
  { id: 'rutgers-sapa', title: 'Rutgers SAPA', category: 'Brand Identity' },
  { id: 'u-and-i-studios', title: 'U&I Studios', category: 'Video Production' },
  { id: 'introduction-videos', title: 'Introduction Videos', category: 'Video Production' },
  { id: 'stage-background-visuals', title: 'Stage Background Visuals', category: 'Motion Graphics' },
  { id: 'lambda-tech-services', title: 'Lambda Tech Services', category: 'Brand Identity' },
];

type ProjectMeta = {
  title: string;
  subtitle: string;
  category: string;
  year?: string;
  client?: string;
  roles: string[];
};

type ProjectLayoutProps = {
  projectId: string;
  meta: ProjectMeta;
  heroImage?: string;
  heroAlt?: string;
  heroVideo?: string;
  children: ReactNode;
};

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export default function ProjectLayout({
  projectId,
  meta,
  heroImage,
  heroAlt = 'Project Hero',
  heroVideo,
  children,
}: ProjectLayoutProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showBackButton, setShowBackButton] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.3]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  // Chevron transforms to match home hero behavior
  const chevronY = useTransform(scrollYProgress, [0, 1], [0, 20]);
  const chevronOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const chevronScale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);

  // Get adjacent projects for navigation
  const currentIndex = projectOrder.findIndex((p) => p.id === projectId);
  const prevProject = currentIndex > 0 ? projectOrder[currentIndex - 1] : null;
  const nextProject = currentIndex < projectOrder.length - 1 ? projectOrder[currentIndex + 1] : null;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowBackButton(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleScrollToContent = (e: React.MouseEvent) => {
    e.preventDefault();
    const content = document.getElementById('project-content');
    if (content) {
      const y = content.getBoundingClientRect().top + window.scrollY - 40;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div
      className="min-h-screen text-white relative w-full max-w-full overflow-x-hidden"
      style={{ background: 'linear-gradient(135deg, #000000 0%, #0d0d0d 50%, #000000 100%)' }}
    >
      {/* Noise overlay */}
      <div
        className="fixed inset-0 opacity-[0.06] pointer-events-none z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Mouse glow */}
      <div
        className="fixed pointer-events-none z-[1] transition-opacity duration-300"
        style={{
          left: mousePos.x - 100,
          top: mousePos.y - 100,
          width: 200,
          height: 200,
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 40%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(40px)',
        }}
      />

      {/* Back Button */}
      <AnimatePresence>
        {showBackButton && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
            className="fixed top-6 left-6 z-50"
          >
            <Link
              href="/#projects"
              className="group flex items-center gap-2 px-4 py-2.5 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 hover:border-white/20 hover:bg-black/60 transition-all duration-300"
            >
              <svg
                className="w-4 h-4 text-white/70 group-hover:text-white transition-colors duration-200 group-hover:-translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="text-sm font-medium text-white/70 group-hover:text-white transition-colors duration-200">
                Back
              </span>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
        >
          {heroVideo ? (
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            >
              <source src={heroVideo} type="video/mp4" />
            </video>
          ) : heroImage ? (
            <Image
              src={heroImage}
              alt={heroAlt}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-zinc-900 via-black to-zinc-900" />
          )}
        </motion.div>

        {/* Hero gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black" />

        {/* Scroll indicator (home hero chevron) */}
        <motion.button
          onClick={handleScrollToContent}
          aria-label="Scroll to content"
          className="absolute bottom-6 sm:bottom-5 md:bottom-4 left-1/2 -translate-x-1/2 z-10 text-white/80 hover:text-white transition-colors duration-200"
          style={{ y: chevronY, opacity: chevronOpacity, scale: chevronScale }}
        >
          <span className="inline-block animate-bounce" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 md:w-7 md:h-7">
              <path d="M12 16.5a1 1 0 0 1-.7-.29l-6-6a1 1 0 1 1 1.4-1.42L12 14.09l5.3-5.3a1 1 0 0 1 1.4 1.42l-6 6a1 1 0 0 1-.7.29Z" />
            </svg>
          </span>
        </motion.button>
      </section>

      {/* Main Content */}
      <main id="project-content" className="relative z-10">
        {/* Project Header */}
        <section className="px-6 md:px-12 pt-16 md:pt-24 pb-12 md:pb-16">
          <div className="max-w-[1300px] mx-auto">
            <div className="grid md:grid-cols-12 gap-8 md:gap-12">
              {/* Title & Description */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
                className="md:col-span-8"
              >
                {/* Category chip and year removed per request */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-white leading-[1.1]">
                  {meta.title}
                </h1>
                <p className="mt-4 text-lg md:text-xl text-white/60 max-w-2xl">
                  {meta.subtitle}
                </p>
              </motion.div>

              {/* Metadata */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease: EASE_OUT_EXPO }}
                className="md:col-span-4"
              >
                {meta.client && (
                  <div className="mb-6">
                    <p className="text-xs font-medium tracking-wider uppercase text-white/40 mb-1.5">Client</p>
                    <p className="text-base text-white/90">{meta.client}</p>
                  </div>
                )}
                <div>
                  <p className="text-xs font-medium tracking-wider uppercase text-white/40 mb-3">Role</p>
                  <div className="flex flex-wrap gap-2">
                    {meta.roles.map((role) => (
                      <span
                        key={role}
                        className="px-3 py-1.5 text-xs font-medium text-white/70 bg-white/5 border border-white/10 rounded-full"
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.3, ease: EASE_OUT_EXPO }}
              className="mt-12 md:mt-16 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent origin-left"
            />
          </div>
        </section>

        {/* Content Sections */}
        <div className="px-6 md:px-12">
          <div className="max-w-[1300px] mx-auto">
            {children}
          </div>
        </div>

        {/* Project Navigation */}
        <section className="px-6 md:px-12 py-16 md:py-24 mt-12 md:mt-16 border-t border-white/10">
          <div className="max-w-[1300px] mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {prevProject ? (
                <Link
                  href={`/projects/${prevProject.id}`}
                  className="group p-6 md:p-8 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 hover:bg-white/[0.04] transition-all duration-300"
                >
                  <div className="flex items-center gap-2 text-white/40 mb-3">
                    <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    <span className="text-xs font-medium tracking-wider uppercase">Previous</span>
                  </div>
                  <p className="text-lg md:text-xl font-medium text-white group-hover:text-indigo-400 transition-colors duration-200">
                    {prevProject.title}
                  </p>
                  <p className="text-sm text-white/40 mt-1">{prevProject.category}</p>
                </Link>
              ) : (
                <div />
              )}

              {nextProject ? (
                <Link
                  href={`/projects/${nextProject.id}`}
                  className="group p-6 md:p-8 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 hover:bg-white/[0.04] transition-all duration-300 text-right"
                >
                  <div className="flex items-center justify-end gap-2 text-white/40 mb-3">
                    <span className="text-xs font-medium tracking-wider uppercase">Next</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                  <p className="text-lg md:text-xl font-medium text-white group-hover:text-indigo-400 transition-colors duration-200">
                    {nextProject.title}
                  </p>
                  <p className="text-sm text-white/40 mt-1">{nextProject.category}</p>
                </Link>
              ) : (
                <div />
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

// Reusable Section Components
export function ProjectSection({
  children,
  className = '',
  delay = 0,
  id,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  id?: string;
}) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.7, delay, ease: EASE_OUT_EXPO }}
      className={`py-10 md:py-14 ${className}`}
    >
      {children}
    </motion.section>
  );
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4 tracking-tight">
      {children}
    </h2>
  );
}

export function SectionText({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`text-lg text-white/70 leading-relaxed max-w-[800px] space-y-4 ${className}`}>
      {children}
    </div>
  );
}

export function ProjectImage({
  src,
  alt,
  caption,
  aspectRatio = '16/9',
  className = '',
  priority = false,
  maxHeight = true,
  fit = 'cover',
  bgColor,
}: {
  src: string;
  alt: string;
  caption?: string;
  aspectRatio?: string;
  className?: string;
  priority?: boolean;
  maxHeight?: boolean;
  fit?: 'cover' | 'contain';
  bgColor?: string;
}) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
      className={`max-w-[1100px] mx-auto ${className}`}
    >
      <div
        className={`relative w-full rounded-xl md:rounded-2xl overflow-hidden ${bgColor ? '' : 'bg-white/[0.02]'} border border-white/10 ${maxHeight ? 'max-h-[80vh]' : ''}`}
        style={{ aspectRatio, backgroundColor: bgColor }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          className={fit === 'contain' ? 'object-contain p-3 md:p-4' : 'object-cover'}
          sizes="(max-width: 768px) 100vw, (max-width: 1300px) 90vw, 1300px"
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-sm text-white/40 text-center">
          {caption}
        </figcaption>
      )}
    </motion.figure>
  );
}

export function ImageGrid({
  images,
  columns = 2,
  aspectRatio = '4/3',
}: {
  images: { src: string; alt: string }[];
  columns?: 2 | 3 | 4;
  aspectRatio?: string;
}) {
  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-4',
  };

  // Calculate max height based on columns (smaller items for more columns)
  const maxHeights = {
    2: 'max-h-[50vh]',
    3: 'max-h-[40vh]',
    4: 'max-h-[35vh]',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
      className={`grid ${gridCols[columns]} gap-4 md:gap-6 max-w-[1100px] mx-auto`}
    >
      {images.map((img, i) => (
        <motion.div
          key={img.src}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.1, ease: EASE_OUT_EXPO }}
          className={`relative rounded-xl overflow-hidden bg-white/[0.02] border border-white/10 ${maxHeights[columns]}`}
          style={{ aspectRatio }}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            className="object-cover"
            unoptimized
            sizes={`(max-width: 768px) 100vw, ${Math.floor(100 / columns)}vw`}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}

export function Blockquote({
  quote,
  author,
  role,
}: {
  quote: string;
  author: string;
  role?: string;
}) {
  return (
    <motion.blockquote
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
      className="py-10 md:py-14 max-w-[900px] mx-auto text-center"
    >
      <div className="relative">
        <svg
          className="absolute -top-4 -left-2 w-8 h-8 text-indigo-500/20"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
        <p className="text-xl md:text-2xl text-white/90 italic leading-relaxed">
          &ldquo;{quote}&rdquo;
        </p>
      </div>
      <footer className="mt-6">
        <cite className="not-italic">
          <span className="text-white/80 font-medium">{author}</span>
          {role && <span className="text-white/40 ml-2">— {role}</span>}
        </cite>
      </footer>
    </motion.blockquote>
  );
}

export function FullWidthImage({
  src,
  alt,
  aspectRatio = '21/9',
  caption,
}: {
  src: string;
  alt: string;
  aspectRatio?: string;
  caption?: string;
}) {
  return (
    <motion.figure
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
      className="py-10 md:py-14 -mx-6 md:-mx-12"
    >
      <div
        className="relative w-full overflow-hidden max-h-[70vh]"
        style={{ aspectRatio }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>
      {caption && (
        <figcaption className="mt-4 px-6 md:px-12 text-sm text-white/40 text-center">
          {caption}
        </figcaption>
      )}
    </motion.figure>
  );
}
