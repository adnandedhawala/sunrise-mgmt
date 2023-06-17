/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  corePlugins: {
    preflight: false
  },
  daisyui: {
    themes: [{
      mytheme: {
        "primary": "#501800",
        "secondary": "#FCE67C",
        "accent": "#5361fc",
        "neutral": "#242842",
        "base-100": "#f2f4f8",
        "info": "#5594d8",
        "success": "#0d594f",
        "warning": "#c7a005",
        "error": "#ef6c82",
      }
    }], 
    darkTheme: "dark", 
    base: true, 
    styled: true,
    utils: true,
    rtl: false,
    prefix: "",
    logs: true,
  }
}

