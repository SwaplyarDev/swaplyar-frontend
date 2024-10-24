export type FormInputs = {
  sender_first_name: string;
  sender_last_name: string;
  email: string;
  wise_email: string;
  re_enter_wise_email: string;
  send_amount: string;
  receive_amount: string;
  comprobante: FileList;
  nota: string;
  own_account: boolean
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
  tax_identification: string;
  transfer_identification: string;
  re_transfer_identification: string;
  name_of_bank: string;
};

export type CountryOption = {
  value: string;
  label: string;
  callingCode: string;
};

// TransactionRequest

export type TransactionRequest = {
  transaction: {
    sender: {
      first_name: string;
      last_name: string;
      identification: string;
      phone_number: string;
      email: string;
      bank_account: {
        email_account: string;
        payment_method: string;
        number_account: string;
      };
    };
    receiver: {
      first_name: string;
      last_name: string;
      bank_account: {
        email_account: string;
        payment_method: string;
        number_account: string;
      };
    };
    transfer: {
      transfer_code: string;
      country_transaction: string;
      message: string;
    };
    amounts: {
      amount_sent: number;
      currency_sent: string;
      amount_received: number;
      currency_received: string;
    };
    proof_of_payment: {
      img_transaction: string; // base64 string o URL
    };
  };
};
