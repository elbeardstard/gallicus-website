import { setRequestLocale, getTranslations } from "next-intl/server";
import { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Products from "@/components/sections/Products";
import AvailabilityMap from "@/components/sections/AvailabilityMap";
import Contact from "@/components/sections/Contact";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    title: t("title"),
    description: t("description"),
    keywords: [
      "brasserie",
      "brewery",
      "craft beer",
      "bière artisanale",
      "Gatineau",
      "Quebec",
      "Québec",
      "Gallicus",
      "microbrasserie",
      "microbrewery",
    ],
    openGraph: {
      title: t("title"),
      description: t("description"),
      locale: locale === "fr" ? "fr_CA" : "en_CA",
      type: "website",
      siteName: "Gallicus",
    },
  };
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <About />
      <Products />
      <AvailabilityMap />
      <Contact />
    </>
  );
}
