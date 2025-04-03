import useWindowWidth from '@/hooks/useWindowWidth';
import Link from 'next/link';

type IconsTabletProps = {
  children: React.ReactNode;
  text: string;
  classname?: string;
};

const IconsTablet: React.FC<IconsTabletProps> = ({ children, text, classname }) => {
  const windowWidth = useWindowWidth();
  const isMobile = () => (windowWidth >= 480 ? false : true);
  return (
    <div
      className={`${classname} xs-mini-phone: flex items-center rounded-full border-white bg-nav-blue dark:border-lightText dark:bg-white xs-mini-phone:border-6`}
    >
      {!isMobile() ? (
        <p className="text-l text-nowrap pl-4 font-semibold leading-5 text-white dark:text-black md:mr-5">{text}</p>
      ) : null}
      {children}
    </div>
  );
};

export default IconsTablet;
