
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { 
  Globe, 
  Shield, 
  BookOpen, 
  LifeBuoy, 
  Mail, 
  Phone, 
  MapPin,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  Youtube
} from 'lucide-react';

export const LandingFooter = () => {
  const { t } = useLanguage();

  const solutionsLinks = [
    { label: 'Treasury Management', path: '/solutions#treasury' },
    { label: 'Cash & Liquidity', path: '/solutions#cash' },
    { label: 'Risk Management', path: '/solutions#risk' },
    { label: 'Investment Management', path: '/solutions#investment' },
    { label: 'FX Operations', path: '/solutions#fx' },
  ];

  const companyLinks = [
    { label: t('nav.about'), path: '/about' },
    { label: 'Leadership', path: '/about#leadership' },
    { label: 'Careers', path: '/careers' },
    { label: 'Partners', path: '/partners' },
    { label: 'News', path: '/news' },
  ];

  const resourcesLinks = [
    { label: 'Blog', path: '/resources#blog' },
    { label: 'Webinars', path: '/resources#webinars' },
    { label: 'White Papers', path: '/resources#whitepapers' },
    { label: 'Case Studies', path: '/resources#casestudies' },
    { label: 'API Documentation', path: '/developers/dashboard' },
  ];

  const legalLinks = [
    { label: 'Terms of Service', path: '/legal/terms' },
    { label: 'Privacy Policy', path: '/legal/privacy' },
    { label: 'Security', path: '/legal/security' },
    { label: 'Compliance', path: '/legal/compliance' },
  ];

  return (
    <footer className="bg-[#0D1117] border-t border-gray-800">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center mb-6">
              <div className="h-10 w-10 rounded-lg bg-blue-600 flex items-center justify-center mr-3">
                <span className="text-white font-bold text-xl">D</span>
              </div>
              <span className="text-white font-bold text-xl">DataCloud AI</span>
            </Link>
            <p className="text-gray-400 mb-4 max-w-md">
              Enterprise financial intelligence platform for modern treasury management, helping organizations centralize liquidity, optimize investments, and mitigate risks.
            </p>
            <div className="flex space-x-4 mb-6">
              <Button variant="ghost" size="icon" className="rounded-full bg-gray-800 hover:bg-blue-900 text-white">
                <Linkedin size={18} />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full bg-gray-800 hover:bg-blue-900 text-white">
                <Twitter size={18} />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full bg-gray-800 hover:bg-blue-900 text-white">
                <Facebook size={18} />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full bg-gray-800 hover:bg-blue-900 text-white">
                <Instagram size={18} />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full bg-gray-800 hover:bg-blue-900 text-white">
                <Youtube size={18} />
              </Button>
            </div>
            <div className="space-y-3">
              <div className="flex items-start">
                <Mail className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                <span className="text-gray-300">contact@datacloud.ai</span>
              </div>
              <div className="flex items-start">
                <Phone className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                <span className="text-gray-300">+1 (800) 555-1234</span>
              </div>
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                <span className="text-gray-300">100 Financial District, New York, NY 10004</span>
              </div>
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">{t('footer.solutions')}</h3>
            <ul className="space-y-2">
              {solutionsLinks.map((link, index) => (
                <li key={index}>
                  <Link to={link.path} className="text-gray-400 hover:text-blue-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">{t('footer.company')}</h3>
            <ul className="space-y-2">
              {companyLinks.map((link, index) => (
                <li key={index}>
                  <Link to={link.path} className="text-gray-400 hover:text-blue-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">{t('footer.resources')}</h3>
            <ul className="space-y-2">
              {resourcesLinks.map((link, index) => (
                <li key={index}>
                  <Link to={link.path} className="text-gray-400 hover:text-blue-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            {t('footer.copyright')}
          </p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {legalLinks.map((link, index) => (
              <Link key={index} to={link.path} className="text-gray-500 hover:text-blue-400 text-sm">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
