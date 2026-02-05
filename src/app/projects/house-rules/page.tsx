'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import ProjectLayout, {
  ProjectSection,
  SectionTitle,
  SectionText,
  ProjectImage,
} from '@/components/ProjectLayout';
import { motion } from 'framer-motion';

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1];

export default function HouseRules() {
  const [imgSwap, setImgSwap] = useState(false);

  // Swap image variants (light/dark) every 5 seconds
  useEffect(() => {
    const id = window.setInterval(() => setImgSwap((v) => !v), 5000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <ProjectLayout
      projectId="house-rules"
      meta={{
        title: 'House Rules',
        subtitle: 'An iOS app that transforms roommate agreements into a living system with clear rules, flexible chore management, and transparent accountability.',
        category: 'Mobile Design',
        year: '2024',
        roles: ['Product Design', 'UI Design', 'Prototyping', 'SwiftUI Development', 'Firebase'],
      }}
      heroImage="/house_rules_hero_section_V2.png"
      heroAlt="House Rules App Hero Section"
    >
      {/* Overview */}
      <ProjectSection>
        <SectionTitle>Overview</SectionTitle>
        <SectionText>
          <p>
            House Rules is an iOS app designed to reduce friction in shared living spaces. The app turns informal roommate agreements into a structured, transparent system where everyone understands and can track their responsibilities.
          </p>
          <p>
            I designed and built the app end-to-end, shaping both its user experience and technical architecture. The goal was to create something that felt effortless to use while solving a genuinely frustrating problem that most roommates face.
          </p>
        </SectionText>
      </ProjectSection>

      {/* Visual Design */}
      <ProjectSection delay={0.1}>
        <SectionTitle>Visual Design</SectionTitle>
        <SectionText>
          <p>
            Using Apple&apos;s Icon Composer, the app icon was designed around the idea of structured lists and rules, represented through clean linework integrated into the silhouette of a house. The iconography maintains clarity at all sizes while establishing immediate brand recognition.
          </p>
        </SectionText>
      </ProjectSection>

      {/* Icon Guidelines & Mockup Grid */}
      <ProjectSection delay={0.15}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-[1100px] mx-auto">
          {/* Icon Guidelines - with swap animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
            className="relative aspect-[4/3] max-h-[50vh] rounded-xl md:rounded-2xl overflow-hidden bg-white/[0.02] border border-white/10"
          >
            <Image
              src="/house_rules_icon_guideline.png"
              alt="House Rules App Icon Guidelines"
              fill
              className={`object-cover transition-opacity duration-700 ${imgSwap ? 'opacity-0' : 'opacity-100'}`}
            />
            <Image
              src="/house_rules_icon_guidelines_dark.png"
              alt="House Rules App Icon Guidelines (Dark)"
              fill
              className={`object-cover transition-opacity duration-700 ${imgSwap ? 'opacity-100' : 'opacity-0'}`}
            />
          </motion.div>

          {/* App Icon Mockup - with swap animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE_OUT_EXPO }}
            className="relative aspect-[4/3] max-h-[50vh] rounded-xl md:rounded-2xl overflow-hidden bg-white/[0.02] border border-white/10"
          >
            <Image
              src="/house_rules_app_icon_mockup.png"
              alt="House Rules App Icon Mockup"
              fill
              className={`object-cover transition-opacity duration-700 ${imgSwap ? 'opacity-0' : 'opacity-100'}`}
            />
            <Image
              src="/house_rules_icon_mockup_dark.png"
              alt="House Rules App Icon Mockup (Dark)"
              fill
              className={`object-cover transition-opacity duration-700 ${imgSwap ? 'opacity-100' : 'opacity-0'}`}
            />
          </motion.div>
        </div>
      </ProjectSection>

      {/* Key Features */}
      <ProjectSection delay={0.2}>
        <SectionTitle>Flexible Chore Management</SectionTitle>
        <SectionText>
          <p>
            The chore system was designed with real-world flexibility in mind. Users can bump overdue chores to extend deadlines by 24 hours, pass chores when unavailable for others to pick up, and automatically open past-due chores to all housemates for completion.
          </p>
          <p>
            This approach acknowledges that life happens—schedules change, priorities shift—while still maintaining accountability within the household.
          </p>
        </SectionText>
      </ProjectSection>

      <ProjectSection delay={0.25}>
        <SectionTitle>Rule Change Approval</SectionTitle>
        <SectionText>
          <p>
            Any modifications to house rules require consensus from all housemates before becoming permanent. This democratic approach ensures everyone stays on the same page and prevents unilateral changes that could cause friction.
          </p>
          <p>
            The approval flow is designed to be lightweight—a simple notification and one-tap response—so it doesn&apos;t become a bottleneck for minor updates.
          </p>
        </SectionText>
      </ProjectSection>

      {/* Features Screenshot */}
      <ProjectSection delay={0.3}>
        <ProjectImage
          src="/house_rules_features_screens.png"
          alt="House Rules Key Features Screens"
          aspectRatio="21/9"
        />
      </ProjectSection>

      {/* Technical Stack */}
      <ProjectSection delay={0.35}>
        <SectionTitle>Technical Stack</SectionTitle>
        <SectionText>
          <p>
            The app&apos;s frontend is built entirely in Swift and SwiftUI, delivering a smooth and fully native iOS experience. The declarative UI framework allowed for rapid iteration on interface details while maintaining performance.
          </p>
          <p>
            On the backend, Firebase handles authentication, real-time synchronization, and storage. The overall architecture follows an MVVM-inspired pattern, using observable view models and Cloud Functions to keep the system modular and responsive. Real-time listeners ensure that changes propagate instantly across all connected devices.
          </p>
        </SectionText>
      </ProjectSection>
    </ProjectLayout>
  );
}
