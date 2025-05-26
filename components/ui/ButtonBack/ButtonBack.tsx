import { useRouter } from 'next/navigation';
import Arrow from '../Arrow/Arrow';

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
      className={`group relative m-1 flex h-[46px] min-w-[48px] max-w-[100px] items-center justify-center gap-2 rounded-3xl border border-buttonsLigth p-3 font-textFont text-lg font-light text-buttonsLigth hover:bg-transparent dark:border-darkText dark:text-darkText dark:hover:bg-transparent`}
    >
      <div className="relative h-5 w-5 overflow-hidden">
        <div className="absolute left-0 transition-all ease-in-out group-hover:left-1">
          <Arrow color={isDark ? '#ebe7e0' : '#012c8a'} />
        </div>
      </div>
      Volver
    </button>
  );
};

export default ButtonBack;
