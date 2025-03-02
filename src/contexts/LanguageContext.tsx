
import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define available languages
type Language = 'en' | 'es';

type Translations = {
  [key: string]: {
    [key in Language]: string;
  };
};

// Language context type
type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

// Create context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key) => key,
});

// Translations dictionary
const translations: Translations = {
  // Navigation
  'nav.howWeHelp': {
    en: 'How We Help',
    es: 'Cómo Ayudamos'
  },
  'nav.solutions': {
    en: 'Treasury & Finance Solutions',
    es: 'Soluciones de Tesorería y Finanzas'
  },
  'nav.experience': {
    en: 'Client Experience',
    es: 'Experiencia del Cliente'
  },
  'nav.resources': {
    en: 'Resources',
    es: 'Recursos'
  },
  'nav.about': {
    en: 'About Us',
    es: 'Sobre Nosotros'
  },
  'nav.contact': {
    en: 'Contact',
    es: 'Contacto'
  },
  'nav.requestDemo': {
    en: 'Request A Demo',
    es: 'Solicitar Demo'
  },
  'nav.login': {
    en: 'Login',
    es: 'Iniciar Sesión'
  },
  // Hero Section
  'hero.title': {
    en: 'Revolutionize Treasury Management with DataCloud AI',
    es: 'Revoluciona la Gestión de Tesorería con DataCloud AI'
  },
  'hero.subtitle': {
    en: 'Comprehensive solutions to centralize liquidity, optimize investments, and mitigate risks',
    es: 'Soluciones integrales para centralizar liquidez, optimizar inversiones y mitigar riesgos'
  },
  'hero.demo': {
    en: 'Request a Demo',
    es: 'Solicitar una Demo'
  },
  'hero.contact': {
    en: 'Contact Us Today',
    es: 'Contáctanos Hoy'
  },
  // Features Section
  'features.title': {
    en: 'Enterprise-Grade Treasury Management',
    es: 'Gestión de Tesorería de Nivel Empresarial'
  },
  'features.subtitle': {
    en: 'Powerful tools designed for modern finance teams',
    es: 'Herramientas potentes diseñadas para equipos financieros modernos'
  },
  'features.liquidity.title': {
    en: 'Liquidity & FX Management',
    es: 'Gestión de Liquidez y Divisas'
  },
  'features.liquidity.description': {
    en: 'Real-time monitoring, automated reconciliation, and predictive forecasting',
    es: 'Monitoreo en tiempo real, conciliación automatizada y pronóstico predictivo'
  },
  'features.investments.title': {
    en: 'Investments & Reporting',
    es: 'Inversiones y Reportes'
  },
  'features.investments.description': {
    en: 'Advanced analysis tools, customized dashboards, and exportable reports',
    es: 'Herramientas avanzadas de análisis, paneles personalizados e informes exportables'
  },
  'features.security.title': {
    en: 'Integrations & Security',
    es: 'Integraciones y Seguridad'
  },
  'features.security.description': {
    en: 'Robust API connectors, 2FA/KYC authentication, and regulatory compliance',
    es: 'Conectores API robustos, autenticación 2FA/KYC y cumplimiento normativo'
  },
  // How It Works
  'how.title': {
    en: 'How It Works',
    es: 'Cómo Funciona'
  },
  'how.subtitle': {
    en: 'Streamlined process for powerful financial management',
    es: 'Proceso optimizado para una potente gestión financiera'
  },
  'how.step1.title': {
    en: 'Connect Your Accounts',
    es: 'Conecta tus Cuentas'
  },
  'how.step1.description': {
    en: 'Securely connect all your financial accounts through our API or direct integrations',
    es: 'Conecta de forma segura todas tus cuentas financieras a través de nuestra API o integraciones directas'
  },
  'how.step2.title': {
    en: 'Centralize Liquidity',
    es: 'Centraliza la Liquidez'
  },
  'how.step2.description': {
    en: 'Get a unified view of all your funds across multiple accounts, currencies, and institutions',
    es: 'Obtén una visión unificada de todos tus fondos a través de múltiples cuentas, monedas e instituciones'
  },
  'how.step3.title': {
    en: 'Analyze & Make Decisions',
    es: 'Analiza y Toma Decisiones'
  },
  'how.step3.description': {
    en: 'Leverage AI-powered analytics to identify opportunities and optimize your treasury operations',
    es: 'Aprovecha el análisis impulsado por IA para identificar oportunidades y optimizar tus operaciones de tesorería'
  },
  'how.step4.title': {
    en: 'Execute & Track',
    es: 'Ejecuta y Monitorea'
  },
  'how.step4.description': {
    en: 'Execute transactions and track performance with real-time dashboards and automated reports',
    es: 'Ejecuta transacciones y monitorea el rendimiento con paneles en tiempo real e informes automatizados'
  },
  // Success Stories
  'success.title': {
    en: 'Success Stories',
    es: 'Casos de Éxito'
  },
  'success.subtitle': {
    en: 'See how leading organizations transform their treasury operations',
    es: 'Descubre cómo organizaciones líderes transforman sus operaciones de tesorería'
  },
  'success.manufacturing.title': {
    en: 'Global Manufacturing Corporation',
    es: 'Corporación Global de Manufactura'
  },
  'success.manufacturing.description': {
    en: 'Reduced cash forecasting time by 75% and improved working capital by $45M',
    es: 'Redujo el tiempo de previsión de efectivo en un 75% y mejoró el capital de trabajo en $45M'
  },
  'success.equity.title': {
    en: 'Private Equity Firm',
    es: 'Firma de Capital Privado'
  },
  'success.equity.description': {
    en: 'Consolidated 50+ banking relationships and achieved 23% ROI on treasury operations',
    es: 'Consolidó más de 50 relaciones bancarias y logró un ROI del 23% en operaciones de tesorería'
  },
  'success.fintech.title': {
    en: 'Fintech Startup',
    es: 'Startup Fintech'
  },
  'success.fintech.description': {
    en: 'Scaled operations 5x while maintaining the same treasury team size through automation',
    es: 'Escaló operaciones 5 veces manteniendo el mismo tamaño del equipo de tesorería mediante la automatización'
  },
  'success.cta': {
    en: 'View All Case Studies',
    es: 'Ver Todos los Casos de Estudio'
  },
  // CTA Section
  'cta.title': {
    en: 'Transform Your Financial Management',
    es: 'Transforma tu Gestión Financiera'
  },
  'cta.description': {
    en: 'Join hundreds of leading organizations already using DataCloud AI',
    es: 'Únete a cientos de organizaciones líderes que ya utilizan DataCloud AI'
  },
  'cta.demo': {
    en: 'Schedule a Demo',
    es: 'Programar una Demo'
  },
  'cta.contact': {
    en: 'Contact Sales',
    es: 'Contactar a Ventas'
  },
  // Footer
  'footer.solutions': {
    en: 'Solutions',
    es: 'Soluciones'
  },
  'footer.company': {
    en: 'Company',
    es: 'Empresa'
  },
  'footer.resources': {
    en: 'Resources',
    es: 'Recursos'
  },
  'footer.legal': {
    en: 'Legal',
    es: 'Legal'
  },
  'footer.copyright': {
    en: '© 2024 DataCloud AI. All rights reserved.',
    es: '© 2024 DataCloud AI. Todos los derechos reservados.'
  }
};

// Language Provider component
export const LanguageProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  // Translation function
  const t = (key: string): string => {
    if (!translations[key]) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
    return translations[key][language];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = () => useContext(LanguageContext);
