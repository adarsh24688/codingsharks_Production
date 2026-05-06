"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import codingLogo from "@/assets/images/Coding_white.png";
import site from "@/data/site.json";
import { fetchCrmCourses, submitLeadToCrm } from "@/lib/crm-api";
import {
  sanitizeIndianMobile,
  validateIndianMobile,
  validateEmail,
  validateName,
} from "@/lib/validators";

type Props = {
  promptContent: string;
};

type FormState = {
  name: string;
  email: string;
  phone: string;
};

const SOURCE_FILE_URL = "/insta/codingsharks.html";
const PROMPT_FILE_URL = "/insta/CodingSharks_MasterPrompt.md";

export function InstaPromptSourcePage({ promptContent }: Props) {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [unlocked, setUnlocked] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const welcomeCourseId = "8a1c414f-c652-48a7-98a7-bb9f87d04690";

  const promptStats = useMemo(() => {
    const lines = promptContent.split("\n").length;
    const chars = promptContent.length;
    return { lines, chars };
  }, [promptContent]);

  const onCopyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(promptContent);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSubmitError(null);

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

    const mobile = sanitizeIndianMobile(form.phone);

    const result = await submitLeadToCrm({
      name: form.name.trim(),
      email: form.email.trim(),
      mobile,
      courseInterest: welcomeCourseId,
      notes:
        "Source code request from Insta prompt page. Asset: codingsharks.html. Campaign: Instagram. Course tag: Welcome",
    });

    setSubmitting(false);

    if (!result.success) {
      setSubmitError(result.error ?? "Something went wrong. Please try again.");
      return;
    }

    setUnlocked(true);
    setForm({ name: "", email: "", phone: "" });

    if (typeof window !== "undefined" && typeof window.fbq === "function") {
      window.fbq("trackCustom", "SourceCodeUnlocked");
    }
  };

  return (
    <main className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(255,107,44,0.20),transparent_35%),radial-gradient(circle_at_80%_20%,rgba(56,189,248,0.14),transparent_35%),linear-gradient(to_bottom,#000000,#05070d_45%,#090c12)]" />
        <div className="absolute inset-x-0 top-0 h-105 bg-[linear-gradient(to_bottom,rgba(255,107,44,0.08),transparent)]" />
      </div>

      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0a0a0a]/90 backdrop-blur">
        <div className="mx-auto flex h-18 w-full max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src={codingLogo}
              alt={site.brand.name}
              width={132}
              height={44}
              className="h-12 w-auto"
              priority
            />
          </Link>

          <a
            href="#unlock"
            className="inline-flex h-11 items-center border border-primary/40 bg-primary/85 px-4 text-sm font-semibold text-white transition hover:bg-primary">
            Get Source Code
          </a>
        </div>
      </header>

      <section className="mx-auto w-full max-w-7xl px-4 pt-14 pb-10 text-center sm:pt-20 sm:pb-14">
        <div className="mx-auto max-w-5xl">
          <p className="inline-flex items-center gap-2 border border-primary/35 bg-primary/10 px-3 py-1 text-[11px] font-semibold tracking-[0.14em] text-primary uppercase">
            Instagram Project Drop
          </p>

          <h1 className="mt-5 text-4xl leading-tight font-heading font-bold text-white sm:text-6xl">
            Prompt + Source Code.
            <span className="block text-primary italic">
              Built for makers who ship.
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-white/70 sm:text-lg">
            Prompt free mein dekh lo, copy kar lo, remix kar lo. Source code ke
            liye form fill karo and instantly unlock karo. Isi tarah ke aur
            project systems ke liye CodingSharks se connect karo.
          </p>

          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => {
                setShowPrompt(true);
                window.setTimeout(() => {
                  document.getElementById("prompt")?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }, 30);
              }}
              className="inline-flex items-center bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary/90">
              View Prompt
            </button>
            <a
              href="#unlock"
              className="inline-flex items-center border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-primary/50 hover:bg-primary/10">
              Get Source Code
            </a>
          </div>
        </div>
      </section>

      {showPrompt ? (
        <section
          id="prompt"
          className="mx-auto w-full max-w-7xl px-4 pb-8 text-center sm:pb-12">
          <div className="border border-white/10 bg-black/40 p-4 backdrop-blur sm:p-6">
            <div className="flex flex-col gap-3 border-b border-white/10 pb-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-left">
                <h2 className="text-2xl font-bold text-white">
                  CodingSharks Master Prompt
                </h2>
                <p className="mt-1 text-sm text-white/60">
                  {promptStats.lines} lines • {promptStats.chars} chars
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={onCopyPrompt}
                  className="inline-flex items-center border border-white/20 bg-white/5 px-3 py-2 text-xs font-semibold text-white transition hover:border-primary/50 hover:bg-primary/10">
                  {copied ? "Copied" : "Copy Prompt"}
                </button>
                <a
                  href={PROMPT_FILE_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center border border-primary/50 bg-primary/15 px-3 py-2 text-xs font-semibold text-primary transition hover:bg-primary/25">
                  Open Raw .md
                </a>
              </div>
            </div>

            <pre className="mt-4 max-h-140 overflow-auto border border-white/10 bg-[#03040a] p-4 text-left text-xs leading-relaxed text-white/80 sm:text-sm">
              {promptContent}
            </pre>
          </div>
        </section>
      ) : null}

      <section
        id="unlock"
        className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-6 px-4 pb-14 sm:grid-cols-[1.1fr_1fr] sm:pb-18">
        <div className="border border-primary/30 bg-linear-to-br from-primary/15 via-black/45 to-black/70 p-6">
          <p className="text-xs font-bold tracking-[0.14em] text-primary uppercase">
            Source Access
          </p>
          <h3 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
            Unlock Full HTML Source Code
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-white/70">
            Form submit karo and direct source file ka access mil jayega. Is
            request se lead CRM me push hogi so our team can share more
            creator-ready drops with you.
          </p>

          <div className="mt-5 border border-white/10 bg-black/35 p-4">
            <p className="text-sm text-white/75">Included:</p>
            <ul className="mt-2 space-y-2 text-sm text-white/70">
              <li>Single file immersive HTML experience</li>
              <li>Gesture interaction + camera integration</li>
              <li>Ready-to-run base for your own branded remix</li>
            </ul>
          </div>
        </div>

        <div className="border border-white/10 bg-white/5 p-6 backdrop-blur">
          {!unlocked ? (
            <form onSubmit={onSubmit} className="space-y-4">
              <h4 className="text-xl font-bold text-white">Get Source Code</h4>

              <div className="space-y-1">
                <label
                  htmlFor="name"
                  className="text-xs font-semibold tracking-wider text-white/70 uppercase">
                  Full Name
                </label>
                <input
                  id="name"
                  required
                  value={form.name}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="h-11 w-full border border-white/15 bg-black/40 px-3 text-sm text-white outline-none transition focus:border-primary/70"
                  placeholder="Your name"
                />
                {fieldErrors.name && (
                  <p className="text-xs text-red-400 mt-1">{fieldErrors.name}</p>
                )}
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="email"
                  className="text-xs font-semibold tracking-wider text-white/70 uppercase">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, email: e.target.value }))
                  }
                  className="h-11 w-full border border-white/15 bg-black/40 px-3 text-sm text-white outline-none transition focus:border-primary/70"
                  placeholder="you@example.com"
                />
                {fieldErrors.email && (
                  <p className="text-xs text-red-400 mt-1">{fieldErrors.email}</p>
                )}
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="phone"
                  className="text-xs font-semibold tracking-wider text-white/70 uppercase">
                  Phone
                </label>
                <input
                  id="phone"
                  type="tel"
                  inputMode="numeric"
                  maxLength={10}
                  required
                  value={form.phone}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      phone: e.target.value.replace(/\D/g, "").slice(0, 10),
                    }))
                  }
                  className="h-11 w-full border border-white/15 bg-black/40 px-3 text-sm text-white outline-none transition focus:border-primary/70"
                  placeholder="10 digit mobile"
                />
                {fieldErrors.phone && (
                  <p className="text-xs text-red-400 mt-1">{fieldErrors.phone}</p>
                )}
              </div>

              {submitError ? (
                <p className="text-sm text-red-400">{submitError}</p>
              ) : null}

              <button
                type="submit"
                disabled={submitting}
                className="inline-flex h-11 w-full items-center justify-center bg-primary px-4 text-sm font-semibold text-white transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70">
                {submitting ? "Unlocking..." : "Unlock Source Code"}
              </button>

              <p className="text-xs leading-relaxed text-white/50">
                By submitting, you agree to receive project updates and coding
                opportunities from CodingSharks.
              </p>
            </form>
          ) : (
            <div className="space-y-4">
              <h4 className="text-xl font-bold text-white">Source Unlocked</h4>
              <p className="text-sm text-white/70">
                Great. Your request is captured. Download the source file below.
              </p>
              <a
                href={SOURCE_FILE_URL}
                download
                className="inline-flex h-11 w-full items-center justify-center bg-primary px-4 text-sm font-semibold text-white transition hover:bg-primary/90">
                Download Source Code
              </a>
              <a
                href={SOURCE_FILE_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 w-full items-center justify-center border border-white/20 bg-white/5 px-4 text-sm font-semibold text-white transition hover:border-primary/50 hover:bg-primary/10">
                Open in Browser
              </a>
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-20">
        <div className="grid gap-4 sm:grid-cols-3">
          <Link
            href="/book-demo"
            className="group border border-white/10 bg-white/5 p-5 transition hover:-translate-y-0.5 hover:border-primary/50 hover:bg-primary/10">
            <p className="text-xs font-semibold tracking-[0.12em] text-primary uppercase">
              CTA 01
            </p>
            <h5 className="mt-2 text-xl font-bold text-white">
              Book Free Strategy Call
            </h5>
            <p className="mt-2 text-sm text-white/65">
              Get a personal roadmap for AI, full stack, or placements in one
              focused session.
            </p>
          </Link>

          <Link
            href="/courses"
            className="group border border-white/10 bg-white/5 p-5 transition hover:-translate-y-0.5 hover:border-primary/50 hover:bg-primary/10">
            <p className="text-xs font-semibold tracking-[0.12em] text-primary uppercase">
              CTA 02
            </p>
            <h5 className="mt-2 text-xl font-bold text-white">
              Explore Programs
            </h5>
            <p className="mt-2 text-sm text-white/65">
              Job-focused tracks with mentorship, portfolio projects, and
              placement support.
            </p>
          </Link>

          <Link
            href="/contact"
            className="group border border-white/10 bg-white/5 p-5 transition hover:-translate-y-0.5 hover:border-primary/50 hover:bg-primary/10">
            <p className="text-xs font-semibold tracking-[0.12em] text-primary uppercase">
              CTA 03
            </p>
            <h5 className="mt-2 text-xl font-bold text-white">
              Join The Community
            </h5>
            <p className="mt-2 text-sm text-white/65">
              Want more drops like this? Connect with CodingSharks and get the
              next release first.
            </p>
          </Link>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-[#0a0a0a]/90 pb-16">
        <div className="mx-auto w-full max-w-7xl px-4 pt-10 sm:px-6 sm:pt-12">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            <div className="space-y-4">
              <Image
                src={codingLogo}
                alt={site.brand.name}
                width={136}
                height={44}
                className="h-12 w-auto"
              />
              <p className="max-w-xl text-sm leading-relaxed text-white/60">
                {site.brand.description}
              </p>
            </div>

            <div className="space-y-3 sm:justify-self-end sm:text-right">
              <p className="text-[11px] font-semibold tracking-[0.14em] text-white/35 uppercase">
                Contact
              </p>
              <a
                href={`tel:${site.contact.phone}`}
                className="block text-base font-semibold text-primary">
                {site.contact.phone}
              </a>
              <a
                href={`mailto:${site.contact.email}`}
                className="block text-sm text-white/70">
                {site.contact.email}
              </a>
              <p className="text-sm leading-relaxed text-white/55">
                {site.address.line1}, {site.address.city}, {site.address.region}
              </p>
            </div>
          </div>

          <div className="mt-8 border-t border-white/10 pt-4 text-xs text-white/35">
            © {new Date().getFullYear()} {site.brand.name}. Built for creators.
          </div>
        </div>
      </footer>
    </main>
  );
}
