'use client';
import Link from 'next/link';
import Image from 'next/image';
import { MdDownloadForOffline } from 'react-icons/md';
import { useMargins } from '@/context/MarginProvider';
import { useDarkTheme } from '../../../ui/theme-Provider/themeProvider';
import { ResponsiveMarginHook } from '@/hooks/ResponsiveMarginHook';
import LinkWithHover from '@/components/ui/LinkWithHover/LinkWithHover';
import AnimatedBlurredCircles from '@/components/ui/animations/AnimatedBlurredCircles';
import { SwaplyRewardsTnC } from '@/utils/assets/imgDatabaseCloudinary';

const SaprTermsConditions = () => {
  const { isDark } = useDarkTheme();
  const { margins } = useMargins();
  const currentMargin = ResponsiveMarginHook(margins);

  return (
    <div className="relative flex flex-col items-center py-10">
      <AnimatedBlurredCircles tope="top-[-1675px]" />
      <div style={{ margin: currentMargin }}>
        <div className="flex max-w-[1000px] flex-col items-center justify-center space-x-2 text-center md:flex-row md:items-center md:text-left">
          <div className="flex w-full max-w-[600px] items-center justify-center p-0">
            <h1 className="mb-6 text-3xl md:text-4xl">Términos y Condiciones de Programa de Fidelización</h1>
          </div>
          <div className="flex w-full max-w-[300px] flex-shrink-0 items-center justify-center">
            <Image className="hero-img" src={SwaplyRewardsTnC} alt="terminos-y-condiciones" width={300} height={300} />
          </div>
        </div>

        <div className="my-10 w-full max-w-5xl">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-1">
            <div className="rounded-lg bg-gray-100 p-6 text-gray-900 shadow-md dark:bg-graytyc dark:text-gray-100">
              <h2 className="mb-4 text-2xl md:text-3xl">1. Membresía</h2>
              <h3 className="indent-6 text-2xl md:text-2xl">a. Elegibilidad</h3>
              <p className="mb-4 ml-6">
                La membresía en SwaplyAr Rewards está abierta a personas mayores de dieciocho (18) años (o la mayoría de
                edad y capacidad contractual aplicable en su lugar de residencia). Debe proporcionar y mantener una
                dirección de correo electrónico precisa.
              </p>
              <h3 className="indent-6 text-2xl md:text-2xl">b. Inscripción</h3>
              <p className="mb-4 ml-6">
                Será inscrito automáticamente cuando cree un perfil en SwaplyAr proporcionando su dirección de correo
                electrónico. También puede inscribirse como miembro de SwaplyAr Rewards en una ubicación participante de
                SwaplyAr o a través de otros canales que SwaplyAr pueda poner a disposición ocasionalmente. Siempre que
                cumpla con los requisitos de elegibilidad, será inscrito como miembro de SwaplyAr Rewards (en adelante,
                “Miembro”).
              </p>
              <h3 className="indent-6 text-2xl md:text-2xl">c. Obligaciones de la Membresía</h3>
              <p className="ml-6">
                Como miembro de SwaplyAr Rewards, acepta estos Términos y Condiciones. Se compromete a proporcionar
                información precisa en todo momento y a notificarnos de cualquier cambio en su información de manera
                oportuna.
              </p>
            </div>

            <div className="rounded-lg bg-gray-100 p-6 shadow-md dark:bg-graytyc">
              <h2 className="mb-4 text-2xl md:text-3xl" id="segunda-funcionamiento-del-sitio-y-servicios">
                2. Beneficios y Recompensas
              </h2>
              <h3 className="indent-6 text-2xl md:text-2xl">a. Descuento de Bienvenida</h3>
              <p className="mb-4 ml-6">
                Como Miembro, recibirá un 10 pesos por cada dólar aplicables a su segunda Transacción Calificada después
                de la fecha de inscripción en SwaplyAr Rewards (en adelante, “Bono de Bienvenida”). El Bono de
                Bienvenida estará disponible de 24 a 48 horas después de su primera Transacción Calificada y vencerá a
                los 90 días de su emisión.
              </p>
              <h3 className="indent-6 text-2xl md:text-2xl">b. Crédito por Quinta Transacción</h3>
              <p className="mb-4 ml-6">
                Como Miembro, después de cada quinta Transacción Calificada, recibirá 15 pesos por cada dólar aplicables
                a su siguiente Transacción Calificada (en adelante, “Crédito por Quinta Transacción”). El Crédito por
                Quinta Transacción estará disponible de 24 a 48 horas después de cada quinta Transacción Calificada y
                vencerá a los 90 días de su emisión.
              </p>
              <h3 className="indent-6 text-2xl md:text-2xl">c. Estado Premier</h3>
              <p className="mb-4 ml-6">
                Como Miembro, después de su quinta Transacción Calificada dentro de un período de 12 meses, obtendrá el
                estado de SwaplyAr Rewards Premier (en adelante, “Estado Premier”), que incluye recompensas
                personalizadas y otras promociones determinadas por SwaplyAr a su entera discreción.
              </p>
              <h3 className="indent-6 text-2xl md:text-2xl">d. Gestión de Recompensas en Línea</h3>
              <p className="mb-4 ml-6">
                Como Miembro, podrá revisar su historial de transacciones y resumen de recompensas en línea.
              </p>
              <h3 className="indent-6 text-2xl md:text-2xl">e. Transacciones Calificadas</h3>
              <p className="ml-6">
                Una (“Transacción Calificada”) es una transacción de transferencia de saldo de PayPal realizada dentro
                de un período de 12 meses en SwaplyAr con un número de miembro de SwaplyAr Rewards válido, número de
                teléfono, correo electrónico y/o PIN que haya sido recibida con éxito por el destinatario designado y no
                cancelada por ninguna razón por el remitente, destinatario o SwaplyAr.
              </p>
            </div>

            <div className="rounded-lg bg-gray-100 p-6 shadow-md dark:bg-graytyc">
              <h2 className="mb-4 text-2xl md:text-3xl" id="segunda-funcionamiento-del-sitio-y-servicios">
                3. Comunicaciones de Marketing
              </h2>
              <p className="ml-6">
                SwaplyAr o sus terceros pueden contactarlo ocasionalmente por correo electrónico con noticias, ofertas,
                servicios, promociones y otras comunicaciones relacionadas con nuestros productos o servicios. Puede
                optar por no recibir comunicaciones de marketing de nosotros en cualquier momento enviando un correo
                electrónico a la siguiente dirección:{' '}
                <strong>
                  <LinkWithHover href="mailto:info@swaplyar.com">centrodeayuda@swaplyar.com</LinkWithHover>
                </strong>
                .
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-1">
              <div className="rounded-lg bg-gray-100 p-6 shadow-md dark:bg-graytyc">
                <h2 className="mb-4 text-2xl md:text-3xl" id="cuarta-comisiones-y-operativa">
                  4. Privacidad
                </h2>
                <p className="ml-6">
                  Su privacidad es importante para nosotros. Por favor, revise nuestro Aviso de Privacidad sobre cómo
                  recopilamos, usamos, divulgamos o transferimos su información personal, o sus Derechos de Privacidad
                  para ejercer cualquiera de sus derechos de privacidad.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-1">
              <div className="rounded-lg bg-gray-100 p-6 shadow-md dark:bg-graytyc">
                <h2 className="mb-4 text-2xl md:text-3xl" id="cuarta-comisiones-y-operativa">
                  5. Contacto con SwaplyAr
                </h2>
                <p className="ml-6">
                  Puede contactar a SwaplyAr en línea en{' '}
                  <strong>
                    <LinkWithHover href="/info/help-center">swaplyar.com/info/help-center</LinkWithHover>
                  </strong>
                  , por{' '}
                  <strong>
                    <LinkWithHover href="https://wa.me/+5491123832198">WhatsApp</LinkWithHover>
                  </strong>
                  , o por correo de atención:{' '}
                  <strong>
                    <LinkWithHover href="mailto:info@swaplyar.com">centrodeayuda@swaplyar.com</LinkWithHover>
                  </strong>
                  .
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-1">
              <div className="rounded-lg bg-gray-100 p-6 shadow-md dark:bg-graytyc">
                <h2 className="mb-4 text-2xl md:text-3xl" id="cuarta-comisiones-y-operativa">
                  6. Marcas Registradas
                </h2>
                <p className="ml-6">
                  SwaplyAr, SwaplyAr Rewards y cualquier otra marca registrada asociada con SwaplyAr o SwaplyAr Rewards
                  son marcas registradas de SwaplyAr o sus afiliados y no pueden ser reproducidas o utilizadas de
                  ninguna manera sin el consentimiento previo por escrito de SwaplyAr.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-1">
              <div className="rounded-lg bg-gray-100 p-6 shadow-md dark:bg-graytyc">
                <h2 className="mb-4 text-2xl md:text-3xl" id="cuarta-comisiones-y-operativa">
                  7. Sujeto a Cambios o Cancelación
                </h2>
                <p className="ml-6">
                  SwaplyAr Rewards, y cualquier beneficio o recompensa asociada, están sujetos a cambios en cualquier
                  momento a la discreción exclusiva de SwaplyAr. Podemos suspender su membresía en SwaplyAr Rewards, y/o
                  cancelar sus beneficios y recompensas, por cualquier razón, incluidas representaciones fraudulentas
                  por su parte, o si está prohibido por la ley aplicable. Los beneficios y recompensas no tienen valor
                  en efectivo, no generan intereses y no están asegurados contra pérdida. Los beneficios y recompensas
                  no pueden ser comprados, vendidos, combinados o transferidos de ninguna manera.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-1">
              <div className="rounded-lg bg-gray-100 p-6 shadow-md dark:bg-graytyc">
                <h2 className="mb-4 text-2xl md:text-3xl" id="cuarta-comisiones-y-operativa">
                  8. Cesión
                </h2>
                <p className="ml-6">
                  No puede ceder, transferir o permitir que nadie más use su membresía en SwaplyAr Plus Rewards.
                  SwaplyAr puede ceder sus derechos o delegar sus deberes bajo este Acuerdo a su entera discreción.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-1">
              <div className="rounded-lg bg-gray-100 p-6 shadow-md dark:bg-graytyc">
                <h2 className="mb-4 text-2xl md:text-3xl" id="cuarta-comisiones-y-operativa">
                  9. Ley Aplicable
                </h2>
                <p className="ml-6">
                  Este Acuerdo y la relación entre las partes se regirán e interpretarán de acuerdo con las leyes de la
                  Ciudad de Buenos Aires y resto de la República de Argentina. Las partes se someten irrevocablemente a
                  la jurisdicción de los tribunales situados en Buenos Aires, Argentina o donde corresponda.
                </p>
              </div>
            </div>

            <div className="mb-4 flex justify-center">
              <Link
                href="https://swaplyar.com/SAPR-Terms-Conditions-ES%20.pdf"
                target="_blank"
                className={`relative m-1 flex h-[48px] items-center justify-center rounded-3xl border border-buttonsLigth bg-buttonsLigth p-3 font-bold text-white dark:border-darkText dark:bg-darkText dark:text-lightText ${isDark ? 'buttonSecondDark' : 'buttonSecond'}`}
              >
                <MdDownloadForOffline className="h-7 w-7" />
                <h3>Descargar Términos</h3>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaprTermsConditions;
