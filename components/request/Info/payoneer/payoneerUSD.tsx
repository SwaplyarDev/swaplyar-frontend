import RequestInfoBlock from '@/components/ui/RequestInfoBlock/RequestInfoBlock';
import Image from 'next/image';
import {
  PyUSDtoArs,
  PyUSDtoPayPal,
  PyUSDtoPyEUR,
  PyUSDtoWsEUR,
  PyUSDtoWsUSD,
} from '@/utils/assets/img-database';
import { useEffect, useState } from 'react';

export default function PayoneerUSD() {
  const [payerBank, setPayerBank] = useState<string>('');

  useEffect(() => {
    const data = localStorage.getItem('');
    if (data) {
      const bank = JSON.parse(data);
      setPayerBank(bank);
    }
  }, []);
  return (
    <>
      <RequestInfoBlock
        title="Complete el formulario para procesar su transferencia bancaria."
        content={
          <>
            <p className="mb-4 text-center text-lg md:text-left">
              La cuenta de Payoneer en USD $ esta a nombre de Johan Suarez,
              <span className="bg-yellow-400 px-1 text-black">
                Suba el comprobante (captura de pantalla) para completar su
                solicitud.
              </span>
              y proporcione el ID de la transacción de Payoneer Realice la
              transferencia al correo JOHANSUAREZ90@GMAIL.COM Johan Javier
              Suarez Merchan Una vez recibido, procesaremos su transferencia. no
              nos hacemos responsable si envias a otro correo que no sea el
              proporcionado por SwaplyAr
            </p>
            <Image
              src={PyUSDtoArs}
              alt="Formulario-de-Solicitud"
              width={500}
              height={350}
              className="hidden w-full lg:block"
            />
          </>
        }
      />
    </>
  );
}
