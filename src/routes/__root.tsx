import React, { useEffect } from 'react';
import { Outlet, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { CustomCursor } from "../components/web/CustomCursor";
import { Nav } from "../components/portfolio/Nav"; 
import { Toaster } from "sonner";
import { I18nProvider, useI18n } from "../lib/i18n"; // Importamos useI18n
import { ThemeProvider } from "../lib/theme";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Luis Meléndez | Lead Frontend & Design System Engineer" },
      { name: "description", content: "Professional portfolio of Luis Meléndez, specialist in Design Systems and Frontend Architecture." },
    ],
  }),
  component: RootComponent,
});

// Component to handle side effects of language changes
function LangManager({ children }: { children: React.ReactNode }) {
  const { lang } = useI18n();

  useEffect(() => {
    // Dynamically update the html lang attribute
    document.documentElement.lang = lang;
  }, [lang]);

  return <>{children}</>;
}

function RootComponent() {
  return (
    <ThemeProvider>
      <I18nProvider>
        <LangManager>
          <HeadContent />
          <CustomCursor />
          
          <Nav />
          
          <main className="relative min-h-screen antialiased selection:bg-emerald/30 bg-background text-foreground">
            <Outlet />
          </main>

          <Toaster position="bottom-right" theme="dark" />
          <Scripts />
        </LangManager>
      </I18nProvider>
    </ThemeProvider>
  );
}