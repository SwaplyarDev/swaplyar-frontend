import TransactionCalculator from '@/components/Transaction/TransactionCalculator/TransactionCalculator';

const ConversionInstructions = () => {
    return (
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4 w-full max-w-7xl mx-auto px-4 py-8">
            <div className="conversion-instructions max-w-xl flex-1">
                <h2 className="text-3xl sm:text-5xl mb-4 text-gray-blue dark:text-white">
                    Convertí y enviá tu dinero de PayPal a tu cuenta bancaria
                </h2>
                <ol className="list-decimal mt-7 ml-4 text-gray-blue dark:text-white">
                    <li className="step mb-4">
                        <h3 className="text-xl font-bold mb-0 text-gray-blue dark:text-white">¡Cotizá y solicitá!</h3>
                        <p>Iniciá tu cambio consultando la cotización actual y hacenos saber cuánto deseas convertir.</p>
                    </li>
                    <li className="step mb-4">
                        <h3 className="text-xl font-bold mb-0 text-gray-blue dark:text-white">Seguí el Flujo.</h3>
                        <p>Te proporcionaremos instrucciones detalladas para proceder con tu envío de manera segura y eficiente.</p>
                    </li>
                    <li className="step mb-4">
                        <h3 className="text-xl font-bold mb-0 text-gray-blue dark:text-white">Recibí tu dinero.</h3>
                        <p>Concluí la operación recibiendo los pesos argentinos cotizados, directamente en tu cuenta.</p>
                    </li>
                </ol>
            </div>
            <div className="flex-1">
                <TransactionCalculator />
            </div>
        </div>
    );
}

export default ConversionInstructions;



