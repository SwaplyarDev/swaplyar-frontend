import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import { TransactionType } from '@/types/transactions/transactionsType';

interface PaginationTableProps {
  currentPage: number;
  setCurrentPage: (arg: any) => void;
  indexOfLastItem: number;
  stateTrans: TransactionType[];
}

const PaginationTable: React.FC<PaginationTableProps> = ({
  currentPage,
  setCurrentPage,
  indexOfLastItem,
  stateTrans,
}) => {
  const { isDark } = useDarkTheme();
  return (
    <div className="flex flex-row items-center gap-4 self-end">
      <button
        className={` ${
          currentPage === 1 ? '' : `${isDark ? 'buttonSecondDark' : 'buttonSecond'} blur-sm`
        }group relative m-1 flex h-[48px] min-w-[48px] items-center justify-center gap-2 rounded-3xl border border-buttonsLigth p-3 text-buttonsLigth hover:bg-transparent dark:border-darkText dark:text-darkText dark:hover:bg-transparent xs:min-w-[100px]`}
        onClick={() => setCurrentPage((prev: number) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
      >
        Anterior
      </button>
      <span className="text-lg font-semibold">{currentPage}</span>
      <button
        className={`${
          isDark ? 'buttonSecondDark' : 'buttonSecond'
        } group relative m-1 flex h-[48px] min-w-[48px] items-center justify-center gap-2 rounded-3xl border border-buttonsLigth p-3 text-buttonsLigth hover:bg-transparent dark:border-darkText dark:text-darkText dark:hover:bg-transparent xs:min-w-[100px]`}
        onClick={() => setCurrentPage((prev: number) => (indexOfLastItem < stateTrans.length ? prev + 1 : prev))}
        disabled={indexOfLastItem >= stateTrans.length}
      >
        Siguiente
      </button>
    </div>
  );
};

export default PaginationTable;
