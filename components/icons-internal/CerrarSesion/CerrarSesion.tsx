import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import { useState } from 'react';
import { motion, AnimatePresence, hover } from 'framer-motion';

const CerrarSesion = () => {
  const [hoverState, setHoverState] = useState(false);
  const { isDark } = useDarkTheme();

  return (
    <div className={`flex h-16 w-[270px] items-center justify-center ${isDark ? 'bg-[#EBE7E0]' : 'bg-[#012A8E]'}`}>
      <motion.div
        onMouseOver={() => setHoverState(true)}
        onMouseLeave={() => setHoverState(false)}
        initial={{ width: 131, height: 44 }}
        animate={{ width: hoverState ? 131 : 40, height: 44 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        className={`flex origin-center items-center justify-center rounded-[50px] hover:border ${isDark ? 'hover:border-[#252526]' : 'hover:border-[#EBE7E0]'} hover:bg-transparent`}
      >
        <motion.div
          initial={{ opacity: 1, paddingLeft: 12 }}
          animate={{ width: hoverState ? 127 : 40, height: 40, paddingLeft: hoverState ? 35 : 12 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className={`flex transform items-center rounded-[50px] ${isDark ? 'bg-[#252526]' : 'bg-[#EBE7E0]'} text-lg font-semibold ${isDark ? 'text-[#EBE7E0]' : 'text-[#012A8E]'}`}
        >
          <motion.div transition={{ duration: 0.2 }} className="flex transform flex-row items-center gap-2">
            <svg width="18" height="16" viewBox="0 0 18 16" fill="none">
              <path
                d="M13.0475 3.01621L17.1248 7.09355C17.3639 7.33262 17.5 7.66133 17.5 8C17.5 8.33867 17.3639 8.66738 17.1248 8.90645L13.0475 12.9838C12.835 13.1963 12.5494 13.3125 12.2506 13.3125C11.6297 13.3125 11.125 12.8078 11.125 12.1869V10.125H6.875C6.2873 10.125 5.8125 9.6502 5.8125 9.0625V6.9375C5.8125 6.3498 6.2873 5.875 6.875 5.875H11.125V3.81309C11.125 3.19219 11.6297 2.6875 12.2506 2.6875C12.5494 2.6875 12.835 2.80703 13.0475 3.01621ZM5.8125 2.6875H3.6875C3.0998 2.6875 2.625 3.1623 2.625 3.75V12.25C2.625 12.8377 3.0998 13.3125 3.6875 13.3125H5.8125C6.4002 13.3125 6.875 13.7873 6.875 14.375C6.875 14.9627 6.4002 15.4375 5.8125 15.4375H3.6875C1.92773 15.4375 0.5 14.0098 0.5 12.25V3.75C0.5 1.99023 1.92773 0.5625 3.6875 0.5625H5.8125C6.4002 0.5625 6.875 1.0373 6.875 1.625C6.875 2.2127 6.4002 2.6875 5.8125 2.6875Z"
                fill={`${isDark ? '#EBE7E0' : '#012A8E'}`}
              />
            </svg>

            <AnimatePresence>
              {hoverState && (
                <motion.p
                  key="salir"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                >
                  Salir
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CerrarSesion;
