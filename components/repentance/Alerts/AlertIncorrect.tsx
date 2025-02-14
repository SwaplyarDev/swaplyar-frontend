import { AlertsProps } from '@/types/repentance/repentance';
import React from 'react';
import { createRoot } from 'react-dom/client';
import Swal from 'sweetalert2';
import ReactDOMServer from 'react-dom/server';
import { alertaSirena, alertaSirenaDark } from '@/utils/assets/img-database';

const AlertIncorrect = async ({ isDark, toggleTooltip, setIsTooltipVisible }: AlertsProps): Promise<void> => {
  Swal.fire({
    imageUrl: !isDark ? alertaSirena : alertaSirenaDark,
    imageWidth: 100,
    imageHeight: 100,
    html: ReactDOMServer.renderToString(
      <>
        <div id="back-button-container"></div>
        <div className="px-[38px]">
          <p className="text-2xl">
            Algunos de los datos son incorrectos por favor verifique los datos ingresados e intente nuevamente
          </p>
        </div>
      </>,
    ),
    customClass: {
      image: 'swal-custom-image',
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

export default AlertIncorrect;
