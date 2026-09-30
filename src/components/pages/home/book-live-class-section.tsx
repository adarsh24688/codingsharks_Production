"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, ChevronDown } from "lucide-react";

import home from "@/data/home.json";
import site from "@/data/site.json";
import { Container } from "@/components/layout/container";
import { fetchCrmCourses, submitLeadToCrm, type CrmCourse } from "@/lib/crm-api";
import { sanitizeIndianMobile, validateIndianMobile, validateEmail, validateName } from "@/lib/validators";
import { VideoPlayer } from "@/components/ui/video-player";
import { useSectionMotion } from "./use-section-motion";

const stubRing = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white";

const STATS = [
  { value: "50+", label: "hiring partners" },
  { value: "2,000+", label: "careers transformed" },
];

const DETAILS = [
  { label: "Where", value: "Indore campus" },
  { label: "With", value: "A running batch" },
  { label: "Seats", value: "Limited" },
];

const BARS = Array.from({ length: 42 }, (_, i) => {
  const v = Math.sin(i * 12.9898) * 43758.5453;
  const n = v - Math.floor(v);
  return n < 0.33 ? 1 : n < 0.72 ? 2 : 4;
});

const labelClass = "block text-[13px] font-semibold text-white/85";

const inputClass =
  "h-11 w-full min-w-0 rounded-[10px] border border-white/35 bg-cs-ink/15 px-4 text-[15px] text-white placeholder:text-white/65 transition-colors duration-150 hover:border-white/60 focus:border-white focus:outline-2 focus:outline-offset-2 focus:outline-white aria-invalid:border-cs-ink";

const errorClass = "mt-1.5 text-[13px] font-semibold text-cs-ink";

