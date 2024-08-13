import FlyerTrabajo from '@/components/FlyerTrabajo/FlyerTrabajo';
import InfoBlock from '@/components/InfoBlock/InfoBlock';
import GuaranteeSection from '@/components/ui/warranty-section/WarrantySection';
import {
  CentroDeAyuda,
  ElegirSwaplyAr,
  FlyerGif,
  LideresenCambio,
  Porqueelegirnos,
  SeguridadySatisfaccion,
} from '@/utils/assets/img-database';

const mainStyles = {
  main: 'py-10',
  infoBlocksContainer: 'flex flex-col items-center justify-center',
  instructionsCalculatorContainer: 'flex space-x-4',
};

const WhyChooseSwaplyar: React.FC = () => {
  return (
    <main className={mainStyles.main}>
      <FlyerTrabajo imageSrc={CentroDeAyuda}>
        Estamos trabajando en las funciones de inicio de sesión y registro.
      </FlyerTrabajo>

      <div className={mainStyles.instructionsCalculatorContainer}>
        <GuaranteeSection
          title="¿Por Qué Elegir SwaplyAr para Tu Cambio de Divisas?"
          imageSrc={ElegirSwaplyAr}
          imageAlt="¿Por Qué Elegir SwaplyAr para Tu Cambio de Divisas?"
          contentNode={
            <>
              <p>
                Si estás buscando seguridad y confiabilidad en el intercambio de
                tu dinero digital, SwaplyAr es tu mejor opción. Descubre por qué
                somos la elección preferida para cambiar divisas de PayPal, con
                las mejores tasas del mercado y una plataforma fácil de usar.
              </p>
            </>
          }
        />
      </div>

      <div className={mainStyles.infoBlocksContainer}>
        <InfoBlock
          title="¿Por qué elegirnos?"
          imageSrc={Porqueelegirnos}
          imageAlt="Cambia USD de PayPal por ARS"
          contentNode={
            <>
              <p>Las razones para elegirnos incluyen:</p>
              <ol className="ml-4 list-decimal">
                <li>Más rápido, más fácil y la mejor tasa del mercado.</li>
                <li>Los Pedidos son completados en menos de 1 hora.</li>
                <li>Soporte mediante Chat en WhatsApp.</li>
                <li>Seguridad.</li>
                <li>Actualización diaria con tasas competitivas.</li>
                <li>Descuentos para clientes activos.</li>
                <li>Servicio 24/7.</li>
              </ol>
            </>
          }
        />

        <InfoBlock
          title="SwaplyAr: Líderes en Cambio de Divisas de PayPal"
          imageSrc={LideresenCambio}
          imageAlt="Recarga PayPal"
          content="
                Orgullosos de ofrecer las mejores tasas del mercado, en SwaplyAr nos
                avalan más de 1,500 usuarios satisfechos. El 90% nos recomienda por
                nuestra plataforma segura y fácil de usar. Únete y maximiza tu dinero
                digital con confianza.
            "
        />

        <InfoBlock
          title="Tu Seguridad y Satisfacción Son Nuestra Prioridad en SwaplyAr"
          imageSrc={SeguridadySatisfaccion}
          imageAlt="Recarga PayPal"
          content="
                Con nosotros, tu dinero y tú están en manos seguras. Nuestro dedicado
                equipo de soporte al cliente está disponible en todo momento para
                asegurar que cualquier duda o inconveniente sea resuelto rápidamente,
                garantizando una experiencia sin estrés.
            "
        />
      </div>

      <div className="mt-10">
        <FlyerTrabajo imageSrc={FlyerGif}>
          &iquest;Nuevo en SwaplyAr? Hac&eacute; clic en &quot;C&oacute;mo usar
          SwaplyAr&quot; y aprend&eacute; a operar f&aacute;cilmente.
          &iexcl;Empez&aacute; ahora!
        </FlyerTrabajo>
      </div>
    </main>
  );
};

export default WhyChooseSwaplyar;
