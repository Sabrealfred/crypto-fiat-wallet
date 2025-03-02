
import React from 'react';
import { Briefcase } from 'lucide-react';

export const FooterSection: React.FC = () => {
  return (
    <footer className="bg-blue-950 text-blue-300 py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-5 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <Briefcase className="h-7 w-7 text-blue-400 mr-3" />
              <h3 className="text-xl font-bold text-white">Datacloud AI</h3>
            </div>
            <p className="mb-6 text-blue-400">
              Enterprise-grade treasury management platform powered by artificial intelligence and machine learning
            </p>
            <div className="flex space-x-4">
              {[
                { name: 'Twitter', icon: 'svg-path' },
                { name: 'LinkedIn', icon: 'svg-path' },
                { name: 'Facebook', icon: 'svg-path' },
                { name: 'GitHub', icon: 'svg-path' }
              ].map((social) => (
                <a 
                  key={social.name}
                  href="#" 
                  className="w-10 h-10 rounded-full bg-blue-900/50 flex items-center justify-center hover:bg-blue-800 transition-colors"
                  aria-label={social.name}
                >
                  <span className="sr-only">{social.name}</span>
                  <div className="w-5 h-5 bg-blue-400 rounded-sm"></div>
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Solutions</h4>
            <ul className="space-y-2">
              {[
                'Treasury Management', 
                'Cash Forecasting', 
                'Risk Management', 
                'Investment Portfolio'
              ].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-white transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {[
                'About Us', 
                'Leadership Team',
                'Careers', 
                'Press',
                'Contact'
              ].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-white transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              {[
                'Documentation', 
                'API Reference', 
                'Case Studies',
                'Webinars', 
                'Blog'
              ].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-white transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-blue-900 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p>© 2024 Datacloud AI. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-sm hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-sm hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="text-sm hover:text-white transition-colors">Cookie Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
