import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { person } from "@/data/content";
import { asset } from "@/lib/asset";
import "./globals.css";

// Bundled locally (SIL OFL) so CI builds never depend on reaching Google Fonts.
const grotesk = localFont({
  src: "../../node_modules/@fontsource-variable/space-grotesk/files/space-grotesk-latin-wght-normal.woff2",
  weight: "300 700",
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
  icons: {
    icon: [
      { url: asset("/favicon.ico"), sizes: "any" },
      { url: asset("/favicon-32.png"), type: "image/png", sizes: "32x32" },
    ],
    apple: asset("/apple-touch-icon.png"),
  },
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
    <html lang="en" className={grotesk.variable} suppressHydrationWarning>
      <head>
        {/* Apply the saved theme before the first paint so dark mode never flashes light. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem("theme")==="dark"){document.documentElement.dataset.theme="dark";document.querySelector('meta[name="theme-color"]')?.setAttribute("content","#0B0B0B")}}catch(e){}`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
