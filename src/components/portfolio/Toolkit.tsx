import { useI18n } from "../../lib/i18n"; // Corrected path
import { SectionHeader } from "./Expertise";
import {
  SiReact, SiVuedotjs, SiTypescript, SiLit, SiNextdotjs, SiNuxt,
  SiStorybook, SiNestjs, SiNodedotjs, SiTailwindcss, SiVite, SiGraphql,
  SiVitest, SiFigma, SiDocker, SiCloudflare,
  SiAstro, SiSvelte, SiWordpress, SiShopify,
} from "react-icons/si";
import type { IconType } from "react-icons";
import { tools as toolsData } from "../../data/tools"; // Corrected path

/**
 * Registry of icons used in the toolkit to map string keys to components.
 */
const ICONS: Record<string, IconType> = {
  SiReact, SiVuedotjs, SiTypescript, SiLit, SiNextdotjs, SiNuxt,
  SiStorybook, SiNestjs, SiNodedotjs, SiTailwindcss, SiVite, SiGraphql,
  SiVitest, SiFigma, SiDocker, SiCloudflare,
  SiAstro, SiSvelte, SiWordpress, SiShopify,
};

type Tool = { name: string; Icon: IconType; color: string };

// Transform raw data into Tool objects with functional icon components
const tools: Tool[] = toolsData.map(t => ({ 
  name: t.name, 
  Icon: ICONS[t.icon] || SiReact, // Fallback to React icon if key is missing
  color: t.color 
}));

const half = Math.ceil(tools.length / 2);
const rowA = tools.slice(0, half);
const rowB = tools.slice(half);

/**
 * Row Component: Handles the infinite scrolling animation for a set of tools.
 */
function Row({ items, direction }: { items: Tool[]; direction: "left" | "right" }) {
  // Duplicate array to create a seamless infinite loop transition
  const loop = [...items, ...items];
  const animClass = direction === "left" ? "animate-marquee-left" : "animate-marquee-right";
  
  return (
    <div className="relative overflow-hidden marquee-mask">
      <div className={`flex gap-3 sm:gap-4 w-max ${animClass}`}>
        {loop.map((tool, i) => (
          <div
            key={`${tool.name}-${i}`}
            className="shrink-0 w-28 sm:w-32 aspect-square rounded-xl border border-border bg-card hover:border-primary/40 transition-colors flex flex-col items-center justify-center gap-2 p-2 group"
          >
            <tool.Icon
              className="size-7 sm:size-8 transition-transform group-hover:scale-110"
              style={{ color: tool.color }}
            />
            <span className="text-[10px] font-mono text-muted-foreground group-hover:text-foreground transition-colors text-center leading-tight">
              {tool.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Toolkit Component: Displays two infinite-scrolling rows of technical tools.
 */
export function Toolkit() {
  const { t } = useI18n();
  
  return (
    <section className="relative py-28 border-t border-border/60">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader title={t("tool.title")} sub={t("tool.sub")} />
        
        <div className="mt-14 space-y-4">
          <Row items={rowA} direction="left" />
          <Row items={rowB} direction="right" />
        </div>
      </div>
    </section>
  );
}