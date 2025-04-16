// /src/components/admin/TransactionsTable/TransactionsLoader.tsx
import { getAllTransactions } from '@/actions/transactions/transactions.action';
import TransactionsTable from '@/components/admin/TransactionsTable/TransactionsTable/TransactionsTable';
import { TransactionArray } from '@/types/transactions/transactionsType';
import { auth } from "@/auth";

interface TransactionsLoaderProps {
  currentPage: number;
}

const TransactionsLoader = async ({ currentPage }: TransactionsLoaderProps) => {
  // Obtener la sesión en el servidor
	const session = await auth();
  const token = session?.decodedToken.token;

  // Validar que exista sesión y token
  if (!session || !token) {
    return <div>No autorizado</div>;
  }

  // Obtener las transacciones utilizando el token de la sesión
  let transactions: TransactionArray | null = null;
  try {
    transactions = await getAllTransactions(currentPage, token);
  } catch (error) {
    console.error('Error al obtener transacciones:', error);
    return <div>Error al cargar las transacciones.</div>;
  }

  // En caso de que no existan transacciones, se muestra un mensaje de carga
  if (!transactions) {
    return <div>Cargando transacciones...</div>;
  }

  return <TransactionsTable transactions={transactions} currentPage={currentPage} />;
};

export default TransactionsLoader;
