export interface TransactionType {
  transaction: {
    transaction_id: string;
    sender_accounts_id: string;
    receiver_accounts_id: string;
    country_transaction: string;
    message: string;
    created_at: string;
    user_id: string | null;
    status: string;
    idAdmin: string | null;
  };
  sender: {
    first_name: string;
    last_name: string;
    identification: string;
    phone_number: string;
    email: string;
    payment_method_id: string;
  };
  receiver: {
    first_name: string;
    last_name: string;
    payment_method_id: string;
  };
  payment_method: {
    sender: {
      value: string;
      details: {
        email_account: string;
        transfer_code: string;
      };
    };
    receiver: {
      value: string;
      details: {
        bank_name: string;
        sender_method_key: string;
        sender_method_value: string;
        document_type: string;
        document_value: string;
      };
    };
  };
  amounts: {
    sent: {
      amount: string;
      currency: string;
    };
    received: {
      amount: string;
      currency: string;
    };
  };
  status: string;
  proof_of_payment: {
    img_transaction: string;
  };
}
