'use client';
import React, { useState } from 'react';
import { Post1_404 } from '@/../../utils/assets/img-database';
import SelectCountry from '@/components/request/form/inputs/selectCountry';
import Image from 'next/image';
import Link from 'next/link';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import { useForm, SubmitHandler } from 'react-hook-form';

type FormData = {
  referenceNumber: string;
  firstLastName: string;
  email: string;
  telephone: string;
  note: string;
};

const RepentanceForm = () => {
  const { isDark } = useDarkTheme();
  const [formData, setFormData] = useState<FormData>({
    referenceNumber: '',
    firstLastName: '',
    email: '',
    telephone: '',
    note: '',
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="flex min-h-full flex-grow justify-start py-20">
      <div className="my-20 ml-20 w-1/4">
        <h2 className="text-center text-xl">Buscar una transferencia</h2>
        <p className="text-center">
          Ingresa los datos tal cual aparece en el email enviado
        </p>
        <div className="flex justify-center">
          <Image
            src={Post1_404}
            alt="post1"
            width={400}
            height={500}
            className="-scale-x-100"
          />
        </div>
      </div>
      <div className={`mr-3 flex h-full w-2/5 flex-col justify-center border-l-2 ${isDark ? 'border-l-white' : 'border-l-buttonsLigth'}`}>
        <form onSubmit={handleSubmit(onSubmit)} className="ml-7 mt-3 flex h-full flex-col justify-evenly">
          <div>
            <label>
              NUMERO DE REFERENCIA
              <input
                className={`w-full border-0 border-b-4 border-solid ${isDark ? 'border-b-white bg-transparent text-white placeholder-white' : 'border-b-buttonsLigth bg-transparent text-buttonsLigth placeholder-buttonsLigth'} outline-none focus:border focus:outline-none`}
                type="text"
                placeholder="como figura en el recibo"
                {...register('referenceNumber', {
                  required: '• El número de referencia es obligatorio',
                  pattern: {
                    value: /^[A-Za-z0-9]{20,40}$/,
                    message: '• El número de referencia debe tener entre 20 y 40 caracteres alfanuméricos',
                  },
                })}
                onChange={handleChange}
                required
              />
            </label>
            {errors.referenceNumber && <p className="mt-1 text-sm text-red-500">{errors.referenceNumber.message}</p>}
          </div>
          <div>
            <label>
              Nombre y apellido
              <input
                className={`w-full border-0 border-b-4 border-solid ${isDark ? 'border-b-white bg-transparent text-white placeholder-white' : 'border-b-buttonsLigth bg-transparent text-buttonsLigth placeholder-buttonsLigth'} outline-none focus:border focus:outline-none`}
                type="text"
                placeholder="como figura en el recibo"
                {...register('firstLastName', {
                  required: '• El Nombre y Apellido es obligatorio',
                  minLength: { value: 6, message: '• Debe ingresar mínimo 6 caracteres' },
                  maxLength: { value: 50, message: '• Debe ingresar como máximo 50 caracteres' },
                })}
                onChange={handleChange}
                required
              />
            </label>
            {errors.firstLastName && <p className="mt-1 text-sm text-red-500">{errors.firstLastName.message}</p>}
          </div>
          <div>
            <label>
              Email
              <input
                className={`w-full border-0 border-b-4 border-solid ${isDark ? 'border-b-white bg-transparent text-white placeholder-white' : 'border-b-buttonsLigth bg-transparent text-buttonsLigth placeholder-buttonsLigth'} outline-none focus:border focus:outline-none`}
                type="email"
                {...register('email', {
                  required: '• El Email es obligatorio',
                  pattern: {
                    value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                    message: '• Ingresa un formato válido de email. Ej: Ejemplo@gmail.com',
                  },
                })}
                onChange={handleChange}
                placeholder="el mismo email que colocaste en el formulario"
                required
              />
            </label>
            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
          </div>
          <div className="w-full">
            <SelectCountry
              errors={errors}
              setValue={(name, value) => setFormData((prevData) => ({ ...prevData, [name]: value }))}
              setCurrentCountry={(country) => setFormData((prevData) => ({ ...prevData, currentCountry: country }))}
              register={register}
              blockALl={false}
            />
          </div>
          <div>
            <label>
              NOTA OPCIONAL
              <textarea
                className={`max-h-[500px] min-h-[45px] w-full resize-none border-0 border-b-2 ${isDark ? 'border-white bg-transparent text-white placeholder-white' : 'border-buttonsLigth bg-transparent text-buttonsLigth placeholder-buttonsLigth'} outline-none focus:border focus:outline-none`}
                {...register('note', {
                  minLength: { value: 6, message: '• Debe ingresar mínimo 6 caracteres' },
                  maxLength: { value: 500, message: '• Debe ingresar como máximo 500 caracteres' },
                })}
                placeholder="Añade una nota mencionando el motivo del reembolso"
                onChange={handleChange}
              />
            </label>
            {errors.note && <p className="mt-1 text-sm text-red-500">{errors.note.message}</p>}
          </div>
          <div className="flex justify-center text-center">
            <button
              type="submit"
              className={`mt-6 rounded-full border-2 ${isDark ? 'border-darkText bg-darkText text-black' : 'border-buttonsLigth bg-buttonsLigth text-darkText'} px-4 py-2 text-lg font-bold`}
            >
              Buscar Transferencia
            </button>
          </div>
        </form>
        <div className="text-center flex justify-center">
          <Link href={'/'} >
            <h3 className={` w-fit border-b ${isDark ? '  border-b-white  text-white' : 'text-black  border-black '}  `}>Salir</h3>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RepentanceForm;