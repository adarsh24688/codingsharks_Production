import type { Metadata } from "next";
import { BasicPage } from "@/components/pages/basic-page";

export const metadata: Metadata = {
  title: "Hire Developers from Coding Sharks — Job-Ready Engineers",
  description:
    "Hire pre-vetted, job-ready developers from Coding Sharks. Our graduates have built real products, passed technical interviews, and are ready to contribute from day one. Access India's top tech talent.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.thecodingsharks.com"}/hire-from-us`,
  },
  openGraph: {
    title: "Hire Developers from Coding Sharks — Job-Ready Engineers",
    description:
      "Skip the screening. Our graduates have built real products and are interview-ready. Access top full-stack and AI engineers trained for modern product teams.",
  },
};

export default function HireFromUsPage() {
  return (
    <BasicPage
      title="Hire From Us"
      description="Get access to job-ready developers trained through real product work."
    />
  );
}
