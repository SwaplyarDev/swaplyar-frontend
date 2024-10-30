'use client';
import Link from 'next/link';
import LinkWithHover from '@/components/ui/LinkWithHover/LinkWithHover';
import { useDarkTheme } from '../../ui/theme-Provider/themeProvider';
import { MdDownloadForOffline } from 'react-icons/md';

const SaprTermsConditions = () => {
  const { isDark } = useDarkTheme();
  return (
    <div className="mx-auto my-10 w-full max-w-5xl px-3">
      <h1 className="mb-6 font-sans text-3xl md:text-4xl">
        Términos y Condiciones de Programa de Fidelización
      </h1>
      <div className="mb-4 rounded bg-gray-100 p-4 shadow dark:bg-[rgb(69,69,69)]">
        <h2 className="mb-4 text-2xl">1. Membresía</h2>
        <h2 className="mb-4 text-[21px]">a. Elegibilidad</h2>
        <p className="mb-4 text-[16px] text-gray-700 dark:text-gray-100">
          La membresía en SwaplyAr Rewards está abierta a personas mayores de
          dieciocho (18) años (o la mayoría de edad y capacidad contractual
          aplicable en su lugar de residencia). Debe proporcionar y mantener una
          dirección de correo electrónico precisa.
        </p>

        <h2 className="mb-4 text-[21px]">b. Inscripción</h2>
        <p className="mb-4 text-[16px] text-gray-700 dark:text-gray-100">
          Será inscrito automáticamente cuando cree un perfil en SwaplyAr
          proporcionando su dirección de correo electrónico. También puede
          inscribirse como miembro de SwaplyAr Rewards en una ubicación
          participante de SwaplyAr o a través de otros canales que SwaplyAr
          pueda poner a disposición ocasionalmente. Siempre que cumpla con los
          requisitos de elegibilidad, será inscrito como miembro de SwaplyAr
          Rewards (en adelante, “Miembro”).
        </p>

        <h2 className="mb-4 text-[21px]">c. Obligaciones de la Membresía</h2>
        <p className="mb-4 text-[16px] text-gray-700 dark:text-gray-100">
          Como miembro de SwaplyAr Rewards, acepta estos Términos y Condiciones.
          Se compromete a proporcionar información precisa en todo momento y a
          notificarnos de cualquier cambio en su información de manera oportuna.
        </p>
      </div>

      <div className="mb-4 rounded bg-gray-100 p-4 shadow dark:bg-[rgb(69,69,69)]">
        <h2 className="mb-4 text-[23px]">2. Beneficios y Recompensas</h2>

        <h3 className="mb-4 text-[21px]">a. Descuento de Bienvenida</h3>
        <p className="mb-4 text-[16px] text-gray-700 dark:text-gray-100">
          Como Miembro, recibirá un 10 pesos por cada dólar aplicables a su
          segunda Transacción Calificada después de la fecha de inscripción en
          SwaplyAr Rewards (en adelante, “Bono de Bienvenida”). El Bono de
          Bienvenida estará disponible de 24 a 48 horas después de su primera
          Transacción Calificada y vencerá a los 90 días de su emisión.
        </p>

        <h3 className="mb-4 text-[21px]">b. Crédito por Quinta Transacción</h3>
        <p className="mb-4 text-[16px] text-gray-700 dark:text-gray-100">
          Como Miembro, después de cada quinta Transacción Calificada, recibirá
          15 pesos por cada dólar aplicables a su siguiente Transacción
          Calificada (en adelante, “Crédito por Quinta Transacción”). El Crédito
          por Quinta Transacción estará disponible de 24 a 48 horas después de
          cada quinta Transacción Calificada y vencerá a los 90 días de su
          emisión.
        </p>

        <h3 className="mb-4 text-[21px]">c. Estado Premier</h3>
        <p className="mb-4 text-[16px] text-gray-700 dark:text-gray-100">
          Como Miembro, después de su quinta Transacción Calificada dentro de un
          período de 12 meses, obtendrá el estado de SwaplyAr Rewards Premier
          (en adelante, “Estado Premier”), que incluye recompensas
          personalizadas y otras promociones determinadas por SwaplyAr a su
          entera discreción.
        </p>

        <h3 className="mb-4 text-[21px]">d. Gestión de Recompensas en Línea</h3>
        <p className="mb-4 text-[16px] text-gray-700 dark:text-gray-100">
          Como Miembro, podrá revisar su historial de transacciones y resumen de
          recompensas en línea.
        </p>

        <h3 className="mb-4 text-[21px]">e. Transacciones Calificadas</h3>
        <p className="mb-4 text-[16px] text-gray-700 dark:text-gray-100">
          Una (“Transacción Calificada”) es una transacción de transferencia de
          saldo de PayPal realizada dentro de un período de 12 meses en SwaplyAr
          con un número de miembro de SwaplyAr Rewards válido, número de
          teléfono, correo electrónico y/o PIN que haya sido recibida con éxito
          por el destinatario designado y no cancelada por ninguna razón por el
          remitente, destinatario o SwaplyAr.
        </p>
      </div>

      <div className="mb-4 rounded bg-gray-100 p-4 shadow dark:bg-[rgb(69,69,69)]">
        <h2 className="mb-4 text-[23px]">3. Comunicaciones de Marketing</h2>
        <p className="mb-4 text-[16px] text-gray-700 dark:text-gray-100">
          SwaplyAr o sus terceros pueden contactarlo ocasionalmente por correo
          electrónico con noticias, ofertas, servicios, promociones y otras
          comunicaciones relacionadas con nuestros productos o servicios. Puede
          optar por no recibir comunicaciones de marketing de nosotros en
          cualquier momento enviando un correo electrónico al
          centrodeayuda@swaplyar.com.
        </p>
      </div>

      <div className="mb-4 rounded bg-gray-100 p-4 shadow dark:bg-[rgb(69,69,69)]">
        <h2 className="mb-4 text-[23px]">4. Privacidad</h2>
        <p className="mb-4 text-[16px] text-gray-700 dark:text-gray-100">
          Su privacidad es importante para nosotros. Por favor, revise nuestro
          Aviso de Privacidad sobre cómo recopilamos, usamos, divulgamos o
          transferimos su información personal, o sus Derechos de Privacidad
          para ejercer cualquiera de sus derechos de privacidad.
        </p>
      </div>

      <div className="mb-4 rounded bg-gray-100 p-4 shadow dark:bg-[rgb(69,69,69)]">
        <h2 className="mb-4 text-[23px]">5. Contacto con SwaplyAr</h2>
        <p className="mb-4 text-[16px] text-gray-700 dark:text-gray-100">
          Puede contactar a SwaplyAr en línea en{' '}
          <LinkWithHover href="https://www.swaplyar.com/ayuda">
            https://www.swaplyar.com/ayuda
          </LinkWithHover>
          , por WhatsApp al +5491123832198, o por correo de atención:{' '}
          <LinkWithHover href="mailto:centrodeayuda@swaplyar.com">
            centrodeayuda@swaplyar.com
          </LinkWithHover>
          .
        </p>
      </div>

      <div className="mb-4 rounded bg-gray-100 p-4 shadow dark:bg-[rgb(69,69,69)]">
        <h2 className="mb-4 text-[23px]">6. Marcas Registradas</h2>
        <p className="mb-4 text-[16px] text-gray-700 dark:text-gray-100">
          SwaplyAr, SwaplyAr Rewards y cualquier otra marca registrada asociada
          con SwaplyAr o SwaplyAr Rewards son marcas registradas de SwaplyAr o
          sus afiliados y no pueden ser reproducidas o utilizadas de ninguna
          manera sin el consentimiento previo por escrito de SwaplyAr.
        </p>
      </div>

      <div className="mb-4 rounded bg-gray-100 p-4 shadow dark:bg-[rgb(69,69,69)]">
        <h2 className="mb-4 text-[23px]">7. Sujeto a Cambios o Cancelación</h2>
        <p className="mb-4 text-[16px] text-gray-700 dark:text-gray-100">
          SwaplyAr Rewards, y cualquier beneficio o recompensa asociada, están
          sujetos a cambios en cualquier momento a la discreción exclusiva de
          SwaplyAr. Podemos suspender su membresía en SwaplyAr Rewards, y/o
          cancelar sus beneficios y recompensas, por cualquier razón, incluidas
          representaciones fraudulentas por su parte, o si está prohibido por la
          ley aplicable. Los beneficios y recompensas no tienen valor en
          efectivo, no generan intereses y no están asegurados contra pérdida.
          Los beneficios y recompensas no pueden ser comprados, vendidos,
          combinados o transferidos de ninguna manera.
        </p>
      </div>

      <div className="mb-4 rounded bg-gray-100 p-4 shadow dark:bg-[rgb(69,69,69)]">
        <h2 className="mb-4 text-[23px]">8. Cesión</h2>
        <p className="mb-4 text-[16px] text-gray-700 dark:text-gray-100">
          No puede ceder, transferir o permitir que nadie más use su membresía
          en SwaplyAr Plus Rewards. SwaplyAr puede ceder sus derechos o delegar
          sus deberes bajo este Acuerdo a su entera discreción.
        </p>
      </div>

      <div className="mb-4 rounded bg-gray-100 p-4 shadow dark:bg-[rgb(69,69,69)]">
        <h2 className="mb-4 text-[23px]">9. Ley Aplicable</h2>
        <p className="mb-4 text-[16px] text-gray-700 dark:text-gray-100">
          Este Acuerdo y la relación entre las partes se regirán e interpretarán
          de acuerdo con las leyes de la Ciudad de Buenos Aires y resto de la
          República de Argentina. Las partes se someten irrevocablemente a la
          jurisdicción de los tribunales situados en Buenos Aires, Argentina o
          donde corresponda.
        </p>
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
  );
};

export default SaprTermsConditions;
