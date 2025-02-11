import { useState } from 'react';
import { TransactionTypeSingle } from '@/types/transactions/transactionsType';
import { CustomButton } from './ui/comoponenteboton';

interface ConfirmarTransProps {
  value: boolean;
  setValue: (arg: boolean) => void; // Asegurar que recibe un booleano
  trans: TransactionTypeSingle;
}

const ConfirmTransButton: React.FC<ConfirmarTransProps> = ({ trans, value, setValue }) => {
  const [selected, setSelected] = useState<boolean | null>(null);
  const { payment_method } = trans.transaction;

  const handleClick = (newValue: boolean) => {
    setValue(newValue); // Modifica solo el estado de ConfirmTransButton
    setSelected(newValue);
  };

  return (
    <section className="flex max-h-[5rem] w-[80%] flex-row items-center justify-start gap-4">
      <article className="flex flex-col items-center gap-1">
        <h3 className="text-center font-titleFont text-xl font-medium">
          La transferencia ha sido recibida y ya está reflejada en nuestra cuenta.
        </h3>
        <div className="flex flex-row gap-5">
          <CustomButton
            onClick={() => handleClick(true)}
            text="SI"
            className={`hover:bg-[#0B5300] ${selected ? 'bg-[#0B5300] text-darkText' : 'bg-[#D4D4D4] text-lightText'}`}
          />
          <CustomButton
            onClick={() => handleClick(false)}
            text="NO"
            className={`hover:bg-[#CE1818] ${selected === false ? 'bg-[#CE1818] text-darkText' : 'bg-[#D4D4D4] text-lightText'} `}
          />
        </div>
      </article>
      <article className={` ${selected ? 'visible' : 'invisible'} flex flex-col items-start`}>
        <p className="pl-5 text-sm">ID de la Transferencia</p>
        <input
          placeholder="Id de transferencia"
          className="text-md min-h-[2.6rem] min-w-[16.6rem] rounded-lg"
          value={payment_method?.sender?.details?.transfer_code || ''}
          readOnly
        />
      </article>
    </section>
  );
};

export default ConfirmTransButton;
