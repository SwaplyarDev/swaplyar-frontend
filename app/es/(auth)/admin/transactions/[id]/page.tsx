import { getComponentStatesFromStatus } from '@/utils/transactionStatesConverser';
import TransactionPageClientComponent from '@/components/admin/TransactionPageComponents/TransactionPageClientComponent';
import { auth } from '@/auth';
import { getTransactionById } from '@/actions/transactions/transactions.action';


export default async function TransactionPage({ params }: { params: { id: string } }) {
  const session = await auth();
  const token = session?.accessToken || '';
  const transId = params.id;

  const transactionV2 = await getTransactionById(transId, token);
  if (!transactionV2) {
    return <div className="p-8 text-center">Transaction not found</div>;
  }


  const status = transactionV2.finalStatus || 'pending';
  const componentStates = getComponentStatesFromStatus('1'); // usar '1' o el valor adecuado

  // let noteEdit = null;
  // let regretCancel = null;

  // if (transaction.transaction.note_id) {
  //   noteEdit = await getNoteById(transaction.transaction.note_id);
  // }

  // if (transaction.transaction.regret_id) {
  //   const regretResponse = await getRegretById(transaction.transaction.regret_id);
  //   regretCancel = regretResponse?.regret || null;
  // }

  return (
    <TransactionPageClientComponent
      initialTransaction={transactionV2}
      initialStatus={status}
      initialComponentStates={componentStates}
      transIdAdmin={transactionV2.id}
      noteEdit={null}
      regretCancel={null}
      token={session?.accessToken || ''}
    />
  );
}
