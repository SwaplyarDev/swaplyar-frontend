import SelectCountry from '@/components/request/form/inputs/SelectCountry';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { useWhatsAppFormStore } from '../store/WhatsAppFormStore';
import { CountryOption } from '@/types/request/request';
import { useSession } from 'next-auth/react';
import { updatePhone } from '../services/profileServices';

interface WhatsappVerificationProps {
  show: boolean;
  setShow: (arg: boolean) => void;
}

interface FormData {
  phone: string;
  calling_code: CountryOption | undefined;
}

const WhatsappModal = ({ show, setShow }: WhatsappVerificationProps) => {
  const { isDark } = useDarkTheme();
  const { data: session } = useSession();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
    setValue,
    watch,
  } = useForm<FormData>({ mode: 'onChange' });

  const phone = useWhatsAppFormStore((state) => state.phone);

  useEffect(() => {
    setValue('phone', phone);
  }, [setValue, phone]);

  const [isFocused, setIsFocused] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: FormData) => {
    if (!session?.accessToken) return;
    setLoading(true);

    try {
      const phoneWithPrefix = `${data.calling_code?.callingCode || ""}${" " + data.phone}`;
      const res = await updatePhone(session.accessToken, phoneWithPrefix);

      useWhatsAppFormStore.setState({ phone: phoneWithPrefix });

      setShow(false);
    } catch (err) {
      console.error("❌ Error al actualizar teléfono:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  return (
    <>
      <div onClick={() => setShow(false)} className="fixed inset-0 z-40 bg-black bg-opacity-80"></div>
      <div
        className={`fixed left-1/2 top-1/2 z-50 flex h-[250px] w-[300px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-4 rounded-2xl border-none xs:w-[400px] md:w-[592px] ${isDark ? 'bg-zinc-800 text-white' : 'bg-white text-black'} sm:max-w-md`}
      >
        <h2 className="xs:text-2x1 text-lg font-light md:text-3xl">Editar Teléfono</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label
            htmlFor="phone"
            className={clsx(
              'mb-1 ml-2.5 h-5 font-textFont text-sm text-lightText transition-opacity duration-300 dark:text-darkText',
              isFocused || !!watch('phone') ? 'opacity-100' : 'opacity-0',
            )}
          >
            Teléfono
          </label>
          <div
            className={clsx(
              'flex max-h-[42px] max-w-full items-center rounded-2xl border bg-transparent py-2 pr-5 text-lightText',
              watch('phone') && 'border-inputLight dark:border-lightText',
              errors.phone
                ? 'mb-0 border-errorColor placeholder-errorColor'
                : 'mb-5 border-inputLightDisabled hover:border-inputLight',
            )}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          >
            <Controller
              name="calling_code"
              control={control}
              defaultValue={undefined}
              rules={{ required: 'Este campo es obligatorio' }}
              render={({ field, fieldState }) => (
                <SelectCountry
                  selectedCodeCountry={field.value}
                  setSelectedCodeCountry={(option) => field.onChange(option)}
                  errors={fieldState.error ? { [field.name]: fieldState.error } : {}}
                  textColor={['lightText', 'lightText']}
                  classNames="pl-4 w-[118px]"
                />
              )}
            />
            <input
              placeholder={isFocused ? '' : errors.phone ? 'Teléfono*' : 'Teléfono'}
              className="inputChangeAutofillReverse w-full border-none bg-transparent font-textFont"
              type="tel"
              {...register('phone', {
                required: 'El número de teléfono es obligatorio',
                pattern: {
                  value: /^\d{9,11}$/,
                  message: 'Introduce un número válido de entre 9 y 11 dígitos',
                },
              })}
            />
          </div>
          {errors.phone && (
            <p className="px-[10px] font-textFont text-sm text-errorColor">{errors.phone.message}</p>
          )}

          <div className="flex justify-between gap-4 pt-5">
            <button
              onClick={() => setShow(false)}
              className={`rounded-full px-4 ${isDark ? 'border border-white text-white hover:bg-white hover:text-[#4B4B4B]' : 'border border-blue-400 bg-white text-blue-400'}`}
            >
              Volver
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`h-8 rounded-full px-4 ${isDark ? 'bg-white text-[#4B4B4B]' : 'bg-blue-400 text-white hover:bg-blue-700'}`}
            >
              {loading ? "Guardando..." : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default WhatsappModal;
