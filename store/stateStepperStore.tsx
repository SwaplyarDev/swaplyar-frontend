import { System } from '@/types/data';
import { CountryOption, RedType } from '@/types/request/request';
import { create } from 'zustand';

// transaction: {
//   sender: {
//     first_name: 'John',
//     last_name: 'Doe',
//     identification: '1234567890',
//     phone_number: '+55988032066',
//     email: 'brasil@swaplyar.com',
//     bank_account: {
//       email_account: 'jane.smith.bank@example.com',
//       payment_method: 'wise',
//       number_account: 'sender-number-123456',
//     },
//   },
//   receiver: {
//     first_name: 'John',
//     last_name: 'Doe',
//     bank_account: {
//       email_account: 'tincho@gmail.com',
//       name: 'Galicia',
//       payment_method: 'paypal',
//       number_account: 'receiver-number-123456',
//     },
//     document: {
//       type: 'dni',
//       value: '43412385',
//     },
//     crypto: {
//       currency: 'usdt',
//       network: 'ether',
//       wallet: 'jfuyher85',
//     },
//   },
//   transfer: {
//     transfer_code: 'TRX202409300001',
//     country_transaction: 'USA',
//     message: 'Payment for services',
//     created_at: '2024-09-30T12:00:00Z',
//   },
//   amounts: {
//     amount_sent: 1000.0,
//     currency_sent: 'USD',
//     amount_received: 960.0,
//     currency_received: 'EUR',
//   },
//   status: 'pending',
//   idAdmin: 'utqmzt2qvni',
// },

const BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080/api';

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
  updateFormData: (
    step: number,
    data: Partial<FormData[keyof FormData]>,
  ) => void; // Permite actualizaciones parciales
  submitAllData: (
    selectedSendingSystem: System | null,
    selectedReceivingSystem: System | null,
  ) => Promise<boolean>;
  submitOneStep: () => Promise<any>;
  updateOneStep: (id: string) => void;
  // getOneStep: () => Promise<any>;
  resetToDefault: () => void;
  setIdTransaction: (id: string) => void;
  resetIdTransaction: () => void;
}

export const useStepperStore = create<StepperState>((set, get) => ({
  activeStep: 0,
  completedSteps: [false, false, false], // Tres pasos por defecto
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
    const stepKeys = ['stepOne', 'stepTwo', 'stepThree'] as const; // Define un array con las claves de los pasos
    const stepKey = stepKeys[step]; // Obtiene la clave correspondiente

    return set((state) => ({
      formData: {
        ...state.formData,
        [stepKey]: { ...state.formData[stepKey], ...data }, // Actualiza la propiedad correspondiente
      },
    }));
  },
  submitAllData: async (
    selectedSendingSystem: System | null,
    selectedReceivingSystem: System | null,
  ): Promise<boolean> => {
    const state = get(); // Obtener el estado actual
    const { stepOne, stepTwo, stepThree } = state.formData;

    console.log(stepThree.proof_of_payment);

    const payload = {
      transaction: {
        sender: {
          first_name: stepOne.sender_first_name,
          last_name: stepOne.sender_last_name,
          phone_number: stepOne.calling_code?.callingCode + stepOne.phone,
          email: stepOne.email,
          bank_account: {
            email_account: stepOne.email,
            payment_method: selectedSendingSystem?.name || '',
            number_account: '',
          },
        },
        receiver: {
          first_name: stepTwo.receiver_first_name,
          last_name: stepTwo.receiver_last_name,
          bank_account: {
            email_account: stepTwo.bank_email || 'hola@gmail.com',
            name: stepTwo.name_of_bank,
            payment_method: selectedReceivingSystem?.name || '',
            number_account: '',
          },
          document: {
            type: 'dni',
            value: stepTwo.individual_tax_id || '12345678',
          },
          crypto: {
            currency: 'usdt',
            network: 'trc20',
            wallet: 'jfuyher85',
          },
        },
        transfer: {
          transfer_code: '2134534534',
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
        status: 'pending',
        idAdmin: '',
      },
    };

    const formDataPayload = new FormData();

    if (stepThree.proof_of_payment && stepThree.proof_of_payment.length > 0) {
      const realFile = stepThree.proof_of_payment[0];
      formDataPayload.append('file', realFile);
      console.log('Archivo:', realFile);
    } else {
      console.log('No hay archivo disponible');
    }
    formDataPayload.append('transactions', JSON.stringify(payload));

    try {
      // for (let pair of formDataPayload.entries()) {
      //   console.log(pair[0] + ', ' + pair[1]);
      // }
      const response = await fetch(`${BASE_URL}/v1/transactions`, {
        method: 'POST',
        // headers: {
        //   'Content-Type': 'multipart/form-data',
        // },
        body: formDataPayload,
      });

      if (!response.ok) {
        throw new Error('Error al enviar los datos al servidor');
      }

      const data = await response.json();
      console.log('Respuesta del servidor:', data);
      return true; // Indicar que la operación fue exitosa
    } catch (error) {
      console.error('Error en la solicitud:', error);
      return false; // Indicar que hubo un error
    }
  },
  submitOneStep: async () => {
    const state = get(); // Obtener el estado actual
    const { stepOne } = state.formData;

    const payload = {
      full_name: `${stepOne.sender_first_name} ${stepOne.sender_last_name}`,
      email: stepOne.email,
      phone_number: stepOne.calling_code?.callingCode + stepOne.phone,
    };

    try {
      const response = await fetch(`${BASE_URL}/v1/canceled_transactions`, {
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
      return data; // Retornar la data obtenida
    } catch (error) {
      console.error('Error en la solicitud:', error);
      return null; // Retornar null en caso de error
    }
  },
  updateOneStep: async (id: string) => {
    const state = get(); // Obtener el estado actual
    const { stepOne } = state.formData;

    const payload = {
      full_name: `${stepOne.sender_first_name} ${stepOne.sender_last_name}`,
      email: stepOne.email,
      phone_number: stepOne.calling_code?.callingCode + stepOne.phone,
    };

    try {
      const response = await fetch(
        `${BASE_URL}/v1/canceled_transactions/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        },
      );

      if (!response.ok) {
        throw new Error('Error al enviar los datos al servidor');
      }

      const data = await response.json();
      console.log('Respuesta del servidor:', data);
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  },
  // getOneStep: async () => {
  //   try {
  //     const response = await fetch(`${BASE_URL}/v1/canceled_transactions`, {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     });
  //     const data = await response.json();
  //     console.log('Respuesta del servidor:', data); // Mueve el console.log antes del return
  //     return data;
  //   } catch (error) {
  //     console.error('Error en la solicitud:', error);
  //     return { error: 'Error en la solicitud' }; // Devuelve un valor de error en caso de fallo
  //   }
  // },
  resetToDefault: () =>
    set((state) => ({
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
        },
      },
    })),
  setIdTransaction: (id: string) => set((state) => ({ idTransaction: id })),
  resetIdTransaction: () => set((state) => ({ idTransaction: undefined })),
}));
