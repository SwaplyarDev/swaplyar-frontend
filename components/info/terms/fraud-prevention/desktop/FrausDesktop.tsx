import { mockTexts } from '../../../../../data/mockFraudPrev';

interface FraudDesktopProps {
  handleButtonClick: (arg: number) => void;
  selectedTextIndex: number;
  isAnimating: boolean;
}

const FraudDesktop: React.FC<FraudDesktopProps> = ({ selectedTextIndex, handleButtonClick, isAnimating }) => {
  return (
    <section
  className="
    flex w-full max-w-[1026px]
    flex-col gap-4
    transition-all duration-500 ease-in-out

    opacity-0 pointer-events-none scale-95
    md:opacity-100 md:pointer-events-auto md:scale-100

    lg:flex-row
  "
>
  {/* Columna izquierda – botones */}
  <article
    className="
      w-full flex flex-col items-start gap-4 text-2xl select-none
      transition-all duration-500 ease-in-out

      opacity-0 scale-95
      md:opacity-100 md:scale-100

      lg:w-[clamp(200px,25vw,388px)]
    "
  >
    {mockTexts.map((mock, key) => (
      <button
        key={key}
        className={`flex flex-row gap-2 font-normal ${
          selectedTextIndex === key
            ? 'scale-105 text-blue-800 decoration-blue-800 dark:text-[#EBE7E0] dark:decoration-[#EBE7E0]'
            : 'dark:text-[#e0dfdd] dark:decoration-[#e0dfdd]'
        } transition-all duration-150 hover:text-blue-800 hover:decoration-blue-800 dark:hover:decoration-[#97938d]`}
        onClick={() => handleButtonClick(key)}
      >
        <h3>{selectedTextIndex === key ? '|  ' : null}</h3>
        <h3
          className={`${
            selectedTextIndex === key ? 'underline' : 'decoration-transparent'
          }`}
        >
          {mock.button}
        </h3>
      </button>
    ))}
  </article>

  {/* Columna derecha – contenido */}
  <article
    className="
      w-full flex flex-col items-start gap-5 mx-auto
      transition-all duration-500 ease-in-out

      opacity-0 scale-95
      md:opacity-100 md:scale-100

      md:w-[clamp(400px,60vw,656px)]
      lg:w-[clamp(300px,50vw,592px)]
    "
  >
    <h2 className="w-full self-center border-t-0 lg:border-t-[1px] border-[#012A8E] p-2 text-start text-3xl font-normal dark:border-[#EBE7E0]">
      {mockTexts[selectedTextIndex]?.mainTitle}
    </h2>

    {selectedTextIndex !== null ? (
      <section
        className={`
          duration-500 max-w-[clamp(300px,80vw,538px)] shrink-0 self-end
          transition-all ease-in-out
          ${isAnimating ? 'max-h-0 opacity-0' : 'max-h-[100%] opacity-100'}
          flex flex-col gap-5 overflow-hidden rounded-2xl
          bg-[#EEEAE3] p-5 text-base dark:bg-[#4B4B4B]
        `}
      >
        {mockTexts[selectedTextIndex]?.items.map((it, index) => (
          <div key={index} className="flex flex-col gap-1">
            <p className="text-lg font-medium text-[#012A8E] dark:text-[#EBE7E0]">
              {it.title}
            </p>
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

            {it.list?.map((list, index) => (
              <p key={index}>* {list}</p>
            ))}
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
