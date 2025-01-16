'use client';
import FlyerTrabajo from '@/components/FlyerTrabajo/FlyerTrabajo';
import { useMargins } from '@/context/MarginProvider';
import { ResponsiveMarginHook } from '@/hooks/ResponsiveMarginHook';
import { fraudPrevention } from '@/utils/assets/img-database';
import { mockLinks } from './mockFraudPrev';
import { mockTexts } from './mockFraudPrev';
import { useState } from 'react';

const FraudPrevention = () => {
  const [selectedTextIndex, setSelectedTextIndex] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const { margins } = useMargins();
  const currentMargin = ResponsiveMarginHook(margins);

  const handleButtonClick = (key: number) => {
    setIsAnimating(true);
    setTimeout(() => {
      setSelectedTextIndex(key);
      setIsAnimating(false);
    }, 300);
  };

  const renderButtons = (key: number, title: string) => (
    <button
      key={key}
      className={`flex flex-row gap-2 ${selectedTextIndex === key ? 'scale-105 text-blue-800 decoration-blue-800 dark:text-[#97938d] dark:decoration-[#97938d]' : 'dark:text-[#EBE7E0] dark:decoration-[#EBE7E0]'} transition-all duration-150 hover:text-blue-800 hover:decoration-blue-800 dark:hover:decoration-[#97938d]`}
      onClick={() => handleButtonClick(key)}
    >
      <p>{selectedTextIndex === key ? '|  ' : null}</p>

      <p className={` ${selectedTextIndex === key ? 'underline' : 'decoration-transparent'}`}>{title}</p>
    </button>
  );

  return (
    <main className="flex w-full flex-col items-center gap-10 pt-10">
      <h1 className="self-center text-2xl font-medium md:text-3xl lg:text-4xl">Concientización sobre el fraude</h1>
      <section style={{ margin: currentMargin }}>
        <section className="flex min-h-[100vh] max-w-[1050px] flex-col justify-items-start gap-20 lg:flex-row">
          <article className="flex select-none flex-col items-start gap-4 pt-5 text-xl lg:text-2xl">
            {renderButtons(0, 'Prevencion del fraude')}
            {renderButtons(1, 'Como protegerse del fraude')}
            {renderButtons(2, 'Estafas al cliente comunes')}
            {renderButtons(3, 'Otros recursos')}
          </article>
          <article className="flex flex-col gap-5">
            <h2 className="absolute justify-self-end border-blue-500 p-2 text-xl font-semibold dark:border-[#EBE7E0] md:text-2xl lg:border-t-[1px] lg:text-3xl">
              {mockTexts[selectedTextIndex]?.title}
            </h2>
            {selectedTextIndex !== null ? (
              <section
                className={`mt-12 shrink-0 self-end transition-all duration-300 ease-in-out md:max-w-[20rem] lg:max-w-[30rem] ${
                  isAnimating ? 'max-h-0 opacity-0' : 'max-h-[100%] opacity-100'
                } flex flex-col gap-5 overflow-hidden rounded-md bg-[#EEEAE3] p-5 text-sm dark:bg-[#4B4B4B] lg:text-base`}
              >
                <article className="flex flex-col gap-2">
                  <p>{mockTexts[selectedTextIndex]?.text1}</p>
                  <p>{mockTexts[selectedTextIndex]?.text2}</p>
                </article>
                <article className="flex flex-col gap-1">
                  {selectedTextIndex === 2
                    ? mockLinks.map((mock, index) => (
                        <a
                          key={index}
                          className="text-blue-600 underline decoration-blue-600 transition-all duration-150 hover:text-blue-800 hover:decoration-blue-800 dark:text-[#EBE7E0] dark:decoration-[#EBE7E0] dark:hover:decoration-[#97938d]"
                          href={mock.link}
                        >
                          {mock.text}
                        </a>
                      ))
                    : null}
                </article>

                <p>{mockTexts[selectedTextIndex]?.text3}</p>
              </section>
            ) : (
              <p>Selecciona una opción para ver más detalles.</p>
            )}
          </article>
        </section>
      </section>
      <div className="my-20 flex w-[100%] flex-row">
        <FlyerTrabajo imageSrc={fraudPrevention}>
          <> </>
        </FlyerTrabajo>
      </div>
    </main>
  );
};

export default FraudPrevention;
