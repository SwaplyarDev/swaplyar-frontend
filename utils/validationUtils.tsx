import { System } from '@/types/data';

export function validateTaxIdentification(input: string): true | string {
  const cleanInput = input.replace(/[-.]/g, '');

  if (!/^\d+$/.test(cleanInput)) {
    return 'Debe contener solo números.';
  }

  const isDNI = cleanInput.length === 7 || cleanInput.length === 8;
  const isCUIT = cleanInput.length === 11;

  if (isDNI || isCUIT) {
    return true;
  }

  return 'El DNI debe tener 7 u 8 dígitos, y el CUIT/CUIL 11.';
}

export function validateTransferIdentification(input: string): true | string {
  const isCBU = /^\d{22}$/.test(input);
  const isAlias = /^[a-zA-Z0-9._-]{6,20}$/.test(input);

  if (isCBU || isAlias) {
    return true;
  }

  if (/^\d+$/.test(input)) {
    return 'El CBU/CVU debe tener 22 dígitos.';
  }

  return 'El formato de CBU/CVU o Alias es inválido.';
}
export function getTaxIdentificationType(input: string): string {
  const cuitCuilPattern = /^(?:\d{11}|\d{2}-\d{8}-\d{1})$/;
  const dniPattern = /^\d{8}$/;

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

export function detectarMail(coin: System | null): string {
  if (coin?.name.toLowerCase() === 'paypal') return 'oa.johan.suarez@gmail.com';
  if (coin?.name.toLowerCase() === 'wise') return 'johansuarez90@gmail.com';
  if (coin?.name.toLowerCase() === 'payoneer') return 'centrodeayuda@swaplyar.com';

  return '';
}
