// actions/request/action.requestRegister.tsx

'use server';

type TransactionRequest = {
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

export const requestRegister = async (transaction: TransactionRequest) => {
  try {
    const response = await fetch('http://localhost:8080/api/v1/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transaction),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error en el registro');
    }

    return {
      ok: true,
      user: data.user,
      message: 'Usuario creado',
    };
  } catch (error: any) {
    console.log(error);

    return {
      ok: false,
      message: 'No se pudo crear el usuario',
    };
  }
};
