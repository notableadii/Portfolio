import type { Metadata } from "next";
import "./globals.css";
import JsonLd from "@/components/JsonLd";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata: Metadata = {
  // Basic SEO
  title: {
    default: "Aditya Shah - Front-end Hobby Developer",
    template: "%s | Aditya Shah",
  },
  description:
    "Front-end Hobby Developer specializing in Next.js, React, and modern web technologies.",

  // Keywords (less important now but still useful)
  keywords: [
    "front-end developer",
    "react developer",
    "next.js",
    "javascript",
    "typescript",
    "web development",
    "portfolio",
    "hobby developer",
  ],

  // Author information
  authors: [
    { name: "Aditya Shah", url: "next-portfolio-vert-seven.vercel.app" },
  ],
  creator: "Aditya Shah",
  publisher: "Aditya Shah",

  // Viewport and device optimization
  viewport: "width=device-width, initial-scale=1.0",

  // Robots instructions
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

  // Canonical URL (prevents duplicate content issues)
  alternates: {
    canonical: "next-portfolio-vert-seven.vercel.app",
  },

  // Open Graph (for social media sharing)
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "next-portfolio-vert-seven.vercel.app",
    title: "Aditya Shah - Front-end Hobby Developer",
    description:
      "Front-end Hobby Developer specializing in Next.js, React, and modern web technologies.",
    siteName: "Aditya Shah Portfolio",
    images: [
      {
        url: "next-portfolio-vert-seven.vercel.app/favicon.png",
        width: 1200,
        height: 630,
        alt: "Aditya Shah - Front-end Hobby Developer",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "Aditya Shah - Front-end Hobby Developer",
    description:
      "Front-end Hobby Developer specializing in Next.js, React, and modern web technologies.",
    creator: "@yourtwitterhandle",
    images: ["next-portfolio-vert-seven.vercel.app/favicon.png"],
  },

  // Theme colors
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],

  // Additional meta tags
  other: {
    // Language
    "content-language": "en",

    // Referrer policy
    referrer: "origin-when-cross-origin",

    // Format detection (prevents phone number detection on iOS)
    "format-detection": "telephone=no",

    // Mobile optimization
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "Aditya Shah",

    // Microsoft specific
    "msapplication-TileColor": "#000000",
    "msapplication-config": "/browserconfig.xml",

    // Schema.org structured data (can also be done with JSON-LD)
    "application-name": "Aditya Shah Portfolio",

    // Security
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "X-XSS-Protection": "1; mode=block",
  },

  // Verification tags (add these after setting up in respective consoles)
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
    other: {
      "facebook-domain-verification": "your-facebook-verification-code",
      "pinterest-site-verification": "your-pinterest-verification-code",
    },
  },

  // Category for app stores
  category: "portfolio",

  // Classification
  classification: "Personal Portfolio Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />

        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
      </head>
      <body>
        {/* Add JSON-LD structured data */}
        <JsonLd />

        {/* Wrap all children with SmoothScroll component */}
        {/* This enables Lenis smooth scrolling for the entire app */}
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
