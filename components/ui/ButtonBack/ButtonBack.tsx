import { useRouter } from 'next/navigation';
import Arrow from '../Arrow/Arrow';
import { ChevronLeft } from 'lucide-react';

interface ButtonBackProps {
  route: string;
  isDark?: boolean;
  label?: string;
  size?: string;
  cancel?: boolean;
}

const ButtonBack: React.FC<ButtonBackProps> = ({
  route,
  isDark = false,
  label = 'Volver',
  size = '100px',
  cancel = false,
}) => {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={() => router.push(route)}
      className={`group relative m-1 flex h-[42px] min-w-[48px] max-w-[100px] items-center justify-center gap-2 xs:rounded-3xl xs:border xs:border-buttonsLigth button-back-gradient-border xs:p-3 xs:ps-2 font-textFont text-lg font-light text-buttonsLigth hover:bg-transparent xs:dark:border-darkText dark:text-darkText dark:bg-none dark:border-white dark:hover:bg-transparent`}
    >
      <div className="relative size-8 overflow-hidden">
        <div className="absolute -left-[2px] transition-all ease-in-out group-hover:left-2">
          <ChevronLeft color={isDark ? '#ebe7e0' : '#012c8a'} width={32} height={32} strokeWidth={2} className='inline-block xs:hidden absolute left-[2px]' />
          <Arrow color={isDark ? '#ebe7e0' : '#012c8a'} className="hidden xs:inline-block" />
        </div>
      </div>
      <span className="hidden xs:inline-block">
        Volver
      </span>
    </button>
  );
};

export default ButtonBack;
