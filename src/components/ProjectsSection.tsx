'use client';

import { AnimatePresence, motion, useInView, useScroll } from 'framer-motion';
import type { Variants, Easing } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';

type ProjectItem = {
  id: string;
  href?: string;
  image?: string;
  alt?: string;
  caption?: string;
  fit?: 'cover' | 'contain';
  bg?: string;
};

type Category = {
  id: string;
  label: string;
  icon: string;
  projects: Array<ProjectItem>;
};

const categories: Category[] = [
  {
    id: 'figma',
    label: 'MOBILE & WEB DESIGN',
    icon: '/figmaicon.png',
    projects: [
      {
        id: 'f1',
        href: '/projects/house-rules',
        image: '/house_rules_hero_section_V2.png',
        alt: 'House Rules App Hero',
        caption: 'House Rules',
      },
      {
        id: 'f3',
        href: '/projects/monitorpad',
        caption: 'MonitorPad',
      },
      {
        id: 'f2',
        href: '/projects/youtube-chapter-generator',
        image: '/yt_hero.png',
        alt: 'YouTube Chapter Generator Hero',
        caption: 'YouTube Chapter Generator',
      },
      {
        id: 'f4',
        href: '/projects/victory-in-volumes#website-design',
        image: '/viv_website_mockup.png',
        alt: 'Victory In Volumes Website Mockup',
        caption: 'Victory In Volumes',
        fit: 'contain',
        bg: '#f5f1ed',
      },
    ],
  },
  {
    id: 'ps',
    label: 'CREATIVE DESIGN',
    icon: '/psicon.png',
    projects: [
      { id: 'p1', href: '/projects/rutgers-sapa', image: '/Minza7_RUSAPA-396.jpg', alt: 'Rutgers SAPA Brand Identity', caption: 'Rutgers SAPA [Creative Design]' },
      { id: 'p2', href: '/projects/u-and-i-studios', image: '/thumbnail_V2.png', alt: "U&I Studios Hero", caption: 'U&I Studios' },
      { id: 'p3' },
      { id: 'p4' },
    ],
  },
  { id: 'ai', label: 'BRANDING', icon: '/aiicon.png', projects: [
    { id: 'a1', href: '/projects/victory-in-volumes', image: '/victory_totebag_mockup.png', alt: 'Victory In Volumes Tote Bag Mockup', caption: 'Victory In Volumes' },
    {
      id: 'a2',
      href: '/projects/lambda-tech-services',
      image: '/lambda_mockup_1.jpg',
      alt: 'Lambda Tech Services Brand',
      caption: 'Lambda Tech Services',
    },
    { id: 'a3' },
    { id: 'a4' },
  ] },
  {
    id: 'pr',
    label: 'VIDEO PRODUCTION',
    icon: '/pricon.png',
    projects: [
      { id: 'pr1', href: '/projects/introduction-videos', caption: 'RU SAPA [Cinematic Video]' },
      { id: 'pr2', href: '/projects/u-and-i-studios#elevating', image: '/thumbnail_V2.png', alt: "U&I Studios Hero", caption: 'U&I Studios' },
      { id: 'pr3' },
      { id: 'pr4' },
    ],
  },
  {
    id: 'ae',
    label: 'MOTION GRAPHICS',
    icon: '/aeicon.png',
    projects: [
      { id: 'ae1', href: '/projects/stage-background-visuals', image: '/sapa_motion_hero.jpg', alt: 'Stage Background Visuals Hero', caption: 'RU SAPA [Stage Visuals]' },
      { id: 'ae2' },
      { id: 'ae3' },
      { id: 'ae4' },
    ],
  },
  { id: 'misc', label: 'MISCELLANEOUS', icon: '/miscIcon.png', projects: [{ id: 'm1' }, { id: 'm2' }] },
];

