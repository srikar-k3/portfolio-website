'use client';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/10 bg-black">
      {/* Subtle gradient line at top */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 py-4 md:py-5">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Left side - Name and copyright */}
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
            <span className="text-white font-medium text-base md:text-lg tracking-tight">
              Srikar Kandulapati
            </span>
            <span className="hidden md:block text-white/30">·</span>
            <span className="text-white/50 text-sm">
              © {currentYear} All rights reserved
            </span>
          </div>

          {/* Right side - Social links */}
          <div className="flex items-center gap-3">
            <a
              href="https://www.linkedin.com/in/srikar-kandulapati-7b152a222/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-200"
              aria-label="Connect on LinkedIn"
            >
              <svg className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-200 group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>

            {/* Email link */}
            <a
              href="mailto:hello@srikar.dev"
              className="group flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-200"
              aria-label="Send email"
            >
              <svg className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-200 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
