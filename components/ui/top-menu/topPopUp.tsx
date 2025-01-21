'use client';
import { setBannerColor } from '@/utils/setBannerColor';
import { useState, useEffect } from 'react';
import { MdOutlineClose } from 'react-icons/md';
import { motion } from 'motion/react';

function TopPopUp() {
  const [isClosed, setIsClosed] = useState(false);
  const [bannerColor, setBannerColorState] = useState({ bg: '', text: '' });

  const handleClose = () => {
    sessionStorage.setItem('isClosed', JSON.stringify(true));
    setIsClosed(true);
  };

  useEffect(() => {
    const color = setBannerColor();
    setBannerColorState(color);

    const closed = JSON.parse(sessionStorage.getItem('isClosed') || 'false');
    setIsClosed(closed);
  }, []);

  if (isClosed) {
    return null;
  }

  return (
    <main
      className="relative w-full px-4 py-2 md:px-8 lg:px-4"
      style={{
        backgroundColor: bannerColor.bg,
        color: bannerColor.text,
      }}
    >
      <div className="relative m-auto flex w-full max-w-[1204px] items-center justify-between">
        <div className="mask-gradient-popup w-full overflow-hidden xs:hidden md:text-sm lg:text-lg">
          <motion.p
            animate={{ x: ['100%', '-100%'] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            className="min-w-[350px] text-center text-xs font-bold"
          >
            Estamos trabajando en las funciones de inicio de sesión y registro
          </motion.p>
        </div>
        <p className="hidden w-full text-center text-xs font-bold xs:block md:text-sm lg:text-lg">
          Estamos trabajando en las funciones de inicio de sesión y registro
        </p>
        <button
          className="ml-2 text-lg font-extrabold lg:text-2xl"
          style={{ color: bannerColor.text }}
          onClick={handleClose}
        >
          <MdOutlineClose />
        </button>
      </div>
    </main>
  );
}

export default TopPopUp;
