import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "../../lib/i18n"; 
import { SectionHeader } from "./Expertise";
import { Award, X, Download } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog"; 
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"; 

import { certs, certCategories, getCertYear, type Cert, type CertCategory } from "../../data/certifications";

/**
 * Graphic component to render a certificate visual representation inside the modal
 */
function CertificateGraphic({ cert }: { cert: Cert }) {
  const { t, lang } = useI18n();
  const currentTitle = cert.t[lang as 'es' | 'en'] || cert.t.es;

  return (
    <div className="relative w-full aspect-[1.4/1] rounded-xl overflow-hidden border border-border bg-gradient-to-br from-card via-background to-card">
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="absolute -top-20 -right-20 size-72 rounded-full gradient-emerald opacity-20 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 size-72 rounded-full gradient-emerald opacity-10 blur-3xl" />
      <div className="relative h-full flex flex-col items-center justify-center text-center px-8 py-10">
        <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-emerald">{t("cert.completion")}</div>
        <div className="mt-3 text-xs text-muted-foreground">{t("cert.certifies")}</div>
        <div className="mt-1 font-display text-2xl sm:text-3xl font-semibold">Luis Meléndez Rodríguez</div>
        <div className="mt-3 text-xs text-muted-foreground">{t("cert.completed")}</div>
        <div className="mt-2 font-display text-xl sm:text-2xl gradient-text font-semibold max-w-md leading-tight">
          {currentTitle}
        </div>
        <div className="mt-6 flex items-center gap-6 text-xs font-mono text-muted-foreground">
          <span>{cert.o}</span>
          <span className="size-1 rounded-full bg-border" />
          <span>{cert.date}</span>
        </div>
        <div className="mt-6 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald/40 bg-emerald/10 text-[10px] font-mono uppercase tracking-wider text-emerald">
          <Award className="size-3" /> {t("cert.verified")}
        </div>
      </div>
    </div>
  );
}

type YearFilter = number | "all";
type CatFilter = CertCategory | "all";

/**
 * Main Certifications gallery component with dynamic filtering
 */
export function Certifications() {
  const { t, lang } = useI18n();
  const [expanded, setExpanded] = useState(false);
  const [open, setOpen] = useState<Cert | null>(null);
  const [year, setYear] = useState<YearFilter>("all");
  const [cat, setCat] = useState<CatFilter>("all");

  const years = useMemo(() => {
    const arr: number[] = [];
    for (let y = 2026; y >= 2020; y--) arr.push(y);
    return arr;
  }, []);

  const filtered = useMemo(() => {
    return certs.filter(c => {
      const yOk = year === "all" || getCertYear(c) === year;
      
      // Updated filter logic to support arrays: check if the selected category exists in the cert's categories
      const cOk = cat === "all" || c.cat.includes(cat as CertCategory);
      
      return yOk && cOk;
    });
  }, [year, cat]);

  const visible = expanded ? filtered : filtered.slice(0, 9);
  const hasFilters = year !== "all" || cat !== "all";

  return (
    <section id="certs" className="relative py-28 border-t border-border/60">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader title={t("cert.title")} sub={t("cert.sub")} />

        {/* Filters Navigation Bar */}
        <div className="mt-10 flex flex-col sm:flex-row sm:items-end gap-3 sm:gap-4">
          <div className="flex-1 min-w-0 sm:max-w-[220px]">
            <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground mb-2">{t("cert.filterYear")}</div>
            <Select value={String(year)} onValueChange={(v) => { setYear(v === "all" ? "all" : parseInt(v, 10)); setExpanded(false); }}>
              <SelectTrigger className="h-10 bg-card border-border font-mono text-xs"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("cert.all")}</SelectItem>
                {years.map(y => <SelectItem key={y} value={String(y)}>{y}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1 min-w-0 sm:max-w-[260px]">
            <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground mb-2">{t("cert.filterCategory")}</div>
            <Select value={cat} onValueChange={(v) => { setCat(v as CatFilter); setExpanded(false); }}>
              <SelectTrigger className="h-10 bg-card border-border font-mono text-xs"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("cert.all")}</SelectItem>
                {certCategories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-4 sm:flex-1 text-xs text-muted-foreground font-mono sm:pb-2">
            <span>{filtered.length} {t("cert.results")}</span>
            {hasFilters && (
              <button onClick={() => { setYear("all"); setCat("all"); setExpanded(false); }} className="inline-flex items-center gap-1 hover:text-emerald transition-colors">
                <X className="size-3" /> {t("cert.clear")}
              </button>
            )}
          </div>
        </div>

        {/* Certificate Cards Grid */}
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <AnimatePresence initial={false}>
            {visible.map((c, i) => (
              <motion.div
                key={`${c.t.en}-${lang}`}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, delay: (i % 9) * 0.03 }}
                className="group relative flex items-center gap-3 rounded-xl border border-border bg-card p-4 hover:border-emerald/40 transition-all cursor-pointer"
                onClick={() => setOpen(c)}
              >
                {/* Award Icon */}
                <div className="size-9 rounded-lg bg-accent grid place-items-center shrink-0">
                  <Award className="size-4 text-emerald" />
                </div>
                
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium leading-tight transition-colors group-hover:text-emerald">
                    {c.t[lang as 'es' | 'en'] || c.t.es}
                  </div>
                  <div className="mt-0.5 text-xs text-muted-foreground font-mono truncate">
                    {c.o} · {c.date}
                  </div>
                  {/* Displaying categories joined by a separator */}
                  <div className="mt-1 inline-block text-[10px] font-mono uppercase tracking-wider text-emerald/80 font-semibold">
                    {c.cat.join(" / ")}
                  </div>
                </div>
                
                {/* Download Button */}
                <div className="flex items-center justify-center shrink-0 ml-2">
                  <a 
                    href={`/certificates/${c.file}`} 
                    download 
                    onClick={(e) => e.stopPropagation()} 
                    className="size-9 rounded-lg border border-border bg-background/50 grid place-items-center text-muted-foreground group-hover:text-emerald group-hover:border-emerald transition-all duration-300 shadow-sm"
                  >
                    <Download className="size-4" />
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Show More / Hide Button */}
        {filtered.length > 9 && (
          <div className="mt-8 flex justify-center">
            <button onClick={() => setExpanded(e => !e)} className="h-10 px-5 rounded-lg border border-border bg-card hover:border-emerald/40 hover:text-emerald transition-colors text-sm font-medium">
              {expanded ? t("cert.hide") : `${t("cert.show")} (${filtered.length})`}
            </button>
          </div>
        )}
      </div>

      {/* Detailed View Modal */}
      <Dialog open={!!open} onOpenChange={() => setOpen(null)}>
        <DialogContent className="max-w-2xl p-0 overflow-hidden bg-card border-border">
          <DialogTitle className="sr-only">
            {open?.t[lang as 'es' | 'en'] || open?.t.es}
          </DialogTitle>
          {open && (
            <div className="p-6">
              <CertificateGraphic cert={open} />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}