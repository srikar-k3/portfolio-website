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
          <h2 className="text-4xl md:text-5xl font-bold text-black leading-tight uppercase text-center md:text-left">
            About me as a creator
          </h2>
        </div>

        {/* Blurb Text */}
        <div className="md:order-2">
          <p className="text-gray-600 text-lg leading-relaxed">
          I'm a visual and product designer who builds what I design. From crafting comprehensive brand identities 
          and design systems to developing the Swift apps and React applications that bring them to life, I create 
          end-to-end digital experiences that solve real user problems while maintaining visual excellence. 
          My approach combines strategic design thinking with technical execution, whether that's wireframing iOS interfaces, 
          designing color palettes and typography systems, or implementing AI-powered web applications with modern tech stacks.

          </p>
          <p className="text-gray-600 text-lg leading-relaxed mt-6">
          What sets me apart is my ability to take projects from initial concept to shipped product. I design user flows, 
          create interactive prototypes, develop design systems, and then build the actual applications, all while collaborating 
          effectively with development teams in Agile environments. Whether I'm directing video content with custom 3D environments, 
          designing merchandise collections, or crafting brand campaigns, I believe the best solutions emerge when design strategy 
          meets technical capability, creating experiences that not only look beautiful but drive meaningful user engagement.
          </p>
        </div>
      </div>
    </motion.section>
  );
}