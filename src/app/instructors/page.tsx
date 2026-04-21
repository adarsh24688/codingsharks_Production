import type { Metadata } from "next";
import { BasicPage } from "@/components/pages/basic-page";

export const metadata: Metadata = {
  title: "Our Mentors & Instructors — Coding Sharks",
  description:
    "Learn from senior engineers at Bolt (Europe), CRED, Google, and top startups. Coding Sharks instructors bring real-world product experience to every live session.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.thecodingsharks.com"}/instructors`,
  },
  openGraph: {
    title: "Our Mentors & Instructors — Coding Sharks",
    description:
      "Our mentors are senior engineers and founders from top companies. They don't just teach — they've built the products you use every day.",
  },
};

export default function InstructorsPage() {
  return <BasicPage title="Instructors" description="Meet our global mentors." />;
}
