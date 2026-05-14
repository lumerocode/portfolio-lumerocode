import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "../../lib/i18n"; 
import { SectionHeader } from "./Expertise";
import { experienceRoles as roles } from "../../data/experience";

/**
 * Experience Component
 * Displays a vertical timeline of professional roles with localized content.
 */
export function Experience() {
  const { t, lang } = useI18n(); 
  const [expanded, setExpanded] = useState(false);
  
  // Show only 2 roles by default, or all if expanded
  const visible = expanded ? roles : roles.slice(0, 2);

  return (
    <section id="experience" className="relative py-28 border-t border-border/60">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader title={t("exp.title")} sub={t("exp.sub")} />

        <div className="mt-14 relative">
          {/* Timeline Vertical Line */}
          <div className="absolute left-3 md:left-4 top-0 bottom-0 w-px bg-border" />
          
          <div className="space-y-10">
            <AnimatePresence initial={false}>
              {visible.map((r, i) => {
                // Select localized strings based on current language
                const currentRole = r.role[lang as 'es' | 'en'] || r.role.es;
                const currentLocation = r.location[lang as 'es' | 'en'] || r.location.es;
                const currentBullets = r.bullets[lang as 'es' | 'en'] || r.bullets.es;

                return (
                  <motion.div
                    key={r.company + r.period + lang} 
                    layout
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="relative pl-12"
                  >
                    {/* Timeline Dot */}
                    <div className="absolute left-3 md:left-4 top-2 -translate-x-1/2 size-3 rounded-full gradient-emerald ring-4 ring-background z-10" />
                    
                    <div className="rounded-2xl border border-border bg-card p-6 shadow-card hover:border-primary/40 transition-colors">
                      {/* Mobile Date Header */}
                      <div className="md:hidden text-xs font-mono uppercase tracking-[0.16em] text-emerald mb-2">
                        {r.period}
                      </div>

                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                          <h3 className="font-display text-xl sm:text-2xl font-semibold">
                            {currentRole}
                          </h3>
                          <div className="text-muted-foreground mt-0.5">{r.company}</div>
                        </div>
                        
                        {/* Desktop Info Sidebar */}
                        <div className="hidden md:block text-right text-xs font-mono">
                          <div className="uppercase tracking-[0.16em] text-emerald">{r.period}</div>
                          <div className="text-muted-foreground mt-0.5">{currentLocation}</div>
                        </div>
                      </div>

                      {/* Localized Bullet Points */}
                      <ul className="mt-4 space-y-2">
                        {currentBullets.map((b, idx) => (
                          <li key={idx} className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
                            <span className="mt-2 size-1.5 rounded-full bg-emerald shrink-0" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Tech Stack Badges */}
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {r.stack.map(s => (
                          <span key={s} className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider rounded border border-border text-muted-foreground">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Show More/Less Button */}
          {roles.length > 2 && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={() => setExpanded(e => !e)}
                className="h-10 px-5 rounded-lg border border-border bg-card hover:border-primary/40 hover:text-emerald transition-colors text-sm font-medium"
              >
                {expanded ? t("exp.showLess") : `${t("exp.showMore")} (${roles.length})`}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}