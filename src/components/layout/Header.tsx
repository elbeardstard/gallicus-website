"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (isMenuOpen) setIsMenuOpen(false);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const headerOffset = 60;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-background/90 backdrop-blur-sm"
            : "bg-gradient-to-b from-black/40 to-transparent"
        }`}
      >
        <nav className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12 sm:h-14">
            {/* Desktop Navigation - centered */}
            <div className="hidden md:flex items-center gap-8 lg:gap-10 flex-1 justify-center">
              {navItems.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className={`font-heading text-[11px] uppercase tracking-[0.15em] transition-all duration-300 hover:text-turquoise ${
                    isScrolled
                      ? "text-foreground/70 hover:text-foreground"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  {t(item.key)}
                </a>
              ))}
            </div>

            {/* Language Toggle - desktop: absolute right, mobile: left */}
            <Link
              href={pathname}
              locale={otherLocale}
              className={`md:absolute md:right-6 lg:right-8 font-heading text-[10px] uppercase tracking-[0.15em] px-2.5 py-1 border transition-all duration-300 ${
                isScrolled
                  ? "border-foreground/20 text-foreground/60 hover:border-foreground hover:text-foreground"
                  : "border-white/30 text-white/70 hover:border-white hover:text-white"
              }`}
            >
              {otherLocale.toUpperCase()}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`md:hidden p-2 -mr-2 transition-colors ${
                isScrolled ? "text-foreground" : "text-white"
              }`}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <div className="w-5 h-4 flex flex-col justify-between">
                <span
                  className={`block h-px transition-all duration-300 origin-center ${
                    isScrolled ? "bg-foreground" : "bg-white"
                  } ${isMenuOpen ? "rotate-45 translate-y-[7.5px]" : ""}`}
                />
                <span
                  className={`block h-px transition-all duration-300 ${
                    isScrolled ? "bg-foreground" : "bg-white"
                  } ${isMenuOpen ? "opacity-0 scale-x-0" : ""}`}
                />
                <span
                  className={`block h-px transition-all duration-300 origin-center ${
                    isScrolled ? "bg-foreground" : "bg-white"
                  } ${isMenuOpen ? "-rotate-45 -translate-y-[7.5px]" : ""}`}
                />
              </div>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Navigation Overlay */}
      <div
        className={`md:hidden fixed inset-0 z-40 transition-all duration-300 ${
          isMenuOpen ? "visible" : "invisible"
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
            isMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsMenuOpen(false)}
        />

        {/* Menu */}
        <div
          className={`absolute top-12 left-0 right-0 bg-background border-b border-foreground/10 transition-all duration-300 ${
            isMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
          }`}
        >
          <div className="flex flex-col py-6 px-6">
            {navItems.map((item, index) => (
              <a
                key={item.key}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className="font-heading text-base uppercase tracking-[0.15em] py-4 text-foreground/80 hover:text-turquoise transition-colors border-b border-foreground/5 last:border-0"
                style={{
                  transitionDelay: isMenuOpen ? `${index * 50}ms` : "0ms"
                }}
              >
                {t(item.key)}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
