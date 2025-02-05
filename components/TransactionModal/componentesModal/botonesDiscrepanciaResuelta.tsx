import { useState } from 'react';

export default function DiscrepanciaResulta() {
  const [selectedYesNo2, setSelectedYesNo2] = useState<'si' | 'no' | null>(null);
  const handleYesNoClick = (setter: React.Dispatch<React.SetStateAction<'si' | 'no' | null>>, button: 'si' | 'no') => {
    setter((prev) => (prev === button ? null : button)); // Alternar selección
  };
  return (
    <article className="inline-flex w-[217px] flex-col items-center justify-start gap-2">
      <p className="lightText titleFont self-stretch text-xl font-medium">Discrepancia Resuelta</p>
      <article className="inline-flex items-center justify-center gap-4 self-stretch">
        <article
          className={`inline-flex w-[55px] flex-col items-center justify-center gap-2.5 rounded-lg px-2.5 py-1 ${
            selectedYesNo2 === 'si'
              ? 'bg-[#0b5300] text-base font-medium text-[#ebe7e0] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]'
              : 'bg-[#d3d3d3]'
          }`}
          onClick={() => handleYesNoClick(setSelectedYesNo2, 'si')}
        >
          <button className="titleFont self-stretch text-center text-base">SI</button>
        </article>
        <article
          className={`inline-flex w-[55px] flex-col items-center justify-center gap-2.5 rounded-lg px-2.5 py-1 ${
            selectedYesNo2 === 'no'
              ? 'bg-[#cd1818] text-base font-medium text-[#ebe7e0] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]'
              : 'bg-[#d3d3d3]'
          }`}
          onClick={() => handleYesNoClick(setSelectedYesNo2, 'no')}
        >
          <button className="titleFont titleFont self-stretch text-center text-base font-normal">NO</button>
        </article>
      </article>
    </article>
  );
}
