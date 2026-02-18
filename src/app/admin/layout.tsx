import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "../../app/globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Admin — Gallicus",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={archivo.variable}>
      <body className="bg-[#0f0f0f] text-white font-[family-name:var(--font-archivo)] antialiased">
        {children}
      </body>
    </html>
  );
}
