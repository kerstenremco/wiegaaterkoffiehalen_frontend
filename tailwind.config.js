/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");

export default {
  content: ["./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  safelist: ["success-100"],
  plugins: [
    nextui({
      layout: {
        disabledOpacity: "0.3", // opacity-[0.3]
        radius: {
          small: "2px", // rounded-small
          medium: "4px", // rounded-medium
          large: "6px" // rounded-large
        },
        borderWidth: {
          small: "1px", // border-small
          medium: "1px", // border-medium
          large: "2px" // border-large
        }
      },
      themes: {
        light: {
          colors: {
            primary: {
              50: "#fbeae5",
              100: "#fbeae5",
              200: "#f9d8cf",
              300: "#f3bcae",
              400: "#eb957e",
              DEFAULT: "#e07a5f",
              600: "#ca5738",
              700: "#a9462c",
              800: "#8d3c27",
              900: "#753727",
              950: "#3f1a10"
            },
            secondary: {
              50: "#F5F6FA",
              100: "#F5F6FA",
              200: "#EAECF4",
              300: "#D1D7E6",
              400: "#A8B5D1",
              DEFAULT: "#586F9F",
              600: "#445785",
              700: "#38466C",
              800: "#313D5B",
              900: "#303952",
              950: "#1E2333"
            },
            warning: {
              LIGHT: "#FECA57",
              DEFAULT: "#FF9F43"
            },
            danger: {
              LIGHT: "#e28787",
              DEFAULT: "#EE5253"
            },
            success: {
              LIGHT: "#FF6B6B",
              DEFAULT: "#10AC84"
            }
          }
        },
        dark: {}
      }
    })
  ]
};
