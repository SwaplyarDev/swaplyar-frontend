import { useState } from 'react';
import { CustomButton } from './ui/comoponenteboton';
import { TransactionTypeSingle } from '@/types/transactions/transactionsType';

interface DiscrepancySectionProps {
  trans: TransactionTypeSingle;
}

const DiscrepancySection: React.FC<DiscrepancySectionProps> = ({ trans }) => {
  const [discrepancy, setDiscrepancy] = useState<boolean | null>(null);
  const [resolved, setResolved] = useState<boolean | null>(null);
  const { payment_method } = trans.transaction;

  return (
    <section className="flex w-[95%] flex-row">
      <article className="flex w-[30%] flex-col items-start gap-2">
        <h3 className="text-left font-titleFont text-xl font-medium">Discrepancia en la Operacion.</h3>
        <div className="flex flex-row gap-2">
          <CustomButton
            onClick={() => setDiscrepancy(true)}
            text="SI"
            className={`hover:bg-[#0B5300] ${discrepancy ? 'bg-[#0B5300] text-darkText' : 'bg-[#D4D4D4] text-lightText'}`}
          />
          <CustomButton
            onClick={() => setDiscrepancy(false)}
            text="NO"
            className={`hover:bg-[#CE1818] ${discrepancy === false ? 'bg-[#CE1818] text-darkText' : 'bg-[#D4D4D4] text-lightText'} `}
          />
        </div>
      </article>
      <article className={` ${discrepancy ? 'visible' : 'invisible'} flex flex-row items-center`}>
        <div className="flex flex-col gap-1">
          <p className="pl-5 text-sm">Motivo de la Discrepancia</p>
          <input
            placeholder="Explica la discrepancia"
            className={`text-md min-h-[2.6rem] min-w-[16.6rem] rounded-lg`}
          />
        </div>
        <div className="flex flex-col items-center gap-2">
          <h3 className="text-center font-titleFont text-xl font-medium">Discrepancia Resuelta</h3>
          <div className="flex flex-row gap-2">
            <CustomButton
              onClick={() => setResolved(true)}
              text="SI"
              className={`hover:bg-[#0B5300] ${resolved ? 'bg-[#0B5300] text-darkText' : 'bg-[#D4D4D4] text-lightText'}`}
            />
            <CustomButton
              onClick={() => setResolved(false)}
              text="NO"
              className={`hover:bg-[#CE1818] ${resolved === false ? 'bg-[#CE1818] text-darkText' : 'bg-[#D4D4D4] text-lightText'} `}
            />
          </div>
        </div>
      </article>
    </section>
  );
};

export default DiscrepancySection;
