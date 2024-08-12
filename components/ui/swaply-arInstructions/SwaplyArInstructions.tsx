// /components/ui/swaply-arInstructions/SwaplyArInstructions.tsx

"use client";

import FlyerTrabajo from '@/components/FlyerTrabajo/FlyerTrabajo'; // Asegúrate de tener este componente
import InfoBlock from '@/components/InfoBlock/InfoBlock';
import { CentroDeAyuda, Paso1Gif, Paso2Gif, Paso3Gif, Paso4Gif } from '@/utils/assets/img-database';



export default function SwaplyArInstructions() {
    return (
        <div  className="py-10">
            <FlyerTrabajo
                imageSrc={CentroDeAyuda}
            >
                Estamos trabajando en las funciones de inicio de sesión y registro.
            </FlyerTrabajo>


            <div className="text-center ">
                <div className="container-text">
                    <h1 className='text-4xl'>El Cómo para Operar en SwaplyAr</h1>
                    <h3 className='text-2xl'>Seguí estos 4 sencillos pasos para realizar una operación exitosa:</h3>
                    <p >
                        <span style={{ backgroundColor: 'yellow', color: 'black' }}>
                        Ejemplo Ilustrativo: En este caso se utilizó un ejemplo de 100 USD.
                        Los datos presentados son ficticios.
                        </span>
                    </p>
                </div>
            </div>
            <div className="flex flex-col items-center text-2xl">
                <InfoBlock
                    title="Paso 1:"
                    imageSrc={Paso1Gif}
                    imageAlt="Cambia USD de PayPal por ARS"
                    content="Ingresá el monto que querés cambiar o el dinero que deseás
                        recibir y hacé clic en 'Ir a PayPal'."
                />
                <InfoBlock
                    title="Paso 2:"
                    imageSrc={Paso2Gif}
                    imageAlt="Cambia USD de PayPal por ARS"
                    content="Se abrirá una nueva pestaña para que realices el pago con el
                        monto correspondiente. Completá el pago y tomá una captura de
                        pantalla del comprobante."
                />
                <InfoBlock
                    title="Paso 3:"
                    imageSrc={Paso3Gif}
                    imageAlt="Cambia USD de PayPal por ARS"
                    content="Volvé a la ventana de SwaplyAr, donde se actualizará y aparecerá
                        un formulario."
                />
                <InfoBlock
                    title="Paso 4:"
                    imageSrc={Paso4Gif}
                    imageAlt="Cambia USD de PayPal por ARS"
                    content="Completá el formulario con los datos requeridos, subí la captura
                        de pantalla del comprobante de pago y presioná 'Enviar
                        solicitud'. ¡Listo!"
                />
            </div>
            <div className="paso-a-paso">
                <div className="container-text">
                <h1>En menos de 5 minutos, tu depósito será procesado.</h1>
                </div>
            </div>
        </div>
    );
}
