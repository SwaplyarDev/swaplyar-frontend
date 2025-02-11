import React, { FC, useCallback, useEffect, useState } from 'react';
import InfoIcon from '../InfoIcon/InfoIcon';
import { useDarkTheme } from '../theme-Provider/themeProvider';
import Swal from 'sweetalert2';
import Image from 'next/image';
import { comprobanteBienHecho, comprobanteMalHecho } from '@/utils/assets/img-database';
import ReactDOMServer from 'react-dom/server';
import { createRoot } from 'react-dom/client';

interface InfoStepProps {
  option?: string;
}

const InfoStep: FC<InfoStepProps> = ({ option }) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const { isDark } = useDarkTheme();
  const toggleTooltip = useCallback(() => {
    setIsTooltipVisible((prev) => !prev);
  }, []);
  useEffect(() => {
    if (option === undefined) {
      // Guardar el ancho del scroll y aplicar no-scroll
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.paddingRight = `${scrollBarWidth}px`;
      document.body.classList.add('no-scroll');

      const showTooltip = () => {
        Swal.fire({
          html: ReactDOMServer.renderToString(
            <>
              <div id="back-button-container"></div>
              <div className="flex gap-[30px] px-[38px] pt-[38px]">
                <div className="flex w-full flex-col items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="50" height="49" viewBox="0 0 50 49" fill="none">
                    <path
                      d="M25.1328 45.9375C36.9724 45.9375 46.5703 36.3396 46.5703 24.5C46.5703 12.6604 36.9724 3.0625 25.1328 3.0625C13.2932 3.0625 3.69531 12.6604 3.69531 24.5C3.69531 36.3396 13.2932 45.9375 25.1328 45.9375Z"
                      fill="#4CAF50"
                    />
                    <path
                      d="M35.9505 14.9043L22.0672 28.7876L16.3505 23.071L13.4922 25.9293L22.0672 34.5043L38.8089 17.7626L35.9505 14.9043Z"
                      fill="white"
                    />
                  </svg>
                  <Image
                    src={comprobanteBienHecho}
                    alt="Comprobante"
                    className="w-full max-w-[300px] rounded-lg"
                    width={300}
                    height={700}
                  />
                  <p className="px-2.5 text-center font-textFont text-xs text-lightText dark:text-darkText">
                    La forma correcta de como subir el comprobante
                  </p>
                </div>
                <div className="flex w-full flex-col items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="50" height="49" viewBox="0 0 50 49" fill="none">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M25.1354 4.08398C36.4095 4.08398 45.5521 13.2265 45.5521 24.5006C45.5521 35.7747 36.4095 44.9174 25.1354 44.9174C13.8613 44.9174 4.71875 35.7747 4.71875 24.5006C4.71875 13.2265 13.8613 4.08398 25.1354 4.08398ZM29.817 16.9321L25.1354 21.6138L20.4539 16.9323L17.567 19.8192L22.2485 24.5006L17.567 29.1822L20.4539 32.0691L25.1354 27.3876L29.817 32.0691L32.7039 29.1822L28.0224 24.5006L32.7039 19.8191L29.817 16.9321Z"
                      fill="#CE1818"
                    />
                  </svg>
                  <Image
                    src={comprobanteMalHecho}
                    alt="Comprobante"
                    className="w-full max-w-[300px] rounded-lg"
                    width={300}
                    height={700}
                  />
                  <p className="px-2.5 text-center font-textFont text-xs text-lightText dark:text-darkText">
                    La forma incorrecta de no subir el comprobante y esto puede atrasar su solicitud
                  </p>
                </div>
              </div>
            </>,
          ),
          showConfirmButton: false,
          background: isDark ? 'rgb(69 69 69)' : '#ffffff',
          color: isDark ? '#ffffff' : '#000000',
          preConfirm: () => {
            toggleTooltip();
          },
          didRender: () => {
            const backElement = document.getElementById('back-button-container');
            if (backElement) {
              const root = createRoot(backElement);
              root.render(
                <button onClick={() => Swal.close()} className="absolute right-0 top-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <path
                      d="M30 10L10 30M10 10L30 30"
                      stroke={isDark ? '#ebe7e0' : '#252526'}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>,
              );
            }
          },
          didOpen: () => {
            const htmlContainer = Swal.getHtmlContainer();
            if (htmlContainer) {
              htmlContainer.classList.add('custom-container-payment');
            }
          },
          willClose: () => {
            setIsTooltipVisible(false);
            document.body.style.paddingRight = '0px';
            document.body.classList.remove('no-scroll');
          },
        });
      };

      showTooltip();
    }

    return () => {
      document.body.style.paddingRight = '0px';
      document.body.classList.remove('no-scroll');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [option]); // No poner las dependencias que faltan

  useEffect(() => {
    if (isTooltipVisible) {
      // Guardar el ancho del scroll y aplicar no-scroll
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.paddingRight = `${scrollBarWidth}px`;
      document.body.classList.add('no-scroll');

      const showTooltip = () => {
        Swal.fire({
          html: ReactDOMServer.renderToString(
            <>
              <div id="back-button-container"></div>
              <div className="flex gap-[30px] px-[38px] pt-[38px]">
                <div className="flex w-full flex-col items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="50" height="49" viewBox="0 0 50 49" fill="none">
                    <path
                      d="M25.1328 45.9375C36.9724 45.9375 46.5703 36.3396 46.5703 24.5C46.5703 12.6604 36.9724 3.0625 25.1328 3.0625C13.2932 3.0625 3.69531 12.6604 3.69531 24.5C3.69531 36.3396 13.2932 45.9375 25.1328 45.9375Z"
                      fill="#4CAF50"
                    />
                    <path
                      d="M35.9505 14.9043L22.0672 28.7876L16.3505 23.071L13.4922 25.9293L22.0672 34.5043L38.8089 17.7626L35.9505 14.9043Z"
                      fill="white"
                    />
                  </svg>
                  <Image
                    src={comprobanteBienHecho}
                    alt="Comprobante"
                    className="w-full max-w-[300px] rounded-lg"
                    width={300}
                    height={700}
                  />
                  <p className="px-2.5 text-center font-textFont text-xs text-lightText dark:text-darkText">
                    La forma correcta de como subir el comprobante
                  </p>
                </div>
                <div className="flex w-full flex-col items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="50" height="49" viewBox="0 0 50 49" fill="none">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M25.1354 4.08398C36.4095 4.08398 45.5521 13.2265 45.5521 24.5006C45.5521 35.7747 36.4095 44.9174 25.1354 44.9174C13.8613 44.9174 4.71875 35.7747 4.71875 24.5006C4.71875 13.2265 13.8613 4.08398 25.1354 4.08398ZM29.817 16.9321L25.1354 21.6138L20.4539 16.9323L17.567 19.8192L22.2485 24.5006L17.567 29.1822L20.4539 32.0691L25.1354 27.3876L29.817 32.0691L32.7039 29.1822L28.0224 24.5006L32.7039 19.8191L29.817 16.9321Z"
                      fill="#CE1818"
                    />
                  </svg>
                  <Image
                    src={comprobanteMalHecho}
                    alt="Comprobante"
                    className="w-full max-w-[300px] rounded-lg"
                    width={300}
                    height={700}
                  />
                  <p className="px-2.5 text-center font-textFont text-xs text-lightText dark:text-darkText">
                    La forma incorrecta de no subir el comprobante y esto puede atrasar su solicitud
                  </p>
                </div>
              </div>
            </>,
          ),
          showConfirmButton: false,
          background: isDark ? 'rgb(69 69 69)' : '#ffffff',
          color: isDark ? '#ffffff' : '#000000',
          preConfirm: () => {
            toggleTooltip();
          },
          didRender: () => {
            const backElement = document.getElementById('back-button-container');
            if (backElement) {
              const root = createRoot(backElement);
              root.render(
                <button onClick={() => Swal.close()} className="absolute right-0 top-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <path
                      d="M30 10L10 30M10 10L30 30"
                      stroke={isDark ? '#ebe7e0' : '#252526'}
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>,
              );
            }
          },
          didOpen: () => {
            const htmlContainer = Swal.getHtmlContainer();
            if (htmlContainer) {
              htmlContainer.classList.add('custom-container-payment'); // Agrega tu clase
            }
          },
          willClose: () => {
            setIsTooltipVisible(false);
            document.body.style.paddingRight = '0px';
            document.body.classList.remove('no-scroll');
          },
        });
      };

      showTooltip();
    } else {
      // Restaurar el padding cuando se cierra el tooltip
      document.body.style.paddingRight = '0px';
      document.body.classList.remove('no-scroll');
    }
  }, [isTooltipVisible, isDark, toggleTooltip]);
  return (
    <button
      className="group relative"
      disabled={option === 'pix' || option === 'cripto'}
      onClick={() => setIsTooltipVisible(true)}
      type="button"
    >
      <InfoIcon />
      <div className="invisible absolute -right-5 bottom-full mb-2 w-max max-w-[281px] scale-90 rounded-lg bg-buttonsLigth p-[10px] text-sm text-white opacity-0 transition-all duration-300 ease-in-out group-hover:visible group-hover:scale-100 group-hover:opacity-100 dark:bg-custom-grayD-300 mini-phone:right-0">
        <p className="text-center font-textFont text-xs font-light text-darkText dark:text-lightText">
          {option === 'pix' ? (
            <>
              🚨 <span className="font-bold">Importante:</span> Es importante que sepas que los pagos llegarán a la
              cuenta destinataria a nombre de nuestro proveedor, y no a nombre de SwaplyAr.
            </>
          ) : option === 'cripto' ? (
            <>
              🚨 <span className="font-bold">Importante:</span> Tomate el tiempo de chequear los datos previo al envío.{' '}
              <span className="font-bold">Una vez confirmado, no habrá vuelta atrás,</span> y en caso de confundir una
              direccion, eso fondos no podrán recuperarse.
            </>
          ) : (
            <>
              🚨 <span className="font-bold">Importante:</span> Para agilizar tu solicitud, asegúrate de subir
              correctamente tu comprobante. Un error en este paso puede retrasar el proceso.
            </>
          )}
        </p>
      </div>
    </button>
  );
};

export default InfoStep;
