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

export function detectarTipoPixKey(pixKey: string): string {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;
  const phonePattern = /^\+?[1-9]\d{1,14}$/;
  const cpfPattern = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
  const cnpjPattern = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
  const randomKeyPattern = /^[a-zA-Z0-9-]{32,36}$/;

  if (emailPattern.test(pixKey)) return 'email';
  if (phonePattern.test(pixKey)) return 'phone';
  if (cpfPattern.test(pixKey)) return 'cpf';
  if (cnpjPattern.test(pixKey)) return 'cnpj';
  if (randomKeyPattern.test(pixKey)) return 'random';

  return '';
}
