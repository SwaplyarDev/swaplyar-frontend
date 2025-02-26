import { useState } from 'react';
import { TransactionTypeSingle } from '@/types/transactions/transactionsType';
import { CustomButton } from './ui/comoponenteboton';
import Swal from 'sweetalert2';

interface ConfirmarTransProps {
  value: boolean | null;
  setValue: (arg: boolean) => void; // Asegurar que recibe un booleano
  trans: TransactionTypeSingle;
}

const ConfirmTransButton: React.FC<ConfirmarTransProps> = ({ trans, value, setValue }) => {
  const [selected, setSelected] = useState<boolean | null>(null);
  const { payment_method } = trans;

  const buttonAction = (action: string) => {
    Swal.fire({
      title: '¿Deseas agregar este ID?',
      showCancelButton: true,
      confirmButtonText: 'Agregar',
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

    console.log(action);
  };

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
        <div className="inline-flex h-[41px] items-center justify-start gap-2.5 self-stretch rounded-lg">
          <input
            placeholder="Id de transferencia"
            className="text-md min-h-[2.6rem] rounded-lg"
            //   value={payment_method?.sender?.details?.transfer_code || ''}
          />
          <article
            className="w-[1 0px] inline-flex w-[65px] flex-col items-center justify-center rounded-lg bg-custom-blue px-2.5 py-1 text-[#ebe7e0] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]"
            onClick={() => buttonAction('rejected')}
          >
            <button className="titleFont titleFont self-stretch text-center text-base font-normal">Enviar</button>
          </article>
        </div>
      </article>
    </section>
  );
};

export default ConfirmTransButton;
