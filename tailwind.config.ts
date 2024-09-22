import type { Config } from "tailwindcss";

/** @type {import('tailwindcss').Config} */
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        "good-goods-blue": {
          100: "#EEF9FF",
          500: "#6CD0FF",
          900: "#023047"
        },
        "good-goods-orange": {
          900: "#FF9B29"
        }
      },
      height: {
        'screen-1/5': '20vh',
        'screen-4/5': '80vh',
        '112': '28rem',
        '128': '32rem'
      },
      width: {
        'screen-4/5': '80vw',
        '112': '28rem',
        '128': '32rem'
      },
      margin: {
        '10.vh': '10vh',
        '12.5vh': '12.5vh',
        '15vh': '15vh'
      },
      inset: {
        '0.7': '70%',
        '0.9': '90%'
      },
      screens: {
        '2.5xl': '1700px'
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
};
export default config;
