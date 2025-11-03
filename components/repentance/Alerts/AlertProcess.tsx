import { AlertsProps } from '@/types/repentance/repentance';
import { createRegret } from '@/actions/repentance/repentanceForm.action';
import PopUp from '@/components/ui/PopUp/PopUp';

const AlertProcess = async ({
  isDark,
  transaction_id,
  dataToSend,
  setIsLoading,
}: AlertsProps): Promise<void> => {
  const handleStatusChange = async () => {
    try {
      if (dataToSend) {
        const response: any = await createRegret(dataToSend);
        setIsLoading(false);

        if (response.status === 404) {
          PopUp({
            variant: 'simple-warning',
            title: 'Algunos de los datos son incorrectos por favor verifique los datos ingresados e intente nuevamente',
            isDark: isDark,
          });
          return;
        }

        if (response.status === 400) {
          PopUp({
            variant: 'simple-error',
            title: 'Esta solicitud ya genero una alerta de cancelacion y/o reembolso',
            isDark: isDark,
          });
          return;
        }

        if (response.status === 409) {
          PopUp({
            variant: 'simple-error',
            title: 'Esta solicitud ya existe en el sistema',
            isDark: isDark,
          });
          return;
        }

        if (response.status === 500) {
          PopUp({
            variant: 'simple-error',
            title: 'Error interno del servidor. Por favor intente nuevamente más tarde.',
            isDark: isDark,
          });
          return;
        }

        if (response.ok === true) {
          PopUp({
            variant: 'success-full',
            title: 'Solicitud de cancelación enviada',
            text: 'Hemos recibido su solicitud de <strong>Cancelación y Reembolso.</strong> Si necesitamos información adicional, nos comunicaremos por WhatsApp al número indicado en el formulario. Recuerde que puede comunicarse al <strong>WhatsApp al +54 9 387 455 3521.</strong>',
            isHtml: true,
            isDark: isDark,
          });
          return;
        }

        // Para cualquier otro error no manejado específicamente
        PopUp({
          variant: 'simple-error',
          title: response.message || 'Ha ocurrido un error inesperado. Por favor intente nuevamente.',
          isDark: isDark,
        });
      }
    } catch (error: any) {
      console.error('Error in handleStatusChange:', error);
      setIsLoading(false);
      PopUp({
        variant: 'simple-error',
        title: 'Error de conexión. Verifique su conexión a internet e intente nuevamente.',
        isDark: isDark,
      });
    }
  };

  PopUp({
    variant: 'info-detailed',
    title: `La solicitud #${transaction_id} se encuentra en proceso`,
    text: '¿Desea cancelarla? - los fondos se devolverá a la cuenta de origen utilizada para esta operación',
    note: 'Si la transferencia ya se ha completado en el sistema, no será posible procesar un reembolso - el reembolso puede demorar entre 24 a 72 horas hábiles dependiendo el método de pago realizado',
    isDark: isDark,
    actionButton: {
      text: 'Cancelar operación',
      style: 'cancel',
      onClick: () => {
        handleStatusChange();
      }
    }
  });
};

export default AlertProcess;
