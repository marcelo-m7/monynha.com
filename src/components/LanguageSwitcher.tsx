import { useTranslation } from 'react-i18next';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LanguageSwitcherProps {
  className?: string;
  isIconOnly?: boolean; // New prop to control icon-only display
}

export const LanguageSwitcher = ({ className, isIconOnly = false }: LanguageSwitcherProps) => {
  const { i18n, t } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    document.documentElement.lang = lng; // Update HTML lang attribute
  };

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'pt-BR', name: 'Português (BR)' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
  ];

  return (
    <Select value={i18n.language} onValueChange={changeLanguage}>
      <SelectTrigger className={cn(
        "w-fit min-w-0 border-border/70 bg-background/70 backdrop-blur-xl",
        "flex items-center justify-center",
        isIconOnly && "w-10 h-10 p-0 rounded-md", // Changed from rounded-full to rounded-md
        className
      )}>
        <Globe className="h-4 w-4 text-muted-foreground" />
        {!isIconOnly && ( // Conditionally render SelectValue based on isIconOnly prop
          <SelectValue placeholder={t("common.selectLanguage")} className="ml-2" />
        )}
      </SelectTrigger>
      <SelectContent className="bg-surface-1 border-border/70">
        {languages.map((lang) => (
          <SelectItem key={lang.code} value={lang.code}>
            {lang.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

LanguageSwitcher.displayName = "LanguageSwitcher";