import { useStepperStore } from '@/store/stateStepperStore';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface FormData {
  destinatario: string;
  direccion: string;
  ciudad: string;
  codigoPostal: string;
}

const StepTwo = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm<FormData>({ mode: 'onChange' });
  const { markStepAsCompleted, setActiveStep, formData, updateFormData } = useStepperStore();

  useEffect(() => {
    const { destinatario, direccion, ciudad, codigoPostal } = formData.stepTwo;
    setValue('destinatario', destinatario);
    setValue('direccion', direccion);
    setValue('ciudad', ciudad);
    setValue('codigoPostal', codigoPostal);
  }, [formData.stepTwo, setValue]);

  const onSubmit = (data: FormData) => {
    updateFormData(1, data); // Actualiza los datos del formulario en Zustand
    markStepAsCompleted(1); // Marcar este paso como completado
    setActiveStep(2); // Ir al siguiente paso
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label>Nombre del Destinatario</label>
          <input
            {...register('destinatario', { required: 'El nombre del destinatario es obligatorio' })}
            className="w-full rounded-md bg-gray-900 p-2"
          />
          {errors.destinatario && (
            <p className="text-red-500">{errors.destinatario.message}</p>
          )}
        </div>

        <div className="col-span-2">
          <label>Dirección</label>
          <input
            {...register('direccion', { required: 'La dirección es obligatoria' })}
            className="w-full rounded-md bg-gray-900 p-2"
          />
          {errors.direccion && (
            <p className="text-red-500">{errors.direccion.message}</p>
          )}
        </div>

        <div>
          <label>Ciudad</label>
          <input
            {...register('ciudad', { required: 'La ciudad es obligatoria' })}
            className="w-full rounded-md bg-gray-900 p-2"
          />
          {errors.ciudad && (
            <p className="text-red-500">{errors.ciudad.message}</p>
          )}
        </div>

        <div>
          <label>Código Postal</label>
          <input
            {...register('codigoPostal', { required: 'El código postal es obligatorio' })}
            className="w-full rounded-md bg-gray-900 p-2"
          />
          {errors.codigoPostal && (
            <p className="text-red-500">{errors.codigoPostal.message}</p>
          )}
        </div>
      </div>

      <button
        type="submit"
        className={`mt-4 w-full rounded-md p-2 ${isValid ? 'bg-green-500' : 'cursor-not-allowed bg-gray-500'}`}
        disabled={!isValid}
      >
        Siguiente
      </button>
    </form>
  );
};

export default StepTwo;
