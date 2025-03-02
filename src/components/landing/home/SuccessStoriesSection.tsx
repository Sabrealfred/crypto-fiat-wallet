
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Briefcase, 
  BarChart3, 
  Shield,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export const SuccessStoriesSection: React.FC<{ reference: React.RefObject<HTMLDivElement> }> = ({ reference }) => {
  const { t } = useLanguage();

  const cases = [
    {
      icon: <Briefcase className="h-10 w-10 mb-6" />,
      title: "Corporación Global de Manufactura",
      description: "Redujo el amortiguador de efectivo en un 30% y mejoró la precisión de la previsión al 95%, liberando $120M en capital de trabajo",
      link: "manufacturing"
    },
    {
      icon: <BarChart3 className="h-10 w-10 mb-6" />,
      title: "Firma Líder de Capital Privado",
      description: "Automatizó el 85% de las operaciones de tesorería en 45 empresas de cartera, ahorrando $3.2M anuales en costos operativos",
      link: "equity"
    },
    {
      icon: <Shield className="h-10 w-10 mb-6" />,
      title: "Empresa Multinacional Fintech",
      description: "Logró visibilidad en tiempo real en 24 países y 37 monedas, reduciendo los costos de cobertura de divisas en un 15%",
      link: "fintech"
    }
  ];

  return (
    <section 
      ref={reference} 
      className="py-24 relative overflow-hidden bg-gradient-to-b from-[#0A0E17] to-[#131720]"
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-on-scroll">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
            Empresas que Transformaron su Tesorería
          </h2>
          <p className="text-xl text-gray-300">
            Descubra cómo organizaciones líderes han revolucionado su gestión financiera con nuestra plataforma
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cases.map((item, index) => (
            <motion.div 
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card-gradient p-8 transform transition-all duration-500 hover:scale-105 animate-on-scroll"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {item.icon}
              <h3 className="text-xl font-semibold mb-3">
                {item.title}
              </h3>
              <p className="text-gray-100 mb-6">
                {item.description}
              </p>
              <div className="mt-auto">
                <Link to={`/client-experience#${item.link}`} className="text-white/90 flex items-center text-sm hover:text-white transition-colors group">
                  <span>Leer caso de estudio</span>
                  <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-12 animate-on-scroll">
          <Link to="/client-experience">
            <Button 
              size="lg" 
              variant="outline" 
              className="border-blue-500 text-blue-400 hover:bg-blue-950 px-8"
            >
              Ver Todos Los Casos De Éxito
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
