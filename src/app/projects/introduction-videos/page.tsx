'use client';

import { motion } from 'framer-motion';
import ProjectLayout, {
  ProjectSection,
  SectionTitle,
  SectionText,
} from '@/components/ProjectLayout';

export default function IntroductionVideos() {
  return (
    <ProjectLayout
      projectId="introduction-videos"
      meta={{
        title: 'Introduction Videos',
        subtitle: 'Cinematic opening sequences that give audiences the exposition they need to understand upcoming performances, setting the season\'s theme and energy on stage.',
        category: 'Video Production',
        year: '2024-2025',
        client: 'RU SAPA',
        roles: ['Director', 'Scriptwriter', 'Producer', 'Editor', 'Director of Photography'],
      }}
      // No hero image yet - will show gradient fallback
    >
      {/* Overview */}
      <ProjectSection>
        <SectionTitle>Overview</SectionTitle>
        <SectionText>
          <p>
            RU SAPA is the first Bollywood collegiate dance team in the United States, founded in 1999. My role was to direct and film cinematic introduction videos that give the audience the exposition they need to understand the upcoming performance.
          </p>
          <p>
            Working closely with performers and creative leads, I contributed heavily to the storyboarding and production process, ensuring every intro set the season&apos;s theme and energy on stage.
          </p>
        </SectionText>
  </ProjectSection>

  {/* Introduction Video 2025 */}
  <ProjectSection delay={0.1}>
    <SectionTitle>Introduction Video 2025</SectionTitle>
        <SectionText>
          <p>
            SAPA&apos;s 2025 theme was Mad Max: Fury Road. We wanted to blend our filmed scenes with footage from the movie to create a cohesive visual style and show how our characters translated to the stage. This helped ensure the audience could easily understand our interpretation without confusing it with the film&apos;s versions.
          </p>
          <p>
            I storyboarded where each movie clip would appear and what context needed to be conveyed so the audience could follow the narrative. Because of time constraints, we initially handed the edit to an outside editor while I focused on other parts of the set. When we qualified for the final national competition of the season, I took over the project and completed the final edit that was shown on stage.
          </p>
    </SectionText>
  </ProjectSection>

  {/* Intro Video Clip (from Rutgers SAPA) */}
  <ProjectSection delay={0.2}>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-xl md:rounded-2xl overflow-hidden max-h-[80vh] max-w-[1100px] mx-auto"
    >
      <video
        muted
        playsInline
        controls
        preload="auto"
        className="block w-full h-full object-contain focus:outline-none"
      >
        <source src="/sapaIntroVideo_p.mp4" type="video/mp4" />
      </video>
    </motion.div>
  </ProjectSection>

  {/* Introduction Video 2024 */}
  <ProjectSection delay={0.15}>
        <SectionTitle>Introduction Video 2024</SectionTitle>
        <SectionText>
          <p>
            SAPA&apos;s 2024 theme was Willy Wonka and Chocolate Factory. Given that the final twist of the set was a dark ending in which Willy Wonka was turning kids into oompa loompas to be slaves at the factory, we wanted to introduce the set in a mysterious crime setting.
          </p>
          <p>
            This involved an interrogation following Willy Wonka as he described each of the kids in the latest kidnapping. The contrast between the whimsical source material and our dark interpretation required careful visual storytelling to set the right tone from the opening frame.
          </p>
        </SectionText>
      </ProjectSection>
    </ProjectLayout>
  );
}
