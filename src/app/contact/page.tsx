import type { Metadata } from "next";
import { BasicPage } from "@/components/pages/basic-page";

export const metadata: Metadata = {
  title: "Contact Coding Sharks — Talk to Our Team",
  description:
    "Have questions about our coding programs? Contact Coding Sharks in Indore. Call us at +91 9424586286 or email info@thecodingsharks.com. Book a free career session today.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.thecodingsharks.com"}/contact`,
  },
  openGraph: {
    title: "Contact Coding Sharks — Talk to Our Team",
    description:
      "Chat with our advisors about your coding career goals. We'll help you choose the right program and roadmap.",
  },
};

export default function ContactPage() {
  return (
    <BasicPage
      title="Contact"
      description="Chat with us about your goals and get the right roadmap."
    />
  );
}
