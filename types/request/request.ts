export type FormInputs = {
  sender_first_name: string;
  sender_last_name: string;
  receiver_first_name: string;
  receiver_last_name: string;
  amount_sent: number;
  currency_sent: string;
  amount_received: number;
  currency_received: string;
  phone: string;
  receiver_email: string;
  transfer_code: string;
  transaction_destination: string;
  payment_bank: string;
  reciver_bank: string;
  document: string;
  sender_email: string;
  proof_of_payment: FileList;
  note: string;
  country: string;
  type_of_document: string;
};

export type CountryOption = {
  value: string;
  label: string;
  callingCode: string;
};

