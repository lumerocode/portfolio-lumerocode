// Plain data — safe to copy to a React Native (Expo) project as-is.

export type LocalizedString = {
  es: string;
  en: string;
};

export type LocalizedBullets = {
  es: string[];
  en: string[];
};

export type ExperienceRole = {
  company: string;
  role: LocalizedString;
  location: LocalizedString;
  period: string; // Dates usually remain same across languages
  bullets: LocalizedBullets;
  stack: string[];
};

export const experienceRoles: ExperienceRole[] = [
  {
    company: "Multiplica Talent / Pandero",
    role: {
      es: "Lead Frontend / Design System Engineer (Lit.dev)",
      en: "Lead Frontend / Design System Engineer (Lit.dev)"
    },
    location: {
      es: "Lima — Remoto",
      en: "Lima — Remote"
    },
    period: "Oct 2025 — Apr 2026",
    bullets: {
      es: [
        "Design System escalable basado en Web Components con Lit.dev y principios de Atomic Design.",
        "Arquitectura y mantenimiento de una librería de componentes reutilizables con estándares de desarrollo.",
        "Componentes core, sistema de theming con CSS Variables y utilidades compartidas.",
        "Optimización de performance y bundle size de los componentes.",
        "Storybook como documentación: stories completas, variantes y testing visual.",
        "Componentes framework-agnostic, facilitando su adopción en distintos equipos.",
        "Liderazgo técnico: mentoría, code reviews y resolución de desafíos avanzados.",
        "Guías operativas con soporte audiovisual para bloques en WordPress / Gutenberg.",
      ],
      en: [
        "Scalable Design System based on Web Components with Lit.dev and Atomic Design principles.",
        "Architecture and maintenance of a reusable component library with development standards.",
        "Core components, theming system with CSS Variables, and shared utilities.",
        "Performance optimization and bundle size reduction for components.",
        "Storybook for documentation: complete stories, variants, and visual testing.",
        "Framework-agnostic components, facilitating adoption across different teams.",
        "Technical leadership: mentoring, code reviews, and advanced Web Components challenges.",
        "Operational guides with audiovisual support for WordPress / Gutenberg blocks.",
      ]
    },
    stack: ["Lit.dev", "Web Components", "Storybook", "TypeScript", "WordPress"],
  },
  {
    company: "Upwards Studio",
    role: {
      es: "Cofundador y Líder de Producto",
      en: "Co-founder & Product Lead"
    },
    location: {
      es: "Lima — Remoto",
      en: "Lima — Remote"
    },
    period: "Jul 2024 — Jan 2026",
    bullets: {
      es: [
        "Lideré la definición y ejecución de productos digitales desde ideación hasta lanzamiento.",
        "Diseño de soluciones a medida (web, eCommerce, apps) aterrizando requerimientos de clientes.",
        "Propuestas funcionales y técnicas: alcances, flujos y componentes clave.",
        "Gestión del flujo de trabajo en Jira: tareas, prioridades y seguimiento.",
        "Implementación técnica en CMS (WordPress, Shopify) y software a medida (React, Vue, Angular).",
        "Automatizaciones y metodologías ágiles para optimizar tiempos de entrega.",
        "Supervisión del control de calidad (QA) antes de cada lanzamiento.",
      ],
      en: [
        "Led the definition and execution of digital products from ideation to launch.",
        "Design of custom solutions (web, eCommerce, apps) by landing client requirements.",
        "Functional and technical proposals: scopes, flows, and key components.",
        "Workflow management in Jira: tasks, priorities, and tracking.",
        "Technical implementation in CMS (WordPress, Shopify) and custom software (React, Vue, Angular).",
        "Automations and agile methodologies to optimize delivery times.",
        "Quality control (QA) supervision before each launch.",
      ]
    },
    stack: ["React", "Vue", "Angular", "React Native", "Shopify", "WordPress"],
  },
  {
    company: "Factoring Prestamype",
    role: {
      es: "Frontend Developer — Vue.js",
      en: "Frontend Developer — Vue.js"
    },
    location: {
      es: "Lima — Remoto",
      en: "Lima — Remote"
    },
    period: "Sep 2022 — Jul 2025",
    bullets: {
      es: [
        "Conversión de diseños UX/UI en interfaces interactivas y responsivas.",
        "Maquetación con Vue.js (Options + Composition API) y Nuxt.js.",
        "Liderazgo del equipo Frontend: gestión de tareas y best practices.",
        "Consumo e integración de APIs REST y manejo de datos JSON.",
        "Desarrollo y mantenimiento de sitios con HubSpot CMS y temas con HubL.",
        "Microfrontends con Module Federation (Webpack) integrando Vue 2 y Vue 3.",
        "Pruebas unitarias y de usuario para garantizar calidad.",
        "Colaboración en backend Node.js con NestJS e integración FE/BE.",
      ],
      en: [
        "Conversion of UX/UI designs into interactive and responsive interfaces.",
        "Layout with Vue.js (Options + Composition API) and Nuxt.js.",
        "Frontend team leadership: task management and best practices.",
        "Consumption and integration of REST APIs and JSON data handling.",
        "Development and maintenance of sites with HubSpot CMS and HubL themes.",
        "Microfrontends with Module Federation (Webpack) integrating Vue 2 and Vue 3.",
        "Unit and user testing to ensure quality.",
        "Collaboration on Node.js backend with NestJS and FE/BE integration.",
      ]
    },
    stack: ["Vue 3", "Nuxt", "TypeScript", "NestJS", "Module Federation"],
  },
  {
    company: "Divelia Studio S.A.C.",
    role: {
      es: "Frontend & CMS Developer",
      en: "Frontend & CMS Developer"
    },
    location: {
      es: "Lima — Remoto",
      en: "Lima — Remote"
    },
    period: "May 2021 — Jan 2022",
    bullets: {
      es: [
        "Sitios web con HTML, CSS, JavaScript y React.js, mejorando accesibilidad y SEO.",
        "Resolución de problemas y corrección de errores en la interfaz de usuario.",
        "Integración de portales empresariales con Liferay.",
        "Diseño web personalizado con WordPress y Prestashop.",
        "Mejora de velocidad y rendimiento mediante optimización de BD y caching.",
        "Aplicación de parches de seguridad y mantenimiento del CMS.",
      ],
      en: [
        "Websites with HTML, CSS, JavaScript, and React.js, improving accessibility and SEO.",
        "Troubleshooting and bug fixing in the user interface.",
        "Integration of enterprise portals with Liferay.",
        "Custom web design with WordPress and Prestashop.",
        "Speed and performance improvement through DB optimization and caching.",
        "Application of security patches and regular CMS maintenance.",
      ]
    },
    stack: ["React", "WordPress", "Prestashop", "Liferay"],
  },
];