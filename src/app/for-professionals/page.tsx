import type { Metadata } from "next";
import { BasicPage } from "@/components/pages/basic-page";

export const metadata: Metadata = {
  title: "For Working Professionals — Upskill & Advance Your Career | Coding Sharks",
  description:
    "Designed for working professionals who want to upskill without quitting their job. Learn Full Stack, AI, or System Design with flexible live sessions, real project work, and expert mentorship. Advance your career in 3–6 months.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.thecodingsharks.com"}/for-professionals`,
  },
  openGraph: {
    title: "For Working Professionals — Upskill with Coding Sharks",
    description:
      "Don't leave your job to upskill. Our professional tracks are built around your schedule — live sessions, real projects, and mentorship that fits working hours.",
  },
};

export default function ForProfessionalsPage() {
  return (
    <BasicPage
      title="For Professionals"
      description="Upskill with real-world projects, modern stacks, and mentorship."
    />
  );
}
