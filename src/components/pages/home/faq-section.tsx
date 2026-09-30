"use client";

import Image from "next/image";
import { useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { Plus } from "lucide-react";

import home from "@/data/home.json";
import { Container } from "@/components/layout/container";
import { openLeadModal } from "@/components/common/lead-modal";
import { useSectionMotion } from "./use-section-motion";

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary";

const HIGHLIGHT = "before joining";

function splitHeadline(text: string) {
  const at = text.lastIndexOf(HIGHLIGHT);
  if (at < 0) return { before: text, mark: "", after: "" };
  return { before: text.slice(0, at), mark: HIGHLIGHT, after: text.slice(at + HIGHLIGHT.length) };
}

export function FaqSection() {
  const { faq } = home;
  const title = splitHeadline(faq.headline);
  const count = faq.items.length;
  const sectionRef = useRef<HTMLElement>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [open, setOpen] = useState(0);

  useSectionMotion(sectionRef, ({ gsap }) => {
    gsap.from("[data-faq-head] > *", {
      opacity: 0,
      y: 24,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.09,
      scrollTrigger: { trigger: "[data-faq-head]", start: "top 82%", once: true },
    });

    gsap.fromTo(
      "[data-faq-photo]",
      { scale: 1.25 },
      {
        scale: 1,
        ease: "none",
        scrollTrigger: { trigger: "[data-faq-frame]", start: "top bottom", end: "center 45%", scrub: 0.6 },
      },
    );

    gsap.from("[data-faq-row]", {
      opacity: 0,
      y: 28,
      duration: 0.7,
      ease: "power3.out",
      stagger: 0.07,
      scrollTrigger: { trigger: "[data-faq-list]", start: "top 84%", once: true },
    });
  });

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const target =
      event.key === "ArrowDown"
        ? (index + 1) % count
        : event.key === "ArrowUp"
          ? (index - 1 + count) % count
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? count - 1
              : -1;
    if (target < 0) return;
    event.preventDefault();
    buttonRefs.current[target]?.focus();
  };

  return (
    <section ref={sectionRef} className="bg-cs-paper py-16 text-cs-on-paper sm:py-20 lg:py-24">
      <Container>
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <div data-faq-head className="lg:sticky lg:top-28">
            <h2 className="font-heading text-[32px] font-medium leading-[1.05] tracking-[-0.03em] text-balance sm:text-[44px] lg:text-[56px]">
              {title.before}
              {title.mark ? <span className="text-primary">{title.mark}</span> : null}
              {title.after}
            </h2>
            <p className="mt-4 max-w-[420px] text-[15px] leading-relaxed text-cs-on-paper/72 sm:text-[17px]">
              {faq.subline}
            </p>
            <div className="mt-7">
              <button
                type="button"
                onClick={() => openLeadModal("home-faq")}
                className={`inline-flex min-h-11 items-center justify-center rounded-full border border-cs-on-paper/28 px-5 py-2 text-left text-sm font-medium text-cs-on-paper transition-colors duration-150 hover:border-cs-on-paper hover:bg-cs-on-paper hover:text-cs-paper ${focusRing}`}>
                Still have a question? Talk to us
              </button>
            </div>
            <div
              data-faq-frame
              className="relative mt-10 aspect-16/10 w-full overflow-hidden rounded-[20px] lg:aspect-4/5 lg:h-[38vh] lg:max-h-[400px] lg:w-auto">
              <div data-faq-photo className="absolute inset-0 will-change-transform">
                <Image
                  src="/images/sections/group-macbook.webp"
                  alt="Four smiling people around a MacBook"
                  fill
                  sizes="(min-width: 1024px) 320px, calc(100vw - 32px)"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <MotionConfig reducedMotion="user">
            <div data-faq-list className="border-t border-cs-on-paper/16">
              {faq.items.map((item, i) => {
                const isOpen = open === i;
                const buttonId = `home-faq-question-${i}`;
                const panelId = `home-faq-answer-${i}`;
                return (
                  <div key={item.question} data-faq-row className="relative border-b border-cs-on-paper/16 pl-5 sm:pl-6">
                    <motion.span
                      aria-hidden="true"
                      initial={false}
                      animate={{ scaleY: isOpen ? 1 : 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      style={{ originY: 0 }}
                      className="absolute top-6 bottom-6 left-0 w-[3px] rounded-full bg-primary sm:top-7 sm:bottom-7"
                    />
                    <h3>
                      <button
                        ref={(el) => {
                          buttonRefs.current[i] = el;
                        }}
                        type="button"
                        id={buttonId}
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() => setOpen(isOpen ? -1 : i)}
                        onKeyDown={(event) => onKeyDown(event, i)}
                        className={`group flex w-full items-start justify-between gap-6 py-6 text-left sm:py-7 ${focusRing}`}>
                        <span
                          className={`font-heading text-[18px] font-medium leading-[1.3] tracking-[-0.01em] transition-[translate,color] duration-200 ease-out motion-safe:pointer-fine:group-hover:translate-x-1.5 sm:text-[21px] ${isOpen ? "text-primary" : "text-cs-on-paper/84"}`}>
                          {item.question}
                        </span>
                        <span
                          aria-hidden="true"
                          className={`mt-0.5 grid size-8 shrink-0 place-items-center rounded-full border transition-colors duration-200 ${isOpen ? "border-primary bg-primary text-white" : "border-cs-on-paper/28 text-cs-on-paper"}`}>
                          <Plus
                            className={`size-4 transition-transform duration-200 ease-out motion-reduce:transition-none ${isOpen ? "rotate-45" : ""}`}
                          />
                        </span>
                      </button>
                    </h3>
                    <div id={panelId}>
                      <AnimatePresence initial={false}>
                        {isOpen ? (
                          <motion.div
                            key="answer"
                            role="region"
                            aria-labelledby={buttonId}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                            className="pr-10 pb-7 sm:pr-14">
                            <p className="max-w-[640px] text-[15px] leading-relaxed text-cs-on-paper/76 sm:text-base">
                              {item.answer}
                            </p>
                          </motion.div>
                        ) : null}
                      </AnimatePresence>
                    </div>
                  </div>
                );
              })}
            </div>
          </MotionConfig>
        </div>
      </Container>
    </section>
  );
}
