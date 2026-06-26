import type { Metadata } from "next";

import { CounselingPage } from "@/components/pages/counseling/counseling-page";
import counselingData from "@/data/counseling.json";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.thecodingsharks.com";

export const metadata: Metadata = {
  title: "Free Career Counseling for College Students — Coding Sharks",
  description:
    "Confused about your tech career? Get a free 30-min 1:1 counseling session with Coding Sharks.",
  keywords: [
    "free career counseling",
    "career guidance for college students",
    "coding career counseling Indore",
    "which coding course should I choose",
    "tech career for non CS students",
    "placement guidance India",
    "free career session Coding Sharks",
  ],
  openGraph: {
    title: "Free Career Counseling — Coding Sharks",
    description:
      "Confused about your tech career? Book a free 30-min 1:1 session. No sales pitch. Just clarity.",
    url: `${BASE_URL}/counseling`,
    siteName: "Coding Sharks",
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Career Counseling — Coding Sharks",
    description: "Confused about your tech career? Book a free 30-min 1:1 session.",
  },
  alternates: { canonical: `${BASE_URL}/counseling` },
  robots: { index: true, follow: true },
};

export default function CounselingRoute() {
  return <CounselingPage data={counselingData} />;
}
