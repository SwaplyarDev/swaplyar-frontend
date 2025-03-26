type IconsTabletProps = {
  children: React.ReactNode;
  text: string;
};

const IconsTablet: React.FC<IconsTabletProps> = ({ children, text }) => {
  return (
    <div className="flex items-center rounded-full border-8 border-white bg-nav-blue dark:border-black dark:bg-white">
      <p className="text-l mx-8 font-semibold text-white dark:text-black">{text}</p>
      {children}
    </div>
  );
};

export default IconsTablet;
