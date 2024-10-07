import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",  
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "purple-1": "#6D41EA",
        "purple-2": "#9A97DA",
        "purple-3": "#D7D5FD",
        "pink-1": "#CC8696",
        "pink-2": "#E5B4C0",
        "orange-1": "#E37F37",
        "orange-2": "#EA9C63",
        "orange-3": "#F8D2B8",
        "green-1": "#56A53A",
        "green-2": "#87BD74",
        "green-3": "#C7ECBA",
        "green-4": "#A5BE6A",
        "green-5": "#8EA45C",
        "gray-1": "#1E1E1E",
        "gray-2": "#5F5F5F",
        "gray-3": "#808080",
        "gray-4": "#B1B1B1",
        "gray-5": "#D9D9D9",
        "gray-6": "#F3F3F3",
      }
    },
  },
  plugins: [],
};
export default config;
