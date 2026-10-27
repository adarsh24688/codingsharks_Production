import type { Metadata } from "next"
import { LegalPage } from "@/components/pages/legal-page"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Coding Sharks collects, uses, and protects your personal information.",
  alternates: { canonical: "/privacy" },
}

const sections = [
  {
    heading: "Information We Collect",
    content: [
      "Name, email address, phone number, and city when you fill out any enquiry, demo booking, or enrollment form.",
      "Educational background and career goals shared during counseling sessions.",
      "Payment details processed securely through third-party payment gateways (Razorpay / PayU). We do not store card numbers.",
      "Usage data such as pages visited, time spent, and browser/device type collected via Google Analytics and Microsoft Clarity.",
      "Cookies and similar tracking technologies to improve your browsing experience.",
    ],
  },
  {
    heading: "How We Use Your Information",
    content: [
      "To contact you about your enquiry, course enrollment, or demo session.",
      "To send course updates, batch schedules, placement news, and promotional offers via WhatsApp, email, or SMS.",
      "To personalise your learning experience on our LMS platform.",
      "To improve our website, courses, and marketing based on aggregated analytics.",
      "To comply with legal obligations under applicable Indian law.",
    ],
  },
  {
    heading: "Sharing of Information",
    content: [
      "We do not sell, rent, or trade your personal data to third parties.",
      "We may share data with trusted service providers (email platforms, CRM tools, payment gateways) strictly to operate our services.",
      "We may disclose information if required by law, court order, or government authority.",
      "Placement partners and hiring companies receive only the information you explicitly consent to share during the placement process.",
    ],
  },
  {
    heading: "Cookies",
    content:
      "We use cookies to remember your preferences, analyse traffic, and serve relevant ads. You can disable cookies in your browser settings; however, some features of the website may not function correctly without them.",
  },
  {
    heading: "Data Retention",
    content:
      "We retain your personal data for as long as necessary to provide our services and comply with legal obligations. Enrolled students' data is retained for a minimum of 3 years for placement and alumni support purposes. You may request deletion of your data by writing to us.",
  },
  {
    heading: "Your Rights",
    content: [
      "Access the personal data we hold about you.",
      "Request correction of inaccurate information.",
      "Request deletion of your data (subject to legal retention requirements).",
      "Opt out of marketing communications at any time by clicking 'Unsubscribe' or contacting us directly.",
    ],
  },
  {
    heading: "Third-Party Links",
    content:
      "Our website may contain links to third-party websites (YouTube, LinkedIn, etc.). We are not responsible for the privacy practices of those sites and encourage you to review their policies.",
  },
  {
    heading: "Children's Privacy",
    content:
      "Our services are intended for individuals aged 16 and above. We do not knowingly collect personal data from children under 16. If you believe a minor has submitted data to us, please contact us immediately.",
  },
  {
    heading: "Changes to This Policy",
    content:
      "We may update this Privacy Policy from time to time. The revised version will be posted on this page with an updated date. Continued use of our services after changes constitutes acceptance of the updated policy.",
  },
  {
    heading: "Contact Us",
    content:
      "For any privacy-related queries, write to us at info@thecodingsharks.com or visit our office at 3rd Floor, Veda Complex, Bhawarkua Main Road, Indore, Madhya Pradesh – 452001.",
  },
]

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      subtitle="We respect your privacy. This policy explains what data we collect, why we collect it, and how we protect it."
      lastUpdated="June 1, 2025"
      sections={sections}
    />
  )
}
