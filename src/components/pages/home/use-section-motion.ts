"use client";

import { useEffect, useEffectEvent, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export type SectionMotion = {
  gsap: typeof gsap;
  ScrollTrigger: typeof ScrollTrigger;
  root: HTMLElement;
  finePointer: boolean;
};

const settleTriggers = () => {
  for (const trigger of ScrollTrigger.getAll().slice()) {
    if (!trigger.end) trigger.refresh();
  }
};

export function useSectionMotion(ref: RefObject<HTMLElement | null>, build: (motion: SectionMotion) => void) {
  const onBuild = useEffectEvent(build);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    let ctx = gsap.context(() => {}, root);
    let frame = 0;
    const run = () => ctx.add(() => onBuild({ gsap, ScrollTrigger, root, finePointer }));

    try {
      run();
      settleTriggers();
    } catch {
      ctx.revert();
      ctx = gsap.context(() => {}, root);
      frame = window.requestAnimationFrame(() => {
        settleTriggers();
        try {
          run();
          settleTriggers();
        } catch {
          ctx.revert();
        }
        ScrollTrigger.refresh();
      });
    }

    return () => {
      window.cancelAnimationFrame(frame);
      ctx.revert();
    };
  }, [ref]);
}
