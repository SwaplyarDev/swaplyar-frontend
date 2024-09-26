import RequestInfoBlock from '@/components/ui/RequestInfoBlock/RequestInfoBlock';
import Image from 'next/image';
import {
  WsUSDtoArs,
  WsUSDtoPayPal,
  WsUSDtoPyEUR,
  WsUSDtoPyUSD,
  WsUSDtoWsEUR,
} from '@/utils/assets/img-database';
import { useEffect, useState } from 'react';

export default function WiseUSD() {
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
            <ul className='space-y-2'>
                <li>
                  Ingrese sus datos personales en el formulario: Nombre,
                  Apellido, Número de WhatsApp, CBU o Alias, CUIL, Correo
                  Electrónico y Comprobante.
                </li>
                <li>
                  Realice la transferencia al banco ICBC Alias: {''}
                  <span className="font-semibold text-buttonsLigth dark:text-sky-500">
                    suarez.ICBC
                  </span>
                </li>
                <li>
                  A nombre de: {''}
                  <span className="font-semibold text-buttonsLigth dark:text-sky-500">
                    Johan Suarez
                  </span>
                </li>
                <li>
                  <span className="bg-yellow-400 px-1 text-black">
                    Luego de realizar la transferencia o el pago, por favor suba
                    el comprobante de la misma (captura de pantalla) para
                    completar su solicitud.
                  </span>
                </li>
                <li>
                  Una vez recibido, procesaremos su transferencia. No nos
                  hacemos responsable si envias a otra cuenta que no sea la
                  proporcionada por SwaplyAr.
                </li>
              </ul>
            </p>
            <Image
              src={WsUSDtoArs}
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
