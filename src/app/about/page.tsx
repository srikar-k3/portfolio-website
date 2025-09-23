'use client';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import AboutSection from '@/components/AboutSection';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type XY = { x: number; y: number };

const mountFade = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay: 0.2 },
} as const;

export default function AboutPage() {
  const [mousePos, setMousePos] = useState<XY>({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <div
      className="min-h-screen text-white relative w-full"
      style={{ background: 'linear-gradient(135deg, #000000 0%, #0d0d0d 50%, #000000 100%)' }}
    >
      {/* subtle noise */}
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='5.0' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      {/* mouse glow */}
      <div
        className="fixed pointer-events-none z-0"
        style={{
          left: mousePos.x - 75,
          top: mousePos.y - 75,
          width: 150,
          height: 150,
          background:
            'radial-gradient(circle, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 30%, transparent 60%)',
          borderRadius: '50%',
          filter: 'blur(30px)',
        }}
        aria-hidden="true"
      />

      <Navigation />

      <main className="px-6 md:px-12">
        <div className="max-w-[1300px] mx-auto">
          {/* Section 1 — About Me */}
          <motion.section {...mountFade} className="pt-[144px] pb-[72px]">
            <h2 className="text-2xl font-semibold text-white mb-3">About Me</h2>
            <p className="text-gray-300 text-[20px] leading-relaxed mb-4">
              I studied Computer Science at Rutgers with minors in Business Administration, Cognitive Science, and Philosophy.
              While I built a strong foundation in development, I’ve always been drawn to the thought processes of users and the
              challenge of shaping interfaces that feel natural and engaging.
            </p>
            <p className="text-gray-300 text-[20px] leading-relaxed">
              Alongside this, I explored filmmaking and visual storytelling through directing videos, designing graphics, and working
              with 3D environments. That experience shaped how I think about building connections, and today I bring the same balance
              of engineering and design into creating work that is both functional and expressive.
            </p>
          </motion.section>

          {/* Section 2 — Summit Visions */}
          <motion.section
            {...mountFade}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="pt-[144px] pb-[72px]"
          >
            <h2 className="text-2xl font-semibold text-white mb-3">Summit Visions</h2>
            <p className="text-gray-300 text-[20px] leading-relaxed mb-4">
              Summit Visions is the design and development studio I founded to bring together brand identity, interface design,
              and full-stack engineering. The studio is built on the belief that visuals and systems should support one another,
              creating products that feel both polished and practical. Each project is an opportunity to shape an experience with
              clarity while carrying forward the same storytelling instincts that guide my creative work.
            </p>
          </motion.section>

          {/* Section 3 — Visions In Motion */}
          <AboutSection />

          {/* CTA — smaller top space but keep bottom rhythm */}
          <motion.section
            {...mountFade}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="pt-[72px] pb-[96px]"
          >
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 text-lg md:text-xl font-semibold text-white/90 hover:text-white transition-colors"
            >
              Let’s work together <span className="text-white/70" aria-hidden="true">→</span>
            </Link>
          </motion.section>
        </div>
      </main>

      <Footer />
    </div>
  );
}