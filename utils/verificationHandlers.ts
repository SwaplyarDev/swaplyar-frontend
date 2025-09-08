import {
  getPlusRewards,
  resendVerificationAfterRejection,
  updateVerificationStatus,
} from '@/actions/plusRewards/plusRewards.actions';

type Status = 'REENVIAR_DATOS' | 'PENDIENTE' | 'APROBADO' | 'RECHAZADO';

interface HandleStatusParams {
  token: string;
  setStatus: (status: Status) => void;
  setShowRejectedMessage: (val: boolean) => void;
  setShowApprovedMessage: (val: boolean) => void;
}

export async function fetchAndHandleVerificationStatus({
  token,
  setStatus,
  setShowRejectedMessage,
  setShowApprovedMessage,
}: HandleStatusParams) {
  try {
    const { verification_status } = await getPlusRewards(token);
    const status = verification_status as Status;
    setStatus(status);

    switch (status) {
      case 'RECHAZADO':
        await handleRejectedStatus(token, setShowRejectedMessage, setStatus);
        break;
      case 'APROBADO':
        await handleApprovedStatus(token, setShowApprovedMessage);
        break;
      default:
        clearStatusFlags();
        break;
    }
  } catch (error) {
    console.error('Error al obtener el estado de verificación:', error);
    setStatus('REENVIAR_DATOS');
  }
}

async function handleRejectedStatus(
  token: string,
  setShowRejectedMessage: (val: boolean) => void,
  setStatus: (status: Status) => void
) {
  const alreadyShown = localStorage.getItem('verificationRejectedShown');
  if (alreadyShown) return;

  setShowRejectedMessage(true);
  localStorage.setItem('verificationRejectedShown', 'true');

  setTimeout(() => {
    setShowRejectedMessage(false);
    setStatus('REENVIAR_DATOS');
  }, 5000);

  try {
    await resendVerificationAfterRejection(token);
    console.log('Token actualizado tras RECHAZADO');
  } catch (err) {
    console.error('Error al actualizar token tras RECHAZADO:', err);
  }
}

async function handleApprovedStatus(
  token: string,
  setShowApprovedMessage: (val: boolean) => void
) {
  const alreadyShown = localStorage.getItem('verificationApprovedShown');
  if (alreadyShown) return;

  setShowApprovedMessage(true);
  localStorage.setItem('verificationApprovedShown', 'true');

  setTimeout(() => setShowApprovedMessage(false), 5000);

  try {
    await updateVerificationStatus(token);
    console.log('Token actualizado con verificación');
  } catch (err) {
    console.error('Error al actualizar token:', err);
  }
}

function clearStatusFlags() {
  localStorage.removeItem('verificationRejectedShown');
  localStorage.removeItem('verificationApprovedShown');
}
