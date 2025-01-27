import { mockTexts } from '../mockFraudPrev';

interface FraudMobileProps {
  handleButtonClick: (arg: number) => void;
  selectedTextIndex: number;
  isAnimating: boolean;
}

const FraudMobile: React.FC<FraudMobileProps> = ({ selectedTextIndex, handleButtonClick, isAnimating }) =>
  mockTexts.map((item, key) => (
    <section
      key={key}
      id={`section-${key}`} // ID único para cada sección
      className="flex w-[100%] flex-col items-start gap-2 lg:hidden"
    >
      {/* Botón */}
      <button
        className={`flex select-none flex-row gap-2 text-xl font-extrabold ${
          selectedTextIndex === key
            ? 'scale-105 text-blue-800 decoration-blue-800 dark:text-[#EBE7E0] dark:decoration-[#EBE7E0]'
            : 'dark:text-[#EBE7E0] dark:decoration-[#EBE7E0]'
        } transition-all duration-150 hover:text-blue-800 hover:decoration-blue-800 dark:hover:decoration-[#EBE7E0]`}
        onClick={() => {
          handleButtonClick(key); // Manejador de evento actual
          const section = document.getElementById(`section-${key}`);
          !isAnimating ? section?.scrollIntoView({ behavior: 'smooth', block: 'start' }) : null; // Desplazamiento suave
        }}
      >
        <h3>{selectedTextIndex === key ? '|  ' : null}</h3>
        <h3 className={`${selectedTextIndex === key ? 'underline' : 'decoration-transparent'}`}>{item.button}</h3>
      </button>

      {/* Texto */}
      <section
        className={`mt-4 ${
          selectedTextIndex === key ? 'visible' : 'invisible max-h-0'
        } flex w-[100%] flex-col items-start gap-5 lg:hidden`}
      >
        <h2 className="w-[80%] self-end border-[#012A8E] p-2 text-start text-3xl font-semibold dark:border-[#EBE7E0]">
          {item.mainTitle}
        </h2>
        <article
          className={`max-w-[372px] shrink-0 self-end transition-all duration-500 ease-in-out md:max-w-[395px] ${
            isAnimating ? 'opacity-0 blur-xl' : 'opacity-100 blur-none'
          } flex flex-col gap-5 overflow-hidden rounded-2xl bg-[#EEEAE3] p-5 text-sm dark:bg-[#4B4B4B]`}
          style={{
            transitionProperty: 'max-height, opacity, filter',
            transitionDuration: '500ms',
            transitionTimingFunction: 'ease-in-out',
          }}
        >
          {item.items.map((it, index) => (
            <div key={index} className="flex flex-col gap-1">
              <h3 className="text-lg font-medium text-[#012A8E] dark:text-[#EBE7E0]">{it.title}</h3>
              <p>{it.text}</p>
              {it.links?.map((link, index) => (
                <a
                  key={index}
                  className="text-[#012A8E] underline decoration-[#012A8E] transition-all duration-150 hover:text-blue-800 hover:decoration-blue-800 dark:text-[#EBE7E0] dark:decoration-[#EBE7E0] dark:hover:decoration-[#EBE7E0]"
                  href={link.link}
                >
                  {link.text}
                </a>
              ))}
              {it.list?.map((list, index) => <p key={index}>* {list}</p>)}
            </div>
          ))}
        </article>
      </section>
    </section>
  ));

export default FraudMobile;
