'use client';
import React, { useState } from 'react';
import Form from './form/Form';
import { regretsPc } from '@/utils/assets/imgDatabaseCloudinary';
import Image from 'next/image';
import Link from 'next/link';
import { useDarkTheme } from '../ui/theme-Provider/themeProvider';
import { createRegret } from '@/actions/repentance/repentanceForm.action';
import { FormRepentance } from '@/types/repentance/repentance';
import AlertSuccess from './Alerts/AlertSuccess';
import AlertDuplication from './Alerts/AlertDuplication';
import AlertIncorrect from './Alerts/AlertIncorrect';
import AlertError from './Alerts/AlertError';
import AlertProcess from './Alerts/AlertProcess';
import AnimatedBlurredCircles from '../ui/animations/AnimatedBlurredCircles';
import { regretsPhone } from '@/utils/assets/img-database';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';

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

    const confirm = await AlertProcess({
      isDark,
      formData,
      isLoading,
      onSend: async () => {
        // Aquí es donde hacemos el envío de los datos
        const dataToSend = { ...formData, status: 'pendiente' };
        try {
          const response = await createRegret(dataToSend);
          if (!response) {
            await AlertError({ isDark, message: 'La respuesta está vacía.' });
          } else {
            if (response.ok) {
              await AlertSuccess({ isDark });
            } else {
              const errorMessage = response.message || 'Hubo un problema al enviar los datos.';
              if (response.status === 409) {
                await AlertDuplication({ isDark });
              } else if (response.status === 400) {
                await AlertIncorrect({ isDark });
              } else {
                await AlertError({ isDark, message: errorMessage });
              }
            }
          }
        } catch (error: any) {
          await AlertError({ isDark, message: `Error en el envío: ${error.message}` });
        }
      },
    });

    if (!confirm.isConfirmed) return;
  };

  return (
    <div>
      <div className="mx-5 my-7 flex flex-col items-center justify-center lg:mx-0">
        <AnimatedBlurredCircles tope="top-[124px]" />
        <div className="flex w-full flex-col gap-10 lg:flex-row">
          <h1 className="text-center font-titleFont text-[38px] font-medium">
            Solicita tu reembolso De forma rápida y sencilla
          </h1>
          <p className="text-center font-textFont font-light">
            Completa los datos requeridos con precisión para iniciar tu solicitud de reembolso. Procesaremos tu pedido
            de forma segura y devolveremos el dinero a la cuenta de origen de manera eficiente y sin complicaciones.
          </p>
          <p className="font-textFont text-[21px] font-light">
            Introduce los datos exactamente como aparecen en el email recibido.
          </p>
        </div>
        <div className="flex w-full flex-col lg:flex-row">
          <div className="hidden min-h-full flex-wrap justify-center lg:block">
            <Image src={regretsPc} alt="regretsPc" width={650} height={0} className="h-full object-cover" />
          </div>
          <div className="mt-10 flex min-h-full w-full flex-wrap justify-center lg:hidden">
            <Image src={regretsPhone} alt="regretsPhone" width={200} height={0} className="h-full object-contain" />
            <div
              className={`min-w-full flex-wrap justify-center border-t-2 lg:hidden ${isDark ? 'border-t-white' : 'border-t-buttonsLigth'}`}
            ></div>
          </div>

          <div
            className={`mt-10 flex h-full w-full flex-col justify-center border-0 lg:mr-3 lg:border-l-2 ${isDark ? 'border-l-white' : 'border-l-buttonsLigth'}`}
          >
            <Form onSubmit={handleRepentanceFormSubmission}></Form>
            <div className="mt-[18px] flex justify-center text-center lg:ml-7">
              <Link
                className={clsx(
                  'flex h-[46px] w-[100px] items-center justify-center gap-2 rounded-[50px] border border-buttonsLigth font-textFont text-xl font-light text-buttonsLigth',
                )}
                href={'/info/help-center'}
              >
                <FontAwesomeIcon icon={faArrowLeftLong} />
                Volver
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepentanceForm;
