import type { Metadata } from "next"
import { BasicPage } from "@/components/pages/basic-page"

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "The terms and conditions governing use of Coding Sharks programs and website.",
  alternates: { canonical: "/terms" },
}

export default function TermsPage() {
  return <BasicPage title="Terms & Conditions" />
}