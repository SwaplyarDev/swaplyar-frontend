
import Tick from "@/components/ui/Tick/Tick";
import { AlertsProps } from "@/types/repentance/repentance";
import { createRoot } from "react-dom/client";
import Swal from "sweetalert2";

const AlertSuccess = async ({isDark}:AlertsProps): Promise<void> => {
    Swal.fire({
        didRender: () => {
          const tickContainer = document.getElementById('tick-container');
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
        },
        title: '',
        html: `
              <div class="flex flex-col items-center justify-center bg-[#ffffff] dark:bg-[#454545]  rounded-xl px-[15px] py-5 xs-phone:py-[10px] w-full">
                <div id="tick-container" class="flex items-center justify-center mb-4"></div>
                <h2 class="text-2xl text-[#252526] dark:text-[#ebe7e0] mb-4">Solicitud realizada con éxito</h2>
                <button id="back-button" 
          class="${isDark 
            ? 'buttonSecondDark text-white border-white' 
            : 'buttonSecond text-buttonsLigth border-black'}
            relative m-1 h-[48px] flex flex-wrap align-center items-center justify-center rounded-3xl border border-buttonsLigth p-3 hover:bg-transparent dark:border-darkText dark:hover:bg-transparent pb-2">
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
      return;
};

export default AlertSuccess;