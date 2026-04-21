import type { Metadata } from "next";
import { BlogListingPage } from "@/components/pages/blog/blog-listing-page";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.thecodingsharks.com";

export const metadata: Metadata = {
  title: "Blog — Coding Tips, Career Advice & Tech Guides | Coding Sharks",
  description:
    "Expert articles on coding careers, interview preparation, Full Stack development, AI engineering, system design, and DSA. Written by senior engineers from top startups.",
  keywords: [
    "coding blog India",
    "programming tutorials",
    "tech career advice",
    "full stack developer blog",
    "system design articles",
    "coding interview tips",
    "AI engineering blog",
  ],
  alternates: {
    canonical: `${BASE_URL}/blog`,
  },
  openGraph: {
    type: "website",
    url: `${BASE_URL}/blog`,
    title: "Blog — Coding Tips, Career Advice & Tech Guides | Coding Sharks",
    description:
      "Career advice, interview prep, system design guides, and in-depth tech articles from the Coding Sharks team.",
  },
};

export default function BlogPage() {
  return <BlogListingPage />;
}
