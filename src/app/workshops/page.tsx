import type { Metadata } from "next";
import { WorkshopListingPage } from "@/components/pages/workshop/workshop-listing-page";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.thecodingsharks.com";

export const metadata: Metadata = {
  title: "Free Coding Workshops & Live Events — Coding Sharks",
  description:
    "Join free and paid live workshops on Full Stack Development, AI & Machine Learning, Data Science, DevOps and career roadmaps. Expert-led sessions by senior engineers. Register now.",
  keywords: [
    "free coding workshop",
    "live coding event India",
    "AI workshop Indore",
    "web development workshop",
    "career roadmap workshop",
    "coding workshop for beginners",
  ],
  alternates: {
    canonical: `${BASE_URL}/workshops`,
  },
  openGraph: {
    type: "website",
    url: `${BASE_URL}/workshops`,
    title: "Free Coding Workshops & Live Events — Coding Sharks",
    description:
      "Expert-led live workshops on Full Stack, AI, Data Science and career roadmaps. Free to attend. Register and transform your coding skills.",
  },
};

export default function WorkshopsPage() {
  return <WorkshopListingPage />;
}
