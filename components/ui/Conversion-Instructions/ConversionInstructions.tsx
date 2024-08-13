import TransactionCalculator from "@/components/Transaction/TransactionCalculator/TransactionCalculator";

const ConversionInstructions = () => {
    return (
<div className="flex  flex-col md:flex-row justify-between items-center h-full  space-y-4 md:space-y-0  md:space-x-4 w-4/5 sm:w-4/5 md:w-4/5 mx-auto">
    <div className="conversion-instructions max-w-md ">
        <h2 className="text-5xl mb-4 text-gray-blue">Convertí y enviá tu dinero de PayPal a tu cuenta bancaria</h2>
        <ol className="list-decimal list  mt-7 md:ml-8">
            <li className="step mb-4">
                <h3 className="text-xl font-bold mb-0">¡Cotizá y solicitá!</h3>
                <p >Iniciá tu cambio consultando la cotización actual y hacenos saber cuánto deseas convertir.</p>
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

