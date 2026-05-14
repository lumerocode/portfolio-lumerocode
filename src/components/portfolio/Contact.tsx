import { useState } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import { toast } from "sonner";
import { useI18n } from "../../lib/i18n"; 
import { SectionHeader } from "./Expertise";
import { Mail, Send, Download } from "lucide-react";
import { SiGithub } from "react-icons/si";

/**
 * Zod Schema for client-side form validation
 */
const schema = z.object({
  name: z.string().trim().min(1).max(80),
  email: z.string().trim().email().max(200),
  message: z.string().trim().min(1).max(1000),
});

/**
 * LinkedIn SVG Icon
 * Used directly to bypass icon library export issues.
 */
const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export function Contact() {
  const { t, lang } = useI18n();
  const [pending, setPending] = useState(false);

  /**
   * Logic to determine which PDF file to download based on current language.
   * Files must exist in the /public folder.
   */
  const resumeFile = lang === "es" ? "/resume-es.pdf" : "/resume-en.pdf";

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Invalid input");
      return;
    }

    setPending(true);
    try {
      const res = await fetch("https://formsubmit.co/ajax/luismelendez0894@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: parsed.data.name,
          email: parsed.data.email,
          message: parsed.data.message,
          _subject: `New portfolio message from ${parsed.data.name}`,
          _template: "table",
          _captcha: "false",
        }),
      });

      if (!res.ok) throw new Error("Network error");
      
      toast.success(t("contact.sent"));
      form.reset();
    } catch {
      toast.error(t("contact.error"));
    } finally {
      setPending(false);
    }
  };

  return (
    <section id="contact" className="relative py-28 border-t border-border/60">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader title={t("contact.title")} sub={t("contact.sub")} />

        <div className="mt-14 grid lg:grid-cols-5 gap-6">
          {/* Contact Info Card */}
          <motion.div
            key={`info-${lang}`}
            initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="lg:col-span-2 rounded-2xl border border-border bg-card p-8 shadow-card flex flex-col"
          >
            <div className="font-display text-2xl font-semibold">Luis Meléndez</div>
            <div className="text-sm text-muted-foreground mt-1">{t("contact.role")}</div>

            <div className="mt-8 space-y-4">
              <a href="mailto:luismelendez0894@gmail.com" className="flex items-center gap-3 text-sm hover:text-emerald transition-colors">
                <Mail className="size-4 text-emerald" /> luismelendez0894@gmail.com
              </a>
              <a href="https://github.com/lumerocode" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-sm hover:text-emerald transition-colors">
                <SiGithub className="size-4 text-emerald" /> github.com/lumerocode
              </a>
              <a href="https://linkedin.com/in/lumerocode/" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-sm hover:text-emerald transition-colors">
                <LinkedInIcon className="size-4 text-emerald" /> linkedin.com/in/lumerocode/
              </a>
            </div>

            {/* Language-aware Resume Download */}
            <a href={resumeFile} download className="mt-auto pt-8">
              <span className="inline-flex items-center gap-2 h-11 px-5 rounded-lg border border-border bg-background hover:border-primary/40 transition-all font-medium text-sm">
                <Download className="size-4" /> {t("hero.cta2")}
              </span>
            </a>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            key={`form-${lang}`}
            initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            onSubmit={onSubmit}
            className="lg:col-span-3 rounded-2xl border border-border bg-card p-8 shadow-card space-y-4"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <Field name="name" label={t("contact.name")} maxLength={80} />
              <Field name="email" label={t("contact.email")} type="email" maxLength={200} />
            </div>
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                {t("contact.message")}
              </label>
              <textarea
                name="message" rows={6} maxLength={1000} required
                className="mt-2 w-full bg-background border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-emerald/50 focus:border-emerald/50 transition-all resize-none"
              />
            </div>
            <button
              type="submit" disabled={pending}
              className="inline-flex items-center gap-2 h-11 px-5 rounded-lg gradient-emerald text-primary-foreground font-medium shadow-elegant hover:opacity-95 disabled:opacity-50 transition-all"
            >
              <Send className="size-4" /> {pending ? t("contact.sending") : t("contact.send")}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

function Field({ name, label, type = "text", maxLength }: { name: string; label: string; type?: string; maxLength?: number }) {
  return (
    <div>
      <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">{label}</label>
      <input
        name={name} type={type} required maxLength={maxLength}
        className="mt-2 w-full h-11 bg-background border border-border rounded-lg px-4 text-sm focus:outline-none focus:ring-1 focus:ring-emerald/50 focus:border-emerald/50 transition-all"
      />
    </div>
  );
}