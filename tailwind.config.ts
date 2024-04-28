import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "var(--primary)",
        "black": "var(--background)",
        "gray": "var(--gray)",
        "gray-light": "var(--gray-light)",
        "yellow": "var(--yellow)",
        "overlay": "var(--overlay)",
        "destructive": "var(--destructive)",
        "destructive-foreground": "var(--destructive-foreground)",
        "green": "var(--green)",
        "green-foreground": "var(--green-foreground)",
      }
    },
  },
  plugins: [],
};
export default config;
