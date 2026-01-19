"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center px-6">
        <h1 className="font-heading text-8xl md:text-9xl font-bold mb-4">404</h1>
        <p className="text-lg text-foreground/60 mb-2">{t("title")}</p>
        <p className="text-sm text-foreground/40 mb-8">{t("description")}</p>
        <Link
          href="/"
          className="inline-block font-heading text-sm uppercase tracking-wider border border-foreground px-8 py-4 hover:bg-foreground hover:text-background transition-all"
        >
          {t("backHome")}
        </Link>
      </div>
    </div>
  );
}
