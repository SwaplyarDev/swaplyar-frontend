export type FormInputs = {
  //SECTION 1
  sender_first_name: string;
  sender_last_name: string;
  email: string;
  phone: string;
  own_account: string;

  //SECTION 2
  //bank
  //repiten en other
  receiver_first_name: string;
  receiver_last_name: string;
  //unicos bank
  tax_identification: string;
  transfer_identification: string;
  re_transfer_identification: string;
  name_of_bank: string;
  //other
  bank_email: string;
  re_enter_bank_email: string;
  payoneer_email: string;
  re_enter_payoneer_email: string;

  //SECTION 3
  pay_email: string;
  send_amount: string;
  receive_amount: string;
  proof_of_payment: File;
  note: string;
};

export type CountryOption = {
  value: string;
  label: string;
  callingCode: string;
  country: string;
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

export type RedType = {
  value: string;
  label: string;
  image: JSX.Element;
};

export type CronometroProps = {
  setBlockAll: (value: boolean) => void;
};

export type FieldError = {
  message: string;
};

export type SelectRedProps = {
  selectedRed: RedType | undefined;
  setSelectedRed: (option: RedType | undefined) => void;
  errors: { [key: string]: FieldError } | {};
  blockAll: boolean;
};

export type SelectCodeCountryProps = {
  selectedCodeCountry?: CountryOption | undefined;
  setSelectedCodeCountry: (option: CountryOption | undefined) => void;
  errors: { [key: string]: FieldError } | {}; // Tipado explícito
  blockAll?: boolean;
};

export type SelectBooleanProps = {
  selectedOption: string | undefined;
  setSelectedOption: (option: string | undefined) => void;
  errors: { [key: string]: FieldError } | {}; // Tipado explícito
  blockAll: boolean;
};

export type payerOptions = {
  sendAmount: number;
  sendCurrency: string;
  recibeAmount: number;
  recibeCurrency: string;
};
