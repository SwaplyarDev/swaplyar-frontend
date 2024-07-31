// /components/ui/caed-about-us/CaedAboutUs.tsx

import Image from 'next/image';
import './CaedAboutUs.css';

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

const CaedAboutUs = () => {
    return (
        <div className="cards-container flex justify-center items-center h-full">
            {cardsData.map((card, index) => (
                <div key={index} className="card w-60 h-80 relative m-4">
                <div className="card-inner w-full h-full transition-transform transform-style preserve-3d duration-700">
                    <div className="card-front absolute w-full h-full bg-white dark:bg-gray-800 text-black dark:text-white backface-hidden flex flex-col items-center justify-center p-4 rounded-lg shadow-lg">
                    <Image 
                        src={card.src} 
                        alt={card.alt} 
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg"
                    />
                    <h3 className="text-xl mt-2 absolute bottom-4 left-4 bg-opacity-75 bg-black text-white p-2 rounded">{card.title}</h3>
                    </div>
                    <div className="card-back absolute w-full h-full bg-white dark:bg-gray-800 text-black dark:text-white backface-hidden transform rotate-y-180 flex flex-col items-center justify-center p-4 rounded-lg shadow-lg">
                    <h3 className="text-xl">{card.backTitle}</h3>
                    <p className="mt-2">{card.backText}</p>
                    </div>
                </div>
                </div>
            ))}
        </div>
    );
};

export default CaedAboutUs;
