// /tailwind.config.ts

import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        'need-help': "url('/images/need-help.png')",
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      screens: {
        xs: '480px',
        sm: '640px',
        md: '768px',
        lg: '1170px',
        xl: '1280px',
        '2k': '2048px',
        '4k': '3840px',
      },
      colors:{
        'nav-blue': '#012D8A',
        'gray-blue':'#020919',
        blue: {
          400: '#2589FE',
          500: '#0070F3',
          600: '#2F6FEB',
        },
      },
      width: {
        '9/10': '90%',
      },
      boxShadow: {
        'custom-blue': '0 5px 10px #012a8d',
        'custom-black':'0 5px 10px #000',
  
      },
      dropShadow: {
        'light': '0 5px 4px rgba(0, 0, 0, 0.400)',
        'darkmode': '0 4px 5px rgba(187, 187, 187, 0.400)'
      },
      backgroundColor:{
        'dark-blue':'rgb(3, 35, 54)'
      },
      top:{
        '57':'57%'},
 
      textShadow: {
        light: '4px 4px 10px rgba(29, 78, 216, 0.9)',
        dark: '4px 4px 10px rgba(255, 255, 255, 0.9)',
      },
    },
    keyframes: {
      shimmer: {
        '100%': {
          transform: 'translateX(100%)',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('tailwindcss-textshadow')],
};
export default config;
