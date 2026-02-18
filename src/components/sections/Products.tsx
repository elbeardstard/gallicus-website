import { getTranslations, getLocale } from "next-intl/server";
import Image from "next/image";
import { BeerCard, ScrollReveal } from "@/components/ui";
import { getBeers } from "@/lib/data/beers";

export default async function Products() {
  const locale = (await getLocale()) as "fr" | "en";
  const t = await getTranslations("beers");
  const beers = await getBeers(locale);

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
              href="https://untappd.com/v/gallicus-brasserie-artisanale/8707258"
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
              <svg
                className="w-4 h-4 text-foreground/30 group-hover:text-turquoise group-hover:translate-x-1 transition-all ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
