"use client";

import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import Image from "next/image";

const heroImages = [
  "/images/general/gallicus-website-01.jpg",
  "/images/general/gallicus-website-02.jpg",
  "/images/general/gallicus-website-03.jpg",
  "/images/general/gallicus-website-05.jpg",
  "/images/general/gallicus-website-08.jpg",
  "/images/general/gallicus-website-09.jpg",
  "/images/general/gallicus-website-11.jpg",
];

export default function Hero() {
  const t = useTranslations("hero");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Images with Crossfade */}
      {heroImages.map((src, index) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentImageIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={src}
            alt=""
            fill
            className="object-cover"
            priority={index === 0}
            sizes="100vw"
          />
        </div>
      ))}

      {/* Dark Overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 text-white">
        {/* Solo G Logo - decorative */}
        <div className="mb-6 opacity-90">
          <Image
            src="/images/logo/gallicus-solog.png"
            alt=""
            width={80}
            height={80}
            className="mx-auto w-16 md:w-20 h-auto invert"
            priority
          />
        </div>

        {/* Brand Name */}
        <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl tracking-[0.2em] mb-4">
          GALLICUS
        </h1>

        {/* Tagline */}
        <p className="font-heading text-sm md:text-base uppercase tracking-[0.3em] text-turquoise mb-6">
          Brasserie Artisanale
        </p>

        {/* Decorative divider */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="w-12 h-px bg-white/30" />
          <div className="w-2 h-2 rotate-45 border border-turquoise" />
          <div className="w-12 h-px bg-white/30" />
        </div>

        {/* Location */}
        <p className="text-white/60 tracking-widest text-sm uppercase">{t("location")}</p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-white/70">
        <span className="font-heading text-[10px] uppercase tracking-[0.25em]">
          {t("scrollDown")}
        </span>
        <div className="w-px h-8 bg-gradient-to-b from-turquoise to-transparent" />
      </div>

      {/* Image indicators */}
      <div className="absolute bottom-10 right-8 flex gap-1.5">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`h-1 transition-all duration-300 ${
              index === currentImageIndex
                ? "bg-turquoise w-8"
                : "bg-white/30 w-4 hover:bg-white/50"
            }`}
            aria-label={`View image ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
