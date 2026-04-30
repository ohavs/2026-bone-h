import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Ocean-inspired palette derived from the brief
        bone: {
          // SW 7007 Ceiling Bright White
          white: "#F7F5EE",
          // SW 6080 Utterly Beige
          beige: "#D8CDB9",
          // SW 7611 Tranquil Aqua
          aqua: "#A8C5C0",
          // SW 9051 Aquaverde (deep)
          deep: "#3D6F6A",
          // SW 6071 Popular Gray
          gray: "#B7AB9A",
          // Soft ink for body text (avoids harsh black)
          ink: "#1F3B38",
          // Muted text
          muted: "#6F7E7C",
        },
      },
      fontFamily: {
        display: ["var(--font-cinzel)", "serif"],
        sans: ["var(--font-josefin)", "system-ui", "sans-serif"],
        heb: ["var(--font-heebo)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        "tightest-2": "-0.06em",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "in-out-quint": "cubic-bezier(0.83, 0, 0.17, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
