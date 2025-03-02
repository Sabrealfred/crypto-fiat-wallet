
import React, { ReactNode, useEffect } from 'react';
import { LandingNavigation } from './LandingNavigation';
import { LandingFooter } from './LandingFooter';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

interface LandingLayoutProps {
  children: ReactNode;
}

export const LandingLayout: React.FC<LandingLayoutProps> = ({ children }) => {
  // Set dark mode and smooth scrolling for the landing page
  useEffect(() => {
    document.documentElement.classList.add('dark');
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Add custom cursor effect
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    const moveCursor = (e: MouseEvent) => {
      cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    };
    
    document.addEventListener('mousemove', moveCursor);
    
    return () => {
      document.documentElement.classList.remove('dark');
      document.documentElement.style.scrollBehavior = '';
      document.removeEventListener('mousemove', moveCursor);
      document.body.removeChild(cursor);
    };
  }, []);

  return (
    <LanguageProvider>
      <div className="min-h-screen transition-all duration-500 ease-out">
        {/* Animated background elements */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#080B14] via-[#0F1524] to-[#15192A] animate-gradient"></div>
          
          {/* Animated orbs */}
          <div className="absolute top-1/4 -left-20 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl animate-pulse animation-delay-200"></div>
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl animate-pulse animation-delay-300"></div>
          
          {/* Grid pattern overlay */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"></path>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-pattern)"></rect>
          </svg>
          
          {/* Animated particles */}
          <div className="particles-container">
            {Array.from({ length: 20 }).map((_, i) => (
              <div 
                key={i} 
                className="particle" 
                style={{
                  '--x': `${Math.random() * 100}%`,
                  '--y': `${Math.random() * 100}%`,
                  '--duration': `${5 + Math.random() * 10}s`,
                  '--delay': `${Math.random() * 5}s`,
                  '--size': `${Math.random() * 2 + 0.5}px`,
                  '--opacity': `${Math.random() * 0.5 + 0.25}`,
                } as React.CSSProperties}
              ></div>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-10"
          >
            <LandingNavigation />
            <main className="pt-20 overflow-hidden">
              {children}
            </main>
            <LandingFooter />
            
            {/* Custom cursor */}
            <div className="custom-cursor"></div>
          </motion.div>
        </AnimatePresence>
      </div>
    </LanguageProvider>
  );
};
