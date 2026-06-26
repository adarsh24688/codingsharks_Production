import type { Metadata } from "next"
import { BasicPage } from "@/components/pages/basic-page"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Coding Sharks collects, uses, and protects your personal information.",
  alternates: { canonical: "/privacy" },
}

export default function PrivacyPage() {
  return <BasicPage title="Privacy Policy" />
}