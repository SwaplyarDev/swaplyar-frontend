// utils/buildPaymentMethod.ts
interface PaymentMethodDetails {
  value: string;
  details: Record<string, string>;
}

export function buildPaymentMethod(selectedSystem: string, details: Record<string, string>): PaymentMethodDetails {
  switch (selectedSystem) {
    case 'paypal':
    case 'payoneer':
    case 'wise':
      return {
        value: 'paypal',
        details: {
          email_account: details.email_account || '',
          transfer_code: details.transfer_code || '',
        },
      };
    case 'ars':
      return {
        value: 'ars',
        details: {
          bank_name: details.bank_name || '',
          send_method_key: details.send_method_key || '',
          send_method_value: details.send_method_value || '',
          document_type: details.document_type || '',
          document_value: details.document_value || '',
        },
      };
    case 'pix':
      return {
        value: 'pix',
        details: {
          pix_key: details.pix_key || '',
          pix_value: details.pix_value || '',
          cpf: details.cpf || '',
        },
      };
    case 'crypto':
      return {
        value: 'crypto',
        details: {
          currency: details.currency || '',
          network: details.network || '',
          wallet: details.wallet || '',
        },
      };
    default:
      throw new Error(`Unsupported system: ${selectedSystem}`);
  }
}
