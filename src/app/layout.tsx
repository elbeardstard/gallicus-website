import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gallicus - Brasserie Artisanale",
  description: "Brasserie artisanale située à Gatineau, Québec.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
