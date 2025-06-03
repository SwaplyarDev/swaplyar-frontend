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
  return async (formData: any) => {
    try {
      const profile = session?.user?.profile || {};
      const firstName = profile.firstName || formData.nombre || '';
      const lastName = profile.lastName || formData.apellido || '';
      const identification = session?.sub || formData.dni || formData.cpf || formData.correo || '';

      const payload: any = {
        typeAccount: walletType,
        formData: {},
        userAccValues: {
          first_name: formData.nombre || firstName,
          last_name: formData.apellido || lastName,
          identification: formData.dni || identification,
          currency: '',
          account_name: '',
          account_type: 0,
        },
      };

      switch (walletType) {
        case 'paypal':
          payload.formData = {
            email_account: formData.correo,
            transfer_code: formData.correo,
          };
          payload.userAccValues = {
            ...payload.userAccValues,
            currency: 'USD',
            account_name: 'Mi cuenta PayPal',
            account_type: 2,
          };
          break;

        case 'crypto':
          payload.formData = {
            currency: 'USDT',
            network: formData.red,
            wallet: formData.wallet,
          };
          payload.userAccValues = {
            ...payload.userAccValues,
            currency: 'USDT',
            account_name: `Binance ${formData.red} USDT`,
            account_type: 7,
          };
          break;

        case 'virtualBank':
          payload.formData = {
            currency: 'ARS',
            email_account: formData.correo || session?.user?.email,
            transfer_code: formData.cvu,
          };
          payload.userAccValues = {
            ...payload.userAccValues,
            currency: 'ARS',
            dni: formData.dni,
            account_name: formData.nombreBanco,
            account_type: 6,
          };
          break;

        case 'wise':
          payload.formData = {
            iban: formData.iban,
            bic: formData.bic,
            email_account: formData.correo,
            transfer_code: formData.correo,
          };
          payload.userAccValues = {
            ...payload.userAccValues,
            currency: formData.moneda || 'EUR',
            account_name: 'Cuenta Wise',
            account_type: 3,
          };
          break;

        case 'payoneer':
          payload.formData = {
            email_account: formData.correo,
          };
          payload.userAccValues = {
            ...payload.userAccValues,
            currency: 'USD',
            account_name: 'Mi Payoneer',
            account_type: 4,
          };
          break;

        case 'pix':
          payload.formData = {
            virtual_bank_id: formData.cpf || 'Otro',
            pix_key: formData.pix_key,
            cpf: formData.cpf,
            pix_value: formData.pix_key,
          };
          payload.userAccValues = {
            ...payload.userAccValues,
            currency: 'BRL',
            account_name: 'Pix Bradesco',
            account_type: 5,
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
