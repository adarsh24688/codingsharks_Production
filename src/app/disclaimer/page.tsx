import type { Metadata } from "next"
import { LegalPage } from "@/components/pages/legal-page"

export const metadata: Metadata = {
  title: "Disclaimer",
  description: "Important disclaimers regarding Coding Sharks courses, placement outcomes, and website content.",
  alternates: { canonical: "/disclaimer" },
}

const sections = [
  {
    heading: "General Disclaimer",
    content:
      "The information provided on this website and through Coding Sharks programs is for general educational and informational purposes only. While we strive to keep all content accurate and up to date, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, or reliability of the information.",
  },
  {
    heading: "Placement & Salary Outcomes",
    content: [
      "Placement statistics, salary figures, and success stories displayed on this website are based on past student outcomes and are not a guarantee of future results.",
      "Individual outcomes depend on factors including prior experience, effort, market conditions, interview performance, and employer requirements.",
      "Coding Sharks provides placement assistance and career support — not a guaranteed job offer.",
      "Salary ranges mentioned are indicative industry figures and may vary significantly based on role, company, location, and individual negotiation.",
    ],
  },
  {
    heading: "Course Content & Curriculum",
    content: [
      "Course curriculum, tools, and technologies covered may be updated periodically to reflect industry changes.",
      "Coding Sharks reserves the right to modify course content, instructors, batch timings, and delivery format without prior notice.",
      "Completion of a Coding Sharks program does not guarantee admission to any university, certification body, or employer.",
    ],
  },
  {
    heading: "Third-Party Tools & Technologies",
    content:
      "Our courses involve training on third-party tools, platforms, and technologies (e.g., AWS, GitHub, React, Python). Coding Sharks is not affiliated with, endorsed by, or officially partnered with these companies unless explicitly stated. All trademarks belong to their respective owners.",
  },
  {
    heading: "External Links",
    content:
      "Our website may contain links to external websites for reference purposes. Coding Sharks does not control these sites and is not responsible for their content, privacy practices, or availability.",
  },
  {
    heading: "No Professional Advice",
    content:
      "Nothing on this website constitutes legal, financial, or career advice. For specific professional guidance, please consult a qualified professional.",
  },
  {
    heading: "Limitation of Liability",
    content:
      "Coding Sharks, its directors, instructors, and staff shall not be liable for any direct, indirect, incidental, or consequential loss or damage arising from reliance on information provided on this website or through our programs.",
  },
]

export default function DisclaimerPage() {
  return (
    <LegalPage
      title="Disclaimer"
      subtitle="Please read this disclaimer carefully before relying on any information provided by Coding Sharks."
      lastUpdated="June 1, 2025"
      sections={sections}
    />
  )
}
