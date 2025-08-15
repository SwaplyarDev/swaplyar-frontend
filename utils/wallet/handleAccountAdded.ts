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
      case 'virtualbank':
      case 'paypal':
      case 'payoneer':
      case 'wise':
        return 'virtual_bank';
      case 'crypto':
      case 'receiver_crypto':
        return 'receiver_crypto';
      default:
        return type.toLowerCase();
    }
  };

  return async (formData: any) => {
    try {
      const normalizedWalletType = normalizeWalletType(walletType);

      const profile = session?.user?.profile || {};
      const firstName = profile.firstName || formData.nombre || '';
      const lastName = profile.lastName || formData.apellido || '';

      // Payload base
      const payload: any = {
        typeAccount: normalizedWalletType,
        userAccValues: {},
      };

      switch (normalizedWalletType) {
        case 'virtual_bank':
          payload.userAccValues = {
            first_name: firstName,
            last_name: lastName,
            email: formData.correo || '',
            currency: formData.moneda || 'USD',
            account_type: walletType.toLowerCase(), // paypal | payoneer | wise
          };
          break;

        case 'receiver_crypto':
          payload.userAccValues = {
            usdt_address: formData.wallet || '',
            network: formData.network || '',
            currency: formData.moneda || 'USDT',
            account_type: 'usdt',
          };
          break;

        case 'pix':
          payload.userAccValues = {
            first_name: firstName,
            last_name: lastName,
            pix_key: formData.pix_key || '',
            pix_key_type: formData.pix_key_type || '',
            cpf: formData.cpf || '',
            currency: formData.moneda || 'BRL',
            account_type: 'pix',
          };
          break;

        case 'bank':
          payload.userAccValues = {
            first_name: firstName,
            last_name: lastName,
            dni_cuit_cuil: formData.dni_cuit_cuil || '',
            cbu_cvu_alias: formData.cbu_cvu_alias || '',
            bank_name: formData.bank_name || '',
            currency: formData.moneda || 'ARS',
            account_type: 'bank',
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
