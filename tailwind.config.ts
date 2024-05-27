import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        widthChange: {
          '0%, 100%': {
            width: 'var(--from-width)',
          },
          '20%': {
            width: 'var(--to-width-20)',
          },
          '50%': {
            width: 'var(--to-width-50)',
          },
        },
        floatUpAndFadeOut: {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(-100px)', opacity: '0' },
        },
      },
      animation: {
        floatUpAndFadeOut: 'floatUpAndFadeOut 1s ease forwards',
        widthChange: 'widthChange 0.1s ease-in-out',
      },
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
