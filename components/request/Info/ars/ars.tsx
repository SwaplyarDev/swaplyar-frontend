'use client';

import RequestInfoBlock from '@/components/ui/RequestInfoBlock/RequestInfoBlock';
import Image from 'next/image';
import { ArsToPayPal, ArsToPyEUR, ArsToPyUSD, ArsToWsEUR, ArsToWsUSD } from '@/utils/assets/imgDatabaseCloudinary';
import { useEffect, useState } from 'react';

export default function Ars() {
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
                  Ingrese sus datos personales en el formulario: Nombre, Apellido, Número de WhatsApp, CBU o Alias,
                  CUIL, Correo Electrónico y Comprobante.
                </li>
                <li>
                  Cuenta en Pesos Argentinos a transferir: {''}
                  <span className="font-bold text-buttonsLigth dark:text-sky-500">0150804601000139382113</span>
                </li>
                <li>
                  CUIL: {''}
                  <span className="font-semibold text-buttonsLigth dark:text-sky-500">20-1913601-9</span>
                </li>
                <li>
                  Usuario: {''}
                  <span className="font-semibold text-buttonsLigth dark:text-sky-500">Johan Javier Suarez Merchan</span>
                </li>
                <li>
                  <span className="bg-yellow-400 px-1 text-black">
                    Luego de realizar la transferencia o el pago, por favor suba el comprobante de la misma (captura de
                    pantalla) para completar su solicitud.
                  </span>
                </li>
                <li>
                  Una vez recibido, procesaremos su transferencia. No nos hacemos responsable si envias a otra cuenta
                  que no sea la proporcionada por SwaplyAr.
                </li>
              </ul>
            </p>

            {payerBank === 'PayPal' && (
              <Image
                src={ArsToPayPal}
                alt="Formulario-de-Solicitud"
                width={500}
                height={350}
                className="hidden w-full lg:block"
              />
            )}
            {payerBank === 'Payoneer EUR' && (
              <Image
                src={ArsToPyEUR}
                alt="Formulario-de-Solicitud"
                width={500}
                height={350}
                className="hidden w-full lg:block"
              />
            )}
            {payerBank === 'Payoneer USD' && (
              <Image
                src={ArsToPyUSD}
                alt="Formulario-de-Solicitud"
                width={500}
                height={350}
                className="hidden w-full lg:block"
              />
            )}
            {payerBank === 'Wise EUR' && (
              <Image
                src={ArsToWsEUR}
                alt="Formulario-de-Solicitud"
                width={500}
                height={350}
                className="hidden w-full lg:block"
              />
            )}
            {payerBank === 'Wise USD' && (
              <Image
                src={ArsToWsUSD}
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
