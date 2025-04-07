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
    success: 'Completada',
    done: 'Completada',
    refund_in_transit: 'Reembolso en tránsito',
    pending: 'Pendiente',
    failed: 'Fallida',
    rejected: 'Rechazada',
    cancelled: 'Cancelada',
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
