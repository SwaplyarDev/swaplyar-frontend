import { System } from '@/types/data';
import { StepperState } from '@/types/transactions/stepperStoretypes';
import { ResponseCreateTransaction } from '@/types/transactionsBackEnd2';
import { buildPaymentMethod, buildSenderMethod } from '@/utils/buildPaymentMethod';
import {
  detectarMail,
  detectarTipoPixKey,
  getTaxIdentificationType,
  getTransferIdentificationType,
} from '@/utils/validationUtils';
import { create } from 'zustand';

const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

/**
 * Formatea y valida un número de teléfono
 * @param callingCode - Código de país con formato +XX
 * @param phoneNumber - Número de teléfono sin formato
 * @returns Número de teléfono formateado correctamente o string vacío si es inválido
 */
const formatPhoneNumber = (callingCode: string | undefined, phoneNumber: string | undefined): string => {
  if (!callingCode || !phoneNumber) {
    return '';
  }
  
  // Limpiar el número de teléfono (solo números)
  const cleanPhone = phoneNumber.replace(/\D/g, '');
  
  // Verificar que el código de país tenga el formato correcto (+XX...)
  if (!callingCode.startsWith('+')) {
    return '';
  }
  
  // Verificar que el número tenga al menos 7 dígitos (mínimo internacional)
  if (cleanPhone.length < 7) {
    return '';
  }
  
  return `${callingCode}${cleanPhone}`;
};

