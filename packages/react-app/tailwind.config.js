const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  purge: {
    content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    options: {
      safelist: ["headerBackground", "ringsBackground"],
    },
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      xs: "350px",
      xs1: "415px",
      xs2: "490px",
      ...defaultTheme.screens,
    },
    backgroundSize: {
      auto: "auto",
      cover: "cover",
      contain: "contain",
      fit: "fit",
      "50%": "50%",
      "25%": "25%",
      6: "6rem",
    },
    fontSize: {
      xs: ".75rem",
      sm: ".875rem",
      tiny: ".875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "3xs": ".25rem",
      "2xs": ".5rem",
      "2xls": "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "4.5rem",
      "7xl": "5rem",
      "8xl": "5.5rem",
      "9xl": "6rem",
    },
    extend: {
      backgroundImage: {
        headerBackground: "url('/src/assets/Bareheader.svg')",
        ringsBackground: "url('/src/assets/RotatingRings.svg')",
        ringsBig: "url('/src/assets/RotatingRingsBig.svg')",
        smallBackground: "url('/src/assets/Rings_small.svg')",
        circle: "url('/src/assets/eth_circle_3.svg')",
        midpage: "url('/src/assets/variant3.svg')",
      },
      colors: {
        orange: colors.orange,
        teal: colors.teal,
        primary: "#7ee6cd",
        green: {
          "050": "#6dc5a0",
          "dark-green": "#337062",
          teal: "#2CAE92",
          header: "#6AC59F",
          "light-green": "#E2F3EC",
          imgBg: "#9ED5AA",
          skyblue: "#39d0d8",
          posblue: "#207191",
        },
        purple: {
          overlay: "#240871",
          imgText: "#8C65F7",
        },
        gray: {
          "050": "#FFFFFF",
          1000: "#343a39",
        },
        red: {
          bloodred: "#ea1e5047",
          soldout: "#EB1E50",
        },
        yellow: {
          pos: "#FFE171",
          poslight: "#FFF8DB",
        },
      },
    },
    fontFamily: {
      spacemono: ["Space Mono"],
      display: ["Poppins"],
      librefranklin: ["Libre Franklin"],
    },
    backgroundPosition: {
      bottom: "bottom",
      "bottom-4": "center bottom 1rem",
      center: "center",
      left: "left",
      "left-bottom": "left bottom",
      "left-top": "left top",
      right: "right",
      "right-bottom": "right bottom",
      "right-top": "right top",
      top: "top",
      "top-4": "center top 1rem",
    },
    minHeight: {
      0: "0",
      "1/4": "25%",
      "1/2": "50%",
      "3/4": "75%",
      full: "100%",
      intro: "1656px",
      "intro-mobile": "450px",
    },
  },
  variants: {
    width: ["responsive", "hover", "focus"],
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
