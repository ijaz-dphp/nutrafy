import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: "#059669",
        secondary: "#0f172a",
      },
    },
  },
  plugins: [],
};

export default config;
