
import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { NavigationBar } from "@/components/commercial/landing/NavigationBar";
import { HeroSection } from "@/components/commercial/landing/HeroSection";
import { FeaturesSection } from "@/components/commercial/landing/FeaturesSection";
import { SolutionsSection } from "@/components/commercial/landing/SolutionsSection";
import { CtaSection } from "@/components/commercial/landing/CtaSection";
import { FooterSection } from "@/components/commercial/landing/FooterSection";

export default function CommercialLandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const featuresRef = useRef<HTMLDivElement>(null);
  const solutionsRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  const featureY = useTransform(scrollYProgress, [0.1, 0.3], [50, 0]);
  const featuresOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-b from-blue-950 via-blue-900 to-indigo-900 text-white">
      {/* Navigation Bar */}
      <NavigationBar isScrolled={isScrolled} />

      {/* Hero Section with Animated Background */}
      <motion.div style={{ opacity: heroOpacity, scale: heroScale }}>
        <HeroSection scrollToFeatures={scrollToFeatures} />
      </motion.div>

      {/* Features Section with staggered animations */}
      <motion.div style={{ opacity: featuresOpacity, y: featureY }}>
        <FeaturesSection ref={featuresRef} />
      </motion.div>

      {/* Solutions Section with 3D card effect */}
      <SolutionsSection ref={solutionsRef} />

      {/* Call to Action */}
      <CtaSection />

      {/* Enhanced Footer */}
      <FooterSection />
    </div>
  );
}
