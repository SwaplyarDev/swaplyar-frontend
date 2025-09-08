export interface SenderAccount {
  id: string
  firstName: string
  lastName: string
  createdBy: string | null
  phoneNumber: string
  paymentMethod?: PaymentMethodSender
}

export interface PaymentMethodSender {
  id: string;
  platformId: string;
  method: string | null;
}

export interface PaymentMethodReceiver {
  id: string;
  platformId: string;
  method: string;
  currency: string;
  bankName: string;
  sendMethodKey: string;
  sendMethodValue: string;
  documentType: string;
  documentValue: string;
}

export interface ReceiverAccount {
  id: string;
  paymentMethod: PaymentMethodReceiver;
}

export interface ProofOfPayment {
  id: string
  imgUrl: string
  createAt: string
}

export interface Amount {
  id: string
  amountSent: string
  currencySent: string
  amountReceived: string
  currencyReceived: string
  received: boolean
}

export interface Note {
  note_id: string
  img_url: string
  message: string
  createdAt: string
}

export interface TransactionV2 {
  id: string
  countryTransaction: string
  message: string
  createdAt: string
  createdBy: string
  finalStatus: string
  senderAccount: SenderAccount
  receiverAccount: ReceiverAccount
  userId: string | null
  proofOfPayment: ProofOfPayment
  amount: Amount
  regret_id?: string | null
  note?: Note 
  isNoteVerified: boolean
  noteVerificationExpiresAt: string
}

export interface TransactionArrayV2 {
  meta: {
    totalPages: number
    page: number
    perPage: number
    totalTransactions: number
  }
  data: TransactionV2[]
}

export const emptyTransactionArrayV2: TransactionArrayV2 = {
  meta: {
    totalPages: 0,
    page: 0,
    perPage: 0,
    totalTransactions: 0,
  },
  data: [],
}

export const emptyNote : Note = {
     note_id: '',
     img_url: '',
     message: '',
     createdAt: '',
 
}

export const emptyTransactionV2: TransactionV2 = {
  id: '',
  countryTransaction: '',
  message: '',
  createdAt: '',
  createdBy: '',
  finalStatus: '',
  senderAccount: {
    id: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    createdBy: null,
  },
  receiverAccount: {
    id: '',
    paymentMethod: {
      id: '',
      platformId: '',
      method: '',
      currency: '',
      bankName: '',
      sendMethodKey: '',
      sendMethodValue: '',
      documentType: '',
      documentValue: '',
    },
  },
  userId: null,
  proofOfPayment: {
    id: '',
    imgUrl: '',
    createAt: '',
  },
  amount: {
    id: '',
    amountSent: '',
    currencySent: '',
    amountReceived: '',
    currencyReceived: '',
    received: false,
  },
  regret_id: null,
  note: emptyNote,
  isNoteVerified: false,
  noteVerificationExpiresAt: '',
};

//Interfaces anteriores
export interface TransactionTypeSingle {
  transaction: {
    transaction_id: string
    sender_accounts_id: string
    receiver_accounts_id: string
    country_transaction: string
    message: string
    created_at: string
    user_id: string | null
    status: string
    idAdmin: string | null
    regret_id: string | null
    note_id: string | null
  }
  sender: {
    first_name: string
    last_name: string
    identification: string
    phone_number: string
    email: string
    payment_method_id: string
  }
  receiver: {
    first_name: string
    last_name: string
    payment_method_id: string
  }
  payment_method: {
    sender: {
      value: string
      details: any
    }
    receiver: {
      value: string
      details: any
    }
  }
  amounts: {
    sent: {
      amount: string
      currency: string
    }
    received: {
      amount: string
      currency: string
    }
  }
  status: string
  proof_of_payment: {
    img_transaction: string
  }
}

export interface TransactionTypeAll {
  transaction: {
    transaction_id: string
    sender_accounts_id: string
    receiver_accounts_id: string
    country_transaction: string
    message: string
    created_at: string
    user_id: string | null
    status: string
    idAdmin: string | null
    regret_id: string | null
    note_id: string | null
  }
  sender: {
    first_name: string
    last_name: string
    identification: string
    phone_number: string
    email: string
    payment_method_id: string
  }
  receiver: {
    first_name: string
    last_name: string
    payment_method_id: string
  }
  payment_method: {
    sender: {
      value: string
      details: {
        email_account: string
        transfer_code: string
      }
    }
    receiver: {
      value: string
      details: {
        bank_name: string
        sender_method_key: string
        sender_method_value: string
        document_type: string
        document_value: string
      }
    }
  }
  amounts: {
    sent: {
      amount: string
      currency: string
    }
    received: {
      amount: string
      currency: string
    }
  }
  status: string
  proof_of_payment: {
    img_transaction: string
  }
}

export interface TransactionArray {
  meta: {
    totalPages: number
    page: number
    perPage: number
  }
  data: TransactionTypeAll[]
}

export const emptyTransactionArray: TransactionArray = {
  meta: {
    totalPages: 0,
    page: 0,
    perPage: 0,
  },
  data: [],
}

export const emptyTransaction: TransactionTypeSingle = {
  transaction: {
    transaction_id: "",
    sender_accounts_id: "",
    receiver_accounts_id: "",
    country_transaction: "",
    message: "",
    created_at: "",
    user_id: null,
    status: "",
    idAdmin: null,
    regret_id: null,
    note_id: null,
  },
  sender: {
    first_name: "",
    last_name: "",
    identification: "",
    phone_number: "",
    email: "",
    payment_method_id: "",
  },
  receiver: {
    first_name: "",
    last_name: "",
    payment_method_id: "",
  },
  payment_method: {
    sender: {
      value: "",
      details: {
        email_account: "",
        transfer_code: "",
      },
    },
    receiver: {
      value: "",
      details: {
        bank_name: "",
        sender_method_key: "",
        sender_method_value: "",
        document_type: "",
        document_value: "",
      },
    },
  },
  amounts: {
    sent: {
      amount: "",
      currency: "",
    },
    received: {
      amount: "",
      currency: "",
    },
  },
  status: "",
  proof_of_payment: {
    img_transaction: "",
  },
}

