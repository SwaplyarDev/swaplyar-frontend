'use client';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

interface ButtonBackProps {
  route?: string;
  isDark?: boolean;
  absolute?: boolean;
  className?: string;
  onClick?: () => void;
}

const ButtonBack: React.FC<ButtonBackProps> = ({
  route,
  isDark = false,
  absolute = false,
  className = '',
  onClick,
}) => {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={route ? () => router.push(route) : onClick}
      aria-label="Volver"
      className={`
        btn-back 
        ${isDark ? 'dark' : ''} 
        flex items-center justify-center
        border-none bg-transparent
        transition-all duration-200 ease-in-out
        outline-none cursor-pointer
        overflow-visible rounded-full
        ${absolute ? 'absolute top-[19.02px] left-[18.31px]' : 'mx-auto'}
        ${className}
        w-[38px] h-[38px] sm:w-[45px] sm:h-[45px] lg:w-[48px] lg:h-[48px]
      `}
    >
      <span className="flex items-center justify-center w-full h-full transform transition-transform duration-200 ease-in-out">
        <ChevronLeft
          className='rounded-full'
          color={isDark ? '#ebe7e0' : '#012c8a'}
          width={24}
          height={24}
          strokeWidth={2}
        />
      </span>
    </button>
  );
};

export default ButtonBack;
