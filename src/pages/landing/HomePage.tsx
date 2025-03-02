
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { LandingLayout } from '@/components/landing/LandingLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { 
  BarChart3, 
  Shield, 
  Briefcase, 
  ArrowRight, 
  Repeat, 
  Globe, 
  PieChart,
  LineChart,
  Lock,
  Key,
  Zap,
  CheckCircle2,
  Terminal,
  ChevronRight
} from 'lucide-react';

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
      {/* Hero Section with Animated Background */}
      <section className="relative overflow-hidden min-h-screen flex items-center">
        {/* Animated background elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -top-20 -left-20 animate-pulse"></div>
          <div className="absolute w-96 h-96 bg-purple-500/20 rounded-full blur-3xl bottom-0 right-0 animate-pulse animation-delay-200"></div>
          <div className="absolute w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl top-1/3 right-1/4 animate-pulse animation-delay-300"></div>
          
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          
          {/* Floating elements */}
          <div className="absolute top-1/4 left-1/4 w-12 h-12 bg-blue-600/30 backdrop-blur-sm rounded-lg animate-float"></div>
          <div className="absolute bottom-1/4 right-1/4 w-20 h-20 bg-purple-600/30 backdrop-blur-sm rounded-xl animate-float animation-delay-200"></div>
          <div className="absolute top-1/3 right-1/3 w-16 h-16 bg-cyan-600/30 backdrop-blur-sm rounded-lg animate-float animation-delay-100"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gradient animate-on-scroll">
              {t('hero.title')}
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-10 animate-on-scroll">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16 animate-on-scroll">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 group"
                onClick={() => scrollToSection(featuresRef)}
              >
                {t('hero.demo')}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-blue-500 text-blue-400 hover:bg-blue-950 px-8"
                onClick={() => scrollToSection(howItWorksRef)}
              >
                {t('hero.contact')}
              </Button>
            </div>
            
            {/* Animated dashboard mockup */}
            <div className="relative w-full rounded-xl overflow-hidden shadow-2xl border border-gray-800 animate-on-scroll">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm"></div>
              <img 
                src="https://source.unsplash.com/photo-1498050108023-c5249f4df085" 
                alt="Dashboard" 
                className="w-full h-auto object-cover"
              />
              {/* Interactive elements overlay */}
              <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="w-full p-6 flex justify-between items-center">
                  <div className="flex gap-3">
                    <div className="h-4 w-4 rounded-full bg-green-500 animate-pulse"></div>
                    <div className="h-4 w-4 rounded-full bg-yellow-500 animate-pulse animation-delay-100"></div>
                    <div className="h-4 w-4 rounded-full bg-blue-500 animate-pulse animation-delay-200"></div>
                  </div>
                  <Button 
                    size="sm" 
                    className="bg-blue-600/80 hover:bg-blue-600 text-white"
                  >
                    Live Demo
                  </Button>
                </div>
              </div>
            </div>

            {/* Clients logos */}
            <div className="mt-20 animate-on-scroll">
              <p className="text-sm text-gray-400 mb-6">TRUSTED BY LEADING COMPANIES WORLDWIDE</p>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center opacity-70">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="flex justify-center">
                    <div className="h-8 w-24 bg-gray-500/20 rounded"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section 
        ref={featuresRef} 
        className="py-24 relative overflow-hidden bg-gradient-to-b from-[#0D1117] to-[#131720]"
      >
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
              {t('features.title')}
            </h2>
            <p className="text-xl text-gray-300">
              {t('features.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Liquidity & FX Card */}
            <div className="glass-card p-8 transform transition-all duration-500 hover:translate-y-[-10px] animate-on-scroll">
              <div className="h-14 w-14 rounded-lg bg-blue-600/20 flex items-center justify-center mb-6">
                <BarChart3 className="h-7 w-7 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">
                {t('features.liquidity.title')}
              </h3>
              <p className="text-gray-400 mb-6">
                {t('features.liquidity.description')}
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center text-gray-300">
                  <CheckCircle2 className="h-5 w-5 text-blue-500 mr-2" />
                  <span>Real-time cash visibility</span>
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle2 className="h-5 w-5 text-blue-500 mr-2" />
                  <span>Multi-currency management</span>
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle2 className="h-5 w-5 text-blue-500 mr-2" />
                  <span>AI-powered forecasting</span>
                </li>
              </ul>
              <Link to="/solutions#liquidity" className="text-blue-400 flex items-center text-sm hover:text-blue-300 transition-colors group">
                <span>Learn more</span>
                <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            
            {/* Investments & Reporting Card */}
            <div className="glass-card p-8 transform transition-all duration-500 hover:translate-y-[-10px] animate-on-scroll animation-delay-100">
              <div className="h-14 w-14 rounded-lg bg-purple-600/20 flex items-center justify-center mb-6">
                <LineChart className="h-7 w-7 text-purple-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">
                {t('features.investments.title')}
              </h3>
              <p className="text-gray-400 mb-6">
                {t('features.investments.description')}
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center text-gray-300">
                  <CheckCircle2 className="h-5 w-5 text-purple-500 mr-2" />
                  <span>Portfolio optimization</span>
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle2 className="h-5 w-5 text-purple-500 mr-2" />
                  <span>Custom reporting engine</span>
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle2 className="h-5 w-5 text-purple-500 mr-2" />
                  <span>Risk analytics dashboard</span>
                </li>
              </ul>
              <Link to="/solutions#investments" className="text-purple-400 flex items-center text-sm hover:text-purple-300 transition-colors group">
                <span>Learn more</span>
                <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            
            {/* Security & Integrations Card */}
            <div className="glass-card p-8 transform transition-all duration-500 hover:translate-y-[-10px] animate-on-scroll animation-delay-200">
              <div className="h-14 w-14 rounded-lg bg-cyan-600/20 flex items-center justify-center mb-6">
                <Terminal className="h-7 w-7 text-cyan-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">
                {t('features.security.title')}
              </h3>
              <p className="text-gray-400 mb-6">
                {t('features.security.description')}
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center text-gray-300">
                  <CheckCircle2 className="h-5 w-5 text-cyan-500 mr-2" />
                  <span>Bank-grade security</span>
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle2 className="h-5 w-5 text-cyan-500 mr-2" />
                  <span>ERP/API integrations</span>
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle2 className="h-5 w-5 text-cyan-500 mr-2" />
                  <span>Regulatory compliance</span>
                </li>
              </ul>
              <Link to="/solutions#security" className="text-cyan-400 flex items-center text-sm hover:text-cyan-300 transition-colors group">
                <span>Learn more</span>
                <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section 
        ref={howItWorksRef} 
        className="py-24 relative overflow-hidden bg-[#0A0E17]"
      >
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
              {t('how.title')}
            </h2>
            <p className="text-xl text-gray-300">
              {t('how.subtitle')}
            </p>
          </div>
          
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500 hidden md:block"></div>
            
            <div className="space-y-16 md:space-y-32 relative z-10">
              {/* Step 1 */}
              <div className="flex flex-col md:flex-row items-center animate-on-scroll">
                <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12 text-center md:text-right">
                  <h3 className="text-2xl font-semibold text-white mb-3">
                    {t('how.step1.title')}
                  </h3>
                  <p className="text-gray-300">
                    {t('how.step1.description')}
                  </p>
                </div>
                <div className="md:w-0 flex justify-center">
                  <div className="h-16 w-16 rounded-full bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20 z-20">
                    <Key className="h-7 w-7 text-white" />
                  </div>
                </div>
                <div className="md:w-1/2 md:pl-12">
                  <div className="glass-card p-4 shadow-lg">
                    <img 
                      src="https://source.unsplash.com/photo-1488590528505-98d2b5aba04b" 
                      alt="Connect Accounts" 
                      className="rounded-lg w-full h-auto"
                    />
                  </div>
                </div>
              </div>
              
              {/* Step 2 */}
              <div className="flex flex-col md:flex-row-reverse items-center animate-on-scroll">
                <div className="md:w-1/2 mb-8 md:mb-0 md:pl-12 text-center md:text-left">
                  <h3 className="text-2xl font-semibold text-white mb-3">
                    {t('how.step2.title')}
                  </h3>
                  <p className="text-gray-300">
                    {t('how.step2.description')}
                  </p>
                </div>
                <div className="md:w-0 flex justify-center">
                  <div className="h-16 w-16 rounded-full bg-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/20 z-20">
                    <Globe className="h-7 w-7 text-white" />
                  </div>
                </div>
                <div className="md:w-1/2 md:pr-12">
                  <div className="glass-card p-4 shadow-lg">
                    <img 
                      src="https://source.unsplash.com/photo-1518770660439-4636190af475" 
                      alt="Centralize Liquidity" 
                      className="rounded-lg w-full h-auto"
                    />
                  </div>
                </div>
              </div>
              
              {/* Step 3 */}
              <div className="flex flex-col md:flex-row items-center animate-on-scroll">
                <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12 text-center md:text-right">
                  <h3 className="text-2xl font-semibold text-white mb-3">
                    {t('how.step3.title')}
                  </h3>
                  <p className="text-gray-300">
                    {t('how.step3.description')}
                  </p>
                </div>
                <div className="md:w-0 flex justify-center">
                  <div className="h-16 w-16 rounded-full bg-cyan-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 z-20">
                    <PieChart className="h-7 w-7 text-white" />
                  </div>
                </div>
                <div className="md:w-1/2 md:pl-12">
                  <div className="glass-card p-4 shadow-lg">
                    <img 
                      src="https://source.unsplash.com/photo-1483058712412-4245e9b90334" 
                      alt="Analyze Data" 
                      className="rounded-lg w-full h-auto"
                    />
                  </div>
                </div>
              </div>
              
              {/* Step 4 */}
              <div className="flex flex-col md:flex-row-reverse items-center animate-on-scroll">
                <div className="md:w-1/2 mb-8 md:mb-0 md:pl-12 text-center md:text-left">
                  <h3 className="text-2xl font-semibold text-white mb-3">
                    {t('how.step4.title')}
                  </h3>
                  <p className="text-gray-300">
                    {t('how.step4.description')}
                  </p>
                </div>
                <div className="md:w-0 flex justify-center">
                  <div className="h-16 w-16 rounded-full bg-green-600 flex items-center justify-center shadow-lg shadow-green-500/20 z-20">
                    <Zap className="h-7 w-7 text-white" />
                  </div>
                </div>
                <div className="md:w-1/2 md:pr-12">
                  <div className="glass-card p-4 shadow-lg">
                    <img 
                      src="https://source.unsplash.com/photo-1498050108023-c5249f4df085" 
                      alt="Execute & Track" 
                      className="rounded-lg w-full h-auto"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Success Stories Section */}
      <section 
        ref={successRef} 
        className="py-24 relative overflow-hidden bg-gradient-to-b from-[#0A0E17] to-[#131720]"
      >
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
              {t('success.title')}
            </h2>
            <p className="text-xl text-gray-300">
              {t('success.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Manufacturing Case */}
            <div className="card-gradient p-8 transform transition-all duration-500 hover:scale-105 animate-on-scroll">
              <Briefcase className="h-10 w-10 mb-6" />
              <h3 className="text-xl font-semibold mb-3">
                {t('success.manufacturing.title')}
              </h3>
              <p className="text-gray-100 mb-6">
                {t('success.manufacturing.description')}
              </p>
              <div className="mt-auto">
                <Link to="/client-experience#manufacturing" className="text-white/90 flex items-center text-sm hover:text-white transition-colors group">
                  <span>Read case study</span>
                  <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
            
            {/* Private Equity Case */}
            <div className="card-gradient p-8 transform transition-all duration-500 hover:scale-105 animate-on-scroll animation-delay-100">
              <BarChart3 className="h-10 w-10 mb-6" />
              <h3 className="text-xl font-semibold mb-3">
                {t('success.equity.title')}
              </h3>
              <p className="text-gray-100 mb-6">
                {t('success.equity.description')}
              </p>
              <div className="mt-auto">
                <Link to="/client-experience#equity" className="text-white/90 flex items-center text-sm hover:text-white transition-colors group">
                  <span>Read case study</span>
                  <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
            
            {/* Fintech Case */}
            <div className="card-gradient p-8 transform transition-all duration-500 hover:scale-105 animate-on-scroll animation-delay-200">
              <Shield className="h-10 w-10 mb-6" />
              <h3 className="text-xl font-semibold mb-3">
                {t('success.fintech.title')}
              </h3>
              <p className="text-gray-100 mb-6">
                {t('success.fintech.description')}
              </p>
              <div className="mt-auto">
                <Link to="/client-experience#fintech" className="text-white/90 flex items-center text-sm hover:text-white transition-colors group">
                  <span>Read case study</span>
                  <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12 animate-on-scroll">
            <Link to="/client-experience">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-blue-500 text-blue-400 hover:bg-blue-950 px-8"
              >
                {t('success.cta')}
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-r from-blue-900 to-purple-900">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        
        {/* Animated shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              {t('cta.title')}
            </h2>
            <p className="text-xl text-blue-100 mb-10">
              {t('cta.description')}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/request-demo">
                <Button 
                  size="lg" 
                  className="bg-white text-blue-900 hover:bg-gray-100 px-8 group"
                >
                  {t('cta.demo')}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white/10 px-8"
                >
                  {t('cta.contact')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </LandingLayout>
  );
}
