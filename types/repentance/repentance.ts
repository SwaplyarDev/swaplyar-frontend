import { CountryOption } from '../request/request';

export type FormRepentance = {
  transaction_id: string;
  last_name: string;
  email: string;
  phone_number: string;
  note?: string;
  status: string;
};

export interface FormData {
  transaction_id: string;
  last_name: string;
  email: string;
  phone_number: string;
  note?: string;
  calling_code?: CountryOption;
  status: string;
}
export interface OutputFormat {
  transaction_id: string;
  last_name: string;
  email: string;
  phone_number: string;
  note?: string;
  status: string;
}
export interface AlertsProps {
  isDark: boolean;
  message?: string;
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
