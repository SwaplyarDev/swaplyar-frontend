export const formatTaxId = (value: string): string => {
  if (!value) return '';
  const hadDashes = value.includes('-');
  const cleaned = value.replace(/\D/g, '');
  // Si es DNI
  if (cleaned.length <= 8) {
    return cleaned;
  }
  // Si es CUIL O CUIT
  if (cleaned.length <= 11) {
    let formatted = cleaned;
    // PRIMERO -
    if (formatted.length > 2) {
      formatted = formatted.replace(/^(\d{2})(\d+)/, '$1-$2');
    }

    // SEGUINDO -
    if (formatted.length > 10) {
      formatted = formatted.replace(/^(\d{2})-(\d{8})(\d+)/, '$1-$2-$3');
    }

    return formatted;
  }

  // Si excede la longitud máxima
  return cleaned.substring(0, 11).replace(/^(\d{2})(\d{8})(\d{1})/, '$1-$2-$3');
};
export const formatCpf = (taxId: string) => {
  return taxId && taxId.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
};
