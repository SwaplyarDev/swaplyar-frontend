// tailwind.config.ts

import type { Config } from 'tailwindcss';
import flowbite from 'flowbite-react/tailwind';

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    flowbite.content(),
  ],
  theme: {
    extend: {
      container: {
        center: true,
      },
      backgroundImage: {
        'need-help': "url('/images/need-help.png')",
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      backgroundPosition: {
        'center-80px': 'center -80px',
        'center-10px': 'center 10px',
      },
      screens: {
        xs: '480px',
        'xs-phone': '550px',
        sm: '640px',
        'sm-phone': '660px',
        'sm-tablet': '749px',
        md: '768px',
        'md-tablet': '850px',
        'lg-tablet': '960px',
        lg: '1024px',
        'xl-desktop': '1080px',
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
        buttonsLigth: '#012c8a', // Azul Marino Oscuro
        calculatorDark: 'rgba(235, 231, 224, 0.15)', // Beige Claro con Transparencia (15%)
        calculatorDark2: 'rgba(235, 231, 224, 0.5)', // Beige Claro con Transparencia (50%)
        calculatorLight: 'rgba(230, 232, 239, 0.15)', // Azul Grisáceo Claro con Transparencia (15%)
        calculatorLight2: 'rgba(230, 232, 239, 0.5)', // Azul Grisáceo Claro con Transparencia (50%)
        selectBtsLight: '#91aeec', // Azul Pastel Claro
        darkText: '#ebe7e0', // Blanco Hueso o Marfil Claro
        lightText: '#252526', // Gris Muy Oscuro o Negro Grafito

        // Estados deshabilitados
        disabledButtonsLigth: '#A0AEC0', // Gris claro para fondo deshabilitado de buttonsLigth
        disabledCalculatorDark: 'rgba(235, 231, 224, 0.1)', // Transparencia reducida para calculatorDark
        disabledCalculatorDark2: 'rgba(235, 231, 224, 0.3)', // Transparencia reducida para calculatorDark2
        disabledCalculatorLight: 'rgba(230, 232, 239, 0.1)', // Transparencia reducida para calculatorLight
        disabledCalculatorLight2: 'rgba(230, 232, 239, 0.3)', // Transparencia reducida para calculatorLight2
        disabledSelectBtsLight: '#D6E4FC', // Azul Pastel Claro más tenue
        disabledDarkText: '#AAA59F', // Gris claro para texto deshabilitado
        disabledLightText: '#555555', // Gris más claro para texto deshabilitado
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
      borderWidth: {
        '6': '6px',
        '8': '8px',
        '10': '10px',
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
  plugins: [require('@tailwindcss/forms'), require('tailwindcss-textshadow'), flowbite.plugin()],
};

export default config;
