"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { ScrollReveal } from "@/components/ui";

export default function About() {
  const t = useTranslations("about");

  return (
    <section id="about" className="section bg-beige relative overflow-hidden">
      {/* Decorative background G */}
      <div className="absolute -right-20 top-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none">
        <Image
          src="/images/logo/gallicus-solog.png"
          alt=""
          width={600}
          height={600}
          className="w-[400px] md:w-[600px]"
        />
      </div>

      <div className="container-narrow relative">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Left: Title */}
          <ScrollReveal variant="fadeRight">
            <div>
              <p className="font-heading text-xs uppercase tracking-[0.2em] text-turquoise mb-4">
                {t("subtitle")}
              </p>
              <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-[0.95]">
                {t("title")}
              </h2>
              <div className="mt-6 flex items-center gap-3">
                <div className="w-16 h-px bg-foreground" />
                <div className="w-2 h-2 rotate-45 bg-turquoise" />
              </div>
            </div>
          </ScrollReveal>

          {/* Right: Content */}
          <ScrollReveal variant="fadeLeft" delay={0.15}>
            <div className="space-y-6">
              <p className="text-lg md:text-xl leading-relaxed font-light">
                {t("description")}
              </p>
              <p className="text-foreground/60 leading-relaxed">
                {t("philosophy")}
              </p>
            </div>
          </ScrollReveal>
        </div>

        {/* Stats row */}
        <div className="mt-20 md:mt-28 pt-12 border-t border-foreground/10">
          <div className="grid grid-cols-3 gap-8">
            <ScrollReveal variant="fadeUp" delay={0}>
              <div className="text-center">
                <p className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-turquoise">
                  2020
                </p>
                <p className="mt-3 font-heading text-[10px] md:text-xs uppercase tracking-[0.2em] text-foreground/60">
                  Fondée
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal variant="fadeUp" delay={0.1}>
              <div className="text-center border-x border-foreground/10">
                <p className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-turquoise">
                  100%
                </p>
                <p className="mt-3 font-heading text-[10px] md:text-xs uppercase tracking-[0.2em] text-foreground/60">
                  Artisanale
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal variant="fadeUp" delay={0.2}>
              <div className="text-center">
                <p className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-turquoise">
                  QC
                </p>
                <p className="mt-3 font-heading text-[10px] md:text-xs uppercase tracking-[0.2em] text-foreground/60">
                  Gatineau
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
