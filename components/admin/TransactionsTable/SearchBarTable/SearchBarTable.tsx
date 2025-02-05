import { useState } from 'react';
import { TransactionType } from '@/types/transactions/transactionsType';

interface SearchBarProps {
  stateTrans: TransactionType[];
  setFilteredTransactions: (arg: TransactionType[]) => void;
  setCurrentPage: (arg: number) => void;
}

const SearchBarTable: React.FC<SearchBarProps> = ({ setFilteredTransactions, setCurrentPage, stateTrans }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    const lowerQuery = query.toLowerCase();
    const filtered = stateTrans.filter(
      (transaction) =>
        transaction.sender.first_name.toLowerCase().includes(lowerQuery) ||
        transaction.sender.last_name.toLowerCase().includes(lowerQuery) ||
        transaction.receiver.first_name.toLowerCase().includes(lowerQuery) ||
        transaction.receiver.last_name.toLowerCase().includes(lowerQuery),
    );
    setFilteredTransactions(filtered);
    setCurrentPage(1); // Reset page to the first one after filtering
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    handleSearch(query);
  };

  return (
    <input
      type="text"
      placeholder="Buscar por nombre o apellido..."
      value={searchQuery}
      onChange={handleChange}
      className="mx-16 w-[30%] self-end rounded-md border px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
};

export default SearchBarTable;
