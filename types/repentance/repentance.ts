import { CountryOption } from "../request/request";

export type FormRepentance ={
    transaction_id: string;
    last_name: string;
  email: string;
  phone_number: string;
  note: string;
  status: string;
}
export interface FormData {
  transaction_id: string;
  last_name: string;
  email: string;
  phone_number: string;
  note: string;
  calling_code: CountryOption | null;
  status: string;
};
export interface CheckRefundProps {
  transaction_id: string;
  email: string;
  last_name: string;
}

export interface FormularioProps {
  handleRepentanceProcess: () => Promise<void>; // Define la prop que recibirá la función
}