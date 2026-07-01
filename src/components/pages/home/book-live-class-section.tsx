"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Star,
  Sparkles,
  ShieldCheck,
  Zap,
  Users,
} from "lucide-react";
import home from "@/data/home.json";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import {
  fetchCrmCourses,
  submitLeadToCrm,
  type CrmCourse,
} from "@/lib/crm-api";
import {
  sanitizeIndianMobile,
  validateIndianMobile,
  validateEmail,
  validateName,
} from "@/lib/validators";
import { VideoPlayer } from "@/components/ui/video-player";

export function BookLiveClassSection() {
  const router = useRouter();
  const live = home.liveClass;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [courses, setCourses] = useState<CrmCourse[]>([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    courseId: "",
  });

  useEffect(() => {
    fetchCrmCourses("regular").then(setCourses);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
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
    setLoading(true);

    const result = await submitLeadToCrm({
      name: form.name,
      email: form.email,
      mobile: sanitizeIndianMobile(form.phone),
      courseInterest: form.courseId || undefined,
      notes: "Book Live Class",
    });

    setLoading(false);
    if (result.success) {
      setForm({ name: "", email: "", phone: "", courseId: "" });
      router.push("/thank-you?from=/");
    } else {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <Section className="relative overflow-hidden py-14 sm:py-20 md:py-28 bg-[#0a0a0a] border-t border-white/5">
      {/* ── Background glows ── */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        <div className="absolute -top-24 -left-32 h-96 w-96 rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute top-1/2 -right-32 h-80 w-80 rounded-full bg-primary/5 blur-[100px]" />
      </div>

      <Container>
        {/* ── Header ── */}
        <div className="flex flex-col items-center mb-10 sm:mb-16 text-center">
          <div className="inline-flex items-center gap-2 border border-primary/30 bg-primary/10 px-4 py-1.5 mb-5">
            <Sparkles className="h-3.5 w-3.5 text-primary animate-pulse" />
            <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-primary uppercase">
              Limited Free Live Session
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-[56px] font-bold text-white max-w-3xl leading-[1.1] tracking-tight font-heading">
            Become the <span className="text-primary">Top 1%</span> in Tech
          </h2>

          <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-white/60 max-w-2xl leading-relaxed">
            Experience our high-intensity, placement-focused model. Join{" "}
            <span className="text-white/70 font-semibold">3,000+ students</span>{" "}
            who&apos;ve transformed their careers with real mentorship.
          </p>
        </div>

        {/* ── Main Grid ── */}
        <div className="grid gap-8 sm:gap-10 lg:gap-14 lg:grid-cols-[1.15fr_0.85fr] items-start">
          {/* ──── Left — Video + Stats + Points ──── */}
          <div className="flex flex-col gap-6 sm:gap-8">
            {/* Custom Video Player */}
            <VideoPlayer
              src="/video/CodingSharks.mp4"
              poster="/images/office6.jpg"
            />
            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4">
              {live.stats.map((s, idx) => (
                <div
                  key={idx}
                  className="relative group p-3 sm:p-5 md:p-6 border border-white/8 bg-[#111] hover:border-primary/30 transition-all duration-300 overflow-hidden">
                  <div className="absolute top-2 right-2 opacity-10 group-hover:opacity-25 transition-opacity">
                    {idx === 0 ? (
                      <ShieldCheck className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                    ) : idx === 1 ? (
                      <Users className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                    ) : (
                      <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                    )}
                  </div>
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight mb-1 font-heading leading-none">
                    {s.value}
                  </div>
                  <div className="text-[9px] sm:text-[10px] text-white/60 uppercase tracking-wide font-semibold leading-tight">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Trust Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
              {[
                "1-on-1 mentorship from IIT/NIT alumni",
                "10+ industry-standard projects",
                "Placements with 21 LPA+ packages",
                "Lifetime community & sprint access",
              ].map((point, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 border border-white/8 bg-white/5 hover:border-primary/25 hover:bg-primary/5 transition-colors">
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                  <span className="text-xs sm:text-sm text-white/60">
                    {point}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ──── Right — Form ──── */}
          <div className="lg:sticky lg:top-28">
            <div className="relative border border-white/8 bg-[#111] p-4 sm:p-6 md:p-8 overflow-hidden">
              {/* Ambient glow */}
              <div className="absolute -top-20 -right-20 h-48 w-48 rounded-full bg-primary/8 blur-[60px]" />
              <div className="absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-primary/5 blur-[60px]" />

              <div className="relative z-10 mb-5">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1.5 font-heading tracking-tight">
                  {live.form.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/60 flex items-center gap-1.5">
                  <Clock className="h-3 w-3 sm:h-3.5 sm:w-3.5 shrink-0" />
                  Fills in under 60s · Limited seats
                </p>
              </div>

              <form
                className="relative z-10 space-y-3 sm:space-y-4"
                onSubmit={handleSubmit}>
                {/* Program Select */}
                <div className="space-y-1.5">
                  <label className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-white/60">
                    Choose Program
                  </label>
                  <div className="relative">
                    <select aria-label="Choose a program"
                      required
                      value={form.courseId}
                      onChange={(e) =>
                        setForm({ ...form, courseId: e.target.value })
                      }
                      className="w-full h-11 sm:h-12 border border-white/10 bg-white/5 px-3 sm:px-4 text-sm text-white focus:border-primary focus:outline-none appearance-none cursor-pointer transition-all hover:border-white/20 [&>option]:bg-[#1a1a1a] [&>option]:text-white">
                      <option value="" disabled>
                        Select Specialization
                      </option>
                      {courses.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/55">
                      <ArrowRight className="h-4 w-4 rotate-90" />
                    </div>
                  </div>
                </div>

                {/* Name */}
                <div>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full h-11 sm:h-12 min-w-0 border border-white/10 bg-white/5 px-3 sm:px-4 text-sm text-white placeholder:text-white/55 focus:border-primary focus:outline-none transition-all hover:border-white/20"
                    placeholder="Full Name"
                  />
                  {fieldErrors.name && (
                    <p className="text-xs text-red-400 mt-1">{fieldErrors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full h-11 sm:h-12 min-w-0 border border-white/10 bg-white/5 px-3 sm:px-4 text-sm text-white placeholder:text-white/55 focus:border-primary focus:outline-none transition-all hover:border-white/20"
                    placeholder="Email Address"
                  />
                  {fieldErrors.email && (
                    <p className="text-xs text-red-400 mt-1">{fieldErrors.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <div className="flex gap-2">
                    <div className="w-16 sm:w-20 h-11 sm:h-12 shrink-0 border border-white/10 bg-white/5 px-2 sm:px-3 text-xs sm:text-sm text-white/60 flex items-center justify-center gap-1 font-medium">
                      🇮🇳 +91
                    </div>
                    <input
                      type="tel"
                      inputMode="numeric"
                      maxLength={10}
                      required
                      value={form.phone}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          phone: e.target.value.replace(/\D/g, "").slice(0, 10),
                        })
                      }
                      className="flex-1 min-w-0 h-11 sm:h-12 border border-white/10 bg-white/5 px-3 sm:px-4 text-sm text-white placeholder:text-white/55 focus:border-primary focus:outline-none transition-all hover:border-white/20"
                      placeholder="WhatsApp Number"
                    />
                  </div>
                  {fieldErrors.phone && (
                    <p className="text-xs text-red-400 mt-1">{fieldErrors.phone}</p>
                  )}
                </div>

                {/* Error */}
                {error && <p className="text-sm text-red-400">{error}</p>}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="group w-full h-12 sm:h-13 bg-primary text-sm font-bold text-white shadow-[0_0_24px_-4px_rgba(255,107,44,0.6)] hover:bg-primary/90 transition-all active:scale-[0.98] flex items-center justify-center gap-2 mt-1 disabled:opacity-70">
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin h-4 w-4 shrink-0"
                        viewBox="0 0 24 24"
                        fill="none">
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="white"
                          strokeWidth="3"
                          strokeOpacity="0.3"
                        />
                        <path
                          d="M12 2a10 10 0 0 1 10 10"
                          stroke="white"
                          strokeWidth="3"
                          strokeLinecap="round"
                        />
                      </svg>
                      Submitting…
                    </>
                  ) : (
                    <>
                      <span>{live.cta.label}</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>

                {/* Trust Row */}
                <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-2 pt-3 border-t border-white/8">
                  <div>
                    <p className="text-[10px] sm:text-[11px] font-bold text-white/55 uppercase tracking-wide">
                      {live.cta.note}
                    </p>
                    <p className="text-[10px] sm:text-[11px] text-primary font-semibold mt-0.5">
                      9.8/10 students recommend CS
                    </p>
                  </div>
                  <div className="flex gap-0.5 shrink-0">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        className="h-3 w-3 sm:h-3.5 sm:w-3.5 fill-primary text-primary"
                      />
                    ))}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
