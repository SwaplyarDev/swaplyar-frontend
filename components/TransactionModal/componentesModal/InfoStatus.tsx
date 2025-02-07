import { TransactionTypeSingle } from '@/types/transactions/transactionsType';
import { useSession } from 'next-auth/react';

interface InfoStatusProps {
  trans: TransactionTypeSingle;
  transId: string;
}

const InfoStatus: React.FC<InfoStatusProps> = ({ trans, transId }) => {
  const { status, transaction } = trans.transaction;
  const { data: session } = useSession();
  const userName = session?.user.name;

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return (
          <div className="flex rounded-full bg-[#000C29] px-4 py-2 font-titleFont text-2xl text-darkText outline outline-1 outline-offset-2 outline-[#012A8E]">
            Pendiente
          </div>
        );
      case 'rejected':
        return (
          <div className="flex rounded-full bg-[#530000] px-4 py-2 font-titleFont text-2xl text-darkText outline outline-1 outline-offset-2 outline-[#CE1818]">
            Rechazada
          </div>
        );
      case 'accepted':
        return (
          <div className="flex rounded-full bg-[#002C00] px-4 py-2 font-titleFont text-2xl text-darkText outline outline-1 outline-offset-2 outline-[#18CE18]">
            Aceptada
          </div>
        );
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <article className="flex flex-row justify-between">
      {getStatusColor(status)}
      <h1 className="lightText font-sans text-4xl">Solicitud #{transId}</h1>
      <div className="flex flex-col items-end">
        <p className="text-xs">{new Date(transaction?.created_at).toLocaleDateString()}</p>
        <p className="text-base">{userName}</p>
      </div>
    </article>
  );
};

export default InfoStatus;
