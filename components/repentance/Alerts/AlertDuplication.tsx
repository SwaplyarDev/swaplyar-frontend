import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import WarningIcon from '@/components/ui/WarningIcon/WarningIcon';
import React from 'react';
import { createRoot } from 'react-dom/client';
import Swal from 'sweetalert2';

const AlertDuplication = () => {
    const { isDark } = useDarkTheme();
    // Mostrar alerta si ya existe
    Swal.fire({
        didRender: () => {
          const warningContainer =
            document.getElementById('warning-container');
          if (warningContainer) {
            const root = createRoot(warningContainer);
            root.render(<WarningIcon isDark={isDark} />);
          }
        },
        title: '',
        html: `
        <div className="flex flex-col items-center justify-center bg-[#ffffff] dark:bg-[#454545] gap-[15px] rounded-xl px-[15px] py-5 xs-phone:py-[10px] max-w-[467.45px] w-full">
          <div id="warning-container" className="flex items-center justify-center mb-4"></div>
          <h2 className="text-2xl text-[#252526] dark:text-[#ebe7e0] mb-4">Esta solicitud ya genero una alerta de cancelación o reembolso</h2>
          <button id="back-button"  className="${isDark ? 'buttonSecondDark text-white' : 'buttonSecond text-buttonsLigth'} relative m-1 h-[48px] items-center justify-center rounded-3xl border border-buttonsLigth p-3 hover:bg-transparent dark:border-darkText dark:hover:bg-transparent">
            ← Volver
          </button>
        </div>
      `,
        customClass: {
          popup: 'confirmAlert',
        },
        showConfirmButton: false,
        showCancelButton: false,
        background: 'transparent',
        color: isDark ? '#ffffff' : '#000000',
        allowOutsideClick: true,
        allowEscapeKey: false,
        allowEnterKey: false,
        preConfirm: () => {
            return 'AlertDuplication';
          },
      });
      document.addEventListener('click', (e) => {
        if ((e.target as HTMLElement).id === 'back-button') {
          Swal.close();
        }
      });
return;
};

export default AlertDuplication;