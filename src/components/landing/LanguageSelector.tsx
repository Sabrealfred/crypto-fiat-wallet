
import React from 'react';
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/contexts/LanguageContext';

export const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center space-x-2">
      <Button
        variant={language === 'en' ? 'default' : 'ghost'}
        size="sm"
        className="text-xs font-medium"
        onClick={() => setLanguage('en')}
      >
        EN
      </Button>
      <span className="text-gray-400">|</span>
      <Button
        variant={language === 'es' ? 'default' : 'ghost'}
        size="sm"
        className="text-xs font-medium"
        onClick={() => setLanguage('es')}
      >
        ES
      </Button>
    </div>
  );
};
