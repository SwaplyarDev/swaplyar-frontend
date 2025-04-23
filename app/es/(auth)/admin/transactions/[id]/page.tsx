import { getRegretById } from '@/actions/repentance/repentanceForm.action';
import { getAdminTransactionById } from '@/actions/transactions/admin-transaction';
import { getNoteById } from '@/actions/transactions/notes.action';
import { auth } from '@/auth';
import TransactionPageClientComponent from '@/components/admin/TransactionPageComponents/TransactionPageClientComponent';
import { getComponentStatesFromStatus } from '@/utils/transactionStatesConverser';

export default async function TransactionPage({ params }: { params: { id: string } }) {
  const session = await auth();

  const transId = params.id;

  // Fetch transaction data on the server using admin endpoint
  console.log('Fetching transaction with ID:', transId, ' page');
  const transaction = await getAdminTransactionById(transId);

  if (!transaction) {
    return <div className="p-8 text-center">Transaction not found</div>;
  }

  // Determinar el estado y los estados de componentes basados en la respuesta
  const status = transaction.status || 'pending';
  const componentStates = getComponentStatesFromStatus(transaction.status_id || '1');

  // Fetch additional data if needed
  let noteEdit = null;
  let regretCancel = null;

  if (transaction.note_id) {
    noteEdit = await getNoteById(transaction.note_id);
  }

  if (transaction.regret_id) {
    const regretResponse = await getRegretById(transaction.regret_id);
    regretCancel = regretResponse?.regret || null;
  }

  // Pass all server-fetched data to the client component
  return (
    <TransactionPageClientComponent
      initialTransaction={transaction}
      initialStatus={status}
      initialComponentStates={componentStates}
      transIdAdmin={transaction.transaction_admin_id || ''}
      noteEdit={noteEdit}
      regretCancel={regretCancel}
      token={session?.decodedToken?.token || ''}
    />
  );
}
