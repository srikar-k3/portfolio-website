'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

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
  const content = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="group flex flex-col md:flex-row md:items-center md:justify-between py-6 border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
    >
      {/* Mobile Layout */}
      <div className="flex items-center justify-between md:hidden mb-2">
        <h3 className="text-2xl font-normal text-black group-hover:text-gray-700 transition-colors duration-200">
          {title}
        </h3>
        <div className="text-xl font-light text-gray-400">
          0{index + 1}
        </div>
      </div>
      <div className="md:hidden">
        <h4 className="text-sm text-gray-600 uppercase tracking-wide">{subtitle}</h4>
      </div>
      
      {/* Desktop Layout */}
      <h3 className="hidden md:block text-4xl font-normal text-black group-hover:text-gray-700 transition-colors duration-200 flex-shrink-0">
        {title}
      </h3>
      
      <div className="hidden md:block flex-1 mx-8">
        <h4 className="text-lg text-gray-600 uppercase tracking-wide">{subtitle}</h4>
      </div>
      
      <div className="hidden md:block text-2xl font-light text-gray-400 flex-shrink-0">
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
      className="mb-20"
    >
      {/* Section Title */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-black uppercase">Projects</h2>
      </div>

      {/* Project List */}
      <div className="max-w-6xl mx-auto">
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