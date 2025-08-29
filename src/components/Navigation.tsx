'use client';

interface NavigationProps {
  className?: string;
}

export default function Navigation({ className = '' }: NavigationProps) {
  return (
    <nav className={`w-full py-6 sticky top-0 backdrop-blur-md bg-white/80 z-50 ${className}`}>
      <div className="w-full">
        <div className="flex items-center pl-6 md:pl-8">
          <div className="flex space-x-8">
            <a 
              href="/" 
              className="text-black hover:text-gray-600 transition-colors duration-200 font-medium"
            >
              Home
            </a>
            <a 
              href="/#projects" 
              className="text-black hover:text-gray-600 transition-colors duration-200 font-medium"
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById('projects');
                if (element) {
                  // If on home page, scroll to projects
                  const navHeight = 80; // Approximate nav bar height
                  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                  const offsetPosition = elementPosition - navHeight;
                  
                  window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                  });
                } else {
                  // If not on home page, navigate to home page with projects anchor
                  window.location.href = '/#projects';
                }
              }}
            >
              Projects
            </a>
            <a 
              href="/about" 
              className="text-black hover:text-gray-600 transition-colors duration-200 font-medium"
            >
              About
            </a>
            <a 
              href="/#contact" 
              className="text-black hover:text-gray-600 transition-colors duration-200 font-medium"
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById('contact');
                if (element) {
                  // If on home page, scroll to contact
                  const navHeight = 80; // Approximate nav bar height
                  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                  const offsetPosition = elementPosition - navHeight;
                  
                  window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                  });
                } else {
                  // If not on home page, navigate to home page with contact anchor
                  window.location.href = '/#contact';
                }
              }}
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}