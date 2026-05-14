import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "../../lib/i18n";
import { SectionHeader } from "./Expertise";
import { ArrowUpRight, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";

// Import project data and types
import { projects, PROJECT_FILTERS, type ProjectTag } from "../../data/projects";

type Tag = "All" | ProjectTag;
const FILTERS = PROJECT_FILTERS;

/**
 * Custom hook to detect mobile viewport for responsive pagination
 */
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return isMobile;
}

export function Work() {
  const { t, lang } = useI18n();
  const [active, setActive] = useState<Tag>("All");
  const [page, setPage] = useState(0);
  const isMobile = useIsMobile();
  
  // Define items per page based on screen size
  const pageSize = isMobile ? 4 : 6;

  // Memoized filtered projects to avoid unnecessary recalculations
  const filtered = useMemo(
    () => (active === "All" ? projects : projects.filter(p => p.tags.includes(active as Exclude<Tag, "All">))),
    [active]
  );

  // Reset pagination when active filter or screen size changes
  useEffect(() => { setPage(0); }, [active, pageSize]);

  // Calculate pagination details
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const current = page >= totalPages ? totalPages - 1 : page;
  const paged = filtered.slice(current * pageSize, current * pageSize + pageSize);

  return (
    <section id="work" className="relative py-28 border-t border-border/60">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader title={t("work.title")} sub={t("work.sub")} />

        {/* Filter Navigation */}
        <div className="mt-10 flex flex-wrap gap-2">
          {FILTERS.map(f => {
            const isActive = f === active;
            return (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`h-9 px-4 rounded-full border text-xs font-mono uppercase tracking-wider transition-all ${
                  isActive
                    ? "gradient-emerald text-primary-foreground border-transparent shadow-elegant"
                    : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-emerald"
                }`}
              >
                {f}
              </button>
            );
          })}
        </div>

        {/* Dynamic Project Grid */}
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {paged.map((p, i) => (
              <motion.article
                key={`${p.title}-${lang}`} // Key includes language to refresh animations on switch
                layout
                initial={{ opacity: 0, y: 18, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                whileHover={{ y: -4 }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card shadow-card hover:border-primary/40 transition-colors"
              >
                {/* Visual Header / Image Link */}
                <a href={p.url} target="_blank" rel="noopener noreferrer" className="block">
                  <div className={`relative h-44 bg-gradient-to-br ${p.gradient} overflow-hidden`}>
                    <img
                      src={p.image}
                      alt={p.title}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
                    
                    {/* Hover Action Indicator */}
                    <div className="absolute top-3 right-3 size-9 rounded-full bg-background/80 backdrop-blur border border-border grid place-items-center group-hover:gradient-emerald group-hover:text-primary-foreground transition-all">
                      <ArrowUpRight className="size-4" />
                    </div>

                    {/* Main Category Tags */}
                    <div className="absolute top-3 left-3 flex gap-1">
                      {p.tags.map(tg => (
                        <span key={tg} className="px-2 py-0.5 rounded-full bg-background/80 backdrop-blur border border-border text-[10px] font-mono">
                          {tg}
                        </span>
                      ))}
                    </div>
                  </div>
                </a>

                {/* Card Body */}
                <div className="p-5">
                  <h3 className="font-display text-lg font-semibold">{p.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed line-clamp-2">
                    {p.desc}
                  </p>
                  
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                    {/* Tech Stack Mini-Badges */}
                    <div className="flex flex-wrap gap-1">
                      {p.stack.map(s => (
                        <span key={s} className="px-1.5 py-0.5 text-[10px] font-mono rounded border border-border text-muted-foreground">{s}</span>
                      ))}
                    </div>

                    {/* External Link CTA */}
                    <a 
                      href={p.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-xs font-mono inline-flex items-center gap-1 text-emerald hover:underline"
                    >
                      {t("work.case")} <ExternalLink className="size-3" />
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {/* Pagination Interface */}
        {totalPages > 1 && (
          <div className="mt-10 flex items-center justify-center gap-2">
            <button
              onClick={() => setPage(p => Math.max(0, p - 1))}
              disabled={current === 0}
              className="size-9 grid place-items-center rounded-lg border border-border bg-card hover:border-primary/40 hover:text-emerald disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              aria-label="Previous page"
            >
              <ChevronLeft className="size-4" />
            </button>

            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={`size-9 rounded-lg border text-xs font-mono transition-colors ${
                  i === current
                    ? "gradient-emerald text-primary-foreground border-transparent"
                    : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-emerald"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
              disabled={current === totalPages - 1}
              className="size-9 grid place-items-center rounded-lg border border-border bg-card hover:border-primary/40 hover:text-emerald disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              aria-label="Next page"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}