'use client';

import { motion, useInView } from 'framer-motion';
import type { Variants, Easing } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';

type Project = {
  title: string;
  subtitle: string;
  slug: string;
  hero: string;
};

const projects: Project[] = [
  { title: 'House Rules', subtitle: 'iOS Development', slug: 'house-rules', hero: '/house_rules_hero_section_V2.png' },
  { title: 'YouTube Chapter Generator', subtitle: 'Web Development', slug: 'youtube-chapter-generator', hero: '/yt_hero.png' },
  { title: 'U&I Studios', subtitle: 'Visual Identity & Video Production', slug: 'ui-studios', hero: '/thumbnail_V2.png' },
  { title: 'Rutgers SAPA', subtitle: 'Graphic Design & Video Production', slug: 'rutgers-sapa', hero: '/sapaOverviewImage.png' },
  { title: 'Lambda Tech Services', subtitle: 'Brand Identity & Web Design', slug: 'lambda-tech-services', hero: '/lambda_mockup_1.jpg' },
];

// ✅ Type-safe cubic-bezier for this Framer/Motion typings setup
const EASE_OUT: Easing = [0.22, 1, 0.36, 1] as unknown as Easing;

function ProjectCard({
  p,
  index,
  startedAt,
  demoDelay = 140,
  demoHold = 1200,
  totalCards,
}: {
  p: Project;
  index: number;
  startedAt: number | null;
  demoDelay?: number;
  demoHold?: number;
  totalCards: number;
}) {
  const [demoOn, setDemoOn] = useState(false);

  useEffect(() => {
    if (!startedAt) return;
    const startTime = startedAt + index * demoDelay;
    const globalEnd = startedAt + (totalCards - 1) * demoDelay + demoHold;

    const startTimer = setTimeout(() => setDemoOn(true), Math.max(0, startTime - Date.now()));
    const stopTimer  = setTimeout(() => setDemoOn(false), Math.max(0, globalEnd - Date.now()));

    return () => { clearTimeout(startTimer); clearTimeout(stopTimer); };
  }, [startedAt, index, demoDelay, demoHold, totalCards]);

  const hovered = demoOn;

  return (
    <Link href={`/projects/${p.slug}`} className="group relative block rounded-xl overflow-hidden">
      <div className="relative aspect-[4/3]">
        <Image
          src={p.hero}
          alt={`${p.title} Preview`}
          fill
          sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
          className={`object-cover ${p.slug === 'rutgers-sapa' ? 'object-[50%_55%]' : ''} ${p.slug === 'youtube-chapter-generator' ? 'scale-120' : ''}`}
        />

        <div
          className={[
            'pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent transition-opacity duration-400',
            hovered ? 'opacity-100' : 'opacity-0 group-hover:opacity-100',
          ].join(' ')}
        />
        <div
          className={[
            'absolute left-4 bottom-4 transition-all duration-400',
            hovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0',
          ].join(' ')}
        >
          <p className="text-white text-lg font-medium">{p.title}</p>
          <p className="text-white/85 text-sm">{p.subtitle}</p>
        </div>
        <div
          className={[
            'absolute bottom-4 right-4 transition-opacity duration-400',
            hovered ? 'opacity-100' : 'opacity-0 group-hover:opacity-100',
          ].join(' ')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-white">
            <path d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}

export default function ProjectsSection() {
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const titleInView = useInView(titleRef, { amount: 0.1, once: true });

  const [startedAt, setStartedAt] = useState<number | null>(null);
  useEffect(() => {
    if (titleInView && !startedAt) setStartedAt(Date.now());
  }, [titleInView, startedAt]);

  // ✅ Explicitly type as Variants; use typed EASE_OUT
  const containerVariants: Variants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 20 },
      show: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.6,
          ease: EASE_OUT,
          when: 'beforeChildren',
          staggerChildren: 0.06,
        },
      },
    }),
    []
  );

  const itemVariants: Variants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 16, scale: 0.985 },
      show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.45, ease: EASE_OUT },
      },
    }),
    []
  );

  return (
    <section id="projects" className="scroll-mt-[120px] py-[72px]">
      <h2 ref={titleRef} className="text-2xl font-semibold text-white mb-6 text-left">Projects</h2>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={startedAt ? 'show' : 'hidden'}
        className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8"
      >
        {projects.map((p, idx) => (
          <motion.div key={p.slug} variants={itemVariants}>
            <ProjectCard
              p={p}
              index={idx}
              startedAt={startedAt}
              demoDelay={140}
              demoHold={1200}
              totalCards={projects.length}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}