// /app/request/page.tsx

'use client';

import { RequestRegisterForm } from '@/components/request/requestRegister';
import {
  FormularioDeSolicitud,
  FormularioDeSolicitudMovil,
} from '@/utils/assets/img-database';
import RequestInfoBlock from '@/components/ui/RequestInfoBlock/RequestInfoBlock';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const RequestPage = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      className={`flex flex-col ${isMobile ? '' : 'md:flex-row'} items-center justify-center gap-8 py-10`}
    >
      {isMobile && (
        <RequestInfoBlock
          title="Complete el formulario para procesar su transferencia bancaria."
          content={
            <>
              <p className="mb-4 text-lg">
                Ingrese sus datos personales en el formulario: Nombre, Apellido,
                Número de WhatsApp, CBU o Alias, CUIL, Correo Electrónico y
                Comprobante.
                <span className="bg-yellow-400 px-1 text-black">
                  Luego de realizar la transferencia o el pago, por favor suba
                  el comprobante de la misma (captura de pantalla) para
                  completar su solicitud.
                </span>
                Una vez recibido, procesaremos su transferencia.
              </p>
              <Image
                src={FormularioDeSolicitudMovil}
                alt="Formulario-de-Solicitud"
                width={500}
                height={350}
                className="w-full"
              />
            </>
          }
        />
      )}
      <RequestRegisterForm />
      {!isMobile && (
        <RequestInfoBlock
          title="Complete el formulario para procesar su transferencia bancaria."
          content={
            <>
              <p className="mb-4 text-lg">
                Ingrese sus datos personales en el formulario: Nombre, Apellido,
                Número de WhatsApp, CBU o Alias, CUIL, Correo Electrónico y
                Comprobante.
                <span className="bg-yellow-400 px-1 text-black">
                  Luego de realizar la transferencia o el pago, por favor suba
                  el comprobante de la misma (captura de pantalla) para
                  completar su solicitud.
                </span>
                Una vez recibido, procesaremos su transferencia.
              </p>
              <Image
                src={FormularioDeSolicitud}
                alt="Formulario-de-Solicitud"
                width={500}
                height={350}
                className="w-full"
              />
            </>
          }
        />
      )}
    </div>
  );
};

export default RequestPage;
