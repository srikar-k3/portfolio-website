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
  const router = useRouter();

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        const currentScrollY = window.scrollY;
        
        // Always show at the top of the page or if navigating
        const isHashNavigating = window.sessionStorage.getItem('navigatingToSection') === 'true';
        if (currentScrollY < 100 || isNavigating || isHashNavigating) {
          setIsVisible(true);
        } else if (currentScrollY > lastScrollY + 5) {
          // Scrolling down (with threshold)
          setIsVisible(false);
        } else if (currentScrollY < lastScrollY - 5) {
          // Scrolling up (requires scroll up to appear)
          setIsVisible(true);
        }
        
        // Clear navigation flag after scroll settles
        if (isNavigating && Math.abs(currentScrollY - lastScrollY) < 5) {
          setTimeout(() => setIsNavigating(false), 1000);
        }
        
        setLastScrollY(currentScrollY);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar);
      
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
        className="py-6 rounded-xl shadow-lg relative overflow-hidden"
        style={{
          background: 'rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(15px)',
          border: '1px solid rgba(255, 255, 255, 0.15)'
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
          <div className="flex items-center pl-6 md:pl-8">
            <div className="flex space-x-8">
            <Link 
              href="/" 
              className="text-white hover:text-gray-300 transition-colors duration-200 font-medium relative group"
            >
              <span className="absolute inset-0 bg-gradient-radial from-white/15 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-full"></span>
              <span className="relative">Home</span>
            </Link>
            <button 
              className="text-white hover:text-gray-300 transition-colors duration-200 font-medium relative group cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                setIsNavigating(true);
                const element = document.getElementById('projects');
                if (element) {
                  // If on home page, scroll to projects
                  const navHeight = 80; // Account for nav and padding
                  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                  const offsetPosition = elementPosition - navHeight;
                  
                  window.scrollTo({
                    top: offsetPosition,
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
            <Link 
              href="/about" 
              className="text-white hover:text-gray-300 transition-colors duration-200 font-medium relative group"
            >
              <span className="absolute inset-0 bg-gradient-radial from-white/15 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-full"></span>
              <span className="relative">About</span>
            </Link>
            <button 
              className="text-white hover:text-gray-300 transition-colors duration-200 font-medium relative group cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                setIsNavigating(true);
                const element = document.getElementById('contact');
                if (element) {
                  // If on home page, scroll to contact
                  const navHeight = 80; // Account for nav and padding
                  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                  const offsetPosition = elementPosition - navHeight;
                  
                  window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                  });
                } else {
                  // If not on home page, navigate to home page with contact anchor
                  window.sessionStorage.setItem('navigatingToSection', 'true');
                  router.push('/#contact');
                }
              }}
            >
              <span className="absolute inset-0 bg-gradient-radial from-white/15 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-full"></span>
              <span className="relative">Contact</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
    </div>
  );
}