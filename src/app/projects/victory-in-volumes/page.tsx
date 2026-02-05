'use client';

import { motion } from 'framer-motion';
import ProjectLayout, {
  ProjectSection,
  SectionTitle,
  SectionText,
  ProjectImage,
} from '@/components/ProjectLayout';

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export default function VictoryInVolumes() {
  const colors = [
    { hex: '#610924', label: 'Deep Maroon' },
    { hex: '#d89ea3', label: 'Dusty Rose' },
    { hex: '#f2d17d', label: 'Warm Gold' },
    { hex: '#f5f1ed', label: 'Cream' },
    { hex: '#061c23', label: 'Deep Teal' },
  ];

  return (
    <ProjectLayout
      projectId="victory-in-volumes"
      meta={{
        title: 'Victory In Volumes',
        subtitle: 'Brand identity and website for a nonprofit bringing communities together in support of women\'s health and well-being.',
        category: 'Branding',
        year: '2024',
        client: 'Victory In Volumes',
        roles: ['Digital Design', 'Logo Design', 'Brand Identity', 'UI Design', 'Full Stack Development'],
      }}
      heroImage="/victory_totebag_mockup.png"
      heroAlt="Victory In Volumes Tote Bag Mockup"
    >
      {/* Overview */}
      <ProjectSection>
        <SectionTitle>Overview</SectionTitle>
        <SectionText>
          <p>
            Victory in Volumes is a non-profit that exists to bring communities together in support of women&apos;s health and well-being. I led the organization&apos;s brand identity from start to finish, developing the logo, color palette, and an overall visual system used across all platforms.
          </p>
          <p>
            I also built a website to increase engagement, drive donations, and enable users to sign up for events where proceeds support a selected cause.
          </p>
        </SectionText>
      </ProjectSection>

      {/* Logo Design */}
      <ProjectSection delay={0.1}>
        <SectionTitle>Logo Design</SectionTitle>
        <SectionText>
          <p>
            The outer silhouette blends a leaf and a flame, bringing together healing and growth with a sense of energy and action. Inside, a central stem branches outward like veins to represent collective voices spreading through the community and turning awareness into real impact.
          </p>
          <p>
            Warm gold set against deep maroon adds both strength and warmth, reinforcing a supportive presence that aligns with Victory in Volumes&apos; mission to advance women&apos;s health and well-being.
          </p>
        </SectionText>
      </ProjectSection>

      {/* Logo Placeholder */}
      <ProjectSection delay={0.15}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
          className="relative rounded-xl md:rounded-2xl overflow-hidden bg-white/[0.02] border border-white/10 max-h-[70vh] max-w-[1100px] mx-auto"
          style={{ aspectRatio: '16/9' }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white/20 text-sm">Logo coming soon</span>
          </div>
        </motion.div>
      </ProjectSection>

      {/* Color Palette (match Lambda layout) */}
      <ProjectSection delay={0.2}>
        <SectionTitle>Color Palette</SectionTitle>
        <SectionText className="mb-8">
          <p>
            The palette balances warmth and professionalism, with deep maroon conveying strength and gold representing hope. Neutral cream and teal provide flexibility across digital and print applications.
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
            {colors.map((c) => {
              const isLight = c.hex.toLowerCase() === '#f2d17d' || c.hex.toLowerCase() === '#f5f1ed';
              return (
                <div
                  key={c.hex}
                  className={`flex-1 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 group-hover:opacity-50 hover:!opacity-100 ${
                    isLight ? '' : 'text-white'
                  }`}
                  style={{ backgroundColor: c.hex, color: isLight ? '#061c23' : undefined }}
                >
                  <div className="text-sm md:text-lg font-medium">{c.hex}</div>
                  <div className="text-xs md:text-sm opacity-80 mt-1">{c.label}</div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </ProjectSection>

      {/* Website Design */}
      <ProjectSection delay={0.25} id="website-design">
        <SectionTitle>Website Design</SectionTitle>
        <SectionText>
          <p>
            The website is designed to be simple and easy to navigate, making it effortless for visitors to donate, stay up to date on upcoming events, and subscribe to the newsletter.
          </p>
          <p>
            Consistent with the Victory in Volumes color palette, it introduces the organization&apos;s mission clearly and guides users toward meaningful calls to action that support the cause.
          </p>
        </SectionText>
      </ProjectSection>

      {/* Website Mockup */}
      <ProjectSection delay={0.3}>
        <ProjectImage
          src="/viv_website_mockup.png"
          alt="Victory In Volumes Website Mockup"
          aspectRatio="16/9"
          fit="contain"
          bgColor="#f5f1ed"
        />
      </ProjectSection>
    </ProjectLayout>
  );
}
