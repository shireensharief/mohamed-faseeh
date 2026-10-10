import type { Metadata, Viewport } from "next";
import { Space_Grotesk } from "next/font/google";
import { person } from "@/data/content";
import { asset } from "@/lib/asset";
import "./globals.css";

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-grotesk",
  display: "swap",
});

const title = `${person.name} | Site Reliability & Cloud Engineer`;
const description =
  "Mohamed Faseeh is a Site Reliability Engineer building observability, automation and resilient AWS infrastructure. Explore his projects, experience and résumé.";

export const metadata: Metadata = {
  metadataBase: new URL(person.siteOrigin),
  title,
  description,
  authors: [{ name: person.name }],
  robots: { index: true, follow: true },
  icons: { icon: asset("/favicon.svg") },
  alternates: { canonical: person.siteUrl },
  openGraph: {
    title,
    description,
    siteName: person.name,
    type: "website",
    locale: "en_US",
    url: person.siteUrl,
    images: [{ url: asset("/og-image.png"), width: 1200, height: 630, alt: `${person.name}, Site Reliability Engineer` }],
  },
  twitter: { card: "summary_large_image", title, description, images: [asset("/og-image.png")] },
};

export const viewport: Viewport = { themeColor: "#F4F1E8" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={grotesk.variable}>
      <body>{children}</body>
    </html>
  );
}
