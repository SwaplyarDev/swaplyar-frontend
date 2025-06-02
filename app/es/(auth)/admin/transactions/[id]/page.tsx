import { getRegretById } from '@/actions/repentance/repentanceForm.action';
import { getAdminTransactionById } from '@/actions/transactions/admin-transaction';
import { getNoteById } from '@/actions/transactions/notes.action';
import { auth } from '@/auth';
import TransactionPageClientComponent from '@/components/admin/TransactionPageComponents/TransactionPageClientComponent';
import { getComponentStatesFromStatus } from '@/utils/transactionStatesConverser';

export default async function TransactionPage({ params }: { params: { id: string } }) {
  const session = await auth();

  const transId = params.id;

  console.log('Fetching transaction with ID:', transId, ' page');
  const transaction = await getAdminTransactionById(transId);

  if (!transaction) {
    return <div className="p-8 text-center">Transaction not found</div>;
  }

  const status = transaction.status || 'pending';
  const componentStates = getComponentStatesFromStatus(transaction.status_id || '1');

  let noteEdit = null;
  let regretCancel = null;

  if (transaction.transaction.note_id) {
    noteEdit = await getNoteById(transaction.transaction.note_id);
  }

  if (transaction.transaction.regret_id) {
    const regretResponse = await getRegretById(transaction.transaction.regret_id);
    regretCancel = regretResponse?.regret || null;
  }

  return (
    <TransactionPageClientComponent
      initialTransaction={transaction}
      initialStatus={status}
      initialComponentStates={componentStates}
      transIdAdmin={transaction.transaction_admin_id || ''}
      noteEdit={noteEdit}
      regretCancel={regretCancel}
      token={session?.accessToken || ''}
    />
  );
}
