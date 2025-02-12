import { useState } from 'react';
import { CustomButton } from './ui/comoponenteboton';
import { clipopup } from '@/utils/assets/img-database';
import Image from 'next/image';
import InfoBox from './ui/InfoBox';

const TransferClient = () => {
  const [selected, setSelected] = useState<boolean | null>(null);
  const [form, setForm] = useState<{ transfer_id: string; amount: number }>({
    transfer_id: '',
    amount: 0,
  });

  return (
    <section className="flex w-[50%] flex-col items-start justify-start gap-4">
      <article className="flex flex-col items-center gap-1">
        <h3 className="text-center font-titleFont text-xl font-medium">Transferencia realizada al cliente.</h3>
        <div className="flex flex-row gap-5">
          <CustomButton
            onClick={() => setSelected(true)}
            text="SI"
            className={`hover:bg-[#0B5300] ${selected ? 'bg-[#0B5300] text-darkText' : 'bg-[#D4D4D4] text-lightText'}`}
          />
          <CustomButton
            onClick={() => setSelected(false)}
            text="NO"
            className={`hover:bg-[#CE1818] ${selected === false ? 'bg-[#CE1818] text-darkText' : 'bg-[#D4D4D4] text-lightText'} `}
          />
        </div>
      </article>
      <article className={` ${selected ? 'visible' : 'invisible'} flex flex-row items-start gap-3`}>
        <div className="flex flex-col gap-1">
          <p className="pl-5 text-sm">ID de la Transferencia</p>
          <input
            type="text"
            placeholder="Id de transferencia"
            className="text-md min-h-[2.6rem] min-w-[5.6rem] rounded-lg"
            value={form.transfer_id}
          />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-sm">Monto de la transferencia</p>
          <input
            placeholder="Id de transferencia"
            type="number"
            className="text-md min-h-[2.6rem] max-w-[9.6rem] rounded-lg"
            value={form.amount}
          />
        </div>
      </article>
      <article className="just flex flex-col self-center">
        <p className="lightText text-center text-xl">Subir Comprobante</p>
        <button className="flex h-[3.6rem] w-[16.3rem] flex-row items-center justify-center gap-2 rounded-lg bg-[#d3d3d3] p-2.5 text-[#012a8d] underline">
          Subir Comprobante <Image src={clipopup} alt="clip" width={16} height={16} />
        </button>
        <button className="text-[#012a8d] underline">Link del comprobante</button>
      </article>
    </section>
  );
};

export default TransferClient;
