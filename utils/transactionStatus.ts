export type EstadoGrupo = 'completada' | 'pendiente' | 'rechazada';

export const mapEstadoToGrupo = (finalStatus: string): EstadoGrupo => {
  const estadoNormalizado = finalStatus.toLowerCase();

  const completadas = ['completed', 'approved'];
  const pendientes = ['pending', 'review_payment', 'modified', 'discrepancy', 'refund_in_transit', 'in_transit'];

  if (completadas.includes(estadoNormalizado)) return 'completada';
  if (pendientes.includes(estadoNormalizado)) return 'pendiente';
  return 'rechazada';
};
