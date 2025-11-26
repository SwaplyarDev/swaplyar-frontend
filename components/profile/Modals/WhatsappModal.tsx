

'use client';
import SelectCountry from '@/components/request/form/inputs/SelectCountry';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useProfileStore } from '@/store/useProfileStore';
import { CountryOption } from '@/types/request/request';
import { useSession } from 'next-auth/react';
import { validatePhoneNumber } from '@/utils/validatePhoneNumber';
import { Dialog, DialogContent } from '@mui/material';
import CustomInput from '@/components/ui/Input/CustomInput';
import { defaultCountryOptions } from '@/utils/defaultCountryOptions';
import ButtonAuth from '@/components/auth/AuthButton';
import { ChevronLeft } from 'lucide-react';

interface WhatsappVerificationProps {
  show: boolean;
  setShow: (arg: boolean) => void;
  onVerificationSuccess: () => void;
}

interface FormData {
  phone: string;
  calling_code: CountryOption | undefined;
}

const WhatsappModal = ({ show, setShow, onVerificationSuccess }: WhatsappVerificationProps) => {
  const { isDark } = useDarkTheme();
  const { data: session, update } = useSession();
  const { phone, updatePhone: updatePhoneStore } = useProfileStore();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    watch,
    trigger,
  } = useForm<FormData>({ mode: 'onChange' });

  useEffect(() => {
    setValue('phone', phone);
  }, [setValue, phone]);

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: FormData) => {
    if (!session?.accessToken) return;
    setLoading(true);

    try {
      const phoneWithPrefix = `${data.calling_code?.callingCode || ''}${' ' + data.phone}`;

      // Use store action to update phone
      await updatePhoneStore(session.accessToken, phoneWithPrefix);

      if (session.user) {
        await update({
          user: {
            ...session.user,
            profile: {
              ...session.user.profile,
              phone: phoneWithPrefix,
            },
          },
        });
      }

      onVerificationSuccess();
    } catch (err) {
      console.error('❌ Error al actualizar teléfono:', err);
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
        <div className="flex h-full flex-col items-center p-3 xs-phone:p-6 gap-8 text-center">
          <h2 className="w-full text-center font-textFont text-custom-blue dark:text-custom-whiteD text-2xl xs-phone:text-4xl font-semibold">
            WhatsApp
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="relative w-full flex flex-col gap-6">
            <Controller
              name="calling_code"
              control={control}
              defaultValue={defaultCountryOptions.find((option) => option.callingCode === '+54')}
              rules={{ validate: () => true }}
              render={({ field, fieldState }) => (
                <CustomInput
                  label="Teléfono"
                  type="tel"
                  name="phone"
                  register={register}
                  value={watch('phone')}
                  defaultValue=""
                  validation={{
                    validate: (value: string) => {
                      if (!value) return 'El número de teléfono es obligatorio';
                      const result = validatePhoneNumber(value, field.value);
                      return result === true ? true : result;
                    },
                  }}
                  error={errors.phone?.message}
                >
                  <SelectCountry
                    selectedCodeCountry={field.value}
                    setSelectedCodeCountry={(option) => {
                      field.onChange(option);
                      trigger('phone');
                    }}
                    errors={fieldState.error ? { [field.name]: fieldState.error } : {}}
                    textColor={['lightText', 'lightText']}
                    classNames="pl-4 w-full"
                  />
                </CustomInput>
              )}
            />
            {errors.phone && (
              <p className="w-full text-center font-textFont text-sm text-errorColor">
                {errors.phone.message}
              </p>
            )}

            <span className="text-start">
              Mantén actualizado tu número de WhatsApp para no perderte nuestras novedades y promociones.
            </span>

            <div className="flex justify-between gap-4 pt-5">
              <button
                type="button"
                onClick={() => setShow(false)}
                className="btn-back items-center flex h-[38px] rounded-full hover:bg-transparent dark:text-darkText dark:bg-none"
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

              <ButtonAuth
                loading={loading}
                type="submit"
                variant="primary"
                label='Guardar'
                isDark={isDark}
                className='px-4'
              />
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WhatsappModal;
