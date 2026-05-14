import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "../../lib/i18n"; // Corrected path
import { SectionHeader } from "./Expertise"; // Imports SectionHeader from your Expertise.tsx
import { Copy, Check, RotateCcw, Sparkles } from "lucide-react";

const palettes = {
  emerald: ["oklch(0.95 0.04 158)", "oklch(0.78 0.18 158)", "oklch(0.62 0.16 158)", "oklch(0.4 0.12 158)", "oklch(0.22 0.06 158)"],
  slate: ["oklch(0.96 0.01 250)", "oklch(0.78 0.02 250)", "oklch(0.55 0.02 250)", "oklch(0.32 0.02 250)", "oklch(0.18 0.02 250)"],
  amber: ["oklch(0.96 0.04 80)", "oklch(0.82 0.14 80)", "oklch(0.7 0.18 60)", "oklch(0.5 0.16 50)", "oklch(0.3 0.08 50)"],
  violet: ["oklch(0.96 0.03 300)", "oklch(0.78 0.16 300)", "oklch(0.6 0.2 300)", "oklch(0.38 0.16 300)", "oklch(0.22 0.08 300)"],
};

type Density = "compact" | "cozy" | "comfortable";
const densityMap: Record<Density, { h: number; px: number; gap: number }> = {
  compact: { h: 32, px: 12, gap: 8 },
  cozy: { h: 40, px: 20, gap: 12 },
  comfortable: { h: 48, px: 24, gap: 16 },
};

const DEFAULTS = { palette: "emerald" as keyof typeof palettes, radius: 12, density: "cozy" as Density, elevation: 2 };

/**
 * DesignSystemWidget Component
 * An interactive playground that demonstrates Design System capabilities.
 */
