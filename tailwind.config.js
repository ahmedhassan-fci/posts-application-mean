module.exports = {
  purge: {
    enabled: true,
    layers: ["utilities"],
    content: ["./src/**/*.html", "./src/**/*.scss"],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      opacity: ["disabled"],
      translate: ["disabled"],
      scale: ["disabled"],
      cursor: ["disabled"]
    },
  },
  plugins: [],
};
