import { Palette, Eye, Sparkles, type LucideIcon, Code, Layers } from "lucide-react";

// --- Navigation Links ---
interface NavLink {
  href: string;
  label: string; // Changed to string for translation key
  accent: string; // CSS gradient string or color
}

export const defaultNavLinks: NavLink[] = [
  { href: "/", label: "common.home", accent: "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--secondary)) 100%)" },
  { href: "/repositories", label: "common.repositories", accent: "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--secondary)) 100%)" },
  { href: "/about", label: "common.about", accent: "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--secondary)) 100%)" },
  { href: "/contact", label: "common.contact", accent: "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--secondary)) 100%)" },
];

// --- Featured Disciplines (for Home page) ---
interface FeaturedDiscipline {
  icon: keyof typeof ICON_MAP; // Use keyof typeof ICON_MAP for type safety
  title: string;
  desc: string;
}

export const ICON_MAP: { [key: string]: LucideIcon } = {
  Palette: Palette,
  Eye: Eye,
  Sparkles: Sparkles,
  Code: Code,
  Layers: Layers,
  // Add other icons as needed
};

export const defaultFeaturedDisciplines: FeaturedDiscipline[] = [
  { icon: "Code", title: "Software Development", desc: "Building robust, scalable applications" },
  { icon: "Layers", title: "Product Strategy", desc: "Defining human-centered solutions" },
  { icon: "Sparkles", title: "Inclusive Design", desc: "Ensuring accessibility for all users" },
];

// --- Footer Links ---
interface FooterLink {
  name: string;
  href: string;
}

interface SiteLinks {
  ecosystem: FooterLink[];
  company: FooterLink[];
  legal: FooterLink[];
}

export const defaultFooterLinks: SiteLinks = {
  ecosystem: [
    { name: "Main Portal", href: "https://monynha.com" },
    { name: "Boteco Pro Platform", href: "https://boteco.pt" },
    { name: "Online Services Hub", href: "https://monynha.online" },
    { name: "Experimental Playground", href: "https://monynha.fun" },
    { name: "Developer & Tech Portal", "href": "https://monynha.tech" },
  ],
  company: [
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/legal/privacy-policy" },
    { name: "Terms of Service", href: "/legal/terms-of-service" },
  ],
};