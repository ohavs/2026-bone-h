"use client";

import { useEffect, useState } from "react";

/**
 * Returns true after the component has mounted on the client.
 * Used to prevent Framer Motion `initial` prop from rendering
 * server-side (which causes hydration mismatches).
 */
export function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return mounted;
}
