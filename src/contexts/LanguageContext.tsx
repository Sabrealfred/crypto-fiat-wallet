
import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define available languages
export type Language = 'es' | 'en';

// Define the context value type
type LanguageContextType = {
  currentLanguage: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

// Create the context with a default value
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translations
const translations = {
  en: {
    // Header
    'nav.solutions': 'Solutions',
    'nav.success': 'Success Stories',
    'nav.contact': 'Contact',
    'nav.login': 'Login',
    
    // Hero Section
    'hero.title': 'Transform Treasury Management with DataCloud AI',
    'hero.subtitle': 'Comprehensive solutions to centralize liquidity, optimize investments and mitigate risks',
    'hero.cta.demo': 'Request a Demo',
    'hero.cta.contact': 'Contact Us',
    'hero.dashboard': 'Interactive Dashboard',
    
    // Features Section
    'features.title': 'Advanced Features',
    'features.subtitle': 'Cutting-edge solutions for financial professionals',
    'features.description': 'Our tools revolutionize how you manage your organization\'s financial resources',
    
    // Features Cards
    'features.liquidity.title': 'Liquidity & FX Management',
    'features.liquidity.subtitle': 'Comprehensive control of financial flows',
    'features.liquidity.point1': 'Real-time monitoring of cash positions',
    'features.liquidity.point2': 'Automated reconciliation with advanced AI',
    'features.liquidity.point3': 'Predictive forecasting to optimize resources',
    
    'features.investments.title': 'Investments & Reporting',
    'features.investments.subtitle': 'Advanced analysis and data visualization',
    'features.investments.point1': 'Customized dashboards for each profile',
    'features.investments.point2': 'Exportable reports in multiple formats',
    'features.investments.point3': 'Predictive analysis and backtesting tools',
    
    'features.security.title': 'Integrations & Security',
    'features.security.subtitle': 'Robust connections and advanced protection',
    'features.security.point1': 'Robust API connectors for multiple platforms',
    'features.security.point2': 'Complete 2FA authentication and KYC verification',
    'features.security.point3': 'Regulatory compliance with global standards',
    
    // How It Works Section
    'how.title': 'How It Works',
    'how.subtitle': 'A smooth and intuitive experience to transform your financial management',
    'how.step1.title': 'Connect your accounts',
    'how.step1.description': 'Integrate your banks, ERPs and financial systems through our secure and automated APIs.',
    'how.step2.title': 'Centralize your liquidity',
    'how.step2.description': 'Get complete visibility of your funds and positions in real time with customized dashboards.',
    'how.step3.title': 'Analyze and make decisions',
    'how.step3.description': 'Leverage our AI models to optimize cash management and mitigate financial risks.',
    
    // Case Studies Section
    'cases.title': 'Success Stories',
    'cases.subtitle': 'Transforming organizations',
    'cases.description': 'Learn how our clients have optimized their financial operations',
    
    // Case Study Tabs
    'cases.manufacturing': 'Manufacturing',
    'cases.privateEquity': 'Private Equity',
    'cases.fintech': 'Fintech',
    
    // Manufacturing Case
    'cases.manufacturing.title': 'Manufacturing Multinational',
    'cases.manufacturing.subtitle': 'Treasury optimization in 12 countries',
    'cases.manufacturing.description': 'A manufacturing company with operations in 12 countries managed to centralize its cash management, reduce transaction costs and improve the visibility of its global liquidity.',
    'cases.manufacturing.stat1.value': '42%',
    'cases.manufacturing.stat1.label': 'Reduction in transaction costs',
    'cases.manufacturing.stat2.value': '3.2M',
    'cases.manufacturing.stat2.label': 'Annual savings in FX operations',
    'cases.manufacturing.stat3.value': '89%',
    'cases.manufacturing.stat3.label': 'Improvement in forecasting accuracy',
    
    // PE Case
    'cases.pe.title': 'Private Equity Firm',
    'cases.pe.subtitle': 'Portfolio management with 24 companies',
    'cases.pe.description': 'A private equity firm implemented our solution to monitor the financial performance of its 24 portfolio companies, optimizing capital allocation.',
    'cases.pe.stat1.value': '56%',
    'cases.pe.stat1.label': 'Improvement in investment profitability',
    'cases.pe.stat2.value': '18x',
    'cases.pe.stat2.label': 'Reduction in reporting time',
    'cases.pe.stat3.value': '4.8M',
    'cases.pe.stat3.label': 'Working capital optimization',
    
    // Fintech Case
    'cases.fintech.title': 'Fintech Startup',
    'cases.fintech.subtitle': 'Scalability and international compliance',
    'cases.fintech.description': 'A rapidly growing fintech used our platform to scale its operations to 8 new markets, maintaining compliance and optimizing processes.',
    'cases.fintech.stat1.value': '320%',
    'cases.fintech.stat1.label': 'Growth in transaction volume',
    'cases.fintech.stat2.value': '99.99%',
    'cases.fintech.stat2.label': 'Uptime in payment processing',
    'cases.fintech.stat3.value': '8',
    'cases.fintech.stat3.label': 'New markets in 6 months',
    
    // CTA Section
    'cta.title': 'Transform your financial management with DataCloud AI innovation',
    'cta.subtitle': 'Request a personalized demo and discover how we can optimize your treasury operations',
    'cta.demo': 'Request a Demo',
    'cta.contact': 'Contact Us',
    'cta.security': 'Advanced security',
    'cta.support': '24/7 Support',
    'cta.global': 'Global coverage',
    
    // Footer
    'footer.solutions': 'Solutions',
    'footer.company': 'Company',
    'footer.legal': 'Legal',
    'footer.rights': 'All rights reserved.',
    
    // Solutions Footer Links
    'footer.solutions.treasury': 'Treasury Management',
    'footer.solutions.cash': 'Cash Management',
    'footer.solutions.risk': 'Risk Management',
    'footer.solutions.investments': 'Investments',
    'footer.solutions.fx': 'FX Operations',
    
    // Company Footer Links
    'footer.company.about': 'About Us',
    'footer.company.cases': 'Success Stories',
    'footer.company.press': 'Press',
    'footer.company.careers': 'Careers',
    'footer.company.contact': 'Contact',
    
    // Legal Footer Links
    'footer.legal.terms': 'Terms of Service',
    'footer.legal.privacy': 'Privacy Policy',
    'footer.legal.compliance': 'Compliance',
    'footer.legal.security': 'Security',
  },
  es: {
    // Header
    'nav.solutions': 'Soluciones',
    'nav.success': 'Casos de Éxito',
    'nav.contact': 'Contacto',
    'nav.login': 'Iniciar Sesión',
    
    // Hero Section
    'hero.title': 'Revoluciona la gestión de tesorería con DataCloud AI',
    'hero.subtitle': 'Soluciones integrales para centralizar tu liquidez, optimizar inversiones y mitigar riesgos',
    'hero.cta.demo': 'Solicitar Demo',
    'hero.cta.contact': 'Contáctanos',
    'hero.dashboard': 'Dashboard Interactivo',
    
    // Features Section
    'features.title': 'Características Avanzadas',
    'features.subtitle': 'Soluciones de vanguardia para profesionales financieros',
    'features.description': 'Nuestras herramientas revolucionan la forma en que gestionas los recursos financieros de tu organización',
    
    // Features Cards
    'features.liquidity.title': 'Gestión de Liquidez y FX',
    'features.liquidity.subtitle': 'Control integral de flujos financieros',
    'features.liquidity.point1': 'Monitoreo en tiempo real de posiciones de efectivo',
    'features.liquidity.point2': 'Conciliación automatizada con IA avanzada',
    'features.liquidity.point3': 'Forecasting predictivo para optimizar recursos',
    
    'features.investments.title': 'Inversiones y Reporting',
    'features.investments.subtitle': 'Análisis avanzado y visualización de datos',
    'features.investments.point1': 'Dashboards personalizados para cada perfil',
    'features.investments.point2': 'Reportes exportables en múltiples formatos',
    'features.investments.point3': 'Herramientas de análisis predictivo y backtesting',
    
    'features.security.title': 'Integraciones y Seguridad',
    'features.security.subtitle': 'Conexiones robustas y protección avanzada',
    'features.security.point1': 'Conectores API robustos para múltiples plataformas',
    'features.security.point2': 'Autenticación 2FA y verificación KYC completa',
    'features.security.point3': 'Cumplimiento normativo con estándares globales',
    
    // How It Works Section
    'how.title': 'Cómo Funciona',
    'how.subtitle': 'Una experiencia fluida e intuitiva para transformar tu gestión financiera',
    'how.step1.title': 'Conecta tus cuentas',
    'how.step1.description': 'Integra tus bancos, ERPs y sistemas financieros a través de nuestras APIs seguras y automatizadas.',
    'how.step2.title': 'Centraliza tu liquidez',
    'how.step2.description': 'Obtén visibilidad completa de tus fondos y posiciones en tiempo real con dashboards personalizados.',
    'how.step3.title': 'Analiza y toma decisiones',
    'how.step3.description': 'Aprovecha nuestros modelos de IA para optimizar la gestión de efectivo y mitigar riesgos financieros.',
    
    // Case Studies Section
    'cases.title': 'Casos de Éxito',
    'cases.subtitle': 'Transformando organizaciones',
    'cases.description': 'Conoce cómo nuestros clientes han optimizado su operación financiera',
    
    // Case Study Tabs
    'cases.manufacturing': 'Manufactura',
    'cases.privateEquity': 'Private Equity',
    'cases.fintech': 'Fintech',
    
    // Manufacturing Case
    'cases.manufacturing.title': 'Multinacional de Manufactura',
    'cases.manufacturing.subtitle': 'Optimización de tesorería en 12 países',
    'cases.manufacturing.description': 'Una empresa manufacturera con operaciones en 12 países logró centralizar su gestión de efectivo, reducir costos de transacción y mejorar la visibilidad de su liquidez global.',
    'cases.manufacturing.stat1.value': '42%',
    'cases.manufacturing.stat1.label': 'Reducción de costos de transacción',
    'cases.manufacturing.stat2.value': '3.2M',
    'cases.manufacturing.stat2.label': 'Ahorro anual en operaciones FX',
    'cases.manufacturing.stat3.value': '89%',
    'cases.manufacturing.stat3.label': 'Mejora en precisión de forecasting',
    
    // PE Case
    'cases.pe.title': 'Firma de Private Equity',
    'cases.pe.subtitle': 'Gestión de portafolio con 24 empresas',
    'cases.pe.description': 'Una firma de private equity implementó nuestra solución para monitorear el desempeño financiero de sus 24 empresas en cartera, optimizando la asignación de capital.',
    'cases.pe.stat1.value': '56%',
    'cases.pe.stat1.label': 'Mejora en rentabilidad de inversiones',
    'cases.pe.stat2.value': '18x',
    'cases.pe.stat2.label': 'Reducción en tiempo de reporting',
    'cases.pe.stat3.value': '4.8M',
    'cases.pe.stat3.label': 'Optimización de capital de trabajo',
    
    // Fintech Case
    'cases.fintech.title': 'Fintech Startup',
    'cases.fintech.subtitle': 'Escalabilidad y compliance internacional',
    'cases.fintech.description': 'Una fintech en rápido crecimiento utilizó nuestra plataforma para escalar sus operaciones a 8 nuevos mercados, manteniendo compliance y optimizando procesos.',
    'cases.fintech.stat1.value': '320%',
    'cases.fintech.stat1.label': 'Crecimiento en volumen de transacciones',
    'cases.fintech.stat2.value': '99.99%',
    'cases.fintech.stat2.label': 'Uptime en procesamiento de pagos',
    'cases.fintech.stat3.value': '8',
    'cases.fintech.stat3.label': 'Nuevos mercados en 6 meses',
    
    // CTA Section
    'cta.title': 'Transforma tu gestión financiera con la innovación de DataCloud AI',
    'cta.subtitle': 'Solicita una demo personalizada y descubre cómo podemos optimizar tus operaciones de tesorería',
    'cta.demo': 'Solicitar Demo',
    'cta.contact': 'Contáctanos',
    'cta.security': 'Seguridad avanzada',
    'cta.support': 'Soporte 24/7',
    'cta.global': 'Cobertura global',
    
    // Footer
    'footer.solutions': 'Soluciones',
    'footer.company': 'Empresa',
    'footer.legal': 'Legal',
    'footer.rights': 'Todos los derechos reservados.',
    
    // Solutions Footer Links
    'footer.solutions.treasury': 'Treasury Management',
    'footer.solutions.cash': 'Cash Management',
    'footer.solutions.risk': 'Gestión de Riesgos',
    'footer.solutions.investments': 'Inversiones',
    'footer.solutions.fx': 'Operaciones FX',
    
    // Company Footer Links
    'footer.company.about': 'Sobre Nosotros',
    'footer.company.cases': 'Casos de Éxito',
    'footer.company.press': 'Prensa',
    'footer.company.careers': 'Carreras',
    'footer.company.contact': 'Contacto',
    
    // Legal Footer Links
    'footer.legal.terms': 'Términos de Servicio',
    'footer.legal.privacy': 'Política de Privacidad',
    'footer.legal.compliance': 'Cumplimiento',
    'footer.legal.security': 'Seguridad',
  }
};

// Language Provider component
export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('es');

  const setLanguage = (lang: Language) => {
    setCurrentLanguage(lang);
  };

  // Translation function
  const t = (key: string): string => {
    return translations[currentLanguage][key as keyof typeof translations[typeof currentLanguage]] || key;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook to use the language context
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