export function BookLiveClassSection() {
  const router = useRouter();
  const live = home.liveClass;
  const sectionRef = useRef<HTMLElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [courses, setCourses] = useState<CrmCourse[]>([]);
  const [coursesReady, setCoursesReady] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    courseId: "",
  });

  useEffect(() => {
    fetchCrmCourses("regular").then((list) => {
      setCourses(list);
      setCoursesReady(true);
    });
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

  useSectionMotion(sectionRef, ({ gsap, root, finePointer }) => {
    gsap.fromTo(
      "[data-live-marker]",
      { clipPath: "inset(0% 100% 0% 0%)" },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 0.8,
        ease: "power3.inOut",
        scrollTrigger: { trigger: "[data-live-marker]", start: "top 86%", once: true },
      },
    );

    const ticket = root.querySelector<HTMLElement>("[data-live-ticket]");
    if (ticket) {
      gsap.fromTo(
        ticket,
        { y: 120, rotation: -5, opacity: 0.2 },
        {
          y: 0,
          rotation: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: { trigger: ticket, start: "top 98%", end: "top 45%", scrub: 0.7 },
        },
      );
    }

    gsap.fromTo(
      "[data-live-scan]",
      { xPercent: -10, opacity: 0 },
      {
        xPercent: 1000,
        opacity: 1,
        duration: 1.4,
        ease: "power2.inOut",
        scrollTrigger: { trigger: "[data-live-barcode]", start: "top 85%", once: true },
      },
    );

    gsap.fromTo(
      "[data-live-field]",
      { opacity: 0, y: 18 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.07,
        scrollTrigger: { trigger: "[data-live-form]", start: "top 85%", once: true },
      },
    );

    const button = root.querySelector<HTMLElement>("[data-live-magnet]");
    const label = root.querySelector<HTMLElement>("[data-live-magnet-label]");
    if (!finePointer || !button || !label) return;

    const tween = { duration: 0.4, ease: "power3.out" };
    const buttonX = gsap.quickTo(button, "x", tween);
    const buttonY = gsap.quickTo(button, "y", tween);
    const labelX = gsap.quickTo(label, "x", tween);
    const labelY = gsap.quickTo(label, "y", tween);

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const rect = button.getBoundingClientRect();
      const dx = (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const dy = (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
      buttonX(dx * 8);
      buttonY(dy * 5);
      labelX(dx * 4);
      labelY(dy * 2.5);
    };
    const onLeave = () => {
      buttonX(0);
      buttonY(0);
      labelX(0);
      labelY(0);
    };

    button.addEventListener("pointermove", onMove);
    button.addEventListener("pointerleave", onLeave);
    return () => {
      button.removeEventListener("pointermove", onMove);
      button.removeEventListener("pointerleave", onLeave);
    };
  });

  const programPlaceholder = !coursesReady
    ? "Loading programs"
    : courses.length
      ? "Select a program"
      : "Programs unavailable";

  return (
    <section ref={sectionRef} className="overflow-hidden bg-cs-paper py-16 text-cs-on-paper sm:py-20 lg:py-24">
      <Container>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <h2 className="font-heading text-[32px] font-medium leading-[1.05] tracking-[-0.03em] sm:text-[44px] lg:text-[56px]">
            Sit in a live class,{" "}
            <span
              data-live-marker
              className="inline-block -rotate-1 rounded-[0.12em] bg-primary px-[0.18em] text-white will-change-[clip-path]">
              free
            </span>
          </h2>
          <p className="max-w-[440px] text-[15px] leading-relaxed text-cs-on-paper/72 sm:text-[17px] lg:pb-2">
            Join a real session with a running batch, ask your questions and see how we teach before you decide
            anything.
          </p>
        </div>

        <div className="relative mt-10 lg:mt-14">
          <div data-live-ticket className="origin-bottom-left will-change-transform">
            <div className="flex flex-col lg:flex-row">
              <div className="flex min-w-0 flex-1 flex-col rounded-t-[28px] bg-cs-ink p-5 text-cs-on-ink sm:p-8 lg:rounded-l-[28px] lg:rounded-tr-none lg:p-10">
                <div className="flex items-center justify-between gap-4">
                  <p className="font-heading text-[15px] font-semibold text-primary">Admit one</p>
                  <p className="text-[13px] text-cs-on-ink/60">Coding Sharks, Indore</p>
                </div>
                <h3 className="mt-3 font-heading text-[28px] font-medium leading-[1.08] tracking-[-0.03em] sm:text-[36px] xl:text-[42px]">
                  A live class, on the house
                </h3>

                <div className="mt-6 grid gap-6 md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] md:gap-8">
                  <div className="min-w-0 overflow-hidden rounded-[16px] bg-cs-ink-2">
                    <VideoPlayer src="/video/CodingSharks.mp4" poster={live.videoPoster} className="border-0" />
                  </div>
                  <dl className="flex flex-col justify-center">
                    {DETAILS.map((item) => (
                      <div
                        key={item.label}
                        className="flex items-baseline justify-between gap-4 border-b border-dashed border-cs-on-ink/20 py-3 first:pt-0">
                        <dt className="text-[13px] text-cs-on-ink/56">{item.label}</dt>
                        <dd className="text-right text-[16px] font-semibold">{item.value}</dd>
                      </div>
                    ))}
                    <div className="flex gap-6 pt-4">
                      {STATS.map((stat) => (
                        <div key={stat.label} className="flex flex-col-reverse">
                          <dt className="mt-1 text-[12px] text-cs-on-ink/60">{stat.label}</dt>
                          <dd className="font-heading text-[28px] font-semibold leading-none tracking-[-0.03em] text-primary">
                            {stat.value}
                          </dd>
                        </div>
                      ))}
                    </div>
                  </dl>
                </div>

                <div className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-8">
                  <div
                    data-live-barcode
                    aria-hidden
                    className="relative flex h-12 w-[min(100%,420px)] items-stretch gap-[3px] overflow-hidden opacity-80">
                    {BARS.map((w, i) => (
                      <span key={i} style={{ width: `${w * 2}px` }} className="shrink-0 bg-cs-on-ink/70" />
                    ))}
                    <span data-live-scan className="absolute inset-y-0 left-0 w-[10%] bg-primary/70 mix-blend-screen" />
                  </div>
                  <p className="text-[13px] text-cs-on-ink/60">
                    Questions?{" "}
                    <a href={`tel:${site.contact.phoneE164}`} className={`font-semibold text-cs-on-ink ${stubRing}`}>
                      {site.contact.phone}
                    </a>
                  </p>
                </div>
              </div>

              <div className="group relative w-full rounded-b-[28px] border-t-2 border-dashed border-cs-ink/30 bg-primary p-5 text-white transition-transform duration-500 ease-out sm:p-8 lg:w-[400px] lg:rounded-bl-none lg:rounded-br-[28px] lg:rounded-tr-[28px] lg:border-l-2 lg:border-t-0 lg:p-9 lg:hover:translate-x-1.5 lg:hover:rotate-[0.6deg] xl:w-[440px]">
                <span aria-hidden className="absolute -left-5 -top-5 size-10 rounded-full bg-cs-paper" />
                <span
                  aria-hidden
                  className="absolute -right-5 -top-5 size-10 rounded-full bg-cs-paper lg:-bottom-5 lg:-left-5 lg:right-auto lg:top-auto"
                />
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-[13px] font-semibold text-white/80">Your seat</p>
                    <p className="font-heading text-[56px] font-semibold leading-none tracking-[-0.04em]">Free</p>
                  </div>
                  <p className="pb-1 text-right text-[13px] text-white/80">{live.cta.note}</p>
                </div>

                <form data-live-form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                  <div data-live-field>
                    <label htmlFor="live-course" className={labelClass}>
                      Program
                    </label>
                    <div className="relative mt-1.5">
                      <select
                        id="live-course"
                        required
                        value={form.courseId}
                        onChange={(e) => setForm({ ...form, courseId: e.target.value })}
                        aria-describedby={coursesReady && !courses.length ? "live-course-note" : undefined}
                        className={`${inputClass} cursor-pointer appearance-none pr-10 [&>option]:bg-cs-ink [&>option]:text-cs-on-ink`}>
                        <option value="" disabled>
                          {programPlaceholder}
                        </option>
                        {courses.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        aria-hidden="true"
                        className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-white/80"
                      />
                    </div>
                    {coursesReady && !courses.length ? (
                      <p id="live-course-note" className="mt-1.5 text-[13px] text-white/85">
                        The program list did not load. Refresh the page, or call us on{" "}
                        <a
                          href={`tel:${site.contact.phoneE164}`}
                          className={`font-semibold text-white underline underline-offset-4 ${stubRing}`}>
                          {site.contact.phone}
                        </a>
                        .
                      </p>
                    ) : null}
                  </div>

                  <div data-live-field>
                    <label htmlFor="live-name" className={labelClass}>
                      Full name
                    </label>
                    <input
                      id="live-name"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      aria-invalid={fieldErrors.name ? true : undefined}
                      aria-describedby={fieldErrors.name ? "live-name-error" : undefined}
                      className={`${inputClass} mt-1.5`}
                      placeholder="Your name"
                    />
                    {fieldErrors.name && (
                      <p id="live-name-error" className={errorClass}>
                        {fieldErrors.name}
                      </p>
                    )}
                  </div>

                  <div data-live-field>
                    <label htmlFor="live-email" className={labelClass}>
                      Email address
                    </label>
                    <input
                      id="live-email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      aria-invalid={fieldErrors.email ? true : undefined}
                      aria-describedby={fieldErrors.email ? "live-email-error" : undefined}
                      className={`${inputClass} mt-1.5`}
                      placeholder="you@example.com"
                    />
                    {fieldErrors.email && (
                      <p id="live-email-error" className={errorClass}>
                        {fieldErrors.email}
                      </p>
                    )}
                  </div>

                  <div data-live-field>
                    <label htmlFor="live-phone" className={labelClass}>
                      WhatsApp number
                    </label>
                    <div className="mt-1.5 flex gap-2">
                      <div
                        aria-hidden="true"
                        className="flex h-11 w-14 shrink-0 items-center justify-center rounded-[10px] border border-white/35 bg-cs-ink/15 font-mono text-[14px] text-white/85">
                        +91
                      </div>
                      <input
                        id="live-phone"
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
                        aria-invalid={fieldErrors.phone ? true : undefined}
                        aria-describedby={fieldErrors.phone ? "live-phone-error" : undefined}
                        className={`${inputClass} flex-1`}
                        placeholder="10 digit mobile number"
                      />
                    </div>
                    {fieldErrors.phone && (
                      <p id="live-phone-error" className={errorClass}>
                        {fieldErrors.phone}
                      </p>
                    )}
                  </div>

                  {error && (
                    <p role="alert" className="text-[14px] font-semibold text-cs-ink">
                      {error}
                    </p>
                  )}

                  <div data-live-field className="pt-1">
                    <button
                      type="submit"
                      data-live-magnet
                      disabled={loading}
                      className={`group/btn inline-flex h-12 w-full items-center justify-center rounded-full bg-cs-ink px-7 text-[15px] font-semibold text-cs-on-ink transition-colors duration-150 will-change-transform hover:bg-cs-ink-2 disabled:opacity-70 ${stubRing}`}>
                      <span data-live-magnet-label className="inline-flex items-center gap-2 will-change-transform">
                        {loading ? (
                          <>
                            <svg
                              aria-hidden="true"
                              className="size-4 shrink-0 animate-spin"
                              viewBox="0 0 24 24"
                              fill="none">
                              <circle
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="3"
                                strokeOpacity="0.3"
                              />
                              <path
                                d="M12 2a10 10 0 0 1 10 10"
                                stroke="currentColor"
                                strokeWidth="3"
                                strokeLinecap="round"
                              />
                            </svg>
                            Submitting…
                          </>
                        ) : (
                          <>
                            <span>{live.cta.label}</span>
                            <ArrowRight
                              aria-hidden="true"
                              className="size-4 transition-transform duration-150 group-hover/btn:translate-x-0.5"
                            />
                          </>
                        )}
                      </span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
