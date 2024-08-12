"use client";

import FlyerTrabajo from '@/components/FlyerTrabajo/FlyerTrabajo';
import ContactForm from '@/components/ui/contact-form/ContactForm';
import { Ayuda1, Ayuda2, CentroDeAyuda, Contacto, PlusRewardsGif } from '@/utils/assets/img-database';
import Image from 'next/image';
import Link from 'next/link';

const HelpCenterPage = () => {
    return (
    <div className="bg-white dark:bg-gray-900 text-black dark:text-white py-9">
        <FlyerTrabajo
            imageSrc={CentroDeAyuda}
        >
            Estamos trabajando en las funciones de inicio de sesión y registro.
        </FlyerTrabajo>
        <div className="p-4 space-y-8">
            <section className="rs-wrapper-v4 p-4">
                <h1 className="text-3xl font-bold">Bienvenido al Centro de Ayuda de SwaplyAr</h1>
                <h3 className="text-xl">Comunicate con nosotros y responderemos cualquier consulta que tengas</h3>
            </section>
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <ContactForm/>
                </div>
                <div className="flex justify-center items-center">
                    <Image src={Contacto} alt="Contáctanos" width={400} height={300} />
                </div>
            </section>
            <section className="rs-wrapper-v4 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex justify-center items-center">
                <Image src={PlusRewardsGif} alt="SwaplyAr Plus Rewards™" width={400} height={300} />
                </div>
                <div>
                    <h2 className="text-2xl font-bold">SwaplyAr Plus Rewards™ premia tu fidelidad, con el programa de fidelización</h2>
                    <h5 className="text-lg mt-4">
                        Obtené beneficios exclusivos cada vez que realices un cambio de divisas con SwaplyAr Plus Rewards™.
                    </h5>
                    <button
                        onClick={() => window.location.href='programa-de-fidelizacion'}
                        className="mt-4 p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Plus Rewards™
                    </button>
                </div>
            </section>
            <section className="rs-wrapper-v4 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="card-rawe p-4 bg-gray-200 dark:bg-gray-800 rounded">
                    <Image src={Ayuda1} alt="paso 1 de como cambiar tu dinero en SwaplyAr" width={210} height={150} />
                    <h3 className="text-xl font-bold">Chateá con nosotros</h3>
                    <p className="text-lg">
                        Comunicate con nuestro representante de Atención al Cliente para recibir ayuda.
                        <br />
                        <Link href="https://wa.me/+5491123832198" target="_blank" className="text-blue-600">WhatsApp</Link>.
                    </p>
                </div>
                <div className="card-rawe p-4 bg-gray-200 dark:bg-gray-800 rounded">
                    <Image src={Ayuda2} alt="paso 2 de como cambiar tu dinero en SwaplyAr" width={210} height={150} />
                    <h3 className="text-xl font-bold">Otro motivo...</h3>
                    <p className="text-lg">
                        Si necesitás contactarnos por otro motivo, simplemente envianos un email y atenderemos tu solicitud.
                        <br />
                        <Link href="mailto:centrodeayuda@swaplyar.com" target="_blank" className="text-blue-600">Email</Link>.
                    </p>
                </div>
            </section>
        </div>
        <div className="flex justify-center py-10">
            <FlyerTrabajo
                imageSrc={CentroDeAyuda}
            >
                <></>
            </FlyerTrabajo>
        </div>
    </div>
    );
};

export default HelpCenterPage;
