
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Briefcase, ArrowRight, GanttChartSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface NavigationBarProps {
  isScrolled: boolean;
}

export const NavigationBar: React.FC<NavigationBarProps> = ({ isScrolled }) => {
  const navigate = useNavigate();

  const navItems = [
    { name: "Soluciones", tooltip: "Explore nuestras soluciones de tesorería" },
    { name: "Casos de Éxito", tooltip: "Vea cómo nuestros clientes tienen éxito con nosotros" },
    { name: "Recursos", tooltip: "Acceda a guías, webinars y documentación" },
    { name: "Sobre Nosotros", tooltip: "Conozca nuestra empresa y misión" }
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-blue-950/90 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <Briefcase className="h-8 w-8 text-blue-400 mr-3" />
            <div>
              <h1 className="text-xl font-bold text-white">Datacloud AI</h1>
              <p className="text-xs text-blue-300">Gestión de Tesorería Empresarial</p>
            </div>
          </motion.div>

          <div className="hidden md:flex space-x-6 items-center">
            <TooltipProvider>
              {navItems.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                >
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <a 
                        href="#" 
                        className="text-blue-200 hover:text-white transition-colors relative group"
                      >
                        {item.name}
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
                      </a>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="bg-blue-800 border-blue-700">
                      <p>{item.tooltip}</p>
                    </TooltipContent>
                  </Tooltip>
                </motion.div>
              ))}
            </TooltipProvider>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <Button 
                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium px-5 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => navigate("/commercial/dashboard")}
              >
                Iniciar Sesión 
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>

          <div className="md:hidden">
            <Button variant="ghost" className="text-white">
              <GanttChartSquare className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
