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
  telephone: number;
  note: string;
};

const RepentanceForm = () => {
  const { isDark } = useDarkTheme();
  const [formData, setFormData] = useState({
    referenceNumber: '',
    firstLastName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    note: '',
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmit: SubmitHandler<FormData> = (data) => {
    // Aquí puedes manejar el envío del formulario
  };

  const [error, setErrors] = useState({});
  const [currentCountry, setCurrentCountry] = useState('AR');
  const blockALl = false;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const setValue = (name: string, value: any) => {
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
      <div
        className={`mr-3 flex h-full w-2/5 flex-col justify-center border-l-2 align-baseline ${isDark ? 'border-l-white' : 'border-l-buttonsLigth'} `}
      >
        <form
           onSubmit={handleSubmit(onSubmit)}
          className="ml-7 mt-3 flex h-full flex-col flex-wrap justify-evenly"
        >
          <div>
            <label>
              NUMERO DE REFERENCIA
              <input
                className={`w-full border-0 border-b-4 border-solid ${
                  isDark
                    ? 'border-b-white bg-transparent p-0 text-base text-white placeholder-white placeholder-opacity-80 outline-none focus:border-white focus:outline-none'
                    : 'border-b-buttonsLigth bg-transparent p-0 text-base text-buttonsLigth placeholder-buttonsLigth placeholder-opacity-80 outline-none focus:border-buttonsLigth focus:outline-none'
                }`}
                type="text"
                placeholder="como figura en el recibo"
                {...register('referenceNumber', {
                  required: '• El número de referencia es obligatorio',
                  pattern: {
                    value: /^[A-Za-z0-9]{20,40}$/,
                    message:
                      '• El número de referencia debe tener entre 20 y 40 caracteres alfanuméricos',
                  },
                })}
                onChange={handleChange}
                required
              />
            </label>
            {errors.referenceNumber && (
              <p className="mt-1 text-sm text-red-500">
                {errors.referenceNumber.message}
              </p>
            )}
          </div>
          <div>
            <label>
              Nombre y apellido
              <input
                className={`w-full border-0 border-b-4 border-solid ${isDark ? 'border-b-white bg-transparent p-0 text-base text-white placeholder-white placeholder-opacity-80 outline-none focus:border-white focus:outline-none' : 'border-b-buttonsLigth bg-transparent p-0 text-base text-buttonsLigth placeholder-buttonsLigth placeholder-opacity-80 outline-none focus:border-buttonsLigth focus:outline-none'}`}
                type="text"
                value={formData.firstLastName}
                placeholder="como figura en el recibo"
                {...register('firstLastName', {
                  required: '• El Nombre y Apellido es obligatorio',
                  minLength: {
                    value: 6,
                    message: '• Debe ingresar máximo 6 caracteres',
                  },
                  maxLength: {
                    value: 50,
                    message: '• Debe ingresar como máximo 500 caracteres',
                  },
                })}
                onChange={handleChange}
                required
              />
            </label>
            {errors.firstLastName && (
              <p className="mt-1 text-sm text-red-500">
                {errors.firstLastName.message}
              </p>
            )}
          </div>
          <div>
            <label>
              Email
              <input
                className={`w-full border-0 border-b-4 border-solid ${isDark ? 'border-b-white bg-transparent p-0 text-base text-white placeholder-white placeholder-opacity-80 outline-none focus:border-white focus:outline-none' : 'border-b-buttonsLigth bg-transparent p-0 text-base text-buttonsLigth placeholder-buttonsLigth placeholder-opacity-80 outline-none focus:border-buttonsLigth focus:outline-none'}`}
                type="email"
                {...register('email', {
                  required: '• El Email es obligatorio',
                  minLength: {
                    value: 5,
                    message: '• Debe ingresar máximo 5 caracteres',
                  },
                  maxLength: {
                    value: 254,
                    message: '• Debe ingresar como máximo 254 caracteres',
                  },
                  pattern: {
                    value:
                      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
                    message:
                      '• Ingresa un formato valido de email.Ej: Ejemplo@gmail.com',
                  },
                })}
                onChange={handleChange}
                value={formData.email}
                placeholder="el mismo email que colocaste en el formulario"
                required
              />
            </label>
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>
          <div
            className={`w-full border-0 border-b-4 border-solid ${isDark ? 'border-b-white bg-transparent p-0 text-base text-white placeholder-white placeholder-opacity-80 outline-none focus:border-white focus:outline-none' : 'border-b-buttonsLigth bg-transparent p-0 text-base text-buttonsLigth placeholder-buttonsLigth placeholder-opacity-80 outline-none focus:border-buttonsLigth focus:outline-none'}`}
          >
            <SelectCountry
              errors={errors}
              setValue={setValue}
              setCurrentCountry={setCurrentCountry}
              register={register}
              blockALl={blockALl}
            />
          </div>
          <div>
            <label>
              NOTA OPCIONAL
              <textarea
                className={`max-h-[500px] min-h-[45px] w-full resize-none overflow-y-auto border-0 border-b-2 ${isDark ? 'border-white bg-transparent p-0 text-base text-white placeholder-white placeholder-opacity-100 outline-none focus:border-b-2 focus:border-white focus:outline-none' : 'border-buttonsLigth bg-transparent p-0 text-base text-buttonsLigth placeholder-buttonsLigth placeholder-opacity-100 outline-none focus:border-b-2 focus:border-buttonsLigth focus:outline-none'} `}
                {...register('note', {
                  minLength: {
                    value: 6,
                    message: '• Debe ingresar máximo 6 caracteres',
                  },
                  maxLength: {
                    value: 50,
                    message: '• Debe ingresar como máximo 500 caracteres',
                  },
                })}
                value={formData.note}
                placeholder="Añade una nota mencionando el motivo del reembolso"
                onChange={handleChange}
              />
            </label>
            {errors.note && (
              <p className="mt-1 text-sm text-red-500">{errors.note.message}</p>
            )}
          </div>
          <div className="flex justify-center text-center">
            <div className="flex w-2/4 flex-col flex-wrap content-center items-center justify-center text-center">
              <button
                id="bannerHTUButton"
                className={`trasntition-transform ease group mt-6 rounded-full border-2 border-buttonsLigth bg-buttonsLigth px-4 py-2 text-lg duration-300 hover:border-selectBtsLight dark:border-darkText dark:bg-darkText dark:text-black ${isDark ? 'buttonSecondDark' : 'buttonSecond'} ease font-bold text-darkText transition-colors duration-300 ${isDark ? 'dark:text-lightText' : 'text'}`}
              >
                <h3>Buscar Transferencia</h3>
              </button>
            </div>
          </div>
        </form>
        <div className="text-center">
          <button>
            <Link href={'/'}>
              <h3
                className={` ${isDark ? 'border- w-fit border-b border-b-white text-center text-white' : 'text w-fit border-b border-black text-center'} `}
              >
                Salir
              </h3>
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RepentanceForm;
