'use client';
import React, { useState } from 'react';
import Form from './form/Form';
import Alerts from './Alerts/Alerts';
import { regretsPc, regretsPhone } from '@/utils/assets/imgDatabaseCloudinary';
import Image from 'next/image';
import Link from 'next/link';
import { useDarkTheme } from '../ui/theme-Provider/themeProvider';
import { createRegret } from '@/actions/repentance/action.repentanceForm';
import { FormRepentance } from '@/types/repentance/repentance';
// Función principal para manejar el envío del formulario
const RepentanceForm = () => {
  const [alertStatus, setAlertStatus] = useState<string>('');
  const { isDark } = useDarkTheme();

  const validateFormData = (formData: FormRepentance): boolean => {
    if (
      !formData.transaction_id ||
      !formData.last_name ||
      !formData.email ||
      !formData.phone_number
    ) {
      setAlertStatus('INCORRECT_DATA');
      console.log('INCORRECT_DATA:', setAlertStatus('INCORRECT_DATA'));
      return false;
    }
    // Aquí podrías agregar más validaciones según el formato esperado de los datos
    return true;
  };

  const handleRepentanceFormSubmission = async (formData: FormRepentance) => {
    // Primero validamos los datos
    const isValid = validateFormData(formData);
    if (!isValid) return; // Si los datos no son correctos, no continuar
  
    // Si los datos son correctos, mostramos AlertProcess
    setAlertStatus('PROCESS');
  
    // Creamos el objeto para enviar
    const dataToSend = { ...formData, status: 'pendiente' };
  
    try {
      // Enviamos los datos al backend
      const response = await createRegret(dataToSend);
  
      // Ahora response contiene la respuesta de createRegret, que ya es un objeto con las claves ok, user y message
      console.log('response desde createRegret:', response);
  
      // Si la respuesta es exitosa
      if (response.ok) {
        setAlertStatus('SUCCESS');
        console.log('SUCCESS:', response);
      } else if (response.message === 'DUPLICATE') {
        setAlertStatus('DUPLICATE');
        console.log('DUPLICATE:', response);
      } else if (response.message === 'INCORRECT_DATA') {
        setAlertStatus('INCORRECT_DATA');
        console.log('INCORRECT_DATA:', response);
      } else {
        setAlertStatus('ERROR');
        console.log('ERROR:', response);
      }
    } catch (error) {
      setAlertStatus('ERROR');
      console.log('Error al enviar los datos', error);
    }
    
  };
  
  return (
    <div>
      <Alerts status={alertStatus}></Alerts>
      <div className="mx-5 my-7 flex flex-col items-center justify-center lg:mx-0">
        <div className="flex w-full flex-col lg:flex-row">
          <div className="lg:w-3/7 mb-4 hidden flex-col items-start lg:block">
            <h1 className="w-full text-start text-xl">
              Cancelacion o Reembolso
            </h1>
            <p className="mt-2 text-justify">
              Ingresa los datos tal cual aparece en el email enviado
            </p>
          </div>
        </div>
        <div className="flex w-full flex-col lg:flex-row">
          <div className="hidden min-h-full flex-wrap justify-center lg:block">
            <Image
              src={regretsPc}
              alt="regretsPc"
              width={650}
              height={0}
              className="h-full object-cover"
            />
          </div>
          <div className="flex flex-col flex-wrap content-center">
            <div className="block flex min-h-full w-72 flex-wrap justify-center lg:hidden">
              <Image
                src={regretsPhone}
                alt="regretsPhone"
                width={200}
                height={0}
                className="h-full object-contain"
              />
              <div
                className={`block min-w-full flex-wrap justify-center border-t-4 lg:hidden ${isDark ? 'border-t-white' : 'border-t-buttonsLigth'}`}
              ></div>
            </div>
            <div className="block w-72 flex-col items-start lg:hidden lg:w-2/6">
              <p className="mt-2 text-center text-lg">
                Ingresa los datos tal cual aparece en el email enviado
              </p>
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
