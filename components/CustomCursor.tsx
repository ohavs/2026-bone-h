"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

type CursorState = "default" | "hover" | "drag" | "view";

export default function CustomCursor() {
  const [state, setState] = useState<CursorState>("default");
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string>("");

  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);

  // Liquid spring follow
  const sx = useSpring(mx, { stiffness: 220, damping: 26, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 220, damping: 26, mass: 0.6 });

  // Outer ring lags further for the "ink in water" feel
  const rx = useSpring(mx, { stiffness: 80, damping: 18, mass: 1.2 });
  const ry = useSpring(my, { stiffness: 80, damping: 18, mass: 1.2 });


  useEffect(() => {
    const canHover =
      window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!canHover || reduceMotion) return;

    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");

    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest(
        "a, button, [role='button'], input, textarea, [data-cursor]",
      ) as HTMLElement | null;

      if (interactive) {
        const dataCursor = interactive.getAttribute("data-cursor");
        const dataLabel = interactive.getAttribute("data-cursor-label") ?? "";
        setLabel(dataLabel);
        if (dataCursor === "view") setState("view");
        else if (dataCursor === "drag") setState("drag");
        else setState("hover");
      } else {
        setState("default");
        setLabel("");
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [mx, my]);

  if (!enabled) return null;

  const isView = state === "view";
  const isHover = state === "hover";

  return (
    <>
      {/* Outer liquid ring */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[100]"
        style={{
          x: rx,
          y: ry,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          className="rounded-full border"
          animate={{
            width: isView ? 116 : isHover ? 64 : 36,
            height: isView ? 116 : isHover ? 64 : 36,
            borderColor: isHover
              ? "rgba(61,111,106,0.65)"
              : "rgba(61,111,106,0.35)",
            backgroundColor: isView
              ? "rgba(61,111,106,0.85)"
              : "rgba(61,111,106,0)",
          }}
          transition={{
            type: "spring",
            stiffness: 180,
            damping: 22,
            mass: 0.8,
          }}
          style={{
            borderWidth: isHover ? 1 : 1,
          }}
        >
          {isView && (
            <span
              className="flex h-full w-full items-center justify-center text-[10px] uppercase tracking-[0.25em] text-bone-white"
              style={{ letterSpacing: "0.25em" }}
            >
              {label || "view"}
            </span>
          )}
        </motion.div>
      </motion.div>

      {/* Inner ink dot */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[101] mix-blend-multiply"
        style={{
          x: sx,
          y: sy,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          className="rounded-full bg-bone-deep"
          animate={{
            width: isView ? 0 : isHover ? 4 : 6,
            height: isView ? 0 : isHover ? 4 : 6,
            opacity: isView ? 0 : 1,
          }}
          transition={{ type: "spring", stiffness: 260, damping: 24 }}
        />
      </motion.div>
    </>
  );
}
