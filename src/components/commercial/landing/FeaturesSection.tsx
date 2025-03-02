
import React from 'react';
import { motion } from 'framer-motion';
import { 
  LineChart, 
  BrainCircuit, 
  BarChart3, 
  Globe,
  CreditCard,
  ShieldCheck
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export const FeaturesSection = React.forwardRef<HTMLDivElement>((props, ref) => {
  const features = [
    {
      icon: <LineChart className="h-6 w-6 text-white" />,
      title: "Gestión de Efectivo en Tiempo Real",
      description: "Monitoree posiciones de efectivo globales en todos sus bancos y cuentas con paneles en tiempo real y conciliación automatizada."
    },
    {
      icon: <BrainCircuit className="h-6 w-6 text-white" />,
      title: "Previsión Impulsada por IA",
      description: "Aproveche algoritmos de aprendizaje automático para predecir flujos de efectivo con precisión sin precedentes y visibilidad hasta 180 días por adelantado."
    },
    {
      icon: <BarChart3 className="h-6 w-6 text-white" />,
      title: "Analítica de Inversiones",
      description: "Optimice su cartera de inversiones con análisis avanzados y modelado de escenarios para maximizar rendimientos dentro de sus parámetros de riesgo."
    },
    {
      icon: <Globe className="h-6 w-6 text-white" />,
      title: "Gestión Multi-Divisa",
      description: "Gestione riesgos de divisas con seguimiento de exposición en tiempo real, recomendaciones de cobertura y ejecución automatizada en 137 monedas."
    },
    {
      icon: <CreditCard className="h-6 w-6 text-white" />,
      title: "Pagos Integrados",
      description: "Optimice flujos de trabajo de pagos con conectividad multi-banco, flujos de aprobación avanzados y prevención de fraude potenciada por IA."
    },
    {
      icon: <ShieldCheck className="h-6 w-6 text-white" />,
      title: "Gestión de Riesgos",
      description: "Identifique y mitigue riesgos financieros con herramientas completas de monitoreo, análisis e informes que cumplen con estándares regulatorios."
    }
  ];

  return (
    <motion.div 
      ref={ref}
      style={{ opacity: 1 }}
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
              Funcionalidades Potentes para Tesorería Moderna
            </h2>
            <p className="text-xl text-blue-300 max-w-3xl mx-auto">
              Nuestro conjunto completo de herramientas ayuda a los ejecutivos financieros a tomar mejores decisiones con datos en tiempo real e insights de IA
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
  );
});

FeaturesSection.displayName = 'FeaturesSection';
