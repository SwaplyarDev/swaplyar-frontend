import IncorrectIcon from '@/components/ui/IncorrectIcon/IncorrectIcon';
import { AlertsProps } from '@/types/repentance/repentance';
import React from 'react';
import { createRoot } from 'react-dom/client';
import Swal from 'sweetalert2';

const AlertIncorrect = async ({ isDark }: AlertsProps): Promise<void> => {
  Swal.fire({
    title: 'Datos incorrectos',
    html: `
          <div style="display: flex; flex-direction: column; align-items: center;">
            <div id="incorrect-container" style="margin-bottom: 20px;"></div>
            <p class="text-left w-full">Alguno de los datos son incorrectos</p>
            <p class="text-left w-full py-3">Por favor verifique los datos ingresados e intente nuevamente.</p>
            <button id="back-button" 
          class="${isDark ? 'buttonSecondDark text-white border-white' : 'buttonSecond text-buttonsLigth border-black'}
            relative m-1 h-[48px] items-center justify-center rounded-3xl border border-buttonsLigth p-3 hover:bg-transparent dark:border-darkText dark:hover:bg-transparent pb-2">
          ← Volver
        </button>
          </div>
        `,
    didRender: () => {
      const incorrectContainer = document.getElementById('incorrect-container');
      if (incorrectContainer) {
        const root = createRoot(incorrectContainer);
        root.render(<IncorrectIcon size={100} isDark={isDark} />);
      }
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

export default AlertIncorrect;
