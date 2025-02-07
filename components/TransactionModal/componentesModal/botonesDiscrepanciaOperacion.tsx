import { useState } from 'react';
import DiscrepanciaResulta from './botonesDiscrepanciaResuelta';
import { CustomButton } from './ui/comoponenteboton';

export default function DiscrepanciaOperacion() {
  const [selectedYesNo1, setSelectedYesNo1] = useState<'si' | 'no' | null>(null);
  const handleYesNoClick = (setter: React.Dispatch<React.SetStateAction<'si' | 'no' | null>>, button: 'si' | 'no') => {
    setter((prev) => (prev === button ? null : button)); // Alternar selección
  };
  return (
    <section>
      <article className="inline-flex w-[150px] flex-col items-center justify-center gap-1.5">
        <article className="lightText titleFont self-stretch text-xl font-medium">
          Discrepancia <br /> en la Operación
        </article>

        <article className="inline-flex items-center justify-start gap-4 self-stretch">
          <CustomButton
            text="SI"
            onClick={() => setSelectedYesNo1(selectedYesNo1 === 'si' ? null : 'si')}
            className={`w-[55px] flex-col items-center justify-center gap-2.5 rounded-lg px-2.5 py-1 ${
              selectedYesNo1 === 'si'
                ? 'bg-[#0b5300] text-white shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]'
                : 'bg-[#d3d3d3]'
            }`}
          />

          <CustomButton
            text="NO"
            onClick={() => setSelectedYesNo1(selectedYesNo1 === 'no' ? null : 'no')}
            className={`w-[55px] flex-col items-center justify-center gap-2.5 rounded-lg px-2.5 py-1 ${
              selectedYesNo1 === 'no'
                ? 'bg-[#cd1818] text-[#ebe7e0] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]'
                : 'bg-[#d3d3d3]'
            }`}
          />
        </article>
      </article>

      {selectedYesNo1 === 'si' && (
        <>
          <article className="inline-flex h-[81px] w-[262px] flex-col items-start justify-start gap-1">
            <article className="inline-flex items-center justify-center gap-2.5 self-stretch px-2.5">
              <p className="titleFont shrink grow basis-0 text-xs font-normal leading-none">
                Motivo de la Discrepancia
              </p>
            </article>

            <label className="inline-flex h-[41px] items-center justify-start gap-2.5 self-stretch rounded-lg border border-[#252526] bg-white py-2 pl-[9px] pr-2.5">
              <input
                className="h-full w-full shrink border-none text-[13px] leading-none outline-none focus:border-transparent focus:ring-0"
                placeholder="La dirección de la billetera no es válida"
              />
            </label>
          </article>

          <DiscrepanciaResulta />
        </>
      )}
    </section>
  );
}
