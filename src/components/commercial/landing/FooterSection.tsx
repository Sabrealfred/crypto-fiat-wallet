
import React from 'react';
import { Briefcase, Twitter, Linkedin, Github, Facebook, MapPin, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export const FooterSection: React.FC = () => {
  const year = new Date().getFullYear();
  
  const footerLinks = {
    "Soluciones": [
      { name: "Tesorería Corporativa", url: "#" },
      { name: "Gestión de Inversiones", url: "#" },
      { name: "Gestión de Divisas", url: "#" },
      { name: "Gestión de Riesgos", url: "#" },
      { name: "Analítica Avanzada", url: "#" }
    ],
    "Empresa": [
      { name: "Sobre Nosotros", url: "#" },
      { name: "Equipo", url: "#" },
      { name: "Clientes", url: "#" },
      { name: "Socios", url: "#" },
      { name: "Careers", url: "#" }
    ],
    "Recursos": [
      { name: "Centro de Recursos", url: "#" },
      { name: "Blog", url: "#" },
      { name: "Webinars", url: "#" },
      { name: "Documentación", url: "#" },
      { name: "API", url: "#" }
    ],
    "Legal": [
      { name: "Términos de Servicio", url: "#" },
      { name: "Política de Privacidad", url: "#" },
      { name: "Seguridad", url: "#" },
      { name: "Cumplimiento", url: "#" }
    ]
  };

  return (
    <footer className="bg-gradient-to-b from-blue-950 to-[#0A0E17] pt-20 pb-10 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      {/* Background orbs */}
      <div className="absolute -left-32 top-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
      <div className="absolute -right-32 bottom-1/4 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center mb-6">
              <Briefcase className="h-8 w-8 text-blue-400 mr-3" />
              <div>
                <h2 className="text-xl font-bold text-white">Datacloud AI</h2>
                <p className="text-sm text-blue-300">Gestión de Tesorería Empresarial</p>
              </div>
            </div>
            <p className="text-gray-400 mb-6 pr-12">
              Proveedor líder de soluciones fintech de próxima generación para corporaciones globales y empresas medianas, unificando datos financieros y proporcionando análisis en tiempo real.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Github size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Facebook size={20} />
              </a>
            </div>
          </div>
          
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-white font-semibold mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map(link => (
                  <li key={link.name}>
                    <a href={link.url} className="text-gray-400 hover:text-blue-400 transition-colors text-sm">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="border-t border-blue-900/50 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-col md:flex-row gap-4 mb-4 md:mb-0">
              <div className="flex items-center text-sm text-gray-400">
                <MapPin size={16} className="mr-2 text-blue-400" />
                <span>Paseo de la Reforma 222, CDMX</span>
              </div>
              <div className="flex items-center text-sm text-gray-400">
                <Phone size={16} className="mr-2 text-blue-400" />
                <span>+52 55 1234 5678</span>
              </div>
              <div className="flex items-center text-sm text-gray-400">
                <Mail size={16} className="mr-2 text-blue-400" />
                <span>info@datacloud.ai</span>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              &copy; {year} Datacloud AI. Todos los derechos reservados.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
