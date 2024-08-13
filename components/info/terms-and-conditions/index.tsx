import FlyerTrabajo from '@/components/FlyerTrabajo/FlyerTrabajo';
import LinkWithHover from '@/components/ui/LinkWithHover/LinkWithHover';
import {
  CentroDeAyuda,
  TerminosCondiciones,
} from '@/utils/assets/img-database';
import Image from 'next/image';

const TermsAndConditions = () => {
  return (
    <div className="flex flex-col items-center bg-white py-10 dark:bg-black">
      <FlyerTrabajo imageSrc={CentroDeAyuda}>
        Estamos trabajando en las funciones de inicio de sesión y registro.
      </FlyerTrabajo>

      <div className="rs-wrapper-v4 my-8 flex flex-col items-center justify-center text-center md:flex-row md:items-center">
        <div className="container-text flex h-full items-center justify-center text-gray-900 md:ml-8 dark:text-gray-100">
          <h1 className="mb-6 text-3xl font-bold">
            Términos y Condiciones de Uso y Navegación del Sitio SwaplyAr
          </h1>
        </div>
        <div className="flex w-full flex-shrink-0 items-center justify-center md:w-auto">
          <Image
            className="hero-img"
            src={TerminosCondiciones}
            alt="terminos-y-condiciones"
            width={500}
            height={500}
          />
        </div>
      </div>

      <div className="my-10 w-full max-w-3xl px-4">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-1">
          {/* <!--1--> */}
          <div className="rounded-lg bg-gray-100 p-6 text-gray-900 shadow-md dark:bg-gray-800 dark:text-gray-100">
            <h2
              className="mb-4 text-2xl font-semibold"
              id="primera-aceptacion-de-los-t&c"
            >
              Primera. Aceptación de los T&C:
            </h2>
            <p>
              El acceso y uso del sitio implican la aceptación plena y sin
              reservas de los presentes T&C y sus eventuales modificaciones. Si
              no está de acuerdo con estos T&C, deberá abstenerse de utilizar el
              sitio. SwaplyAr se reserva el derecho de modificar los T&C en
              cualquier momento, siendo efectivas las modificaciones desde el
              momento de su publicación en el sitio web. Se recomienda a los
              USUARIOS revisar periódicamente los T&C para estar informados de
              cualquier cambio.
            </p>
          </div>

          {/* <!--2--> */}
          <div className="rounded-lg bg-gray-100 p-6 text-gray-900 shadow-md dark:bg-gray-800 dark:text-gray-100">
            <h2
              className="mb-4 text-2xl font-semibold"
              id="segunda-funcionamiento-del-sitio-y-servicios"
            >
              Segunda. Funcionamiento del Sitio y Servicios:
            </h2>
            <p>
              El servicio permite a los USUARIOS realizar solicitudes en el
              sitio sin necesidad de registrarse, utilizando una aplicación
              informática que facilita las acciones de intercambio y solicitud
              de saldo de PayPal de manera digital. Los USUARIOS pueden operar
              libremente en la plataforma, aunque SwaplyAr puede requerir
              información adicional para cumplir con las normativas comerciales
              vigentes y garantizar la seguridad y legitimidad de las
              operaciones.
            </p>
            <p>
              SwaplyAr actúa como intermediario en la compra y venta de saldo de
              PayPal, proporcionando una plataforma segura y confiable para que
              los USUARIOS realicen sus transacciones. No obstante, SwaplyAr no
              es un banco ni una entidad financiera regulada por la Ley de
              Entidades Financieras 21.526, ni una casa de cambio. Por lo tanto,
              todas las transferencias y operaciones se realizan a través de
              entidades reguladas conforme a la normativa vigente aplicable a
              dichas entidades.
            </p>
          </div>
          {/* <!--3--> */}
          <div className="rounded-lg bg-gray-100 p-6 text-gray-900 shadow-md dark:bg-gray-800 dark:text-gray-100">
            <h2
              className="mb-4 text-2xl font-semibold"
              id="segunda-funcionamiento-del-sitio-y-servicios"
            >
              Tercera. Capacidad Legal:
            </h2>
            <p>
              Para aceptar estos T&C, el USUARIO debe tener la capacidad legal
              según la jurisdicción aplicable. Si el USUARIO es menor de edad,
              deberá estar representado por sus responsables parentales o
              tutores legales, quienes serán responsables por todas las
              actividades realizadas por el menor en el sitio.
            </p>
            <p>
              El USUARIO se compromete a proporcionar información veraz y exacta
              en todo momento. En caso de proporcionar información falsa,
              inexacta o incompleta, SwaplyAr se reserva el derecho de suspender
              o cancelar su cuenta, así como de tomar las acciones legales
              correspondientes. La responsabilidad por cualquier daño o
              perjuicio resultante de la información falsa o inexacta
              proporcionada recaerá exclusivamente sobre el USUARIO.
            </p>
          </div>

          {/* <!--4--> */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-1">
            <div className="rounded-lg bg-gray-100 p-6 text-gray-900 shadow-md dark:bg-gray-800 dark:text-gray-100">
              <h2
                className="mb-4 text-2xl font-semibold"
                id="cuarta-comisiones-y-operativa"
              >
                Cuarta. Comisiones y Operativa:
              </h2>
              <p>
                <strong>Costos de Envío:</strong> El USUARIO asume todos los
                costos de envío asociados con la transferencia de fondos, los
                cuales serán debitados automáticamente por la plataforma en el
                momento de la transacción. Además, el USUARIO es responsable de
                cualquier comisión adicional que pueda aplicar el sistema de
                envío elegido.
              </p>
              <p>
                <strong>Plataformas Aceptadas:</strong> Actualmente, SwaplyAr
                opera únicamente con PayPal. Las plataformas o procesos
                aceptados pueden variar y serán actualizados en el sitio web de
                SwaplyAr conforme a la disponibilidad de servicios y acuerdos
                comerciales.
              </p>
              <p>
                <strong>Impuestos:</strong> SwaplyAr absorbe los impuestos
                aplicables por las transacciones realizadas a través de PayPal
                (5.6% + 0.30 USD por transacción). Sin embargo, el USUARIO es
                responsable de pagar cualquier impuesto adicional que pueda
                aplicar conforme a las leyes y regulaciones de su país de
                residencia. Se recomienda a los USUARIOS estar informados sobre
                las normativas fiscales vigentes en su jurisdicción.
              </p>
              <p>
                <strong>Tiempos de Procesamiento:</strong> Las transferencias y
                acreditaciones pueden demorar entre 12 y 24 horas hábiles,
                dependiendo del banco y sistema de pago utilizado por el
                USUARIO. En ocasiones, pueden ocurrir demoras mayores debido a
                la alta demanda o problemas técnicos en los sistemas de
                recepción de fondos.
              </p>
            </div>
          </div>

          {/* <!--5--> */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-1">
            <div className="rounded-lg bg-gray-100 p-6 text-gray-900 shadow-md dark:bg-gray-800 dark:text-gray-100">
              <h2
                className="mb-4 text-2xl font-semibold"
                id="cuarta-comisiones-y-operativa"
              >
                Quinta. Procesos y Conflictos:
              </h2>
              <p>
                SwaplyAr no participa en la compra y venta de productos o
                servicios ajenos a su plataforma. Cualquier transacción
                realizada fuera de los servicios ofrecidos por SwaplyAr es
                responsabilidad exclusiva de los USUARIOS involucrados.
              </p>
              <p>
                En caso de que un USUARIO considere que ha habido un mal
                accionar por parte de otro USUARIO, puede notificar el problema
                mediante un ticket de soporte o correo electrónico. SwaplyAr se
                compromete a investigar y responder a dichas notificaciones
                dentro de los plazos indicados en su política de resolución de
                conflictos.
              </p>
              <p>
                Para resolver cualquier conflicto, el USUARIO puede optar por
                los siguientes medios de contacto:
              </p>
              <ul>
                <li>Email: info@swaplyar.com</li>
                <li>
                  Plataforma de soporte:{' '}
                  <LinkWithHover href="https://support.swaplyar.com">
                    support.swaplyar.com
                  </LinkWithHover>
                </li>
              </ul>
              <p>
                SwaplyAr no es responsable por las acciones, omisiones o
                negligencias de terceros, incluidos los USUARIOS, proveedores de
                servicios de pago o cualquier otra entidad involucrada en la
                cadena de transacciones.
              </p>
              <p>
                El USUARIO acepta que cualquier disputa, reclamo o controversia
                que surja de o esté relacionada con estos T&C o los servicios
                prestados por SwaplyAr se resolverá a través de los mecanismos
                de resolución de conflictos establecidos en la plataforma, sin
                perjuicio del derecho del USUARIO de recurrir a las autoridades
                competentes.
              </p>
            </div>
          </div>

          {/* <!--6--> */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-1">
            <div className="rounded-lg bg-gray-100 p-6 text-gray-900 shadow-md dark:bg-gray-800 dark:text-gray-100">
              <h2
                className="mb-4 text-2xl font-semibold"
                id="cuarta-comisiones-y-operativa"
              >
                Sexta. Seguridad y Protección de Datos:
              </h2>
              <p>
                SwaplyAr se compromete a proteger la información personal de los
                USUARIOS en cumplimiento de las leyes y regulaciones aplicables
                en materia de protección de datos. Para más detalles sobre cómo
                se recopila, utiliza y protege la información personal, consulte
                nuestra{' '}
                <LinkWithHover href="/politica-de-privacidad">
                  Política de Privacidad
                </LinkWithHover>
                .
              </p>
              <p>
                El USUARIO es responsable de mantener la seguridad de sus
                credenciales de acceso y de cualquier actividad realizada con su
                cuenta. SwaplyAr no se responsabiliza por el uso no autorizado
                de la cuenta del USUARIO ni por cualquier daño o pérdida
                resultante de dicho uso.
              </p>
              <p>
                SwaplyAr adopta medidas de seguridad para proteger la
                información de los USUARIOS contra accesos no autorizados,
                alteraciones, divulgación o destrucción. Sin embargo, no se
                garantiza una seguridad absoluta, por lo que el USUARIO reconoce
                y acepta los riesgos inherentes a la transmisión de información
                por Internet.
              </p>
              <p>
                El USUARIO se compromete a notificar de inmediato a SwaplyAr
                cualquier uso no autorizado de su cuenta o cualquier otra
                violación de seguridad. SwaplyAr se reserva el derecho de
                suspender temporal o permanentemente la cuenta del USUARIO en
                caso de sospecha de actividad fraudulenta o infracción de los
                T&C.
              </p>
              <p>
                SwaplyAr puede cooperar con las autoridades competentes en la
                investigación y resolución de cualquier actividad ilegal o
                sospechosa en la plataforma.
              </p>
            </div>
          </div>

          {/* <!--7--> */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-1">
            <div className="rounded-lg bg-gray-100 p-6 text-gray-900 shadow-md dark:bg-gray-800 dark:text-gray-100">
              <h2
                className="mb-4 text-2xl font-semibold"
                id="cuarta-comisiones-y-operativa"
              >
                Séptima. Uso del Sitio y Prohibiciones:
              </h2>
              <p>
                Los USUARIOS del sitio SwaplyAr se comprometen a no realizar las
                siguientes acciones:
              </p>
              <p>
                <strong>a)</strong> Publicar contenido ilegal, obsceno, abusivo,
                difamatorio, injurioso, discriminatorio o contrario a las buenas
                costumbres.
              </p>
              <p>
                <strong>b)</strong> Enviar archivos o comunicaciones con virus,
                troyanos, programas maliciosos o cualquier otra característica
                capaz de dañar el funcionamiento de un sistema informático.
              </p>
              <p>
                <strong>c)</strong> Ofrecer productos o servicios distintos a
                los autorizados por la aplicación.
              </p>
              <p>
                <strong>d)</strong> Copiar, reproducir o distribuir imágenes,
                contenidos, diseños o marcas de SwaplyAr o terceros sin
                autorización previa.
              </p>
              <p>
                <strong>e)</strong> Usar software para monitorear o copiar
                información, datos o contenidos de la página web sin
                autorización.
              </p>
              <p>
                <strong>f)</strong> Usar marcas, slogans, frases o imágenes de
                SwaplyAr para promocionar productos o servicios sin permiso.
              </p>
              <p>
                <strong>g)</strong> Incumplir las normas de comunidad o
                políticas de privacidad establecidas por SwaplyAr.
              </p>
            </div>
          </div>

          {/* <!--8--> */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-1">
            <div className="rounded-lg bg-gray-100 p-6 text-gray-900 shadow-md dark:bg-gray-800 dark:text-gray-100">
              <h2
                className="mb-4 text-2xl font-semibold"
                id="cuarta-comisiones-y-operativa"
              >
                Octava. Seguridad y Manejo de Información de Acceso:
              </h2>
              <p>
                La seguridad es fundamental para SwaplyAr. El USUARIO debe
                observar todas las medidas de seguridad legales e informáticas
                para proteger su cuenta. La cuenta es personal e intransferible,
                y el USUARIO es responsable por el acceso que otorgue a
                terceros.
              </p>
              <p>
                SwaplyAr asegura la protección y privacidad de los datos del
                USUARIO y no compartirá información sobre procesos o
                procedimientos con entidades recaudadoras, bancos u otras
                plataformas sin la autorización expresa del USUARIO.
              </p>
            </div>
          </div>

          {/* <!--9--> */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-1">
            <div className="rounded-lg bg-gray-100 p-6 text-gray-900 shadow-md dark:bg-gray-800 dark:text-gray-100">
              <h2
                className="mb-4 text-2xl font-semibold"
                id="cuarta-comisiones-y-operativa"
              >
                Novena. Garantía a Clientes, Bonificaciones y Seguros:
              </h2>
              <p>
                SwaplyAr puede, a su discreción, ofrecer premios, bonificaciones
                o descuentos a los USUARIOS por el uso de las cuentas o la
                operativa. Estas promociones estarán sujetas a los términos y
                condiciones específicos establecidos para cada caso.
              </p>
            </div>
          </div>

          {/* <!--10--> */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-1">
            <div className="rounded-lg bg-gray-100 p-6 text-gray-900 shadow-md dark:bg-gray-800 dark:text-gray-100">
              <h2
                className="mb-4 text-2xl font-semibold"
                id="cuarta-comisiones-y-operativa"
              >
                Décima. Indemnidad:
              </h2>
              <p>
                El USUARIO se compromete a indemnizar y mantener indemne a
                SwaplyAr, sus directivos, empleados y agentes, de cualquier
                reclamación, responsabilidad, pérdida, gasto o demanda,
                incluidos honorarios legales razonables, derivados del uso
                indebido del sitio, violación de estos T&C o infracción de
                cualquier ley o derecho de terceros.
              </p>
            </div>
          </div>

          {/* <!--11--> */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-1">
            <div className="rounded-lg bg-gray-100 p-6 text-gray-900 shadow-md dark:bg-gray-800 dark:text-gray-100">
              <h2
                className="mb-4 text-2xl font-semibold"
                id="cuarta-comisiones-y-operativa"
              >
                Décima primera. Transferencia de Derechos y Uso Personal de la
                Cuenta:
              </h2>
              <p>
                El USUARIO no puede transferir sus derechos u obligaciones a
                terceros sin el consentimiento previo por escrito de SwaplyAr.
                La cuenta y las operaciones realizadas en ella son personales y
                deben ser gestionadas exclusivamente por el titular de la
                cuenta.
              </p>
            </div>
          </div>

          {/* <!--12--> */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-1">
            <div className="rounded-lg bg-gray-100 p-6 text-gray-900 shadow-md dark:bg-gray-800 dark:text-gray-100">
              <h2
                className="mb-4 text-2xl font-semibold"
                id="cuarta-comisiones-y-operativa"
              >
                Décima segunda. Contacto sobre Operaciones y Soporte Técnico:
              </h2>
              <p>
                Para consultas técnicas, el USUARIO debe responder el correo
                recibido con los detalles de la solicitud. Para soporte técnico
                o postventa, SwaplyAr ofrece los siguientes métodos de contacto:
              </p>
              <p>
                <strong>Correo Electrónico:</strong> ayuda@swaplyar.com
              </p>
            </div>
          </div>

          {/* <!--13--> */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-1">
            <div className="rounded-lg bg-gray-100 p-6 text-gray-900 shadow-md dark:bg-gray-800 dark:text-gray-100">
              <h2
                className="mb-4 text-2xl font-semibold"
                id="cuarta-comisiones-y-operativa"
              >
                Décima tercera. Datos Personales y Políticas de Privacidad:
              </h2>
              <p>
                SwaplyAr se compromete a proteger la privacidad de los datos
                personales de los USUARIOS conforme a lo establecido en las
                leyes y regulaciones aplicables. En caso de incumplimiento
                reiterado por parte de un USUARIO, SwaplyAr se reserva el
                derecho de compartir los datos del USUARIO incumplidor con el
                afectado y, si es necesario, con las autoridades competentes.
              </p>
            </div>
          </div>

          {/* <!--14--> */}
          <div className="rounded-lg bg-gray-100 p-6 text-gray-900 shadow-md dark:bg-gray-800 dark:text-gray-100">
            <h2
              className="mb-4 text-2xl font-semibold"
              id="decima-cuarta-defensa-al-consumidor"
            >
              Décima cuarta. Defensa al Consumidor:
            </h2>
            <p>
              <strong>
                Dirección de Defensa al Consumidor de la Ciudad de Buenos Aires:
              </strong>
              <LinkWithHover href="https://buenosaires.gob.ar/defensaconsumidor/direccion-general">
                Dirección General de Defensa y Protección al Consumidor.
              </LinkWithHover>
            </p>
            <p>
              <strong>
                Contacto de la Dirección Nacional de Protección de Datos
                Personales:
              </strong>{' '}
              Sarmiento 1118, 5° piso (C1041AAX), Tel: 4383-8510/12/13/15. AAIP
              Datos Personales -
              <LinkWithHover href="https://www.argentina.gob.ar/aaip/datospersonales">
                infodnpdp@just.gov.ar
              </LinkWithHover>
            </p>
          </div>

          {/* Aquí puedes agregar más secciones siguiendo la misma estructura */}
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
