
import React, { useEffect, useRef } from 'react';
import { LandingLayout } from '@/components/landing/LandingLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { HeroSection } from '@/components/landing/home/HeroSection';
import { FeaturesSection } from '@/components/landing/home/FeaturesSection';
import { HowItWorksSection } from '@/components/landing/home/HowItWorksSection';
import { SuccessStoriesSection } from '@/components/landing/home/SuccessStoriesSection';
import { CTASection } from '@/components/landing/home/CTASection';

export default function HomePage() {
  const { t } = useLanguage();
  const featuresRef = useRef<HTMLDivElement>(null);
  const howItWorksRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  const animateOnScroll = () => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observer.observe(el);
    });
  };

  useEffect(() => {
    animateOnScroll();
    
    // Apply dark mode
    document.documentElement.classList.add('dark');
    
    return () => {
      document.documentElement.classList.remove('dark');
    };
  }, []);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <LandingLayout>
      <HeroSection scrollToFeatures={() => scrollToSection(featuresRef)} />
      <FeaturesSection reference={featuresRef} />
      <HowItWorksSection reference={howItWorksRef} />
      <SuccessStoriesSection reference={successRef} />
      <CTASection />
    </LandingLayout>
  );
}
