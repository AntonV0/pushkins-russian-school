import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Great_Vibes } from "next/font/google";
import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import { JsonLd } from "@/components/site/json-ld";
import {
  buildOrganizationJsonLd,
  buildSiteNavigationJsonLd,
  buildWebsiteJsonLd,
  seoKeywords,
} from "@/data/public/seo";
import { siteConfig } from "@/data/public/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const logoDisplay = Great_Vibes({
  variable: "--font-logo-display",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  category: "education",
  keywords: seoKeywords,
  title: {
    default: "Pushkin's School of Russian Language and Literature",
    template: "%s | Pushkin's School",
  },
  description: siteConfig.description,
  manifest: "/manifest.webmanifest",
  openGraph: {
    title: "Pushkin's School of Russian Language and Literature",
    description: siteConfig.description,
    url: "/",
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pushkin's School of Russian Language and Literature",
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fbfaf7",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${logoDisplay.variable} h-full antialiased`}
    >
      <body className="warm-page-bg flex min-h-full flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-brand-blue focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <Header />
        <div id="main-content" className="flex flex-1 flex-col">
          {children}
        </div>
        <Footer />
        <JsonLd data={buildOrganizationJsonLd()} />
        <JsonLd data={buildWebsiteJsonLd()} />
        <JsonLd data={buildSiteNavigationJsonLd()} />
      </body>
    </html>
  );
}
