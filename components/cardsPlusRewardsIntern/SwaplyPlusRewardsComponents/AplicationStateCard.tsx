import React from 'react';
import Link from 'next/link';
type AplicationProps = {
  className: string;
  text1: string;
  text2: string;
  colorSVG: string;
};

const AplicationStateCard: React.FC<AplicationProps> = ({ className, text1, text2, colorSVG }) => {
  return (
    <div className={`mx-auto mt-10 max-w-[1200px] px-4 py-[8px] font-textFont ${className}`}>
      <div className="flex flex-col text-end">
        <h2 className="pb-[13px] text-[36px]">{text1}</h2>
        <div className="ml-auto max-w-[500px] pb-[15px] font-light">{text2}</div>

        <div className="flex items-center justify-between">
          <div className="flex items-center text-[20px] font-light">
            <Link href={'/'} className="flex">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 12L11 6M5 12L11 18M5 12L23 12"
                  stroke={`${colorSVG}`}
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <span className="ml-2">Volver al home</span>{' '}
            </Link>
          </div>

          <p className="bottom-0 text-[21px] underline decoration-1">¡No dudes en contactarnos! </p>
        </div>
      </div>
    </div>
  );
};

export default AplicationStateCard;
