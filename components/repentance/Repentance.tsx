'use client';
import React, { useState } from 'react';
import Form from './form/Form';
import { regretsPc, regretsPhone } from '@/utils/assets/imgDatabaseCloudinary';
import Image from 'next/image';
import Link from 'next/link';
import { useDarkTheme } from '../ui/theme-Provider/themeProvider';
import { createRegret } from '@/actions/repentance/action.repentanceForm';
import { FormRepentance } from '@/types/repentance/repentance';
import AlertSuccess from './Alerts/AlertSuccess';
import AlertDuplication from './Alerts/AlertDuplication';
import AlertIncorrect from './Alerts/AlertIncorrect';
import AlertError from './Alerts/AlertError';
import AlertProcess from './Alerts/AlertProcess';
import AnimatedBlurredCircles from '../ui/animations/AnimatedBlurredCircles';

interface Response {
  ok: boolean;
  user?: any;
  message: string;
  status: number;
}

const RepentanceForm = () => {
  const { isDark } = useDarkTheme();
  const [isLoading] = useState(false);
  const validateFormData = async (formData: FormRepentance): Promise<boolean> => {
    if (!formData.transaction_id || !formData.last_name || !formData.email || !formData.phone_number) {
      await AlertIncorrect({ isDark });
      return false;
    }
    return true;
  };

  const handleRepentanceFormSubmission = async (formData: FormRepentance) => {
    const isValid = await validateFormData(formData);
    if (!isValid) return;

    const confirm = await AlertProcess({ isDark, formData, isLoading });

    if (!confirm.isConfirmed) return;

    const dataToSend = { ...formData, status: 'pendiente' };

    try {
      const response = await createRegret(dataToSend);
      console.log('responseeeeeeee:', response);
      if (!response) {
        console.log('es vacio');
      } else {
        if (response.ok) {
          console.log('caso de exito');
          await AlertSuccess({ isDark });
        } else {
          const errorMessage = response.message || 'Hubo un problema al enviar los datos.';
          console.log('errorMessage:', errorMessage);

          if (response.status === 409) {
            await AlertDuplication({ isDark });
            console.log('caso de duplicación');
          } else if (response.status === 400) {
            await AlertIncorrect({ isDark });
            console.log('caso de datos incorrectos');
          } else {
            await AlertError({ isDark });
            console.log('caso de error');
          }
        }
      }
    } catch (error) {
      console.error('Error en el envío:', error);
      await AlertError({ isDark });
    }
  };

  return (
    <div>
      <div className="mx-5 my-7 flex flex-col items-center justify-center lg:mx-0">
        <AnimatedBlurredCircles tope="top-[124px]" />
        <div className="flex w-full flex-col lg:flex-row">
          <div className="lg:w-3/7 mb-4 hidden flex-col items-start lg:block">
            <h1 className="w-full text-start text-xl">Cancelacion o Reembolso</h1>
            <p className="mt-2 text-justify">Ingresa los datos tal cual aparece en el email enviado</p>
          </div>
        </div>
        <div className="flex w-full flex-col lg:flex-row">
          <div className="hidden min-h-full flex-wrap justify-center lg:block">
            <Image src={regretsPc} alt="regretsPc" width={650} height={0} className="h-full object-cover" />
          </div>
          <div className="flex flex-col flex-wrap content-center">
            <div className="block flex min-h-full w-72 flex-wrap justify-center lg:hidden">
              <Image src={regretsPhone} alt="regretsPhone" width={200} height={0} className="h-full object-contain" />
              <div
                className={`block min-w-full flex-wrap justify-center border-t-4 lg:hidden ${isDark ? 'border-t-white' : 'border-t-buttonsLigth'}`}
              ></div>
            </div>
            <div className="block w-72 flex-col items-start lg:hidden lg:w-2/6">
              <p className="mt-2 text-center text-lg">Ingresa los datos tal cual aparece en el email enviado</p>
            </div>
          </div>

          <div
            className={`mr-0 flex h-full w-full flex-col justify-center border-0 lg:mr-3 lg:border-l-4 ${isDark ? 'border-l-white' : 'border-l-buttonsLigth'}`}
          >
            <Form onSubmit={handleRepentanceFormSubmission}></Form>
            <div className="ml-2 mt-5 flex justify-center text-center lg:ml-7">
              <Link href={'/'}>
                <h3
                  className={`w-fit border-b font-bold ${isDark ? 'border-b-white text-white' : 'border-black text-black'} `}
                >
                  Salir
                </h3>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepentanceForm;
