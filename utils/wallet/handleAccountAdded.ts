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
      case 'virtual_bank':
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
    const identification =
      formData.dni ||
      formData.cpf ||
      formData.identification ||
      formData.correo ||
      session?.sub ||
      '';

    const payload: any = {
      typeAccount: normalizedWalletType,
      formData: {},
      userAccValues: {
        first_name: firstName,
        last_name: lastName,
        identification,
        currency: '',
        account_name: '',
        account_type: normalizedWalletType,
      },
    };

      switch (walletType) {
        case 'bank':
          payload.formData = {
            currency: formData.moneda || 'ARS',
            bank_name: formData.nombreBanco || '',
            send_method_key: formData.metodoEnvioClave || 'CBU',
            send_method_value: formData.metodoEnvioValor || '',
            document_type: formData.tipoDocumento || 'DNI',
            document_value: formData.dni || '',
            alias: formData.alias || '',
            branch: formData.sucursal || '',
          };
          payload.userAccValues = {
            ...payload.userAccValues,
            currency: formData.moneda || 'ARS',
            account_name: formData.nombreCuenta || 'Cuenta Principal',
            account_type: 'bank',
          };
          break;

        case 'wise':
          payload.formData = {
            iban: formData.iban || '',
            bic: formData.bic || '',
            email_account: formData.correo || '',
            transfer_code: Number(formData.transfer_code) || 0,
          };
          payload.userAccValues = {
            ...payload.userAccValues,
            currency: formData.moneda || 'USD',
            account_name: formData.nombreCuenta || 'Cuenta Wise',
            account_type: 'wise',
          };
          break;

        case 'pix':
          payload.formData = {
            virtual_bank_id: formData.virtual_bank_id || 'otro',
            pix_key: formData.pix_key || '',
            cpf: Number(formData.cpf) || 0,
            pix_value: formData.pix_value || '',
          };
          payload.userAccValues = {
            ...payload.userAccValues,
            currency: 'BRL',
            account_name: formData.nombreCuenta || 'Pix Account',
            account_type: 'pix',
          };
          break;

        case 'payoneer':
          payload.formData = {
            iban: formData.iban || '',
            bic: formData.bic || '',
            email_account: formData.correo || '',
            transfer_code: Number(formData.transfer_code) || 0,
          };
          payload.userAccValues = {
            ...payload.userAccValues,
            currency: formData.moneda || 'USD',
            account_name: formData.nombreCuenta || 'Cuenta Payoneer',
            account_type: 'payoneer',
          };
          break;
        case"crypto":
        case 'receiver_crypto':
          payload.formData = {
            currency: formData.moneda || 'USDT',
            network: formData.network || '',
            wallet: formData.wallet || '',
          };
          payload.userAccValues = {
            ...payload.userAccValues,
            currency: formData.moneda || 'USD',
            account_name: formData.nombreCuenta || `Crypto ${formData.red || ''}`,
            account_type: 'receiver_crypto',
          };
          break;
          
        case"virtualBank":
        case 'virtual_bank':
          payload.formData = {
            currency: formData.moneda || 'USD',
            email_account: formData.correo || '',
            transfer_code: Number(formData.transfer_code) || 0,
          };
          payload.userAccValues = {
            ...payload.userAccValues,
            currency: formData.moneda || 'USD',
            account_name: formData.nombreCuenta || 'Cuenta Virtual',
            account_type: 'virtual_bank',
          };
          break;

        case 'paypal':
          payload.formData = {
            email_account: formData.correo || '',
            transfer_code: Number(formData.transfer_code) || 0,
          };
          payload.userAccValues = {
            ...payload.userAccValues,
            currency: 'USD',
            account_name: formData.nombreCuenta || 'Cuenta PayPal',
            account_type: 'paypal',
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