const CORE_IDS = ['figma', 'ps', 'ai', 'pr', 'ae'] as const;
const EASE_OUT: Easing = [0.22, 1, 0.36, 1] as unknown as Easing;
const EASE_OUT_EXPO: Easing = [0.16, 1, 0.3, 1] as unknown as Easing;

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);

  const sectionInView = useInView(sectionRef, { amount: 0.01, margin: '0px 0px -25% 0px', once: true });
  const titleInView = useInView(titleRef, { amount: 0.1, once: true });

  // Scroll-driven category stepping while viewport stays pinned
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });

  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [selectedId, setSelectedId] = useState<string>(CORE_IDS[0]);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [flashId, setFlashId] = useState<string | null>(null);
  const flashTimerRef = useRef<number | null>(null);
  const chipId = hoveredId ?? flashId;
  // Progress tracker for hint chip; show each time user crosses into the track
  const lastProgressRef = useRef<number>(0);

  // Lock while performing a click-initiated smooth scroll so the stepper
  // doesn't jitter the selected icon mid-animation
  const isClickScrollingRef = useRef<boolean>(false);
  const targetTopRef = useRef<number | null>(null);
  const unlockTimerRef = useRef<number | null>(null);

  // Click to select or scroll-target a category (aligned with our sticky track mapping)
  const scrollToIcon = (id: string) => {
    const allowed = CORE_IDS as unknown as string[];
    const idx = allowed.indexOf(id);
    // Non-core categories (e.g., 'misc') just select without scroll
    if (idx < 0) { setSelectedId(id); setFlashId(id); return; }

    const wrapper = (sectionRef.current?.closest('[data-sw-wrapper]') ?? null) as HTMLElement | null;
    if (!wrapper) { setSelectedId(id); setFlashId(id); return; }

    const rect = wrapper.getBoundingClientRect();
    const top = rect.top + window.scrollY;
    const vh = window.innerHeight || 1;
    const height = wrapper.offsetHeight || rect.height || vh * (allowed.length + 1);
    const span = Math.max(1, height - vh); // total scrollable distance of track

    // Our mapping compresses stepping into the first 90% of progress.
    // Aim for the center of the target bucket within that 90%.
    const n = allowed.length;
    const vAdjTarget = (idx + 0.5) / n; // 0..1 within buckets
    const vTarget = Math.min(1, vAdjTarget * 0.9); // compress to first 90%

    let targetTop = top + vTarget * height;
    // clamp
    const minTop = top;
    const maxTop = top + height;
    if (targetTop < minTop) targetTop = minTop;
    if (targetTop > maxTop) targetTop = maxTop;

    // Smooth scroll to target
    try {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      // Engage lock during smooth scroll
      isClickScrollingRef.current = !prefersReduced;
      targetTopRef.current = targetTop;
      if (unlockTimerRef.current) window.clearTimeout(unlockTimerRef.current);
      unlockTimerRef.current = window.setTimeout(() => {
        isClickScrollingRef.current = false;
        targetTopRef.current = null;
      }, 1200);
      window.scrollTo({ top: targetTop, behavior: prefersReduced ? 'auto' : 'smooth' });
    } catch {}

    // Visually confirm the selection right away
    setSelectedId(id);
    setFlashId(id);
  };

  useEffect(() => { if (!startedAt && (sectionInView || titleInView)) setStartedAt(Date.now()); }, [sectionInView, titleInView, startedAt]);
  useEffect(() => { if (!startedAt && window.location.hash === '#projects') requestAnimationFrame(() => setStartedAt(Date.now())); }, [startedAt]);
  // Show a quick chip hint each time the user begins scrolling into the sticky viewport
  useEffect(() => {
    const unsub = scrollYProgress.on('change', (v) => {
      const prev = lastProgressRef.current;
      // Detect upward crossing into the section (from <=threshold to >threshold)
      const THRESH = 0.02;
      if (prev <= THRESH && v > THRESH) {
        setFlashId(CORE_IDS[0] as unknown as string);
        if (flashTimerRef.current) window.clearTimeout(flashTimerRef.current);
        flashTimerRef.current = window.setTimeout(() => setFlashId(null), 1100);
      }
      lastProgressRef.current = v;
    });
    return () => { try { unsub(); } catch {} };
  }, [scrollYProgress]);
  useEffect(() => {
    if (flashTimerRef.current) window.clearTimeout(flashTimerRef.current);
    setFlashId(selectedId);
    flashTimerRef.current = window.setTimeout(() => setFlashId(null), 900);
    return () => { if (flashTimerRef.current) window.clearTimeout(flashTimerRef.current); };
  }, [selectedId]);
  useEffect(() => { if (hoveredId) setFlashId(null); }, [hoveredId]);

  const containerVariants: Variants = useMemo(() => ({ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT, when: 'beforeChildren', staggerChildren: 0.05 } } }), []);

  // Map scroll progress across this section to each app icon step (figma -> ps -> ai -> pr -> ae)
  useEffect(() => {
    const unsub = scrollYProgress.on('change', (v) => {
      if (isClickScrollingRef.current) return; // ignore while locked
      const n = CORE_IDS.length; // 5
      // Compress stepping into the first 90% of progress so the last category
      // (Motion Graphics) is fully visible before the sticky releases.
      const vAdj = Math.min(1, Math.max(0, v / 0.9));
      const idx = Math.min(n - 1, Math.max(0, Math.floor(vAdj * n - 1e-6)));
      const id = CORE_IDS[idx] as unknown as string;
      if (id !== selectedId) setSelectedId(id);
    });
    return () => { try { unsub(); } catch {} };
  }, [scrollYProgress, selectedId]);

  // Unlock when native smooth scrolling reaches target (or user interrupts)
  useEffect(() => {
    const onScroll = () => {
      const tgt = targetTopRef.current;
      if (!isClickScrollingRef.current || tgt == null) return;
      if (Math.abs((window.scrollY || window.pageYOffset || 0) - tgt) <= 2) {
        isClickScrollingRef.current = false;
        targetTopRef.current = null;
        if (unlockTimerRef.current) window.clearTimeout(unlockTimerRef.current);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Track height equals number of core categories (5) times viewport height
  // Add a 1x viewport breathing room after the last category before release
  const trackVH = (CORE_IDS.length + 1) * 100;

  // Project card variants for staggered entrance
  const cardVariants: Variants = useMemo(() => ({
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: i * 0.08,
        ease: EASE_OUT_EXPO,
      },
    }),
  }), []);

  // Fixed height for caption area to maintain consistency
  const CAPTION_HEIGHT = 'h-6 sm:h-7';

  return (
    <section
      id="projects"
      ref={sectionRef}
      data-sw-wrapper
      className="relative z-10 bg-black mx-[calc(50%-50vw)]"
      style={{ height: `${trackVH}vh` }}
    >
      <div className="sticky top-0 h-[100svh] flex flex-col relative overflow-hidden">
        {/* Content container - uses CSS grid to properly allocate space above dock */}
        <div
          className="flex-1 min-h-0 grid px-3 md:px-6"
          style={{
            gridTemplateRows: 'auto 1fr',
            paddingTop: 'clamp(0.5rem, 1.5vh, 1rem)',
            paddingBottom: 'clamp(140px, 20vh, 180px)',
          }}
        >
          {/* Section header */}
          <div className="text-center mb-2 md:mb-3 lg:mb-5">
            <h2 ref={titleRef} className="text-2xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-white uppercase">
              Featured Work
            </h2>
          </div>

          {/* Grid container with constrained height */}
          <div className="w-[85vw] max-w-[880px] mx-auto min-h-0 flex flex-col justify-center">
            <motion.div variants={containerVariants} initial="hidden" animate={startedAt ? 'show' : 'hidden'} className="min-h-0">
              <AnimatePresence mode="wait">
                {categories.filter((c) => c.id === selectedId).map((c) => (
                  <motion.div
                    key={c.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15, ease: EASE_OUT_EXPO }}
                    className="min-h-0"
                  >
                    <h3 className="sr-only">{c.label}</h3>
                    <div
                      className="grid grid-cols-2 gap-x-3 gap-y-2 md:gap-x-4 md:gap-y-3"
                    >
                      {c.projects.slice(0, 4).map((p, i) => (
                        <motion.div
                          key={p.id}
                          custom={i}
                          variants={cardVariants}
                          initial="hidden"
                          animate="show"
                          className="flex flex-col w-full group min-h-0"
                        >
                          {p.href && p.image ? (
                            <a
                              href={p.href}
                              data-project-item
                              className="project-card w-full aspect-[16/9] rounded-lg md:rounded-xl bg-white/[0.03] border border-white/[0.08] overflow-hidden block relative transition-all duration-300 ease-out hover:border-white/20 hover:bg-white/[0.05] hover:scale-[1.02] hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
                              style={p.bg ? { backgroundColor: p.bg } : undefined}
                              aria-label={p.caption || p.alt || 'Project'}
                            >
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={p.image}
                                alt={p.alt || 'Project image'}
                                className={`w-full h-full ${p.fit === 'contain' ? 'object-contain p-2 md:p-3' : 'object-cover'} transition-transform duration-500 ease-out ${p.fit === 'contain' ? '' : 'group-hover:scale-105'}`}
                              />
                              {/* Hover overlay */}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                              {/* View indicator */}
                              <div className="absolute bottom-2 right-2 md:bottom-3 md:right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                                <span className="text-[10px] md:text-xs font-medium text-white/90 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full">
                                  View
                                </span>
                              </div>
                            </a>
                          ) : p.href ? (
                            <a
                              href={p.href}
                              className="project-card w-full aspect-[16/9] rounded-lg md:rounded-xl bg-white/[0.03] border border-white/[0.08] overflow-hidden block relative transition-all duration-300 ease-out hover:border-white/20 hover:bg-white/[0.05] hover:scale-[1.02]"
                              aria-label={p.caption || p.alt || 'Project'}
                            >
                              {/* Placeholder shimmer */}
                              <div className="absolute inset-0 shimmer" />
                            </a>
                          ) : (
                            <div className="w-full aspect-[16/9] rounded-lg md:rounded-xl bg-white/[0.05] border border-white/[0.12] border-dashed overflow-hidden relative">
                              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] to-transparent" />
                            </div>
                          )}
                          {/* Fixed height caption area for consistency */}
                          <div className={`mt-1.5 sm:mt-2 w-full text-left ${CAPTION_HEIGHT} flex items-start shrink-0`}>
                            <span className="text-[11px] sm:text-[13px] text-white/70 group-hover:text-white/90 transition-colors duration-200 font-medium truncate">
                              {p.caption || '\u00A0'}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>

        {/* Mobile Dock - fixed position at bottom of sticky container */}
        <div className="md:hidden absolute bottom-6 left-1/2 -translate-x-1/2 z-50">
          <div
            className="mx-auto w-max rounded-2xl overflow-visible backdrop-blur-xl"
            style={{
              backgroundImage: "url('/Dock Background.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              boxShadow: '0 4px 24px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
            }}
          >
            <ul className="py-2.5 px-3 flex items-center justify-center gap-1.5">
              {categories.map((c) => (
                <li key={c.id} className="relative shrink-0">
                  <button
                    onClick={() => scrollToIcon(c.id)}
                    onMouseEnter={() => { setHoveredId(c.id); setFlashId(null); }}
                    onMouseLeave={() => setHoveredId((prev) => (prev === c.id ? null : prev))}
                    className={`relative transition-all duration-200 ease-out rounded-lg p-0.5 ${
                      selectedId === c.id ? 'scale-110 -translate-y-1' : 'hover:scale-105 hover:-translate-y-0.5'
                    }`}
                    aria-pressed={selectedId === c.id}
                    aria-label={c.label}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={c.icon}
                      alt={c.label}
                      width={38}
                      height={38}
                      className={`transition-all duration-200 ${selectedId === c.id ? 'drop-shadow-[0_4px_12px_rgba(255,255,255,0.15)]' : ''}`}
                    />
                  </button>
                  {selectedId === c.id && (
                    <motion.span
                      layoutId="dock-indicator-mobile"
                      className="pointer-events-none absolute left-1/2 -translate-x-1/2 -bottom-0.5 w-1 h-1 rounded-full bg-white z-50"
                      style={{ boxShadow: '0 0 8px rgba(255, 255, 255, 0.9)' }}
                      transition={{ duration: 0.1, ease: 'easeOut' }}
                    />
                  )}
                  <AnimatePresence>
                    {chipId === c.id && (
                      <motion.div
                        key={`chip-top-m-${c.id}`}
                        initial={{ opacity: 0, y: 6, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.9 }}
                        transition={{ duration: 0.2, ease: EASE_OUT_EXPO }}
                        className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 z-[60]"
                      >
                        <div className="px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md text-white text-[10px] font-medium border border-white/10 shadow-xl whitespace-nowrap">
                          {c.label}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Desktop Dock - fixed position at bottom of sticky container */}
        <div className="hidden md:block absolute bottom-8 left-1/2 -translate-x-1/2 z-50">
          <div
            className="mx-auto w-max rounded-2xl overflow-visible backdrop-blur-xl"
            style={{
              backgroundImage: "url('/Dock Background.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
            }}
          >
            <ul className="py-3 px-4 flex items-center justify-center gap-3">
              {categories.map((c) => (
                <li key={c.id} className="relative">
                  <button
                    onClick={() => scrollToIcon(c.id)}
                    onMouseEnter={() => { setHoveredId(c.id); setFlashId(null); }}
                    onMouseLeave={() => setHoveredId((prev) => (prev === c.id ? null : prev))}
                    className={`relative transition-all duration-200 ease-out rounded-xl p-0.5 ${
                      selectedId === c.id ? 'scale-110 -translate-y-1.5' : 'hover:scale-105 hover:-translate-y-1'
                    }`}
                    aria-pressed={selectedId === c.id}
                    aria-label={c.label}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={c.icon}
                      alt={c.label}
                      width={46}
                      height={46}
                      className={`transition-all duration-200 ${selectedId === c.id ? 'drop-shadow-[0_6px_16px_rgba(255,255,255,0.2)]' : ''}`}
                    />
                  </button>
                  {selectedId === c.id && (
                    <motion.span
                      layoutId="dock-indicator-desktop"
                      className="pointer-events-none absolute left-1/2 -translate-x-1/2 -bottom-0.5 w-1.5 h-1.5 rounded-full bg-white z-50"
                      style={{ boxShadow: '0 0 10px rgba(255, 255, 255, 0.9)' }}
                      transition={{ duration: 0.1, ease: 'easeOut' }}
                    />
                  )}
                  <AnimatePresence>
                    {chipId === c.id && (
                      <motion.div
                        key={`chip-bottom-${c.id}`}
                        initial={{ opacity: 0, y: 6, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.9 }}
                        transition={{ duration: 0.2, ease: EASE_OUT_EXPO }}
                        className="pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2 z-[60]"
                      >
                        <div className="px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-md text-white text-[11px] font-medium border border-white/10 shadow-xl whitespace-nowrap">
                          {c.label}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
