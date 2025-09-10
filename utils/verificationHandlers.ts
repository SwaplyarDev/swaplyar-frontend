import {
  getPlusRewards,
  resendVerificationAfterRejection,
  updateVerificationStatus,
} from '@/actions/plusRewards/plusRewards.actions';

import { UpdateSession } from 'next-auth/react';

type Status = 'REENVIAR_DATOS' | 'PENDIENTE' | 'APROBADO' | 'RECHAZADO';

interface HandleStatusParams {
  token: string;
  setStatus: (status: Status) => void;
  setShowRejectedMessage: (val: boolean) => void;
  setShowApprovedMessage: (val: boolean) => void;
  update: UpdateSession;
}

export async function fetchAndHandleVerificationStatus({
  token,
  setStatus,
  setShowRejectedMessage,
  setShowApprovedMessage,
  update,
}: HandleStatusParams) {
  try {
    let statusResp;
    let workingToken = token;
    try {
      statusResp = await getPlusRewards(workingToken);
    } catch (err) {
      if ((err as Error)?.message === 'Unauthorized') {
        // Intenta refrescar sesión y reintenta una vez con el nuevo token
        const updated = await update();
        const newToken = (updated as any)?.accessToken || workingToken;
        workingToken = newToken;
        statusResp = await getPlusRewards(workingToken);
      } else {
        throw err;
      }
    }
    const { verification_status } = statusResp;
    const status = verification_status as Status;
    setStatus(status);

    switch (status) {
      case 'RECHAZADO':
        await handleRejectedStatus(workingToken, setShowRejectedMessage, setStatus, update);
        break;
      case 'APROBADO':
        await handleApprovedStatus(workingToken, setShowApprovedMessage, update);
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
  setStatus: (status: Status) => void,
  update: UpdateSession,
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
    try {
      await resendVerificationAfterRejection(token);
    } catch (err) {
      if ((err as Error)?.message === 'Unauthorized') {
        const updated = await update();
        const newToken = (updated as any)?.accessToken || token;
        await resendVerificationAfterRejection(newToken);
      } else {
        throw err;
      }
    }
    console.log('Token actualizado tras RECHAZADO');
  } catch (err) {
    console.error('Error al actualizar token tras RECHAZADO:', err);
  }
}

async function handleApprovedStatus(
  token: string,
  setShowApprovedMessage: (val: boolean) => void,
  update: UpdateSession
) {
  const alreadyShown = localStorage.getItem('verificationApprovedShown');
  if (alreadyShown) return;

  setShowApprovedMessage(true);
  localStorage.setItem('verificationApprovedShown', 'true');

  setTimeout(() => setShowApprovedMessage(false), 5000);

  try {
    try {
      await updateVerificationStatus(token);
    } catch (err) {
      if ((err as Error)?.message === 'Unauthorized') {
        const updated = await update();
        const newToken = (updated as any)?.accessToken || token;
        await updateVerificationStatus(newToken);
      } else {
        throw err;
      }
    }
    console.log('Token actualizado con verificación');

    await update();
  } catch (err) {
    console.error('Error al actualizar token:', err);
  }
}

function clearStatusFlags() {
  localStorage.removeItem('verificationRejectedShown');
  localStorage.removeItem('verificationApprovedShown');
}
