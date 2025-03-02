
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  BarChart3, 
  LineChart, 
  Terminal,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';

export const FeaturesSection: React.FC<{ reference: React.RefObject<HTMLDivElement> }> = ({ reference }) => {
  const { t } = useLanguage();

  const features = [
    {
      icon: <BarChart3 className="h-7 w-7 text-blue-500" />,
      title: "Advanced Liquidity Management",
      description: "Comprehensive real-time visibility into your cash positions across multiple currencies and accounts",
      checks: ["Real-time cash visibility", "Multi-currency management", "AI-powered forecasting"]
    },
    {
      icon: <LineChart className="h-7 w-7 text-purple-500" />,
      title: "Intelligent Investment Analytics",
      description: "Optimize your investment portfolio with advanced analytics and AI-driven recommendations",
      checks: ["Portfolio optimization", "Custom reporting engine", "Risk analytics dashboard"]
    },
    {
      icon: <Terminal className="h-7 w-7 text-cyan-500" />,
      title: "Enterprise-Grade Security",
      description: "Bank-level security with advanced encryption and comprehensive integration capabilities",
      checks: ["Bank-grade security", "ERP/API integrations", "Regulatory compliance"]
    }
  ];

  return (
    <section 
      ref={reference} 
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
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass-card p-8 transform transition-all duration-500 hover:translate-y-[-10px] animate-on-scroll"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="h-14 w-14 rounded-lg bg-gradient-to-br from-blue-600/20 to-purple-600/20 flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">
                {feature.title}
              </h3>
              <p className="text-gray-400 mb-6">
                {feature.description}
              </p>
              <ul className="space-y-2 mb-6">
                {feature.checks.map((check, idx) => (
                  <li key={idx} className="flex items-center text-gray-300">
                    <CheckCircle2 className="h-5 w-5 text-blue-500 mr-2" />
                    <span>{check}</span>
                  </li>
                ))}
              </ul>
              <Link to={`/solutions#${feature.title.toLowerCase().replace(/\s+/g, '-')}`} className="text-blue-400 flex items-center text-sm hover:text-blue-300 transition-colors group">
                <span>Learn more</span>
                <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