export const useStepperStore = create<StepperState>((set, get) => ({
  activeStep: 0,
  completedSteps: [false, false, false],
  formData: {
    stepOne: {
      first_name: '',
      last_name: '',
      calling_code: undefined,
      phone: '',
      email: '',
      own_account: undefined,
    },
    stepTwo: {
      receiver_first_name: '',
      receiver_last_name: '',
      tax_identification: '',
      transfer_identification: '',
      re_transfer_identification: '',
      name_of_bank: '',
      bank_email: '',
      re_enter_bank_email: '',
      usdt_direction: '',
      re_enter_usdt_direction: '',
      red_selection: {
        value: '',
        label: '',
        image: <></>,
      },
      recieveAmountRed: '',
      pixId: '',
      pixKey: '',
      individual_tax_id: '',
    },
    stepThree: {
      send_amount: '',
      receive_amount: '',
      pay_email: '',
      proof_of_payment: null,
      note: '',
      network: '',
      wallet: '',
    },
  },
  idTransaction: undefined,
  setActiveStep: (step) => set((state) => ({ ...state, activeStep: step })),
  markStepAsCompleted: (step) =>
    set((state) => {
      const updatedSteps = [...state.completedSteps];
      updatedSteps[step] = true;
      return { completedSteps: updatedSteps };
    }),
  updateFormData: (step, data) => {
    const stepKeys = ['stepOne', 'stepTwo', 'stepThree'] as const;
    const stepKey = stepKeys[step];

    return set((state) => ({
      formData: {
        ...state.formData,
        [stepKey]: { ...state.formData[stepKey], ...data },
      },
    }));
  },
  submitAllData: async (
    selectedSendingSystem: System | null,
    selectedReceivingSystem: System | null,
    accessToken?: string,
    discountsIds?: string[],
  ): Promise<ResponseCreateTransaction | false> => {
    console.log('STEPPER STORE: discountsIds recibidos como parámetro:', discountsIds);
    const state = get();
    const { stepOne, stepTwo, stepThree } = state.formData;

    // Validar número de teléfono antes de procesar
    const formattedPhone = formatPhoneNumber(stepOne.calling_code?.callingCode, stepOne.phone);
    if (!formattedPhone) {
      throw new Error('Número de teléfono inválido. Verifique que el código de país y número sean correctos.');
    }

    const pixKey = detectarTipoPixKey(stepTwo.pixKey || 'oa@gmail.com');

    const senderDetails: Record<string, string> = {
      email_account: stepOne.email || detectarMail(selectedSendingSystem),
      transfer_code: stepTwo.transfer_identification || 'SwaplyAr.com',
      bank_name: stepTwo.name_of_bank || 'Personal Pay',
      send_method_key: getTransferIdentificationType(stepTwo.transfer_identification || 'SwaplyAr.com'),
      send_method_value: stepTwo.transfer_identification || 'SwaplyAr.com',
      document_type: getTaxIdentificationType(stepTwo.tax_identification || '20-19103601-9'),
      document_value: stepTwo.tax_identification || '20-19103601-9',
      pixKey: pixKey || '',
      pix_value: stepTwo.pixKey || 'oa@gmail.com',
      cpf: stepTwo.individual_tax_id.replace(/[.-]/g, '') || '111.111.111-11',
      currency: selectedSendingSystem?.coin || '',
      network: stepThree.network || 'tron',
      wallet: stepThree.wallet || 'TSgBPeFSb9TxJWyzDjDfuNqBktF898ZFUb',
    };

    const receiverDetails = {
      email_account: stepTwo.bank_email || '',
      transfer_code: stepTwo.transfer_identification || 'SwaplyAr.com',
      bank_name: stepTwo.name_of_bank || '',
      send_method_key: getTransferIdentificationType(stepTwo.transfer_identification),
      send_method_value: stepTwo.transfer_identification || '',
      document_type: getTaxIdentificationType(stepTwo.tax_identification),
      document_value: stepTwo.tax_identification || '',
      pixId: stepTwo.pixId || '',
      pixKey: pixKey || '',
      pixValue: stepTwo.pixKey || 'oa@gmail.com',
      cpf: stepTwo.individual_tax_id.replace(/[.-]/g, '') || '',
      currency: selectedReceivingSystem?.coin || '',
      network: stepTwo.red_selection?.value || '',
      wallet: stepTwo.usdt_direction || '',
      type: selectedReceivingSystem?.paymentMethod || '',
    };

    const payload = {
      transaction: {
        country_transaction: stepOne.calling_code?.country,
        message: 'Transaccion enviada',
        user_id: '',
        status: '',
        idAdmin: '',
      },
      sender: {
        first_name: stepOne.first_name,
        last_name: stepOne.last_name,
        identification: senderDetails.document_value,
        phone_number: formattedPhone,
        email: senderDetails.email_account,
      },
      receiver: {
        transaction_id: 'fj82JH5f',
        receiver_first_name: stepTwo.receiver_first_name,
        receiver_last_name: stepTwo.receiver_last_name,
      },
      payment_method: {
        sender: buildSenderMethod(selectedSendingSystem?.id || ''),
        receiver: buildPaymentMethod(selectedReceivingSystem?.id || '', receiverDetails),
      },
      amounts: {
        amount_sent: stepThree.send_amount,
        currency_sent: selectedSendingSystem?.coin,
        amount_received: stepThree.receive_amount,
        currency_received: selectedReceivingSystem?.coin,
      },
      status: {
        status: 'pending',
      },
    };

    const formDataPayload = new FormData();

    if (stepThree.proof_of_payment && stepThree.proof_of_payment.length > 0) {
      const realFile = stepThree.proof_of_payment[0];
      formDataPayload.append('file', realFile);
    } else {
      console.log('No hay archivo disponible');
    }
    const createTransactionDto: any = {
      countryTransaction: payload.transaction.country_transaction,
      message: payload.transaction.message,
      financialAccounts: {
        senderAccount: {
          firstName: payload.sender.first_name,
          lastName: payload.sender.last_name,
          phoneNumber: payload.sender.phone_number,
          createdBy: payload.sender.email,
          paymentMethod: payload.payment_method.sender,
        },
        receiverAccount: {
          first_name: stepTwo.receiver_first_name || '',
          last_name: stepTwo.receiver_last_name || '',
          paymentMethod: payload.payment_method.receiver,
        },
      },
      amount: {
        amountSent: parseFloat(stepThree.send_amount.replace(/[^\d.-]/g, '')) || 0,
        currencySent: selectedSendingSystem?.coin,
        amountReceived: parseFloat(stepThree.receive_amount.replace(/[^\d.-]/g, '')) || 0,
        currencyReceived: selectedReceivingSystem?.coin,
        received: false,
      },
      userDiscountIds: discountsIds || [],
    };
    if (createTransactionDto.financialAccounts.receiverAccount.paymentMethod.method === 'virtual_bank') {
      createTransactionDto.financialAccounts.receiverAccount.paymentMethod.type = selectedReceivingSystem?.id || '';
    }

    formDataPayload.append('createTransactionDto', JSON.stringify(createTransactionDto));

    try {
      const headers: Record<string, string> = {};
      if (accessToken) headers['Authorization'] = `Bearer ${accessToken}`;

      const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/transactions`, {
        method: 'POST',
        headers,
        body: formDataPayload,
      });

      if (!response.ok) {
        let serverMessage = '';
        let errorDetails: any = null;
        try {
          const errJson = await response.json();
          errorDetails = errJson;
          serverMessage = typeof errJson === 'string' ? errJson : JSON.stringify(errJson);
        } catch (_) {
          try {
            serverMessage = await response.text();
          } catch {}
        }
        
        console.error('Fallo creación de transacción', {
          status: response.status,
          statusText: response.statusText,
          serverMessage,
        });

        // Manejo específico para errores de validación de teléfono
        if (response.status === 400 && errorDetails?.errors) {
          const phoneErrors = errorDetails.errors.filter((error: string) => 
            error.toLowerCase().includes('número') || error.toLowerCase().includes('teléfono') || error.toLowerCase().includes('phone')
          );
          
          if (phoneErrors.length > 0) {
            throw new Error(`Error de validación: ${phoneErrors[0]}`);
          }
          
          throw new Error(`Error de validación: ${errorDetails.errors[0] || 'Datos inválidos'}`);
        }
        
        throw new Error('Error al enviar los datos al servidor');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error en la solicitud:', error);
      return false;
    }
  },
  submitOneStep: async () => {
    const state = get();
    const { stepOne } = state.formData;

    const payload = {
      first_name: stepOne.first_name,
      last_name: stepOne.last_name,
      email: stepOne.email,
      phone_number: formatPhoneNumber(stepOne.calling_code?.callingCode, stepOne.phone),
    };

    try {
      const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/abandoned-transactions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Error al enviar los datos al servidor');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error en la solicitud:', error);
      return null;
    }
  },
  updateOneStep: async (id: string) => {
    const state = get();
    const { stepOne } = state.formData;

    const payload = {
      first_name: stepOne.first_name,
      last_name: stepOne.last_name,
      email: stepOne.email,
      phone_number: formatPhoneNumber(stepOne.calling_code?.callingCode, stepOne.phone),
    };

    try {
      const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/abandoned-transactions/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Error al enviar los datos al servidor');
      }

      const data = await response.json();
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  },
  resetToDefault: () =>
    set(() => ({
      activeStep: 0,
      completedSteps: [false, false, false],
      formData: {
        stepOne: {
          first_name: '',
          last_name: '',
          calling_code: undefined,
          phone: '',
          email: '',
          own_account: undefined,
        },
        stepTwo: {
          receiver_first_name: '',
          receiver_last_name: '',
          tax_identification: '',
          transfer_identification: '',
          re_transfer_identification: '',
          name_of_bank: '',
          bank_email: '',
          re_enter_bank_email: '',
          usdt_direction: '',
          re_enter_usdt_direction: '',
          red_selection: {
            value: '',
            label: '',
            image: <></>,
          },
          recieveAmountRed: '',
          pixId: '',
          pixKey: '',
          individual_tax_id: '',
        },
        stepThree: {
          send_amount: '',
          receive_amount: '',
          pay_email: '',
          proof_of_payment: null,
          note: '',
          network: '',
          wallet: '',
        },
      },
    })),
  setIdTransaction: (id: string) => set(() => ({ idTransaction: id })),
  resetIdTransaction: () => set(() => ({ idTransaction: undefined })),
}));
