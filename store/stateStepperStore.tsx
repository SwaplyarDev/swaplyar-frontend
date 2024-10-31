import { CountryOption } from '@/types/request/request';
import { create } from 'zustand';

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
  proof_of_payment: FileList | null;
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
  submitAllData: () => void;
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
  submitAllData: () => {
    const state = get(); // Obtener el estado actual
    console.log('Todos los datos del formulario:', state.formData);
    // Aquí puedes agregar la lógica para enviar los datos a tu servidor
  },
}));
