/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        light: "#F0F0F0",
        prime: "#F3F1F5",
        primary: "#DDE6ED",
        admin_purple: "#615DE0",
        admin_blue: "#538DFF",
        admin_green: "#5DE07E",
        admin_red: "#E63A56",
        admin_white: "#FFFFFF",
        admin_gray: "#F5F6F7",
        admin_link: "#6375F0",
        admin_skyblue: "#3da9fc",
        admin_dark: "#282A3A",
        condo_red: "#BD0901",
      },
    },
  },
  plugins: [],
};
