export interface TransactionTypeSingle {
  transaction: {
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
        details: any;
      };
      receiver: {
        value: string;
        details: any;
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
  };
}

export const emptyTransaction: TransactionTypeSingle = {
  transaction: {
    transaction: {
      transaction_id: '',
      sender_accounts_id: '',
      receiver_accounts_id: '',
      country_transaction: '',
      message: '',
      created_at: '',
      user_id: null,
      status: '',
      idAdmin: null,
    },
    sender: {
      first_name: '',
      last_name: '',
      identification: '',
      phone_number: '',
      email: '',
      payment_method_id: '',
    },
    receiver: {
      first_name: '',
      last_name: '',
      payment_method_id: '',
    },
    payment_method: {
      sender: {
        value: '',
        details: {
          email_account: '',
          transfer_code: '',
        },
      },
      receiver: {
        value: '',
        details: {
          bank_name: '',
          sender_method_key: '',
          sender_method_value: '',
          document_type: '',
          document_value: '',
        },
      },
    },
    amounts: {
      sent: {
        amount: '',
        currency: '',
      },
      received: {
        amount: '',
        currency: '',
      },
    },
    status: '',
    proof_of_payment: {
      img_transaction: '',
    },
  },
};

export interface TransactionTypeAll {
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

export interface TransactionArray {
  meta: {
    totalPages: number;
    page: number;
    perPage: number;
  };
  data: TransactionTypeAll[];
}

export const emptyTransactionArray: TransactionArray = {
  meta: {
    totalPages: 0,
    page: 0,
    perPage: 0,
  },
  data: [],
};
