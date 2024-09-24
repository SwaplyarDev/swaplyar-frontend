import RequestInfoBlock from "@/components/ui/RequestInfoBlock/RequestInfoBlock";
import Image from "next/image";
import { PaypaltoArs } from "@/utils/assets/img-database";

export function PaypalToArs (){

    return(
    <>
     <RequestInfoBlock
        title="Complete el formulario para procesar su transferencia bancaria."
        content={
          <>
            <p className="mb-4 text-center text-lg md:text-left">
              Ingrese sus datos personales en el formulario: Nombre, Apellido,
              Número de WhatsApp, CBU o Alias, CUIL, Correo Electrónico y
              Comprobante.
              <span className="bg-yellow-400 px-1 text-black">
                Luego de realizar la transferencia o el pago, por favor suba el
                comprobante de la misma (captura de pantalla) para completar su
                solicitud.
              </span>
              Una vez recibido, procesaremos su transferencia.
            </p>
            {/* <Image
                src={FormularioDeSolicitudMovil}
                alt="Formulario-de-Solicitud"
                width={500}
                height={350}
                className="w-full lg:hidden"
              /> */}
            <Image
              src={PaypaltoArs}
              alt="Formulario-de-Solicitud"
              width={500}
              height={350}
              className="hidden w-full lg:block"
            />
          </>
        }
      />
    </>
    )
};