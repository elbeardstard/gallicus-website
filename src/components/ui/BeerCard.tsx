"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion } from "framer-motion";

interface Beer {
  id: string;
  name: string;
  style: string;
  abv: number;
  rating?: number;
  description: string;
  image: string | null;
  isCore: boolean;
  isFeatured: boolean;
  untappdUrl?: string;
  tastingNotes?: string[];
}

interface BeerCardProps {
  beer: Beer;
}

export default function BeerCard({ beer }: BeerCardProps) {
  const t = useTranslations("beers");

  return (
    <motion.div
      className="group bg-background border border-foreground/5 overflow-hidden shadow-sm"
      whileHover={{
        y: -4,
        boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
        borderColor: "rgba(10, 10, 10, 0.2)",
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] bg-gradient-to-br from-beige to-beige/50 overflow-hidden flex items-center justify-center">
        {beer.image ? (
          <Image
            src={beer.image}
            alt={beer.name}
            fill
            className="object-contain p-8 transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="font-heading text-7xl text-foreground/[0.07] mb-2">
                {beer.name.charAt(0)}
              </div>
              <div className="font-heading text-[10px] uppercase tracking-[0.2em] text-foreground/30">
                {beer.style.split(" - ")[0]}
              </div>
            </div>
          </div>
        )}

        {/* ABV Badge - top right */}
        <div className="absolute top-4 right-4">
          <span className="bg-foreground text-background font-heading text-xs px-3 py-1.5 tracking-wider">
            {beer.abv}%
          </span>
        </div>

        {/* Featured/Core Badge - bottom left */}
        {(beer.isFeatured || beer.isCore) && (
          <div className="absolute bottom-4 left-4">
            {beer.isFeatured ? (
              <span className="bg-turquoise text-white font-heading text-[10px] uppercase tracking-[0.15em] px-3 py-1.5">
                {t("featured")}
              </span>
            ) : (
              <span className="bg-foreground/80 text-background font-heading text-[10px] uppercase tracking-[0.15em] px-3 py-1.5">
                {t("core")}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 md:p-8">
        <h3 className="font-heading text-xl md:text-2xl font-bold leading-tight mb-1">{beer.name}</h3>

        <p className="text-xs text-foreground/50 mb-4 font-heading uppercase tracking-[0.15em]">
          {beer.style}
        </p>

        <p className="text-sm text-foreground/70 leading-relaxed line-clamp-2 mb-4">
          {beer.description}
        </p>

        {beer.tastingNotes && beer.tastingNotes.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {beer.tastingNotes.map((note) => (
              <span
                key={note}
                className="font-heading text-[9px] uppercase tracking-[0.14em] px-3 py-1.5 border border-turquoise/30 text-turquoise/70 hover:border-turquoise hover:text-turquoise hover:bg-turquoise/5 transition-all duration-200 cursor-default"
              >
                {note}
              </span>
            ))}
          </div>
        )}

        {/* CTA */}
        {beer.untappdUrl && (
          <div className="mt-6 pt-5 border-t border-foreground/5">
            <a
              href={beer.untappdUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link inline-flex items-center gap-2 font-heading text-xs uppercase tracking-[0.15em] text-foreground/40 hover:text-turquoise transition-colors duration-200"
            >
              {t("viewOnUntappd")}
              <svg className="w-3.5 h-3.5 transition-transform duration-200 group-hover/link:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        )}
      </div>
    </motion.div>
  );
}
