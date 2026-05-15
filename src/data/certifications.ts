// Plain data — safe to copy to a React Native project.

export type CertCategory =
  | "Backend"
  | "Cibersecurity"
  | "Cloud & DevOps"
  | "CMS"
  | "Design & UX"
  | "English language"
  | "Frontend"
  | "Leadership"
  | "Software development"
  | "Testing & Quality";

export interface LocalizedTitle {
  es: string;
  en: string;
}

export type Cert = { 
  t: LocalizedTitle; 
  o: string; 
  date: string; 
  cat: CertCategory[]; // Changed to Array
  file: string; 
};

export const certs: Cert[] = [
  // 2013
  { 
    t: { es: "Inglés básico", en: "Basic English" }, 
    o: "Universidad Nacional del Santa", 
    date: "Nov 2013", 
    cat: ["English language"],
    file: "basic-english.pdf" 
  },

  // 2014
  { 
    t: { es: "Inglés Intermedio", en: "Intermediate English" }, 
    o: "Universidad Nacional del Santa", 
    date: "Jun 2014", 
    cat: ["English language"],
    file: "intermediate-english.pdf" 
  },

  // 2015
  { 
    t: { es: "Inglés Avanzado", en: "Advanced English" }, 
    o: "Universidad Nacional del Santa", 
    date: "Mar 2015", 
    cat: ["English language"],
    file: "advanced-english.pdf" 
  },

  // 2020
  { 
    t: { es: "Certificado de Fundamentos de Scrum", en: "Scrum Foundation Professional Certificate" }, 
    o: "Scrum Foundation", 
    date: "Jul 2020", 
    cat: ["Cibersecurity"],
    file: "scrum-foundation-certificate.pdf" 
  },
  { 
    t: { es: "Ciberseguridad en el Teletrabajo", en: "Cybersecurity in Remote Work" }, 
    o: "Google Activate", 
    date: "Dic 2020", 
    cat: ["Cibersecurity"],
    file: "cybersecurity-in-remote-work.pdf" 
  },
  { 
    t: { es: "Computación en la Nube", en: "Cloud Computing" }, 
    o: "Google Activate", 
    date: "Dic 2020", 
    cat: ["Cloud & DevOps"],
    file: "cloud-computing.pdf" 
  },
  { 
    t: { es: "Productividad Personal", en: "Personal Productivity" }, 
    o: "Google Activate", 
    date: "Dic 2020", 
    cat: ["Leadership"],
    file: "personal-productivity.pdf" 
  },

  // 2021
  { 
    t: { es: "Introducción al Desarrollo Web I", en: "Introduction to Web Development I" }, 
    o: "Platzi", 
    date: "Mar 2021", 
    cat: ["Frontend"],
    file: "web-development-intro-i.pdf" 
  },
  { 
    t: { es: "Diseño Web Responsivo", en: "Responsive Web Design" }, 
    o: "freeCodeCamp", 
    date: "Abr 2021", 
    cat: ["Software development", "Frontend"],
    file: "responsive-web-design.pdf" 
  },
  { 
    t: { es: "Creación de Tiendas en línea con Woocommerce", en: "Creating Online Stores with WooCommerce" }, 
    o: "Platzi", 
    date: "Jul 2021", 
    cat: ["CMS"],
    file: "woocommerce-online-stores.pdf" 
  },
  { 
    t: { es: "Arquitectura de Información", en: "Information Architecture Course" }, 
    o: "Adrián Solca", 
    date: "Nov 2021", 
    cat: ["Software development"],
    file: "information-architecture.pdf" 
  },

  // 2022
  { 
    t: { es: "Frontend Developer", en: "Frontend Developer" }, 
    o: "Platzi", 
    date: "Ene 2022", 
    cat: ["Software development", "Frontend"],
    file: "frontend-developer-platzi.pdf" 
  },
  { 
    t: { es: "JavaScript Básico", en: "Basic JavaScript" }, 
    o: "Platzi", 
    date: "Ene 2022", 
    cat: ["Software development", "Frontend"],
    file: "basic-javascript.pdf" 
  },
  { 
    t: { es: "Práctica de Desarrollador Frontend", en: "Frontend Developer Practice" }, 
    o: "Platzi", 
    date: "Ene 2022", 
    cat: ["Software development", "Frontend"],
    file: "frontend-developer-practice.pdf" 
  },
  { 
    t: { es: "Práctica de JavaScript", en: "JavaScript Practice" }, 
    o: "Platzi", 
    date: "Ene 2022", 
    cat: ["Software development", "Frontend"],
    file: "javascript-practice.pdf" 
  },
  { 
    t: { es: "Diseño Responsivo: Maquetación Mobile First", en: "Responsive Design: Mobile First Layout" }, 
    o: "Platzi", 
    date: "Ene 2022", 
    cat: ["Software development", "Frontend"],
    file: "responsive-design-mobile-first.pdf" 
  },
  { 
    t: { es: "Práctica de HTML y CSS", en: "HTML and CSS Practice" }, 
    o: "Platzi", 
    date: "Ene 2022", 
    cat: ["Software development", "Frontend"],
    file: "html-css-practice.pdf" 
  },
  { 
    t: { es: "HTML y CSS Definitivo", en: "HTML and CSS Mastery" }, 
    o: "Platzi", 
    date: "Ene 2022", 
    cat: ["Software development", "Frontend"],
    file: "html-css-mastery.pdf" 
  },
  { 
    t: { es: "Introducción a React js", en: "Introduction to React js" }, 
    o: "Platzi", 
    date: "Feb 2022", 
    cat: ["Software development", "Frontend"],
    file: "react-js-intro.pdf" 
  },
  { 
    t: { es: "Curso de inglés para Desarrolladores", en: "English Course for Developers" }, 
    o: "Platzi", 
    date: "Feb 2022", 
    cat: ["Software development", "English language"],
    file: "english-course-for-developers.pdf" 
  },
  { 
    t: { es: "Asíncronismo con Javascript", en: "Asynchronous Programming with JavaScript" }, 
    o: "Platzi", 
    date: "Feb 2022", 
    cat: ["Software development", "Frontend"],
    file: "javascript-async.pdf" 
  },
  { 
    t: { es: "Closures y Scope en JavaScript", en: "Closures and Scope in JavaScript" }, 
    o: "Platzi", 
    date: "Feb 2022", 
    cat: ["Software development", "Frontend"],
    file: "javascript-closures-scope.pdf" 
  },
  { 
    t: { es: "ECMScript 6+", en: "ECMAScript 6+" }, 
    o: "Platzi", 
    date: "Feb 2022", 
    cat: ["Software development", "Frontend"],
    file: "ecmascript-6.pdf" 
  },
  { 
    t: { es: "Frameworks y Librerías de Javascript", en: "JavaScript Frameworks and Libraries" }, 
    o: "Platzi", 
    date: "Mar 2022", 
    cat: ["Software development", "Frontend"],
    file: "javascript-frameworks-libraries.pdf" 
  },
  { 
    t: { es: "Diseño para Programadores", en: "Design for Developers" }, 
    o: "Platzi", 
    date: "Mar 2022", 
    cat: ["Software development", "Design & UX"],
    file: "design-for-developers.pdf" 
  },
  { 
    t: { es: "Gestión de Dependencias y paquetes con npm", en: "Dependency Management with npm" }, 
    o: "Platzi", 
    date: "Mar 2022", 
    cat: ["Software development", "Frontend"],
    file: "npm-dependency-management.pdf" 
  },
  { 
    t: { es: "Profesional de Javascript", en: "JavaScript Professional" }, 
    o: "Platzi", 
    date: "Abr 2022", 
    cat: ["Software development", "Frontend"],
    file: "javascript-professional.pdf" 
  },
  { 
    t: { es: "React Js: Patrones de Render y Composición", en: "React Js: Rendering and Composition Patterns" }, 
    o: "Platzi", 
    date: "Abr 2022", 
    cat: ["Software development", "Frontend"],
    file: "react-js-patterns.pdf" 
  },
  { 
    t: { es: "Desarrollo Web", en: "Web Development" }, 
    o: "Coderhouse", 
    date: "Oct 2022",
    cat: ["Software development", "Frontend"],
    file: "web-development-coderhouse.pdf" 
  },

  // 2023
  { 
    t: { es: "Javascript", en: "Javascript" }, 
    o: "Coderhouse", 
    date: "Ene 2023", 
    cat: ["Software development", "Frontend"],
    file: "javascript-coderhouse.pdf" 
  },

  // 2024
  { 
    t: { es: "Inglés Avanzado Actualización", en: "Advanced English Update" }, 
    o: "SmallTalk2me", 
    date: "Jul 2025", 
    cat: ["English language"],
    file: "advanced-english-update.pdf" 
  },
  // 2025
  { 
    t: { es: "Auditoría de Accesibilidad Digital", en: "Digital Accessibility Audit" }, 
    o: "WeAAAre", 
    date: "Sep 2025", 
    cat: ["Testing & Quality"],
    file: "digital-accessibility-audit.pdf" 
  },
];

export const certCategories: CertCategory[] = [
  "Backend",
  "Cibersecurity",
  "Cloud & DevOps",
  "CMS",
  "Design & UX",
  "English language",
  "Frontend",
  "Leadership",
  "Software development",
  "Testing & Quality",
];

export function getCertYear(cert: Cert): number {
  const m = cert.date.match(/\b(20\d{2})\b/);
  if (m && m[1]) {
    return parseInt(m[1], 10);
  }
  return 0;
}