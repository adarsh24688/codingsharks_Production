import type { Metadata } from "next"
import { LegalPage } from "@/components/pages/legal-page"

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "The terms and conditions governing use of Coding Sharks programs and website.",
  alternates: { canonical: "/terms" },
}

const sections = [
  {
    heading: "Acceptance of Terms",
    content:
      "By accessing our website, enrolling in any course, or using any service offered by Coding Sharks (operated by Apoliums Technologies Pvt. Ltd.), you agree to be bound by these Terms & Conditions. If you do not agree, please do not use our services.",
  },
  {
    heading: "Enrollment & Admission",
    content: [
      "Enrollment is confirmed only upon receipt of the full course fee or an agreed installment as per the payment plan.",
      "Coding Sharks reserves the right to decline enrollment at its sole discretion.",
      "Batch timings, start dates, and course structure may be adjusted by Coding Sharks with prior notice.",
      "Students must be at least 16 years of age to enroll independently. Minors require parental/guardian consent.",
    ],
  },
  {
    heading: "Course Fees & Payment",
    content: [
      "All fees are listed in Indian Rupees (INR) and are inclusive of applicable taxes unless stated otherwise.",
      "Fees must be paid as per the schedule agreed at the time of enrollment.",
      "Late payments may result in temporary suspension of LMS access.",
      "EMI and installment plans are subject to availability and may involve third-party financing partners.",
    ],
  },
  {
    heading: "Refund & Cancellation",
    content:
      "Refunds are governed by our Refund Policy available at /refund. Please read it carefully before enrolling.",
  },
  {
    heading: "Intellectual Property",
    content: [
      "All course content, videos, notes, assignments, and materials are the exclusive intellectual property of Coding Sharks.",
      "Students may not record, reproduce, distribute, or resell any course material without prior written permission.",
      "Violation of intellectual property rights may result in immediate termination of enrollment without refund.",
    ],
  },
  {
    heading: "Student Conduct",
    content: [
      "Students are expected to maintain respectful and professional conduct in all classes, group sessions, and online communities.",
      "Harassment, discrimination, or disruptive behaviour will result in immediate removal from the program.",
      "Plagiarism in assignments or projects will be treated as a serious violation and may affect placement support.",
    ],
  },
  {
    heading: "Placement Assistance",
    content: [
      "Coding Sharks provides placement assistance, not a guaranteed job offer. Outcomes depend on individual performance, market conditions, and employer decisions.",
      "Students must maintain satisfactory attendance (minimum 80%) and complete all assignments to be eligible for placement support.",
      "Placement statistics shared on our website represent past cohort outcomes and are not a guarantee of future results.",
    ],
  },
  {
    heading: "LMS & Platform Access",
    content: [
      "LMS access is granted for the duration of the enrolled course plus any stated post-course access period.",
      "Account credentials are personal and must not be shared. Sharing access may result in account termination.",
      "Coding Sharks is not liable for temporary unavailability of the platform due to maintenance or technical issues.",
    ],
  },
  {
    heading: "Limitation of Liability",
    content:
      "To the maximum extent permitted by law, Coding Sharks shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services, including loss of employment opportunity or income.",
  },
  {
    heading: "Governing Law & Jurisdiction",
    content:
      "These Terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Indore, Madhya Pradesh.",
  },
  {
    heading: "Modifications",
    content:
      "Coding Sharks reserves the right to update these Terms at any time. Continued use of our services after changes are posted constitutes acceptance of the revised Terms.",
  },
]

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      subtitle="Please read these terms carefully before enrolling in any Coding Sharks program or using our website."
      lastUpdated="June 1, 2025"
      sections={sections}
    />
  )
}
