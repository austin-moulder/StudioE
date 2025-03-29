import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          from: "#ff7e5f",
          via: "#ff3c83",
          to: "#b642ff",
        },
        background: "rgb(var(--background-rgb) / <alpha-value>)",
        foreground: "rgb(var(--foreground-rgb) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["Open Sans", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "brand-gradient": "linear-gradient(to right, #ff7e5f, #ff3c83, #b642ff)",
      },
    },
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1400px",
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
export default config;
