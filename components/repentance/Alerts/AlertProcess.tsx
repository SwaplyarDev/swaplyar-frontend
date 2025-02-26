import React from 'react';
import { AlertsProps } from '@/types/repentance/repentance';
import Swal from 'sweetalert2';
import { createRoot } from 'react-dom/client';
import ReactDOMServer from 'react-dom/server';
import { proccessIcon, proccessIconDark } from '@/utils/assets/imgDatabaseCloudinary';
import Arrow from '@/components/ui/Arrow/Arrow';
import { createRegret } from '@/actions/repentance/repentanceForm.action';
import AlertIncorrect from './AlertIncorrect';
import AlertError from './AlertError';
import clsx from 'clsx';
import AlertSuccess from './AlertSuccess';
import { info } from 'console';
import PopUp from '@/components/ui/PopUp/PopUp';

const AlertProcess = async ({
  isDark,
  toggleTooltip,
  setIsTooltipVisible,
  transaction_id,
  dataToSend,
  setIsLoading,
}: AlertsProps): Promise<void> => {
  const handleStatusChange = async () => {
    try {
      if (dataToSend) {
        const response: any = await createRegret(dataToSend);
        console.log(response);
        setIsLoading(false);

        if (response.status === 404) {
          PopUp({
            icon: 'warning',
            title: 'Algunos de los datos son incorrectos por favor verifique los datos ingresados e intente nuevamente',
            isDark: isDark,
          });
        }

        if (response.status === 400) {
          PopUp({
            icon: 'error',
            title: 'Esta solicitud ya genero una alerta de cancelacion y/o reembolso',
            isDark: isDark,
          });
        }

        if (response.ok === true) {
          PopUp({
            icon: 'success',
            title: 'Solicitud de cancelamiento realizada con éxito',
            isDark: isDark,
          });
        }
      }
    } catch (error: any) {
      setIsLoading(false);
    }
  };

  Swal.fire({
    icon: 'info',
    html: ReactDOMServer.renderToString(
      <>
        <div id="back-button-container"></div>
        <div className="flex flex-col items-center gap-2.5 px-[20px]">
          <h2 className="text-2xl">
            la solicitud <span className="font-bold">#{transaction_id}</span> se encuentra en proceso.
          </h2>
          <p className="mb-7 text-start text-base">
            <span className="font-bold">¿Desea cancelarla?</span> El reembolso se devolverá a la cuenta de origen
            utilizada para esta operación.
            <br />
            <br />
            Nota: Si la transferencia ya se ha completado, no será posible procesar un reembolso.
          </p>
          <div className="flex w-full justify-between">
            <div id="back-button-container2"></div>
            <div id="back-button-container3" className="flex w-full max-w-[200px] justify-end"></div>
          </div>
        </div>
      </>,
    ),
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
      const backElement3 = document.getElementById('back-button-container3');
      if (backElement3) {
        const root = createRoot(backElement3);
        root.render(
          <button
            onClick={() => {
              handleStatusChange();
              Swal.close();
            }}
            className={clsx(
              isDark ? 'buttonSecondDark dark:text-lightText' : 'buttonSecond',
              'relative m-1 min-h-[48px] w-full max-w-[177px] items-center justify-center rounded-3xl border border-buttonsLigth bg-buttonsLigth p-3 font-titleFont font-semibold text-darkText dark:border-darkText dark:bg-darkText',
            )}
          >
            Si, Cancelar
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

export default AlertProcess;
