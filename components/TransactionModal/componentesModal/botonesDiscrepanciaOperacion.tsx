import { useState } from 'react';
import DiscrepanciaResulta from './botonesDiscrepanciaResuelta';

export default function DiscrepanciaOperacion() {
  const [selectedYesNo1, setSelectedYesNo1] = useState<'si' | 'no' | null>(null);
  const handleYesNoClick = (setter: React.Dispatch<React.SetStateAction<'si' | 'no' | null>>, button: 'si' | 'no') => {
    setter((prev) => (prev === button ? null : button)); // Alternar selección
  };
  return (
    <section>
      <article className="inline-flex w-[150px] flex-col items-center justify-center gap-1.5">
        <article className="lightText titleFont self-stretch text-xl font-medium">
          Discrepancia <br />
          en la Operacion
        </article>
        <article className="inline-flex items-center justify-start gap-4 self-stretch">
          <article
            className={`inline-flex w-[55px] flex-col items-center justify-center gap-2.5 rounded-lg px-2.5 py-1 ${
              selectedYesNo1 === 'si'
                ? 'bg-[#0b5300] text-base font-medium text-[#ebe7e0] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]'
                : 'bg-[#d3d3d3]'
            }`}
            onClick={() => handleYesNoClick(setSelectedYesNo1, 'si')}
          >
            <button className="titleFont self-stretch text-center text-base">SI</button>
          </article>
          <article
            className={`inline-flex w-[55px] flex-col items-center justify-center gap-2.5 rounded-lg px-2.5 py-1 ${
              selectedYesNo1 === 'no'
                ? 'bg-[#cd1818] text-[#ebe7e0] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]'
                : 'bg-[#d3d3d3]'
            }`}
            onClick={() => handleYesNoClick(setSelectedYesNo1, 'no')}
          >
            <button className="titleFont titleFont self-stretch text-center text-base font-normal">NO</button>
          </article>
        </article>
      </article>
      {selectedYesNo1 === 'si' && (
        <article className="inline-flex h-[81px] w-[262px] flex-col items-start justify-start gap-1">
          <article className="inline-flex items-center justify-center gap-2.5 self-stretch px-2.5">
            <p className="titleFont shrink grow basis-0 text-xs font-normal leading-none">Motivo de la Discrepancia</p>
          </article>
          <label className="inline-flex h-[41px] items-center justify-start gap-2.5 self-stretch rounded-lg border border-[#252526] bg-white py-2 pl-[9px] pr-2.5">
            <input
              className="h-full w-full shrink border-none text-[13px] leading-none outline-none focus:border-transparent focus:ring-0"
              placeholder="la direccion de la billetera no es valida"
            />
          </label>
          <article className="inline-flex items-center justify-center gap-2.5 self-stretch px-2.5"></article>
        </article>
      )}{' '}
      {selectedYesNo1 === 'si' && <DiscrepanciaResulta />}
    </section>
  );
}
