"use client";

import { motion, useReducedMotion, useInView } from "framer-motion";
import { ElementType, useRef } from "react";
import { useMounted } from "@/lib/hooks";

type Props = {
  text: string;
  className?: string;
  delay?: number;
  staggerChildren?: number;
  asWord?: boolean;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
};

/**
 * SSR-safe text reveal. On server and initial client render, outputs
 * plain text (no motion props, no inline styles). After client mount,
 * upgrades to animated character/word reveal.
 *
 * Uses a single IntersectionObserver per component (via useInView on the
 * container) instead of one per character/word token.
 */
export default function TextReveal({
  text,
  className = "",
  delay = 0,
  staggerChildren = 0.04,
  asWord = false,
  as = "span",
}: Props) {
  const mounted = useMounted();
  const reduce = useReducedMotion();
  const containerRef = useRef<HTMLElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-10% 0px -10% 0px" });

  const Tag = as as any;

  // SSR + first client render: plain text — no Framer Motion
  if (!mounted || reduce) {
    return (
      <Tag className={className} aria-label={text}>
        {text}
      </Tag>
    );
  }

  const tokens = asWord ? text.split(" ") : Array.from(text);

  return (
    <Tag ref={containerRef} className={className} aria-label={text}>
      {tokens.map((t, i) => {
        const isSpace = t === " ";
        return (
          <motion.span
            key={i}
            aria-hidden
            className="inline-block"
            style={{ whiteSpace: isSpace ? "pre" : "normal" }}
            initial={{ opacity: 0, y: "0.5em" }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{
              delay: delay + i * staggerChildren,
              duration: 1,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {asWord ? t + (i < tokens.length - 1 ? " " : "") : t}
          </motion.span>
        );
      })}
    </Tag>
  );
}
