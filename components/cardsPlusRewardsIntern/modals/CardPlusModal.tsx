import React, { useEffect } from 'react';

const CardPlusModal = ({ setShowModal }: { setShowModal: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const objectCard = [
    {
      cupon: ' $5 USD',
      date: '02 de Enero de 2025',
      type: 'Crédito de $5 USD aplicado en la siguiente transacción',
      dateUse: '26 de Enero 2025',
    },
    {
      cupon: ' $5 USD',
      date: '31 de Octubre de 2024',
      type: 'Crédito de $5 USD aplicado en la siguiente transacción',
      dateUse: '1 de Noviembre 2024',
    },
    {
      cupon: ' $5 USD',
      date: '30 de Agosto de 2024',
      type: 'Crédito de $5 USD aplicado en la siguiente transacción',
      dateUse: ' 5 de Septembrede 2024',
    },
    {
      cupon: ' $10 USD',
      date: '26 de agosto de 2024',
      type: 'Crédito de $10 USD aplicado en la siguiente transacción',
      dateUse: ' 2 de Septembrede 2024',
    },
  ];

  useEffect(() => {
    // Bloquea el scroll del body al montar
    window.scrollTo(0, 0);
    document.body.style.overflow = 'hidden';

    // Vuelve a activar el scroll al desmontar
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 font-textFont text-[16px]"
      onClick={() => setShowModal(false)}
    >
      <div
        className="relative mx-2 mt-2 h-[96%] max-h-[720px] w-full max-w-[896px] overflow-y-auto rounded-2xl bg-[#FFF] px-[9px] pt-[30px] dark:bg-[#4b4b4b] xs:px-[56px]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="dark:custom-whiteD-900 absolute right-0 top-0 mr-3 text-[32px]"
          onClick={() => {
            setShowModal(false);
          }}
        >
          x
        </button>
        <h1 className="mb-4 w-full text-center text-[32px] font-semibold text-lightText dark:text-darkText sm:text-[36px]">
          Más información sobre Plus Rewards
        </h1>
        <h3 className="text-lightText dark:text-darkText">
          Fecha de inscripción: <b className="text-[#012A8E] dark:text-darkText">14 jun 2020</b>
        </h3>
        <h3 className="text-lightText dark:text-darkText">
          Recompensas que obtuviste en nov:<b className="text-[#012A8E] dark:text-darkText"> 5</b>
        </h3>
        <h3 className="text-lightText dark:text-darkText">
          Recompensas que obtuviste en 2024:<b className="text-[#012A8E] dark:text-darkText"> 8</b>
        </h3>
        <h2 className="my-4 text-[21px] font-semibold text-lightText dark:text-darkText">Historial de Recompensas</h2>

        <section className="h-[54%] max-h-[450px] overflow-y-auto rounded-2xl border-2 border-[#012A8E] p-[10px] dark:border-darkText md:h-[54%] lg:h-full">
          {objectCard.map((elem, index) => (
            <div key={index} className="overflow-hidden">
              <p className="text-lightText dark:text-darkText">
                <b>Cupón de Fidelización: </b>
                {elem.cupon}
              </p>
              <p className="text-lightText dark:text-darkText">
                <b>Fecha de Emisión: </b>
                {elem.date}
              </p>
              <p className="text-lightText dark:text-darkText">
                <b>Tipo: </b>
                {elem.type}
              </p>
              <p className="mb-2 text-lightText dark:text-darkText">
                <b>Fecha de Uso: </b>
                {elem.dateUse}
              </p>
              {index !== objectCard.length - 1 && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="772"
                  height="2"
                  viewBox="0 0 772 2"
                  fill="none"
                  className="text-[#C2D4FF] dark:text-[#969696]"
                >
                  <path d="M1 1H771" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              )}
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default CardPlusModal;
