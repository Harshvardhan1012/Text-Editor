module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Match your files
  ],
  safelist: [
    {
      pattern: /bg-(blue|red|green|yellow|gray)-(500|600|700|800)/, // Add the required patterns
    },
    {
      pattern: /hover:bg-(blue|red|green|yellow|gray)-(600|800)/, // Safelist hover classes
    },
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
