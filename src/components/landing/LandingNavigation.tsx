
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageSelector } from './LanguageSelector';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronDown } from 'lucide-react';

export const LandingNavigation = () => {
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: t('nav.howWeHelp'), path: '/how-we-help' },
    { label: t('nav.solutions'), path: '/solutions' },
    { label: t('nav.experience'), path: '/client-experience' },
    { label: t('nav.resources'), path: '/resources' },
    { label: t('nav.about'), path: '/about' },
    { label: t('nav.contact'), path: '/contact' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled 
          ? 'bg-black/80 backdrop-blur-md border-b border-gray-800 py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="h-10 w-10 rounded-lg bg-blue-600 flex items-center justify-center mr-3">
              <span className="text-white font-bold text-xl">D</span>
            </div>
            <span className="text-white font-bold text-xl">DataCloud AI</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 text-sm font-medium transition-colors hover:text-blue-400 ${
                  location.pathname === link.path ? 'text-blue-400' : 'text-white/80'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <LanguageSelector />
            <Link to="/auth">
              <Button variant="ghost" className="text-white hover:text-blue-400">
                {t('nav.login')}
              </Button>
            </Link>
            <Link to="/request-demo">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                {t('nav.requestDemo')}
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center space-x-4">
            <LanguageSelector />
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-gray-900/95 backdrop-blur-lg border-b border-gray-800">
          <div className="container mx-auto px-4 py-3">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 text-sm font-medium transition-colors rounded-md ${
                    location.pathname === link.path 
                      ? 'bg-blue-900/50 text-blue-400' 
                      : 'text-white hover:bg-gray-800'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col space-y-2 pt-2 border-t border-gray-800">
                <Link to="/auth" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start text-white">
                    {t('nav.login')}
                  </Button>
                </Link>
                <Link to="/request-demo" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    {t('nav.requestDemo')}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
