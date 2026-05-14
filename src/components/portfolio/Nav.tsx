import { Link } from "@tanstack/react-router";
import { useI18n } from "../../lib/i18n";
import { useTheme } from "../../lib/theme";
import { Moon, Sun, Languages } from "lucide-react";
import { useEffect, useState } from "react";

export function Nav() {
  const { t, lang, setLang } = useI18n();
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Update scroll state to trigger background transparency changes
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const items = [
    { href: "#expertise", label: t("nav.expertise") },
    { href: "#experience", label: t("nav.experience") },
    { href: "#work", label: t("nav.work") },
    { href: "#certs", label: t("nav.certs") },
    { href: "#contact", label: t("nav.contact") },
  ];

  return (
    <header 
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-background/85 backdrop-blur-md border-b border-border/60" 
          : "bg-transparent border-b border-transparent"
      }`} 
      style={{ boxShadow: scrolled ? "var(--shadow-card)" : "none" }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="size-8 rounded-lg gradient-emerald grid place-items-center font-display font-bold text-primary-foreground shadow-elegant">
            L
          </div>
          <span className="font-display font-semibold tracking-tight">Luis Meléndez</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {items.map(i => (
            <a 
              key={i.href} 
              href={i.href} 
              className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md"
            >
              {i.label}
            </a>
          ))}
        </nav>

        {/* Action Buttons: Language & Theme Toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setLang(lang === "en" ? "es" : "en")}
            className="h-9 px-3 text-xs font-mono uppercase tracking-wider rounded-md border border-border hover:border-primary/50 hover:text-primary transition-colors flex items-center gap-1.5"
            aria-label="Toggle language"
          >
            <Languages className="size-3.5" /> {lang}
          </button>

          <button
            onClick={toggle}
            className="size-9 rounded-md border border-border hover:border-primary/50 hover:text-primary transition-colors grid place-items-center"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>
        </div>
      </div>
    </header>
  );
}