/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,vue}"],
  theme: {
    extend: {
      padding: {
        layout: "8px",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["dracula"],
  },
};
