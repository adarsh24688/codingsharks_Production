import type { Metadata } from "next"
import { BasicPage } from "@/components/pages/basic-page"

export const metadata: Metadata = {
  title: "Course Curriculum",
  description:
    "Detailed curriculum for Coding Sharks programs — Full Stack Web Development, AI Agents, Data Science, DSA, and System Design.",
  alternates: { canonical: "/course-curriculum" },
}

// Stub page — render on-demand (skips static prerender; SSG not needed here).
export const dynamic = "force-dynamic"

export default function CourseCurriculumPage() {
  return (
    <BasicPage
      title="Course Curriculum"
      description="Curriculum download will be added here."
    />
  )
}