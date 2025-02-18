'use client';
import howToUse from '@/public/images/howToUse.png';
import howToUseDark from '@/public/images/howToUseDark.png';
import clsx from 'clsx';
import { useDarkTheme } from '../theme-Provider/themeProvider';
import Image from 'next/image';
import { howToUseData, IHowToUse, IHowToUseListItem } from '@/data/howToUseData';
import AnimatedBlurredCircles from '../animations/AnimatedBlurredCircles';
import FlyerTrabajo from '@/components/FlyerTrabajo/FlyerTrabajo';
import { CentroDeAyuda } from '@/utils/assets/imgDatabaseCloudinary';
import Link from 'next/link';
import QuestionHowToUse from '../QuestionHowToUse/QuestionHowToUse';
import { FlyerGif } from '@/utils/assets/img-database';

export default function SwaplyArInstructions() {
  const { isDark } = useDarkTheme();

  return (
    <>
      <AnimatedBlurredCircles tope="0px" />
      <div className="mx-auto flex max-w-[1000px] flex-col items-center gap-20 px-4 py-10 md:px-8 lg2:px-4">
        <section className="flex max-w-[500px] flex-col gap-10 lg2:max-w-full lg2:flex-row lg2:items-center">
          <div className="flex flex-1 flex-col gap-4">
            <h1 className="font-titleFont text-[38px] font-medium lg2:text-[40px]">
              La Forma mas rapida y segura de Usar SwaplyAr
            </h1>
            <p className="font-textFont font-light">
              <strong className="font-semibold">SwaplyAr</strong> es la mejor opción para tus intercambios por su{' '}
              <strong className="font-semibold">rapidez, seguridad y simplicidad.</strong> Procesamos las transacciones{' '}
              <strong className="font-semibold">en menos de 5 minutos,</strong> garantizando la{' '}
              <strong className="font-semibold">protección de tus datos y fondos</strong> con sistemas de verificación
              seguros. Ofrecemos un{' '}
              <strong className="font-semibold">
                proceso transparente, múltiples métodos de pago y soporte en tiempo real
              </strong>{' '}
              para resolver cualquier duda, brindándote <strong className="font-semibold">confianza y comodidad</strong>{' '}
              en cada operación.
            </p>
            <Link
              href="/"
              className={clsx(
                'mx-auto mt-2 flex h-[42px] w-[280px] items-center justify-center rounded-3xl py-3 text-center font-titleFont font-semibold',
                isDark
                  ? 'buttonSecondDark hover:bg-relative border-darkText bg-darkText text-lightText'
                  : 'buttonSecond border border-buttonsLigth bg-buttonsLigth text-darkText hover:bg-buttonsLigth',
              )}
            >
              ¡Empieza ahora!
            </Link>
          </div>
          <Image
            className="w-full max-w-[500px] flex-1 drop-shadow-light dark:drop-shadow-darkmode"
            src={isDark ? howToUseDark : howToUse}
            alt="Imagen principal"
            priority
          />
        </section>
        <section className="flex w-full flex-col gap-4 rounded-2xl border border-buttonsLigth p-[10px] dark:border-darkText">
          <h2 className="text-center font-textFont text-4xl">Conocé los pasos a seguir para una solicitud exitosa</h2>
          <div className="flex flex-col gap-4 font-textFont font-light">
            <div>
              <p>
                <strong className="font-semibold">
                  <span className="text-xl">Paso 1:</span> Selecciona la billetera
                </strong>{' '}
                e ingresa el monto que deseas cambiar.
              </p>
              <p>
                <strong className="font-semibold">
                  <span className="text-xl">Paso 2:</span> Indica dónde quieres recibir el dinero
                </strong>{' '}
                y presiona "Procesar pago".
              </p>
              <p>
                <strong className="font-semibold">
                  <span className="text-xl">Paso 3:</span> Completa el formulario
                </strong>{' '}
                con los datos solicitados y adjunta el comprobante de transferencia.
              </p>
            </div>
            <div>
              <p className="text-lg font-normal">
                En pocos minutos, recibirás el dinero en la billetera o cuenta bancaria indicada.
              </p>
            </div>
          </div>
        </section>
        <section className="flex max-w-[800px] flex-col gap-10">
          {howToUseData.map((item: IHowToUse, i: number) => {
            const pair = i % 2 === 0;

            return (
              <div
                key={i}
                className={clsx('flex flex-col items-center gap-10', pair ? 'md:flex-row' : 'md:flex-row-reverse')}
              >
                <Image
                  className="w-full max-w-[390px] flex-1 drop-shadow-light dark:drop-shadow-darkmode"
                  src={isDark ? item.srcDark : item.src}
                  alt={item.title}
                  width={500}
                  height={500}
                  priority
                />
                <div className="flex flex-1 flex-col gap-4">
                  <h3 className="font-textFont text-[28px]">{item.title}</h3>
                  <div className="font-textFont font-light">
                    <p>
                      {item.text.includes('"Procesar Pago".') ? (
                        <>
                          {item.text.split('"Procesar Pago".')[0]}{' '}
                          <span className="font-semibold">"Procesar Pago".</span>
                        </>
                      ) : item.text.includes('5 minutos,') ? (
                        <>
                          {item.text.split('5 minutos,')[0]} <span className="font-semibold">5 minutos,</span>{' '}
                          {item.text.split('5 minutos,')[1]}
                        </>
                      ) : null}
                    </p>
                    {item.list && (
                      <div className="font-textFont font-light">
                        <p>{item.text}</p>
                        <ul>
                          {item.listItem?.map((item: IHowToUseListItem, i: number) => (
                            <li key={i} className="ml-7 list-disc">
                              {item.item.includes('Datos personales:') ? (
                                <>
                                  <span className="font-semibold">Datos personales:</span>
                                  {item.item.split('Datos personales:')[1]}
                                </>
                              ) : item.item.includes('Datos de destino:') ? (
                                <>
                                  <span className="font-semibold">Datos de destino:</span>
                                  {item.item.split('Datos de destino:')[1]}
                                </>
                              ) : item.item.includes('Pago:') ? (
                                <>
                                  <span className="font-semibold">Pago:</span>
                                  {item.item.split('Pago:')[1]}
                                </>
                              ) : null}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </section>
        <QuestionHowToUse />
      </div>
      <FlyerTrabajo
        href="/info/loyalty-program"
        description="¿Sabias que en SwaplyAr podes sumar descuentos con cada transacción?"
        nameButton="Unite a Plus Rewards"
        imageSrc={FlyerGif}
      />
    </>
  );
}
