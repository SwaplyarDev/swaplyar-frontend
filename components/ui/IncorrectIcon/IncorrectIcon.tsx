import { Size } from '@/types/repentance/repentance';
import { Open_Sans } from 'next/font/google';

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  display: 'swap',
});
const IncorrectIcon: React.FC<Size> = ({ size = 150, isDark }) => {
  return (
    <div
      className="relative"
      style={{
        width: `${size * 1.2}px`,
        height: `${size * 1.2}px`,
      }}
    >
      <div
        className={`absolute inset-0 rounded-full`}
        style={{
          backgroundColor: isDark ? '#a31c01' : '#d50102', // Cambié el color a backgroundColor
        }}
      ></div>
      <div
        className={`absolute rounded-full`}
        style={{
          backgroundColor: isDark ? '#454545' : '#ffffff', // También aquí
          width: `${size * 1}px`,
          height: `${size * 1}px`,
          top: `${size * 0.1}px`,
          left: `${size * 0.1}px`,
        }}
      ></div>
      <div
        className={`absolute rounded-full`}
        style={{
          backgroundColor: isDark ? '#a31c01' : '#d50102', // Y aquí también
          width: `${size * 0.8}px`,
          height: `${size * 0.8}px`,
          top: `${size * 0.2}px`,
          left: `${size * 0.2}px`,
        }}
      ></div>

      <div
        className="absolute flex items-center justify-center font-bold text-white"
        style={{
          fontSize: `${size * 0.9}px`,
          top: '48%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <h2 className={` ${openSans.className}`}>!</h2>
      </div>
    </div>
  );
};

export default IncorrectIcon;
