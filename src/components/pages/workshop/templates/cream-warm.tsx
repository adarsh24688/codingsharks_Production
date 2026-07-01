"use client";

import { useMemo, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { RegistrationModal } from "../shared/registration-modal";
import { useCountdown } from "../hooks";
import type { WorkshopJson } from "../types";
import { motion } from "framer-motion";
import CodingSharkLogo from "@/assets/images/Coding.png";
import Link from "next/link";

function getYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([^&?/\s]+)/,
  );
  return match?.[1] ?? null;
}

function formatEventDate(value: string | null | undefined): string {
  if (!value) return "Date TBA";
  const parsed = new Date(`${value}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return value;
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(parsed);
}

function formatEventTime(value: string | null | undefined): string {
  if (!value) return "Time TBA";
  const parsed = new Date(`1970-01-01T${value}:00`);
  if (Number.isNaN(parsed.getTime())) return value;
  return new Intl.DateTimeFormat("en-IN", {
    hour: "numeric",
    minute: "2-digit",
  }).format(parsed);
}

export function TemplateCreamWarm({ workshop }: { workshop: WorkshopJson }) {
  const [showModal, setShowModal] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [openAgendaIndex, setOpenAgendaIndex] = useState<number | null>(null);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const countdown = useCountdown(workshop.event_date, workshop.event_time);

  const media = workshop.media ?? null;
  const heroImg = media?.hero_preview ?? media?.hero_bg ?? "";
  const heroVideoImg = media?.hero_preview ?? media?.hero_bg ?? "";
  const instructorImg = media?.instructor_bg ?? media?.instructor ?? "";
  const beforeImg = media?.before ?? "";
  const afterImg = media?.after ?? "";

  const whoItems = workshop.who_should_attend_items ?? [];
  const mentorPoints =
    workshop.features_section_items?.map((item) => ({
      icon: item.emoji,
      title: item.title,
      description: item.description,
    })) ?? [];

  const openModal = useCallback(() => setShowModal(true), []);

  useEffect(() => {
    const handleScroll = () => {
      setShowStickyBar(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const proofCards = useMemo(() => {
    return (workshop.testimonials ?? []).slice(0, 3).map((t, index) => ({
      ...t,
      initials: t.name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase(),
      color:
        index % 3 === 0 ? "#fff1e6" : index % 3 === 1 ? "#e8f7ff" : "#f4ecff",
    }));
  }, [workshop.testimonials]);

  const agendaCards = useMemo(() => {
    return workshop.curriculum.map((item) => ({
      title: item.title,
      points: item.points,
    }));
  }, [workshop.curriculum]);

  const kitCards = useMemo(() => {
    return (workshop.bonus_kit_items ?? []).map((item) => ({
      title: item.title,
      oldPrice: item.price,
      image: item.image,
    }));
  }, [workshop.bonus_kit_items]);

  return (
    <>
      <div className="min-h-screen bg-[#fafaf8] font-sans antialiased text-stone-900">
        <nav className="sticky py-2 pr-2 top-0 z-40 border-b border-stone-200 bg-orange-100 shadow-xl backdrop-blur ">
          <div className="h-12 sm:h-14 md:h-14 mx-auto flex max-w-7xl justify-between">
            <Link
              href="/"
              className="relative z-10 flex items-center gap-2 group transition-transform duration-300 hover:scale-105 shrink-0">
              <Image
                src={CodingSharkLogo}
                alt="CodingShark"
                width={120}
                height={40}
                className="h-12 w-auto"
                priority
              />
            </Link>
            <div className="flex items-center gap-3">
              <div className="hidden items-center gap-2 text-xs font-medium text-stone-500 sm:flex">
                <strong className="text-stone-900">
                  {formatEventDate(workshop.event_date)}
                </strong>
                <span>·</span>
                <span>{workshop.mode}</span>
                <span>·</span>
                <span>{workshop.platform}</span>
                <span>·</span>
                <strong className="text-[#e8561a]">
                  {workshop.is_free ? "FREE" : workshop.price}
                </strong>
              </div>
              <button
                className="inline-flex items-center justify-center rounded-full bg-[#e8561a] px-4 py-2 text-xs font-extrabold text-white shadow-sm transition hover:opacity-95"
                onClick={openModal}>
                Reserve Seat {"->"}
              </button>
            </div>
          </div>
        </nav>

        <section id="hero" className="relative overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-40 bg-[radial-gradient(circle,rgba(232,86,26,0.08)_1.5px,transparent_1.5px)] [background-size:28px_28px]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute right-0 top-0 hidden h-full w-[46%] lg:block"
            style={{
              background:
                "linear-gradient(150deg, #fffaf5 0%, #fdecd8 55%, #fad4a8 100%)",
              clipPath: "polygon(9% 0,100% 0,100% 100%,0% 100%)",
            }}
          />

          <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 pb-14 pt-6 sm:px-6 sm:pb-16 sm:pt-8 lg:grid-cols-2">
            <div>
              <div className="flex flex-wrap gap-2">
                <div className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-3 py-1 text-xs font-semibold text-stone-700 shadow-sm">
                  <span className="relative inline-flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-50" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                  Live Registration Open
                </div>
                <div className="inline-flex items-center gap-2 rounded-full bg-[#e8561a] px-3 py-1 text-xs font-extrabold text-white shadow-sm">
                  {workshop.is_free
                    ? "100% FREE Workshop"
                    : `${workshop.price_original ?? ""} -> ${workshop.price}`}
                </div>
              </div>

              <h1 className="mt-6 text-3xl font-extrabold leading-tight tracking-tight text-stone-900 sm:text-4xl lg:text-5xl">
                Confused Between
                <br />
                <span className="relative inline-block text-[#e8561a]">
                  AI/ML, Data Science
                  <span
                    aria-hidden
                    className="absolute -bottom-1 left-0 h-1 w-full rounded bg-gradient-to-r from-[#e8561a] to-[#f9a825]"
                  />
                </span>
                <br />
                &amp; Web Development?
              </h1>

              <p className="mt-4 text-sm font-semibold text-stone-800 sm:text-base">
                <span className="text-red-500">
                  90% students pick the wrong tech stack.
                </span>
                <br />
                Do not be one of them.
              </p>

              <p className="mt-3 text-base font-medium text-stone-600">
                <span className="font-extrabold text-[#e8561a]">✓</span> Get
                complete career clarity in just{" "}
                <strong>{workshop.duration ?? "2 hours"}</strong>
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                <div className="inline-flex items-center gap-2 border border-red-200 bg-red-50 px-3 py-1 text-xs font-semibold text-red-600">
                  Only 50 Seats - Filling Fast
                </div>
                <div className="inline-flex items-center gap-2 border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                  <span className="relative inline-flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-50" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                  37 already registered
                </div>
              </div>

              {/* Video section - visible only on mobile */}
              <div className="mx-auto mt-6 w-full lg:hidden">
                <div className="relative">
                  <div
                    className="relative aspect-[16/9] overflow-hidden border border-stone-200 bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 shadow-sm cursor-pointer"
                    role={workshop.youtube_url ? "button" : undefined}
                    tabIndex={workshop.youtube_url ? 0 : undefined}
                    onClick={() => {
                      if (workshop.youtube_url) setShowVideo(true);
                    }}
                    onKeyDown={(e) => {
                      if (!workshop.youtube_url) return;
                      if (e.key === "Enter" || e.key === " ")
                        setShowVideo(true);
                    }}>
                    {showVideo && workshop.youtube_url ? (
                      <iframe
                        src={`https://www.youtube-nocookie.com/embed/${getYouTubeId(workshop.youtube_url)}?autoplay=1&rel=0&modestbranding=1`}
                        title={workshop.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute inset-0 h-full w-full border-0"
                      />
                    ) : heroVideoImg ? (
                      <>
                        <Image
                          src={heroVideoImg}
                          alt={workshop.title}
                          fill
                          className="object-contain"
                          sizes="100vw"
                          priority
                        />
                        {workshop.youtube_url && (
                          <>
                            <div
                              aria-hidden
                              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-black/0 to-black/0"
                            />
                            <div className="absolute inset-0 grid place-items-center">
                              <div className="grid h-12 w-12 place-items-center rounded-full bg-white/90 text-stone-900 shadow">
                                ▶
                              </div>
                            </div>
                          </>
                        )}
                      </>
                    ) : null}
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 rounded-xl border border-stone-200 bg-white/95 p-3 backdrop-blur">
                    <div className="text-[10px] font-extrabold uppercase tracking-widest text-stone-500">
                      Workshop
                    </div>
                    <div className="mt-0.5 text-xs font-extrabold leading-tight text-stone-900">
                      {workshop.title}
                    </div>
                    <div className="mt-0.5 text-[10px] font-medium text-stone-500">
                      {workshop.tagline}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-7 grid grid-cols-2 gap-3 sm:gap-4">
                {[
                  {
                    icon: "📅",
                    label: "Date",
                    value: formatEventDate(workshop.event_date),
                  },
                  {
                    icon: "⏰",
                    label: "Time",
                    value:
                      formatEventTime(workshop.event_time_from) +
                      " - " +
                      formatEventTime(workshop.event_time_to),
                  },
                  { icon: "📍", label: "Mode", value: workshop.mode },
                  {
                    icon: "💰",
                    label: "Price",
                    value: workshop.is_free ? "FREE" : workshop.price,
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-start gap-3 border border-stone-200 bg-white px-3 py-3 shadow-sm">
                    <span className="text-lg leading-none">{item.icon}</span>
                    <div>
                      <div className="text-[11px] font-extrabold uppercase tracking-widest text-stone-500">
                        {item.label}
                      </div>
                      <div className="mt-0.5 text-sm font-semibold text-stone-900">
                        {item.value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-col items-center gap-3 lg:flex-row lg:items-center">
                <button
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#e8561a] px-6 py-3 text-sm font-extrabold text-white shadow-[0_10px_26px_rgba(232,86,26,0.24)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(232,86,26,0.28)]"
                  onClick={openModal}>
                  {workshop.cta_button_text ?? "Reserve My Free Seat"} {"->"}
                </button>
                <p className="text-xs font-medium text-stone-500">
                  No fees. No credit card. Ever.
                </p>
              </div>
            </div>

            {/* Video section - visible only on desktop */}
            <div className="mx-auto hidden w-full lg:block">
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border-2 border-stone-200 bg-stone-100 shadow-xl">
                {/* Background Image */}
                {heroImg && (
                  <Image
                    src={heroImg}
                    alt={workshop.title}
                    fill
                    className="object-cover"
                    sizes="(max-width:900px) 100vw, 600px"
                    priority
                  />
                )}

                {/* Subtle Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                {/* Play Button - Only if video exists */}
                {workshop.youtube_url && !showVideo && (
                  <div
                    className="absolute inset-0 grid place-items-center cursor-pointer group"
                    onClick={() => setShowVideo(true)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ")
                        setShowVideo(true);
                    }}>
                    <div className="grid h-16 w-16 place-items-center rounded-full bg-white/95 text-stone-900 shadow-2xl transition-all group-hover:scale-110 group-hover:bg-white">
                      <span className="text-xl ml-1">▶</span>
                    </div>
                  </div>
                )}

                {/* Video Modal */}
                {showVideo && workshop.youtube_url && (
                  <div className="absolute inset-0 z-10 bg-black">
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${getYouTubeId(workshop.youtube_url)}?autoplay=1&rel=0&modestbranding=1`}
                      title={workshop.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 h-full w-full border-0"
                    />
                  </div>
                )}

                {/* Top Badges */}
                <div className="absolute left-4 top-4 rounded-full border border-stone-200 bg-white/95 backdrop-blur-sm px-3 py-1.5 text-xs font-bold text-stone-700 shadow-md">
                  {workshop.mode}
                </div>

                <div className="absolute right-4 top-4 rounded-full border border-stone-200 bg-white/95 backdrop-blur-sm px-3 py-1.5 text-xs font-bold text-stone-700 shadow-md">
                  {workshop.duration}
                </div>

                {/* Bottom Info Card */}
                <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-stone-200 bg-white/98 backdrop-blur-sm p-4 shadow-lg">
                  <div className="text-[10px] font-extrabold uppercase tracking-widest text-stone-500">
                    Workshop
                  </div>
                  <div className="mt-1 text-base font-extrabold leading-tight text-stone-900">
                    {workshop.title}
                  </div>
                  <div className="mt-1 text-xs font-medium text-stone-600">
                    {workshop.tagline}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="beforeafter" className="bg-[#f4f1eb] py-14 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <span className="inline-flex items-center gap-2  border border-orange-200 bg-orange-100/10 px-3 py-1 text-xs font-extrabold uppercase tracking-widest text-orange-700 mb-3">
                The Transformation
              </span>
              <h2 className="text-2xl font-extrabold tracking-tight text-stone-900 sm:text-3xl">
                {workshop.before_after_title_plain}{" "}
                <span className="text-[#e8561a]">
                  {workshop.before_after_title_bold}
                </span>
              </h2>
              <div className="mx-auto mt-3 h-1 w-14 rounded bg-gradient-to-r from-[#e8561a] to-[#f9a825]" />
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_auto_1fr] lg:items-stretch">
              <div className=" border border-stone-200 bg-white p-6 shadow-sm">
                <div className="inline-flex rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-extrabold uppercase tracking-widest text-red-600">
                  Before
                </div>
                {beforeImg ? (
                  <div className="relative mt-4 aspect-video overflow-hidden">
                    <Image
                      src={beforeImg}
                      alt="Before"
                      fill
                      className=""
                      sizes="(max-width:900px) 100vw, 33vw"
                    />
                  </div>
                ) : null}
                <ul className="mt-4 space-y-2 text-sm font-medium text-stone-700">
                  {workshop.before_items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-red-500">✗</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="hidden items-center justify-center lg:flex">
                <div className="text-xs font-extrabold uppercase tracking-widest text-stone-500">
                  Transform
                </div>
              </div>

              <div className=" border border-stone-200 bg-white p-6 shadow-sm">
                <div className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-extrabold uppercase tracking-widest text-emerald-700">
                  After
                </div>
                {afterImg ? (
                  <div className="relative mt-4 aspect-video overflow-hidden">
                    <Image
                      src={afterImg}
                      alt="After"
                      fill
                      className=""
                      sizes="(max-width:900px) 100vw, 33vw"
                    />
                  </div>
                ) : null}
                <ul className="mt-4 space-y-2 text-sm font-medium text-stone-700">
                  {workshop.after_items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-emerald-600">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="solution" className="bg-white py-14 sm:py-16">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2">
            <motion.div
              className="relative mx-auto w-full max-w-sm sm:max-w-md"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}>
              <div
                aria-hidden
                className="absolute -inset-6  bg-[radial-gradient(circle_at_30%_30%,rgba(232,86,26,0.18),transparent_62%)]"
              />
              <div className="relative aspect-[4/5] sm:aspect-[4/5] overflow-hidden border border-stone-200 bg-stone-100 shadow-sm rotate-2 sm:rotate-3">
                {instructorImg ? (
                  <Image
                    src={instructorImg}
                    alt={workshop.instructor_name ?? "Mentor"}
                    fill
                    className="object-cover"
                    sizes="(max-width:900px) 100vw, 420px"
                  />
                ) : null}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}>
              <span className="inline-flex items-center gap-2  border border-orange-200 bg-orange-100/10 px-3 py-1 text-xs font-extrabold uppercase tracking-widest text-orange-700 mb-1">
                Your Mentor
              </span>
              <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-stone-900 sm:text-3xl">
                Not a Workshop.
                <br />
                <span className="text-[#e8561a]">
                  A Career Clarity Session.
                </span>
              </h2>
              <div className="mt-3 h-1 w-14 rounded bg-gradient-to-r from-[#e8561a] to-[#f9a825]" />
              <p className="mt-4 text-sm font-medium leading-relaxed text-stone-600">
                Our Mentor has guided{" "}
                {workshop.about_stats[0]?.value ?? "5000+"} engineering students
                across MP with pure industry reality, honest comparisons, and a
                roadmap built for 2026 placements.
              </p>

              <div className="mt-6 space-y-3">
                {mentorPoints.map((point) => (
                  <motion.article
                    key={point.title}
                    className="flex gap-3 rounded-2xl border border-stone-200 bg-[#fafaf8] px-4 py-3 shadow-sm"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}>
                    <span className="text-lg leading-none">{point.icon}</span>
                    <div>
                      <strong className="block text-sm font-extrabold text-stone-900">
                        {point.title}
                      </strong>
                      <span className="mt-0.5 block text-xs font-medium leading-relaxed text-stone-600">
                        {point.description}
                      </span>
                    </div>
                  </motion.article>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="mx-auto mt-10 max-w-7xl px-4 sm:px-6">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                ...workshop.about_stats,
                { value: "4.9★", label: "Avg Rating" },
                { value: "100%", label: "Free, Always" },
              ]
                .slice(0, 4)
                .map((s) => (
                  <div
                    key={s.label}
                    className="rounded-2xl border border-stone-200 bg-white px-4 py-4 text-center shadow-sm">
                    <span className="block text-xl font-extrabold text-stone-900 sm:text-2xl">
                      {s.value}
                    </span>
                    <span className="mt-1 block text-xs font-bold text-stone-500">
                      {s.label}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </section>

        <section id="learn" className="bg-[#fafaf8] py-14 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <span className="inline-flex items-center gap-2  border border-orange-200 bg-orange-100/10 px-3 py-1 text-xs font-extrabold uppercase tracking-widest text-orange-700 mb-1">
                The Agenda{" "}
              </span>
              <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-stone-900 sm:text-3xl">
                What You&apos;ll Learn{" "}
                <span className="text-[#e8561a]">in 2 Hours</span>
              </h2>
              <div className="mx-auto mt-3 h-1 w-14 rounded bg-gradient-to-r from-[#e8561a] to-[#f9a825]" />
              <p className="mt-3 text-sm font-medium text-stone-600">
                No boring slides. Pure unfiltered career wisdom that most
                students take 2 years to figure out.
              </p>
            </div>

            <div className="mt-8 space-y-3">
              {agendaCards.map((lesson, idx) => (
                <motion.article
                  key={`${lesson.title}-${idx}`}
                  className="rounded-3xl border border-stone-200 bg-white shadow-sm overflow-hidden"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  viewport={{ once: true }}>
                  <button
                    onClick={() =>
                      setOpenAgendaIndex(openAgendaIndex === idx ? null : idx)
                    }
                    className="w-full flex items-center justify-between p-5 text-left hover:bg-stone-50 transition">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-extrabold text-[#e8561a]">
                        {String(idx + 1).padStart(2, "0")} -
                      </span>
                      <h3 className="text-base font-extrabold text-stone-900">
                        {lesson.title}
                      </h3>
                    </div>
                    <span className="text-stone-500 text-xl">
                      {openAgendaIndex === idx ? "−" : "+"}
                    </span>
                  </button>
                  {openAgendaIndex === idx && (
                    <div className="px-5 pb-5">
                      <ul className="list-disc space-y-1 pl-5 text-sm text-stone-600">
                        {lesson.points.map((pt, i) => (
                          <li key={i}>{pt}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="kit" className="bg-white py-14 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-[rgba(232,86,26,0.10)] px-3 py-1 text-xs font-extrabold uppercase tracking-widest text-[#e8561a]">
                🎁 Exclusive Bonus
              </span>
              <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-stone-900 sm:text-3xl">
                Free Career Starter Kit{" "}
                <span className="text-[#e8561a]">(Worth ₹4,999)</span>
              </h2>
              <div className="mx-auto mt-3 h-1 w-14 rounded bg-gradient-to-r from-[#e8561a] to-[#f9a825]" />
              <p className="mt-3 text-sm font-medium text-stone-600">
                Even if you do nothing after this workshop... this kit alone can
                change your career direction.
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {kitCards.map((item, index) => (
                <motion.article
                  key={item.title}
                  className="relative overflow-hidden border border-stone-200 bg-[#fafaf8] p-5 shadow-sm"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  viewport={{ once: true }}>
                  <span className="absolute left-4 top-4 rounded-full border border-stone-200 bg-white px-3 py-1 text-xs font-extrabold text-stone-700">
                    {item.oldPrice}
                  </span>

                  <div className="relative mt-4 h-56 w-full overflow-hidden">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover p-4"
                        sizes="220px"
                      />
                    ) : null}
                  </div>

                  <h4 className="mt-4 text-sm font-extrabold text-stone-900">
                    {item.title}
                  </h4>
                  <p className="mt-1 text-xs font-semibold text-stone-500">
                    Worth {item.oldPrice}
                  </p>
                  <p className="mt-1 text-sm font-extrabold text-emerald-700">
                    FREE ✅
                  </p>
                </motion.article>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-4 border border-stone-200 bg-[#f4f1eb] p-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[11px] font-extrabold uppercase tracking-widest text-stone-500">
                  Total Starter Kit Value
                </p>
                <div className="mt-1 flex items-baseline gap-3">
                  <span className="text-sm font-extrabold text-stone-500 line-through">
                    ₹4,999
                  </span>
                  <span className="text-xl font-extrabold text-[#e8561a]">
                    FREE 🎉
                  </span>
                </div>
              </div>
              <button
                className="inline-flex items-center justify-center rounded-full bg-orange-600 px-6 py-3 text-sm font-extrabold text-white shadow-sm transition hover:opacity-95"
                onClick={openModal}>
                Get Free Kit + Reserve Seat 🎁
              </button>
            </div>
          </div>
        </section>

        <section id="who" className="bg-[#fafaf8] py-14 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <span className="inline-flex items-center gap-2  border border-orange-200 bg-orange-100/10 px-3 py-1 text-xs font-extrabold uppercase tracking-widest text-orange-700 mb-2">
                Is This For You?
              </span>
              <h2 className="text-2xl font-extrabold tracking-tight text-stone-900 sm:text-3xl">
                Who Should <span className="text-orange-600">Attend</span>
              </h2>
              <div className="mx-auto mt-3 h-1 w-14 rounded bg-gradient-to-r from-[#e8561a] to-[#f9a825]" />
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {whoItems.map((item, index) => (
                <article
                  key={item.title}
                  className="rounded-3xl border border-stone-200 bg-white p-5 shadow-sm">
                  <span className="text-2xl">
                    {["🎓", "🧭", "🔁", "💼"][index % 4]}
                  </span>
                  <h3 className="mt-2 text-sm font-extrabold text-stone-900">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm font-medium leading-relaxed text-stone-600">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="proof" className="bg-white py-14 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <span className="block text-4xl font-extrabold leading-none tracking-tight text-[#e8561a] sm:text-5xl">
                {workshop.about_stats[0]?.value ?? "1000+"}
              </span>
              <span className="text-sm text-gray-400 font-bold">
                Students Already Guided by CodingSharks 🦈
              </span>
              <h2 className="mt-5 text-2xl font-extrabold tracking-tight text-stone-900 sm:text-3xl">
                Social Proof
              </h2>
              <div className="mx-auto mt-3 h-1 w-14 rounded bg-gradient-to-r from-[#e8561a] to-[#f9a825]" />
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {proofCards.map((t) => (
                <article
                  key={t.name}
                  className="rounded-3xl border border-stone-200 bg-[#fafaf8] p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                  <span className="block text-4xl font-black leading-none text-[rgba(232,86,26,0.18)]">
                    “
                  </span>
                  <div className="mt-2 text-xs tracking-[0.35em] text-[#f9a825]">
                    ★★★★★
                  </div>
                  <p className="mt-3 text-sm font-medium leading-relaxed text-stone-700">
                    {t.text}
                  </p>
                  <div className="mt-5 flex items-center gap-3">
                    <div
                      className="grid h-10 w-10 place-items-center rounded-full font-mono text-xs font-extrabold text-stone-900"
                      style={{ backgroundColor: t.color }}>
                      {t.initials}
                    </div>
                    <div>
                      <p className="text-sm font-extrabold text-stone-900">
                        {t.name}
                      </p>
                      <p className="text-xs font-medium text-stone-500">
                        {t.role}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="urgency"
          className="bg-stone-950 py-14 text-center text-white sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
              Seats Are Limited - Join Before Window Closes
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-sm font-medium text-white/60">
              Live format ka impact tabhi aata hai jab aap real-time attend
              karte ho.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {[
                { label: "Days", value: countdown.days },
                { label: "Hours", value: countdown.hours },
                { label: "Minutes", value: countdown.minutes },
                { label: "Seconds", value: countdown.seconds },
              ].map((i) => (
                <div
                  key={i.label}
                  className="min-w-[78px] rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
                  <span className="block font-mono text-3xl font-extrabold leading-none text-[#f9a825] sm:text-4xl">
                    {String(i.value).padStart(2, "0")}
                  </span>
                  <span className="mt-1 block text-[10px] font-bold uppercase tracking-widest text-white/60">
                    {i.label}
                  </span>
                </div>
              ))}
            </div>

            <button
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-[#e8561a] px-8 py-3 text-sm font-extrabold text-white shadow-[0_10px_26px_rgba(232,86,26,0.24)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(232,86,26,0.28)]"
              onClick={openModal}>
              Register Now {"->"}
            </button>

            <p className="mt-4 text-xs font-medium text-white/60">
              Only <strong className="text-[#e8561a]">50 seats</strong> for this
              batch.
            </p>
          </div>
        </section>

        <section id="register" className="bg-[#f4f1eb] py-14 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-[#fafaf8] px-3 py-1 text-xs font-extrabold uppercase tracking-widest text-stone-700">
                  Register Now
                </div>
                <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-stone-900 sm:text-3xl">
                  Book Your Seat
                </h2>
                <div className="mt-3 h-1 w-14 rounded bg-gradient-to-r from-[#e8561a] to-[#f9a825]" />
                <p className="mt-3 text-sm font-medium text-stone-600">
                  Fill your details and secure your seat for the live workshop.
                </p>

                <ul className="mt-5 space-y-2 text-sm font-medium text-stone-700">
                  {(
                    workshop.register_bullets ??
                    workshop.why_join_items.slice(0, 3)
                  ).map((b) => (
                    <li key={b} className="flex gap-2">
                      <span className="font-extrabold text-[#e8561a]">✓</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
                <RegistrationModal
                  workshop={workshop}
                  onClose={() => {}}
                  isEmbedded={true}
                />
              </div>
            </div>
          </div>
        </section>

        <section
          id="finalcta"
          className="relative overflow-hidden bg-gradient-to-br from-[#e8561a] to-[#f9a825] py-16 text-center text-white">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-30 bg-[radial-gradient(circle,rgba(255,255,255,0.08)_1.5px,transparent_1.5px)] [background-size:26px_26px]"
          />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mx-auto max-w-2xl">
              <h2 className="text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl lg:text-4xl">
                {workshop.final_cta_title ??
                  "Ready to stop guessing your AI/ML path?"}
              </h2>
              <p className="mx-auto mt-3 max-w-md text-sm font-medium text-white/85">
                {workshop.final_cta_subtitle ??
                  "Reserve your seat and build your next 12 months with clarity."}
              </p>
              <button
                className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-3 text-sm font-extrabold text-[#e8561a] shadow transition hover:opacity-95"
                onClick={openModal}>
                Reserve My Seat {"->"}
              </button>
              <p className="mt-4 text-xs font-medium text-white/70">
                No fees hidden. Limited seats only.
              </p>
            </div>
          </div>
        </section>

        <footer className="bg-stone-950 py-10 text-center text-white/60">
          <p className="text-xs font-medium">
            CodingSharks - Empowering Engineering Students to Build Real Careers
          </p>
          <p className="mt-2 text-[11px] font-medium text-white/60">
            © {new Date().getFullYear()} CodingSharks. All rights reserved.
          </p>
        </footer>
      </div>

      {showModal && (
        <RegistrationModal
          workshop={workshop}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}
