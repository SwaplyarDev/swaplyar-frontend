export interface SenderAccount {
  id: string;
  firstName: string;
  lastName: string;
  createdBy: string;
  phoneNumber: string;
  paymentMethod: {
    id: string;
    platformId: string;
    method: string;
  };
}

export interface ReceiverAccount {
  id: string;
  firstName: String;
  lastName: String;
  paymentMethod: {
    id: string;
    tipo: string;
    method: string;
    currency: string;
    bankName: string;
    sendMethodKey: string;
    cuenta: string;
    documentType: string;
    documento: string;
    wallet: string;
    red: string;
    email: string;
    codigoTransferencia: string;
    cpf: string;
    valor: string;
    plataformId: string;
  };
}

export interface Amount {
  id: string;
  amountSent: string;
  currencySent: string;
  amountReceived: string;
  currencyReceived: string;
  received: boolean;
}

export interface ProofOfPayment {
  id: string;
  imgUrl: string;
  createAt: string;
}

export interface Note {
  note_id: string;
}

export interface TransactionData {
  id: string;
  countryTransaction: string;
  message: string;
  createdAt: string;
  finalStatus: | 'completed'
    | 'approved'
    | 'in_transit'
    | 'refund_in_transit'
    | 'pending'
    | 'review_payment'
    | 'modified'
    | 'discrepancy'
    | 'rejected'
    | 'cancelled'
    | 'canceled'
    | 'refunded';
  senderAccount: SenderAccount;
  receiverAccount: ReceiverAccount;
  note: Note;
  proofsOfPayment: ProofOfPayment[];
  amount: Amount;
  isNoteVerified: boolean;
  noteVerificationExpiresAt: string;
}
