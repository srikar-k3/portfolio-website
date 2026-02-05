'use client';

import ProjectLayout, {
  ProjectSection,
  SectionTitle,
  SectionText,
} from '@/components/ProjectLayout';

export default function MonitorPad() {
  return (
    <ProjectLayout
      projectId="monitorpad"
      meta={{
        title: 'MonitorPad',
        subtitle: 'A wired iPadOS camera monitoring app designed to address the limitations of mobile monitoring across different camera ecosystems.',
        category: 'Mobile Design',
        year: '2024',
        roles: ['Product Design', 'UI Design', 'Prototyping', 'Systems Architecture', 'Swift Development'],
      }}
      // No hero image yet - will show gradient fallback
    >
      {/* Overview */}
      <ProjectSection>
        <SectionTitle>Overview</SectionTitle>
        <SectionText>
          <p>
            MonitorPad is a wired iPadOS camera monitoring app designed to address the limitations of mobile monitoring across different camera ecosystems. While some manufacturers, such as Sony, provide proprietary wired monitoring through tightly integrated camera firmware and companion apps, most camera brands do not expose similar onboard streaming capabilities.
          </p>
          <p>
            As a result, low-latency wired monitoring is not generally achievable on the iPhone using standard video inputs. MonitorPad fills this gap by providing professional-grade monitoring tools on iPad hardware.
          </p>
        </SectionText>
      </ProjectSection>

      {/* Visual Design */}
      <ProjectSection delay={0.1}>
        <SectionTitle>Visual Design</SectionTitle>
        <SectionText>
          <p>
            The interface is intentionally minimal and production-focused. The live video feed occupies the full screen, with overlays hidden by default and revealed only when needed. UI elements are lightweight and non-intrusive, ensuring that monitoring tools never obscure critical framing or focus details.
          </p>
          <p>
            Design decisions prioritize clarity, speed, and usability in real shooting environments over visual ornamentation. Every pixel is dedicated to the camera feed unless actively displaying a monitoring tool.
          </p>
        </SectionText>
      </ProjectSection>

      {/* Monitoring Tools */}
      <ProjectSection delay={0.15}>
        <SectionTitle>Professional Monitoring Tools</SectionTitle>
        <SectionText>
          <p>
            The app includes essential tools for professional video production: focus peaking highlights in-focus areas in real-time, zebras indicate exposure levels with customizable thresholds, and composition guides provide standard framing references.
          </p>
          <p>
            All tools are implemented as real-time GPU shaders, ensuring zero impact on monitoring latency while providing instant visual feedback during shoots.
          </p>
        </SectionText>
      </ProjectSection>

      {/* Technical Stack */}
      <ProjectSection delay={0.2}>
        <SectionTitle>Technical Stack</SectionTitle>
        <SectionText>
          <p>
            The app is built for iPadOS using Swift and SwiftUI for the core application structure and interface. AVFoundation manages external video capture and connected devices, handling the low-level communication with capture cards.
          </p>
          <p>
            Video frames are rendered with Metal and MetalKit, converting CVPixelBuffer data directly into GPU textures to keep latency minimal. Custom Metal shaders enable real-time monitoring tools such as focus peaking, zebras, and composition guides, while lightweight performance tracking ensures smooth high-FPS playback even with effects enabled.
          </p>
        </SectionText>
      </ProjectSection>
    </ProjectLayout>
  );
}
