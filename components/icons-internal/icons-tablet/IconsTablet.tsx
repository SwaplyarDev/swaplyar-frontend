import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';

type IconsTabletProps = {
  children: React.ReactNode;
  text: string;
  classname?: string;
};

const IconsTablet: React.FC<IconsTabletProps> = ({ children, text, classname }) => {
  const isDark = useDarkTheme();

  return (
    <div
      className={`${classname} items-center rounded-full bg-nav-blue dark:border-lightText dark:bg-[#EBE7E0] xs:flex xs:border-6 lg:w-[180px]`}
    >
      {children}
      <p className="text-l hidden text-nowrap font-semibold leading-5 text-white dark:text-black xs:mr-5 xs:block">
        {text}
      </p>
    </div>
  );
};

export default IconsTablet;
