import TransactionCalculator from '@/components/Transaction/TransactionCalculator/TransactionCalculator';

const ConversionInstructions = () => {
  return (
    <div className="lazyload-user-social flex w-full max-w-7xl flex-col-reverse md:flex-col items-center justify-between gap-4 space-y-4 py-8 lg-tablet:flex-row lg-tablet:space-x-4 lg-tablet:space-y-0">
      <div className="steps flex max-w-xl flex-1 flex-col items-start pt-6 lg-tablet:pt-8">
        <h2 className="text-4xl">
          Convertí y enviá tu dinero de PayPal a tu cuenta bancaria
        </h2>
        <div className="not-ssr mt-2">
          <div className="container-steps mt-2">
            {['1', '2', '3'].map((number, index) => (
              <div key={number} className="step mb-4 flex items-center">
                <div className="relative mr-2 flex h-6 w-fit items-center justify-center">
                  <div className="absolute flex items-center justify-center rounded-full">
                    <div className="flex h-7 w-7 rotate-[-33deg] animate-rotate items-center justify-center rounded-full bg-[#f9f9f9] text-center text-lg text-black transition-all duration-300">
                      <span className="rotate-[33deg] text-[#001748]">
                        {number}
                      </span>
                    </div>
                  </div>
                  <div className="flex h-6 w-6 items-center justify-center rounded-full border-0 bg-[#012c8a] shadow-none ring-0">
                    <span className="material-icons-outlined delay-[900 * (index + 1)] animate-change-color text-white">
                      ✔
                    </span>
                  </div>
                </div>
                <p className="text-step mt-2">
                  <strong>
                    {index === 0 && '¡Cotizá y solicitá!'}
                    {index === 1 && 'Seguí el Flujo.'}
                    {index === 2 && 'Recibí tu dinero.'}
                  </strong>
                  {index === 0 &&
                    ' Iniciá tu cambio consultando la cotización actual y hacenos saber cuánto deseas convertir.'}
                  {index === 1 &&
                    ' Te proporcionaremos instrucciones detalladas para proceder con tu envío de manera segura y eficiente.'}
                  {index === 2 &&
                    ' Concluí la operación recibiendo los pesos argentinos cotizados, directamente en tu cuenta.'}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex-1">
        <TransactionCalculator />
      </div>
    </div>
  );
};

export default ConversionInstructions;
