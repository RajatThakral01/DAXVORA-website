"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";

export default function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  as?: keyof React.JSX.IntrinsicElements;
}): React.JSX.Element {
  const ref = useRef<HTMLElement>(null);
  const [phase, setPhase] = useState<"idle" | "hidden" | "revealed">("idle");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPhase("revealed");
          io.disconnect();
        } else {
          setPhase("hidden");
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const className =
    phase === "idle"
      ? "reveal-item"
      : phase === "hidden"
        ? "reveal-item will-reveal"
        : "reveal-item is-revealed";

  const style = phase === "revealed" ? { transitionDelay: `${delay}ms` } : undefined;

  const AnyTag = Tag as unknown as (props: Record<string, unknown>) => React.JSX.Element;
  return (
    <AnyTag ref={ref} className={className} style={style}>
      {children}
    </AnyTag>
  );
}
