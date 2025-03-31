import useWindowWidth from '@/hooks/useWindowWidth';

type IconsTabletProps = {
  children: React.ReactNode;
  text: string;
  classname?: string;
};

const IconsTablet: React.FC<IconsTabletProps> = ({ children, text, classname }) => {
  const windowWidth = useWindowWidth();
  const isMobile = () => (windowWidth >= 390 ? false : true);

  return (
    <div
      className={`${classname} flex items-center rounded-full border-8 border-white bg-nav-blue dark:border-lightText dark:bg-white`}
    >
      {children}
      {!isMobile() ? <p className="text-l mr-5 font-semibold leading-5 text-white dark:text-black">{text}</p> : null}
    </div>
  );
};

export default IconsTablet;
