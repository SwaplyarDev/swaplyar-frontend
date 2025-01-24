import { mockTexts } from '../mockFraudPrev';

interface FraudDesktopProps {
  handleButtonClick: (arg: number) => void;
  selectedTextIndex: number;
  isAnimating: boolean;
}

const FraudDesktop: React.FC<FraudDesktopProps> = ({ selectedTextIndex, handleButtonClick, isAnimating }) => {
  return (
    <section className="hidden w-[100%] flex-row gap-20 lg:flex">
      <article className="hidden w-[80%] select-none flex-col items-start gap-4 pt-5 text-2xl lg:flex">
        {mockTexts.map((mock, key) => (
          <button
            key={key}
            className={`flex flex-row gap-2 ${selectedTextIndex === key ? 'scale-105 text-blue-800 decoration-blue-800 dark:text-[#97938d] dark:decoration-[#97938d]' : 'dark:text-[#EBE7E0] dark:decoration-[#EBE7E0]'} transition-all duration-150 hover:text-blue-800 hover:decoration-blue-800 dark:hover:decoration-[#97938d]`}
            onClick={() => handleButtonClick(key)}
          >
            <h3>{selectedTextIndex === key ? '|  ' : null}</h3>

            <h3 className={` ${selectedTextIndex === key ? 'underline' : 'decoration-transparent'}`}>{mock.button}</h3>
          </button>
        ))}
      </article>
      <article className="hidden w-[100%] flex-col items-start gap-5 lg:flex">
        <h2 className="w-[100%] self-center border-t-[1px] border-[#012A8E] p-2 text-start text-3xl font-semibold dark:border-[#EBE7E0]">
          {mockTexts[selectedTextIndex]?.mainTitle}
        </h2>
        {selectedTextIndex !== null ? (
          <section
            className={`duration-5 00 max-w-[518px] shrink-0 self-end transition-all ease-in-out ${
              isAnimating ? 'max-h-0 opacity-0' : 'max-h-[100%] opacity-100'
            } flex flex-col gap-5 overflow-hidden rounded-md bg-custom-whiteD-900 p-5 text-base dark:bg-custom-grayD-800`}
          >
            {mockTexts[selectedTextIndex]?.items.map((it, index) => (
              <div key={index} className="flex flex-col gap-1">
                <p className="text-lg font-medium text-[#012A8E] dark:text-[#97938d]">{it.title}</p>
                <p>{it.text}</p>
                {it.links?.map((link, index) => (
                  <a
                    key={index}
                    className="text-[#012A8E] underline decoration-[#012A8E] transition-all duration-150 hover:text-blue-800 hover:decoration-blue-800 dark:text-[#EBE7E0] dark:decoration-[#EBE7E0] dark:hover:decoration-[#97938d]"
                    href={link.link}
                  >
                    {link.text}
                  </a>
                ))}
                {it.list?.map((list, index) => <p key={index}>* {list}</p>)}
              </div>
            ))}
            <article className="flex flex-col gap-1"></article>
          </section>
        ) : (
          <p>Selecciona una opción para ver más detalles.</p>
        )}
      </article>
    </section>
  );
};

export default FraudDesktop;
