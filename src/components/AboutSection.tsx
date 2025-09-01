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
          I design digital products and the systems that support them, and I have the technical skills to bring those ideas to life. My work has ranged from brand identities and design systems to developing Swift apps and React platforms, always with a focus on creating experiences that are both useful and visually refined.
          </p>
          <p className="text-gray-400 text-lg leading-relaxed mt-6">
          Alongside product design, I've also worked in filmmaking and media, where I've developed skills in visual storytelling, directing, and building complex motion and 3D environments. Those projects taught me how to shape a narrative, balance creative direction with technical execution, and craft visuals that carry the right mood and energy. Whether I'm designing an app or producing media, my aim is the same: to merge design and technology in a way that feels thoughtful, engaging, and built with care.
          </p>
        </div>
      </div>
    </motion.section>
  );
}