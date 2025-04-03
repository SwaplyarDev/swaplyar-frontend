import React from 'react';
import Image from 'next/image';
import Image1 from '@/public/images/plus-rewards-logo.png';

const CardYellow = () => {
  return (
    <div>
      <div className="relative z-10 mx-auto flex h-[210px] w-[358px] overflow-hidden rounded-[16px] bg-opacity-60 font-textFont text-[#000] sm:h-[288px] sm:w-[490px]">
        <div
          className="absolute -top-[225px] -z-10 h-[700px] w-[540px] rotate-[80deg] rounded-[240px]"
          style={{ background: 'linear-gradient(19deg, #FFEA04 0%, #C3B036 60%, #DF0 100%)', opacity: '0.6' }}
        ></div>

        <div
          className="absolute right-[70px] top-[42px] -z-10 h-[700px] w-[540px] rotate-[48deg] rounded-[240px]"
          style={{ background: 'linear-gradient(19deg, #FFEA04 0%, #C3B036 60%, #D4DC28 100%)', opacity: '0.6' }}
        ></div>

        <div
          className="absolute right-[76px] top-[43px] -z-0 h-[700px] w-[540px] rotate-[60deg] rounded-[240px] opacity-60"
          style={{ background: 'linear-gradient(19deg, #FFEA04 0%, #C3B036 60%, #D4DC28 100%)', opacity: '0.6' }}
        ></div>
        <div className="absolute m-[14px] h-full">
          <Image src={Image1} alt="asd" className="w-[182px] sm:w-[250px]" />
        </div>

        <div className="absolute right-0 m-[14px] gap-1">
          <p className="text-[13px] font-light sm:text-[18px]">Tu Codigo de Miembro:</p>
          <p className="text-end text-[15px] sm:text-[21px]">2448XPAR</p>
        </div>

        <div className="absolute right-0 top-[115px] flex w-full justify-center text-[#CE1818] sm:top-[172.5px]">
          <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="none">
            <path
              d="M27.7062 6.55859L45.6937 37.7128C45.968 38.1878 46.1124 38.7267 46.1124 39.2752C46.1124 39.8238 45.968 40.3627 45.6938 40.8377C45.4195 41.3128 45.025 41.7073 44.55 41.9816C44.0749 42.2558 43.536 42.4002 42.9875 42.4003H7.01249C6.46395 42.4002 5.92507 42.2558 5.45002 41.9816C4.97497 41.7073 4.58049 41.3128 4.30622
 40.8377C4.03196 40.3627 3.88757 39.8238 3.88757 39.2752C3.88758 38.7267 4.03197 38.1878 4.30624 37.7128L22.2937 6.55859C23.4958 4.47526 26.5021 4.47526 27.7062 6.55859ZM25 31.2503C24.4475 31.2503 23.9176 31.4698 23.5269 31.8605C23.1362 32.2512 22.9167 32.7811 22.9167 33.3336C22.9167 33.8861 23.1362 34.416 23.5269 34.8067C23.9176 35.1974 24.4475 35.4169 25 35.4169C25.5525 35.4169 26.0824 35.1974 26.4731 34.8067C26.8638 34.416 27.0833 33.8861 27.0833 33.3336C27.0833 32.7811 26.8638 32.2512 26.4731 31.8605C26.0824 31.4698 25.5525 31.2503 25 31.2503ZM25 16.6669C24.4897 16.667 23.9972 16.8543 23.6159 17.1934C23.2346 17.5325 22.9909 17.9997 22.9312 18.5065L22.9167 18.7503V27.0836C22.9172 27.6146 23.1206 28.1253 23.4851 28.5114C23.8496 28.8976 24.3478 29.1299 24.8779 29.161C25.408 29.1922 25.93 29.0197 26.3371 28.6789C26.7443 28.3381 27.006 27.8546 27.0687 27.3273L27.0833 27.0836V18.7503C27.0833 18.1977 26.8638 17.6678 26.4731 17.2771C26.0824 16.8864 25.5525 16.6669 25 16.6669Z"
              fill="#CE1818"
            />
          </svg>
          <div>
            <p className="w-full text-[13px] font-semibold sm:text-[18px]"> TU CUENTA NO ESTA VERIFICADA</p>
            <p className="text-[9px] sm:text-[12px]"> Necesitas cargar la documenta para la verificación</p>
          </div>
        </div>
        <button
          id="submit-25456"
          className={
            'rounded-3sm absolute bottom-3 left-1/2 mt-4 h-[40px] w-[177px] -translate-x-1/2 border border-buttonsLigth bg-buttonsLigth font-titleFont font-semibold text-white hover:bg-buttonsLigth'
          }
        >
          Verificar ahora
        </button>
      </div>
    </div>
  );
};

export default CardYellow;
