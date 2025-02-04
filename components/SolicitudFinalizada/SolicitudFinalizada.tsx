'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';

const SolicitudFinalizada = ({ children }: { children?: React.ReactNode }) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  interface StarIconProps {
    className?: string;
    onMouseOver?: (e: React.MouseEvent<SVGSVGElement>) => void;
    onMouseLeave?: (e: React.MouseEvent<SVGSVGElement>) => void;
    index: number;
  }

  const StarIcon: React.FC<StarIconProps> = ({ index, onMouseOver, onMouseLeave }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100"
      height="100"
      viewBox="0 0 100 100"
      fill="none"
      className={`cursor-pointer ${index <= (hoverIndex ?? -1) ? 'fill-[rgba(255,217,0,1)]' : 'fill-[rgba(188,188,188,1)]'}`}
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
    >
      <path d="M50 0L61.2257 34.5491H97.5528L68.1636 55.9017L79.3893 90.4509L50 69.0983L20.6107 90.4509L31.8364 55.9017L2.44717 34.5491H38.7743L50 0Z" />
    </svg>
  );

  const mouseHover = (e: React.MouseEvent<SVGSVGElement>, index: number) => {
    console.log(e.target, index);
  };
  return (
    <main className={`grid gap-6 text-center font-titleFont text-[40px] font-medium`}>
      <div>
        <h1>Solicitud finalizada con exito.</h1>
        <h1>Gracias por Elegir SwaplyAr</h1>
      </div>
      <p>#123456789</p>
      <div className="flex justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="101" height="100" viewBox="0 0 101 100" fill="none">
          <path
            d="M44.6693 69.1668L74.0443 39.7918L68.2109 33.9585L44.6693 57.5002L32.7943 45.6252L26.9609 51.4585L44.6693 69.1668Z"
            fill="#0A9411"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M50.5026 91.6668C44.7387 91.6668 39.3221 90.5724 34.2526 88.3835C29.1832 86.1946 24.7734 83.2266 21.0234 79.4793C17.2734 75.7321 14.3054 71.3224 12.1193 66.2502C9.93317 61.1779 8.83872 55.7613 8.83594 50.0002C8.83316 44.2391 9.92761 38.8224 12.1193 33.7502C14.3109 28.6779 17.279 24.2682 21.0234 20.521C24.7679 16.7738 29.1776 13.8057 34.2526 11.6168C39.3276 9.42794 44.7443 8.3335 50.5026 8.3335C56.2609 8.3335 61.6776 9.42794 66.7526 11.6168C71.8276 13.8057 76.2373 16.7738 79.9818 20.521C83.7262 24.2682 86.6957 28.6779 88.8901 33.7502C91.0845 38.8224 92.1776 44.2391 92.1693 50.0002C92.1609 55.7613 91.0665 61.1779 88.8859 66.2502C86.7054 71.3224 83.7373 75.7321 79.9818 79.4793C76.2262 83.2266 71.8165 86.196 66.7526 88.3877C61.6887 90.5793 56.2721 91.6724 50.5026 91.6668ZM74.1484 73.646C67.6901 80.1043 59.8082 83.3335 50.5026 83.3335C41.1971 83.3335 33.3151 80.1043 26.8568 73.646C20.3984 67.1877 17.1693 59.3057 17.1693 50.0002C17.1693 40.6946 20.3984 32.8127 26.8568 26.3543C33.3151 19.896 41.1971 16.6668 50.5026 16.6668C59.8082 16.6668 67.6901 19.896 74.1484 26.3543C80.6068 32.8127 83.8359 40.6946 83.8359 50.0002C83.8359 59.3057 80.6068 67.1877 74.1484 73.646Z"
            fill="#0A9411"
          />
        </svg>
        <p className="align-center my-auto text-center text-[61px]">1035.5</p>
      </div>
      <div className="align-center m-auto gap-0.5">
        <p className="text-[24px] font-normal">Con tu cuenta</p>
        {/*  <Image src="/images/27.png" alt="wise" width={200} height={70} />*/}
        <Image src="/images/28.png" alt="wise" width={200} height={70} />
        <p className="text-[24px] font-normal">a la cuenta</p>
        {/*<Image src="/images/25.png" alt="payoner" width={200} height={70} />*/}
        <Image src="/images/26.png" alt="payoner" width={200} height={70} />
      </div>
      <h2 className="text-center text-[36px] font-normal">¿Cómo fue tu experiencia en SwaplyAR?</h2>
      <div className="cursor flex justify-center">
        {[...Array(5)].map((_, index) => (
          <StarIcon
            key={index}
            onMouseOver={() => setHoverIndex(index)}
            onMouseLeave={() => setHoverIndex(null)}
            index={index}
          />
        ))}
      </div>
    </main>
  );
};

export default SolicitudFinalizada;
