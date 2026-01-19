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
}

interface BeerCardProps {
  beer: Beer;
}

function RatingStars({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-0.5">
      {[...Array(fullStars)].map((_, i) => (
        <svg key={`full-${i}`} className="w-3.5 h-3.5 text-turquoise" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      {hasHalfStar && (
        <svg className="w-3.5 h-3.5 text-turquoise" fill="currentColor" viewBox="0 0 20 20">
          <defs>
            <linearGradient id="half">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <path fill="url(#half)" stroke="currentColor" strokeWidth="0.5" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <svg key={`empty-${i}`} className="w-3.5 h-3.5 text-foreground/20" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="ml-1 text-xs text-foreground/60">({rating.toFixed(1)})</span>
    </div>
  );
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
                Vedette
              </span>
            ) : (
              <span className="bg-foreground/80 text-background font-heading text-[10px] uppercase tracking-[0.15em] px-3 py-1.5">
                Classique
              </span>
            )}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 md:p-8">
        <div className="flex items-start justify-between gap-4 mb-3">
          <h3 className="font-heading text-xl md:text-2xl font-bold leading-tight">{beer.name}</h3>
          {beer.rating && (
            <div className="flex-shrink-0">
              <RatingStars rating={beer.rating} />
            </div>
          )}
        </div>

        <p className="text-xs text-foreground/50 mb-4 font-heading uppercase tracking-[0.15em]">
          {beer.style}
        </p>

        <p className="text-sm text-foreground/70 leading-relaxed line-clamp-2">
          {beer.description}
        </p>

        {/* CTA */}
        {beer.untappdUrl && (
          <div className="mt-6 pt-5 border-t border-foreground/5">
            <a
              href={beer.untappdUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-heading text-xs uppercase tracking-[0.15em] text-foreground/40 hover:text-turquoise transition-colors"
            >
              Voir sur Untappd
              <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        )}
      </div>
    </motion.div>
  );
}
