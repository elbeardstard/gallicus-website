import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { getSiteContent } from "@/lib/data/content";
import ScrollToTopButton from "./FooterClient";

export default async function Footer() {
  const t = await getTranslations("footer");
  const tContact = await getTranslations("contact");
  const content = await getSiteContent();
  const currentYear = new Date().getFullYear();

  const address1 = content["contact.address.line1"] ?? "670 rue Auguste-Mondoux #4";
  const address2 = content["contact.address.line2"] ?? "Gatineau, QC, Canada";
  const email = content["contact.email"] ?? "info@gallicus.ca";
  const instagramUrl = content["social.instagram"] ?? "https://instagram.com/brasserie_gallicus";
  const untappdUrl =
    content["social.untappd"] ?? "https://untappd.com/v/gallicus-brasserie-artisanale/8707258";

  return (
    <footer className="bg-foreground text-background py-12 md:py-16">
      <div className="container-narrow">
        <div className="grid md:grid-cols-3 gap-10 md:gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <Image
                src="/images/logo/gallicus-solog.png"
                alt="Gallicus"
                width={48}
                height={48}
                className="w-12 h-12 invert"
              />
              <div>
                <p className="font-heading text-xl tracking-wider">GALLICUS</p>
                <p className="text-background/60 text-xs tracking-widest uppercase">
                  {t("tagline")}
                </p>
              </div>
            </div>
            <p className="text-background/50 text-sm">Gatineau, QC</p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-sm uppercase tracking-wider mb-4">
              {tContact("title")}
            </h4>
            <div className="space-y-2 text-sm text-background/60">
              <p>{address1}</p>
              <p>{address2}</p>
              <a
                href={`mailto:${email}`}
                className="block hover:text-turquoise transition-colors"
              >
                {email}
              </a>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-heading text-sm uppercase tracking-wider mb-4">
              {t("followUs")}
            </h4>
            <div className="flex gap-4">
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center border border-background/20 hover:border-turquoise hover:text-turquoise transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href={untappdUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center border border-background/20 hover:border-turquoise transition-colors overflow-hidden"
                aria-label="Untappd"
              >
                <Image
                  src="/images/logo/untappd.png"
                  alt="Untappd"
                  width={20}
                  height={20}
                  className="invert opacity-80 hover:opacity-100 transition-opacity"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-background/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-background/40">
            &copy; {currentYear} Gallicus. {t("rights")}.
          </p>
          <ScrollToTopButton label={t("backToTop")} />
        </div>
      </div>
    </footer>
  );
}
