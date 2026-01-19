"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { ScrollReveal } from "@/components/ui";

export default function AvailabilityMap() {
  const t = useTranslations("findUs");

  return (
    <section id="find-us" className="section bg-beige">
      <div className="container-narrow">
        {/* Header */}
        <ScrollReveal variant="fadeUp">
          <div className="text-center mb-14 md:mb-16">
            <p className="font-heading text-xs uppercase tracking-[0.2em] text-turquoise mb-4">
              {t("subtitle")}
            </p>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold">
              {t("title")}
            </h2>
            <div className="mt-6 flex items-center justify-center gap-3">
              <div className="w-12 h-px bg-foreground/30" />
              <div className="w-2 h-2 rotate-45 bg-turquoise" />
              <div className="w-12 h-px bg-foreground/30" />
            </div>
          </div>
        </ScrollReveal>

        {/* Brewery Card */}
        <ScrollReveal variant="fadeUp" delay={0.1}>
          <div className="bg-foreground text-background p-8 md:p-12 mb-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
              <div>
                <span className="inline-block bg-turquoise text-white font-heading text-[10px] uppercase tracking-[0.15em] px-3 py-1.5 mb-5">
                  Salon de dégustation
                </span>
                <h3 className="font-heading text-2xl md:text-3xl font-bold mb-3">
                  Gallicus - Brasserie Artisanale
                </h3>
                <p className="text-background/60 text-sm mb-1">670 rue Auguste-Mondoux #4</p>
                <p className="text-background/60 text-sm mb-5">Gatineau, QC</p>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-turquoise" />
                  <p className="text-xs text-turquoise font-heading uppercase tracking-[0.15em]">
                    Ouvert: Jeudi - Dimanche
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="https://maps.google.com/?q=670+rue+Auguste-Mondoux+Gatineau+QC"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 font-heading text-xs uppercase tracking-[0.1em] bg-turquoise text-white px-6 py-3.5 hover:bg-background hover:text-foreground transition-colors duration-300"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Itinéraire
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Find Us Links */}
        <div className="grid md:grid-cols-2 gap-5">
          {/* PivoHub */}
          <ScrollReveal variant="fadeRight" delay={0.15}>
            <a
              href="https://explore.pivohub.com/en-ca/map"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-5 bg-background border border-foreground/5 p-6 hover:border-foreground/20 hover:shadow-md transition-all duration-300"
            >
              <div className="w-12 h-12 flex items-center justify-center bg-turquoise/10 group-hover:bg-turquoise/20 transition-colors">
                <svg className="w-6 h-6 text-turquoise" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-heading text-base font-bold mb-0.5 group-hover:text-turquoise transition-colors">
                  PivoHub
                </h3>
                <p className="text-xs text-foreground/50">
                  Trouvez nos bières près de chez vous
                </p>
              </div>
              <svg className="w-4 h-4 text-foreground/20 group-hover:text-turquoise group-hover:translate-x-0.5 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </ScrollReveal>

          {/* Untappd */}
          <ScrollReveal variant="fadeLeft" delay={0.2}>
            <a
              href="https://untappd.com/v/gallicus-brasserie-artisanale/8707258"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-5 bg-background border border-foreground/5 p-6 hover:border-foreground/20 hover:shadow-md transition-all duration-300"
            >
              <div className="w-12 h-12 flex items-center justify-center bg-turquoise/10 group-hover:bg-turquoise/20 transition-colors p-2.5">
                <Image
                  src="/images/logo/untappd.png"
                  alt="Untappd"
                  width={28}
                  height={28}
                  className="opacity-70 group-hover:opacity-100 transition-opacity"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-heading text-base font-bold mb-0.5 group-hover:text-turquoise transition-colors">
                  Untappd
                </h3>
                <p className="text-xs text-foreground/50">
                  Check-ins et avis de la communauté
                </p>
              </div>
              <svg className="w-4 h-4 text-foreground/20 group-hover:text-turquoise group-hover:translate-x-0.5 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
