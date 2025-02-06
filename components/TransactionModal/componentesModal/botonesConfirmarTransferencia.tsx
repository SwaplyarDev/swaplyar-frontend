import { useState } from 'react';
import { CustomButton } from './ui/comoponenteboton';
export default function ConfirmarTransferencia() {
  const [selected, setSelected] = useState<'si' | 'no' | null>(null);

  const handleYesNoClick = (setter: React.Dispatch<React.SetStateAction<'si' | 'no' | null>>, button: 'si' | 'no') => {
    setter((prev) => (prev === button ? null : button)); // Alternar selección
  };

  return (
    <article className="inline-flex items-center justify-start gap-4">
      <article className="inline-flex h-[81px] w-[342px] flex-col items-center justify-center">
        <article className="lightText titleFont text-xl font-medium">
          La transferencia ha sido recibida y <br />
          ya está reflejada en nuestra cuenta.
        </article>
        <div className="flex gap-4">
          <CustomButton
            text="SI"
            onClick={() => setSelected(selected === 'si' ? null : 'si')}
            className={`w-[55px] ${selected === 'si' ? 'bg-green-700 text-white' : 'bg-gray-300'}`}
          />
          <CustomButton
            text="NO"
            onClick={() => setSelected(selected === 'no' ? null : 'no')}
            className={`w-[55px] ${selected === 'no' ? 'bg-red-600 text-white' : 'bg-gray-300'}`}
          />
        </div>
      </article>
      {selected === 'si' && (
        <article className="inline-flex h-[81px] w-[262px] flex-col items-start justify-start gap-1">
          <article className="inline-flex items-center justify-center gap-2.5 self-stretch px-2.5">
            <p className="titleFont titleFont shrink grow basis-0 text-xs font-normal leading-none">
              ID de la Transferencia
            </p>
          </article>
          <label className="inline-flex h-[41px] items-center justify-start gap-2.5 self-stretch rounded-lg border border-[#252526] bg-white py-2 pl-[9px] pr-2.5">
            <input
              className="h-full w-full border-none outline-none focus:border-transparent focus:ring-0"
              type="text"
              placeholder="4536tygsdeyhe45"
            />
          </label>
          <article className="inline-flex items-center justify-center gap-2.5 self-stretch px-2.5">
            <article className="titleFont shrink grow basis-0 text-xs font-normal leading-none"></article>
          </article>
        </article>
      )}
    </article>
  );
}
