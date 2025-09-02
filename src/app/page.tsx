'use client';

import Navigation from '@/components/Navigation';
import BusinessCard from '@/components/BusinessCard';
import AboutSection from '@/components/AboutSection';
import ProjectsSection from '@/components/ProjectsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import { useEffect, useState } from 'react';

export default function Home() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isOverBusinessCard, setIsOverBusinessCard] = useState(false);
  const [isOverProject, setIsOverProject] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      
      // Check if mouse is over business card area
      const businessCardElement = document.querySelector('[data-business-card]');
      if (businessCardElement) {
        const rect = businessCardElement.getBoundingClientRect();
        const isOver = e.clientX >= rect.left && e.clientX <= rect.right && 
                      e.clientY >= rect.top && e.clientY <= rect.bottom;
        setIsOverBusinessCard(isOver);
      }
      
      // Check if mouse is over any project
      const projectElements = document.querySelectorAll('[data-project-item]');
      let overProject = false;
      projectElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        if (e.clientX >= rect.left && e.clientX <= rect.right && 
            e.clientY >= rect.top && e.clientY <= rect.bottom) {
          overProject = true;
        }
      });
      setIsOverProject(overProject);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    // Handle scroll to sections when coming from other pages
    const hash = window.location.hash;
    if (hash === '#projects' || hash === '#contact') {
      // Immediate scroll without animation to prevent flash
      const element = document.getElementById(hash.substring(1));
      if (element) {
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const navbarHeight = document.querySelector('nav')?.getBoundingClientRect().height || 100;
        
        window.scrollTo({
          top: elementPosition + navbarHeight,
          behavior: 'instant'
        });
      }
      
      // Clear navigation flag after settling
      setTimeout(() => {
        window.sessionStorage.removeItem('navigatingToSection');
      }, 1000);
    }
  }, []);
  return (
    <div className="min-h-screen text-white relative w-full" style={{background: 'linear-gradient(135deg, #000000 0%, #0d0d0d 50%, #000000 100%)'}}>
      {/* Subtle noise overlay */}
      <div className="absolute inset-0 opacity-[0.08] pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='5.0' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
      }}></div>
      
      {/* Global mouse glow effect - behind all content */}
      <div
        className="fixed pointer-events-none z-0 transition-opacity duration-300"
        style={{
          left: mousePos.x - 75,
          top: mousePos.y - 75,
          width: 150,
          height: 150,
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.02) 30%, transparent 60%)',
          borderRadius: '50%',
          filter: 'blur(30px)',
          opacity: (isOverBusinessCard || isOverProject) ? 0 : 1,
        }}
      />
      {/* Navigation */}
      <Navigation />
      
      <main className="px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          {/* Floating Business Card */}
          <BusinessCard />
          
          {/* About Section */}
          <AboutSection />
          
          {/* Projects Section */}
          <ProjectsSection />
          
          {/* Contact Section */}
          <ContactSection />
        </div>
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
