import { motion } from "framer-motion";
import { useI18n } from "../../lib/i18n";
import { SectionHeader } from "./Expertise";
import { SiGithub } from "react-icons/si"; // Using react-icons for better brand icon support
import { Star, GitFork } from "lucide-react";

/**
 * Local data for featured repositories. 
 * We can eventually move this to src/data/repos.ts
 */
const repos = [
  { name: "lit-design-system", desc: "Token-driven primitives built with Lit.", stars: 248, forks: 32, lang: "TypeScript" },
  { name: "vue-perf-toolkit", desc: "Bundle and runtime profiling helpers for Vue 3.", stars: 187, forks: 21, lang: "TypeScript" },
  { name: "wc-codemods", desc: "Codemods for migrating React → Web Components.", stars: 134, forks: 18, lang: "JavaScript" },
  { name: "tokens-cli", desc: "CLI to compile design tokens to CSS, JS and Swift.", stars: 96, forks: 11, lang: "TypeScript" },
];

/**
 * Generates a deterministic array of contribution levels to simulate the GitHub graph.
 * A fixed seed ensures consistency between renders and avoids hydration mismatches.
 */
function generateContributions() {
  const cells: number[] = [];
  let seed = 1337;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };
  for (let i = 0; i < 7 * 26; i++) {
    const r = rand();
    cells.push(r < 0.3 ? 0 : r < 0.55 ? 1 : r < 0.8 ? 2 : r < 0.95 ? 3 : 4);
  }
  return cells;
}

const cells = generateContributions();

// Color levels mapping to CSS variables defined in global.css
const levels = [
  "var(--muted)",
  "color-mix(in oklab, var(--emerald) 25%, var(--muted))",
  "color-mix(in oklab, var(--emerald) 50%, var(--muted))",
  "color-mix(in oklab, var(--emerald) 75%, var(--muted))",
  "var(--emerald)",
];

/**
 * GitHubSection Component
 * Visual representation of open-source contributions and top repositories.
 */
export function GitHubSection() {
  const { t, lang } = useI18n();
  
  return (
    <section className="relative py-28 border-t border-border/60">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader title={t("gh.title")} sub={t("gh.sub")} />

        <div className="mt-14 grid lg:grid-cols-5 gap-5">
          {/* Main Activity Card: Contribution Graph */}
          <div className="lg:col-span-3 rounded-2xl border border-border bg-card p-6 shadow-card">
            <div className="flex items-center justify-between">
              <a 
                href="https://github.com/lumerocode" 
                target="_blank" 
                rel="noreferrer" 
                className="flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-emerald transition-colors"
              >
                <SiGithub className="size-4" /> @lumerocode
              </a>
              <a 
                href="https://github.com/lumerocode" 
                target="_blank" 
                rel="noreferrer" 
                className="text-xs font-mono text-emerald hover:underline inline-flex items-center gap-1"
              >
                {t("gh.view")} →
              </a>
            </div>

            {/* Simulated Contribution Grid (26 weeks) */}
            <div className="mt-6 grid grid-cols-[repeat(26,minmax(0,1fr))] gap-1">
              {cells.map((lvl, i) => (
                <motion.div
                  key={`${i}-${lang}`}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.002 }}
                  className="aspect-square rounded-[2px]"
                  style={{ background: levels[lvl] }}
                />
              ))}
            </div>

            {/* Graph Legend */}
            <div className="mt-4 flex items-center justify-end gap-2 text-[10px] font-mono text-muted-foreground">
              <span>Less</span>
              <div className="flex gap-1">
                {levels.map((c, i) => (
                  <div key={i} className="size-3 rounded-[2px]" style={{ background: c }} />
                ))}
              </div>
              <span>More</span>
            </div>
          </div>

          {/* Side Column: Featured Repositories */}
          <div className="lg:col-span-2 space-y-3">
            {repos.map((r, i) => (
              <motion.a
                key={`${r.name}-${lang}`}
                href={`https://github.com/lumerocode/${r.name}`}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="block rounded-xl border border-border bg-card p-4 hover:border-primary/40 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="font-mono text-sm font-medium text-emerald">{r.name}</div>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{r.desc}</p>
                
                <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <span className="size-2 rounded-full bg-emerald" />
                    {r.lang}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Star className="size-3" />
                    {r.stars}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <GitFork className="size-3" />
                    {r.forks}
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}