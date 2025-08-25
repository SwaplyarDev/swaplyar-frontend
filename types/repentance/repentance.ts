import { CountryOption } from '../request/request';

export type FormRepentance = {
  transaction_id: string;
  last_name: string;
  email: string;
  phone_number: string;
  note?: string;
};

export interface FormData {
  transaction_id: string;
  last_name: string;
  email: string;
  phone_number: string;
  note?: string;
  calling_code?: CountryOption;
}

export interface FormRequestCompleted {
  transaction_id: string;
  stars_amount: number;
  note?: string;
}

export interface OutputFormat {
  transaction_id: string;
  last_name: string;
  email: string;
  phone_number: string;
  note?: string;
}
export interface AlertsProps {
  isDark: boolean;
  toggleTooltip: () => void;
  setIsTooltipVisible: React.Dispatch<React.SetStateAction<boolean>>;
  message?: string;
  transaction_id?: string;
  dataToSend?: FormData;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface FormularioProps {
  onSubmit: (data: FormRepentance) => void;
}
export interface AlertProcessProps {
  isDark: boolean;
  formData: FormData;
  isLoading: boolean;
}
export interface Size {
  size?: number;
  isDark?: boolean;
}
