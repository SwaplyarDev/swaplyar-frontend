import TransactionCalculator from "@/components/Transaction/TransactionCalculator/TransactionCalculator";

const ConversionInstructions = () => {
    return (
        <div className="flex justify-center items-center h-full w-full space-x-4">
            <div className="conversion-instructions max-w-md">
                <h2 className="text-2xl font-semibold mb-4">Estamos trabajando en las funciones de inicio de sesión y registro.</h2>
                <ol className="list-decimal list">
                    <li className="step mb-4">
                        <h3 className="text-xl font-bold mb-0">¡Cotizá y solicitá!</h3>
                        <p>Iniciá tu cambio consultando la cotización actual y hacenos saber cuánto deseas convertir.</p>
                    </li>

                    <li className="step mb-4">
                        <h3 className="text-xl font-bold mb-0">Seguí el Flujo.</h3>
                        <p>Te proporcionaremos instrucciones detalladas para proceder con tu envío de manera segura y eficiente.</p>
                    </li>

                    <li className="step mb-4">
                        <h3 className="text-xl font-bold mb-0">Recibí tu dinero.</h3>
                        <p>Concluí la operación recibiendo los pesos argentinos cotizados, directamente en tu cuenta.</p>
                    </li>
                </ol>
            </div>
            <TransactionCalculator />
        </div>
    );
}

export default ConversionInstructions;
