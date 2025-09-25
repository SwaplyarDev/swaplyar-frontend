export interface TransactionByUserId {
  meta: {
    totalPages: number;
    totalItems: number;
    page: number;
    perPage: number;
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

export interface ResponseCreateTransaction {
  id: string;
  countryTransaction: string;
  message: string;
  createdAt: string;
  finalStatus: string;
  senderAccount: SenderAccountCreateTransaction;
  receiverAccount: ReceiverAccountCreateTransaction;
  proofOfPayment: ProofOfPayment;
  amount: Amount;
}

export interface SenderAccount {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface SenderAccountCreateTransaction {
    id: string;
    paymentMethod: {
        id: string;
        platformId: string;
        method: string;
        currency: string | null;
        bankName: string | null;
        sendMethodKey: string | null;
        sendMethodValue: string | null;
        documentType: string | null;
        documentValue: string | null;
    };
}

export interface ReceiverAccount {
  id: string;
  firstName: string;
  lastName: string;
  identificationNumber?: string;
  phoneNumber?: string;
  email?: string;
}

export interface ReceiverAccountCreateTransaction {
    id: string;
    paymentMethod: {
        id: string;
        platformId: string;
        method: string;
        currency: string | null;
        bankName: string | null;
        sendMethodKey: string | null;
        sendMethodValue: string | null;
        documentType: string | null;
        documentValue: string | null;
    };
}

export interface Amount {
  id: string;
  amountSent: number;
  currencySent: string;
  amountReceived: number;
  currencyReceived: string;
  received: boolean;
}

export interface ProofOfPayment {
    id: string;
    imgUrl: string;
    createAt: string;
}