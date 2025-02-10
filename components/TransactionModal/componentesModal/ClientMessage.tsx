import { TransactionTypeSingle } from '@/types/transactions/transactionsType';

interface ClientMessageProps {
  trans: TransactionTypeSingle;
}

const ClientMessage: React.FC<ClientMessageProps> = ({ trans }) => {
  const { transaction } = trans.transaction;
  return (
    <section className="flex flex-col items-start">
      <p className="pl-5 font-textFont font-semibold">Mensaje del Cliente</p>
      <article className="min-h-[4.25rem] w-[100%] rounded-lg border-[1px] border-black p-2">
        <p>{transaction?.message}</p>
      </article>
    </section>
  );
};

export default ClientMessage;
