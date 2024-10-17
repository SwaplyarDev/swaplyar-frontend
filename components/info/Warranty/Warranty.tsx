// /components/about-us/AboutUs.tsx
'use client';
import FlyerTrabajo from '@/components/FlyerTrabajo/FlyerTrabajo';
import InfoBlock from '@/components/InfoBlock/InfoBlock';
import CaedAboutUs from '@/components/ui/caed-about-us/caed-about-us';
import GuaranteeSection from '@/components/ui/warranty-section/WarrantySection';
import {
  Aumeno,
  Caida,
  CentroDeAyuda,
  Garantizamos,
  Transacciones,
  Ventajaalelegirswaplyar,
} from '@/utils/assets/imgDatabaseCloudinary';
import { useMargins } from '@/context/MarginProvider';
import { ResponsiveMarginHook } from '@/hooks/ResponsiveMarginHook';
import AnimatedBlurredCircles from '@/components/ui/animations/AnimatedBlurredCircles';
const cardsData = [
  {
    src: Transacciones,
    alt: 'Imagen de Apoyo',
    title: 'Transacciones',
    backTitle: 'Directas y Seguras',
    backText:
      'Asegurá que el dinero se mueva directamente de SwaplyAr al usuario, sin intermediarios, ofreciendo mayor rapidez y seguridad en cada transacción.',
  },
  {
    src: Aumeno,
    alt: 'Imagen de Transparencia',
    title: 'Aumento',
    backTitle: 'Aumento en la cotización',
    backText:
      'Al confirmar tu pago, fijamos la cotización. Si no recibís el dinero en 8 horas y hay aumento, ajustamos tu tasa.',
  },
  {
    src: Caida,
    alt: 'Imagen de Simplicidad',
    title: 'Caída',
    backTitle: 'Caída en la cotización',
    backText:
      'Confirmá tu pago, bloqueamos la cotización inicial. Si la cotización cae y no has recibido el dinero en 5 horas, mantenemos fijo el valor original.',
  },
];

const Warranty = () => {
  const { margins } = useMargins();
  const currentMargin = ResponsiveMarginHook(margins);

  return (
    <>
      <div className="relative flex w-full flex-col items-center justify-center gap-20 py-10">
        <AnimatedBlurredCircles tope="top-[-250px]" />
        <div
          className="rs-wrapper-v4 max-w-[1000px] flex-col items-center justify-center gap-12"
          style={{ margin: currentMargin }}
        >
          <GuaranteeSection
            title="Garantizamos Tu Tranquilidad en Cada Transacción"
            text="En SwaplyAr, nos comprometemos a que cada cambio de divisas sea seguro y confiable. Con nuestra garantía de satisfacción, podés estar seguro de que tus operaciones se manejarán con la mayor eficiencia y cuidado. ¡Confiá en nosotros para una experiencia sin preocupaciones!"
            imageSrc={Garantizamos}
            imageAlt="¿Por Qué Elegir SwaplyAr para Tu Cambio de Divisas?"
          />

          <section className="mx-auto mb-6 mt-12 w-full max-w-screen-md md:mb-24 md:mt-24">
            <CaedAboutUs cardsData={cardsData} />
          </section>

          <InfoBlock
            title="Ventajas Exclusivas al Elegir SwaplyAr para tus Transacciones"
            imageSrc={Ventajaalelegirswaplyar}
            imageAlt="Cambia USD de PayPal por ARS"
            contentNode={
              <>
                En SwaplyAr, no solo garantizamos total seguridad y atención
                personalizada durante cada transacción, sino que también
                ofrecemos beneficios adicionales. Para nuestros usuarios
                registrados, disponemos de promociones exclusivas y asumimos las
                comisiones por vos.
                <span
                  style={{
                    backgroundColor: 'yellow',
                    color: 'black',
                    marginTop: '1%',
                  }}
                >
                  Mientras que otros servicios pueden incluir una comisión de
                  PayPal del 5.6% + $0.30 USD, en SwaplyAr, nosotros absorbemos
                  esos costos para ofrecerte el mejor valor.
                </span>
              </>
            }
          />
          {/* <div id="flyer-container"></div> */}
          <footer>{/* <div id="footer-placeholder"></div> */}</footer>
        </div>
      </div>
    </>
  );
};

export default Warranty;
