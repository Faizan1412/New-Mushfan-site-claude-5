import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Manrope, Sora } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { site } from "@/data/site";

/**
 * Typography.
 *
 * Sora carries the display voice — geometric with enough character to avoid the
 * default-grotesk look. Manrope sets body copy; it is humanist enough to stay
 * warm at 16px and pairs with Sora without the two competing.
 *
 * IBM Plex Mono is a utility face only: 10–11px indices, ratio tags and data.
 * It is what makes the drafting-sheet language read as deliberate rather than
 * decorative. To drop to a two-family system, remove this import and point
 * --font-mono at Manrope in globals.css.
 *
 * All three are self-hosted by next/font with `display: swap`, so there is no
 * render-blocking request to Google and no layout shift on swap.
 */

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Digital Marketing, Design & Technology`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "digital marketing agency",
    "digital marketing agency in India",
    "digital marketing services",
    "social media marketing",
    "SEO services",
    "website design and development",
    "app development",
    "video editing services",
    "AI automation services",
    "branding services",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — Digital Marketing, Design & Technology`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Digital Marketing, Design & Technology`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "Digital Marketing",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-IN"
      className={`${sora.variable} ${manrope.variable} ${plexMono.variable} h-full antialiased`}
    >
      <head>
        {/*
          Scroll reveals start at opacity 0 and are released by JavaScript.
          Without JS that would hide most of the page, so neutralise them.
        */}
        <noscript>
          <style>{`.reveal{opacity:1 !important}`}</style>
        </noscript>
      </head>
      <body className="flex min-h-full flex-col bg-paper">
        <SmoothScroll />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Navbar />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
