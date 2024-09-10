import TransactionCalculator from '@/components/Transaction/TransactionCalculator/TransactionCalculator';

const ConversionInstructions = () => {
  return (
    <div className="lazyload-user-social mx-auto flex w-full max-w-7xl flex-col items-center justify-between space-y-4 px-4 py-8 md:flex-row md:space-x-4 md:space-y-0">
      <div className="steps flex flex-col items-start max-w-xl flex-1 pt-6 md:pt-8">
        <h2 className="text-4xl">
          Convertí y enviá tu dinero de PayPal a tu cuenta bancaria
        </h2>
        <div className="not-ssr mt-2">
          <div className="container-steps mt-2">
            {['1', '2', '3'].map((number, index) => (
              <div key={number} className="step flex items-center mb-4">
                <div className="relative flex items-center justify-center mr-2 w-fit h-6">
                  <div className="absolute rounded-full flex items-center justify-center">
                    <div className="bg-[#f9f9f9]  w-7 h-7 rounded-full text-black text-center text-lg rotate-[-33deg] flex items-center justify-center w-6 h-6 animate-rotate transition-all duration-300">
                      <span className="rotate-[33deg] text-[#001748]">{number}</span>
                    </div>
                  </div>
                  <div className="w-6 h-6 bg-[#012c8a] flex items-center justify-center rounded-full ring-0 border-0 shadow-none">
                    <span className="material-icons-outlined text-white animate-change-color delay-[900 * (index + 1)]">✔</span>
                  </div>
                </div>
                <p className="text-step mt-2">
                  <strong>
                    {index === 0 && '¡Cotizá y solicitá!'} 
                    {index === 1 && 'Seguí el Flujo.'} 
                    {index === 2 && 'Recibí tu dinero.'}
                  </strong> 
                  {index === 0 && ' Iniciá tu cambio consultando la cotización actual y hacenos saber cuánto deseas convertir.'}
                  {index === 1 && ' Te proporcionaremos instrucciones detalladas para proceder con tu envío de manera segura y eficiente.'}
                  {index === 2 && ' Concluí la operación recibiendo los pesos argentinos cotizados, directamente en tu cuenta.'}
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
