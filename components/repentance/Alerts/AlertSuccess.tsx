import { useDarkTheme } from "@/components/ui/theme-Provider/themeProvider";
import Tick from "@/components/ui/Tick/Tick";
import { FormData } from "@/types/repentance/repentance";
import { useState } from "react";
import { createRoot } from "react-dom/client";
import Swal from "sweetalert2";

const AlertSuccess = () => {
    const { isDark } = useDarkTheme();
    const [, setFormData] = useState<FormData>({
        transaction_id: '',
        last_name: '',
        email: '',
        phone_number: '',
        note: '',
        calling_code: { value: '', label: '', callingCode: '' },
        status: '',
      });
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
              <div className="flex flex-col items-center justify-center bg-[#ffffff] dark:bg-[#454545] gap-[15px] rounded-xl px-[15px] py-5 xs-phone:py-[10px] max-w-[467.45px] w-full">
                <div id="tick-container" className="flex items-center justify-center mb-4"></div>
                <h2 className="text-2xl text-[#252526] dark:text-[#ebe7e0] mb-4">Solicitud realizada con éxito</h2>
                <button id="back-button" className="${isDark ? 'buttonSecondDark text-white' : 'buttonSecond text-buttonsLigth'} relative m-1 h-[48px] items-center justify-center rounded-3xl border border-buttonsLigth p-3 hover:bg-transparent dark:border-darkText dark:hover:bg-transparent">
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
        preConfirm: () => {
            return 'AlertSuccess';
          },
      });
      document.addEventListener('click', (e) => {
        if ((e.target as HTMLElement).id === 'back-button') {
          Swal.close();
        }
      });
      setFormData({
        transaction_id: '',
        last_name: '',
        email: '',
        phone_number: '',
        note: '',
        calling_code: { value: '', label: '', callingCode: '' },
        status: '',
      });
};

export default AlertSuccess;