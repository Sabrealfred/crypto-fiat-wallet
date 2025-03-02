
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const CTASection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-r from-blue-900 to-purple-900">
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      
      {/* Animated shapes */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="container mx-auto px-4 relative z-10"
      >
        <div className="max-w-3xl mx-auto text-center animate-on-scroll">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            {t('cta.title')}
          </h2>
          <p className="text-xl text-blue-100 mb-10">
            {t('cta.description')}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/request-demo">
              <Button 
                size="lg" 
                className="bg-white text-blue-900 hover:bg-gray-100 px-8 group"
              >
                {t('cta.demo')}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white/10 px-8"
              >
                {t('cta.contact')}
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
