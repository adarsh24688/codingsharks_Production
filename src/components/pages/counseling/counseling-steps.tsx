type Step = { step: string; title: string; desc: string };
type Props = { steps: Step[] };

export function CounselingSteps({ steps }: Props) {
  return (
    <section className="w-full bg-primary py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-8 lg:px-16">
        {/* Header */}
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-xs font-black tracking-[0.22em] text-white/55 uppercase">
              How It Works
            </p>
            <h2
              className="mt-2 font-heading font-black leading-[0.88] tracking-tight text-white"
              style={{ fontSize: "clamp(44px, 7vw, 80px)" }}>
              4 Steps.
              <br />
              That&apos;s It.
            </h2>
          </div>
          <a
            href="#book"
            className="hidden h-12 items-center border-2 border-white px-7 text-sm font-bold text-white transition hover:bg-white hover:text-primary sm:inline-flex">
            Book Free →
          </a>
        </div>

        {/* Steps as bold rows */}
        <div className="divide-y divide-white/15 border-y border-white/15">
          {steps.map((step, i) => (
            <div key={step.step} className="group flex items-start gap-6 py-8 sm:gap-10">
              {/* Faded step number */}
              <span
                className="w-16 shrink-0 text-right font-heading font-black leading-none text-white/15 sm:w-24"
                style={{ fontSize: "clamp(48px, 6vw, 72px)" }}>
                {step.step}
              </span>

              {/* Content */}
              <div className="flex flex-1 items-start justify-between gap-4 pt-1">
                <div>
                  <h3 className="text-xl font-bold text-white sm:text-2xl">{step.title}</h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-white/65 sm:text-base">
                    {step.desc}
                  </p>
                </div>
                {/* Step indicator */}
                <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-white/25">
                  <div className="h-2 w-2 rounded-full bg-white/80" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile CTA */}
        <a
          href="#book"
          className="mt-10 flex h-14 w-full items-center justify-center border-2 border-white text-sm font-bold text-white transition hover:bg-white hover:text-primary sm:hidden">
          Book My Free Session →
        </a>
      </div>
    </section>
  );
}
