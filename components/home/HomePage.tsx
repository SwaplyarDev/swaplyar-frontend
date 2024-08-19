"use client";

import React, { useEffect, useState, useRef } from 'react';
import InfoBlock from '@/components/InfoBlock/InfoBlock';
import FlyerTrabajo from '@/components/FlyerTrabajo/FlyerTrabajo';
import ConversionInstructions from '../ui/Conversion-Instructions/ConversionInstructions';
import { CentroDeAyuda, FlyerGif, RecargaPaypal, UsdArs } from '@/utils/assets/img-database';
import AnimatedBlurredCircles from '../ui/animations/AnimatedBlurredCircles';

const mainStyles = {
    main: "py-10 relative",
    infoBlocksContainer: "flex flex-col items-center justify-center mt-32",  
    instructionsCalculatorContainer: "relative flex space-x-4 mt-32",  
};

export default function HomePage() {
    const [bannerHeight, setBannerHeight] = useState(0);
    const bannerRef = useRef<HTMLDivElement>(null);


    const calculateBannerHeight = () => {
        if (bannerRef.current) {
            setBannerHeight(bannerRef.current.offsetHeight);
        }
    };

    useEffect(() => {

        calculateBannerHeight();

        window.addEventListener('resize', calculateBannerHeight);

        return () => {
            window.removeEventListener('resize', calculateBannerHeight);
        };
    }, []);

    return (
        <main className={mainStyles.main}>
            <div className="shadow-custom-blue bg-white" ref={bannerRef}>
                <FlyerTrabajo imageSrc="/images/need-help.png">
                    Estamos trabajando en las funciones de inicio de sesión y registro.
                </FlyerTrabajo>
            </div>
            <AnimatedBlurredCircles topOffset={bannerHeight} />
            <div className={mainStyles.instructionsCalculatorContainer}>
               
                <ConversionInstructions />
            </div>

            <div className={mainStyles.infoBlocksContainer}>
                <InfoBlock
                    title="Cambia USD de PayPal por ARS con SwaplyAr"
                    imageSrc={UsdArs}
                    imageAlt="Cambia USD de PayPal por ARS"
                    content="Realizá cambios de dólares de PayPal a pesos argentinos..."
                />
                <InfoBlock
                    title="Necesitás recargar tu cuenta de PayPal en USD o EUR..."
                    imageSrc={RecargaPaypal}
                    imageAlt="Recarga PayPal"
                    content="Simplemente envianos un mensaje especificando la cantidad que necesitás..."
                />
            </div>

            <div className="mt-10">
                <FlyerTrabajo imageSrc={FlyerGif}>
                    ¿Nuevo en SwaplyAr? Haz clic en "Cómo usar SwaplyAr" y aprendé a operar fácilmente. ¡Empezá ahora!
<div>
<button
            id="bannerHTUButton"
            
          >
            <span>Como usar Swaplyar</span>
          </button>
</div>

                </FlyerTrabajo>
            </div>
        </main>
    );
}
