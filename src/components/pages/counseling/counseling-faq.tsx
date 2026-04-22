"use client";

import { useState } from "react";

type FaqItem = { q: string; a: string };
type Props = { faq: FaqItem[] };

export function CounselingFaq({ faq }: Props) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="mx-auto w-full max-w-3xl px-4 py-16 sm:py-20">
      <div className="mb-12 text-center">
        <p className="text-xs font-semibold tracking-[0.14em] text-primary uppercase">
          FAQ
        </p>
        <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
          Your Questions. Our Answers.
        </h2>
      </div>

      <div className="space-y-2">
        {faq.map((item, i) => (
          <div key={i} className="border border-white/10 bg-white/5">
            <button
              type="button"
              onClick={() => setOpen(open === i ? null : i)}
              className="flex w-full items-center justify-between px-5 py-4 text-left transition hover:bg-white/5">
              <span className="pr-4 text-sm font-semibold text-white sm:text-base">
                {item.q}
              </span>
              <span
                className="shrink-0 text-primary transition-transform duration-300"
                style={{ transform: open === i ? "rotate(45deg)" : "rotate(0deg)" }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M10 4v12M4 10h12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="square"
                  />
                </svg>
              </span>
            </button>

            <div
              className="overflow-hidden transition-all duration-300"
              style={{ maxHeight: open === i ? "200px" : "0px", opacity: open === i ? 1 : 0 }}>
              <p className="px-5 pb-5 text-sm leading-relaxed text-white/60">{item.a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
