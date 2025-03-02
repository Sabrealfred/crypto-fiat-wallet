
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Key,
  Globe,
  PieChart,
  Zap
} from 'lucide-react';
import { motion } from 'framer-motion';

export const HowItWorksSection: React.FC<{ reference: React.RefObject<HTMLDivElement> }> = ({ reference }) => {
  const { t } = useLanguage();

  const steps = [
    {
      title: "Conecte Su Ecosistema Financiero",
      description: "Integración perfecta con su infraestructura bancaria existente, ERPs y sistemas financieros a través de nuestras conexiones API seguras",
      icon: <Key className="h-7 w-7 text-white" />,
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80",
      alt: "Conectar Cuentas"
    },
    {
      title: "Centralice la Liquidez Global",
      description: "Obtenga visibilidad instantánea de las posiciones de efectivo en todas las entidades, regiones y monedas en un panel unificado",
      icon: <Globe className="h-7 w-7 text-white" />,
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80",
      alt: "Centralización de Liquidez",
      reverse: true
    },
    {
      title: "Aproveche la Analítica Potenciada por IA",
      description: "Nuestros algoritmos de aprendizaje automático analizan sus datos financieros para proporcionar perspectivas accionables, pronósticos y recomendaciones",
      icon: <PieChart className="h-7 w-7 text-white" />,
      image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80",
      alt: "Análisis de Datos"
    },
    {
      title: "Optimice Operaciones y Ejecute Estrategias",
      description: "Implemente estrategias de inversión, ejecute pagos, gestione exposición a divisas y realice seguimiento del rendimiento en tiempo real",
      icon: <Zap className="h-7 w-7 text-white" />,
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80",
      alt: "Ejecución y Seguimiento",
      reverse: true
    }
  ];

  return (
    <section 
      ref={reference} 
      className="py-24 relative overflow-hidden bg-[#0A0E17]"
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-on-scroll">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
            Cómo Transformamos su Tesorería
          </h2>
          <p className="text-xl text-gray-300">
            Un enfoque completo para modernizar todas las operaciones de su departamento financiero
          </p>
        </div>
        
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500 hidden md:block"></div>
          
          <div className="space-y-16 md:space-y-32 relative z-10">
            {steps.map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                viewport={{ once: true }}
                className={`flex flex-col ${step.reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center animate-on-scroll`}
              >
                <div className={`md:w-1/2 mb-8 md:mb-0 ${step.reverse ? 'md:pl-12 text-center md:text-left' : 'md:pr-12 text-center md:text-right'}`}>
                  <h3 className="text-2xl font-semibold text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-300">
                    {step.description}
                  </p>
                </div>
                <div className="md:w-0 flex justify-center">
                  <div className={`h-16 w-16 rounded-full bg-${index % 3 === 0 ? 'blue' : index % 3 === 1 ? 'purple' : 'cyan'}-600 flex items-center justify-center shadow-lg shadow-${index % 3 === 0 ? 'blue' : index % 3 === 1 ? 'purple' : 'cyan'}-500/20 z-20`}>
                    {step.icon}
                  </div>
                </div>
                <div className={`md:w-1/2 ${step.reverse ? 'md:pr-12' : 'md:pl-12'}`}>
                  <div className="glass-card p-4 shadow-lg transform transition-all duration-500 hover:scale-105">
                    <img 
                      src={step.image}
                      alt={step.alt}
                      className="rounded-lg w-full h-auto"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
