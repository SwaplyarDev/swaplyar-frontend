const apiKey = process.env.NEXT_PUBLIC_FREE_CURRENCY_APY_KEY;

//* Función para calcular precio del dolar/euro
export async function updateCurrentValueUSDToEUR() {
    try {
        const response = await fetch(`https://api.freecurrencyapi.com/v1/latest?apikey=${apiKey}`);
        const data = await response.json();
        let currentValueEURToUSD = 1 / data.data.EUR;
        let currentValueUSDToEUR = data.data.EUR;
        console.log(`con 1 euro compro ${currentValueEURToUSD} dolares`)
        console.log(`con 1 dolar compro ${currentValueUSDToEUR} euros`)
    } catch (error) {
        throw new Error('Network response was not ok');
    }    
}

//*Función para calcular precio de compra/venta dolar blue
export async function updateCurrentValueUSD() {
    try {
        const response = await fetch(`https://api.bluelytics.com.ar/v2/latest`);
        const data = await response.json();
        let currentValueUSDBlueSale = data.blue.value_sell;
        let currentValueUSDBluePurchase = data.blue.value_buy;
        console.log(`Dolar blue venta: ${currentValueUSDBlueSale}`)
        console.log(`Dolar blue compra: ${currentValueUSDBluePurchase}`)
    } catch (error) {
        throw new Error('Network response was not ok');
    }
}

//*Función para calcular precio de compra/venta euro blue
export async function updateCurrentValueEUR() {

}