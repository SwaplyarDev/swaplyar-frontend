import { AlertProcessProps } from '@/types/repentance/repentance';
import Swal from 'sweetalert2';

const AlertProcess = async ({isDark, formData, isLoading}:AlertProcessProps): Promise<{ isConfirmed: boolean }> => {
    
     
    return await Swal.fire({
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
        
      }).then(result => {
        return { isConfirmed: result.isConfirmed };
      });
    
};

export default AlertProcess;