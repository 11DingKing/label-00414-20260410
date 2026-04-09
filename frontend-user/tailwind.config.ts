import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#7A9CA6",
        secondary: "#BCCCD1",
        background: "#F7F9FA",
        surface: "#FFFFFF",
        "text-main": "#2C3E50",
      },
      fontFamily: {
        sans: [
          "SF Pro Display",
          "PingFang SC",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        chinese: ["PingFang SC", "Microsoft YaHei", "sans-serif"],
        english: ["SF Pro Display", "Helvetica Neue", "Arial", "sans-serif"],
      },
      borderRadius: {
        "2xl": "1rem",
      },
      boxShadow: {
        sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
      },
    },
  },
  plugins: [],
};

export default config;
