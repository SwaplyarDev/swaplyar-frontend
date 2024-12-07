import WarningIcon from '@/components/ui/WarningIcon/WarningIcon';
import { AlertsProps } from '@/types/repentance/repentance';
import React from 'react';
import { createRoot } from 'react-dom/client';
import Swal from 'sweetalert2';

const AlertDuplication = async ({ isDark }: AlertsProps): Promise<void> => {
  Swal.fire({
    didRender: () => {
      const warningContainer = document.getElementById('warning-container');
      if (warningContainer) {
        const root = createRoot(warningContainer);
        root.render(<WarningIcon isDark={isDark} />);
      }
    },
    title: '',
    html: `
      <div class="flex flex-col items-center justify-center bg-[#ffffff] dark:bg-[#454545] gap-4 rounded-xl px-4 pt-3 xs-phone:py-3 max-w-[467.45px] w-full">
        <div id="warning-container" class="flex justify-center mb-4"></div>
        <p class="text-xl font-bold text-center pb-3 ${isDark ? 'text-white' : 'text-black'}">
          Esta solicitud ya genero una alerta de cancelacion o reembolso.
        </p>
        <button id="back-button" 
          class="${isDark ? 'buttonSecondDark text-white border-white' : 'buttonSecond text-buttonsLigth border-black'}
            relative m-1 h-[48px] items-center justify-center rounded-3xl border border-buttonsLigth p-3 hover:bg-transparent dark:border-darkText dark:hover:bg-transparent pb-2">
          ← Volver
        </button>
      </div>
    `,
    customClass: {
      popup: 'confirmAlert',
    },
    showConfirmButton: false,
    showCancelButton: false,
    background: isDark ? 'rgb(69 69 69)' : '#ffffff',
    color: isDark ? '#ffffff' : '#000000',
    allowOutsideClick: true,
    allowEscapeKey: false,
    allowEnterKey: false,
  });

  document.addEventListener('click', (e) => {
    if ((e.target as HTMLElement).id === 'back-button') {
      Swal.close();
    }
  });
};

export default AlertDuplication;
