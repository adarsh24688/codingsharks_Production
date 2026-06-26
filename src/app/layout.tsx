import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";

import "react-toastify/dist/ReactToastify.css";

import "./globals.css";

import { Analytics } from "@/components/common/analytics";
import { PublicShell } from "@/components/common/public-shell";
import { SITE_URL } from "@/lib/site-config";
// Body / UI font — Manrope (clean, modern sans-serif)
const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

// Heading font — Space Grotesk (geometric, techy, impactful)
const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

// Always the production domain (ignores vercel.app/localhost) — see site-config.
const BASE_URL = SITE_URL;

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Coding Sharks — Learn Coding. Get Placed.",
    template: "%s | Coding Sharks",
  },
  description:
    "India's #1 placement-focused coding bootcamp in Indore. Learn Full Stack, AI, Data Science and System Design with live mentorship and 91%+ placement.",
  keywords: [
    "coding bootcamp India",
    "full stack developer course",
    "coding course with placement guarantee",
    "learn coding Indore",
    "AI agents course India",
    "web development course",
    "data science course Indore",
    "system design course",
    "DSA course India",
    "programming mentorship",
    "software engineering bootcamp",
    "placement focused coding course",
    "CodingSharks",
    "Coding Sharks Indore",
    "best coding institute Indore",
  ],
  authors: [{ name: "Coding Sharks", url: BASE_URL }],
  creator: "Coding Sharks",
  publisher: "Coding Sharks",
  category: "education",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: BASE_URL,
    siteName: "Coding Sharks",
    title: "Coding Sharks — Learn Coding. Get Placed.",
    description:
      "India's #1 placement-focused coding bootcamp. Live mentorship from senior engineers at top startups. Full Stack, AI Agents, Data Science & System Design.",
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "Coding Sharks — Learn Coding. Get Placed.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Coding Sharks — Learn Coding. Get Placed.",
    description:
      "India's #1 placement-focused coding bootcamp. Live mentorship, real projects, 91%+ placement rate.",
    site: "@codingsharks",
    creator: "@codingsharks",
    images: ["/og-default.png"],
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
  alternates: {
    canonical: BASE_URL,
  },
  verification: {
    google: "6AxbQ7GVWU6K5SKdIdnhBSFW0dKC3nfDYs9GxdFkzgg",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${manrope.variable} ${spaceGrotesk.variable} font-sans min-h-dvh bg-background text-foreground antialiased`}>
        <Analytics />
        <PublicShell>{children}</PublicShell>
      </body>
    </html>
  );
}
