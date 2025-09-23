'use client';

import { motion, useReducedMotion } from 'framer-motion';

const letters = "Motion".split("");

// Reusable highlight sweep that plays once when in view
function MotionHighlight({
  children,
  delay = 0,
  heightClass = "h-[75%]",
}: {
  children: React.ReactNode;
  delay?: number;
  heightClass?: string;
}) {
  const prefersReduced = useReducedMotion();

  return (
    <span className="relative inline-block">
      <span className="relative z-10">{children}</span>
      <motion.span
        aria-hidden
        className={`absolute inset-x-0 bottom-[2px] ${heightClass} bg-indigo-400/30 rounded-sm z-0 origin-left`}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: prefersReduced ? 1 : 1 }}
        transition={{
          duration: prefersReduced ? 0 : 1.6, // slower sweep
          ease: [0.22, 1, 0.36, 1],
          delay,
        }}
        viewport={{ once: true, amount: 0.6 }} // triggers when ~60% visible
        style={{ transform: 'translateZ(0)' }}
      />
    </span>
  );
}

export default function AboutSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="pt-[144px] pb-[72px]"
    >
      <div className="grid md:grid-cols-12">
        <div className="md:col-span-12">
          <h2 className="text-2xl font-semibold text-white mb-3 select-none">
            Visions In{" "}
            <span className="inline-block">
              {letters.map((char, i) => (
                <motion.span
                  key={i}
                  className="inline-block"
                  animate={{ y: [0, -6, 0] }}
                  transition={{
                    duration: 0.6,
                    ease: "easeInOut",
                    repeat: Infinity,
                    delay: i * 0.12,
                    repeatDelay: (letters.length - 1) * 0.12 + 0.2,
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </span>
          </h2>

          <p className="text-gray-300 text-[20px] leading-relaxed mb-4">
            My work brings together design and technology to create digital products
            that are both{" "}
            <MotionHighlight delay={0.3}>
              functional and visually refined
            </MotionHighlight>
            . It spans from shaping brand identities and design systems to building
            applications and platforms, always with a focus on clarity and usability.
          </p>

          <p className="text-gray-300 text-[20px] leading-relaxed mb-4">
            Alongside digital products, I have explored filmmaking and 3D media,
            developing skills in{" "}
            <MotionHighlight delay={0.6}>
              storytelling, direction, and crafting environments
            </MotionHighlight>{" "}
            that carry the right mood and energy. These experiences continue to guide how
            I <MotionHighlight delay={0.9}>balance creativity with technical execution</MotionHighlight>.
          </p>

          <p className="text-gray-300 text-[20px] leading-relaxed mb-4">
            <span className="bg-gradient-to-r from-indigo-300 to-indigo-400 bg-clip-text text-transparent font-semibold">
              Summit Visions
            </span>{" "}
            was established as a dedicated space to expand this practice into client
            collaborations. The agency builds on the same foundation:{" "}
            <MotionHighlight delay={1.2}>
              merging design, storytelling, and development
            </MotionHighlight>{" "}
            into experiences that feel intuitive and engaging.
          </p>
        </div>
      </div>
    </motion.section>
  );
}