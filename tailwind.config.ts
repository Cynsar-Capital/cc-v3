import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{ts,tsx}",
    "./content/**/*.mdx",
    "./public/**/*.svg",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {},
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [],
} satisfies Config;
