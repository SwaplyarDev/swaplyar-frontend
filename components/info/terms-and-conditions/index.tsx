import FlyerTrabajo from '@/components/FlyerTrabajo/FlyerTrabajo'
import Image from 'next/image'

const TermsAndConditions = () => {
    return (
        <div>
        <FlyerTrabajo imageSrc="/images/centro-ayuda.png">
            Estamos trabajando en las funciones de inicio de sesión y registro.
        </FlyerTrabajo>

        <div className="rs-wrapper-v4 my-8 flex flex-col md:flex-row items-center md:items-start">
            <div className="container-text text-gray-900 dark:text-gray-100 md:mr-8">
            <h1 className="text-3xl font-bold mb-6"> {/* Ajusta el tamaño del texto si es necesario */}
                Términos y Condiciones de Uso y Navegación del Sitio SwaplyAr
            </h1>
            </div>
            <div className="flex-shrink-0 md:w-1/2"> {/* Ajusta el ancho de la imagen en pantallas grandes */}
            <Image
                className="hero-img"
                src="/images/terminos-y-condiciones.png"
                alt="terminos-y-condiciones"
                width={750}
                height={750}
            />
            </div>
        </div>

        <div className="space-y-8">
            {/* Aquí puedes agregar el resto de los bloques de información */}
        </div>
        </div>
    )
}

export default TermsAndConditions