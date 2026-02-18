import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "../../app/globals.css";
import "./admin.css";

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
      <body className="admin-body font-[family-name:var(--font-archivo)] antialiased">
        {children}
      </body>
    </html>
  );
}
