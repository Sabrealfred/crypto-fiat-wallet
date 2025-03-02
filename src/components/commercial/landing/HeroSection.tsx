
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const HeroSection: React.FC<{ scrollToFeatures: () => void }> = ({ scrollToFeatures }) => {
  const navigate = useNavigate();
  
  return (
    <motion.div 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-indigo-900/80"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-30"></div>
        
        {/* Enhanced 3D animated gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-blue-500/20 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full filter blur-3xl animate-pulse animation-delay-200"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-purple-500/10 rounded-full filter blur-3xl animate-pulse animation-delay-300"></div>
      </div>

      <div className="container mx-auto px-6 z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-200 via-white to-blue-200 text-transparent bg-clip-text">
            Revolucione la Gestión de Tesorería con IA
          </h1>
          <p className="text-xl md:text-2xl text-blue-200 mb-10 max-w-3xl mx-auto">
            Centralice la liquidez, optimice inversiones y mitigue riesgos con nuestra plataforma empresarial integrada
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white text-lg font-medium px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              onClick={() => navigate("/commercial/dashboard")}
            >
              Solicitar Demostración <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              className="border-2 border-blue-400 text-blue-200 hover:text-white hover:bg-blue-800/30 text-lg font-medium px-8 py-6 rounded-full shadow-lg transition-all duration-300"
              onClick={scrollToFeatures}
            >
              Explorar Soluciones
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
  );
};
