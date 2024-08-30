/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#ffffff",  // White
        secondary: "#fff3e3", // Light Peach
        accent: "#B88E2F",    // Golden Brown
        danger: "#E97171",    // Light Red
        success: "#2EC1AC",   // Teal Green
        light: "#FAF3EA",     // Off White
        graydarkest: "#333333", // Dark Gray
        graydarker: "#3A3A3A", // Darker Gray
        graydark: "#898989",   // Medium Gray
        gray: "#B0B0B0",       // Light Gray
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"], // Added Montserrat
      },
    },
    screens: {
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [],
};
