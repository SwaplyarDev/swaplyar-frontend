import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';

type SolicitudIconProps = {
  classname?: string;
};

const SolicitudIcon = ({ classname }: SolicitudIconProps) => {
  const { isDark } = useDarkTheme();

  return (
    <div className={`${classname}`}>
      <svg width="51" height="50" viewBox="0 0 51 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M33 13.75C33.9946 13.75 34.9484 14.1451 35.6517 14.8483C36.3549 15.5516 36.75 16.5054 36.75 17.5V20.1787C36.75 20.5962 36.75 20.805 36.6538 20.9575C36.6039 21.0368 36.5368 21.1039 36.4575 21.1538C36.305 21.25 36.0962 21.25 35.6787 21.25H29.25M33 13.75C32.0054 13.75 31.0516 14.1451 30.3483 14.8483C29.6451 15.5516 29.25 16.5054 29.25 17.5V21.25M33 13.75H19.25C16.8925 13.75 15.715 13.75 14.9825 14.4825C14.25 15.215 14.25 16.3925 14.25 18.75V36.25L18 35L21.75 36.25L25.5 35L29.25 36.25V21.25"
          stroke={`${isDark ? '#000000' : '#E5E7EB'}`}
          strokeWidth="2"
        ></path>
        <path
          d="M19.25 18.75H24.25M20.5 23.75H19.25M19.25 28.75H23"
          stroke={`${isDark ? '#000000' : '#E5E7EB'}`}
          strokeWidth="2"
          strokeLinecap="round"
        ></path>
      </svg>
    </div>
  );
};

export default SolicitudIcon;
