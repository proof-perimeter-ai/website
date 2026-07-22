"use client";

import { useEffect, useRef, useState } from "react";

type Testimonial = {
  quote: string;
  attribution: string;
};

const testimonials: Testimonial[] = [
  {
    quote:
      "We tested foundation models, and newer vendors, and evaluated options on accuracy, compliance and the user experience. Proof Perimeter was the only one that could meet our unique requirements, with the tooling we needed to scale.",
    attribution: "Chief Compliance Officer, #1 UK Home Mortgage Provider",
  },
  {
    quote:
      "Proof Perimeter is the best OCR tool we've used so far. It removed the need for us to train and maintain custom models, which saved us a ton of time.",
    attribution: "Engineering Leader, Top 5 EU Digital Bank",
  },
  {
    quote:
      "With Proof Perimeter, we found what we were looking for: high accuracy, fast performance, and zero data egress. Integration took less than a week, and we were processing live customer documents by the end of it.",
    attribution: "CEO, Insurance Tech",
  },
];

const AUTO_ADVANCE_MS = 9000;
const PAUSE_MS = 10000;
const FADE_MS = 250;

export function TestimonialCarousel() {
  const [active, setActive] = useState(0);
  const [fading, setFading] = useState(false);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia("(prefers-reduced-motion: reduce)").matches : false,
  );

  const activeRef = useRef(active);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pauseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fadeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (paused) return;
    intervalRef.current = setInterval(() => {
      goTo((activeRef.current + 1) % testimonials.length);
    }, AUTO_ADVANCE_MS);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused]);

  useEffect(() => {
    return () => {
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
      if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current);
    };
  }, []);

  function goTo(nextIndex: number) {
    if (nextIndex === activeRef.current) return;
    if (reducedMotion) {
      setActive(nextIndex);
      return;
    }
    setFading(true);
    if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current);
    fadeTimeoutRef.current = setTimeout(() => {
      setActive(nextIndex);
      setFading(false);
    }, FADE_MS);
  }

  function registerInteraction() {
    setPaused(true);
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = setTimeout(() => setPaused(false), PAUSE_MS);
  }

  function onDotKeyDown(e: React.KeyboardEvent<HTMLButtonElement>, i: number) {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = (i + (e.key === "ArrowRight" ? 1 : testimonials.length - 1)) % testimonials.length;
    goTo(next);
    registerInteraction();
    (e.currentTarget.parentElement?.children[next] as HTMLButtonElement | undefined)?.focus();
  }

  const current = testimonials[active];

  return (
    <div
      className="relative mx-auto flex min-h-[320px] max-w-[760px] flex-col items-center justify-center rounded-md border border-line bg-panel p-9 text-center transition-colors duration-200 hover:border-signal/40 hover:shadow-[0_16px_40px_-24px_rgba(20,70,124,0.35)] sm:p-12"
      onMouseEnter={registerInteraction}
      onClick={registerInteraction}
    >
      <div
        role="tabpanel"
        aria-live={paused ? "polite" : "off"}
        className={`transition-opacity duration-300 ${fading ? "opacity-0" : "opacity-100"}`}
      >
        <blockquote className="text-[19px] font-medium leading-[1.55] tracking-[-0.01em] text-ink sm:text-[21px]">
          &ldquo;{current.quote}&rdquo;
        </blockquote>
        <p className="mt-6 font-mono text-[12.5px] tracking-[0.08em] text-signal uppercase">{current.attribution}</p>
      </div>

      <div role="tablist" aria-label="Testimonials" className="mt-8 flex justify-center gap-2.5">
        {testimonials.map((t, i) => (
          <button
            key={t.attribution}
            role="tab"
            aria-selected={i === active}
            aria-label={`Testimonial ${i + 1} of ${testimonials.length}`}
            onClick={(e) => {
              e.stopPropagation();
              goTo(i);
              registerInteraction();
            }}
            onKeyDown={(e) => onDotKeyDown(e, i)}
            className={`h-2.5 rounded-full transition-all duration-200 ${
              i === active ? "w-6 bg-signal" : "w-2.5 bg-line-2 hover:bg-signal/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
