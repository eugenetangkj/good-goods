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
          900: "#FB8500"
        }
      },
      height: {
        'screen-1/5': '20vh',
        'screen-4/5': '80vh'
      },
      width: {
        'screen-4/5': '80vw',
      },
      margin: {
        '10vh': '10vh'
      },
      inset: {
        '0.7': '70%'
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
};
export default config;
