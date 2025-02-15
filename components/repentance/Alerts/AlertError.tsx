import Arrow from '@/components/ui/Arrow/Arrow';
import { AlertsProps } from '@/types/repentance/repentance';
import React from 'react';
import { createRoot } from 'react-dom/client';
import Swal from 'sweetalert2';
import ReactDOMServer from 'react-dom/server';
import { alertSign, alertSignDark } from '@/utils/assets/img-database';

const AlertError = async ({ isDark, toggleTooltip, setIsTooltipVisible, setIsLoading }: AlertsProps): Promise<void> => {
  Swal.fire({
    imageUrl: !isDark ? alertSign : alertSignDark,
    imageWidth: 115,
    imageHeight: 100,
    html: ReactDOMServer.renderToString(
      <>
        <div id="back-button-container"></div>
        <div className="flex flex-col items-center gap-12 px-[38px]">
          <p className="text-2xl">Esta solicitud ya genero una alerta de cancelacion y/o reembolso</p>
          <div id="back-button-container2"></div>
        </div>
      </>,
    ),
    customClass: {
      image: 'swal-custom-image2',
      popup: 'my-popup',
    },
    width: '400px',
    showConfirmButton: false,
    showCancelButton: false,
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
      const backElement2 = document.getElementById('back-button-container2');
      if (backElement2) {
        const root = createRoot(backElement2);
        root.render(
          <button
            onClick={() => Swal.close()}
            className={`group relative m-1 flex h-[46px] max-w-[120px] items-center justify-center gap-2 rounded-3xl border border-buttonsLigth p-3 font-textFont text-lg font-light text-buttonsLigth hover:bg-transparent dark:border-darkText dark:text-darkText dark:hover:bg-transparent`}
          >
            <div className="relative h-5 w-5 overflow-hidden">
              <div className="absolute left-0 transition-all ease-in-out group-hover:left-1">
                <Arrow color={isDark ? '#ebe7e0' : '#012c8a'} />
              </div>
            </div>
            Volver
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
  document.addEventListener('click', (e) => {
    if ((e.target as HTMLElement).id === 'back-button') {
      Swal.close();
    }
  });
};

export default AlertError;
