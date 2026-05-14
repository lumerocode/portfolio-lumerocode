import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "../../lib/i18n"; // Corrected path
import { SectionHeader } from "./Expertise";
import { Award, Calendar, Building2, X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog"; // Adjusted path to your UI folder
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"; // Adjusted path

import { certs, certCategories, getCertYear, type Cert, type CertCategory } from "../../data/certifications";

/**
 * CertificateGraphic Component
 * Renders a visual representation of the certificate inside the modal.
 */
function CertificateGraphic({ cert }: { cert: Cert }) {
  const { t } = useI18n();
  return (
    <div className="relative w-full aspect-[1.4/1] rounded-xl overflow-hidden border border-border bg-gradient-to-br from-card via-background to-card">
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="absolute -top-20 -right-20 size-72 rounded-full gradient-emerald opacity-20 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 size-72 rounded-full gradient-emerald opacity-10 blur-3xl" />
      <div className="relative h-full flex flex-col items-center justify-center text-center px-8 py-10">
        <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-emerald">{t("cert.completion")}</div>
        <div className="mt-3 text-xs text-muted-foreground">{t("cert.certifies")}</div>
        <div className="mt-1 font-display text-2xl sm:text-3xl font-semibold">Luis Meléndez</div>
        <div className="mt-3 text-xs text-muted-foreground">{t("cert.completed")}</div>
        <div className="mt-2 font-display text-xl sm:text-2xl gradient-text font-semibold max-w-md leading-tight">{cert.t}</div>
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
 * Certifications Component
 * Gallery of professional certificates with filtering by year and category.
 */
export function Certifications() {
  const { t, lang } = useI18n();
  const [expanded, setExpanded] = useState(false);
  const [open, setOpen] = useState<Cert | null>(null);
  const [year, setYear] = useState<YearFilter>("all");
  const [cat, setCat] = useState<CatFilter>("all");

  const years = useMemo(() => {
    const arr: number[] = [];
    for (let y = 2026; y >= 2021; y--) arr.push(y);
    return arr;
  }, []);

  const filtered = useMemo(() => {
    return certs.filter(c => {
      const yOk = year === "all" || getCertYear(c) === year;
      const cOk = cat === "all" || c.cat === cat;
      return yOk && cOk;
    });
  }, [year, cat]);

  const visible = expanded ? filtered : filtered.slice(0, 9);
  const hasFilters = year !== "all" || cat !== "all";

  return (
    <section id="certs" className="relative py-28 border-t border-border/60">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader title={t("cert.title")} sub={t("cert.sub")} />

        {/* Filters Bar */}
        <div className="mt-10 flex flex-col sm:flex-row sm:items-end gap-3 sm:gap-4">
          <div className="flex-1 min-w-0 sm:max-w-[220px]">
            <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground mb-2">
              {t("cert.filterYear")}
            </div>
            <Select
              value={String(year)}
              onValueChange={(v) => { setYear(v === "all" ? "all" : parseInt(v, 10)); setExpanded(false); }}
            >
              <SelectTrigger className="h-10 bg-card border-border font-mono text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("cert.all")}</SelectItem>
                {years.map(y => (
                  <SelectItem key={y} value={String(y)}>{y}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1 min-w-0 sm:max-w-[260px]">
            <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground mb-2">
              {t("cert.filterCategory")}
            </div>
            <Select
              value={cat}
              onValueChange={(v) => { setCat(v as CatFilter); setExpanded(false); }}
            >
              <SelectTrigger className="h-10 bg-card border-border font-mono text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("cert.all")}</SelectItem>
                {certCategories.map(c => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-4 sm:flex-1 text-xs text-muted-foreground font-mono sm:pb-2">
            <span>{filtered.length} {t("cert.results")}</span>
            {hasFilters && (
              <button
                onClick={() => { setYear("all"); setCat("all"); setExpanded(false); }}
                className="inline-flex items-center gap-1 hover:text-emerald transition-colors"
              >
                <X className="size-3" /> {t("cert.clear")}
              </button>
            )}
          </div>
        </div>

        {/* Dynamic Cards Grid */}
        {filtered.length === 0 ? (
          <div className="mt-10 text-center text-sm text-muted-foreground py-16 border border-dashed border-border rounded-xl">
            {t("cert.noResults")}
          </div>
        ) : (
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <AnimatePresence initial={false}>
              {visible.map((c, i) => (
                <motion.button
                  key={`${c.t}-${lang}`}
                  onClick={() => setOpen(c)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, delay: (i % 9) * 0.03 }}
                  className="group flex items-start gap-3 rounded-xl border border-border bg-card p-4 hover:border-primary/40 transition-colors text-left"
                >
                  <div className="size-9 rounded-lg bg-accent grid place-items-center shrink-0 group-hover:gradient-emerald transition-all">
                    <Award className="size-4 text-emerald group-hover:text-primary-foreground" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-medium leading-tight">{c.t}</div>
                    <div className="mt-0.5 text-xs text-muted-foreground font-mono truncate">{c.o} · {c.date}</div>
                    <div className="mt-1 inline-block text-[10px] font-mono uppercase tracking-wider text-emerald/80">{c.cat}</div>
                  </div>
                </motion.button>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Expand Button */}
        {filtered.length > 9 && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setExpanded(e => !e)}
              className="h-10 px-5 rounded-lg border border-border bg-card hover:border-primary/40 hover:text-emerald transition-colors text-sm font-medium"
            >
              {expanded ? t("cert.hide") : `${t("cert.show")} (${filtered.length})`}
            </button>
          </div>
        )}
      </div>

      {/* Certificate Viewer Modal */}
      <Dialog open={!!open} onOpenChange={() => setOpen(null)}>
        <DialogContent className="max-w-2xl p-0 overflow-hidden bg-card border-border">
          <DialogTitle className="sr-only">{open?.t}</DialogTitle>
          {open && (
            <div className="p-6">
              <CertificateGraphic cert={open} />
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">{t("cert.certification")}</div>
                  <div className="mt-1 font-display text-base font-semibold">{open.t}</div>
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground flex items-center gap-1"><Building2 className="size-3" /> {t("cert.issuer")}</div>
                  <div className="mt-1 text-sm">{open.o}</div>
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground flex items-center gap-1"><Calendar className="size-3" /> {t("cert.issued")}</div>
                  <div className="mt-1 text-sm font-mono">{open.date}</div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}