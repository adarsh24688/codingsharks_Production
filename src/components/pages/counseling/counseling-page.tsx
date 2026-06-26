import Image from "next/image";
import Link from "next/link";

import codingLogo from "@/assets/images/Coding_white.png";
import site from "@/data/site.json";

import { CounselingBenefits } from "./counseling-benefits";
import { CounselingCta } from "./counseling-cta";
import { CounselingDoubtsTicker } from "./counseling-doubts-ticker";
import { CounselingFaq } from "./counseling-faq";
import { CounselingHero } from "./counseling-hero";
import { CounselingSteps } from "./counseling-steps";
import { CounselingTestimonials } from "./counseling-testimonials";

type CounselingData = {
  hero: {
    badge: string;
    headline: string;
    subheadline: string;
    description: string;
    cyclingWords: string[];
    stats: { value: string; label: string }[];
  };
  doubts: string[];
  whatYouGet: { icon: string; title: string; desc: string }[];
  howItWorks: { step: string; title: string; desc: string }[];
  testimonials: { name: string; college: string; quote: string; outcome: string }[];
  faq: { q: string; a: string }[];
  cta: { headline: string; subtext: string; urgency: string; doubtOptions: string[] };
};

type Props = { data: CounselingData };

function DoubtsStatement({ doubts }: { doubts: string[] }) {
  return (
    <section className="w-full border-y border-white/8 py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-8 lg:px-16">
        {/* Header */}
        <div className="mb-12">
          <p className="text-xs font-black tracking-[0.22em] text-primary uppercase">
            We Hear This Every Day
          </p>
          <h2
            className="mt-3 font-heading font-black leading-[0.9] tracking-tight text-white"
            style={{ fontSize: "clamp(40px, 6vw, 72px)" }}>
            Sound<br />
            <span className="text-primary/65">Familiar?</span>
          </h2>
        </div>

        {/* Doubts as bold quoted rows */}
        <div className="divide-y divide-white/6">
          {doubts.map((doubt, i) => (
            <div
              key={doubt}
              className="group flex items-center gap-5 py-4 transition hover:bg-white/2 sm:py-5">
              <span className="w-8 shrink-0 text-right font-heading text-sm font-black text-primary/25 transition-colors group-hover:text-primary/50">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="flex-1 text-base font-medium text-white/55 transition-colors group-hover:text-white/80 sm:text-lg">
                &ldquo;{doubt}&rdquo;
              </p>
              <span className="shrink-0 text-xs font-bold text-primary/0 transition-colors group-hover:text-primary/70">
                ✓ Answered
              </span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10">
          <a
            href="#book"
            className="inline-flex h-12 items-center border border-primary/40 bg-primary/8 px-8 text-sm font-bold text-primary transition hover:bg-primary hover:text-white">
            Get Every Doubt Answered — Free →
          </a>
        </div>
      </div>
    </section>
  );
}

export function CounselingPage({ data }: Props) {
  return (
    <main className="relative overflow-hidden">
      {/* Global bg */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-black">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_10%_5%,rgba(255,107,44,0.10),transparent_45%)]" />
      </div>

      {/* Sticky header */}
      <header className="sticky top-0 z-40 border-b border-white/8 bg-black/92 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src={codingLogo}
              alt={site.brand.name}
              width={120}
              height={40}
              className="h-10 w-auto"
              priority
            />
          </Link>
          <div className="flex items-center gap-4">
            <span className="hidden text-xs font-semibold text-white/50 sm:block">
              100% Free · No Pitch
            </span>
            <a
              href="#book"
              className="inline-flex h-10 items-center bg-primary px-5 text-sm font-bold text-white transition hover:bg-primary/90">
              Book Free Session
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <CounselingHero data={data.hero} />

      {/* Doubts ticker */}
      <CounselingDoubtsTicker doubts={data.doubts} />

      {/* Doubts statement list */}
      <DoubtsStatement doubts={data.doubts} />

      {/* Benefits — numbered rows */}
      <CounselingBenefits benefits={data.whatYouGet} />

      {/* How it works — orange full bleed */}
      <CounselingSteps steps={data.howItWorks} />

      {/* Testimonials */}
      <CounselingTestimonials testimonials={data.testimonials} />

      {/* FAQ */}
      <div className="bg-[#050507]">
        <CounselingFaq faq={data.faq} />
      </div>

      {/* CTA */}
      <CounselingCta data={data.cta} />

      {/* Footer */}
      <footer className="border-t border-white/8 bg-black pb-16">
        <div className="mx-auto w-full max-w-5xl px-4 pt-10 sm:px-8 sm:pt-12 lg:px-16">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            <div className="space-y-3">
              <Image
                src={codingLogo}
                alt={site.brand.name}
                width={120}
                height={40}
                className="h-10 w-auto"
              />
              <p className="max-w-sm text-sm leading-relaxed text-white/50">
                {site.brand.description}
              </p>
            </div>
            <div className="space-y-2 sm:justify-self-end sm:text-right">
              <p className="text-[10px] font-black tracking-[0.2em] text-white/40 uppercase">
                Contact
              </p>
              <a href={`tel:${site.contact.phone}`} className="block text-base font-bold text-primary">
                {site.contact.phone}
              </a>
              <a href={`mailto:${site.contact.email}`} className="block text-sm text-white/50">
                {site.contact.email}
              </a>
              <p className="text-sm text-white/50">
                {site.address.city}, {site.address.region}
              </p>
            </div>
          </div>
          <div className="mt-8 border-t border-white/8 pt-4 text-xs text-white/40">
            © {new Date().getFullYear()} {site.brand.name}. One call. Lifetime clarity.
          </div>
        </div>
      </footer>
    </main>
  );
}
