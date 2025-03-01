
import { Button } from "@/components/ui/button";
import { ExternalLink, Link2 } from "lucide-react";
import { FooterSection } from "./footer-section";
import { useState } from "react";

interface FooterLink {
  label: string;
  url: string;
}

interface FooterSectionData {
  title: string;
  links: FooterLink[];
}

interface AppFooterProps {
  company: boolean;
  legal: boolean;
  support: boolean;
  footerSections: FooterSectionData[];
  onToggleSection: (index: number) => void;
}

export function AppFooter({ company, legal, support, footerSections, onToggleSection }: AppFooterProps) {
  const [openSections, setOpenSections] = useState({
    company: company,
    legal: legal,
    support: support
  });

  const handleToggleSection = (section: 'company' | 'legal' | 'support') => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
    
    onToggleSection(section === 'company' ? 0 : section === 'legal' ? 1 : 2);
  };

  return (
    <footer className="mt-auto bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-t dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-primary dark:text-white">WYMU</h2>
            <p className="text-sm text-muted-foreground dark:text-gray-400">
              Simplifying your financial journey with secure and innovative digital banking solutions.
            </p>
            <div className="flex gap-4">
              <Button variant="ghost" size="sm">
                <ExternalLink className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Link2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {footerSections.map((section, index) => (
            <FooterSection
              key={section.title}
              title={section.title}
              isOpen={index === 0 ? openSections.company : index === 1 ? openSections.legal : openSections.support}
              onToggle={() => handleToggleSection(index === 0 ? 'company' : index === 1 ? 'legal' : 'support')}
              links={section.links.map(link => link.label)}
            />
          ))}
        </div>

        <div className="mt-8 pt-8 border-t dark:border-gray-700 text-center md:text-left">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground dark:text-gray-400">
            <p>© 2024 Wymu. All rights reserved. NMLS ID: 123456</p>
            <p className="md:text-right">
              Deposits are FDIC insured up to $250,000 per depositor
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
