import { Size } from "@/types/repentance/repentance";
import { Open_Sans } from "next/font/google";

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
        className={`absolute inset-0 rounded-full ${
          isDark ? "bg-red-700" : "bg-red-500"
        }`}
      ></div>
      <div
        className={`absolute rounded-full ${isDark ? 'dark:bg-[#454545]' :'bg-[#ffffff]'}`}
        style={{
          width: `${size * 1}px`,
          height: `${size * 1}px`,
          top: `${size * 0.10}px`,
          left: `${size * 0.10}px`,
        }}
      ></div>
      <div
        className={`absolute rounded-full ${
          isDark ? "bg-red-700" : "bg-red-500"
        }`}
        style={{
          width: `${size * 0.8}px`,
          height: `${size * 0.8}px`,
          top: `${size * 0.20}px`,
          left: `${size * 0.20}px`,
        }}
      ></div>
      <div
        className="absolute font-bold flex items-center justify-center text-white"
        style={{
          fontSize: `${size * 0.9}px`,
          top: "48%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <h2 className={` ${openSans.className}`}>!</h2>
        
      </div>
    </div>
  );
};

export default IncorrectIcon;