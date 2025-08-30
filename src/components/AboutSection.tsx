'use client';

import { motion } from 'framer-motion';

export default function AboutSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="mb-20"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
        {/* Header Text */}
        <div className="md:order-1">
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight uppercase text-center md:text-left">
            About me as a creator
          </h2>
        </div>

        {/* Blurb Text */}
        <div className="md:order-2">
          <p className="text-gray-400 text-lg leading-relaxed">
          I am a visual and product designer with the technical expertise to build the solutions I design. My work ranges 
          from creating brand identities and design systems to developing Swift applications and React platforms that bring 
          those designs to life. I focus on end-to-end digital experiences that solve real user needs while maintaining a high 
          standard of visual craft.
          </p>
          <p className="text-gray-400 text-lg leading-relaxed mt-6">
          What sets me apart is the ability to carry a project from concept to launch. I design systems and interactive prototypes
          and then build the actual applications. Beyond digital products, I have directed video content in custom 3D environments, 
          designed merchandise collections, and led brand campaigns. In every case, my goal is to merge design and technology to 
          create experiences that are visually compelling and meaningfully engaging.
          </p>
        </div>
      </div>
    </motion.section>
  );
}