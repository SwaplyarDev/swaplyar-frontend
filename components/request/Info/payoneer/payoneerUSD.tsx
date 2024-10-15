import RequestInfoBlock from '@/components/ui/RequestInfoBlock/RequestInfoBlock';
import Image from 'next/image';
import {
  PyUSDtoArs,
  PyUSDtoPayPal,
  PyUSDtoPyEUR,
  PyUSDtoWsEUR,
  PyUSDtoWsUSD,
} from '@/utils/assets/imgDatabaseCloudinary';
import { useEffect, useState } from 'react';

export default function PayoneerUSD() {
  const [payerBank, setPayerBank] = useState<string>('');

  useEffect(() => {
    const data = localStorage.getItem('selectedReceivingSystem');
    if (data) {
      const bank = JSON.parse(data);
      setPayerBank(bank.name);
    }
  }, []);
  return (
    <>
      <RequestInfoBlock
        title="Complete el formulario para procesar su transferencia bancaria."
        content={
          <>
            <p className="mb-4 text-center text-lg md:text-left">
              <ul className="space-y-2">
                <li>
                  La cuenta de Payoneer en USD $ esta a nombre de Johan Suarez.
                </li>
                <li>
                  Proporcione el ID de la transacción de Payoneer y realice la
                  transferencia al correo: {''}
                  <span className="font-semibold text-buttonsLigth dark:text-sky-500">
                    JOHANSUAREZ90@GMAIL.COM
                  </span>
                </li>
                <li>
                  Con el nombre de: {''}
                  <span className="font-semibold text-buttonsLigth dark:text-sky-500">
                    Johan Javier Suarez Merchan
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
                  hacemos responsable si envias a otro correo que no sea el
                  proporcionado por SwaplyAr.
                </li>
              </ul>
            </p>
            {payerBank === 'Banco' && (
              <Image
                src={PyUSDtoArs}
                alt="Formulario-de-Solicitud"
                width={500}
                height={350}
                className="hidden w-full lg:block"
              />
            )}
            {payerBank === 'PayPal' && (
              <Image
                src={PyUSDtoPayPal}
                alt="Formulario-de-Solicitud"
                width={500}
                height={350}
                className="hidden w-full lg:block"
              />
            )}
            {payerBank === 'Payoneer EUR' && (
              <Image
                src={PyUSDtoPyEUR}
                alt="Formulario-de-Solicitud"
                width={500}
                height={350}
                className="hidden w-full lg:block"
              />
            )}
            {payerBank === 'Wise EUR' && (
              <Image
                src={PyUSDtoWsEUR}
                alt="Formulario-de-Solicitud"
                width={500}
                height={350}
                className="hidden w-full lg:block"
              />
            )}
            {payerBank === 'Wise USD' && (
              <Image
                src={PyUSDtoWsUSD}
                alt="Formulario-de-Solicitud"
                width={500}
                height={350}
                className="hidden w-full lg:block"
              />
            )}
          </>
        }
      />
    </>
  );
}
