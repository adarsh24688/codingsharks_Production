import type { Metadata } from "next";
import { BasicPage } from "@/components/pages/basic-page";

export const metadata: Metadata = {
  title: "About Coding Sharks — Our Mission, Mentors & Story",
  description:
    "Learn about Coding Sharks — India's placement-focused coding bootcamp in Indore. Our mission is to transform careers through real-world projects, 1-on-1 mentorship from senior engineers, and guaranteed placement support.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.thecodingsharks.com"}/about`,
  },
  openGraph: {
    title: "About Coding Sharks — Our Mission, Mentors & Story",
    description:
      "We're on a mission to transform careers through real-world projects, 1-on-1 mentorship, and guaranteed placement support. Meet the team behind Coding Sharks.",
  },
};

export default function AboutPage() {
  return (
    <BasicPage
      title="About"
      description="Why Coding Sharks: mentorship + projects + placement support."
    />
  );
}
