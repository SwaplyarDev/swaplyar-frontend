import { createWalletAccount, getMyWalletAccounts } from '@/actions/virtualWalletAccount/virtualWallets.action';
import { mapWalletFromApi } from '@/utils/wallet/mapWalletFromApi';
import { detectarTipoPixKey, getTaxIdentificationType, getTransferIdentificationType } from '../validationUtils';

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
    if (lower.endsWith('ars')) return 'ARS';
    return 'USD'; // default
  };

  return async (formData: any) => {
    try {
      let payload: any = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        accountName: formData.accountName,
      };

      switch (walletType) {
        case 'bank':
          payload.platformId = 'bank';
          payload.method = 'bank';
          payload.bank = {
            currency: formData.currency || 'ARS',
            bankName: formData.bankName,
            sendMethodKey: getTransferIdentificationType(formData.send_method_value),
            sendMethodValue: formData.send_method_value,
            documentType: getTaxIdentificationType(formData.document_value),
            documentValue: formData.document_value,
          };
          break;

        case 'pix':
          payload.platformId = 'pix';
          payload.method = 'pix';
          payload.pix = {
            pixId: formData.pix_id,
            pixKey: detectarTipoPixKey(formData.pix_value),
            pixValue: formData.pix_value,
            cpf: formData.cpf,
          };
          break;

        case 'crypto':
        case 'receiver_crypto':
          payload.platformId = 'receiver_crypto';
          payload.method = 'receiver-crypto';
          payload.receiverCrypto = {
            currency: formData.currency,
            network: formData.network,
            wallet: formData.wallet,
          };
          break;

        case 'paypal':
        case 'payoneerUSD':
        case 'payoneerEUR':
        case 'wiseUSD':
        case 'wiseEUR':
          payload.platformId = 'virtual_bank';
          payload.method = 'virtual-bank';
          payload.type = extractVirtualBankType(walletType);
          payload.virtualBank = {
            currency: extractCurrency(walletType),
            emailAccount: formData.email,
            // transferCode: formData.transferCode,
          };
          break;

        default:
          console.error('Tipo de cuenta no manejado:', walletType);
          return;
      }

      console.log('Payload final a enviar:', payload);

      await createWalletAccount(payload, token);

      const updated = await getMyWalletAccounts(token);
      setWallets(updated.map(mapWalletFromApi));
      setOpen(false);
    } catch (error) {
      console.error('Error al agregar la cuenta:', error);
    }
  };
};
