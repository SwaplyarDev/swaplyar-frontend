export function buildPaymentMethod(selectedSystem: string, details: Record<string, string>) {
  switch (selectedSystem) {
    // Casos para VIRTUAL BANK
    case 'paypal':
    case 'payoneer_usd':
    case 'payoneer_eur':
    case 'wise_usd':
    case 'wise_eur':
      return {
        platformId: 'virtual_bank',
        method: 'virtual-bank',
        type: details.type || '', // <-- Se añade el TIPO GENÉRICO
        virtualBank: {
          currency: details.currency || 'USD',
          emailAccount: details.email_account || '',
          transferCode: details.transfer_code || '',
        },
      };

    // Caso para BANK (ARS) - Restaurado a su estructura original
    case 'ars':
      return {
        platformId: 'bank',
        method: 'bank',
        bank: {
          currency: details.currency || 'ARS',
          bankName: details.bank_name || '',
          sendMethodKey: details.send_method_key || '',
          sendMethodValue: details.send_method_value || '',
          documentType: details.document_type || '',
          documentValue: details.document_value || '',
        },
      };

    // Caso para PIX - Restaurado a su estructura original
    case 'pix':
      return {
        platformId: 'pix',
        method: 'pix',
        pix: {
          pixId: details.pixId || '123',
          pixKey: details.pixKey || '',
          pixValue: details.pixValue || '',
          cpf: details.cpf || '',
        },
      };

    // Caso para TETHER - Restaurado a su estructura original
    case 'tether':
      return {
        platformId: 'receiver_crypto',
        method: 'receiver-crypto',
        receiverCrypto: {
          currency: details.currency || 'USDT',
          network: details.network || '',
          wallet: details.wallet || '',
        },
      };

    default:
      throw new Error(`Unsupported payment method: ${selectedSystem}`);
  }
}

export function buildSenderMethod(selectedSystem: string) {
  // Recibe el ID completo, ej: 'wise_usd'
  switch (selectedSystem) {
    // Casos para VIRTUAL BANK
    case 'paypal':
      return {
        platformId: 'virtual_bank',
        method: 'virtual-bank',
        type: 'paypal', // <-- Se añade el TIPO GENÉRICO
      };
    case 'payoneer_usd':
    case 'payoneer_eur':
      return {
        platformId: 'virtual_bank',
        method: 'virtual-bank',
        type: 'payoneer', // <-- Se añade el TIPO GENÉRICO
      };
    case 'wise_usd':
    case 'wise_eur':
      return {
        platformId: 'virtual_bank',
        method: 'virtual-bank',
        type: 'wise', // <-- Se añade el TIPO GENÉRICO
      };

    // Otros casos - Restaurados a su estructura original
    case 'ars':
      return {
        platformId: 'bank',
        method: 'bank',
      };

    case 'pix':
      return {
        platformId: 'pix',
        method: 'pix',
      };

    case 'tether':
      return {
        platformId: 'receiver_crypto',
        method: 'receiver-crypto',
      };

    default:
      throw new Error(`Unsupported sender payment method: ${selectedSystem}`);
  }
}
