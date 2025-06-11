export type EstadoGrupo = 'completada' | 'pendiente' | 'rechazada';

export const mapEstadoToGrupo = (status: string): EstadoGrupo => {
  const estadoNormalizado = status.toLowerCase();

  const completadas = ['completed', 'approved'];
  const pendientes = ['pending', 'review_payment', 'modified', 'discrepancy', 'refund_in_transit', 'in_transit'];
  const rechazadas = ['rejected', 'cancelled', 'canceled', 'refunded'];

  if (completadas.includes(estadoNormalizado)) return 'completada';
  if (pendientes.includes(estadoNormalizado)) return 'pendiente';
  return 'rechazada';
};
