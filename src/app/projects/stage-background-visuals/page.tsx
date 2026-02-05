'use client';

import ProjectLayout, {
  ProjectSection,
  SectionTitle,
  SectionText,
  Blockquote,
  ImageGrid,
} from '@/components/ProjectLayout';

export default function StageBackgroundVisuals() {
  return (
    <ProjectLayout
      projectId="stage-background-visuals"
      meta={{
        title: 'Stage Background Visuals',
        subtitle: 'Synchronized visuals designed to set the environment and complement choreography on stage, creating a story within a story through layered motion graphics.',
        category: 'Motion Graphics',
        year: '2024-2025',
        client: 'RU SAPA',
        roles: ['Digital Design', 'Visual Design', 'Video Production', 'Motion Graphics'],
      }}
      heroImage="/sapa_motion_hero.jpg"
      heroAlt="Stage Background Visuals Hero"
    >
      {/* Overview */}
      <ProjectSection>
        <SectionTitle>Overview</SectionTitle>
        <SectionText>
          <p>
            RU SAPA is the first Bollywood collegiate dance team in the United States, founded in 1999. My role was to design and produce visuals that set the environment while complementing the choreography on stage.
          </p>
          <p>
            Each segment was crafted to respond to lighting cues and dance styles, creating a story within a story. The synchronized visuals played behind live performances, built through layered custom assets and motion graphics to amplify both the atmosphere and the energy of the piece.
          </p>
        </SectionText>
      </ProjectSection>

  {/* Background Video 2025 */}
  <ProjectSection delay={0.1}>
    <SectionTitle>Background Video 2025</SectionTitle>
        <SectionText>
          <p>
            Rather than placing effects in simple sequences as many teams do, I layered them onto a base image or video to create distinct environments for each segment. This approach allowed the visuals to respond to the dancers&apos; movements and support the narrative more intentionally, maintaining audience immersion throughout the performance.
          </p>
        </SectionText>
  </ProjectSection>

  <ProjectSection delay={0.15}>
    <ImageGrid
      images={[
        { src: '/Export_Varun-20250419143334.jpg', alt: 'Background Visual Frame 1' },
        { src: '/Export_Varun-20250419143833.jpg', alt: 'Background Visual Frame 2' },
      ]}
      columns={2}
      aspectRatio="4/3"
    />
  </ProjectSection>

      <Blockquote
        quote="Great production with the video, really high quality. It adds to your impact in every segment."
        author="Harji Charaia"
        role="Legends 2025 Judge"
      />

      {/* Background Video 2024 */}
  <ProjectSection delay={0.25}>
    <SectionTitle>Background Video 2024</SectionTitle>
        <SectionText>
          <p>
            For the 2024 season, I created visuals that complemented the Willy Wonka theme with whimsical yet slightly unsettling environments. One segment was so visually distinctive that others referred to it as &ldquo;the flower segment&rdquo; rather than by its dance style—a testament to how effectively the background visuals defined the performance&apos;s identity.
          </p>
        </SectionText>
      </ProjectSection>
    </ProjectLayout>
  );
}
