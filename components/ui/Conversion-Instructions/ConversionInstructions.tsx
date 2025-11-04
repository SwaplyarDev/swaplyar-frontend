import Counter from '@/components/Counter/Counter';
import TransactionCalculator from '@/components/Transaction/TransactionCalculator/TransactionCalculator';

const ConversionInstructions = () => {
  return (
    <section className="flex w-full max-w-7xl items-center justify-between gap-4 space-y-4 py-0 flex-col lg:flex-row lg:space-x-4 lg:space-y-0 lg:py-5 px-[57px] sm:px-[57px] lg:px-0">
      <article className="steps flex w-full max-w-[358px] sm:max-w-[590px] flex-1 flex-col items-start pt-6 md:pt-8 lg:max-w-[590px]">
        <h1 className="font-titleFont text-[38px]/[120%] font-medium text-custom-grayD dark:text-darkText lg:text-[40px]/[120%]">
          Envía y recibe dinero de billeteras virtuales y criptomonedas
        </h1>
        <Counter />
        <p className="font-textFont text-2xl text-custom-grayD dark:text-darkText">
          <span className="font-bold">operaciones realizadas con éxito</span> respaldan nuestra eficiencia y seguridad.
        </p>
      </article>
      <aside className="flex-1">
        <TransactionCalculator />
      </aside>
    </section>
  );
};

export default ConversionInstructions;
