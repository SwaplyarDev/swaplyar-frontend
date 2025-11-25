'use client';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useProfileStore } from '@/store/useProfileStore';
import { useSession } from 'next-auth/react';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import { Dialog, DialogContent } from '@mui/material';
import { ChevronLeft } from 'lucide-react';
import ButtonAuth from '@/components/auth/AuthButton';
import ShortButton from '@/components/ui/NewButtons/ShortButton';

type CloseAccountModalProps = {
  show: boolean;
  setShow: (show: boolean) => void;
};

type FormData = {
  alias: string;
  country: string;
  department: string;
};

const CloseAccountModal = ({ show, setShow }: CloseAccountModalProps) => {
    const { isDark } = useDarkTheme();
  const { data: session, update } = useSession();
  const token = session?.accessToken;
  const { updateNickname, userProfile } = useProfileStore();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormData>({ mode: 'onChange' });

  useEffect(() => {
    setValue('alias', userProfile?.nickName || '');
  }, [setValue, userProfile?.nickName]);

  const onSubmit = async (data: FormData) => {
    try {
      if (!token) throw new Error("No access token available");
      setLoading(true);

      if (data.alias) {
        // Update profile via store
        await updateNickname(token, data.alias);

        // Update session
        if (session?.user) {
          await update({
            user: {
              ...session.user,
              profile: {
                ...session.user.profile,
                nickName: data.alias,
              },
            },
          });
        }
      }

      setShow(false);
    } catch (err) {
      console.error("Error al actualizar perfil:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={show}
      onClose={() => setShow(false)}
      PaperProps={{
        sx: {
          borderRadius: '16px',
          backgroundColor: isDark ? '#323232' : '#fffffb',
          color: isDark ? '#fff' : '#000',
          maxWidth: 556,
          minWidth: 358,
        },
      }}
    >
      <DialogContent className="!p-0">
        <div className={`flex flex-col items-center text-center p-3 xs-phone:p-6 gap-8`}>
          {/* Header */}
          <div className="relative w-full flex gap-3 items-center h-9 xs-phone:h-12">
              <button
                type="button"
                onClick={() => setShow(false)}
                className="btn-back items-center !absolute top-0 left-0 flex h-[38px] rounded-full hover:bg-transparent dark:text-darkText dark:bg-none"
              >
                <div className="relative size-8 overflow-hidden content-center">
                  <ChevronLeft
                    color={isDark ? '#ebe7e0' : '#252526'}
                    width={32}
                    height={32}
                    strokeWidth={2}
                    className="inline-block"
                  />
                </div>
              </button>
            <h2 className="w-full text-center font-textFont text-custom-blue dark:text-custom-whiteD text-2xl xs-phone:text-4xl font-semibold">
              ¿Estás seguro?
            </h2>
          </div>

          <div className='w-full'>

            <span>Lamentamos verte partir. El cierre de la cuenta es permanente y no se puede deshacer.</span>

            {/* Footer - Save Button */}
            <div className="flex flex-col justify-center items-center gap-4 pt-5 w-full">
              <ShortButton
                text='Mantener mi cuenta abierta'
                fondoOscuro
                onButtonClick={() => setShow(false)}
                className="min-w-[320px]"
              />
                <ButtonAuth
                label="Continuar con el cierre de la cuenta"
                variant='secondary'
                  isDark={isDark}
                  onClick={() => {}}
                  disabled={loading}
                  loading={loading}
                  className="min-w-[320px] !font-normal"
                />
              </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CloseAccountModal;