// tailwind.config.ts

import type { Config } from 'tailwindcss';
import flowbite from 'flowbite-react/tailwind';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    flowbite.content(),
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
        'lg-tablet': '960px',
        lg: '1170px',
        xl: '1280px',
        '2k': '2048px',
        '4k': '3840px',
      },
      colors: {
        'nav-blue': '#012D8A',
        'gray-blue': '#020919',
        blue: {
          400: '#2589FE',
          500: '#0070F3',
          600: '#2F6FEB',
        },
        // calculatorDark: 'rgb(69 69 69 / 48%)',
        buttonsLigth: '#012c8a',
        calculatorDark: 'rgb(235, 231, 224, .15)',
        calculatorDark2: 'rgb(235, 231, 224, .5)',
        calculatorLight: 'rgb(230, 232, 239, .15)',
        calculatorLight2: 'rgb(230, 232, 239, .5)',
        selectBtsLight: '#91aeec',
        darkText: '#ebe7e0',
        lightText: '#252526',
        transparent: 'transparent',
      },
      width: {
        '9/10': '90%',
      },
      brightness: {
        '95': '0.95',
      },
      dropShadow: {
        light: '0 5px 4px rgba(0, 0, 0, 0.400)',
        darkmode: '0 4px 5px rgba(187, 187, 187, 0.400)',
      },
      boxShadow: {
        'custom-blue': '0 5px 10px #012a8d',
        'custom-black': '0 5px 10px #000',
      },
      backgroundColor: {
        'dark-blue': 'rgb(3, 35, 54)',
        graytyc: 'rgb(69, 69, 69)',
      },
      top: {
        '57': '57%',
      },
      textShadow: {
        light: '4px 4px 10px rgba(0, 0, 0, 0.9)',
        dark: '4px 4px 10px rgba(255, 255, 255, 0.9)',
      },
      animation: {
        rotate: 'rotate 5s cubic-bezier(0.4, 0, 0.2, 1)',
        'change-color': 'change-color 2.5s cubic-bezier(0.4, 0, 0.2, 1)',
      },
      keyframes: {
        rotate: {
          '0%': {
            clipPath: 'ellipse(1% 100% at 43% 81%)',
          },
          '50%': {
            clipPath: 'ellipse(90% 0% at 99% 100%)',
          },
          '100%': {
            clipPath: 'ellipse(100% 100% at 43% 81%)',
          },
        },
        'change-color': {
          from: {
            color: '#012c8a',
          },
          to: {
            color: '#fff',
          },
        },
        shimmer: {
          '100%': {
            transform: 'translateX(100%)',
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwindcss-textshadow'),
    flowbite.plugin(),
  ],
};

export default config;
