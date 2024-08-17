import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'need-help': "url('/images/need-help.png')",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors:{
        'nav-blue': '#012D8A',
        'gray-blue':'#020919',
      },
      width: {
        '9/10': '90%',
      },
      boxShadow: {
        'custom-blue': '0 5px 10px #012a8d',
        'custom-black':'0 5px 10px #000'
      },
      backgroundColor:{
        'dark-blue':'rgb(3, 35, 54)'
      }
    },
  },
  plugins: [],
};
export default config;
