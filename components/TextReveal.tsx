"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

type Props = {
  text: string;
  className?: string;
  charClassName?: string;
  delay?: number;
  staggerChildren?: number;
  asWord?: boolean;
  once?: boolean;
  inView?: boolean;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  children?: ReactNode;
};

/**
 * Splits a string into characters (or words) and reveals them with a slow,
 * organic "growing" entrance: y-offset + slight scale + opacity.
 */
export default function TextReveal({
  text,
  className = "",
  charClassName = "",
  delay = 0,
  staggerChildren = 0.035,
  asWord = false,
  once = true,
  inView = true,
  as = "span",
}: Props) {
  const reduce = useReducedMotion();
  const Tag = motion[as] as typeof motion.span;

  const tokens = asWord ? text.split(" ") : Array.from(text);

  const container = {
    hidden: {},
    show: {
      transition: {
        delayChildren: delay,
        staggerChildren: reduce ? 0 : staggerChildren,
      },
    },
  };

  const child = reduce
    ? {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { duration: 0.2 } },
      }
    : {
        hidden: {
          opacity: 0,
          y: "0.6em",
          scale: 0.92,
          filter: "blur(8px)",
        },
        show: {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          transition: {
            duration: 1.4,
            ease: [0.16, 1, 0.3, 1] as const,
          },
        },
      };

  return (
    <Tag
      className={className}
      variants={container}
      initial="hidden"
      whileInView={inView ? "show" : undefined}
      animate={inView ? undefined : "show"}
      viewport={{ once, margin: "-10% 0px -10% 0px" }}
      aria-label={text}
    >
      {tokens.map((t, i) => (
        <motion.span
          key={i}
          variants={child}
          className={`char inline-block ${charClassName}`}
          style={{ whiteSpace: t === " " ? "pre" : "normal" }}
          aria-hidden
        >
          {asWord ? t + (i < tokens.length - 1 ? " " : "") : t}
        </motion.span>
      ))}
    </Tag>
  );
}
