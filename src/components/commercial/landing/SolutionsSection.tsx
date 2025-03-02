
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, 
  DollarSign, 
  Globe, 
  Shield,
  ArrowRight
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export const SolutionsSection = React.forwardRef<HTMLDivElement>((props, ref) => {
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
      description: "Sophisticated tools for managing corporate investments and optimizing returns",
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

  return (
    <motion.div 
      ref={ref}
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
  );
});

SolutionsSection.displayName = 'SolutionsSection';
