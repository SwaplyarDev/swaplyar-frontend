// /app/request/page.tsx

import { RequestRegisterForm } from '@/components/request/requestRegister';
import RequestInfoBlock from '@/components/ui/RequestInfoBlock/RequestInfoBlock';
import Image from 'next/image';

const RequestPage = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-8 py-10">
      <RequestRegisterForm />
      <RequestInfoBlock
        title="Complete el formulario para procesar su transferencia bancaria."
        content={(
          <>
            <p>
              Ingrese sus datos personales en el formulario: Nombre, Apellido, Número de WhatsApp, CBU o Alias, CUIL, Correo Electrónico y Comprobante.
              <span style={{ backgroundColor: 'yellow', color: 'black' }}>
                Luego de realizar la transferencia o el pago, por favor suba el comprobante de la misma (captura de pantalla) para completar su solicitud.
              </span>
              Una vez recibido, procesaremos su transferencia.
            </p>
            <Image
              src="/images/Formulario-de-Solicitud.png"
              alt="Formulario-de-Solicitud"
              width={500}
              height={350}
              className="w-full"
            />
          </>
        )}
      />
    </div>
  );
};

export default RequestPage;