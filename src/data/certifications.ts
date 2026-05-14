// Plain data — safe to copy to a React Native project.
export type CertCategory =
  | "Frontend"
  | "Backend"
  | "Cloud & DevOps"
  | "Testing & Quality"
  | "Design & UX"
  | "Leadership";

export type Cert = { t: string; o: string; date: string; cat: CertCategory };

export const certs: Cert[] = [
  { t: "Advanced React Patterns", o: "Epic React", date: "Mar 2024", cat: "Frontend" },
  { t: "TypeScript Deep Dive", o: "Frontend Masters", date: "Jan 2024", cat: "Frontend" },
  { t: "Web Components with Lit", o: "Google Developers", date: "Nov 2023", cat: "Frontend" },
  { t: "Vue 3 Composition API", o: "Vue Mastery", date: "Aug 2023", cat: "Frontend" },
  { t: "Design Systems Architecture", o: "Design+Code", date: "Jun 2023", cat: "Design & UX" },
  { t: "Storybook for Component Driven Dev", o: "Chromatic", date: "May 2023", cat: "Design & UX" },
  { t: "Next.js 14 App Router", o: "Vercel", date: "Feb 2024", cat: "Frontend" },
  { t: "Nuxt 3 in Production", o: "VueSchool", date: "Oct 2023", cat: "Frontend" },
  { t: "GraphQL Fundamentals", o: "Apollo", date: "Jul 2023", cat: "Backend" },
  { t: "Performance: Core Web Vitals", o: "web.dev", date: "Apr 2024", cat: "Frontend" },
  { t: "Accessibility Specialist", o: "Deque University", date: "Sep 2023", cat: "Design & UX" },
  { t: "Tailwind CSS Mastery", o: "Tailwind Labs", date: "Mar 2023", cat: "Frontend" },
  { t: "Testing with Vitest & Playwright", o: "Frontend Masters", date: "Dec 2023", cat: "Testing & Quality" },
  { t: "AWS Cloud Practitioner", o: "Amazon Web Services", date: "Aug 2023", cat: "Cloud & DevOps" },
  { t: "Cloudflare Workers", o: "Cloudflare", date: "Jan 2024", cat: "Cloud & DevOps" },
  { t: "Docker for Developers", o: "Docker Inc.", date: "May 2022", cat: "Cloud & DevOps" },
  { t: "Node.js Services Design", o: "NodeSchool", date: "Feb 2023", cat: "Backend" },
  { t: "NestJS Microservices", o: "Trilon", date: "Jun 2023", cat: "Backend" },
  { t: "CI/CD with GitHub Actions", o: "GitHub", date: "Apr 2023", cat: "Cloud & DevOps" },
  { t: "Figma for Engineers", o: "Config", date: "Oct 2023", cat: "Design & UX" },
  { t: "Motion Design with Framer", o: "Framer", date: "Nov 2023", cat: "Design & UX" },
  { t: "State Management Patterns", o: "Frontend Masters", date: "Jan 2023", cat: "Frontend" },
  { t: "Micro Frontends", o: "Module Federation", date: "Sep 2022", cat: "Frontend" },
  { t: "WebSockets & Realtime UI", o: "Socket.io", date: "Jul 2022", cat: "Backend" },
  { t: "Rust for JS Developers", o: "Rust Foundation", date: "Feb 2024", cat: "Backend" },
  { t: "WASM with JavaScript", o: "Mozilla", date: "Mar 2024", cat: "Frontend" },
  { t: "PWA & Offline-first UX", o: "Google", date: "Aug 2022", cat: "Frontend" },
  { t: "Edge Rendering Strategies", o: "Vercel Ship", date: "Oct 2023", cat: "Cloud & DevOps" },
  { t: "Engineering Leadership", o: "Plato", date: "Dec 2023", cat: "Leadership" },
  { t: "Scrum Master Foundations", o: "Scrum.org", date: "Jun 2022", cat: "Leadership" },
  { t: "Code Review Excellence", o: "ThoughtWorks", date: "Mar 2023", cat: "Leadership" },
  { t: "Frontend Security (OWASP)", o: "OWASP", date: "Nov 2023", cat: "Frontend" },
];

export const certCategories: CertCategory[] = [
  "Frontend",
  "Backend",
  "Cloud & DevOps",
  "Testing & Quality",
  "Design & UX",
  "Leadership",
];

// Extracts year from a "Mon YYYY" date string.
export function getCertYear(cert: Cert): number {
  const m = cert.date.match(/\b(20\d{2})\b/);
  // Validamos que 'm' exista y que la posición 1 tenga contenido
  if (m && m[1]) {
    return parseInt(m[1], 10);
  }
  return 0;
}