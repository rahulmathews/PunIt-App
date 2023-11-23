module.exports = {
  content: [
    "./src/components/**/*.{js,jsx,ts,tsx,html}",
    "./src/pages/**/*.{js,jsx,ts,tsx,html}",
    "./src/layout/**/*.{js,jsx,ts,tsx,html}",
    "./public/index.html",
    // ""
  ],
  important: "#__next",
  theme: {
    extend: {},
  },
  corePlugins: {
    // Remove the Tailwind CSS preflight styles so it can use Material UI's preflight instead (CssBaseline).
    // preflight: false,
  },
  plugins: [],
};
