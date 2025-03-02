
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  Shield, 
  BarChart3, 
  GanttChartSquare, 
  BrainCircuit, 
  Building2, 
  ArrowRight, 
  ChevronDown,
  Globe,
  CreditCard,
  DollarSign,
  LineChart,
  ShieldCheck,
  Briefcase
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function CommercialLandingPage() {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
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
      {/* Enhanced Navigation Bar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-blue-950/90 backdrop-blur-md shadow-lg" : "bg-transparent"}`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Briefcase className="h-8 w-8 text-blue-400 mr-3" />
              <div>
                <h1 className="text-xl font-bold text-white">Datacloud AI</h1>
                <p className="text-xs text-blue-300">Enterprise Treasury Management</p>
              </div>
            </div>
            <div className="hidden md:flex space-x-6 items-center">
              <TooltipProvider>
                {["Solutions", "Case Studies", "Resources", "About Us"].map((item) => (
                  <Tooltip key={item}>
                    <TooltipTrigger asChild>
                      <a 
                        href="#" 
                        className="text-blue-200 hover:text-white transition-colors relative group"
                      >
                        {item}
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
                      </a>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="bg-blue-800 border-blue-700">
                      <p>Explore our {item.toLowerCase()}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </TooltipProvider>
              <Button 
                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium px-5 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => navigate("/commercial/dashboard")}
              >
                Login 
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="md:hidden">
              <Button variant="ghost" className="text-white">
                <GanttChartSquare className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with parallax effect */}
      <motion.div 
        ref={heroRef}
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-indigo-900/80"></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-30"></div>
          
          {/* Animated gradient orbs */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-500/20 rounded-full filter blur-3xl animate-pulse animation-delay-200"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl animate-pulse animation-delay-300"></div>
        </div>

        <div className="container mx-auto px-6 z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-200 via-white to-blue-200 text-transparent bg-clip-text">
              Revolutionize Treasury Management with AI
            </h1>
            <p className="text-xl md:text-2xl text-blue-200 mb-10 max-w-3xl mx-auto">
              Centralize liquidity, optimize investments, and mitigate risks with our integrated enterprise platform
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white text-lg font-medium px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                onClick={() => navigate("/commercial/dashboard")}
              >
                Request a Demo <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                className="border-2 border-blue-400 text-blue-200 hover:text-white hover:bg-blue-800/30 text-lg font-medium px-8 py-6 rounded-full shadow-lg transition-all duration-300"
                onClick={scrollToFeatures}
              >
                Explore Features <ChevronDown className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-16 flex justify-center"
          >
            <div className="grid grid-cols-5 gap-8 items-center max-w-3xl">
              {['Goldman Sachs', 'JP Morgan', 'Morgan Stanley', 'BlackRock', 'Citi'].map((company) => (
                <div key={company} className="text-gray-400 text-sm font-medium">
                  {company}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Features Section with staggered animations */}
      <motion.div 
        ref={featuresRef}
        style={{ opacity: featuresOpacity, y: featureY }}
        className="relative py-24 bg-gradient-to-b from-blue-950 to-indigo-950"
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
                Powerful Features for Modern Treasury
              </h2>
              <p className="text-xl text-blue-300 max-w-3xl mx-auto">
                Our comprehensive suite of tools helps finance executives make better decisions with real-time data and AI insights
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <Card className="bg-gradient-to-br from-blue-900/40 to-indigo-900/40 backdrop-blur-sm border-blue-800/50 h-full glass-card overflow-hidden group">
                  <CardContent className="p-8 relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative z-10">
                      <div className="rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 p-3 w-14 h-14 flex items-center justify-center mb-6">
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                      <p className="text-blue-200">{feature.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Solutions Section with 3D card effect */}
      <motion.div 
        ref={solutionsRef}
        className="relative py-24 bg-gradient-to-b from-indigo-950 to-blue-950"
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/3 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-1/3 w-64 h-64 bg-indigo-500/10 rounded-full filter blur-3xl"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
                Comprehensive Treasury Solutions
              </h2>
              <p className="text-xl text-blue-300 max-w-3xl mx-auto">
                Discover how our platform addresses all aspects of modern treasury management
              </p>
            </motion.div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {solutions.map((solution, index) => (
              <motion.div
                key={solution.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="perspective-1000"
              >
                <div className="transform-style-3d hover:rotate-y-3 transition-transform duration-300 h-full">
                  <Card className="bg-gradient-to-br from-blue-900/40 to-indigo-900/40 backdrop-blur-sm border-blue-800/50 h-full glass-card overflow-hidden">
                    <CardContent className="p-8 flex flex-col md:flex-row gap-8 items-center">
                      <div className="rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-600/20 p-4 w-24 h-24 flex-shrink-0 flex items-center justify-center">
                        {solution.icon}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-3">{solution.title}</h3>
                        <p className="text-blue-200 mb-4">{solution.description}</p>
                        <ul className="space-y-2">
                          {solution.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <div className="text-blue-400 mt-1">
                                <ArrowRight className="h-4 w-4" />
                              </div>
                              <span className="text-blue-100">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Call to Action */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative py-20 bg-gradient-to-r from-blue-900 to-indigo-800"
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1639322537228-f710d846310a?ixlib=rb-1.2.1&auto=format&fit=crop&w=2232&q=80')] bg-cover bg-center opacity-10"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Ready to Transform Your Treasury Operations?
          </h2>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto mb-8">
            Join leading organizations that trust Datacloud AI for their treasury management needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white text-lg font-medium px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              onClick={() => navigate("/commercial/dashboard")}
            >
              Schedule a Demo Today <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              className="border-2 border-white/30 bg-white/10 text-white hover:bg-white/20 text-lg font-medium px-8 py-6 rounded-full shadow-lg transition-all duration-300"
            >
              Contact Sales Team
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Enhanced Footer */}
      <footer className="bg-blue-950 text-blue-300 py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-5 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center mb-4">
                <Briefcase className="h-7 w-7 text-blue-400 mr-3" />
                <h3 className="text-xl font-bold text-white">Datacloud AI</h3>
              </div>
              <p className="mb-6 text-blue-400">
                Enterprise-grade treasury management platform powered by artificial intelligence
              </p>
              <div className="flex space-x-4">
                {['twitter', 'linkedin', 'facebook', 'github'].map((social) => (
                  <a 
                    key={social}
                    href="#" 
                    className="w-10 h-10 rounded-full bg-blue-900/50 flex items-center justify-center hover:bg-blue-800 transition-colors"
                  >
                    <span className="sr-only">{social}</span>
                    {/* Icon would go here */}
                    <div className="w-5 h-5 bg-blue-400 rounded-sm"></div>
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Solutions</h4>
              <ul className="space-y-2">
                {['Treasury Management', 'Cash Forecasting', 'Risk Management', 'Investment Portfolio'].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-white transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                {['About Us', 'Careers', 'Press', 'Contact'].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-white transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                {['Documentation', 'API Reference', 'Case Studies', 'Blog'].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-white transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="border-t border-blue-900 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p>© 2024 Datacloud AI. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-sm hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-sm hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="text-sm hover:text-white transition-colors">Cookie Settings</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Data for features section
const features = [
  {
    icon: <LineChart className="h-6 w-6 text-white" />,
    title: "Real-time Cash Management",
    description: "Monitor global cash positions across all your banks and accounts with real-time dashboards and automated reconciliation."
  },
  {
    icon: <BrainCircuit className="h-6 w-6 text-white" />,
    title: "AI-Powered Forecasting",
    description: "Leverage machine learning algorithms to predict cash flows with unprecedented accuracy and visibility."
  },
  {
    icon: <BarChart3 className="h-6 w-6 text-white" />,
    title: "Investment Analytics",
    description: "Optimize your investment portfolio with advanced analytics and scenario modeling to maximize returns."
  },
  {
    icon: <Globe className="h-6 w-6 text-white" />,
    title: "Multi-Currency Management",
    description: "Manage FX risk with real-time exposure tracking, hedging recommendations, and automated execution."
  },
  {
    icon: <CreditCard className="h-6 w-6 text-white" />,
    title: "Integrated Payments",
    description: "Streamline payment workflows with multi-bank connectivity, advanced approval workflows, and fraud prevention."
  },
  {
    icon: <ShieldCheck className="h-6 w-6 text-white" />,
    title: "Risk Management",
    description: "Identify and mitigate financial risks with comprehensive monitoring, analysis, and reporting tools."
  }
];

// Data for solutions section
const solutions = [
  {
    icon: <Building2 className="h-10 w-10 text-blue-400" />,
    title: "Corporate Treasury",
    description: "Complete treasury workstation for multinational corporations and mid-market companies",
    features: [
      "Global cash visibility and pooling",
      "Advanced cash forecasting and scenario analysis",
      "Bank account management and reconciliation",
      "Working capital optimization"
    ]
  },
  {
    icon: <DollarSign className="h-10 w-10 text-blue-400" />,
    title: "Investment Management",
    description: "Sophisticated tools for managing corporate investments and liquidity",
    features: [
      "Investment portfolio tracking and analytics",
      "Yield optimization and maturity analysis",
      "Compliance monitoring and policy enforcement",
      "Real-time market data integration"
    ]
  },
  {
    icon: <Globe className="h-10 w-10 text-blue-400" />,
    title: "FX and Exposure Management",
    description: "Comprehensive currency risk management and trading capabilities",
    features: [
      "Real-time FX exposure tracking",
      "Automated hedging recommendations",
      "Multi-bank execution platform",
      "Performance analytics and benchmarking"
    ]
  },
  {
    icon: <Shield className="h-10 w-10 text-blue-400" />,
    title: "Risk Management & Compliance",
    description: "Proactive financial risk monitoring and regulatory compliance",
    features: [
      "Counterparty risk assessment",
      "Liquidity risk management",
      "Regulatory reporting automation",
      "Policy compliance monitoring"
    ]
  }
];
