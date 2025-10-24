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
      className={`${classname} items-center rounded-full bg-nav-blue lg:border-transparent dark:bg-[#EBE7E0] xs:flex xs:border-6 lg:w-[192px] h-[50px] bg-clip-padding`}
    >
      {children}
      <p className="lg:-ml-1 text-l hidden text-nowrap font-semibold leading-5 text-white dark:text-black xs:block">
        {text}
      </p>
    </div>
  );
};

export default IconsTablet;
