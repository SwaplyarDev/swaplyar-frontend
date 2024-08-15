import {updateCurrentValueUSDToEUR, updateCurrentValueUSD} from '@/utils/currencyApis'


export default function ButtonTest() {
    const handleClick = async () => {
        await updateCurrentValueUSDToEUR();
        await updateCurrentValueUSD();
    };

    return (
        <button onClick={handleClick}>Click</button>

    )
}