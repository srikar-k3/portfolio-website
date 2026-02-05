'use client';

import ProjectLayout, {
  ProjectSection,
  SectionTitle,
  SectionText,
} from '@/components/ProjectLayout';

export default function YouTubeChapterGenerator() {
  return (
    <ProjectLayout
      projectId="youtube-chapter-generator"
      meta={{
        title: 'YouTube Chapter Generator',
        subtitle: 'A creator-first tool that transforms raw speech into accurate, audience-friendly YouTube chapters using AI-powered transcription and analysis.',
        category: 'Web Design',
        year: '2024',
        roles: ['Product Design', 'UI Design', 'Prototyping', 'Full Stack Development'],
      }}
      heroImage="/yt_hero.png"
      heroAlt="YouTube Chapter Generator Hero"
    >
      {/* Overview */}
      <ProjectSection>
        <SectionTitle>Overview</SectionTitle>
        <SectionText>
          <p>
            This is a creator-first tool that transforms raw speech into accurate, audience-friendly YouTube chapters. I designed and built the product end-to-end, combining multi-language transcription, AI-driven analysis, and human-in-the-loop editing to ensure the final structure reflects the creator&apos;s intent.
          </p>
          <p>
            The project is open-source on GitHub, allowing users to integrate their own ASR systems for transcription and use their preferred LLM for chapter generation. This flexibility ensures the tool can adapt to different workflows and technical requirements.
          </p>
        </SectionText>
      </ProjectSection>

      {/* Multi-language Audio Input */}
      <ProjectSection delay={0.1}>
        <SectionTitle>Multi-language Audio Input</SectionTitle>
        <SectionText>
          <p>
            Speech in any supported language is automatically detected and converted into text through intelligent processing. This allows creators to work seamlessly across multilingual content without manual language selection or pre-processing.
          </p>
          <p>
            The system handles accents, mixed-language content, and varying audio quality gracefully, producing reliable transcriptions that serve as the foundation for accurate chapter generation.
          </p>
        </SectionText>
      </ProjectSection>

      {/* AI-Powered Chapter Generation */}
      <ProjectSection delay={0.15}>
        <SectionTitle>AI-Powered Chapter Generation</SectionTitle>
        <SectionText>
          <p>
            Gemini analyzes the recording to identify natural breakpoints, topic shifts, and narrative flow. The result is chapter markers that are both meaningful and clearly titled—going beyond simple timestamp detection to understand the actual content structure.
          </p>
          <p>
            The AI considers context, pacing, and viewer expectations to produce chapters that enhance discoverability while respecting the creator&apos;s narrative intent.
          </p>
        </SectionText>
      </ProjectSection>

      {/* Human-in-the-loop Editing */}
      <ProjectSection delay={0.2}>
        <SectionTitle>Human-in-the-loop Transcript Editing</SectionTitle>
        <SectionText>
          <p>
            Users can review and refine the AI-generated transcript through an interactive editor before chapters are finalized. This ensures the highest level of accuracy and allows creators to correct any transcription errors or adjust chapter boundaries.
          </p>
          <p>
            The interface is designed for speed—keyboard shortcuts, inline editing, and real-time preview make refinement feel natural rather than tedious.
          </p>
        </SectionText>
      </ProjectSection>

      {/* Technical Stack */}
      <ProjectSection delay={0.25}>
        <SectionTitle>Technical Stack</SectionTitle>
        <SectionText>
          <p>
            The frontend is built with React and modern JavaScript, creating a responsive interface designed for clean, efficient creator workflows. Component architecture prioritizes reusability and maintains consistent interaction patterns throughout the experience.
          </p>
          <p>
            On the backend, Express integrates with AWS Transcribe to provide reliable, high-quality speech-to-text processing. Gemini AI powers the analytical layer, generating structured chapter output that can be easily exported and used across platforms.
          </p>
        </SectionText>
      </ProjectSection>
    </ProjectLayout>
  );
}
