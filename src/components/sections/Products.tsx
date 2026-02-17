"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { BeerCard, ScrollReveal } from "@/components/ui";

// Static beer data — names, styles, ABV, images, URLs don't change by locale
const beerBase = [
  {
    id: "1",
    name: "Double Aura",
    style: "IPA - New England / Hazy",
    abv: 7.8,
    image: "https://assets.untappd.com/site/beer_logos/beer-3683191_cf7dc_sm.jpeg",
    isCore: true,
    isFeatured: true,
    untappdUrl: "https://untappd.com/b/brasserie-artisanale-gallicus-double-aura/3683191",
  },
  {
    id: "2",
    name: "Lucha Libre",
    style: "Lager - Mexican",
    abv: 4.0,
    image: null,
    isCore: true,
    isFeatured: false,
    untappdUrl: "https://untappd.com/b/brasserie-artisanale-gallicus-lucha-libre/5377460",
  },
  {
    id: "3",
    name: "Syn",
    style: "West Coast IPA",
    abv: 6.5,
    image: "/images/labels/syn.png",
    isCore: true,
    isFeatured: true,
    untappdUrl: "https://untappd.com/b/brasserie-artisanale-gallicus-syn-bleue-west-coast-ipa/3953337",
  },
  {
    id: "4",
    name: "IPA",
    style: "IPA Nord-Américaine",
    abv: 6.5,
    image: "/images/labels/ipa.png",
    isCore: true,
    isFeatured: true,
    untappdUrl: "https://untappd.com/Gallicusadmin/beer",
  },
];

export default function Products() {
  const t = useTranslations("beers");

  // Merge static data with translated descriptions and tasting notes
  const beers = beerBase.map((beer, i) => ({
    ...beer,
    description: t(`beers.${i}.description`),
    tastingNotes: [0, 1, 2, 3].map((j) => t(`beers.${i}.tastingNotes.${j}`)),
  }));

  return (
    <section id="beers" className="section bg-background">
      <div className="container-narrow">
        {/* Header */}
        <ScrollReveal variant="fadeUp">
          <div className="text-center mb-14 md:mb-20">
            <p className="font-heading text-xs uppercase tracking-[0.2em] text-turquoise mb-4">
              {t("subtitle")}
            </p>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold">
              {t("title")}
            </h2>
            <div className="mt-6 flex items-center justify-center gap-3">
              <div className="w-12 h-px bg-foreground/20" />
              <div className="w-2 h-2 rotate-45 bg-turquoise" />
              <div className="w-12 h-px bg-foreground/20" />
            </div>
          </div>
        </ScrollReveal>

        {/* Beer Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {beers.map((beer, index) => (
            <ScrollReveal key={beer.id} variant="fadeUp" delay={index * 0.1}>
              <BeerCard beer={beer} />
            </ScrollReveal>
          ))}
        </div>

        {/* Untappd CTA */}
        <ScrollReveal variant="fadeUp" delay={0.2}>
          <div className="mt-16 md:mt-20 text-center">
            <a
              href="https://untappd.com/Gallicusadmin/beer"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-5 px-8 py-5 bg-beige/50 border border-foreground/5 hover:border-turquoise/50 hover:bg-beige transition-all duration-300"
            >
              <Image
                src="/images/logo/untappd.png"
                alt="Untappd"
                width={40}
                height={40}
                className="opacity-50 group-hover:opacity-80 transition-opacity"
              />
              <div className="text-left">
                <p className="font-heading text-sm uppercase tracking-[0.1em] group-hover:text-turquoise transition-colors">
                  {t("viewAll")}
                </p>
                <p className="text-xs text-foreground/50 mt-0.5">
                  {t("viewAllSub")}
                </p>
              </div>
              <svg className="w-4 h-4 text-foreground/30 group-hover:text-turquoise group-hover:translate-x-1 transition-all ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
