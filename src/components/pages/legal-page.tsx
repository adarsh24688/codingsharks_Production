import { Container } from "@/components/layout/container"

type Section = {
  heading: string
  content: string | string[]
}

type Props = {
  title: string
  subtitle?: string
  lastUpdated: string
  sections: Section[]
}

export function LegalPage({ title, subtitle, lastUpdated, sections }: Props) {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="relative border-b border-white/5 bg-[#0a0a0a] py-16 sm:py-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(210,69,9,0.08),transparent_60%)]" />
        <Container className="relative">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium tracking-widest text-white/50 uppercase mb-5">
            Legal
          </div>
          <h1 className="font-heading text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/50 sm:text-base">
              {subtitle}
            </p>
          )}
          <p className="mt-5 text-xs text-white/30">
            Last updated:{" "}
            <span className="text-white/50">{lastUpdated}</span>
          </p>
        </Container>
      </div>

      {/* Content */}
      <Container className="py-14 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <div className="flex flex-col gap-10">
            {sections.map((section, i) => (
              <div
                key={i}
                className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 sm:p-8"
              >
                <h2 className="mb-4 text-base font-semibold text-white sm:text-lg">
                  <span className="mr-3 text-primary">{String(i + 1).padStart(2, "0")}.</span>
                  {section.heading}
                </h2>
                {Array.isArray(section.content) ? (
                  <ul className="flex flex-col gap-2">
                    {section.content.map((item, j) => (
                      <li key={j} className="flex gap-3 text-sm leading-relaxed text-white/55">
                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary/70" />
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm leading-relaxed text-white/55">{section.content}</p>
                )}
              </div>
            ))}
          </div>

          {/* Contact strip */}
          <div className="mt-10 rounded-2xl border border-primary/20 bg-primary/5 p-6 text-center">
            <p className="text-sm text-white/60">
              Questions about this policy?{" "}
              <a
                href="mailto:info@thecodingsharks.com"
                className="font-medium text-primary hover:underline underline-offset-4"
              >
                info@thecodingsharks.com
              </a>
            </p>
          </div>
        </div>
      </Container>
    </div>
  )
}
