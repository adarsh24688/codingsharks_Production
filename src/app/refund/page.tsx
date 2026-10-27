import type { Metadata } from "next"
import { LegalPage } from "@/components/pages/legal-page"

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy",
  description: "Coding Sharks refund and cancellation policy for course enrollments.",
  alternates: { canonical: "/refund" },
}

const sections = [
  {
    heading: "Overview",
    content:
      "At Coding Sharks, we are committed to delivering high-quality education. We understand that circumstances can change, and this policy outlines the conditions under which refunds may be requested.",
  },
  {
    heading: "Cooling-Off Period (Full Refund)",
    content: [
      "You are eligible for a full refund if you cancel your enrollment within 7 days of payment, provided that fewer than 2 live classes have been attended.",
      "To initiate a refund within this period, email us at info@thecodingsharks.com with your enrollment details.",
      "Refunds under this clause will be processed within 7–10 business days to the original payment method.",
    ],
  },
  {
    heading: "Partial Refund (8–15 Days)",
    content: [
      "If you cancel between 8 and 15 days of enrollment and have attended fewer than 4 live classes, you are eligible for a 50% refund of the course fee.",
      "No refund is applicable if more than 4 classes have been attended, regardless of the number of days since enrollment.",
    ],
  },
  {
    heading: "No Refund Conditions",
    content: [
      "No refund will be issued after 15 days from the date of enrollment.",
      "No refund for students who have accessed more than 30% of the LMS course content.",
      "No refund for workshop, bootcamp, or short-term program fees once the program has commenced.",
      "No refund if enrollment was cancelled due to violation of our Terms & Conditions or Student Conduct policy.",
      "Processing fees, registration fees, and any third-party EMI charges are non-refundable.",
    ],
  },
  {
    heading: "Batch Transfer",
    content:
      "Instead of a refund, students may request a one-time batch transfer to a future batch of the same course within 30 days of enrollment. Batch transfers are subject to seat availability and must be requested via email.",
  },
  {
    heading: "Course Cancellation by Coding Sharks",
    content: [
      "In the rare event that Coding Sharks cancels a batch before it commences, enrolled students will receive a full refund or the option to transfer to another batch.",
      "If a batch is discontinued mid-way due to unforeseen circumstances, a pro-rata refund for the remaining sessions will be issued.",
    ],
  },
  {
    heading: "How to Request a Refund",
    content: [
      "Email info@thecodingsharks.com with subject line: 'Refund Request – [Your Name] – [Course Name]'.",
      "Include your enrollment ID, payment receipt, and reason for cancellation.",
      "Our team will respond within 2 business days to confirm eligibility.",
      "Approved refunds are processed within 7–10 business days.",
    ],
  },
  {
    heading: "Disputes",
    content:
      "If you believe your refund request was incorrectly denied, you may escalate by emailing info@thecodingsharks.com with 'Refund Dispute' in the subject line. All disputes are subject to the jurisdiction of courts in Indore, Madhya Pradesh.",
  },
]

export default function RefundPage() {
  return (
    <LegalPage
      title="Refund & Cancellation Policy"
      subtitle="We want you to be confident in your investment. Here's everything you need to know about our refund process."
      lastUpdated="June 1, 2025"
      sections={sections}
    />
  )
}
