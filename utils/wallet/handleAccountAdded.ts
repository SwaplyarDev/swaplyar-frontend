import { createWalletAccount, getMyWalletAccounts } from '@/actions/virtualWalletAccount/virtualWallets.action';
import { mapWalletFromApi } from '@/utils/wallet/mapWalletFromApi';

export const createHandleAccountAdd = ({
  walletType,
  token,
  session,
  setWallets,
  setOpen,
}: {
  walletType: string;
  token: string;
  session: any;
  setWallets: (wallets: any[]) => void;
  setOpen: (open: boolean) => void;
}) => {
  const normalizeWalletType = (type: string) => {
    switch (type.toLowerCase()) {
      case 'paypal':
      case 'payoneerusd':
      case 'payoneereur':
      case 'wiseusd':
      case 'wiseeur':
        return 'virtual_bank';
      case 'crypto':
      case 'receiver_crypto':
        return 'receiver_crypto';
      case 'pix':
        return 'pix';
      case 'bank':
        return 'bank';
      default:
        return type.toLowerCase();
    }
  };

  const extractVirtualBankType = (type: string) => {
    const lower = type.toLowerCase();
    if (lower.startsWith('wise')) return 'wise';
    if (lower.startsWith('payoneer')) return 'payoneer';
    if (lower.startsWith('paypal')) return 'paypal';
    return '';
  };

  const extractCurrency = (type: string) => {
    const lower = type.toLowerCase();
    if (lower.endsWith('eur')) return 'EUR';
    return 'USD'; // default
  };

  return async (formData: any) => {
    try {
      const normalizedWalletType = normalizeWalletType(walletType);

     
      const firstName = formData.firstName || '';
      const lastName = formData.lastName || '';

      const payload: any = { userAccValues: {} };

      switch (normalizedWalletType) {
        case 'pix':
          payload.userAccValues = {
            accountType: 'pix',
            accountName: formData.accountName || '',
            currency: formData.currency || 'BRL',
            cpf: formData.cpf || '',
            pix_value: formData.pix_value || '',
            pix_key: formData.pix_key || '',
          };
          break;

        case 'bank':
          payload.userAccValues = {
            accountType: 'bank',
            accountName: formData.accountName || '',
            currency: formData.currency || 'ARS',
            bankName: formData.bankName || '',
            send_method_key: formData.send_method_key || '',
            send_method_value: formData.send_method_value || '',
            document_type: formData.document_type || '',
            document_value: formData.document_value || '',
          };
          break;

        case 'receiver_crypto':
          payload.userAccValues = {
            accountType: 'receiver_crypto',
            accountName: formData.accountName || '',
            wallet: formData.wallet || '',
            network: formData.network || '',
            currency: formData.currency || 'USDT',
          };
          break;

        case 'virtual_bank':
          payload.userAccValues = {
            accountType: 'virtual_bank',
            accountName: formData.accountName || '',
            currency: formData.currency || extractCurrency(walletType),
            email: formData.email || '',
            firstName,
            lastName,
            type: extractVirtualBankType(walletType), 
          };
          break;

        default:
          console.warn('Tipo de cuenta no manejado:', walletType);
          return;
      }

      await createWalletAccount(payload, token);

      const updated = await getMyWalletAccounts(token);
      setWallets(updated.map(mapWalletFromApi));
      setOpen(false);
    } catch (error) {
      console.error('Error al agregar la cuenta:', error);
    }
  };
};
