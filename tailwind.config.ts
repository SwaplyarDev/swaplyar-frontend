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

  ssafelist: [
    'text-custom-blue-800',
    'custom-blue',
    // clases específicas del accordion del footer
    'accordion-custom',
    'accordion-summary',
    'accordion-icon',
    'accordion-icon-expanded',
    'accordion-title',
    'accordion-title-expanded',
    'duration-600',
    'transition-all',
    'buttonsExtraLigth',
    'buttonsLigth',
    'buttonsExtraLigthDark',
    'buttonsLigthDark',
    'buttonExpandDark',
    'darkText',
    'lightText',
    {
      pattern: /Mui-.*/,
    },
    {
      pattern: /accordion-.*/,
    },
    {
      pattern: /duration-.*/,
    },
    {
      pattern: /transition-.*/,
    },
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
      maxWidth: {
        'screen-desktop': '1204px',
        'screen-tablet': '680px',
        'screen-phone': '358px',
      },
      screens: {
        'mini-phone': '340px',
        'xs-mini-phone': '390px',
        'xs-mini-phone2': '400px',
        xs: '480px',
        'xs-phone': '550px',
        sm: '640px',
        'sm-phone': '660px',
        'md-phone': '700px',
        'sm-tablet2': '744px',
        'sm-tablet': '749px',
        md: '768px',
        'md-tablet': '850px',
        'lg-tablet': '960px',
        lg: '1024px',
        lg2: '1124px',
        'xl-desktop': '1080px',
        xl: '1280px',
        'xl-nav': '1300px',
        'xl-blue-nav': '1310px',
        '2k': '2048px',
        '4k': '3840px',
      },
      colors: {
        'nav-blue': '#012D8A',
        'gray-blue': '#020919',

        //blue
        'custom-blue': 'rgba(1, 42, 142, 1)',
        'custom-blue-100': 'rgba(214, 226, 255, 1)',
        'custom-blue-200': 'rgba(194, 212, 255, 1)',
        'custom-blue-300': 'rgba(144, 176, 254, 1)', // #90B0FE Usos (generalmente en modo claro): Boton azul desabilitado, input azul desabilitado, ...
        'custom-blue-400': 'rgba(93, 140, 254, 1)',
        'custom-blue-500': 'rgba(42, 104, 254, 1)',
        'custom-blue-600': 'rgba(1, 72, 244, 1)',
        'custom-blue-700': 'rgba(1, 57, 192, 1)',
        'custom-blue-800': 'rgba(1, 42, 142, 1)', // #012A8A Usos (generalmente en modo claro): Boton azul, input azul, ...
        'custom-blue-900': 'rgba(1, 27, 91, 1)', //'custom-blue2
        'custom-blue-1000': 'rgba(0, 12, 41, 1)',

        //pink
        'custom-pink': 'rgba(182, 20, 255, 1)',
        'custom-pink-100': 'rgba(253, 250, 255, 1)',
        'custom-pink-200': 'rgba(245, 224, 255, 1)',
        'custom-pink-300': 'rgba(230, 173, 255, 1)',
        'custom-pink-400': 'rgba(214, 122, 255, 1)',
        'custom-pink-500': 'rgba(198, 71, 255, 1)',
        'custom-pink-600': 'rgba(182, 20, 255, 1)',
        'custom-pink-700': 'rgba(155, 0, 224, 1)',
        'custom-pink-800': 'rgba(120, 0, 173, 1)',
        'custom-pink-900': 'rgba(84, 0, 122, 1)',
        'custom-pink-1000': 'rgba(49, 0, 71, 1)',

        //aquamarine
        'custom-aquamarine': 'rgba(45, 204, 211, 1)',
        'custom-aquamarine-100': 'rgba(234, 250, 251, 1)',
        'custom-aquamarine-200': 'rgba(213, 245, 246, 1)',
        'custom-aquamarine-300': 'rgba(171, 235, 237, 1)',
        'custom-aquamarine-400': 'rgba(129, 224, 228, 1)',
        'custom-aquamarine-500': 'rgba(86, 214, 220, 1)',
        'custom-aquamarine-600': 'rgba(45, 204, 211, 1)',
        'custom-aquamarine-700': 'rgba(35, 163, 169, 1)',
        'custom-aquamarine-800': 'rgba(27, 122, 126, 1)',
        'custom-aquamarine-900': 'rgba(18, 82, 84, 1)',
        'custom-aquamarine-1000': 'rgba(9, 41, 42, 1)',

        //aquamarineDark
        'custom-aquamarineD': 'rgba(86, 214, 220, 1)',
        'custom-aquamarineD-100': 'rgba(221, 255, 255, 1)',
        'custom-aquamarineD-200': 'rgba(206, 255, 255, 1)',
        'custom-aquamarineD-300': 'rgba(191, 255, 255, 1)',
        'custom-aquamarineD-400': 'rgba(176, 255, 255, 1)',
        'custom-aquamarineD-500': 'rgba(161, 255, 255, 1)',
        'custom-aquamarineD-600': 'rgba(146, 255, 255, 1)',
        'custom-aquamarineD-700': 'rgba(131, 255, 255, 1)',
        'custom-aquamarineD-800': 'rgba(116, 244, 250, 1)',
        'custom-aquamarineD-900': 'rgba(101, 229, 235, 1)',
        'custom-aquamarineD-1000': 'rgba(86, 214, 220, 1)',

        //grayDark
        'custom-grayD': 'rgba(37, 37, 38, 1)', //#252526 COLOR DEL TEXTO EN MODO CLARO
        'custom-grayD-100': 'rgba(250, 250, 250, 1)',
        'custom-grayD-200': 'rgba(225, 225, 225, 1)', // #E1E1E1
        'custom-grayD-300': 'rgba(200, 200, 200, 1)',
        'custom-grayD-400': 'rgba(175, 175, 175, 1)',
        'custom-grayD-500': 'rgba(150, 150, 150, 1)', // #969696 Usos (generalmente en modo oscuro): Boton gris desabilitado, inputs gris desabilitado, ...
        'custom-grayD-600': 'rgba(125, 125, 125, 1)', //#7D7D7D
        'custom-grayD-700': 'rgba(100, 100, 100, 1)',
        'custom-grayD-800': 'rgba(75, 75, 75, 1)',
        'custom-grayD-900': 'rgba(50, 50, 50, 1)',
        'custom-grayD-1000': 'rgba(37, 37, 38, 1)',

        //whiteDark
        'custom-whiteD': 'rgba(235, 231, 224, 1)', //#EBE7E0 COLOR DEL TEXTO EN MODO OSCURO Usos (generalmente en modo oscuro): Boton blanco, inputs blanco, ...
        'custom-whiteD-100': 'rgba(255, 255, 251, 1)', //#FFFFFB
        'custom-whiteD-200': 'rgba(255, 255, 248, 1)',
        'custom-whiteD-300': 'rgba(255, 252, 245, 1)',
        'custom-whiteD-400': 'rgba(253, 249, 242, 1)',
        'custom-whiteD-500': 'rgba(250, 246, 239, 1)',
        'custom-whiteD-600': 'rgba(247, 243, 236, 1)',
        'custom-whiteD-700': 'rgba(244, 240, 233, 1)',
        'custom-whiteD-800': 'rgba(241, 237, 230, 1)',
        'custom-whiteD-900': 'rgba(238, 234, 227, 1)', //#EEEAE3
        'custom-whiteD-1000': 'rgba(235, 231, 224, 1)',

        //yellow
        'custom-yellow': 'rgba(255, 199, 44, 1)',

        //gray
        'custom-gray': 'rgba(203, 196, 188, 1)',

        //green
        'custom-green': 'rgba(151, 215, 0, 1)',

        //brown
        'custom-brown': 'rgba(197, 183, 131, 1)',

        //custom blue2
        'custom-blue2': 'rgba(1, 27, 91, 1)',

        //custom-aquamarine2
        'custom-aquamarine2': 'rgba(27, 122, 126, 1)',

        //'custom violet'

        'custom-violet': 'rgba(120, 0, 173, 1)',

        blue: {
          400: '#2589FE',
          500: '#0070F3',
          600: '#2F6FEB',
        },
        // calculatorDark: 'rgb(69 69 69 / 48%)',
        buttonsExtraLigth: '#2A68FE', // Azul Marino Claro
        buttonsLigth: '#012A8E', // Azul Marino Oscuro
        buttonsExtraLigthDark: '#C2D4FF',
        buttonsLigthDark: '#D6E2FF',
        buttonExpandDark: '#90B0FE',
        calculatorDark: 'rgba(235, 231, 224, 0.15)', // Beige Claro con Transparencia (15%)
        calculatorDark2: 'rgba(235, 231, 224, 0.5)', // Beige Claro con Transparencia (50%)
        calculatorLight: 'rgba(230, 232, 239, 0.15)', // Azul Grisáceo Claro con Transparencia (15%)
        calculatorLight2: 'rgba(230, 232, 239, 0.5)', // Azul Grisáceo Claro con Transparencia (50%)
        selectBtsLight: '#91aeec', // Azul Pastel Claro
        darkText: '#ebe7e0', // Blanco Hueso o Marfil Claro
        lightText: '#252526', // Gris Muy Oscuro o Negro Grafito
        inputLight: '#012A8E', // Azul Marino Oscuro
        inputDark: '#EEEAE3', // Blanco Hueso o Marfil Claro
        placeholderDark: '#969696', // Gris claro para placeholder
        errorColor: '#CE1818',

        // Estados deshabilitados
        disabledButtonsLigth: '#90B0FE', // Gris claro para fondo deshabilitado de buttonsLigth
        disabledButtonsDark: '#969696', // Gris claro para fondo deshabilitado
        disabledCalculatorDark: 'rgba(235, 231, 224, 0.1)', // Transparencia reducida para calculatorDark
        disabledCalculatorDark2: 'rgba(235, 231, 224, 0.3)', // Transparencia reducida para calculatorDark2
        disabledCalculatorLight: 'rgba(230, 232, 239, 0.1)', // Transparencia reducida para calculatorLight
        disabledCalculatorLight2: 'rgba(230, 232, 239, 0.3)', // Transparencia reducida para calculatorLight2
        disabledSelectBtsLight: '#D6E4FC', // Azul Pastel Claro más tenue
        disabledDarkText: '#AAA59F', // Gris claro para texto deshabilitado
        disabledLightText: '#555555', // Gris más claro para texto deshabilitado
        inputLightDisabled: '#90B0FE', // Azul pastel con un tono más vibrante y saturado
      },
      fontFamily: {
        titleFont: ['OpenSans', 'sans-serif', '100', '200', '300', '400', '500', '600', '700', '800', '900'],
        textFont: ['Roboto', 'sans-serif', '100', '200', '300', '400', '500', '600', '700', '800', '900'],
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
        'custom-blueBox': '0 5px 10px #012a8d',
        'custom-blackBox': '0 5px 10px #000',
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
        customLight: '4px 4px 0px rgba(0, 0, 0, 0.25);',
        customDark: '4px 4px 0px rgba(131, 131, 131, 0.25);',
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
    require('tailwind-scrollbar'),
    require('tailwind-scrollbar-hide'),
    flowbite.plugin(),
  ],
};

export default config;
