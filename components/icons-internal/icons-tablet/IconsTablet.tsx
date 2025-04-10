type IconsTabletProps = {
  children: React.ReactNode;
  text: string;
  classname?: string;
};

const IconsTablet: React.FC<IconsTabletProps> = ({ children, text, classname }) => {
  return (
    <div
      className={`${classname} items-center rounded-full border-white bg-nav-blue dark:border-lightText dark:bg-white xs:flex xs:border-6 lg:w-[180px]`}
    >
      {children}
      <p className="text-l hidden text-nowrap font-semibold leading-5 text-white dark:text-black xs:mr-5 xs:block">
        {text}
      </p>
    </div>
  );
};

export default IconsTablet;
