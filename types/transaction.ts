// Interfaces for transaction data structure
export interface SenderDetails {
  email_account: string;
  transfer_code: string;
}

export interface ReceiverDetails {
  bank_name: string;
  sender_method_key: string;
  sender_method_value: string;
  document_type: string;
  document_value: string;
}

export interface PaymentMethod {
  sender: {
    value: string;
    details: SenderDetails;
  };
  receiver: {
    value: string;
    details: ReceiverDetails;
  };
}

export interface Amount {
  amount: string;
  currency: string;
}

export interface Amounts {
  sent: Amount;
  received: Amount;
}

export interface ProofOfPayment {
  img_transaction: string;
}

export interface Transaction {
  transaction_id: string;
  sender_accounts_id: string;
  receiver_accounts_id: string;
  country_transaction: string;
  message: string;
  created_at: string;
  user_id: string | null;
  status: string;
  idAdmin: string | null;
  regret_id: string | null;
  note_id: string | null;
}

export interface Sender {
  first_name: string;
  last_name: string;
  identification: string;
  phone_number: string;
  email: string;
  payment_method_id: string;
}

export interface Receiver {
  first_name: string;
  last_name: string;
  payment_method_id: string;
}

export interface TransactionData {
  transaction: Transaction;
  sender: Sender;
  receiver: Receiver;
  payment_method: PaymentMethod;
  amounts: Amounts;
  status: string;
  proof_of_payment: ProofOfPayment;
}

// Interface for paginated response
export interface PaginatedResponse {
  data: TransactionData[];
  pagination: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    perPage: number;
  };
}
