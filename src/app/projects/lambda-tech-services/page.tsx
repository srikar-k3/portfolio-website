'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import ProjectLayout, {
  ProjectSection,
  SectionTitle,
  SectionText,
  ProjectImage,
} from '@/components/ProjectLayout';

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1];

export default function LambdaTechServices() {
  return (
    <ProjectLayout
      projectId="lambda-tech-services"
      meta={{
        title: 'Lambda Tech Services',
        subtitle: 'A comprehensive brand identity and UI/UX design system positioning a premium technology consultancy for success in a competitive market.',
        category: 'Brand Identity',
        year: '2023',
        client: 'Lambda Tech Services',
        roles: ['Brand Identity', 'UI/UX Design', 'Prototyping', 'Design System', 'Flutter Development'],
      }}
      heroImage="/lambda_mockup_1.jpg"
      heroAlt="Lambda Tech Services Brand Identity"
    >
      {/* Overview */}
      <ProjectSection>
        <SectionTitle>Overview</SectionTitle>
        <SectionText>
          <p>
            Lambda Tech Services required a comprehensive brand identity and UI/UX design system that would position them as a premium technology consultancy. The project encompassed complete visual identity development, digital design systems, and collaborative development work.
          </p>
          <p>
            Working directly with clients in an Agile environment, I created wireframes, interactive prototypes, and contributed Flutter development across multiple applications while establishing a cohesive brand presence that communicates technical expertise and reliability.
          </p>
        </SectionText>
      </ProjectSection>

      {/* Logo Design */}
      <ProjectSection delay={0.1}>
        <SectionTitle>Logo Design</SectionTitle>
        <SectionText>
          <p>
            The Lambda Tech Services logo combines mathematical precision with modern technology aesthetics. The lambda symbol (λ) represents functional programming and mathematical elegance—core principles in advanced software development.
          </p>
          <p>
            I created multiple logo variations including horizontal, stacked, and icon-only versions to ensure versatility across all applications—from business cards to large-scale digital displays. The design maintains readability and impact at any size while establishing immediate recognition.
          </p>
        </SectionText>
      </ProjectSection>

      {/* Logo Display */}
      <ProjectSection delay={0.15}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
          className="relative rounded-xl md:rounded-2xl overflow-hidden max-h-[70vh] max-w-[1100px] mx-auto"
          style={{ backgroundColor: '#020025', aspectRatio: '16/10' }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              src="/lambdaPFP.png"
              alt="Lambda Tech Services Logo"
              width={600}
              height={600}
              className="w-[50%] md:w-[45%] h-auto object-contain"
            />
          </div>
        </motion.div>
      </ProjectSection>

      {/* Color Palette */}
      <ProjectSection delay={0.2}>
        <SectionTitle>Color Palette</SectionTitle>
        <SectionText className="mb-8">
          <p>
            The color system balances professionalism with modern energy. Rich Black provides a sophisticated foundation, while Red Orange adds dynamic accent points that draw attention without overwhelming.
          </p>
        </SectionText>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
          className="rounded-xl md:rounded-2xl overflow-hidden"
        >
          <div className="flex group" style={{ aspectRatio: '4/1' }}>
            <div
              className="flex-1 flex flex-col items-center justify-center text-white cursor-pointer transition-all duration-300 group-hover:opacity-50 hover:!opacity-100"
              style={{ backgroundColor: '#020025' }}
            >
              <div className="text-sm md:text-lg font-medium">#020025</div>
              <div className="text-xs md:text-sm opacity-80 mt-1">Rich Black</div>
            </div>
            <div
              className="flex-1 flex flex-col items-center justify-center text-white cursor-pointer transition-all duration-300 group-hover:opacity-50 hover:!opacity-100"
              style={{ backgroundColor: '#61727d' }}
            >
              <div className="text-sm md:text-lg font-medium">#61727d</div>
              <div className="text-xs md:text-sm opacity-80 mt-1">Slate Gray</div>
            </div>
            <div
              className="flex-1 flex flex-col items-center justify-center text-white cursor-pointer transition-all duration-300 group-hover:opacity-50 hover:!opacity-100"
              style={{ backgroundColor: '#e86637' }}
            >
              <div className="text-sm md:text-lg font-medium">#e86637</div>
              <div className="text-xs md:text-sm opacity-80 mt-1">Red Orange</div>
            </div>
            <div
              className="flex-1 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 group-hover:opacity-50 hover:!opacity-100"
              style={{ backgroundColor: '#fbf7f8', color: '#020025' }}
            >
              <div className="text-sm md:text-lg font-medium">#fbf7f8</div>
              <div className="text-xs md:text-sm opacity-80 mt-1">Ghost White</div>
            </div>
          </div>
        </motion.div>
      </ProjectSection>

      {/* Typography */}
      <ProjectSection delay={0.25}>
        <SectionTitle>Typography</SectionTitle>
        <div className="grid md:grid-cols-2 gap-4 md:gap-6 mt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
            className="p-6 md:p-8 rounded-xl md:rounded-2xl bg-white/[0.02] border border-white/10"
          >
            <h4 className="text-lg md:text-xl font-medium text-white mb-6">Primary Font</h4>
            <div className="space-y-3">
              <div className="text-3xl md:text-4xl font-bold text-white">Inter Bold</div>
              <div className="text-xl md:text-2xl font-semibold text-white/80">Inter Semibold</div>
              <div className="text-lg font-medium text-white/60">Inter Medium</div>
              <div className="text-base font-normal text-white/50">Inter Regular</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: EASE_OUT_EXPO }}
            className="p-6 md:p-8 rounded-xl md:rounded-2xl bg-white/[0.02] border border-white/10"
          >
            <h4 className="text-lg md:text-xl font-medium text-white mb-6">Usage Guidelines</h4>
            <div className="space-y-3 text-sm">
              <p className="text-white/60">
                <span className="font-semibold text-white/90">Headlines:</span> Inter Bold, 32-48px
              </p>
              <p className="text-white/60">
                <span className="font-semibold text-white/90">Subheadings:</span> Inter Semibold, 20-28px
              </p>
              <p className="text-white/60">
                <span className="font-semibold text-white/90">Body Text:</span> Inter Regular, 16-18px
              </p>
              <p className="text-white/60">
                <span className="font-semibold text-white/90">Captions:</span> Inter Medium, 12-14px
              </p>
            </div>
          </motion.div>
        </div>
      </ProjectSection>

      {/* Website Design */}
      <ProjectSection delay={0.3}>
        <SectionTitle>Website Design</SectionTitle>
        <SectionText>
          <p>
            Designed and prototyped a comprehensive website experience that showcases Lambda Tech Services&apos; technical capabilities while maintaining user-friendly navigation and clear service communication.
          </p>
          <p>
            The design system emphasizes clean layouts, strategic use of whitespace, and intuitive information architecture that converts visitors into qualified leads. Created detailed wireframes and interactive prototypes that guided the development process.
          </p>
        </SectionText>
      </ProjectSection>

      <ProjectSection delay={0.35}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
          className="relative rounded-xl md:rounded-2xl overflow-hidden max-h-[70vh] max-w-[1100px] mx-auto"
          style={{ backgroundColor: '#020025', aspectRatio: '16/10' }}
        >
          <Image
            src="/lambda_website_mockup.jpg"
            alt="Lambda Tech Services Website Mockup"
            fill
            className="object-cover object-[50%_55%]"
            sizes="(max-width: 768px) 100vw, 1300px"
          />
        </motion.div>
      </ProjectSection>
    </ProjectLayout>
  );
}
