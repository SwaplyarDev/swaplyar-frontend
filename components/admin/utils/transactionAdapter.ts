import { TransactionV2 } from '@/types/transactions/transactionsType';
import { TransactionTypeSingle } from '@/types/transactions/transactionsType';

export function adaptTransactionV2ToTransactionTypeSingle(t: TransactionV2): TransactionTypeSingle {
  return {
    transaction: {
      transaction_id: t.id,
      sender_accounts_id: t.senderAccount.id,
      receiver_accounts_id: t.receiverAccount.id,
      country_transaction: t.countryTransaction,
      message: t.message,
      created_at: t.createdAt,
      user_id: t.userId,
      status: t.finalStatus,
      idAdmin: null,
      regret_id: null,
      note_id: null,
    },
    sender: {
      first_name: t.senderAccount.firstName,
      last_name: t.senderAccount.lastName,
      identification: '',
      phone_number: '',
      email: t.senderAccount.email || '',
      payment_method_id: '',
    },
    receiver: {
      first_name: t.receiverAccount.firstName,
      last_name: t.receiverAccount.lastName,
      payment_method_id: '',
    },
    payment_method: {
      sender: {
        value: '',
        details: {},
      },
      receiver: {
        value: t.receiverAccount.paymentMethod.method,
        details: {
          bank_name: t.receiverAccount.paymentMethod.bankName,
          sender_method_key: t.receiverAccount.paymentMethod.sendMethodKey,
          sender_method_value: t.receiverAccount.paymentMethod.sendMethodValue,
          document_type: t.receiverAccount.paymentMethod.documentType,
          document_value: t.receiverAccount.paymentMethod.documentValue,
        },
      },
    },
    amounts: {
      sent: {
        amount: t.amount.amountSent.toString(),
        currency: t.amount.currencySent,
      },
      received: {
        amount: t.amount.amountReceived.toString(),
        currency: t.amount.currencyReceived,
      },
    },
    status: t.finalStatus,
    proof_of_payment: {
      img_transaction: t.proofOfPayment.imgUrl,
    },
  };
}
