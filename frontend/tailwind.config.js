/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          main: "#080B12",
          secondary: "#0D111C",
        },
        card: "#121827",
        surface: "#182235",
        text: {
          primary: "#F4F7FB",
          secondary: "#8B98AD",
        },
        accent: {
          primary: "#8B5CF6",
          secondary: "#22D3EE",
        },
        status: {
          success: "#34D399",
          warning: "#FBBF24",
          danger: "#FB7185",
        },
        border: "rgba(255,255,255,0.08)",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        heading: ["Manrope", "Plus Jakarta Sans", "sans-serif"],
      }
    },
  },
  plugins: [],
}
