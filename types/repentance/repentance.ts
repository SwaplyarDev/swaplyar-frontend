import { CountryOption } from "../request/request";

export type FormRepentance ={
    referenceNumber: string;
  lastName: string;
  email: string;
  phone_number: string;
  note: string;
}
export interface FormData {
  referenceNumber: string;
  lastName: string;
  email: string;
  phone_number: string;
  note: string;
  calling_code: CountryOption | null;
};
