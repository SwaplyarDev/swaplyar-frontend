import LoadingGif from "@/components/ui/LoadingGif/LoadingGif";
import { useDarkTheme } from "@/components/ui/theme-Provider/themeProvider";
import clsx from "clsx";
import { MdOutlineClose } from "react-icons/md"
interface DeletePictureModalProps {
  setShow: (show: boolean) => void;
  removeImage: () => void;
  loading: boolean
}
export const DeletePictureModal = ({ setShow, removeImage, loading }: DeletePictureModalProps) => {
  const { isDark } = useDarkTheme();
  return (
    <section className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <div className="relative flex w-full max-w-md flex-col rounded-xl bg-white p-5  shadow-lg dark:bg-zinc-800 text-black dark:text-white sm:max-w-lg md:max-w-xl lg:max-w-xl">
        <button
          type="button"
          onClick={() => setShow(false)}
          className="absolute top-3 right-3 text-2xl"
        >
          <MdOutlineClose />
        </button>
        <div>

          <h2 className="mb-4 w-full text-start text-lg sm:text-xl font-semibold">
            Borrar foto de perfil
          </h2>
          <span className="text-center">¿Seguro que quieres eliminar la foto de perfil?</span>
          <div className="mt-6 flex flex-row-reverse justify-between gap-4">
            {loading ? (
              <div className="w-[174px] h-[48px] flex justify-center ">

                <LoadingGif color={isDark ? '#ebe7e0' : '#012c8a'} size="40px" />
              </div>
            ) : (
              <button
                type="submit"
                onClick={() => removeImage()}
                className={clsx(
                  loading
                    ? 'border-disabledButtonsLigth bg-disabledButtonsLigth dark:border-disabledButtonsDark dark:bg-disabledButtonsDark dark:text-darkText'
                    : isDark
                      ? 'buttonSecondDark dark:text-lightText'
                      : 'buttonSecond',
                  'relative w-[140px] h-[35px] lg:w-[174px] lg:h-[48px] items-center justify-center rounded-3xl border border-buttonsLigth bg-buttonsLigth text-[16px]  py-[6px] px-[14px] lg:py-[12px] font-titleFont font-semibold text-darkText transition-opacity hover:opacity-90 disabled:opacity-50 dark:border-darkText dark:bg-disabledButtonsDark dark:text-darkText'
                )}
              >
                Eliminar
              </button>
            )}
            <button
              type="submit"
              disabled={loading}
              onClick={() => setShow(false)}
              className={clsx(
                loading
                  ? 'border-disabledButtonsLigth  dark:border-disabledButtonsDark  dark:text-darkText'
                  : isDark
                    ? 'buttonSecondDark dark:text-lightText'
                    : 'buttonSecond',
                'relative w-[140px] h-[35px] lg:w-[174px] lg:h-[48px] items-center justify-center rounded-3xl border border-buttonsLigth  text-[16px] py-[6px] px-[14px] lg:py-[12px] font-titleFont font-semibold  transition-opacity hover:opacity-90 disabled:opacity-50 dark:border-darkText dark:bg-disabledButtonsDark dark:text-darkText'
              )}
            >
              Cancelar
            </button>
          </div>


        </div>
      </div>

    </section>
  )
}
