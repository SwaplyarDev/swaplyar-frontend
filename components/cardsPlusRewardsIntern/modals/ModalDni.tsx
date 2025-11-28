'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import ButtonBack from '@/components/ui/ButtonBack/ButtonBack';

interface ShowModalDniProps {
  ShowModalDni: number;
  className?: string;
  setShowModalDni?: React.Dispatch<React.SetStateAction<number>>;
}

const images = [
  { src: '/images/ejemploFrente.png', label: 'Frente' },
  { src: '/images/ejemploDorso.png', label: 'Dorso' },
  { src: '/images/ejemploPerfil.png', label: 'Perfil' },
];

const ModalDni: React.FC<ShowModalDniProps> = ({ setShowModalDni }) => {
  const [current, setCurrent] = useState(0);

  const closeModal = () => {
    setShowModalDni?.(0);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    closeModal();
  };

  const next = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prev = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onClick={handleOverlayClick}
    >
      <div
        className="
          relative w-full
          max-w-[90%] sm:max-w-[560px]
          rounded-2xl
          bg-[#FFFFFB] dark:bg-custom-grayD-900
          px-4 sm:px-6
          pt-5 pb-6 sm:pt-6 sm:pb-8
          flex flex-col
          gap-5 sm:gap-6
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="flex items-center gap-2">
          <ButtonBack
            onClick={closeModal}
            className="!ml-0 -ml-2"
          />

          <h2 className="text-[18px] sm:text-[20px] font-semibold text-[#012A8E] dark:text-custom-whiteD text-left">
            Ejemplos de comprobantes
          </h2>
        </div>

        {/* CARRUSEL */}
        <div className="relative">
          <div
            className="flex gap-4 overflow-x-auto overflow-y-hidden scroll-smooth snap-x snap-mandatory pr-4"
            onWheel={(e) => {
              e.preventDefault();
              const element = e.currentTarget;
              const speed = 2;
              element.scrollLeft += e.deltaY * speed;
            }}
          >
            {/* IMAGEN 1 */}
            <div className="flex-shrink-0 snap-center w-[85%] sm:w-[70%] max-w-[360px]">
              <Image
                src="/images/ejemploFrente.png"
                alt="Frente"
                width={360}
                height={240}
                unoptimized
                className="rounded-xl object-contain bg-transparent"
              />
            </div>

            {/* IMAGEN 2 */}
            <div className="flex-shrink-0 snap-center w-[85%] sm:w-[70%] max-w-[360px]">
              <Image
                src="/images/ejemploDorso.png"
                alt="Dorso"
                width={360}
                height={240}
                unoptimized
                className="rounded-xl object-contain bg-white dark:bg-custom-grayD-800"
              />
            </div>

            {/* IMAGEN 3 */}
            <div className="flex-shrink-0 snap-center w-[85%] sm:w-[70%] max-w-[360px]">
              <Image
                src="/images/ejemploPerfil.png"
                alt="Perfil"
                width={360}
                height={240}
                unoptimized
                className="rounded-xl object-contain bg-white dark:bg-custom-grayD-800"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalDni;
