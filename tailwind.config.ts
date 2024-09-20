import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
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
    },
  },
  plugins: [],
};
export default config;
