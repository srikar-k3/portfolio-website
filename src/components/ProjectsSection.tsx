'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface ProjectCardProps {
  title: string;
  subtitle: string;
  description: string;
  imageSrc: string;
  delay: number;
  slug?: string;
  index: number;
}

function ProjectCard({ title, subtitle, description, imageSrc, delay, slug, index }: ProjectCardProps) {
  const [mousePos, setMousePos] = useState({ x: -200, y: -200 }); // Start offscreen
  const [isHovered, setIsHovered] = useState(false);

  const content = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="group relative flex flex-col md:flex-row md:items-center md:justify-between py-6 border-b border-gray-700 cursor-pointer overflow-hidden"
      data-project-item
      style={{ transition: 'background 400ms ease-out' }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }}
      onMouseEnter={(e) => {
        setIsHovered(true);
        e.currentTarget.style.background = `linear-gradient(90deg, rgba(255, 255, 255, 0.02) 0%, rgba(255, 255, 255, 0.025) 50%, rgba(255, 255, 255, 0.02) 100%)`;
      }}
      onMouseLeave={(e) => {
        setIsHovered(false);
        e.currentTarget.style.background = 'transparent';
      }}
    >
      {/* Mouse glow effect */}
      <div 
        className="absolute pointer-events-none"
        style={{
          left: mousePos.x - 75,
          top: mousePos.y - 75,
          width: 150,
          height: 150,
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.02) 30%, transparent 60%)',
          borderRadius: '50%',
          filter: 'blur(30px)',
          opacity: isHovered ? 1 : 0,
          zIndex: 1,
          transition: 'opacity 300ms ease-out'
        }}
      />
      
      {/* Mobile Layout */}
      <div className="flex items-center justify-between md:hidden mb-2">
        <h3 className="text-2xl font-normal text-white transition-colors duration-200">
          {title}
        </h3>
        <div className="text-xl font-light text-gray-400">
          0{index + 1}
        </div>
      </div>
      <div className="md:hidden">
        <h4 className="text-sm text-gray-400 uppercase tracking-wide">{subtitle}</h4>
      </div>
      
      {/* Desktop Layout */}
      <h3 className="hidden md:block text-4xl font-normal text-white transition-colors duration-200 flex-shrink-0">
        {title}
      </h3>
      
      <div className="hidden md:block flex-1 mx-8">
        <h4 className="text-lg text-gray-400 uppercase tracking-wide">{subtitle}</h4>
      </div>
      
      <div className="hidden md:block text-2xl font-light text-gray-500 flex-shrink-0">
        0{index + 1}
      </div>
    </motion.div>
  );

  return slug ? (
    <Link href={`/projects/${slug}`} className="block">
      {content}
    </Link>
  ) : (
    content
  );
}

export default function ProjectsSection() {
  const projects = [
    {
      title: "House Rules",
      subtitle: "iOS Development",
      description: "Swift and Firebase home management app featuring chore rotation algorithms, rule voting systems, and real-time activity tracking. Combines democratic governance with accountability tracking for shared living spaces through automated scheduling and transparent member oversight.",
      slug: "house-rules",
    },
    {
      title: "Youtube Chapter Generator",
      subtitle: "Web Development",
      description: "React and Express web app with AWS Transcribe and Gemini AI that converts audio files into timestamped YouTube chapters. Features multi-language audio input with English chapter output for improved SEO, human-in-the-loop transcript editing, and automated content flow analysis to generate properly formatted chapter markers.",
      slug: "youtube-chapter-generator",
    },
    {
      title: "U&I Studios",
      subtitle: "Visual Identity & Video Production",
      description: "Logo design, animation, and video editing project for U&I Studios immigration documentary series. Created complete visual identity including animated assets, thumbnail designs, and edited interview content for personal stories of people building new lives in America.",
      slug: "ui-studios",
    },
    {
      title: "Rutgers SAPA",
      subtitle: "Graphic Design & Video Production",
      description: "Web design, brand identity, and video production for nationally competing dance team. Created strategic Instagram branding with progressive reveal campaigns, designed merchandise collections, and directed cinematographic introduction videos using Premiere Pro and After Effects.",
      slug: "rutgers-sapa",
    },
    {
      title: "Lambda Tech Services",
      subtitle: "Brand Identity & Web Design",
      description: "Complete brand identity design and UI/UX work for a tech consultancy. Created wireframes and interactive prototypes, collaborated directly with clients, and contributed Flutter development across multiple applications in an Agile environment.",
      slug: "lambda-tech-services",
    },
  ];

  return (
    <motion.section
      id="projects"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="min-h-screen flex flex-col py-20"
    >
      {/* Section Title */}
      <div className="text-center mb-6 pt-16 sm:pt-20 md:pt-24 lg:pt-32 xl:pt-[20vh]">
        <h2 className="text-4xl md:text-5xl font-bold text-white uppercase">Projects</h2>
      </div>

      {/* Project List */}
      <div className="w-full max-w-6xl mx-auto flex-1">
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            title={project.title}
            subtitle={project.subtitle}
            description={project.description}
            imageSrc=""
            delay={0.6 + (index * 0.1)}
            slug={project.slug}
            index={index}
          />
        ))}
      </div>
    </motion.section>
  );
}