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

  const handleButtonClick = (key: number) => {
    setIsAnimating(true);
    setTimeout(() => {
      setSelectedTextIndex(key);
      setIsAnimating(false);
    }, 500);
  };

  const renderButtonsWithTexts = () =>
    mockTexts.map((item, key) => (
      <section key={key} className="flex w-[100%] flex-col items-start gap-2">
        {/* Botón */}
        <button
          className={`flex flex-row gap-2 text-xl sm:text-3xl md:text-3xl ${
            selectedTextIndex === key
              ? 'scale-105 text-blue-800 decoration-blue-800 dark:text-[#97938d] dark:decoration-[#97938d]'
              : 'dark:text-[#EBE7E0] dark:decoration-[#EBE7E0]'
          } transition-all duration-150 hover:text-blue-800 hover:decoration-blue-800 dark:hover:decoration-[#97938d]`}
          onClick={() => handleButtonClick(key)}
        >
          <p>{selectedTextIndex === key ? '|  ' : null}</p>
          <p className={`${selectedTextIndex === key ? 'underline' : 'decoration-transparent'}`}>{item.button}</p>
        </button>

        {/* Texto */}
        <section
          className={`mt-4 ${
            selectedTextIndex === key ? 'visible' : 'invisible max-h-0'
          } flex w-[100%] flex-col items-start gap-5 lg:hidden`}
        >
          <h2 className="w-[80%] self-end border-[#012A8E] p-2 text-start text-xl font-semibold dark:border-[#EBE7E0] xs:text-2xl sm:self-end sm:text-3xl md:text-4xl">
            {item.mainTitle}
          </h2>
          <article
            className={`max-w-[372px] shrink-0 self-end transition-all duration-500 ease-in-out md:max-w-[395px] ${
              isAnimating ? 'max-h-0 opacity-0 blur-xl' : 'max-h-[100%] opacity-100 blur-none'
            } flex flex-col gap-5 overflow-hidden rounded-2xl bg-[#EEEAE3] p-5 text-sm dark:bg-[#4B4B4B]`}
            style={{
              transitionProperty: 'max-height, opacity, filter',
              transitionDuration: '500ms',
              transitionTimingFunction: 'ease-in-out',
            }}
          >
            {item.items.map((it, index) => (
              <div key={index} className="flex flex-col gap-1">
                <h3 className="text-lg font-medium text-[#012A8E] dark:text-[#97938d]">{it.title}</h3>
                <p>{it.text}</p>
              </div>
            ))}
          </article>
        </section>
      </section>
    ));

  const renderButtonsLG = (key: number, title: string) => (
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
      <h1 className="self-center text-center text-3xl font-medium xs:text-2xl sm:text-3xl md:text-4xl lg:text-3xl">
        Concientización sobre el fraude
      </h1>

      <section className="flex min-h-[100vh] w-[80%] max-w-[60.375rem] flex-col gap-2 lg:flex-row lg:gap-20">
        {/* VERSION MOBILES */}
        <article className="flex select-none flex-col items-start gap-4 pt-5 lg:hidden">
          {renderButtonsWithTexts()}
        </article>
        {/* VERSION ESCRITORIO */}
        <article className="hidden w-[70%] select-none flex-col items-start gap-4 pt-5 text-2xl lg:flex">
          {renderButtonsLG(0, 'Prevencion del fraude')}
          {renderButtonsLG(1, 'Como protegerse del fraude')}
          {renderButtonsLG(2, 'Estafas al cliente comunes')}
          {renderButtonsLG(3, 'Otros recursos')}
        </article>
        <article className="hidden w-[100%] flex-col items-start gap-5 lg:flex">
          <h2 className="w-[100%] self-center border-t-[1px] border-[#012A8E] p-2 text-start text-3xl font-semibold dark:border-[#EBE7E0]">
            {mockTexts[selectedTextIndex]?.mainTitle}
          </h2>
          {selectedTextIndex !== null ? (
            <section
              className={`duration-5 00 max-w-[518px] shrink-0 self-end transition-all ease-in-out ${
                isAnimating ? 'max-h-0 opacity-0' : 'max-h-[100%] opacity-100'
              } flex flex-col gap-5 overflow-hidden rounded-md bg-[#EEEAE3] p-5 text-base dark:bg-[#4B4B4B]`}
            >
              {mockTexts[selectedTextIndex]?.items.map((it, index) => (
                <div key={index} className="flex flex-col gap-1">
                  <h3 className="text-lg font-medium text-[#012A8E] dark:text-[#97938d]">{it.title}</h3>
                  <p>{it.text}</p>
                </div>
              ))}
              <article className="flex flex-col gap-1">
                {selectedTextIndex === 3
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
            </section>
          ) : (
            <p>Selecciona una opción para ver más detalles.</p>
          )}
        </article>
      </section>
      <div className="my-20 w-[100%] bg-contain bg-center">
        <FlyerTrabajo imageSrc={fraudPrevention}>
          <> </>
        </FlyerTrabajo>
      </div>
    </main>
  );
};

export default FraudPrevention;
