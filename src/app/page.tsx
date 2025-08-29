'use client';

import Navigation from '@/components/Navigation';
import BusinessCard from '@/components/BusinessCard';
import AboutSection from '@/components/AboutSection';
import ProjectsSection from '@/components/ProjectsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    // Handle scroll to sections when coming from other pages
    const hash = window.location.hash;
    if (hash === '#projects' || hash === '#contact') {
      setTimeout(() => {
        const element = document.getElementById(hash.substring(1));
        if (element) {
          const navHeight = 90; // Slightly larger offset
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - navHeight;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 300); // Longer delay to wait for animations
    }
  }, []);
  return (
    <div className="min-h-screen bg-white text-black">
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
