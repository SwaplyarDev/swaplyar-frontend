import React from 'react';
import Image from 'next/image';

const GuaranteeSection = () => {
    return (
        <div className="rs-wrapper-v4 my-8 flex flex-col md:flex-row items-center md:items-start">
        <div className="container-text text-gray-900 dark:text-gray-100 md:mr-8">
            <h1>Garantizamos Tu Tranquilidad en Cada Transacción</h1>
            <p>
            En SwaplyAr, nos comprometemos a que cada cambio de divisas sea seguro
            y confiable. Con nuestra garantía de satisfacción, podés estar seguro
            de que tus operaciones se manejarán con la mayor eficiencia y cuidado.
            ¡Confiá en nosotros para una experiencia sin preocupaciones!
            </p>
        </div>
        <div className="flex-shrink-0">
            <Image
            className="hero-img"
            src="/images/Garantizamos.png"
            alt="¿Por Qué Elegir SwaplyAr para Tu Cambio de Divisas?"
            width={750}
            height={750}
            />
        </div>
        </div>
    );
};

export default GuaranteeSection;
