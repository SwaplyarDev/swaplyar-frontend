import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import { useState } from 'react';
import { motion } from 'framer-motion';

const CerrarSesion = () => {
  const [hoverState, setHoverState] = useState(false);
  const { isDark } = useDarkTheme();

  return (
    // <svg width="120" height="50" viewBox="0 0 131 44" fill="none" xmlns="http://www.w3.org/2000/svg">
    //   <rect x="45.5" y="2" width="40" height="40" rx="20" fill={`${isDark ? '#000000' : '#E5E7EB'}`}></rect>
    //   <g clip-path="url(#clip0_5674_8155)">
    //     <path
    //       d="M69.5475 17.0162L73.6248 21.0936C73.8639 21.3326 74 21.6613 74 22C74 22.3387 73.8639 22.6674 73.6248 22.9064L69.5475 26.9838C69.335 27.1963 69.0494 27.3125 68.7506 27.3125C68.1297 27.3125 67.625 26.8078 67.625 26.1869V24.125H63.375C62.7873 24.125 62.3125 23.6502 62.3125 23.0625V20.9375C62.3125 20.3498 62.7873 19.875 63.375 19.875H67.625V17.8131C67.625 17.1922 68.1297 16.6875 68.7506 16.6875C69.0494 16.6875 69.335 16.807 69.5475 17.0162ZM62.3125 16.6875H60.1875C59.5998 16.6875 59.125 17.1623 59.125 17.75V26.25C59.125 26.8377 59.5998 27.3125 60.1875 27.3125H62.3125C62.9002 27.3125 63.375 27.7873 63.375 28.375C63.375 28.9627 62.9002 29.4375 62.3125 29.4375H60.1875C58.4277 29.4375 57 28.0098 57 26.25V17.75C57 15.9902 58.4277 14.5625 60.1875 14.5625H62.3125C62.9002 14.5625 63.375 15.0373 63.375 15.625C63.375 16.2127 62.9002 16.6875 62.3125 16.6875Z"
    //       fill={`${isDark ? '#E5E7EB' : '#012A8E'}`}
    //     ></path>
    //   </g>
    //   <defs>
    //     <clipPath id="clip0_5674_8155">
    //       <rect width="17" height="17" fill={`${isDark ? '#000000' : '#E5E7EB'}`} transform="translate(57 13.5)"></rect>
    //     </clipPath>
    //   </defs>
    // </svg>

    // <div
    //   className={`flex h-[40px] w-[40px] origin-center transform items-center justify-center rounded-[50px] bg-[#EBE7E0] text-lg font-semibold text-[#012A8E] transition-transform duration-300`}

    // ></div>

    // El texto aparece desde la izquierda y se posiciona

    <div
      onMouseOver={() => setHoverState(true)}
      onMouseLeave={() => setHoverState(false)}
      className={`flex ${hoverState ? 'h-[44px] w-[131px] translate-x-[-30px] border-[1px] border-[#EBE7E0] bg-transparent' : 'h-[40px] w-[40px]'} transform items-center justify-center rounded-[50px] duration-1000`}
    >
      <div
        className={`flex h-[40px] ${hoverState ? 'w-[127px]' : 'w-[40px]'} origin-center transform items-center justify-center rounded-[50px] bg-[#EBE7E0] text-lg font-semibold text-[#012A8E] duration-1000`}
      >
        <button className="flex flex-row items-center gap-2">
          <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M13.0475 3.01621L17.1248 7.09355C17.3639 7.33262 17.5 7.66133 17.5 8C17.5 8.33867 17.3639 8.66738 17.1248 8.90645L13.0475 12.9838C12.835 13.1963 12.5494 13.3125 12.2506 13.3125C11.6297 13.3125 11.125 12.8078 11.125 12.1869V10.125H6.875C6.2873 10.125 5.8125 9.6502 5.8125 9.0625V6.9375C5.8125 6.3498 6.2873 5.875 6.875 5.875H11.125V3.81309C11.125 3.19219 11.6297 2.6875 12.2506 2.6875C12.5494 2.6875 12.835 2.80703 13.0475 3.01621ZM5.8125 2.6875H3.6875C3.0998 2.6875 2.625 3.1623 2.625 3.75V12.25C2.625 12.8377 3.0998 13.3125 3.6875 13.3125H5.8125C6.4002 13.3125 6.875 13.7873 6.875 14.375C6.875 14.9627 6.4002 15.4375 5.8125 15.4375H3.6875C1.92773 15.4375 0.5 14.0098 0.5 12.25V3.75C0.5 1.99023 1.92773 0.5625 3.6875 0.5625H5.8125C6.4002 0.5625 6.875 1.0373 6.875 1.625C6.875 2.2127 6.4002 2.6875 5.8125 2.6875Z"
              fill="#012A8E"
            />
          </svg>
          {hoverState && (
            <motion.p
              initial={{ x: 60, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 100, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              Salir
            </motion.p>
          )}
        </button>
      </div>
    </div>
  );
};

export default CerrarSesion;
