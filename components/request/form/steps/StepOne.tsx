import ArrowUp from '@/components/ui/ArrowUp/ArrowUp';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import { useStepperStore } from '@/store/stateStepperStore';
import { useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';

interface FormData {
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
}

const StepOne = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
    setValue,
  } = useForm<FormData>({ mode: 'onChange' });

  const {
    markStepAsCompleted,
    setActiveStep,
    formData,
    updateFormData,
    completedSteps,
  } = useStepperStore();
  const { isDark } = useDarkTheme();

  // Estado para guardar los valores iniciales
  const [initialValues, setInitialValues] = useState<FormData | null>(null);
  
  // Observar cambios en los inputs
  const formValues = useWatch({ control });

  // Cargar los datos del formulario al montar el componente
  useEffect(() => {
    const { nombre, apellido, email, telefono } = formData.stepOne;
    const newValues = { nombre, apellido, email, telefono };
    setValue('nombre', nombre);
    setValue('apellido', apellido);
    setValue('email', email);
    setValue('telefono', telefono);

    // Guardar los valores iniciales al montar el componente
    setInitialValues(newValues);
  }, [formData.stepOne, setValue]);

  const onSubmit = (data: FormData) => {
    updateFormData(0, data); // Actualiza los datos del formulario en Zustand
    markStepAsCompleted(0); // Marcar este paso como completado
    setActiveStep(1); // Ir al siguiente paso
  };

  // Determinar si se han hecho cambios en el formulario
  const hasChanges = initialValues && !Object.keys(initialValues).every(key => initialValues[key as keyof FormData] === formValues[key as keyof FormData]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label>Nombre</label>
          <input
            {...register('nombre', { required: 'El nombre es obligatorio' })}
            className="w-full rounded-md bg-gray-900 p-2"
          />
          {errors.nombre && <p className="text-red-500">{errors.nombre.message}</p>}
        </div>

        <div>
          <label>Apellido</label>
          <input
            {...register('apellido', { required: 'El apellido es obligatorio' })}
            className="w-full rounded-md bg-gray-900 p-2"
          />
          {errors.apellido && <p className="text-red-500">{errors.apellido.message}</p>}
        </div>

        <div className="col-span-2">
          <label>Email</label>
          <input
            type="email"
            {...register('email', { required: 'El email es obligatorio' })}
            className="w-full rounded-md bg-gray-900 p-2"
          />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        </div>

        <div className="col-span-2">
          <label>Teléfono</label>
          <input
            type="text"
            {...register('telefono', { required: 'El teléfono es obligatorio' })}
            className="w-full rounded-md bg-gray-900 p-2"
          />
          {errors.telefono && <p className="text-red-500">{errors.telefono.message}</p>}
        </div>
      </div>

      <div className="flex justify-end">
        {completedSteps[0] ? (
          hasChanges ? (
            <button
              type="submit"
              className={`m-1 flex h-[20px] items-center justify-center rounded-3xl border border-buttonsLigth bg-buttonsLigth px-6 py-[14px] text-sm font-bold text-white dark:border-darkText dark:bg-darkText dark:text-lightText ${isDark ? 'buttonSecondDark' : 'buttonSecond'}`}
              disabled={!isValid}
            >
              Siguiente
            </button>
          ) : (
            <button
              className="flex items-center justify-center gap-1 text-base text-lightText underline dark:text-darkText"
              type="submit"
            >
              Tratar
              <ArrowUp />
            </button>
          )
        ) : (
          <button
            type="submit"
            className={`m-1 flex h-[20px] items-center justify-center rounded-3xl border border-buttonsLigth bg-buttonsLigth px-6 py-[14px] text-sm font-bold text-white dark:border-darkText dark:bg-darkText dark:text-lightText ${isDark ? 'buttonSecondDark' : 'buttonSecond'}`}
            disabled={!isValid}
          >
            Siguiente
          </button>
        )}
      </div>
    </form>
  );
};

export default StepOne;
