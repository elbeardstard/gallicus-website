"use client";

import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

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
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  const lineExpand = {
    hidden: { width: 0, opacity: 0 },
    visible: { width: 48, opacity: 1 },
  };

  const transition = (delay: number) => ({
    duration: 0.8,
    delay: prefersReducedMotion ? 0 : delay,
    ease: [0.25, 0.1, 0.25, 1] as const,
  });

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
        <motion.div
          className="mb-6 opacity-90"
          initial={prefersReducedMotion ? "visible" : "hidden"}
          animate="visible"
          variants={scaleIn}
          transition={transition(0.2)}
        >
          <Image
            src="/images/logo/gallicus-solog.png"
            alt=""
            width={80}
            height={80}
            className="mx-auto w-16 md:w-20 h-auto invert"
            priority
          />
        </motion.div>

        {/* Brand Name */}
        <motion.h1
          className="font-heading text-5xl md:text-7xl lg:text-8xl tracking-[0.2em] mb-4"
          initial={prefersReducedMotion ? "visible" : "hidden"}
          animate="visible"
          variants={fadeUp}
          transition={transition(0.4)}
        >
          GALLICUS
        </motion.h1>

        {/* Tagline */}
        <motion.p
          className="font-heading text-sm md:text-base uppercase tracking-[0.3em] text-turquoise mb-6"
          initial={prefersReducedMotion ? "visible" : "hidden"}
          animate="visible"
          variants={fadeUp}
          transition={transition(0.6)}
        >
          {t("tagline")}
        </motion.p>

        {/* Decorative divider */}
        <motion.div
          className="flex items-center justify-center gap-4 mb-6"
          initial={prefersReducedMotion ? "visible" : "hidden"}
          animate="visible"
          variants={fadeIn}
          transition={transition(0.8)}
        >
          <motion.div
            className="h-px bg-white/30"
            initial={prefersReducedMotion ? { width: 48 } : { width: 0 }}
            animate={{ width: 48 }}
            transition={transition(0.8)}
          />
          <motion.div
            className="w-2 h-2 rotate-45 border border-turquoise"
            initial={prefersReducedMotion ? "visible" : "hidden"}
            animate="visible"
            variants={scaleIn}
            transition={transition(0.9)}
          />
          <motion.div
            className="h-px bg-white/30"
            initial={prefersReducedMotion ? { width: 48 } : { width: 0 }}
            animate={{ width: 48 }}
            transition={transition(0.8)}
          />
        </motion.div>

        {/* Location */}
        <motion.p
          className="text-white/60 tracking-widest text-sm uppercase mb-10"
          initial={prefersReducedMotion ? "visible" : "hidden"}
          animate="visible"
          variants={fadeIn}
          transition={transition(1.0)}
        >
          {t("location")}
        </motion.p>

        {/* CTA */}
        <motion.a
          href="#beers"
          onClick={(e) => {
            e.preventDefault();
            document.querySelector("#beers")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="inline-flex items-center gap-3 font-heading text-[11px] uppercase tracking-[0.2em] px-7 py-3.5 border border-white/40 text-white/90 hover:bg-white hover:text-foreground transition-all duration-300"
          initial={prefersReducedMotion ? "visible" : "hidden"}
          animate="visible"
          variants={fadeUp}
          transition={transition(1.1)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {t("cta")}
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.a>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-white/70"
        initial={prefersReducedMotion ? "visible" : "hidden"}
        animate="visible"
        variants={fadeIn}
        transition={transition(1.2)}
      >
        <span className="font-heading text-[10px] uppercase tracking-[0.25em]">
          {t("scrollDown")}
        </span>
        <motion.div
          className="w-px bg-gradient-to-b from-turquoise to-transparent"
          initial={prefersReducedMotion ? { height: 32 } : { height: 0 }}
          animate={{ height: 32 }}
          transition={transition(1.4)}
        />
      </motion.div>

      {/* Image indicators */}
      <motion.div
        className="absolute bottom-10 right-8 flex gap-1.5"
        initial={prefersReducedMotion ? "visible" : "hidden"}
        animate="visible"
        variants={fadeIn}
        transition={transition(1.2)}
      >
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
      </motion.div>
    </section>
  );
}
