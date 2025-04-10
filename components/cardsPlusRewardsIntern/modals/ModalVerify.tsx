import React, { useEffect } from 'react';
import CardVerify from '@/components/cardsPlusRewardsIntern/SwaplyPlusRewardsComponents/CardVerify';

export type ModalProps = {
  showVerify: boolean;
  setShowVerify: React.Dispatch<React.SetStateAction<boolean>>;
};

const ModalVerify: React.FC<ModalProps> = ({ showVerify, setShowVerify }) => {
  useEffect(() => {
    // Bloquea el scroll del body al montar
    window.scrollTo(0, 0);
    document.body.style.overflow = 'hidden';

    // Vuelve a activar el scroll al desmontar
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-50 font-textFont text-[16px]"
      onClick={() => {
        setShowVerify(false);
      }}
    >
      <div
        className="relative m-2 flex h-auto max-h-[670px] w-auto max-w-[592px] flex-col overflow-y-auto rounded-2xl bg-[#FFFFFB] px-[16px] py-[30px] sm:px-0"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="w-full px-[23px] text-[32px] font-light sm:text-[36px]">Verificación</h1>
        <button
          className="absolute right-0 top-0 mr-3 text-[32px]"
          onClick={() => {
            setShowVerify(false);
          }}
        >
          X
        </button>

        <div className="flex justify-center gap-[7px] text-[#CE1818]">
          <svg xmlns="http://www.w3.org/2000/svg" width="51" height="50" viewBox="0 0 51 50" fill="none">
            <path
              d="M28.2064 6.55835L46.1939 37.7125C46.4681 38.1876 46.6125 38.7264 46.6125 39.275C46.6125 39.8235 46.4682 40.3624 46.1939 40.8375C45.9196 41.3125 45.5251 41.707 45.0501 41.9813C44.575 42.2556 44.0362 42.4 43.4876 42.4H7.51262C6.96407 42.4 6.42519 42.2556 5.95014 41.9813C5.47509 41.707 5.08061 41.3125 4.80635 40.8375C4.53208 40.3624 4.38769 39.8235 4.3877 39.275C4.3877 38.7264 4.53209 38.1876 4.80637 37.7125L22.7939 6.55835C23.996 4.47502 27.0022 4.47502 28.2064 6.55835ZM25.5001 31.25C24.9476 31.25 24.4177 31.4695 24.027 31.8602C23.6363 32.2509 23.4168 32.7808 23.4168 33.3333C23.4168 33.8859 23.6363 34.4158 24.027 34.8065C24.4177 35.1972 24.9476 35.4167 25.5001 35.4167C26.0527 35.4167 26.5826 35.1972 26.9733 34.8065C27.364 34.4158 27.5835 33.8859 27.5835 33.3333C27.5835 32.7808 27.364 32.2509 26.9733 31.8602C26.5826 31.4695 26.0527 31.25 25.5001 31.25ZM25.5001 16.6667C24.9898 16.6667 24.4973 16.8541 24.116 17.1932C23.7347 17.5323 23.4911 17.9995 23.4314 18.5063L23.4168 18.75V27.0833C23.4174 27.6143 23.6207 28.1251 23.9852 28.5112C24.3497 28.8973 24.8479 29.1297 25.378 29.1608C25.9081 29.1919 26.4301 29.0194 26.8373 28.6786C27.2445 28.3378 27.5062 27.8544 27.5689 27.3271L27.5835 27.0833V18.75C27.5835 18.1975 27.364 17.6676 26.9733 17.2769C26.5826 16.8862 26.0527 16.6667 25.5001 16.6667Z"
              fill="#CE1818"
            />
          </svg>
          <div className="flex-col justify-center">
            <h2 className="text-[18px] font-semibold">TU CUENTA NO ESTA VERIFICADA</h2>
            <h3 className="text-[12px]">Necesitas cargar la documenta para la verificación</h3>
          </div>
        </div>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="auto"
          height="2"
          viewBox="0 0 772 2"
          fill="none"
          className="mx-auto mt-[18px]"
        >
          <path d="M1 1H771" stroke="#012A8E" strokeWidth="8" strokeLinecap="round" />
        </svg>
        <div className="relative mx-auto max-w-[428px] justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
            className="absolute right-0"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M27.1875 15C27.1875 18.2323 25.9035 21.3323 23.6179 23.6179C21.3323 25.9035 18.2323 27.1875 15 27.1875C11.7677 27.1875 8.66774 25.9035 6.38214 23.6179C4.09654 21.3323 2.8125 18.2323 2.8125 15C2.8125 11.7677 4.09654 8.66774 6.38214 6.38214C8.66774 4.09654 11.7677 2.8125 15 2.8125C18.2323 2.8125 21.3323 4.09654 23.6179 6.38214C25.9035 8.66774 27.1875 11.7677 27.1875 15ZM30 15C30 18.9782 28.4196 22.7936 25.6066 25.6066C22.7936 28.4196 18.9782 30 15 30C11.0218 30 7.20644 28.4196 4.3934 25.6066C1.58035 22.7936 0 18.9782 0 15C0 11.0218 1.58035 7.20644 4.3934 4.3934C7.20644 1.58035 11.0218 0 15 0C18.9782 0 22.7936 1.58035 25.6066 4.3934C28.4196 7.20644 30 11.0218 30 15ZM11.7188 19.6875C11.3458 19.6875 10.9881 19.8357 10.7244 20.0994C10.4607 20.3631 10.3125 20.7208 10.3125 21.0938C10.3125 21.4667 10.4607 21.8244 10.7244 22.0881C10.9881 22.3518 11.3458 22.5 11.7188 22.5H18.2812C18.6542 22.5 19.0119 22.3518 19.2756 22.0881C19.5393 21.8244 19.6875 21.4667 19.6875 21.0938C19.6875 20.7208 19.5393 20.3631 19.2756 20.0994C19.0119 19.8357 18.6542 19.6875 18.2812 19.6875H16.4062V13.125H13.125C12.752 13.125 12.3944 13.2732 12.1306 13.5369C11.8669 13.8006 11.7188 14.1583 11.7188 14.5312C11.7188 14.9042 11.8669 15.2619 12.1306 15.5256C12.3944 15.7893 12.752 15.9375 13.125 15.9375H13.5938V19.6875H11.7188ZM15 11.25C15.4973 11.25 15.9742 11.0525 16.3258 10.7008C16.6775 10.3492 16.875 9.87228 16.875 9.375C16.875 8.87772 16.6775 8.40081 16.3258 8.04918C15.9742 7.69754 15.4973 7.5 15 7.5C14.5027 7.5 14.0258 7.69754 13.6742 8.04918C13.3225 8.40081 13.125 8.87772 13.125 9.375C13.125 9.87228 13.3225 10.3492 13.6742 10.7008C14.0258 11.0525 14.5027 11.25 15 11.25Z"
              fill="#012A8E"
            />
          </svg>
          <h2 className="mt-[6px] text-[18px] font-normal">Prueba de Identidad</h2>
          <p className="mx-auto text-[14px]">
            Sube una foto de tu pasaporte, licencia o identificación oficial emitida por el gobierno.
          </p>
          <div className="mt-[6px] flex flex-col items-center justify-center gap-[10px] sm:flex-row sm:gap-10">
            <CardVerify text={'FRENTE'} />
            <div className="hidden sm:block">
              <svg xmlns="http://www.w3.org/2000/svg" width="2" height="112" viewBox="0 0 2 112" fill="none">
                <path d="M1 1.96301L1 110.037" stroke="#012A8E" stroke-width="2" stroke-linecap="round" />
              </svg>
            </div>

            <CardVerify text={'DORSO'} />
          </div>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="auto"
          height="2"
          viewBox="0 0 772 2"
          fill="none"
          className="mx-auto mt-[18px]"
        >
          <path d="M1 1H771" stroke="#012A8E" strokeWidth="8" strokeLinecap="round" />
        </svg>
        <div className="relative mx-auto max-w-[428px] justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
            className="absolute right-0"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M27.1875 15C27.1875 18.2323 25.9035 21.3323 23.6179 23.6179C21.3323 25.9035 18.2323 27.1875 15 27.1875C11.7677 27.1875 8.66774 25.9035 6.38214 23.6179C4.09654 21.3323 2.8125 18.2323 2.8125 15C2.8125 11.7677 4.09654 8.66774 6.38214 6.38214C8.66774 4.09654 11.7677 2.8125 15 2.8125C18.2323 2.8125 21.3323 4.09654 23.6179 6.38214C25.9035 8.66774 27.1875 11.7677 27.1875 15ZM30 15C30 18.9782 28.4196 22.7936 25.6066 25.6066C22.7936 28.4196 18.9782 30 15 30C11.0218 30 7.20644 28.4196 4.3934 25.6066C1.58035 22.7936 0 18.9782 0 15C0 11.0218 1.58035 7.20644 4.3934 4.3934C7.20644 1.58035 11.0218 0 15 0C18.9782 0 22.7936 1.58035 25.6066 4.3934C28.4196 7.20644 30 11.0218 30 15ZM11.7188 19.6875C11.3458 19.6875 10.9881 19.8357 10.7244 20.0994C10.4607 20.3631 10.3125 20.7208 10.3125 21.0938C10.3125 21.4667 10.4607 21.8244 10.7244 22.0881C10.9881 22.3518 11.3458 22.5 11.7188 22.5H18.2812C18.6542 22.5 19.0119 22.3518 19.2756 22.0881C19.5393 21.8244 19.6875 21.4667 19.6875 21.0938C19.6875 20.7208 19.5393 20.3631 19.2756 20.0994C19.0119 19.8357 18.6542 19.6875 18.2812 19.6875H16.4062V13.125H13.125C12.752 13.125 12.3944 13.2732 12.1306 13.5369C11.8669 13.8006 11.7188 14.1583 11.7188 14.5312C11.7188 14.9042 11.8669 15.2619 12.1306 15.5256C12.3944 15.7893 12.752 15.9375 13.125 15.9375H13.5938V19.6875H11.7188ZM15 11.25C15.4973 11.25 15.9742 11.0525 16.3258 10.7008C16.6775 10.3492 16.875 9.87228 16.875 9.375C16.875 8.87772 16.6775 8.40081 16.3258 8.04918C15.9742 7.69754 15.4973 7.5 15 7.5C14.5027 7.5 14.0258 7.69754 13.6742 8.04918C13.3225 8.40081 13.125 8.87772 13.125 9.375C13.125 9.87228 13.3225 10.3492 13.6742 10.7008C14.0258 11.0525 14.5027 11.25 15 11.25Z"
              fill="#012A8E"
            />
          </svg>
          <h2 className="mt-[6px] text-[18px] font-normal">Selfie & ID</h2>
          <p className="mx-auto text-[14px]">
            Sube una selfie sosteniendo tu pasaporte, ID u otro documento oficial en tus manos (con detalles personales
            claramente visibles).
          </p>
          <div className="mt-[6px] flex justify-center gap-10">
            <CardVerify text={'FOTO'} />
          </div>
        </div>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="auto"
          height="2"
          viewBox="0 0 772 2"
          fill="none"
          className="mx-auto mt-[18px]"
        >
          <path d="M1 1H771" stroke="#012A8E" strokeWidth="8" strokeLinecap="round" />
        </svg>
        <div className="mt-[12px] flex flex-col items-center justify-end gap-3">
          <button
            id="submit-25456"
            className={
              'rounded-3sm relative h-[39px] w-[194px] rounded-[40px] bg-[#90B0FE] font-titleFont font-semibold text-white'
            }
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalVerify;
