
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeroSectionProps {
  scrollToFeatures: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ scrollToFeatures }) => {
  const { t } = useLanguage();

  return (
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
            Transformando la Gestión Financiera Empresarial con IA Avanzada
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-10 animate-on-scroll">
            Plataforma integral para optimizar la tesorería, gestionar inversiones y mitigar riesgos financieros en tiempo real
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16 animate-on-scroll">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 group"
              onClick={() => scrollToFeatures()}
            >
              Solicitar Demostración
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-blue-500 text-blue-400 hover:bg-blue-950 px-8"
            >
              Contactar Ventas
            </Button>
          </div>
          
          {/* Animated dashboard mockup */}
          <div className="relative w-full rounded-xl overflow-hidden shadow-2xl border border-gray-800 animate-on-scroll">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm"></div>
            <img 
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80" 
              alt="Plataforma Financiera Avanzada" 
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
                  Demostración en Vivo
                </Button>
              </div>
            </div>
          </div>

          {/* Clients logos */}
          <div className="mt-20 animate-on-scroll">
            <p className="text-sm text-gray-400 mb-6">CONFÍAN EN NOSOTROS LAS PRINCIPALES INSTITUCIONES FINANCIERAS</p>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center opacity-70">
              {['Goldman Sachs', 'JP Morgan', 'Morgan Stanley', 'BlackRock', 'Citi', 'Bank of America'].map((name, i) => (
                <div key={i} className="flex justify-center">
                  <div className="text-gray-400 text-sm font-medium">{name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
