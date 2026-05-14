import { motion, useMotionValue, useSpring, useTransform, useInView, animate } from "framer-motion";
import { useI18n } from "../../lib/i18n"; 
import { ArrowRight, Download, Sparkles } from "lucide-react";
import portrait from "../../assets/photo.png"; 
import { useEffect, useRef, useState, type MouseEvent } from "react";

/**
 * Counter component for animated statistics in the Hero section.
 */
function Counter({ to, suffix = "+" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (v) => setVal(Math.floor(v)),
    });
    return () => controls.stop();
  }, [inView, to]);

  return <span ref={ref}>{val}{suffix}</span>;
}

export function Hero() {
  const { t, lang } = useI18n(); // Added 'lang' to determine current language
  const stack = ["React", "Vue 3", "TypeScript", "Lit.dev", "Next.js", "Nuxt", "Astro", "CMS", "Storybook"];

  // Logic to select the PDF based on current language (files located in /public)
  const resumeFile = lang === "es" ? "/resume-es.pdf" : "/resume-en.pdf";

  // Motion values for 3D card effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useSpring(useTransform(y, [-50, 50], [10, -10]), { stiffness: 150, damping: 15 });
  const ry = useSpring(useTransform(x, [-50, 50], [-10, 10]), { stiffness: 150, damping: 15 });

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  // Reusable sub-component for tech stack badges
  const stackBadges = (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.25 }}
      className="flex flex-wrap gap-2"
    >
      {stack.map(s => (
        <span key={s} className="px-3 py-1 rounded-md text-xs font-mono border border-border bg-card/40 text-muted-foreground">
          {s}
        </span>
      ))}
    </motion.div>
  );

  // Reusable sub-component for Call to Actions
  const ctas = (
    <motion.div
      initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }}
      className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3"
    >
      <a href="#work" className="group inline-flex items-center justify-center gap-2 h-11 px-5 rounded-lg gradient-emerald text-primary-foreground font-medium shadow-elegant hover:opacity-95 transition-all w-full sm:w-auto">
        {t("hero.cta1")} <ArrowRight className="size-4 group-hover:translate-x-0.5 transition-transform" />
      </a>
      {/* Updated CTA to use dynamic resumeFile path */}
      <a href={resumeFile} download className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-lg border border-border bg-card/40 hover:bg-card hover:border-primary/40 transition-all font-medium w-full sm:w-auto">
        <Download className="size-4" /> {t("hero.cta2")}
      </a>
    </motion.div>
  );

  return (
    <section className="relative pt-32 pb-22 md:pb-24 overflow-hidden">
      <div className="absolute inset-0 grid-bg pointer-events-none" />
      <div className="absolute inset-0 hero-glow pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-[1fr_auto] gap-12 items-center">
        <div>
          {/* Availability badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-card/60 text-xs font-mono text-muted-foreground"
          >
            <span className="size-1.5 rounded-full bg-emerald animate-glow" />
            {t("hero.eyebrow")}
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.05 }}
            className="mt-6 font-display text-5xl sm:text-6xl lg:text-7xl font-semibold leading-[1.02] max-w-4xl"
          >
            {t("hero.title1")}
            <br />
            <span className="gradient-text">{t("hero.title2")}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed whitespace-pre-line"
          >
            {t("hero.sub")}
          </motion.p>

          <div className="mt-8 md:hidden space-y-6">
            {stackBadges}
            {ctas}
          </div>
          <div className="hidden md:block">
            <div className="mt-8">{ctas}</div>
            <div className="mt-10">{stackBadges}</div>
          </div>
        </div>

        {/* 3D Interactive Portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative justify-self-center lg:justify-self-end"
          style={{ perspective: 1200 }}
        >
          <motion.div
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
            className="relative w-[280px] sm:w-[340px] aspect-[4/5] rounded-3xl"
          >
            <div className="absolute -inset-4 gradient-emerald opacity-30 blur-3xl rounded-3xl" />
            <div className="absolute inset-0 rounded-3xl border border-border bg-card overflow-hidden shadow-elegant">
              <img
                src={portrait}
                alt="Luis Meléndez portrait"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ transform: "translateZ(40px)" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              
              <div
                className="absolute bottom-4 left-4 right-4 rounded-xl border border-border bg-background/70 backdrop-blur px-3 py-2 font-mono text-[10px]"
                style={{ transform: "translateZ(70px)" }}
              >
                <div className="text-emerald">$ whoami</div>
                <div className="text-foreground">luis.melendez — {t("hero.terminalRole")}</div>
              </div>
            </div>

            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              style={{ transform: "translateZ(90px)" }}
              className="absolute -top-4 -left-6 px-3 py-1.5 rounded-lg border border-border bg-card/90 backdrop-blur text-xs font-mono shadow-elegant"
            >
              <span className="text-emerald">{"<Lit/>"}</span>
            </motion.div>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              style={{ transform: "translateZ(90px)" }}
              className="absolute -bottom-3 -right-4 px-3 py-1.5 rounded-lg border border-border bg-card/90 backdrop-blur text-xs font-mono shadow-elegant"
            >
              <span className="text-emerald">{"{ ds: tokens }"}</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Metrics Bar */}
      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.35 }}
          className="mt-16 grid grid-cols-3 gap-4 sm:gap-8 max-w-2xl"
        >
          {[
            { v: 5, k: t("hero.metric1") },
            { v: 200, k: t("hero.metric2") },
            { v: 30, k: t("hero.metric3") },
          ].map(m => (
            <div key={m.k} className="border-l border-border pl-4">
              <div className="font-display text-3xl sm:text-4xl font-semibold gradient-text">
                <Counter to={m.v} />
              </div>
              <div className="mt-1 text-xs text-muted-foreground">{m.k}</div>
            </div>
          ))}
        </motion.div>

        <div className="absolute top-0 right-0 hidden lg:flex items-center gap-2 text-xs font-mono text-muted-foreground rotate-90 origin-bottom-right">
          <Sparkles className="size-3 text-emerald" /> portfolio.v2026
        </div>
      </div>
    </section>
  );
}