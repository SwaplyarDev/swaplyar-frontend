export const formatTaxId = (taxId: string) => {
  return taxId && taxId.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
};
