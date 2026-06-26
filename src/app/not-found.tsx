import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <Section className="pt-28 md:pt-36">
      <Container>
        <div className="mx-auto max-w-xl py-16 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">404</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Page not found
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            The page you&apos;re looking for doesn&apos;t exist or has moved. Explore our
            courses or head back home.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/"
              className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-primary/90">
              Back to home
            </Link>
            <Link
              href="/courses"
              className="rounded-full border border-border px-6 py-2.5 text-sm font-semibold text-foreground transition hover:border-primary/40">
              Browse courses
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
