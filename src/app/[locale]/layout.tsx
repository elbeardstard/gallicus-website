import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Archivo, Crimson_Pro } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import type { Metadata } from "next";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

const crimsonPro = Crimson_Pro({
  subsets: ["latin"],
  variable: "--font-crimson",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  const baseUrl = "https://gallicus.ca";
  const url = locale === "fr" ? baseUrl : `${baseUrl}/en`;

  return {
    title: {
      default: t("title"),
      template: `%s | Gallicus`,
    },
    description: t("description"),
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: url,
      languages: {
        fr: baseUrl,
        en: `${baseUrl}/en`,
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url,
      siteName: "Gallicus",
      locale: locale === "fr" ? "fr_CA" : "en_CA",
      type: "website",
      images: [
        {
          url: "/images/logo/gallicus-horizontalwide.png",
          width: 1200,
          height: 630,
          alt: "Gallicus — Brasserie Artisanale",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: ["/images/logo/gallicus-horizontalwide.png"],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "fr" | "en")) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${archivo.variable} ${crimsonPro.variable}`}>
      <body className="bg-background text-foreground font-body antialiased">
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
