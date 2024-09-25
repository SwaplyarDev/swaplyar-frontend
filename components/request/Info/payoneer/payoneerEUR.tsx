import RequestInfoBlock from '@/components/ui/RequestInfoBlock/RequestInfoBlock';
import Image from 'next/image';
import {
  PyEURtoArs,
  PyEURtoPayPal,
  PyEURtoPyUSD,
  PyEURtoWsEUR,
  PyEURtoWsUSD,
} from '@/utils/assets/img-database';
import { useEffect, useState } from 'react';

export default function PayoneerEUR() {
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
        title="El correo al que deberes realizar el pago es JOHANSUAREZ90@GMAIL.COM"
        content={
          <>
            <p className="mb-4 text-center text-lg md:text-left">
              La cuenta de Payoneer en EUR € esta a nombre de Johan Suarez,
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
              src={PyEURtoArs}
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
