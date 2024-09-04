import {
  updateCurrentValueUSDToEUR,
  updateCurrentValueUSD,
  updateCurrentValueEUR,
} from '@/utils/currencyApis';

export default function ButtonTest() {
  const handleClick = async () => {
    await updateCurrentValueUSDToEUR();
    await updateCurrentValueUSD();
    await updateCurrentValueEUR();
  };

  return <button onClick={handleClick}>Click</button>;
}
