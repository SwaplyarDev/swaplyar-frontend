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
        className="relative mx-2 mt-2 h-[680px] w-full max-w-[896px] overflow-y-auto rounded-2xl bg-[#FFF] px-[9px] pt-[30px] xs:px-[56px]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute right-0 top-0 mr-3 text-[32px] dark:text-[#252526]"
          onClick={() => {
            setShowModal(false);
          }}
        >
          X
        </button>
        <h1 className="w-full pt-2 text-center text-[36px] font-normal">Más información sobre Plus Rewards</h1>
        <h3 className="">
          Fecha de inscripción: <b className="text-[#012A8E]">14 jun 2020</b>
        </h3>
        <h3 className="">
          Recompensas que obtuviste en nov:<b className="text-[#012A8E]"> 5</b>
        </h3>
        <h3 className="">
          Recompensas que obtuviste en 2024:<b className="text-[#012A8E]"> 8</b>
        </h3>
        <h2 className="my-4 text-[21px] font-normal dark:text-[#252526]">Historial de Recompensas</h2>

        <section className="mb-[23px] max-h-[370px] overflow-y-auto rounded-2xl border-2 border-[#012A8E] p-[10px] dark:border-[#252526]">
          {objectCard.map((elem, index) => (
            <div key={index} className="overflow-hidden">
              <p className="">
                <b>Cupón de Fidelización: </b>
                {elem.cupon}
              </p>
              <p className="dark:text-[#252526]">
                <b>Fecha de Emisión: </b>
                {elem.date}
              </p>
              <p className="dark:text-[#252526]">
                <b>Tipo: </b>
                {elem.type}
              </p>
              <p className="mb-2 dark:text-[#252526]">
                <b>Fecha de Uso: </b>
                {elem.dateUse}
              </p>
              {index !== objectCard.length - 1 && (
                <svg xmlns="http://www.w3.org/2000/svg" width="772" height="2" viewBox="0 0 772 2" fill="none">
                  <path d="M1 1H771" stroke="#C2D4FF" strokeWidth="2" strokeLinecap="round" />
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
