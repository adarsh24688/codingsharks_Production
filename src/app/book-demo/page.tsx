import type { Metadata } from "next";
import { BasicPage } from "@/components/pages/basic-page";

export const metadata: Metadata = {
  title: "Book Free Career Session — Coding Sharks",
  description:
    "Book a free 1-on-1 career session with a Coding Sharks advisor. We'll review your goals, suggest the right program, and give you a personalised roadmap — completely free, no commitment.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.thecodingsharks.com"}/book-demo`,
  },
  openGraph: {
    title: "Book a Free Career Session — Coding Sharks",
    description:
      "Talk to a senior engineer. Get a personalised coding roadmap. 100% free — no sales pressure. Book your session today.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function BookDemoPage() {
  return (
    <BasicPage
      title="Free Career Session"
      description="Apply for a free career session. We'll help you choose the right roadmap."
    />
  );
}
