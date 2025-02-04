'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import nube1 from '@/public/images/nube1.svg';
import nube2 from '@/public/images/nube2.svg';
import Cloud from '../ui/Cloud/Cloud';

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
      className={`h-[50px] w-[50px] cursor-pointer ${index <= (hoverIndex ?? -1) ? 'fill-[rgba(255,217,0,1)]' : 'fill-[rgba(188,188,188,1)]'} md:h-[100px] md:w-[100px]`}
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
    <div className="mx-auto flex w-full max-w-screen-phone flex-col gap-4 px-4 py-10 xs-mini-phone2:max-w-screen-tablet md:max-w-screen-desktop md:gap-6 md:px-8 lg2:px-4">
      <div className="-z-30">
        <Cloud classes="top-0 -left-52 top-60 w-[629px] h-[451px] min-w-[629px]" src={nube2} alt="Nube 2" />
        <Cloud classes="top-0 -left-72 top-[500px] w-[612px] h-[438px] min-w-[612px]" src={nube2} alt="Nube 2" />
        <Cloud classes="top-0 -left-60 top-0 w-[669px] h-[399px] min-w-[669px]" src={nube1} alt="Nube 1" />
      </div>

      <div className="-z-30">
        <Cloud classes="top-0 -right-20 top-72 w-[371px] h-[266px] min-w-[371px]" src={nube2} alt="Nube 2" />
        <Cloud classes="top-0 -right-56 top-0 w-[559px] h-[400px] min-w-[559px]" src={nube2} alt="Nube 2" />
        <Cloud classes="top-0 -right-60 top-[460px] w-[471px] h-[281px] min-w-[471px]" src={nube1} alt="Nube 1" />
      </div>
      <h1 className="text-center font-titleFont text-[38px] font-medium lg2:text-[40px]">
        Solicitud finalizada con exito. <br /> Gracias por Elegir SwaplyAr
      </h1>
      <p className="text-center font-titleFont text-[40px] font-medium">#123456789</p>
      <div className="flex flex-col items-center md:flex-row md:justify-center md:gap-[9px]">
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
        <p className="text-center font-titleFont text-[61px] font-semibold">1035,50</p>
      </div>
      <div className="flex flex-col items-center">
        <p className="font-textFont text-[21px]">Con tu cuenta</p>
        <Image src="/images/28.png" alt="wise" width={200} height={70} />
        <p className="font-textFont text-[21px]">a la cuenta</p>
        <Image src="/images/26.png" alt="payoner" width={200} height={70} />
      </div>
      <h2 className="mx-auto max-w-[592px] text-center font-textFont text-[36px]">
        ¿Cómo fue tu experiencia en SwaplyAR?
      </h2>
      <div className="cursor flex w-full justify-center gap-2">
        {[...Array(5)].map((_, index) => (
          <StarIcon
            key={index}
            onMouseOver={() => setHoverIndex(index)}
            onMouseLeave={() => setHoverIndex(null)}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default SolicitudFinalizada;
