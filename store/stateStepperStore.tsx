import { System } from '@/types/data';
import { CountryOption } from '@/types/request/request';
import { create } from 'zustand';

const BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080/api';

interface StepOneData {
  sender_first_name: string;
  sender_last_name: string;
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
  wise_email: string;
  re_enter_wise_email: string;
}

interface StepThreeData {
  send_amount: string;
  receive_amount: string;
  pay_email: string;
  proof_of_payment: File | null;
  note: string;
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
  setActiveStep: (step: number) => void;
  markStepAsCompleted: (step: number) => void;
  updateFormData: (
    step: number,
    data: Partial<FormData[keyof FormData]>,
  ) => void; // Permite actualizaciones parciales
  submitAllData: (
    selectedSendingSystem: System | null,
    selectedReceivingSystem: System | null,
  ) => void;
}

export const useStepperStore = create<StepperState>((set, get) => ({
  activeStep: 0,
  completedSteps: [false, false, false], // Tres pasos por defecto
  formData: {
    stepOne: {
      sender_first_name: '',
      sender_last_name: '',
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
      wise_email: '',
      re_enter_wise_email: '',
    },
    stepThree: {
      send_amount: '',
      receive_amount: '',
      pay_email: '',
      proof_of_payment: null,
      note: '',
    },
  },
  setActiveStep: (step) => set((state) => ({ ...state, activeStep: step })),
  markStepAsCompleted: (step) =>
    set((state) => {
      const updatedSteps = [...state.completedSteps];
      updatedSteps[step] = true;
      return { completedSteps: updatedSteps };
    }),
  updateFormData: (step, data) => {
    const stepKeys = ['stepOne', 'stepTwo', 'stepThree'] as const; // Define un array con las claves de los pasos
    const stepKey = stepKeys[step]; // Obtiene la clave correspondiente

    return set((state) => ({
      formData: {
        ...state.formData,
        [stepKey]: { ...state.formData[stepKey], ...data }, // Actualiza la propiedad correspondiente
      },
    }));
  },
  submitAllData: async (selectedSendingSystem, selectedReceivingSystem) => {
    const state = get(); // Obtener el estado actual
    const { stepOne, stepTwo, stepThree } = state.formData;

    const fileToBase64 = (file: File): Promise<string> =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
      });

    const payload = {
      transaction: {
        sender: {
          first_name: stepOne.sender_first_name,
          last_name: stepOne.sender_last_name,
          identification: stepTwo.tax_identification,
          phone_number: stepOne.phone,
          email: stepOne.email,
          bank_account: {
            email_account: stepThree.pay_email,
            payment_method: selectedSendingSystem?.name || '',
            number_account: stepOne.own_account || '',
          },
        },
        receiver: {
          first_name: stepTwo.receiver_first_name,
          last_name: stepTwo.receiver_last_name,
          bank_account: {
            email_account: stepTwo.wise_email,
            payment_method: selectedReceivingSystem?.name || '',
            number_account: stepTwo.transfer_identification,
          },
        },
        transfer: {
          transfer_code: 'TRX202409300001',
          country_transaction: 'USA',
          message: stepThree.note,
          created_at: new Date().toISOString(),
        },
        amounts: {
          amount_sent: parseFloat(stepThree.send_amount),
          currency_sent: selectedSendingSystem?.coin || '',
          amount_received: parseFloat(stepThree.receive_amount),
          currency_received: selectedReceivingSystem?.coin || '',
        },
        proof_of_payment: {
          img_transaction: stepThree.proof_of_payment
            ? await fileToBase64(stepThree.proof_of_payment)
            : '',
        },
      },
    };

    try {
      const response = await fetch(`${BASE_URL}/v1/transactions`, {
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
      console.log('Respuesta del servidor:', data);
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  },
}));
