export const formatTaxId = (value: string): string => {
  if (!value) return '';

  // Guardar posición del cursor y si ya tenía guiones
  const hadDashes = value.includes('-');

  // Eliminar todo excepto números
  const cleaned = value.replace(/\D/g, '');

  // Si es DNI (hasta 8 dígitos)
  if (cleaned.length <= 8) {
    return cleaned;
  }

  // Si es CUIT/CUIL (más de 8 dígitos)
  // Formatear parcialmente mientras se escribe
  if (cleaned.length <= 11) {
    // Insertar guiones en posiciones correctas
    let formatted = cleaned;

    // Insertar primer guión después de 2 dígitos (si hay al menos 3 dígitos)
    if (formatted.length > 2) {
      formatted = formatted.replace(/^(\d{2})(\d+)/, '$1-$2');
    }

    // Insertar segundo guión después de 10 dígitos (si hay 11 dígitos)
    if (formatted.length > 10 && formatted.length <= 11) {
      formatted = formatted.replace(/^(\d{2})-(\d{8})(\d+)/, '$1-$2-$3');
    }

    return formatted;
  }

  // Si excede la longitud máxima
  return cleaned.substring(0, 11).replace(/^(\d{2})(\d{8})(\d{1})/, '$1-$2-$3');
};
