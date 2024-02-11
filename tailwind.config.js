/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,vue}"],
  theme: {
    extend: {
      padding: {
        layout: "8px",
      },
      textColor: {
        "main-white": "#F8F8F3",
      },
      fontSize: {
        small: "12px",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["dracula"],
  },
};
