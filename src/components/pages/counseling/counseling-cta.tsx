"use client";

import { useState } from "react";

import { submitLeadToCrm } from "@/lib/crm-api";
import {
  sanitizeIndianMobile,
  validateIndianMobile,
  validateEmail,
  validateName,
} from "@/lib/validators";

type CtaData = {
  headline: string;
  subtext: string;
  urgency: string;
  doubtOptions: string[];
};

type Props = { data: CtaData };

type FormState = { name: string; email: string; phone: string; doubt: string };

const inputCls =
  "h-11 w-full border border-black/20 bg-white/10 px-3 text-sm text-white placeholder:text-white/60 outline-none transition focus:border-white/60 focus:bg-white/15";

export function CounselingCta({ data }: Props) {
  const [form, setForm] = useState<FormState>({ name: "", email: "", phone: "", doubt: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const set = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((p) => ({ ...p, [key]: e.target.value }));

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const errs: Record<string, string> = {};
    const nameErr = validateName(form.name);
    if (nameErr) errs.name = nameErr;
    const emailErr = validateEmail(form.email);
    if (emailErr) errs.email = emailErr;
    const phoneErr = validateIndianMobile(form.phone);
    if (phoneErr) errs.phone = phoneErr;
    if (Object.keys(errs).length) {
      setFieldErrors(errs);
      return;
    }
    setFieldErrors({});
    setSubmitting(true);
    const result = await submitLeadToCrm({
      name: form.name.trim(),
      email: form.email.trim(),
      mobile: sanitizeIndianMobile(form.phone),
      notes: `Free counseling booking. Doubt: ${form.doubt || "Not specified"}. Campaign: Counseling. Source: /counseling`,
    });
    setSubmitting(false);
    if (!result.success) {
      setError(result.error ?? "Something went wrong. Please try again.");
      return;
    }
    setSubmitted(true);
    setForm({ name: "", email: "", phone: "", doubt: "" });
    if (typeof window !== "undefined" && typeof window.fbq === "function") {
      window.fbq("trackCustom", "CounselingBooked");
    }
  };

  return (
    <section id="book" className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2">

        {/* LEFT — orange panel */}
        <div className="relative overflow-hidden bg-primary px-8 py-14 sm:px-12 sm:py-16">
          {/* decorative */}
          <div className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full border border-white/10" />
          <div className="pointer-events-none absolute -bottom-12 -left-12 h-48 w-48 rounded-full border border-white/10" />

          <p className="relative z-10 text-xs font-bold tracking-[0.18em] text-white/70 uppercase">
            {data.urgency}
          </p>

          <h2 className="relative z-10 mt-4 font-heading text-4xl font-black leading-tight text-white sm:text-5xl">
            {data.headline}
          </h2>

          <p className="relative z-10 mt-4 text-base text-white/75">{data.subtext}</p>

          <div className="relative z-10 mt-10 space-y-4">
            {[
              { icon: "✓", text: "30-minute focused session" },
              { icon: "✓", text: "No sales pitch. Ever." },
              { icon: "✓", text: "Real guidance, not generic advice" },
              { icon: "✓", text: "Walk away with a clear roadmap" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center border border-white/40 text-xs font-bold text-white">
                  {item.icon}
                </span>
                <span className="text-sm font-semibold text-white/85">{item.text}</span>
              </div>
            ))}
          </div>

          {/* bottom big number */}
          <p className="absolute bottom-4 right-6 font-heading text-[120px] font-black leading-none text-white/8 select-none">
            0₹
          </p>
        </div>

        {/* RIGHT — form panel */}
        <div className="bg-[#0a0a0a] px-8 py-14 sm:px-12 sm:py-16">
          {submitted ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="flex h-16 w-16 items-center justify-center border border-primary/40 bg-primary/10 text-3xl">
                🎉
              </div>
              <h3 className="mt-5 font-heading text-2xl font-bold text-white">Slot Booked!</h3>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/60">
                Our counselor will call you within 24 hours. Get ready — clarity is on its way.
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-5">
              <div>
                <h3 className="font-heading text-2xl font-bold text-white">Book Your Free Slot</h3>
                <p className="mt-1 text-sm text-white/60">
                  Fill in the form — our counselor will call you within 24 hours.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold tracking-wider text-white/60 uppercase">
                    Full Name
                  </label>
                  <input
                    required
                    value={form.name}
                    onChange={set("name")}
                    placeholder="Your name"
                    className={inputCls}
                  />
                  {fieldErrors.name && (
                    <p className="text-xs text-red-400 mt-1">{fieldErrors.name}</p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold tracking-wider text-white/60 uppercase">
                    Phone
                  </label>
                  <input
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    required
                    value={form.phone}
                    onChange={(e) =>
                      setForm((p) => ({
                        ...p,
                        phone: e.target.value.replace(/\D/g, "").slice(0, 10),
                      }))
                    }
                    placeholder="10 digit mobile"
                    className={inputCls}
                  />
                  {fieldErrors.phone && (
                    <p className="text-xs text-red-400 mt-1">{fieldErrors.phone}</p>
                  )}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold tracking-wider text-white/60 uppercase">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={set("email")}
                  placeholder="you@example.com"
                  className={inputCls}
                />
                {fieldErrors.email && (
                  <p className="text-xs text-red-400 mt-1">{fieldErrors.email}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold tracking-wider text-white/60 uppercase">
                  Biggest Doubt
                </label>
                <select aria-label="Your biggest doubt"
                  value={form.doubt}
                  onChange={set("doubt")}
                  className={`${inputCls} cursor-pointer`}>
                  <option value="">Select your doubt...</option>
                  {data.doubtOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {error ? <p className="text-sm text-red-400">{error}</p> : null}

              <button
                type="submit"
                disabled={submitting}
                className="h-12 w-full bg-primary text-sm font-bold text-white transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60">
                {submitting ? "Booking..." : "Book My Free Session →"}
              </button>

              <p className="text-center text-xs text-white/60">
                No spam. No sales calls. Just pure guidance.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
