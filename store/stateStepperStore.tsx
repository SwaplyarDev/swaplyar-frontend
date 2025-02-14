import { System } from '@/types/data';
import { CountryOption, RedType } from '@/types/request/request';
import { buildPaymentMethod } from '@/utils/buildPaymentMethod';
import { detectarTipoPixKey, getTaxIdentificationType, getTransferIdentificationType } from '@/utils/validationUtils';
import { create } from 'zustand';

const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

interface StepOneData {
  sender_first_name: string;
  sender_last_name: string;
  calling_code: CountryOption | undefined;
  phone: string;
  email: string;
  own_account: string | undefined;
}

interface StepTwoData {
  receiver_first_name: string;
  receiver_last_name: string;
  tax_identification: string;
  transfer_identification: string;
  re_transfer_identification: string;
  name_of_bank: string;
  bank_email: string;
  re_enter_bank_email: string;
  usdt_direction: string;
  re_enter_usdt_direction: string;
  red_selection: RedType | undefined;
  recieveAmountRed: string;
  pix_key: string;
  individual_tax_id: string;
}

interface StepThreeData {
  send_amount: string;
  receive_amount: string;
  pay_email: string;
  proof_of_payment: FileList | null;
  note: string;
  network?: string;
  wallet?: string;
}

interface FormData {
  stepOne: StepOneData;
  stepTwo: StepTwoData;
  stepThree: StepThreeData;
}

interface StepperState {
  activeStep: number;
  completedSteps: boolean[];
  formData: FormData;
  idTransaction: string | undefined;
  setActiveStep: (step: number) => void;
  markStepAsCompleted: (step: number) => void;
  updateFormData: (step: number, data: Partial<FormData[keyof FormData]>) => void; // Permite actualizaciones parciales
  submitAllData: (selectedSendingSystem: System | null, selectedReceivingSystem: System | null) => Promise<boolean>;
  submitOneStep: () => Promise<any>;
  updateOneStep: (id: string) => void;
  resetToDefault: () => void;
  setIdTransaction: (id: string) => void;
  resetIdTransaction: () => void;
}

export const useStepperStore = create<StepperState>((set, get) => ({
  activeStep: 0,
  completedSteps: [false, false, false],
  formData: {
    stepOne: {
      sender_first_name: '',
      sender_last_name: '',
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
      red_selection: undefined,
      recieveAmountRed: '',
      pix_key: '',
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
  ): Promise<boolean> => {
    const state = get();
    const { stepOne, stepTwo, stepThree } = state.formData;

    const pixValue = detectarTipoPixKey(stepTwo.pix_key);

    const senderDetails: Record<string, string> = {
      email_account: stepThree.pay_email || '',
      transfer_code: stepTwo.transfer_identification || '',
      bank_name: stepTwo.name_of_bank || '',
      send_method_key: getTaxIdentificationType(stepTwo.transfer_identification),
      send_method_value: stepTwo.transfer_identification || '',
      document_type: getTransferIdentificationType(stepTwo.tax_identification),
      document_value: stepTwo.tax_identification || '',
      pix_key: stepTwo.pix_key || '',
      pix_value: pixValue || '',
      cpf: stepTwo.individual_tax_id.replace(/[.-]/g, '') || '',
      currency: selectedSendingSystem?.coin.toLowerCase() || '',
      network: stepThree.network || '',
      wallet: stepThree.wallet || '',
    };

    const receiverDetails = {
      email_account: stepTwo.bank_email || '',
      transfer_code: stepTwo.transfer_identification || '',
      bank_name: stepTwo.name_of_bank || '',
      send_method_key: getTaxIdentificationType(stepTwo.transfer_identification),
      send_method_value: stepTwo.transfer_identification || '',
      document_type: getTransferIdentificationType(stepTwo.tax_identification),
      document_value: stepTwo.tax_identification || '',
      pix_key: stepTwo.pix_key || '',
      pix_value: pixValue || '',
      cpf: stepTwo.individual_tax_id.replace(/[.-]/g, '') || '',
      currency: selectedReceivingSystem?.coin.toLowerCase() || '',
      network: stepTwo.red_selection?.value || '',
      wallet: stepTwo.usdt_direction || '',
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
        sender_first_name: stepOne.sender_first_name,
        sender_last_name: stepOne.sender_last_name,
        identification: '',
        phone_number: stepOne.calling_code?.callingCode + stepOne.phone,
        email: stepOne.email,
      },
      receiver: {
        transaction_id: 'fj82JH5f',
        receiver_first_name: stepTwo.receiver_first_name,
        receiver_last_name: stepTwo.receiver_last_name,
      },
      payment_method: {
        sender: buildPaymentMethod(selectedSendingSystem?.paymentMethod || '', senderDetails),
        receiver: buildPaymentMethod(selectedReceivingSystem?.paymentMethod || '', receiverDetails),
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
    formDataPayload.append('transaction', JSON.stringify(payload.transaction));
    formDataPayload.append('sender', JSON.stringify(payload.sender));
    formDataPayload.append('receiver', JSON.stringify(payload.receiver));
    formDataPayload.append('payment_method', JSON.stringify(payload.payment_method));
    formDataPayload.append('amounts', JSON.stringify(payload.amounts));
    formDataPayload.append('status', JSON.stringify(payload.status));

    console.log(' payload: ', formDataPayload);
    try {
      const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/v1/transactions`, {
        method: 'POST',
        body: formDataPayload,
      });

      console.log('response: ', response);

      if (!response.ok) {
        throw new Error('Error al enviar los datos al servidor');
      }

      return true;
    } catch (error) {
      console.error('Error en la solicitud:', error);
      return false;
    }
  },
  submitOneStep: async () => {
    const state = get();
    const { stepOne } = state.formData;

    const payload = {
      full_name: `${stepOne.sender_first_name} ${stepOne.sender_last_name}`,
      email: stepOne.email,
      phone_number: stepOne.calling_code?.callingCode + stepOne.phone,
    };

    try {
      const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/v1/canceled_transactions`, {
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
      full_name: `${stepOne.sender_first_name} ${stepOne.sender_last_name}`,
      email: stepOne.email,
      phone_number: stepOne.calling_code?.callingCode + stepOne.phone,
    };

    try {
      const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/v1/canceled_transactions/${id}`, {
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
          sender_first_name: '',
          sender_last_name: '',
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
          red_selection: undefined,
          recieveAmountRed: '',
          pix_key: '',
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
