import { Size } from '@/types/repentance/repentance';

const ErrorIcon: React.FC<Size> = ({ size = 150, isDark }) => {
  return (
    <div
      className="relative"
      style={{
        width: `${size * 1.2}px`,
        height: `${size * 1.2}px`,
      }}
    >
      <div className={`absolute inset-0 rounded-full ${isDark ? 'bg-red-700' : 'bg-red-500'}`}></div>
      <div
        className={`absolute rounded-full ${isDark ? 'dark:bg-[#454545]' : 'bg-[#ffffff]'}`}
        style={{
          width: `${size * 1}px`,
          height: `${size * 1}px`,
          top: `${size * 0.1}px`,
          left: `${size * 0.1}px`,
        }}
      ></div>
      <div
        className={`absolute rounded-full ${isDark ? 'bg-red-700' : 'bg-red-500'}`}
        style={{
          width: `${size * 0.8}px`,
          height: `${size * 0.8}px`,
          top: `${size * 0.2}px`,
          left: `${size * 0.2}px`,
        }}
      ></div>
      <div
        className="absolute flex items-center justify-center font-bold text-white"
        style={{
          top: '45%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <h2 className="text-6xl">x</h2>
      </div>
    </div>
  );
};

export default ErrorIcon;
