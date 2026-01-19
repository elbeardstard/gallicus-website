"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";

const navItems = [
  { href: "#about", key: "about" },
  { href: "#beers", key: "beers" },
  { href: "#find-us", key: "findUs" },
  { href: "#contact", key: "contact" },
];

export default function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const params = useParams();
  const currentLocale = params.locale as string;
  const otherLocale = currentLocale === "fr" ? "en" : "fr";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Track scroll position for header styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (isMenuOpen) setIsMenuOpen(false);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMenuOpen]);

  // Smooth scroll to section
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container-narrow">
        <nav className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className={`transition-colors ${
              isScrolled ? "text-foreground" : "text-white"
            }`}
          >
            <Image
              src="/images/logo/gallicus-horizontalwide.png"
              alt="Gallicus"
              width={160}
              height={40}
              className={`h-7 md:h-9 w-auto transition-all duration-300 ${
                isScrolled ? "" : "invert"
              }`}
              priority
            />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className={`font-heading text-xs lg:text-sm uppercase tracking-wider transition-colors hover:text-turquoise ${
                  isScrolled ? "text-foreground" : "text-white"
                }`}
              >
                {t(item.key)}
              </a>
            ))}
          </div>

          {/* Language Toggle + Mobile Menu Button */}
          <div className="flex items-center gap-3">
            <Link
              href={pathname}
              locale={otherLocale}
              className={`font-heading text-xs uppercase tracking-wider border px-3 py-1.5 transition-all ${
                isScrolled
                  ? "border-foreground text-foreground hover:bg-foreground hover:text-background"
                  : "border-white text-white hover:bg-white hover:text-foreground"
              }`}
            >
              {otherLocale.toUpperCase()}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`md:hidden p-2 transition-colors ${
                isScrolled ? "text-foreground" : "text-white"
              }`}
              aria-label="Toggle menu"
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span
                  className={`block h-0.5 transition-all origin-center ${
                    isScrolled ? "bg-foreground" : "bg-white"
                  } ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`}
                />
                <span
                  className={`block h-0.5 transition-opacity ${
                    isScrolled ? "bg-foreground" : "bg-white"
                  } ${isMenuOpen ? "opacity-0" : ""}`}
                />
                <span
                  className={`block h-0.5 transition-all origin-center ${
                    isScrolled ? "bg-foreground" : "bg-white"
                  } ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}
                />
              </div>
            </button>
          </div>
        </nav>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isMenuOpen ? "max-h-96 pb-6" : "max-h-0"
          }`}
        >
          <div
            className={`flex flex-col gap-4 pt-4 border-t ${
              isScrolled ? "border-foreground/10" : "border-white/20"
            }`}
          >
            {navItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className={`font-heading text-lg uppercase tracking-wider transition-colors hover:text-turquoise ${
                  isScrolled ? "text-foreground" : "text-white"
                }`}
              >
                {t(item.key)}
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
