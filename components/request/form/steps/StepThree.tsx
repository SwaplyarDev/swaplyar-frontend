import { useStepperStore } from '@/store/stateStepperStore';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface FormData {
  metodoPago: string;
  numeroTarjeta: string;
  fechaVencimiento: string;
  cvv: string;
}

const StepThree = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm<FormData>({ mode: 'onChange' });
  const { markStepAsCompleted, setActiveStep, formData, updateFormData } = useStepperStore();

  useEffect(() => {
    const { metodoPago, numeroTarjeta, fechaVencimiento, cvv } = formData.stepThree;
    setValue('metodoPago', metodoPago);
    setValue('numeroTarjeta', numeroTarjeta);
    setValue('fechaVencimiento', fechaVencimiento);
    setValue('cvv', cvv);
  }, [formData.stepThree, setValue]);

  const onSubmit = (data: FormData) => {
    updateFormData(2, data); // Actualiza los datos del formulario en Zustand
    markStepAsCompleted(2); // Marcar este paso como completado
    // Aquí podrías finalizar el proceso o realizar una acción adicional
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label>Método de Pago</label>
          <input
            {...register('metodoPago', { required: 'El método de pago es obligatorio' })}
            className="w-full rounded-md bg-gray-900 p-2"
          />
          {errors.metodoPago && (
            <p className="text-red-500">{errors.metodoPago.message}</p>
          )}
        </div>

        <div>
          <label>Número de Tarjeta</label>
          <input
            type="text"
            {...register('numeroTarjeta', { required: 'El número de tarjeta es obligatorio' })}
            className="w-full rounded-md bg-gray-900 p-2"
          />
          {errors.numeroTarjeta && (
            <p className="text-red-500">{errors.numeroTarjeta.message}</p>
          )}
        </div>

        <div>
          <label>Fecha de Vencimiento</label>
          <input
            type="text"
            {...register('fechaVencimiento', { required: 'La fecha de vencimiento es obligatoria' })}
            className="w-full rounded-md bg-gray-900 p-2"
          />
          {errors.fechaVencimiento && (
            <p className="text-red-500">{errors.fechaVencimiento.message}</p>
          )}
        </div>

        <div>
          <label>CVV</label>
          <input
            type="text"
            {...register('cvv', { required: 'El CVV es obligatorio' })}
            className="w-full rounded-md bg-gray-900 p-2"
          />
          {errors.cvv && (
            <p className="text-red-500">{errors.cvv.message}</p>
          )}
        </div>
      </div>

      <button
        type="submit"
        className={`mt-4 w-full rounded-md p-2 ${isValid ? 'bg-green-500' : 'cursor-not-allowed bg-gray-500'}`}
        disabled={!isValid}
      >
        Finalizar
      </button>
    </form>
  );
};

export default StepThree;
