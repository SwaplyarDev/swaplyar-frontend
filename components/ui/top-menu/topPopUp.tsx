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

    window.dispatchEvent(
      new CustomEvent('topPopupVisibilityChange', {
        detail: { isVisible: false },
      }),
    );
  };

  useEffect(() => {
    const color = setBannerColor();
    setBannerColorState(color);

    const closed = JSON.parse(sessionStorage.getItem('isClosed') || 'false');
    setIsClosed(closed);

    window.dispatchEvent(
      new CustomEvent('topPopupVisibilityChange', {
        detail: { isVisible: !closed },
      }),
    );

    return () => {
      window.removeEventListener('topPopupVisibilityChange', () => {});
    };
  }, []);

  if (isClosed) {
    return null;
  }

  return (
    <main
      className="relative w-full  py-[3.5px] lg:py-[1.5px]"
      style={{
        backgroundColor: bannerColor.bg,
        color: bannerColor.text,
      }}
    >
      <div className="relative m-auto flex w-full max-w-[1204px] items-center justify-between px-4 md:px-8 lg:px-4">
        <div className="mask-gradient-popup w-full overflow-hidden xs:hidden md:text-sm lg:text-lg">
          <motion.p
            animate={{ x: ['100%', '-100%'] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            className="min-w-[370px] whitespace-nowrap text-center font-textFont text-xs font-semibold"
          >
            Estamos trabajando en las funciones de inicio de sesión y registro
          </motion.p>
        </div>
        <p className="hidden w-full text-center font-textFont text-xs font-semibold xs:block md:text-sm lg:text-[16px]">
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
