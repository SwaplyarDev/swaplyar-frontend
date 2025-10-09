import {
  getPlusRewards,
  resendVerificationAfterRejection,
  updateVerificationStatus,
} from '@/actions/plusRewards/plusRewards.actions';
import { Session } from 'next-auth';

import { UpdateSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

type Status = 'REENVIAR_DATOS' | 'PENDIENTE' | 'APROBADO' | 'RECHAZADO';

interface HandleStatusParams {
  token: string;
  setStatus: (status: Status) => void;
  setShowRejectedMessage: (val: boolean) => void;
  setShowApprovedMessage: (val: boolean) => void;
  update: UpdateSession;
  session?: Session;
  router?:ReturnType<typeof useRouter>
}

export async function fetchAndHandleVerificationStatus({
  token,
  setStatus,
  setShowRejectedMessage,
  setShowApprovedMessage,
  update,
  session,
  router
}: HandleStatusParams) {
  try {
    let statusResp;
    let workingToken = token;

    console.log('🔎 Iniciando verificación con token:', workingToken);

    try {
      statusResp = await getPlusRewards(workingToken);
    } catch (err) {
      if ((err as Error)?.message === 'Unauthorized') {
        // Intenta refrescar sesión y reintenta una vez con el nuevo token

        const updated = await update();
        const newToken = (updated as any)?.accessToken || workingToken;
        workingToken = newToken;
        console.log('✅ Token actualizado tras refresh:', workingToken)
        statusResp = await getPlusRewards(workingToken);
      } else {
        throw err;
      }
    }

    const { verification_status } = statusResp;
    const status = verification_status as Status;
    console.log('Estado de verificación recibido del backend:', status);

    setStatus(status);

    switch (status) {
      case 'RECHAZADO':
        await handleRejectedStatus(workingToken, setShowRejectedMessage, setStatus, update);
        break;
      case 'APROBADO':
        await handleApprovedStatus(workingToken, setShowApprovedMessage, update);
        // actualizar la session de NextAuth
  await update({
    user: {
      ...session?.user, // session viene de useSession() en tu componente
      userValidated: true,
    },
  });
  // redirige a RequestPage para que SSR lea la sesión actualizada
//if (router) router.replace('/es/auth/solicitud');
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
      console.log('🔄 Reintentando verificación tras RECHAZADO con token:', token);
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
    // 🔹 Cambio: disparar un update() para reflejar cambio en la sesion de usuario
    await update({ verification_status: 'REENVIAR_DATOS' });
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
      console.log('Actualizando verificación como APROBADA en backend...');
      await updateVerificationStatus(token);
    } catch (err) {
      if ((err as Error)?.message === 'Unauthorized') {
        const updated = await update();
        const newToken = (updated as any)?.accessToken || token;
        console.log(' Nuevo token tras refresh en APROBADO:', newToken);
        await updateVerificationStatus(newToken);
      } else {
        throw err;
      }
    }
    console.log('Token actualizado con verificación');

    // Cambio: actualizar la session para reflejar el nuevo estado en tiempo real
    await update({ verification_status: 'APROBADO' });
  } catch (err) {
    console.error('Error al actualizar token:', err);
  }
}

function clearStatusFlags() {
  localStorage.removeItem('verificationRejectedShown');
  localStorage.removeItem('verificationApprovedShown');
}
