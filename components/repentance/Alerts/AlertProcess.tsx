import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import { FormData } from '@/types/repentance/repentance';
import { useState } from 'react';
import Swal from 'sweetalert2';

const AlertProcess = async() => {
    const { isDark } = useDarkTheme();
    const [isLoading, ] = useState(false); // Estado para mostrar el spinner
    const [formData, ] = useState<FormData>({
        transaction_id: '',
        last_name: '',
        email: '',
        phone_number: '',
        note: '',
        calling_code: { value: '', label: '', callingCode: '' },
        status: '',
      });
      // Mostrar Swal de Alerta en proceso
    const result = await  Swal.fire({
        title: `<h1 style="color:white; ${isDark ? 'color: white;' : 'color: black;'}">La solicitud #${formData.transaction_id} se encuentra en proceso</h1>`,
        html: `<div style="text-align: left; ${isDark ? 'color: white;' : 'color: black;'}">
                <p>¿Desea cancelarla? El reembolso se devolverá a la cuenta de origen utilizada para esta operación.</p>
                <p style="padding-top: 10px;">Nota: Si la transferencia ya se ha completado, no será posible procesar un reembolso.</p>
              </div>`,
        icon: 'warning',
        background: isDark ? 'rgb(69 69 69)' : '#ffffff',
        showCancelButton: true,
        showConfirmButton: true,
        buttonsStyling: false, 
        customClass: {
          actions: 'flex flex-row-reverse justify-between w-full px-4', 
          cancelButton: `${
            isDark
              ? 'buttonSecondDark text-white'
              : 'buttonSecond text-buttonsLigth'
          } relative m-1 h-[48px] items-center justify-center rounded-3xl border border-buttonsLigth p-3 hover:bg-transparent dark:border-darkText dark:hover:bg-transparent`, 
          confirmButton: `${
            isDark ? 'buttonSecondDark' : 'buttonSecond' 
          } disabled={isLoading} dark:hover:bg- relative m-1 h-[48px] items-center justify-center rounded-3xl border border-buttonsLigth bg-buttonsLigth p-3 text-white hover:bg-buttonsLigth dark:border-darkText dark:bg-darkText dark:text-lightText`, 
        },
        cancelButtonText: '← Volver',
        confirmButtonText: `${isLoading ? "Cargando..." : "Enviar"}`,
        didOpen: () => {
            Swal.showLoading();
          },
      });
    
};

export default AlertProcess;