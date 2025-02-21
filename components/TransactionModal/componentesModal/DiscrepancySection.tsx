import { useState } from 'react';
import { CustomButton } from './ui/comoponenteboton';
import { TransactionTypeSingle } from '@/types/transactions/transactionsType';
import Swal from 'sweetalert2';
import { useEffect } from 'react';

interface DiscrepancySectionProps {
  trans: TransactionTypeSingle;
  setValue: (arg: boolean) => void;
  value: boolean | null;
}

const DiscrepancySection: React.FC<DiscrepancySectionProps> = ({ trans, setValue, value }) => {
  const [discrepancy, setDiscrepancy] = useState<boolean | null>(null);
  const [resolved, setResolved] = useState<boolean | null>(null);
  const { payment_method } = trans;

  const handleClick = (newValue: boolean) => {
    setValue(newValue);
    setDiscrepancy(newValue);
  };
  const buttonAction = (action: string) => {
    Swal.fire({
      title: '¿Estás seguro que quieres enviar este motivo de discrepancia?',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: 'rgb(1,42,142)',
      cancelButtonColor: 'rgb(205,24,24)',
      preConfirm: (value) => {
        if (!value) {
          Swal.showValidationMessage('Debes ingresar un motivo');
        }
        return value;
      },
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('Motivo enviado:', result.value);
      }
    });
  };

  return (
    <section className="flex w-[95%] flex-row">
      <article className="flex flex-col items-start gap-2">
        <h3 className="text-left font-titleFont text-xl font-medium">Discrepancia en la Operacion.</h3>
        <div className="flex flex-row gap-2">
          <CustomButton
            onClick={() => handleClick(true)}
            text="SI"
            className={`hover:bg-[#0B5300] ${discrepancy ? 'bg-[#0B5300] text-darkText' : 'bg-[#D4D4D4] text-lightText'}`}
          />
          <CustomButton
            onClick={() => handleClick(false)}
            text="NO"
            className={`hover:bg-[#CE1818] ${discrepancy === false ? 'bg-[#CE1818] text-darkText' : 'bg-[#D4D4D4] text-lightText'} `}
          />
        </div>
      </article>
      <article className={` ${discrepancy ? 'visible' : 'invisible'} flex flex-row items-center`}>
        <div className="flex flex-col gap-1">
          <p className="pl-5 text-sm">Motivo de la Discrepancia</p>
          <div className="flex gap-2.5">
            <input placeholder="Explica la discrepancia" className={`text-md rounded-lg`} />{' '}
            <article
              className="w-[1 0px] inline-flex w-[65px] flex-col items-center justify-center rounded-lg bg-custom-blue px-2.5 py-1 text-[#ebe7e0] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]"
              onClick={() => buttonAction('discrepancy')}
            >
              <button className="titleFont titleFont self-stretch text-center text-base font-normal">Enviar</button>
            </article>
          </div>
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
