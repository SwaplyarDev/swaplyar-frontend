const apiKey = process.env.NEXT_PUBLIC_FREE_CURRENCY_APY_KEY;

//* Función para calcular precio del dolar/euro
async function updateCurrentValueUSDToEUR() {
    try {
        const response = await fetch(`https://api.freecurrencyapi.com/v1/latest?apikey=${apiKey}`);
        const data = await response.json()
        let currentValueEURToUSD = 1 / data.data.EUR;
        let currentValueUSDToEUR = data.data.EUR;
        console.log("con 1 euro compro "+1 / data.data.EUR)
        console.log("con 1 dolar compro "+data.data.EUR)
    } catch (error) {
        throw new Error('Network response was not ok');
    }    
}



export default updateCurrentValueUSDToEUR;