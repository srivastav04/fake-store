module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      "light",

      {
        mytheme: {
          primary: "#f3f4f6",

          secondary: "#4b5563",

          accent: "#e5e7eb",

          neutral: "#030e0c",

          "base-100": "#111827",

          info: "#111827",

          success: "#111827",

          warning: "#111827",

          error: "#111827",
        },
      },
    ],
  },
};
