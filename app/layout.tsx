import type { Metadata } from "next";
import { Cinzel, Josefin_Sans, Heebo } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import SkipLink from "@/components/SkipLink";
import CookieBanner from "@/components/CookieBanner";
import AccessibilityWidget from "@/components/AccessibilityWidget";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-cinzel",
  display: "swap",
});

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-josefin",
  display: "swap",
});

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  weight: ["200", "300", "400", "500", "700"],
  variable: "--font-heebo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "בונה הירדן המערבי — Boneh HaYarden",
  description:
    "פורטפוליו נדל״ן יוקרתי. פרויקטים של מגורים, השקעה ובנייה לאורך הירדן המערבי.",
  openGraph: {
    title: "בונה הירדן המערבי",
    description: "פורטפוליו נדל״ן יוקרתי.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="he"
      dir="rtl"
      className={`${cinzel.variable} ${josefin.variable} ${heebo.variable}`}
    >
      <body className="font-heb bg-bone-white text-bone-ink overflow-x-hidden antialiased">
        <SkipLink />
        <SmoothScroll>
          <CustomCursor />
          <Navbar />
          <main id="main-content">{children}</main>
        </SmoothScroll>
        <CookieBanner />
        <AccessibilityWidget />
      </body>
    </html>
  );
}
