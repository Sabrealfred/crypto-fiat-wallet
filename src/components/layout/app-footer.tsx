
import { Button } from "@/components/ui/button";
import { ExternalLink, Link2 } from "lucide-react";
import { FooterSection } from "./footer-section";

interface AppFooterProps {
  footerSections: {
    company: boolean;
    legal: boolean;
    support: boolean;
  };
  onToggleSection: (section: 'company' | 'legal' | 'support') => void;
}

export function AppFooter({ footerSections, onToggleSection }: AppFooterProps) {
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

          <FooterSection
            title="Company"
            isOpen={footerSections.company}
            onToggle={() => onToggleSection('company')}
            links={["About Us", "Careers", "Press", "Blog"]}
          />

          <FooterSection
            title="Legal"
            isOpen={footerSections.legal}
            onToggle={() => onToggleSection('legal')}
            links={["Privacy Policy", "Terms of Service", "Cookie Policy", "Licenses"]}
          />

          <FooterSection
            title="Support"
            isOpen={footerSections.support}
            onToggle={() => onToggleSection('support')}
            links={["Help Center", "Contact Us", "Security", "Status"]}
          />
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
