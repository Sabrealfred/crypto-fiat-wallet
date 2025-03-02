
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const CtaSection: React.FC = () => {
  const navigate = useNavigate();

  return (
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
          ¿Listo para Transformar sus Operaciones de Tesorería?
        </h2>
        <p className="text-xl text-blue-200 max-w-3xl mx-auto mb-8">
          Únase a organizaciones líderes que han reducido costos en un 35% y aumentado la eficiencia del capital de trabajo en un 28% utilizando Datacloud AI
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white text-lg font-medium px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            onClick={() => navigate("/commercial/dashboard")}
          >
            Agende una Demostración Hoy <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button 
            variant="outline" 
            className="border-2 border-white/30 bg-white/10 text-white hover:bg-white/20 text-lg font-medium px-8 py-6 rounded-full shadow-lg transition-all duration-300"
          >
            Contactar Equipo de Ventas
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
