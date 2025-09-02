'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface NavigationProps {
  className?: string;
}

export default function Navigation({ className = '' }: NavigationProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isNavigating, setIsNavigating] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isOverLightBackground, setIsOverLightBackground] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        const currentScrollY = window.scrollY;
        
        // Check if nav is over light background (pages with light hero sections)
        const path = window.location.pathname;
        const isYouTubePage = path.includes('/youtube-chapter-generator');
        const isSapaPage = path.includes('/rutgers-sapa');
        const hasLightHero = isYouTubePage || isSapaPage;
        
        if (hasLightHero) {
          // Hero section is exactly h-screen (100vh)
          // Dark section starts right after the hero ends
          const heroSectionHeight = window.innerHeight;
          const isOverHero = currentScrollY < heroSectionHeight - 100; // Small buffer for smooth transition
          setIsOverLightBackground(isOverHero);
        } else {
          setIsOverLightBackground(false);
        }
        
        // Always show at the top of the page or if navigating
        const isHashNavigating = window.sessionStorage.getItem('navigatingToSection') === 'true';
        if (currentScrollY < 100 || isNavigating || isHashNavigating) {
          setIsVisible(true);
        } else if (!isNavigating && currentScrollY > lastScrollY + 10) {
          // Only hide if NOT navigating and scrolling down significantly
          setIsVisible(false);
        } else if (currentScrollY < lastScrollY - 5) {
          // Scrolling up (requires scroll up to appear)
          setIsVisible(true);
        }
        
        setLastScrollY(currentScrollY);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar);
      controlNavbar(); // Check initial state
      
      return () => {
        window.removeEventListener('scroll', controlNavbar);
      };
    }
  }, [lastScrollY]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleNavigation = () => {
    setIsNavigating(true);
    setIsVisible(true); // Force navbar to be visible
    // Keep navbar visible longer during navigation
    setTimeout(() => {
      setIsNavigating(false);
    }, 2000);
  };

  return (
    <div 
      className={`w-full fixed top-0 z-50 p-4 transition-transform duration-500 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      } ${className}`}
      style={{
        transitionTimingFunction: isVisible ? 'cubic-bezier(0.68, -0.55, 0.265, 1.55)' : 'ease-out'
      }}
    >
      <nav 
        className="py-6 rounded-xl shadow-lg relative overflow-hidden transition-all duration-500"
        style={{
          background: isOverLightBackground ? 'rgba(0, 0, 0, 0.07)' : 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(12px)',
          border: isOverLightBackground ? '1px solid rgba(0, 0, 0, 0.1)' : '1px solid rgba(255, 255, 255, 0.15)'
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Light glow effect */}
        <div
          className="absolute pointer-events-none transition-opacity duration-300"
          style={{
            left: mousePos.x - 75,
            top: mousePos.y - 75,
            width: 150,
            height: 150,
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.02) 30%, transparent 60%)',
            borderRadius: '50%',
            opacity: isHovering ? 1 : 0,
            filter: 'blur(30px)',
          }}
        />
        <div className="w-full">
          <div className="flex items-center justify-between pl-6 md:pl-8 pr-6 md:pr-8">
            {/* Logo on left */}
            <Link 
              href="/" 
              className={`${isOverLightBackground ? 'text-black hover:text-gray-700' : 'text-white hover:text-gray-300'} transition-colors duration-500 font-bold text-xl relative group`}
              onClick={handleNavigation}
            >
              <span className="absolute inset-0 bg-gradient-radial from-white/15 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-full"></span>
              <span className="relative">srkr.</span>
            </Link>
            
            {/* Nav items on right */}
            <div className="flex items-center space-x-8">
              <Link 
                href="/about" 
                className={`${isOverLightBackground ? 'text-black hover:text-gray-700' : 'text-white hover:text-gray-300'} transition-colors duration-500 font-medium relative group font-sans uppercase`}
                onClick={handleNavigation}
              >
                <span className="absolute inset-0 bg-gradient-radial from-white/15 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-full"></span>
                <span className="relative">About</span>
              </Link>
              <button 
                className={`${isOverLightBackground ? 'text-black hover:text-gray-700' : 'text-white hover:text-gray-300'} transition-colors duration-500 font-medium relative group cursor-pointer font-sans uppercase`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation();
                  const element = document.getElementById('projects');
                  if (element) {
                    // If on home page, scroll to projects
                    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                    const navbarHeight = document.querySelector('nav')?.getBoundingClientRect().height || 100;
                    
                    window.scrollTo({
                      top: elementPosition + navbarHeight,
                      behavior: 'smooth'
                    });
                  } else {
                    // If not on home page, navigate to home page with projects anchor
                    window.sessionStorage.setItem('navigatingToSection', 'true');
                    router.push('/#projects');
                  }
                }}
              >
                <span className="absolute inset-0 bg-gradient-radial from-white/15 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-full"></span>
                <span className="relative">Projects</span>
              </button>
              <button 
                className="bg-white text-black font-medium px-3 py-1 rounded-md hover:bg-gray-100 transition-colors duration-300 cursor-pointer font-sans uppercase"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation();
                  const element = document.getElementById('contact');
                  if (element) {
                    // If on home page, scroll to contact
                    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                    const navbarHeight = document.querySelector('nav')?.getBoundingClientRect().height || 100;
                    
                    window.scrollTo({
                      top: elementPosition + navbarHeight,
                      behavior: 'smooth'
                    });
                  } else {
                    // If not on home page, navigate to home page with contact anchor
                    window.sessionStorage.setItem('navigatingToSection', 'true');
                    router.push('/#contact');
                  }
                }}
              >
                Contact
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}