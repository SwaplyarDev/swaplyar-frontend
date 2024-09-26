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
    const data = localStorage.getItem('selectedReceivingSystem');
    if (data) {
      const bank = JSON.parse(data);
      setPayerBank(bank.name);
    }
  }, []);
  return (
    <>
      <RequestInfoBlock
        title="El correo al que deberes realizar el pago es JOHANSUAREZ90@GMAIL.COM"
        content={
          <>
            <p className="mb-4 text-center text-lg md:text-left">
              <ul className='space-y-2'>
                <li>
                  La cuenta de Payoneer en EUR € esta a nombre de Johan Suarez.
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
            {payerBank === 'Banco' && 
              <Image
                src={PyEURtoArs}
                alt="Formulario-de-Solicitud"
                width={500}
                height={350}
                className="hidden w-full lg:block"
              />
            }
            {payerBank === 'PayPal' && 
              <Image
                src={PyEURtoPayPal}
                alt="Formulario-de-Solicitud"
                width={500}
                height={350}
                className="hidden w-full lg:block"
              />
            }
            {payerBank === 'Payoneer USD' && 
              <Image
                src={PyEURtoPyUSD}
                alt="Formulario-de-Solicitud"
                width={500}
                height={350}
                className="hidden w-full lg:block"
              />
            }
            {payerBank === 'Wise EUR' &&
              <Image
                src={PyEURtoWsEUR}
                alt="Formulario-de-Solicitud"
                width={500}
                height={350}
                className="hidden w-full lg:block"
              />
            }
            {payerBank === 'Wise USD' &&
              <Image
                src={PyEURtoWsUSD}
                alt="Formulario-de-Solicitud"
                width={500}
                height={350}
                className="hidden w-full lg:block"
              />
            }
          </>
        }
      />
    </>
  );
}
