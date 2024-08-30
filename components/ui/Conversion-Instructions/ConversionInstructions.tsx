import TransactionCalculator from '@/components/Transaction/TransactionCalculator/TransactionCalculator';

const ConversionInstructions = () => {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between space-y-4 px-4 py-8 md:flex-row md:space-x-4 md:space-y-0">
      <div className="conversion-instructions max-w-xl flex-1">
        <h2 className="mb-4 text-3xl text-gray-blue dark:text-white sm:text-5xl">
          Convertí y enviá tu dinero de PayPal a tu cuenta bancaria
        </h2>
        <ol className="ml-4 mt-7 list-decimal text-gray-blue dark:text-white">
          <li className="step mb-4">
            <h3 className="mb-0 text-xl font-bold text-gray-blue dark:text-white">
              ¡Cotizá y solicitá!
            </h3>
            <p>
              Iniciá tu cambio consultando la cotización actual y hacenos saber
              cuánto deseas convertir.
            </p>
          </li>
          <li className="step mb-4">
            <h3 className="mb-0 text-xl font-bold text-gray-blue dark:text-white">
              Seguí el Flujo.
            </h3>
            <p>
              Te proporcionaremos instrucciones detalladas para proceder con tu
              envío de manera segura y eficiente.
            </p>
          </li>
          <li className="step mb-4">
            <h3 className="mb-0 text-xl font-bold text-gray-blue dark:text-white">
              Recibí tu dinero.
            </h3>
            <p>
              Concluí la operación recibiendo los pesos argentinos cotizados,
              directamente en tu cuenta.
            </p>
          </li>
        </ol>
      </div>
      <div className="flex-1">
        <TransactionCalculator />
      </div>
    </div>
  );
};

export default ConversionInstructions;
