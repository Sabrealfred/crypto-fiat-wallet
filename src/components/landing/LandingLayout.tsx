
import React, { ReactNode } from 'react';
import { LandingNavigation } from './LandingNavigation';
import { LandingFooter } from './LandingFooter';
import { LanguageProvider } from '@/contexts/LanguageContext';

interface LandingLayoutProps {
  children: ReactNode;
}

export const LandingLayout: React.FC<LandingLayoutProps> = ({ children }) => {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gradient-to-b from-[#0A0E17] to-[#1A1E29] text-white">
        <LandingNavigation />
        <main className="pt-20">
          {children}
        </main>
        <LandingFooter />
      </div>
    </LanguageProvider>
  );
};
