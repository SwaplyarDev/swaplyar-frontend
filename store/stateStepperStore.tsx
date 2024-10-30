import { create } from 'zustand';

interface StepOneData {
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
}

interface StepTwoData {
  destinatario: string;
  direccion: string;
  ciudad: string;
  codigoPostal: string;
}

interface StepThreeData {
  metodoPago: string;
  numeroTarjeta: string;
  fechaVencimiento: string;
  cvv: string;
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
  updateFormData: (step: number, data: Partial<FormData[keyof FormData]>) => void; // Permite actualizaciones parciales
  submitAllData: () => void;
}

export const useStepperStore = create<StepperState>((set, get) => ({
  activeStep: 0,
  completedSteps: [false, false, false], // Tres pasos por defecto
  formData: {
    stepOne: { nombre: '', apellido: '', email: '', telefono: '' },
    stepTwo: { destinatario: '', direccion: '', ciudad: '', codigoPostal: '' },
    stepThree: {
      metodoPago: '',
      numeroTarjeta: '',
      fechaVencimiento: '',
      cvv: '',
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
