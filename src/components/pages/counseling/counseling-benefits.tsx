type Benefit = { icon: string; title: string; desc: string };
type Props = { benefits: Benefit[] };

export function CounselingBenefits({ benefits }: Props) {
  return (
    <section id="what-you-get" className="w-full py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-8 lg:px-16">
        {/* Section label */}
        <div className="mb-14">
          <p className="text-xs font-black tracking-[0.22em] text-primary uppercase">What You Get</p>
          <h2
            className="mt-3 font-heading font-black leading-[0.9] tracking-tight text-white"
            style={{ fontSize: "clamp(44px, 7vw, 80px)" }}>
            One Session.
            <br />
            <span className="text-primary/65">Four Results.</span>
          </h2>
        </div>

        {/* Full-width numbered rows */}
        <div className="divide-y divide-white/8 border-y border-white/8">
          {benefits.map((benefit, i) => (
            <div
              key={benefit.title}
              className="group flex items-start gap-6 py-8 transition-colors hover:bg-white/2 sm:gap-10 sm:py-10">
              {/* Big faded number */}
              <span
                className="w-16 shrink-0 text-right font-heading font-black leading-none text-white/8 transition-colors duration-300 group-hover:text-primary/20 sm:w-24"
                style={{ fontSize: "clamp(48px, 6vw, 72px)" }}>
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Content */}
              <div className="flex flex-1 items-start justify-between gap-6 pt-1">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white transition-colors group-hover:text-primary sm:text-2xl">
                    {benefit.title}
                  </h3>
                  <p className="mt-2.5 max-w-md text-sm leading-relaxed text-white/60 sm:text-base">
                    {benefit.desc}
                  </p>
                </div>
                <span className="shrink-0 text-4xl opacity-50 transition-opacity duration-300 group-hover:opacity-100 sm:text-5xl">
                  {benefit.icon}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA row */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border border-white/8 bg-white/2 px-6 py-5">
          <p className="text-sm text-white/60">
            All of this — in a single free 30-minute call.
          </p>
          <a
            href="#book"
            className="inline-flex h-11 items-center bg-primary px-7 text-sm font-bold text-white transition hover:bg-primary/90">
            Book Now →
          </a>
        </div>
      </div>
    </section>
  );
}
