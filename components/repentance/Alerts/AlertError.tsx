import Arrow from '@/components/ui/Arrow/Arrow';
import ButtonAlertBack from '@/components/ui/ButtonAlertBack/ButtonAlertBack';
import ErrorIcon from '@/components/ui/ErrorIcon/ErrorIcon';
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
            <p class="text-center font-bold w-full text-3xl">Error del servidor</p>
            <p class="text-center w-full my-3 text-lg">Intente mas tarde</p>
            <div id="button-container"></div>
          </div>
        `,
    didRender: () => {
      const incorrectContainer = document.getElementById('incorrect-container');
      const backElement = document.getElementById('button-container');
      if (backElement) {
        const root = createRoot(backElement);
        root.render(
          <div className="flex w-full items-center justify-between gap-4 pt-5">
            <ButtonAlertBack isDark={isDark} />
          </div>,
        );
        if (incorrectContainer) {
          const root = createRoot(incorrectContainer);
          root.render(<ErrorIcon size={100} isDark={isDark} />);
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
