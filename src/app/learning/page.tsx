import type { Metadata } from "next";
import { BasicPage } from "@/components/pages/basic-page";

export const metadata: Metadata = {
  title: "How We Teach — Coding Sharks Learning Model",
  description:
    "The Coding Sharks learning model: live classes, weekly project delivery, 1-on-1 mentorship, code reviews, and dedicated placement support.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.thecodingsharks.com"}/learning`,
  },
  openGraph: {
    title: "How We Teach — Coding Sharks Learning Model",
    description:
      "Live classes + real projects + 1-on-1 mentorship + placement support. This is what makes Coding Sharks different from every other coding course.",
  },
};

export default function LearningPage() {
  return (
    <BasicPage
      title="Learn coding the placement-focused way at Coding Sharks: live cohorts, 1-on-1 mentorship, code reviews, and dedicated placement support."
      description="Our learning model: live classes, projects, mentorship, and placement support."
    />
  );
}
