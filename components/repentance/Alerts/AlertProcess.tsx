'use client';
import React from 'react';
import Arrow from '@/components/ui/Arrow/Arrow';
import { AlertProcessProps } from '@/types/repentance/repentance';
import Swal from 'sweetalert2';
import { createRoot } from 'react-dom/client';

const AlertProcess = async ({
  isDark,
  formData,
  isLoading,
  onSend,
}: AlertProcessProps & { onSend: () => void }): Promise<{ isConfirmed: boolean }> => {
  return await Swal.fire({
    didRender: () => {
      const backElement = document.getElementById('button-container');
      if (backElement) {
        const root = createRoot(backElement);
        root.render(
          <div className="flex w-full items-center justify-between gap-4 pt-5">
            <button
              onClick={() => Swal.close()}
              className={`${
                isDark ? 'buttonSecondDark' : 'buttonSecond'
              } group relative m-1 flex h-[42px] min-w-[150pxpx] items-center justify-center gap-2 rounded-3xl border border-buttonsLigth p-3 text-buttonsLigth hover:bg-transparent dark:border-darkText dark:text-darkText dark:hover:bg-transparent xs:min-w-[150px]`}
            >
              <div className="relative h-5 w-5 overflow-hidden">
                <div className="absolute left-0 transition-all ease-in-out group-hover:left-1">
                  <Arrow color={isDark ? '#ebe7e0' : '#012c8a'} />
                </div>
              </div>
              <p className="hidden xs:inline-block">Volver</p>
            </button>
            <button
              disabled={isLoading}
              onClick={() => {
                // Llamar la función onSend para enviar los datos
                onSend();
                Swal.close();
              }}
              className={`${isDark ? 'buttonSecondDark' : 'buttonSecond'} flex h-[42px] min-w-[150px] items-center justify-center rounded-3xl border border-buttonsLigth bg-buttonsLigth px-4 text-white hover:bg-buttonsLigth dark:border-darkText dark:bg-darkText dark:text-lightText`}
            >
              {isLoading ? 'Cargando...' : 'Enviar'}
            </button>
          </div>,
        );
      }

      // Agregar el event listener
      document.addEventListener('click', closeOnBackClick);
    },
    willClose: () => {
      // Eliminar el event listener al cerrar el modal
      document.removeEventListener('click', closeOnBackClick);
    },
    title: `<h1 style="color: ${isDark ? '#ffffff' : '#000000'};">La solicitud #${formData.transaction_id} se encuentra en proceso</h1>`,
    html: `<div style="color: ${isDark ? '#ffffff' : '#000000'}; text-align: left;" >
                <p>¿Desea cancelarla? El reembolso se devolverá a la cuenta de origen utilizada para esta operación.</p>
                <p style="padding-top: 10px">Nota: Si la transferencia ya se ha completado, no será posible procesar un reembolso.</p>
                <div id="button-container"></div>
              </div>`,
    icon: 'warning',
    background: isDark ? 'rgb(69 69 69)' : '#ffffff',
    showConfirmButton: false,
    showCancelButton: false,
    buttonsStyling: false,
    customClass: {
      actions: 'hidden', // Ocultar los botones estándar de SweetAlert2
    },
  }).then((result) => {
    return { isConfirmed: result.isConfirmed };
  });

  function closeOnBackClick(e: MouseEvent) {
    if ((e.target as HTMLElement).id === 'button-container') {
      Swal.close();
    }
  }
};

export default AlertProcess;
