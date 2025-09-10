import { CountryOption, RedType } from '@/types/request/request';
import { System } from '@/types/data';

export interface StepOneData {
  first_name: string;
  last_name: string;
  calling_code: CountryOption | undefined;
  phone: string;
  email: string;
  own_account: string | undefined;
}

export interface StepTwoData {
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
  red_selection?: RedType;
  recieveAmountRed: string;
  pixId: string;
  pixKey: string;
  individual_tax_id: string;
}

export interface StepThreeData {
  send_amount: string;
  receive_amount: string;
  pay_email: string;
  proof_of_payment: FileList | null;
  note: string;
  network?: string;
  wallet?: string;
}

export interface FormData {
  stepOne: StepOneData;
  stepTwo: StepTwoData;
  stepThree: StepThreeData;
}

export interface StepperState {
  activeStep: number;
  completedSteps: boolean[];
  formData: FormData;
  idTransaction: string | undefined;
  setActiveStep: (step: number) => void;
  markStepAsCompleted: (step: number) => void;
  updateFormData: (step: number, data: Partial<FormData[keyof FormData]>) => void; // Permite actualizaciones parciales
  submitAllData: (
    selectedSendingSystem: System | null,
    selectedReceivingSystem: System | null,
    accessToken?: string,
  ) => Promise<any>;
  submitOneStep: () => Promise<any>;
  updateOneStep: (id: string) => void;
  resetToDefault: () => void;
  setIdTransaction: (id: string) => void;
  resetIdTransaction: () => void;
}