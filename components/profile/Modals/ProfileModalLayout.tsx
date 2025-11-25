'use client';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import { Dialog, DialogContent } from '@mui/material';
import { ChevronLeft } from 'lucide-react';
import { ReactNode } from 'react';
import ButtonAuth from '@/components/auth/AuthButton';

type ProfileModalLayoutProps = {
  show: boolean;
  setShow: (show: boolean) => void;
  title: string;
  children: ReactNode;
  onSave?: () => Promise<void> | void;
  loading?: boolean;
  buttonDisabled?: boolean;
  showBackButton?: boolean;
  saveButtonLabel?: string;
  className?: string;
};

const ProfileModalLayout = ({
  show,
  setShow,
  title,
  children,
  onSave,
  loading = false,
  buttonDisabled = false,
  showBackButton = true,
  saveButtonLabel = 'Guardar',
  className = '',
}: ProfileModalLayoutProps) => {
  const { isDark } = useDarkTheme();

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
        <div className={`flex flex-col items-center text-center p-3 xs-phone:p-6 gap-8 ${className}`}>
          {/* Header */}
          <div className="relative w-full flex gap-3 items-center h-9 xs-phone:h-12">
            {showBackButton && (
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
            )}
            <h2 className="w-full text-center font-textFont text-custom-blue dark:text-custom-whiteD text-2xl xs-phone:text-4xl font-semibold">
              {title}
            </h2>
          </div>

          <div className='w-full'>
          {/* Content */}
          {children}

          {/* Footer - Save Button */}
          {onSave && (
            <div className="flex justify-center gap-4 pt-5 w-full">
              <ButtonAuth
                label={saveButtonLabel}
                isDark={isDark}
                onClick={onSave}
                disabled={buttonDisabled || loading}
                loading={loading}
                className="min-w-[194px]"
              />
            </div>
          )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileModalLayout;
