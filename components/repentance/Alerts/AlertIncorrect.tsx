import Arrow from '@/components/ui/Arrow/Arrow';
import IncorrectIcon from '@/components/ui/IncorrectIcon/IncorrectIcon';
import { AlertsProps } from '@/types/repentance/repentance';
import React from 'react';
import { createRoot } from 'react-dom/client';
import Swal from 'sweetalert2';

const AlertIncorrect = async ({ isDark }: AlertsProps): Promise<void> => {
  Swal.fire({
    title: '',
    html: `
          <div style="display: flex; flex-direction: column; align-items: center;">
            <div id="incorrect-container" style="margin-bottom: 20px;"></div>
            <p class="text-left w-full"><strong>Alguno de los datos son incorrectos</strong></p>
            <p class="text-left w-full py-3">Por favor verifique los datos ingresados e intente nuevamente.</p>
            
            <div id="button-container" style="text-align: center;"></div>
          </div>
        `,
    didRender: () => {
      const incorrectContainer = document.getElementById('incorrect-container');
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
          </div>,
        );
        if (incorrectContainer) {
          const root = createRoot(incorrectContainer);
          root.render(<IncorrectIcon size={100} isDark={isDark} />);
        }
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
