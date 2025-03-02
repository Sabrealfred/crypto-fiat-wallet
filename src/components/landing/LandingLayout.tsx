
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
    
    const magnifyCursor = (e: MouseEvent) => {
      if ((e.target as Element).closest('a, button') || 
          (e.target as Element).tagName === 'A' || 
          (e.target as Element).tagName === 'BUTTON') {
        cursor.classList.add('cursor-active');
      } else {
        cursor.classList.remove('cursor-active');
      }
    };
    
    document.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseover', magnifyCursor);
    
    // Add 3D tilt effect to special elements
    const tiltElements = document.querySelectorAll('.tilt-effect');
    
    const handleTilt = (e: MouseEvent, element: Element) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const deltaX = (x - centerX) / centerX;
      const deltaY = (y - centerY) / centerY;
      
      const transform = `perspective(1000px) rotateX(${deltaY * -5}deg) rotateY(${deltaX * 5}deg) scale3d(1.02, 1.02, 1.02)`;
      element.setAttribute('style', `transform: ${transform}`);
    };
    
    const resetTilt = (element: Element) => {
      element.setAttribute('style', 'transform: perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)');
    };
    
    tiltElements.forEach(element => {
      element.addEventListener('mousemove', (e) => handleTilt(e, element));
      element.addEventListener('mouseleave', () => resetTilt(element));
    });
    
    return () => {
      document.documentElement.classList.remove('dark');
      document.documentElement.style.scrollBehavior = '';
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', magnifyCursor);
      
      tiltElements.forEach(element => {
        element.removeEventListener('mousemove', (e) => handleTilt(e, element));
        element.removeEventListener('mouseleave', () => resetTilt(element));
      });
      
      if (document.body.contains(cursor)) {
        document.body.removeChild(cursor);
      }
    };
  }, []);

  return (
    <LanguageProvider>
      <div className="min-h-screen transition-all duration-500 ease-out">
        {/* Enhanced animated background elements */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          {/* Gradient background with enhanced animation */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#080B14] via-[#0F1524] to-[#15192A] animate-gradient"></div>
          
          {/* 3D depth animated orbs with glow effect */}
          <div className="absolute top-1/4 -left-20 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl animate-pulse animation-delay-200"></div>
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl animate-pulse animation-delay-300"></div>
          
          {/* Enhanced grid pattern overlay with subtle animation */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"></path>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-pattern)">
              <animate attributeName="opacity" values="0.03;0.05;0.03" dur="10s" repeatCount="indefinite" />
            </rect>
          </svg>
          
          {/* Enhanced animated particles with improved movement */}
          <div className="particles-container">
            {Array.from({ length: 30 }).map((_, i) => (
              <div 
                key={i} 
                className="particle" 
                style={{
                  '--x': `${Math.random() * 100}%`,
                  '--y': `${Math.random() * 100}%`,
                  '--duration': `${5 + Math.random() * 15}s`,
                  '--delay': `${Math.random() * 5}s`,
                  '--size': `${Math.random() * 3 + 0.5}px`,
                  '--opacity': `${Math.random() * 0.5 + 0.25}`,
                } as React.CSSProperties}
              ></div>
            ))}
          </div>
          
          {/* Floating glowing shapes for depth */}
          <div className="absolute left-[10%] top-[20%] w-24 h-24 rounded-lg bg-blue-500/5 backdrop-blur-sm rotate-12 animate-float"></div>
          <div className="absolute right-[15%] top-[60%] w-32 h-32 rounded-full bg-purple-500/5 backdrop-blur-sm animate-float animation-delay-200"></div>
          <div className="absolute left-[20%] bottom-[10%] w-20 h-20 rounded-md bg-indigo-500/5 backdrop-blur-sm -rotate-12 animate-float animation-delay-300"></div>
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
            
            {/* Enhanced custom cursor with reactive behavior */}
            <div className="custom-cursor"></div>
          </motion.div>
        </AnimatePresence>
      </div>
    </LanguageProvider>
  );
};
