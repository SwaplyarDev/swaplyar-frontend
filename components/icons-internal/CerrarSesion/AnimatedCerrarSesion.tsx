import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import { useState } from 'react';
import { motion, AnimatePresence, hover } from 'framer-motion';
import CerrarSesionIcon from './CerrarSesionIcon';

const AnimatedCerrarSesion = () => {
  const [hoverState, setHoverState] = useState(false);
  const { isDark } = useDarkTheme();

  return (
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
          <CerrarSesionIcon />

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
  );
};

export default AnimatedCerrarSesion;
