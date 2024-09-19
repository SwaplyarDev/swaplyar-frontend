'use client';
import { useState, useEffect } from 'react';
import { MdOutlineClose } from 'react-icons/md';

function TopPopUp() {
  const [isClosed, setIsClosed] = useState(true);

  const handleClose = () => {
    sessionStorage.setItem('isClosed', JSON.stringify(true));
    setIsClosed(true);
  };

  useEffect(() => {
    const closed = JSON.parse(sessionStorage.getItem('isClosed') as string);
    if (closed) {
      setIsClosed(closed);
    }
    else{
      setIsClosed(false);
    }
  }, []);

  if (isClosed) {
    return null;
  }

  return (
    <main className="w-full bg-violet-700 py-2">
      <div className="m-auto flex w-[90%] max-w-screen-2xl items-start lg:items-center justify-center md:gap-3">
        <p className="text-center text-xs font-bold text-darkText md:text-sm lg:text-lg">
          ¡Llegaron los Yenes a SwaplyAr! Aprovecha nuestras nuevas promociones
          y disfruta de los mejores beneficios. ¡No te lo pierdas!
        </p>
        <button
          className="text-lg font-extrabold text-darkText lg:text-2xl"
          onClick={handleClose}
        >
          <MdOutlineClose />
        </button>
      </div>
    </main>
  );
}

export default TopPopUp;
