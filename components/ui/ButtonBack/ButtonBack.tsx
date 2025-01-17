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
  size = '150px',
  cancel = false,
}) => {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.push(route)}
      className={`${
        isDark ? 'buttonSecondDark' : 'buttonSecond'
      } group relative m-1 flex h-[48px] min-w-[48px] items-center justify-center gap-2 rounded-3xl border border-buttonsLigth p-3 text-buttonsLigth hover:bg-transparent dark:border-darkText dark:text-darkText dark:hover:bg-transparent xs:min-w-[${size}]`}
    >
      <div className="relative h-5 w-5 overflow-hidden">
        <div className="absolute left-0 transition-all ease-in-out group-hover:left-1">
          <Arrow color={isDark ? '#ebe7e0' : '#012c8a'} />
        </div>
      </div>
      {cancel ? <p>{label}</p> : <p className="hidden xs:inline-block">{label}</p>}
    </button>
  );
};

export default ButtonBack;
