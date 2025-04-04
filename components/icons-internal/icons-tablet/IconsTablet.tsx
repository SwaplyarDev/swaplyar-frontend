type IconsTabletProps = {
  children: React.ReactNode;
  text: string;
  classname?: string;
};

const IconsTablet: React.FC<IconsTabletProps> = ({ children, text, classname }) => {
  return (
    <div
      className={`${classname} items-center rounded-full border-white bg-nav-blue dark:border-lightText dark:bg-white xs:flex sm:border-6 lg:w-[180px]`}
    >
      {children}
      <p className="text-l hidden text-nowrap font-semibold leading-5 text-white dark:text-black sm:block md:mr-5">
        {text}
      </p>
    </div>
  );
};

export default IconsTablet;
