
import { Button } from "@/components/ui/button";
import { ChevronUp, ChevronDown } from "lucide-react";

interface FooterSectionProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  links: string[];
}

export function FooterSection({ title, isOpen, onToggle, links }: FooterSectionProps) {
  return (
    <div>
      <Button
        variant="ghost"
        className="flex items-center justify-between w-full mb-2 md:mb-4"
        onClick={onToggle}
      >
        <span className="font-semibold">{title}</span>
        {isOpen ? (
          <ChevronUp className="h-4 w-4 md:hidden" />
        ) : (
          <ChevronDown className="h-4 w-4 md:hidden" />
        )}
      </Button>
      <div className={`space-y-2 ${isOpen ? 'block' : 'hidden md:block'}`}>
        {links.map((link) => (
          <Button 
            key={link}
            variant="link" 
            className="text-muted-foreground hover:text-primary dark:text-gray-400 dark:hover:text-white"
          >
            {link}
          </Button>
        ))}
      </div>
    </div>
  );
}
