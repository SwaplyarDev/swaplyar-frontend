import useWindowWidth from '@/hooks/useWindowWidth';
import Link from 'next/link';

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
      className={`${classname} flex items-center rounded-full border-white bg-nav-blue dark:border-lightText dark:bg-white xs-mini-phone:border-6`}
    >
      {children}
      {!isMobile() ? <p className="text-l mr-5 font-semibold leading-5 text-white dark:text-black">{text}</p> : null}
    </div>
  );
};

export default IconsTablet;
