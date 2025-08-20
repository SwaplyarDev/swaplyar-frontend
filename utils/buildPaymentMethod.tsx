export function buildPaymentMethod(selectedSystem: string, details: Record<string, string>) {
  switch (selectedSystem) {
    case 'paypal':
    case 'payoneer':
    case 'wise':
      return {
        platformId: 'virtual_bank',
        method: 'virtual-bank',
        virtualBank: {
          currency: details.currency || 'USD',
          emailAccount: details.email_account || '',
          transferCode: details.transfer_code || '',
        },
      };

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

    case 'pix':
      return {
        platformId: 'pix',
        method: 'pix',
        pix: {
          pixId: details.pixId || '123', // Si aplica
          pixKey: details.pixKey || '',
          pixValue: details.pixValue || '',
          cpf: details.cpf || '',
        },
      };

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

export function buildSenderMethod(selectedSystem: string){
   switch (selectedSystem) {
    case 'paypal':
    case 'payoneer':
    case 'wise':
      return {
        platformId: 'virtual_bank',
        method: 'virtual-bank',
      };

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
      throw new Error(`Unsupported payment method: ${selectedSystem}`);
  } 
}