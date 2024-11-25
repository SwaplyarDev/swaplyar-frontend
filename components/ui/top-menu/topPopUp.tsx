'use client';
import { setBannerColor } from '@/utils/setBannerColor';
import { useState, useEffect } from 'react';
import { MdOutlineClose } from 'react-icons/md';

function TopPopUp() {
  const [isClosed, setIsClosed] = useState(false);
  const [bannerColor, setBannerColorState] = useState({ bg: '', text: '' });

  const handleClose = () => {
    sessionStorage.setItem('isClosed', JSON.stringify(true));
    setIsClosed(true);
  };

  useEffect(() => {
    // Obtenemos el color del banner desde setBannerColor
    const color = setBannerColor();
    setBannerColorState(color);

    // Verificamos si el popup está cerrado
    const closed = JSON.parse(sessionStorage.getItem('isClosed') || 'false');
    setIsClosed(closed);
  }, []);

  if (isClosed) {
    return null;
  }

  return (
    <main
      className="relative w-full py-2"
      style={{
        backgroundColor: bannerColor.bg,
        color: bannerColor.text,
      }}
    >
      <div className="relative m-auto flex w-[90%] max-w-screen-2xl items-center justify-between">
        <p className="flex-grow text-center text-xs font-bold md:text-sm lg:text-lg">
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




