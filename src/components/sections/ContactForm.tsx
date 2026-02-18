"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { ScrollReveal } from "@/components/ui";

interface ContactFormProps {
  address1: string;
  address2: string;
  email: string;
  instagramUrl: string;
  instagramHandle: string;
}

export default function ContactForm({
  address1,
  address2,
  email,
  instagramUrl,
  instagramHandle,
}: ContactFormProps) {
  const t = useTranslations("contact");
  const tFooter = useTranslations("footer");
  const [formState, setFormState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("Failed to send message");
      setFormState("success");
      setFormData({ name: "", email: "", message: "" });
    } catch {
      setFormState("error");
    }
  };

  return (
    <section id="contact" className="section bg-background">
      <div className="container-narrow">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          {/* Left: Info */}
          <ScrollReveal variant="fadeRight">
            <div>
              <p className="font-heading text-xs uppercase tracking-[0.2em] text-turquoise mb-4">
                {t("subtitle")}
              </p>
              <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
                {t("title")}
              </h2>
              <div className="mb-10 flex items-center gap-3">
                <div className="w-12 h-px bg-foreground/20" />
                <div className="w-2 h-2 rotate-45 bg-turquoise" />
              </div>

              <div className="space-y-8">
                <div>
                  <h3 className="font-heading text-[10px] uppercase tracking-[0.2em] text-foreground/40 mb-2">
                    {t("info.address")}
                  </h3>
                  <p className="text-foreground/70 leading-relaxed">
                    {address1}
                    <br />
                    {address2}
                  </p>
                </div>

                <div>
                  <h3 className="font-heading text-[10px] uppercase tracking-[0.2em] text-foreground/40 mb-2">
                    {t("info.email")}
                  </h3>
                  <a
                    href={`mailto:${email}`}
                    className="text-foreground/70 hover:text-turquoise transition-colors"
                  >
                    {email}
                  </a>
                </div>

                <div>
                  <h3 className="font-heading text-[10px] uppercase tracking-[0.2em] text-foreground/40 mb-2">
                    {tFooter("followUs")}
                  </h3>
                  <a
                    href={instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-foreground/70 hover:text-turquoise transition-colors"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                    {instagramHandle}
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right: Form */}
          <ScrollReveal variant="fadeLeft" delay={0.15}>
            <div className="bg-beige/30 p-8 md:p-10">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="name"
                    className="block font-heading text-[10px] uppercase tracking-[0.2em] text-foreground/50 mb-2"
                  >
                    {t("form.name")}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-background border border-foreground/10 focus:border-turquoise focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block font-heading text-[10px] uppercase tracking-[0.2em] text-foreground/50 mb-2"
                  >
                    {t("form.email")}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-background border border-foreground/10 focus:border-turquoise focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block font-heading text-[10px] uppercase tracking-[0.2em] text-foreground/50 mb-2"
                  >
                    {t("form.message")}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-background border border-foreground/10 focus:border-turquoise focus:outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={formState === "sending"}
                  className="w-full font-heading text-xs uppercase tracking-[0.15em] bg-foreground text-background px-8 py-4 hover:bg-turquoise active:scale-[0.98] transition-all duration-200 disabled:opacity-50 mt-2"
                >
                  {formState === "sending" ? t("form.sending") : t("form.submit")}
                </button>

                {formState === "success" && (
                  <p className="text-turquoise text-sm text-center pt-2">{t("form.success")}</p>
                )}
                {formState === "error" && (
                  <p className="text-red-600 text-sm text-center pt-2">{t("form.error")}</p>
                )}
              </form>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
