import type { Config } from "tailwindcss";

export default {
  content: [
    "./index.html",
    "./**/*.{ts,tsx,html}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config;
