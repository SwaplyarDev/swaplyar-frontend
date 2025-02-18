import { TransactionTypeSingle } from '@/types/transactions/transactionsType';
import { getReceiverLabels } from '../ui/RenderLabels';
import { strokepopup, clipopup } from '@/utils/assets/img-database';
import { useState } from 'react';
import Image from 'next/image';
import ClientMessage from '../ui/ClientMessage';

interface ModalEditRecieverProps {
  modal: boolean;
  setModal: (arg: boolean) => void;
  trans: TransactionTypeSingle;
}

const ModalEditReciever: React.FC<ModalEditRecieverProps> = ({ modal, setModal, trans }) => {
  const receiverLabels = getReceiverLabels(trans);

  const [modifiedValues, setModifiedValues] = useState<{ [key: string]: string }>(
    receiverLabels.reduce(
      (acc, { label, value }) => {
        acc[label] = value;
        return acc;
      },
      {} as { [key: string]: string },
    ),
  );

  const handleInputChange = (label: string, newValue: string) => {
    setModifiedValues((prevState) => ({
      ...prevState,
      [label]: newValue,
    }));
  };

  return (
    <section
      onClick={() => setModal(!modal)}
      className={`fixed inset-0 z-[999] flex items-center justify-center bg-gray-900/[0.4] ${
        modal ? 'visible' : 'invisible'
      }`}
    >
      <section
        onClick={(e) => e.stopPropagation()}
        className={`max-w-[38.5rem] cursor-pointer justify-center gap-2 rounded-lg bg-white p-6 text-lightText shadow-lg transition-all ${
          modal ? 'scale-100 opacity-100' : 'scale-125 opacity-0'
        }`}
      >
        <h3 className="text-2xl font-semibold">El cliente solicitó la edición de algunos datos</h3>
        <ClientMessage message="Mensaje de la solicitud" headerMessage="Mensaje" />

        <article className="item-center flex flex-row gap-2">
          {/* Datos originales */}
          <div className="flex max-w-[13.4rem] flex-col gap-2 divide-y-[1px]">
            <p className="min-h-[3.4rem] text-xl font-semibold">Datos del Destinatario</p>
            {receiverLabels.map(({ label, value }, index) => (
              <ClientMessage key={index} message={value} headerMessage={label} classnames="pb-3 min-h-[2.25rem]" />
            ))}
          </div>

          {/* Flechas */}
          <article className="flex flex-row items-center justify-center">
            <Image className="h-4 w-4" alt="flecha" src={strokepopup} width={19.167} height={10.833} />
            <Image className="h-4 w-4" alt="flecha" src={strokepopup} width={19.167} height={10.833} />
            <Image className="h-4 w-4" alt="flecha" src={strokepopup} width={19.167} height={10.833} />
          </article>

          {/* Datos modificados */}
          <div className="flex max-w-[13.4rem] flex-col gap-2 divide-y-[1px]">
            <p className="min-h-[3rem] text-left text-xl font-semibold">Datos del Destinatario Modificado</p>
            {receiverLabels.map(({ label }, index) => (
              <div key={index} className="flex flex-col items-start pb-4">
                <p className="pl-5 font-textFont text-base font-semibold">{label}</p>
                <input
                  value={modifiedValues[label] || ''}
                  onChange={(e) => handleInputChange(label, e.target.value)}
                  className="min-h-[2.25rem] w-full rounded-lg border-[1px] border-black p-2"
                />
              </div>
            ))}
          </div>
        </article>
        <article className="just flex w-[60%] flex-col items-center justify-self-center rounded-2xl border-[1px] border-[#90B0FE] bg-[#EBE7E0]">
          <p className="text-center text-lg text-[#90B0FE]">Subir Comprobante</p>
          <button className="flex h-[3.6rem] w-[16.3rem] flex-row items-center justify-center gap-2 rounded-full bg-[#90B0FE] p-2.5 text-[#EBE7E0] underline">
            Subir Comprobante
          </button>
          <p className="text-center text-lg text-[#90B0FE]">Formatos: PNG, JPG, PDF</p>
        </article>
        <button className="mt-2 rounded-full bg-[#002C00] px-6 py-4 text-darkText outline outline-2 outline-offset-2 outline-[#18CE18]">
          Modificar
        </button>
      </section>
    </section>
  );
};

export default ModalEditReciever;
