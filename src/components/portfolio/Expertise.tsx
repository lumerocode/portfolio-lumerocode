import { motion } from "framer-motion";
import { useI18n } from "../../lib/i18n"; // Ruta relativa corregida
import { Layers, Component, Gauge, Users, Accessibility, Wrench } from "lucide-react";

/**
 * SectionHeader Component
 * Used to maintain consistent styling across all section titles.
 */
export function SectionHeader({ kicker, title, sub }: { kicker?: string; title: string; sub?: string }) {
  return (
    <div className="max-w-2xl">
      {kicker && <div className="text-xs font-mono uppercase tracking-[0.2em] text-emerald">{kicker}</div>}
      <h2 className="mt-3 font-display text-4xl sm:text-5xl font-semibold tracking-tight">{title}</h2>
      {sub && <p className="mt-4 text-muted-foreground text-lg">{sub}</p>}
    </div>
  );
}

/**
 * Expertise Component
 * Displays a bento-grid of core professional skills.
 */
export function Expertise() {
  const { t } = useI18n();
  
  // Configuration for each card in the grid
  const items = [
    { icon: Layers, k: "ds", span: "md:col-span-2 md:row-span-2", featured: true },
    { icon: Component, k: "wc", span: "md:col-span-2" },
    { icon: Gauge, k: "perf", span: "" },
    { icon: Users, k: "lead", span: "" },
    { icon: Accessibility, k: "a11y", span: "md:col-span-2" },
    { icon: Wrench, k: "dx", span: "md:col-span-2" },
  ];

  return (
    <section id="expertise" className="relative py-28 border-t border-border/60">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader 
          kicker={t("expertise.kicker")} 
          title={t("expertise.title")} 
          sub={t("expertise.sub")} 
        />
        
        <div className="mt-14 grid grid-cols-1 md:grid-cols-4 md:auto-rows-[180px] gap-4">
          {items.map((it, i) => {
            const Icon = it.icon;
            return (
              <motion.div
                key={it.k}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className={`group relative overflow-hidden rounded-xl border border-border bg-card p-6 shadow-card hover:border-primary/40 transition-colors ${it.span}`}
              >
                {/* Visual glow for featured item (Design Systems) */}
                {it.featured && (
                  <div className="absolute -top-12 -right-12 size-48 rounded-full gradient-emerald opacity-20 blur-2xl group-hover:opacity-30 transition-opacity" />
                )}
                
                <div className="relative flex flex-col h-full z-10">
                  <Icon className="size-7 text-emerald shrink-0" strokeWidth={1.75} />
                  <h3 className={`mt-4 font-display font-semibold ${it.featured ? "text-2xl" : "text-lg"}`}>
                    {t(`expertise.${it.k}.title`)}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {t(`expertise.${it.k}.desc`)}
                  </p>
                  
                  {/* Detailed tags for featured skill */}
                  {it.featured && (
                    <div className="mt-auto pt-6 flex flex-wrap gap-1.5">
                      {["tokens", "primitives", "themes", "docs"].map(tag => (
                        <span key={tag} className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider border border-border text-muted-foreground">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}