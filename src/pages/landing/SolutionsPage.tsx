
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LandingLayout } from '@/components/landing/LandingLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight, 
  BarChart3, 
  Briefcase, 
  LineChart, 
  Lock, 
  PieChart, 
  Shield,
  Globe,
  BarChart4,
  BadgeDollarSign,
  BookOpen,
  ChevronRight,
  Coins,
  Building,
  CircleDollarSign,
  ExternalLink,
  CreditCard,
  Landmark,
  Terminal,
  ChartBar,
  Zap
} from 'lucide-react';

export default function SolutionsPage() {
  const { t } = useLanguage();

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

  return (
    <LandingLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-32">
        <div className="absolute inset-0 z-0">
          <div className="absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -top-20 -left-20 animate-pulse"></div>
          <div className="absolute w-96 h-96 bg-purple-500/20 rounded-full blur-3xl bottom-0 right-0 animate-pulse animation-delay-200"></div>
          
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient animate-on-scroll">
              Treasury & Finance Solutions
            </h1>
            <p className="text-xl text-blue-100 mb-8 animate-on-scroll">
              Comprehensive suite of enterprise-grade solutions for modern treasury and finance teams
            </p>
          </div>
        </div>
      </section>

      {/* Treasury Management Section */}
      <section id="treasury" className="py-16 bg-[#0D1117]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-on-scroll">
              <div className="h-14 w-14 rounded-full bg-blue-600/20 flex items-center justify-center mb-6">
                <Briefcase className="h-7 w-7 text-blue-500" />
              </div>
              <h2 className="text-3xl font-bold mb-4 text-white">Treasury Management</h2>
              <p className="text-lg text-gray-300 mb-6">
                Unified platform for complete visibility and control over your corporate treasury operations.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-blue-600/20 flex items-center justify-center mt-0.5 mr-3">
                    <ChevronRight className="h-4 w-4 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Cash Positioning</h3>
                    <p className="text-gray-400">Real-time visibility into all cash balances across multiple banks and accounts</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-blue-600/20 flex items-center justify-center mt-0.5 mr-3">
                    <ChevronRight className="h-4 w-4 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Forecasting</h3>
                    <p className="text-gray-400">AI-powered cash flow forecasting with scenario modeling and variance analysis</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-blue-600/20 flex items-center justify-center mt-0.5 mr-3">
                    <ChevronRight className="h-4 w-4 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Bank Connectivity</h3>
                    <p className="text-gray-400">Direct integrations with 300+ global banks with secure API connections</p>
                  </div>
                </li>
              </ul>
              <Button 
                className="bg-blue-600 hover:bg-blue-700 text-white group"
                asChild
              >
                <Link to="/request-demo">
                  Explore Treasury Management
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
            <div className="glass-card p-5 animate-on-scroll animation-delay-100">
              <img 
                src="https://source.unsplash.com/photo-1486312338219-ce68d2c6f44d" 
                alt="Treasury Management" 
                className="rounded-lg shadow-lg" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Cash & Liquidity Section */}
      <section id="cash" className="py-16 bg-gradient-to-b from-[#0D1117] to-[#131720]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="glass-card p-5 order-1 lg:order-1 animate-on-scroll">
              <img 
                src="https://source.unsplash.com/photo-1581091226825-a6a2a5aee158" 
                alt="Cash & Liquidity Management" 
                className="rounded-lg shadow-lg" 
              />
            </div>
            <div className="order-2 lg:order-2 animate-on-scroll animation-delay-100">
              <div className="h-14 w-14 rounded-full bg-cyan-600/20 flex items-center justify-center mb-6">
                <Coins className="h-7 w-7 text-cyan-500" />
              </div>
              <h2 className="text-3xl font-bold mb-4 text-white">Cash & Liquidity Management</h2>
              <p className="text-lg text-gray-300 mb-6">
                Optimize your working capital and ensure your organization always has the right amount of liquidity.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-cyan-600/20 flex items-center justify-center mt-0.5 mr-3">
                    <ChevronRight className="h-4 w-4 text-cyan-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Cash Pooling</h3>
                    <p className="text-gray-400">Physical and notional pooling structures to optimize liquidity</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-cyan-600/20 flex items-center justify-center mt-0.5 mr-3">
                    <ChevronRight className="h-4 w-4 text-cyan-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Working Capital</h3>
                    <p className="text-gray-400">Reduce days sales outstanding (DSO) and optimize cash conversion cycle</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-cyan-600/20 flex items-center justify-center mt-0.5 mr-3">
                    <ChevronRight className="h-4 w-4 text-cyan-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">In-House Banking</h3>
                    <p className="text-gray-400">Centralize treasury operations and manage intercompany transactions</p>
                  </div>
                </li>
              </ul>
              <Button 
                className="bg-cyan-600 hover:bg-cyan-700 text-white group"
                asChild
              >
                <Link to="/request-demo">
                  Explore Cash Management
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Risk Management Section */}
      <section id="risk" className="py-16 bg-[#0A0E17]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-on-scroll">
              <div className="h-14 w-14 rounded-full bg-purple-600/20 flex items-center justify-center mb-6">
                <Shield className="h-7 w-7 text-purple-500" />
              </div>
              <h2 className="text-3xl font-bold mb-4 text-white">Risk Management</h2>
              <p className="text-lg text-gray-300 mb-6">
                Identify, measure, and manage financial risks across your organization with our sophisticated risk platform.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-purple-600/20 flex items-center justify-center mt-0.5 mr-3">
                    <ChevronRight className="h-4 w-4 text-purple-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">FX Risk</h3>
                    <p className="text-gray-400">Track and hedge foreign currency exposures to minimize volatility</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-purple-600/20 flex items-center justify-center mt-0.5 mr-3">
                    <ChevronRight className="h-4 w-4 text-purple-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Interest Rate Risk</h3>
                    <p className="text-gray-400">Analyze and manage interest rate exposures with sophisticated modeling</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-purple-600/20 flex items-center justify-center mt-0.5 mr-3">
                    <ChevronRight className="h-4 w-4 text-purple-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Counterparty Risk</h3>
                    <p className="text-gray-400">Monitor and manage exposures to financial institutions and trading partners</p>
                  </div>
                </li>
              </ul>
              <Button 
                className="bg-purple-600 hover:bg-purple-700 text-white group"
                asChild
              >
                <Link to="/request-demo">
                  Explore Risk Management
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
            <div className="glass-card p-5 animate-on-scroll animation-delay-100">
              <img 
                src="https://source.unsplash.com/photo-1487058792275-0ad4aaf24ca7" 
                alt="Risk Management" 
                className="rounded-lg shadow-lg" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Investment Management Section */}
      <section id="investment" className="py-16 bg-gradient-to-b from-[#0D1117] to-[#131720]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="glass-card p-5 order-1 lg:order-1 animate-on-scroll">
              <img 
                src="https://source.unsplash.com/photo-1498050108023-c5249f4df085" 
                alt="Investment Management" 
                className="rounded-lg shadow-lg" 
              />
            </div>
            <div className="order-2 lg:order-2 animate-on-scroll animation-delay-100">
              <div className="h-14 w-14 rounded-full bg-green-600/20 flex items-center justify-center mb-6">
                <CircleDollarSign className="h-7 w-7 text-green-500" />
              </div>
              <h2 className="text-3xl font-bold mb-4 text-white">Investment Management</h2>
              <p className="text-lg text-gray-300 mb-6">
                Optimize your short-term investments and longer-term portfolios with our intelligent investment platform.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-green-600/20 flex items-center justify-center mt-0.5 mr-3">
                    <ChevronRight className="h-4 w-4 text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Portfolio Optimization</h3>
                    <p className="text-gray-400">Maximize returns within risk parameters through AI-powered asset allocation</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-green-600/20 flex items-center justify-center mt-0.5 mr-3">
                    <ChevronRight className="h-4 w-4 text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Investment Analysis</h3>
                    <p className="text-gray-400">Comprehensive analytical tools to evaluate investment performance</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-green-600/20 flex items-center justify-center mt-0.5 mr-3">
                    <ChevronRight className="h-4 w-4 text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Compliance Monitoring</h3>
                    <p className="text-gray-400">Ensure investments adhere to your policy framework and regulatory requirements</p>
                  </div>
                </li>
              </ul>
              <Button 
                className="bg-green-600 hover:bg-green-700 text-white group"
                asChild
              >
                <Link to="/request-demo">
                  Explore Investment Management
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FX Operations Section */}
      <section id="fx" className="py-16 bg-[#0A0E17]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-on-scroll">
              <div className="h-14 w-14 rounded-full bg-blue-600/20 flex items-center justify-center mb-6">
                <Globe className="h-7 w-7 text-blue-500" />
              </div>
              <h2 className="text-3xl font-bold mb-4 text-white">FX Operations</h2>
              <p className="text-lg text-gray-300 mb-6">
                Streamline your foreign exchange operations with our comprehensive FX management solution.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-blue-600/20 flex items-center justify-center mt-0.5 mr-3">
                    <ChevronRight className="h-4 w-4 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">FX Trading</h3>
                    <p className="text-gray-400">Execute and track foreign exchange transactions across multiple providers</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-blue-600/20 flex items-center justify-center mt-0.5 mr-3">
                    <ChevronRight className="h-4 w-4 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Exposure Management</h3>
                    <p className="text-gray-400">Identify and manage currency exposures across your organization</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-blue-600/20 flex items-center justify-center mt-0.5 mr-3">
                    <ChevronRight className="h-4 w-4 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Hedge Accounting</h3>
                    <p className="text-gray-400">Simplify hedge accounting with automated documentation and effectiveness testing</p>
                  </div>
                </li>
              </ul>
              <Button 
                className="bg-blue-600 hover:bg-blue-700 text-white group"
                asChild
              >
                <Link to="/request-demo">
                  Explore FX Operations
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
            <div className="glass-card p-5 animate-on-scroll animation-delay-100">
              <img 
                src="https://source.unsplash.com/photo-1486312338219-ce68d2c6f44d" 
                alt="FX Operations" 
                className="rounded-lg shadow-lg" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Industry Solutions Section */}
      <section className="py-16 bg-gradient-to-b from-[#0D1117] to-[#131720]">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12 animate-on-scroll">
            <h2 className="text-3xl font-bold mb-4 text-white">Industry Solutions</h2>
            <p className="text-lg text-gray-300">
              Tailored solutions designed for the specific needs of different industries
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-on-scroll">
            <div className="glass-card p-6 hover:bg-white/10 transition-colors">
              <Building className="h-10 w-10 text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-white">Corporate Enterprise</h3>
              <p className="text-gray-400 mb-4">
                Solutions for multinational corporations with complex treasury needs
              </p>
              <Link to="/solutions/corporate-enterprise" className="text-blue-400 text-sm hover:text-blue-300 transition-colors">
                Learn more →
              </Link>
            </div>
            
            <div className="glass-card p-6 hover:bg-white/10 transition-colors">
              <Landmark className="h-10 w-10 text-purple-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-white">Financial Institutions</h3>
              <p className="text-gray-400 mb-4">
                Advanced solutions for banks, asset managers, and investment firms
              </p>
              <Link to="/solutions/financial-institutions" className="text-purple-400 text-sm hover:text-purple-300 transition-colors">
                Learn more →
              </Link>
            </div>
            
            <div className="glass-card p-6 hover:bg-white/10 transition-colors">
              <CreditCard className="h-10 w-10 text-cyan-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-white">Fintech</h3>
              <p className="text-gray-400 mb-4">
                Solutions for fintech companies requiring scalable treasury infrastructure
              </p>
              <Link to="/solutions/fintech" className="text-cyan-400 text-sm hover:text-cyan-300 transition-colors">
                Learn more →
              </Link>
            </div>
            
            <div className="glass-card p-6 hover:bg-white/10 transition-colors">
              <Terminal className="h-10 w-10 text-green-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-white">Technology</h3>
              <p className="text-gray-400 mb-4">
                Treasury solutions for technology companies with global operations
              </p>
              <Link to="/solutions/technology" className="text-green-400 text-sm hover:text-green-300 transition-colors">
                Learn more →
              </Link>
            </div>
            
            <div className="glass-card p-6 hover:bg-white/10 transition-colors">
              <ChartBar className="h-10 w-10 text-orange-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-white">Private Equity</h3>
              <p className="text-gray-400 mb-4">
                Solutions for PE firms and portfolio companies to optimize treasury
              </p>
              <Link to="/solutions/private-equity" className="text-orange-400 text-sm hover:text-orange-300 transition-colors">
                Learn more →
              </Link>
            </div>
            
            <div className="glass-card p-6 hover:bg-white/10 transition-colors">
              <Zap className="h-10 w-10 text-yellow-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-white">Energy</h3>
              <p className="text-gray-400 mb-4">
                Solutions for energy companies with commodity risk and global operations
              </p>
              <Link to="/solutions/energy" className="text-yellow-400 text-sm hover:text-yellow-300 transition-colors">
                Learn more →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Partners Section */}
      <section className="py-16 bg-[#0A0E17]">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12 animate-on-scroll">
            <h2 className="text-3xl font-bold mb-4 text-white">Integration Partners</h2>
            <p className="text-lg text-gray-300">
              Seamlessly connect with your existing financial systems and ERP platforms
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 animate-on-scroll">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-lg p-6 flex items-center justify-center hover:bg-white/10 transition-colors">
                <div className="h-12 w-24 bg-gray-500/20 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-900 to-purple-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        
        {/* Animated shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center animate-on-scroll">
            <h2 className="text-3xl font-bold mb-6 text-white">
              Ready to transform your treasury operations?
            </h2>
            <p className="text-xl text-blue-100 mb-10">
              Schedule a personalized demo to see how DataCloud AI can help your organization
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                size="lg" 
                className="bg-white text-blue-900 hover:bg-gray-100 px-8 group"
                asChild
              >
                <Link to="/request-demo">
                  Request a Demo
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white/10 px-8"
                asChild
              >
                <Link to="/contact">
                  Contact Sales
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </LandingLayout>
  );
}
