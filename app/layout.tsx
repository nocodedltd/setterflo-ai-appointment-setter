import type { Metadata, Viewport } from "next";
import { Inter, Poppins, Montserrat } from "next/font/google";
import type { ReactNode } from "react";
import Analytics from "@/components/Analytics";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
});

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const keywords = [
  "SetterFlo",
  "AI appointment setter",
  "business coach",
  "mindset coach",
  "lead generation",
  "Instagram automation",
  "appointment booking",
  "AI setter",
  "coaching business",
  "lead qualification",
  "automated booking",
  "conversion optimization",
];

export const metadata: Metadata = {
  metadataBase: new URL("https://setterflo.com"),
  title: {
    default: "#1 AI Appointment Setter for Business & Mindset Coaches | SetterFlo",
    template: "%s | SetterFlo",
  },
  description: "Never lose a lead again. SetterFlo works your Instagram inbox 24/7, books you more qualified calls and costs less than one high-ticket client sale. Stop chasing DMs and relying on flaky human setters.",
  applicationName: "SetterFlo",
  generator: "Next.js",
  keywords,
  alternates: {
    canonical: "https://setterflo.com",
  },
  openGraph: {
    title: "#1 AI Appointment Setter for Business & Mindset Coaches | SetterFlo",
    description: "Never lose a lead again. SetterFlo works your Instagram inbox 24/7, books you more qualified calls and costs less than one high-ticket client sale.",
    url: "https://setterflo.com",
    siteName: "SetterFlo",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SetterFlo - AI Appointment Setter for Coaches",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "#1 AI Appointment Setter for Business & Mindset Coaches | SetterFlo",
    description: "Never lose a lead again. SetterFlo works your Instagram inbox 24/7, books you more qualified calls and costs less than one high-ticket client sale.",
    site: "@setterflo",
    creator: "@setterflo",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0E1B36" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en-GB" className={`${inter.variable} ${poppins.variable} ${montserrat.variable} dark`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "SetterFlo",
              "description": "AI Appointment Setter for Business & Mindset Coaches",
              "url": "https://setterflo.com",
              "logo": "https://setterflo.com/logo.png",
              "sameAs": [
                "https://instagram.com/setterflo",
                "https://twitter.com/setterflo"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "availableLanguage": "English"
              }
            })
          }}
        />
      </head>
      <body className="bg-background text-text-primary antialiased aurora">
        <Analytics />
        {children}
      </body>
    </html>
  );
}
