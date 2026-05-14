// Plain data — safe to copy to a React Native project.
export type ProjectTag = "React" | "Vue" | "Nuxt" | "Svelte" | "Astro" | "CMS" | "Lit";

export type Project = {
  title: string;
  desc: string;
  tags: ProjectTag[];
  stack: string[];
  image: string; 
  gradient: string; 
  url: string;
};

export const projects: Project[] = [
  {
    title: "Pandero Digital Platform",
    desc: "Multi-brand design system + web app powering thousands of monthly transactions.",
    tags: ["Vue", "Lit"],
    stack: ["Vue 3", "Lit", "Storybook", "TS"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=70",
    gradient: "from-emerald-500/30 via-emerald-500/10 to-cyan-500/10",
    url: "https://www.upwards.pe", 
  },
  {
    title: "Prestamype Lending Suite",
    desc: "End-to-end fintech product. Token-driven UI library, edge-rendered marketing site.",
    tags: ["Vue", "Nuxt"],
    stack: ["Nuxt 3", "Vue", "Tailwind"],
    image: "https://images.unsplash.com/photo-1579621970795-87facc2f976d?auto=format&fit=crop&w=1200&q=70",
    gradient: "from-violet-500/30 via-fuchsia-500/10 to-emerald-500/10",
    url: "https://www.upwards.pe",
  },
  {
    title: "Upwards Component Library",
    desc: "Internal Nuxt + Vue component library used across 12+ client projects.",
    tags: ["Nuxt", "Vue"],
    stack: ["Nuxt 3", "Vue", "SCSS"],
    image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1200&q=70",
    gradient: "from-amber-500/30 via-orange-500/10 to-rose-500/10",
    url: "https://www.upwards.pe",
  },
  {
    title: "Web Components Playground",
    desc: "Open-source primitives demonstrating framework-agnostic UI with Lit.",
    tags: ["Lit"],
    stack: ["Lit", "Vite", "TS"],
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=70",
    gradient: "from-sky-500/30 via-cyan-500/10 to-emerald-500/10",
    url: "https://github.com",
  },
  {
    title: "HubSpot CMS Modules",
    desc: "Custom HubL modules and themes for marketing teams to ship landing pages autonomously.",
    tags: ["CMS"],
    stack: ["HubSpot", "HubL", "JS"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=70",
    gradient: "from-orange-500/30 via-amber-500/10 to-rose-500/10",
    url: "https://www.upwards.pe",
  },
  {
    title: "React Microfrontends",
    desc: "React-based shell composing remote modules with Webpack Module Federation.",
    tags: ["React"],
    stack: ["React", "Module Federation"],
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1200&q=70",
    gradient: "from-blue-500/30 via-indigo-500/10 to-emerald-500/10",
    url: "https://www.upwards.pe",
  },
  {
    title: "Astro Marketing Site",
    desc: "Content-driven marketing site shipped with islands architecture and zero JS by default.",
    tags: ["Astro"],
    stack: ["Astro", "MDX", "Tailwind"],
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=1200&q=70",
    gradient: "from-rose-500/30 via-pink-500/10 to-emerald-500/10",
    url: "https://www.upwards.pe",
  },
  {
    title: "Svelte Dashboard Kit",
    desc: "Lightweight admin starter with type-safe forms and accessible primitives.",
    tags: ["Svelte"],
    stack: ["SvelteKit", "TS", "Tailwind"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=70",
    gradient: "from-amber-500/30 via-rose-500/10 to-emerald-500/10",
    url: "https://www.upwards.pe",
  },
];

export const PROJECT_FILTERS: ("All" | ProjectTag)[] = [
  "All", "React", "Vue", "Nuxt", "Svelte", "Astro", "Lit", "CMS",
];