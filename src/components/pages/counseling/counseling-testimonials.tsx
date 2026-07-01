type Testimonial = { name: string; college: string; quote: string; outcome: string };
type Props = { testimonials: Testimonial[] };

const ACCENT_COLOR = ["text-primary", "text-[#38bdf8]", "text-[#22c55e]"];
const ACCENT_BORDER = ["border-primary/40 text-primary", "border-[#38bdf8]/40 text-[#38bdf8]", "border-[#22c55e]/40 text-[#22c55e]"];
const DOT_BG = ["bg-primary", "bg-[#38bdf8]", "bg-[#22c55e]"];

export function CounselingTestimonials({ testimonials }: Props) {
  return (
    <section className="w-full py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-8 lg:px-16">
        {/* Header */}
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-xs font-black tracking-[0.22em] text-primary uppercase">
              Student Stories
            </p>
            <h2
              className="mt-2 font-heading font-black leading-[0.88] tracking-tight text-white"
              style={{ fontSize: "clamp(44px, 7vw, 80px)" }}>
              Real Students.
              <br />
              <span className="text-primary/65">Real Results.</span>
            </h2>
          </div>
          <p className="hidden max-w-40 text-right text-sm leading-relaxed text-white/60 sm:block">
            One call. Changed everything.
          </p>
        </div>

        {/* Testimonial rows — stacked, full width */}
        <div className="space-y-5">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className="group relative overflow-hidden border border-white/8 bg-white/2 p-8 transition hover:border-white/15 sm:p-10">
              {/* Giant faded quote mark */}
              <span
                className={`pointer-events-none absolute -top-6 right-4 select-none font-heading text-[160px] font-black leading-none opacity-[0.04] ${ACCENT_COLOR[i]}`}>
                &ldquo;
              </span>

              <div className="relative grid grid-cols-1 gap-6 sm:grid-cols-[16px_1fr]">
                {/* Colored accent dot */}
                <div className="hidden items-start pt-2 sm:flex">
                  <div className={`h-3 w-3 rounded-full ${DOT_BG[i]}`} />
                </div>

                <div>
                  {/* Quote */}
                  <p className="text-lg font-medium leading-relaxed text-white/80 sm:text-xl">
                    &ldquo;{t.quote}&rdquo;
                  </p>

                  {/* Attribution */}
                  <div className="mt-6 flex flex-wrap items-center gap-4">
                    <div className={`flex items-center gap-2 sm:hidden`}>
                      <div className={`h-2 w-2 rounded-full ${DOT_BG[i]}`} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">{t.name}</p>
                      <p className="text-xs text-white/60">{t.college}</p>
                    </div>
                    <span
                      className={`border px-3 py-1 text-xs font-bold ${ACCENT_BORDER[i]}`}>
                      {t.outcome}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Social proof footer */}
        <div className="mt-8 flex items-center gap-3 border-t border-white/8 pt-6">
          <div className="flex -space-x-1.5">
            {["A", "P", "R"].map((l, i) => (
              <div
                key={l}
                className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-black bg-primary/25 text-[10px] font-bold text-primary"
                style={{ zIndex: 3 - i }}>
                {l}
              </div>
            ))}
          </div>
          <p className="text-sm text-white/60">
            <span className="font-semibold text-white/65">500+ students</span> have already booked their free session
          </p>
        </div>
      </div>
    </section>
  );
}
