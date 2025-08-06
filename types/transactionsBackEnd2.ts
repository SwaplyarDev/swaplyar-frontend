export interface TransactionByUserId {
  meta: {
    totalPages: number;
    totalItems: number;
    page: number;
    perPage: number;
    totalTransactions: number;
  };
  data: Transaction[];
}

export interface Transaction {
  id: string;
  countryTransaction: string;
  message: string;
  createdAt: string;
  createdBy: string;
  finalStatus: string;
  senderAccount: SenderAccount;
  receiverAccount: ReceiverAccount;
  userId: string;
  proofOfPayment: string | null;
  amount: Amount;
}

export interface SenderAccount {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface ReceiverAccount {
  id: string;
  firstName: string;
  lastName: string;
  identificationNumber?: string;
  phoneNumber?: string;
  email?: string;
}

export interface Amount {
  id: string;
  amountSent: number;
  currencySent: string;
  amountReceived: number;
  currencyReceived: string;
  received: boolean;
}
