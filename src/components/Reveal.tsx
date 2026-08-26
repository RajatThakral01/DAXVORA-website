"use client";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  /** y offset in px — defaults to 24 */
  y?: number;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Scroll-reveal wrapper using motion/react whileInView.
 * Respects prefers-reduced-motion automatically.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 24,
  as: Tag = "div",
  className,
  style,
}: RevealProps): React.JSX.Element {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, {
    once: true,
    margin: "0px 0px -60px 0px",
  });

  const variants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : y,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.55,
        delay: shouldReduceMotion ? 0 : delay / 1000,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  // motion() cast to the right element type
  const MotionTag = motion[Tag as keyof typeof motion] as React.ComponentType<
    Record<string, unknown>
  >;

  return (
    <MotionTag
      ref={ref}
      className={className}
      style={style}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
    >
      {children}
    </MotionTag>
  );
}
