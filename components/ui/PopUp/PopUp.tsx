import Swal from 'sweetalert2';
import { IPopUpProps } from './types';
import ReactDOMServer from 'react-dom/server';
import { createRoot } from 'react-dom/client';
import Arrow from '../Arrow/Arrow';

export const PopUp = ({ icon, title, text, isDark }: IPopUpProps) => {
  Swal.fire({
    icon:
      icon === 'success'
        ? 'success'
        : icon === 'info'
          ? 'info'
          : icon === 'warning'
            ? 'warning'
            : icon === 'error'
              ? 'error'
              : undefined,
    html: ReactDOMServer.renderToString(
      <div>
        <div className="flex flex-col gap-3">
          <h2 className="font-textFont text-2xl font-medium dark:text-darkText">{title}</h2>
          <p className="font-textFont dark:text-darkText">{text}</p>
        </div>
        <div id="back-button-container" className="mt-5 flex items-center justify-center"></div>
      </div>,
    ),
    showConfirmButton: false,
    background: isDark ? '#252526' : '#ffffff',
    didRender: () => {
      const backElement = document.getElementById('back-button-container');
      if (backElement) {
        const root = createRoot(backElement);
        root.render(
          <button
            type="button"
            onClick={() => Swal.close()}
            className={`group relative m-1 flex h-[46px] min-w-[48px] max-w-[110px] items-center justify-center gap-2 rounded-3xl border border-buttonsLigth p-3 font-textFont text-lg font-light text-buttonsLigth hover:bg-transparent dark:border-darkText dark:text-darkText dark:hover:bg-transparent`}
          >
            <div className="relative h-5 w-5 overflow-hidden">
              <div className="absolute left-0 transition-all ease-in-out group-hover:left-1">
                <Arrow color={isDark ? '#ebe7e0' : '#012c8a'} />
              </div>
            </div>
            Volver
          </button>,
        );
      }
    },
  });
};

export default PopUp;
