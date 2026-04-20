import type { Metadata } from "next";
import { Inter, Italiana, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const italiana = Italiana({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-italian",
});

const cormorant = Cormorant_Garamond({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

export const metadata: Metadata = {
  title: "Vendôme Beauty & Spa — Anniversaire",
  description: "Célébrez avec nous l'anniversaire de Vendôme Beauty & Spa. Lac 2, Tunis. 25 Avril.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${italiana.variable} ${cormorant.variable} scroll-smooth`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
