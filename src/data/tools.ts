// Plain data — safe to copy to a React Native project.
// Icons are referenced by name only (string), so this file has no web deps.
export type Tool = { name: string; icon: string; color: string };

export const tools: Tool[] = [
  { name: "React", icon: "SiReact", color: "#61DAFB" },
  { name: "Vue 3", icon: "SiVuedotjs", color: "#42B883" },
  { name: "TypeScript", icon: "SiTypescript", color: "#3178C6" },
  { name: "Lit.dev", icon: "SiLit", color: "#324FFF" },
  { name: "Next.js", icon: "SiNextdotjs", color: "currentColor" },
  { name: "Nuxt 3", icon: "SiNuxt", color: "#00DC82" },
  { name: "Astro", icon: "SiAstro", color: "#FF5D01" },
  { name: "Svelte", icon: "SiSvelte", color: "#FF3E00" },
  { name: "Storybook", icon: "SiStorybook", color: "#FF4785" },
  { name: "NestJS", icon: "SiNestjs", color: "#E0234E" },
  { name: "Node.js", icon: "SiNodedotjs", color: "#5FA04E" },
  { name: "Tailwind", icon: "SiTailwindcss", color: "#06B6D4" },
  { name: "Vite", icon: "SiVite", color: "#646CFF" },
  { name: "GraphQL", icon: "SiGraphql", color: "#E10098" },
  { name: "Vitest", icon: "SiVitest", color: "#6E9F18" },
  { name: "Figma", icon: "SiFigma", color: "#F24E1E" },
  { name: "Docker", icon: "SiDocker", color: "#2496ED" },
  { name: "Cloudflare", icon: "SiCloudflare", color: "#F38020" },
  { name: "WordPress", icon: "SiWordpress", color: "#21759B" },
  { name: "Shopify", icon: "SiShopify", color: "#7AB55C" },
];