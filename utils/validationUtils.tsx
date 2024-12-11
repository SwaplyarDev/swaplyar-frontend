export function getTaxIdentificationType(input: string): string {
  const cuitCuilPattern = /^(?:\d{11}|\d{2}-\d{8}-\d{1})$/;
  const dniPattern = /^d{8}$/;

  if (cuitCuilPattern.test(input)) {
    return 'CUIT/CUIL';
  }
  if (dniPattern.test(input)) {
    return 'DNI';
  }
  return 'DNI/CUIT/CUIL';
}

export function getTransferIdentificationType(input: string): string {
  const cbuPattern = /^\d{22}$/;
  const aliasPattern = /^[a-zA-Z0-9._-]{3,30}$/;

  if (cbuPattern.test(input)) {
    return 'CBU/CVU';
  }
  if (aliasPattern.test(input)) {
    return 'ALIAS';
  }
  return 'CBU/CVU/ALIAS';
}
