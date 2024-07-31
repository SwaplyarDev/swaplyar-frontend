// /components/about-us/AboutUs.tsx

import FlyerTrabajo from "@/components/FlyerTrabajo/FlyerTrabajo";
import CaedAboutUs from "@/components/ui/caed-about-us/caed-about-us";
import GuaranteeSection from "@/components/ui/warranty-section/WarrantySection";
import Image from "next/image";
import Link from 'next/link';

const cardsData = [
    {
        src: '/images/Apoyo.png',
        alt: 'Imagen de Apoyo',
        title: 'Apoyo',
        backTitle: 'Apoyo Personalizado',
        backText:
        'En SwaplyAr, ofrecemos un equipo siempre dispuesto a resolver tus dudas, acompañándote paso a paso en cada transacción.',
    },
    {
        src: '/images/Transparencia.png',
        alt: 'Imagen de Transparencia',
        title: 'Transparencia',
        backTitle: 'Transparencia Total',
        backText:
        'La claridad es clave en SwaplyAr. No hay letras pequeñas; cada término del servicio es claro y directo para todos.',
    },
    {
        src: '/images/Simplicidad.png',
        alt: 'Imagen de Simplicidad',
        title: 'Simplicidad',
        backTitle: 'Simplicidad en Cada Paso',
        backText:
        'Nuestra plataforma está diseñada para ser intuitiva y fácil de usar, garantizando que cada usuario realice sus transacciones sin complicaciones.',
    },
    {
        src: '/images/Eficiencia.png',
        alt: 'Imagen de Eficiencia',
        title: 'Eficiencia',
        backTitle: 'Eficiencia en Cada Transacción',
        backText:
        'Garantizamos intercambios rápidos y precisos para que accedas a tus fondos sin demoras.',
    },
];


const Warranty = () => {
    return (
        <div className="py-10">
            <FlyerTrabajo
                imageSrc="/images/centro-ayuda.png"
            >
                Estamos trabajando en las funciones de inicio de sesión y registro.
            </FlyerTrabajo>
            <div className="rs-wrapper-v4 p-4">
                <GuaranteeSection/>

                <div className="cards-container flex-center full-height my-8">
                    <CaedAboutUs cardsData={cardsData} />
                    <div className="card">
                        <div className="face front">
                        <Image
                            src="/assets/images/transacciones.png"
                            alt="Imagen de Apoyo"
                            width={200}
                            height={200}
                        />
                        <h3>Transacciones</h3>
                        </div>
                        <div className="face back">
                        <h3>Directas y Seguras</h3>
                        <p>
                            Asegurá que el dinero se mueva directamente de SwaplyAr al usuario,
                            sin intermediarios, ofreciendo mayor rapidez y seguridad en cada
                            transacción.
                        </p>
                        </div>
                    </div>
                    <div className="card">
                        <div className="face front">
                        <Image
                            src="/assets/images/Aumeno.png"
                            alt="Imagen de Transparencia"
                            width={200}
                            height={200}
                        />
                        <h3>Aumento</h3>
                        </div>
                        <div className="face back">
                        <h3>Aumento en la cotización</h3>
                        <p>
                            Al confirmar tu pago, fijamos la cotización. Si no recibís el dinero
                            en 8 horas y hay aumento, ajustamos tu tasa.
                        </p>
                        </div>
                    </div>
                    <div className="card">
                        <div className="face front">
                        <Image
                            src="/assets/images/caida.png"
                            alt="Imagen de Simplicidad"
                            width={200}
                            height={200}
                        />
                        <h3>Caída</h3>
                        </div>
                        <div className="face back">
                        <h3>Caída en la cotización</h3>
                        <p>
                            Confirmá tu pago, bloqueamos la cotización inicial. Si la cotización
                            cae y no has recibido el dinero en 5 horas, mantenemos fijo el valor
                            original.
                        </p>
                        </div>
                    </div>
                </div>

                <div className="block-recommendation lazyload-user-social my-8">
                <div className="default-space-between-components">
                    <div className="rs-wrapper-v4 grid col1-sm col2">
                    <div className="info-image-container">
                        <Image
                        className="lazy-load info-block-img"
                        alt="El 90% de nuestros clientes recomienda SwaplyAr"
                        src="/assets/images/ventajaalelegirswaplyar.png"
                        width={750}
                        height={750}
                        />
                    </div>
                    <div className="info-content-container">
                        <h2 className="dark-title text-gray-900 dark:text-gray-100">
                        Ventajas Exclusivas al Elegir SwaplyAr para tus Transacciones
                        </h2>
                        <p className="text-gray-900 dark:text-gray-100">
                        En SwaplyAr, no solo garantizamos total seguridad y atención
                        personalizada durante cada transacción, sino que también ofrecemos
                        beneficios adicionales. Para nuestros usuarios registrados,
                        disponemos de promociones exclusivas y asumimos las comisiones por
                        vos.
                        <span className="bg-yellow-300 text-black">
                            Mientras que otros servicios pueden incluir una comisión de
                            PayPal del 5.6% + $0.30 USD, en SwaplyAr, nosotros absorbemos
                            esos costos para ofrecerte el mejor valor.
                        </span>
                        </p>
                    </div>
                    </div>
                </div>
                </div>
                
                <div id="flyer-container"></div>
                <footer>
                <div id="footer-placeholder"></div>
                </footer>
            </div>
        </div>
    );
}

export default Warranty;
