import { useState } from 'react';
import { TransactionTypeSingle } from '@/types/transactions/transactionsType';
import { CustomButton } from './ui/comoponenteboton';

interface ConfirmarTransProps {
  trans: TransactionTypeSingle;
}

const ConfirmarTransferencia: React.FC<ConfirmarTransProps> = ({ trans }) => {
  const [selected, setSelected] = useState<'si' | 'no' | null>(null);

  return <article className="inline-flex items-center justify-start gap-4"></article>;
};
