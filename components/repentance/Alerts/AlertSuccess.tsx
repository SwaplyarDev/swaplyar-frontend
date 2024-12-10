import Arrow from '@/components/ui/Arrow/Arrow';
import Tick from '@/components/ui/Tick/Tick';
import { AlertsProps } from '@/types/repentance/repentance';
import { createRoot } from 'react-dom/client';
import Swal from 'sweetalert2';

const AlertSuccess = async ({ isDark }: AlertsProps): Promise<void> => {
  Swal.fire({
    didRender: () => {
      const tickContainer = document.getElementById('tick-container');
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
        if (tickContainer) {
          const root = createRoot(tickContainer);
          root.render(
            <div
              style={{
                backgroundColor: isDark ? '#FCFBFA' : '#414244',
                borderRadius: '50%',
                padding: '10px',
              }}
            >
              <Tick color={isDark ? '#414244' : '#FCFBFA'} size="70px" />
            </div>,
          );
        }
      }
    },
    title: '',
    html: `
              <div class="flex flex-col items-center justify-center bg-[#ffffff] dark:bg-[#454545]  rounded-xl px-[15px] py-5 xs-phone:py-[10px] w-full">
                <div id="tick-container" class="flex items-center justify-center mb-4"></div>
                <h2 class="text-2xl text-[#252526] dark:text-[#ebe7e0] mb-4">Solicitud realizada con éxito</h2>
                <div id="button-container"></div>
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
  return;
};

export default AlertSuccess;
