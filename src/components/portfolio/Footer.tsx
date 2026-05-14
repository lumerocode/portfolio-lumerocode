import { useI18n } from "../../lib/i18n"; // Corrected relative path

/**
 * Footer Component
 * Displays the copyright information and tech stack credit.
 */
export function Footer() {
  const { t } = useI18n();
  
  return (
    <footer className="border-t border-border/60 py-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Branding & Copyright */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="size-6 rounded-md gradient-emerald grid place-items-center text-[10px] font-display font-bold text-primary-foreground">
            L
          </div>
          <span>
            © {new Date().getFullYear()} Luis Meléndez. {t("footer.rights")}
          </span>
        </div>

        {/* Tech Stack Credit */}
        <div className="text-xs font-mono text-muted-foreground">
          {t("footer.builtWith")}
        </div>
      </div>
    </footer>
  );
}