export function DesignSystemWidget() {
  const { t, lang } = useI18n(); // Added lang to ensure reactive updates
  const [palette, setPalette] = useState<keyof typeof palettes>(DEFAULTS.palette);
  const [radius, setRadius] = useState(DEFAULTS.radius);
  const [density, setDensity] = useState<Density>(DEFAULTS.density);
  const [elevation, setElevation] = useState(DEFAULTS.elevation);
  const [hovering, setHovering] = useState(false);
  const [copied, setCopied] = useState(false);

  const colors = palettes[palette];
  const d = densityMap[density];
  const shadow = `0 ${elevation * 4}px ${elevation * 12}px -${elevation * 2}px ${colors[2]}66`;

  const snippet = `<lm-button
  variant="primary"
  palette="${palette}"
  radius="${radius}"
  density="${density}"
  elevation="${elevation}"
></lm-button>`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(snippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {}
  };

  const reset = () => {
    setPalette(DEFAULTS.palette);
    setRadius(DEFAULTS.radius);
    setDensity(DEFAULTS.density);
    setElevation(DEFAULTS.elevation);
  };

  return (
    <section className="relative py-28 border-t border-border/60">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader title={t("ds.title")} sub={t("ds.sub")} />

        <div className="mt-14 grid lg:grid-cols-5 gap-4 rounded-2xl border border-border bg-card/40 p-4 shadow-card">
          {/* Controls Panel */}
          <div className="lg:col-span-2 rounded-xl bg-background/60 border border-border p-6">
            <div className="flex items-center justify-between">
              <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground">{t("ds.token")}s</div>
              <button
                onClick={reset}
                className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider text-muted-foreground hover:text-emerald transition-colors"
                aria-label={t("ds.reset")}
              >
                <RotateCcw className="size-3" /> {t("ds.reset")}
              </button>
            </div>

            {/* Palette Control */}
            <div className="mt-4">
              <div className="text-xs text-muted-foreground mb-2">{t("ds.palette")}</div>
              <div className="flex gap-2">
                {(Object.keys(palettes) as (keyof typeof palettes)[]).map(p => (
                  <button
                    key={p}
                    onClick={() => setPalette(p)}
                    className={`flex-1 h-10 rounded-md border transition-all ${palette === p ? "border-primary ring-2 ring-primary/30 scale-105" : "border-border hover:scale-105"}`}
                    style={{ background: `linear-gradient(90deg, ${palettes[p][1]}, ${palettes[p][3]})` }}
                    aria-label={p}
                  />
                ))}
              </div>
            </div>

            {/* Radius Control */}
            <div className="mt-6">
              <div className="text-xs text-muted-foreground mb-2 flex justify-between">
                <span>{t("ds.radius")}</span><span className="font-mono">{radius}px</span>
              </div>
              <input
                type="range" min={0} max={24} value={radius}
                onChange={e => setRadius(Number(e.target.value))}
                className="w-full accent-[var(--emerald)] cursor-pointer"
              />
            </div>

            {/* Density Control */}
            <div className="mt-6">
              <div className="text-xs text-muted-foreground mb-2">{t("ds.density")}</div>
              <div className="flex gap-1 rounded-md border border-border p-1 bg-background">
                {(["compact", "cozy", "comfortable"] as Density[]).map(opt => (
                  <button
                    key={opt}
                    onClick={() => setDensity(opt)}
                    className={`flex-1 h-8 rounded text-[11px] font-mono uppercase tracking-wider transition-all ${density === opt ? "gradient-emerald text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    {t(`ds.${opt}`)}
                  </button>
                ))}
              </div>
            </div>

            {/* Elevation Control */}
            <div className="mt-6">
              <div className="text-xs text-muted-foreground mb-2 flex justify-between">
                <span>{t("ds.elevation")}</span><span className="font-mono">lvl {elevation}</span>
              </div>
              <input
                type="range" min={0} max={5} value={elevation}
                onChange={e => setElevation(Number(e.target.value))}
                className="w-full accent-[var(--emerald)] cursor-pointer"
              />
            </div>

            {/* Color Scale Visualizer */}
            <div className="mt-6">
              <div className="text-xs text-muted-foreground mb-2">{t("ds.scale")}</div>
              <div className="grid grid-cols-5 gap-1">
                {colors.map((c, i) => (
                  <motion.div
                    key={i}
                    layout
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="aspect-square rounded-md border border-border"
                    style={{ background: c }}
                  />
                ))}
              </div>
            </div>

            {/* Code Snippet Container */}
            <div className="mt-6 relative">
              <pre className="text-[11px] font-mono bg-background/80 border border-border rounded-md p-3 pr-10 overflow-x-auto text-muted-foreground">
{snippet}
              </pre>
              <button
                onClick={copy}
                className="absolute top-2 right-2 size-7 grid place-items-center rounded-md border border-border bg-background hover:border-primary/40 hover:text-emerald transition-colors"
                aria-label={t("ds.copy")}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {copied ? (
                    <motion.span key="ok" initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0 }}>
                      <Check className="size-3.5 text-emerald" />
                    </motion.span>
                  ) : (
                    <motion.span key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                      <Copy className="size-3.5" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>

          {/* Real-time Preview Panel */}
          <div
            className="lg:col-span-3 rounded-xl bg-background/60 border border-border p-6 relative overflow-hidden"
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            <div className="absolute inset-0 grid-bg opacity-50 pointer-events-none" />
            <div className="relative">
              <div className="flex items-center justify-between">
                <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground">{t("ds.preview")}</div>
                <AnimatePresence>
                  {hovering && (
                    <motion.div
                      initial={{ opacity: 0, x: 6 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 6 }}
                      className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider text-emerald"
                    >
                      <Sparkles className="size-3" /> {t("ds.hoverPreview")}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Component Sandbox */}
              <div className="mt-6 flex flex-wrap items-center" style={{ gap: d.gap }}>
                <motion.button
                  layout
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="text-sm font-medium text-white"
                  style={{
                    height: d.h,
                    paddingInline: d.px,
                    background: `linear-gradient(135deg, ${colors[1]}, ${colors[2]})`,
                    borderRadius: radius,
                    boxShadow: shadow,
                  }}
                >
                  {t("ds.primary")}
                </motion.button>
                <motion.button
                  layout
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="text-sm font-medium border"
                  style={{ height: d.h, paddingInline: d.px, borderRadius: radius, borderColor: colors[2], color: colors[1] }}
                >
                  {t("ds.secondary")}
                </motion.button>
                <motion.span
                  layout
                  className="inline-flex items-center text-xs font-mono"
                  style={{ height: d.h, paddingInline: d.px * 0.6, borderRadius: radius, background: colors[0], color: colors[3] }}
                >
                  badge
                </motion.span>
              </div>

              <motion.div
                layout
                whileHover={{ y: -3, boxShadow: shadow }}
                className="mt-6 p-5 border border-border bg-card transition-shadow"
                style={{ borderRadius: radius + 4 }}
              >
                <div className="flex items-center gap-3">
                  <motion.div
                    layout
                    animate={{ rotate: hovering ? 8 : 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="size-10"
                    style={{ background: `linear-gradient(135deg, ${colors[1]}, ${colors[3]})`, borderRadius: radius }}
                  />
                  <div className="flex-1">
                    <div className="font-display font-semibold">{t("ds.component")} card</div>
                    <div className="text-xs text-muted-foreground">{t("ds.tokenDriven")}</div>
                  </div>
                  <div className="text-xs font-mono px-2 py-1 rounded" style={{ background: colors[0], color: colors[3] }}>v1.2</div>
                </div>
                <div className="mt-4 flex gap-1.5">
                  {colors.map((c, i) => (
                    <motion.div
                      key={i}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className="h-1.5 flex-1 rounded-full origin-left"
                      style={{ background: c }}
                    />
                  ))}
                </div>
              </motion.div>

              <div className="mt-4 grid grid-cols-3" style={{ gap: d.gap }}>
                {(["sm", "md", "lg"] as const).map((size, i) => (
                  <motion.div
                    layout
                    key={size}
                    whileHover={{ y: -2, borderColor: colors[1] }}
                    className="grid place-items-center text-xs font-mono border border-border bg-card"
                    style={{ borderRadius: radius, height: d.h + i * 8 }}
                  >
                    input.{size}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}