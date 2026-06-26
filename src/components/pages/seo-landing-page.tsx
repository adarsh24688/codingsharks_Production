import Link from "next/link";
import { ArrowRight, Check, MapPin, Plus } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import type { SeoLanding } from "@/data/seo-landing";

export function SeoLandingPage({ data }: { data: SeoLanding }) {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Hero */}
      <div className="relative overflow-hidden pt-24 pb-12 sm:pt-32 sm:pb-16">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 50% -10%, rgba(255,107,44,0.16) 0%, transparent 65%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <Container className="relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 border border-primary/30 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.24em] text-primary">
              <MapPin className="h-3.5 w-3.5" /> {data.eyebrow}
            </span>
            <h1 className="mt-6 font-heading text-3xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
              {data.h1}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/55">
              {data.intro}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/book-demo"
                className="inline-flex items-center gap-2 bg-primary px-7 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-primary/85">
                Book a Free Demo <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 border border-white/15 px-7 py-3 text-sm font-bold uppercase tracking-wide text-white/80 transition hover:border-primary/40 hover:text-white">
                View Programs
              </Link>
            </div>
          </div>
        </Container>
      </div>

      {/* Stats band */}
      <Section className="border-y border-white/8 bg-white/[0.02] py-10">
        <Container>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
            {data.stats.map((s) => (
              <div key={s.l}>
                <p className="text-2xl font-bold text-primary md:text-3xl">{s.v}</p>
                <p className="mt-1 text-[11px] leading-snug text-white/45">{s.l}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Comparison table (one row = one extractable fact) */}
      {data.comparison && (
        <Section className="py-12 md:py-16">
          <Container>
            <div className="mx-auto max-w-3xl overflow-hidden border border-white/8">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/8 bg-white/[0.03]">
                    <th className="p-4 font-semibold text-white/50"> </th>
                    <th className="p-4 font-semibold text-white/60">
                      {data.comparison.columns[0]}
                    </th>
                    <th className="p-4 font-bold text-primary">
                      {data.comparison.columns[1]}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.comparison.rows.map((row) => (
                    <tr key={row.label} className="border-b border-white/8 last:border-0">
                      <td className="p-4 font-semibold text-white/70">{row.label}</td>
                      <td className="p-4 text-white/45">{row.a}</td>
                      <td className="p-4 text-white/80">{row.b}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {data.comparison.caption && (
              <p className="mx-auto mt-3 max-w-3xl text-xs text-white/50">
                {data.comparison.caption}
              </p>
            )}
          </Container>
        </Section>
      )}

      {/* Sections — question-shaped H2 + answer-first body */}
      <Section className="py-14 md:py-20">
        <Container>
          <div className="mx-auto max-w-3xl space-y-12">
            {data.sections.map((sec) => (
              <div key={sec.heading}>
                <h2 className="text-xl font-bold leading-snug text-white sm:text-2xl">
                  {sec.heading}
                </h2>
                {sec.body.map((p, i) => (
                  <p key={i} className="mt-4 leading-relaxed text-white/60">
                    {p}
                  </p>
                ))}
                {sec.bullets && (
                  <ul className="mt-5 grid gap-3">
                    {sec.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3 text-white/65">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span className="leading-relaxed">{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* FAQ — visible text matches FAQPage JSON-LD verbatim */}
      <Section className="border-t border-white/8 py-14 md:py-20">
        <Container>
          <div className="mx-auto max-w-3xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              FAQ
            </p>
            <h2 className="mb-8 text-2xl font-bold text-white">Frequently asked questions</h2>
            <div className="divide-y divide-white/8 border-y border-white/8">
              {data.faqs.map((f) => (
                <details key={f.q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-medium text-white [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <Plus className="h-5 w-5 shrink-0 text-primary transition-transform group-open:rotate-45" />
                  </summary>
                  <p className="mt-3 leading-relaxed text-white/55">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Related + CTA */}
      <Section className="border-t border-white/8 py-14 md:py-20">
        <Container>
          <div className="mx-auto max-w-3xl">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-2 text-sm text-white/50">
              <span className="font-semibold uppercase tracking-wider text-white/50">
                Explore:
              </span>
              {data.related.map((r, i) => (
                <span key={r.href} className="inline-flex items-center gap-2">
                  <Link href={r.href} className="text-primary hover:underline underline-offset-2">
                    {r.label}
                  </Link>
                  {i < data.related.length - 1 && <span className="text-white/15">·</span>}
                </span>
              ))}
            </div>

            <div className="mt-10 border border-white/8 bg-white/[0.03] p-6 sm:p-10 text-center">
              <h2 className="text-xl font-bold text-white sm:text-2xl font-heading">
                Ready to start in Indore?
              </h2>
              <p className="mx-auto mt-2 max-w-md text-sm text-white/50">
                Book a free demo session. Meet a mentor, see the live cohort, and get an honest
                assessment of which program fits you.
              </p>
              <Link
                href="/book-demo"
                className="mt-6 inline-flex items-center gap-2 bg-primary px-8 py-3.5 text-sm font-bold uppercase tracking-widest text-white transition hover:bg-primary/85">
                Book Free Demo <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
