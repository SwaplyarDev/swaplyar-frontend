// Helper functions for transaction data

/**
 * Determines if a transaction is completed based on its status
 */
export const isCompleted = (status: string): boolean => {
  const completedStatuses = ['completed', 'success', 'done'];
  return completedStatuses.includes(status.toLowerCase());
};

/**
 * Converts status to Spanish
 */
export const getEstadoEspanol = (status: string): string => {
  const statusMap: Record<string, string> = {
    completed: 'Completada',
    approved: 'Solicitud Aprobada',
    in_transit: 'Transferencia en tránsito',
    refund_in_transit: 'Reembolso en camino',
    pending: 'Enviado / en espera',
    review_payment: 'Pago en revisión',
    modified: 'Editada / modificada',
    discrepancy: 'Hay problema / discrepancia',
    rejected: 'Solicitud rechazada',
    cancelled: 'Cancelada',
    canceled: 'Cancelada',
    refunded: 'Reembolso confirmado',
  };

  return statusMap[status.toLowerCase()] || status;
};

/**
 * Formats date to Spanish locale
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

/**
 * Formats time to Spanish locale
 */
export const formatTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};

export function getPlatformDisplayName(platformId: string): string {
  switch (platformId) {
    case 'virtual_bank':
      return 'Banco Virtual';
    case 'bank':
      return 'Banco';
    case 'pix':
      return 'Pix';
    case 'receiver_crypto':
      return 'Crypto';
    default:
      return 'Método Desconocido';
  }
}