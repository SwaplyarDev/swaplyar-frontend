'use client';
import React, { useState } from 'react';
import { Post1_404 } from '@/../../utils/assets/img-database';
import SelectCountry from '@/components/request/form/inputs/selectCountry';
import Image from 'next/image';
import './repentance.css';
import Link from 'next/link';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';

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

  const [errors, setErrors] = useState({});
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const setValue = (name: string, value: any) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const register = () => {
    // lógica de registro (si usas react-hook-form, pasará aquí la función `register`)
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
      <div className={`mr-3 flex h-full w-2/5 flex-col justify-center border-l-2 align-baseline ${isDark ? 'border-l-white':'border-l-buttonsLigth'} `}>
        <form
          onSubmit={handleSubmit}
          className="ml-7 mt-3 flex h-full flex-col flex-wrap justify-evenly"
        >
          <div>
            <label>
              NUMERO DE REFERENCIA
              <input
                // arreglar el diseño de los inputs
                className={`w-full border-0 border-b-4 border-solid ${isDark ? 'border-b-white bg-transparent p-0 text-base text-white placeholder-white placeholder-opacity-80 outline-none  focus:border-white focus:outline-none' : 'border-b-buttonsLigth bg-transparent p-0 text-base text-buttonsLigth placeholder-buttonsLigth placeholder-opacity-80 outline-none  focus:border-buttonsLigth focus:outline-none'}`}
                type="text"
                name="referenceNumber"
                value={formData.referenceNumber}
                onChange={handleChange}
                placeholder="como figura en el recibo"
                required
              />
            </label>
          </div>
          <div>
            <label>
              Nombre y apellido
              <input
                className={`w-full border-0 border-b-4 border-solid ${isDark ? 'border-b-white bg-transparent p-0 text-base text-white placeholder-white placeholder-opacity-80 outline-none  focus:border-white focus:outline-none' : 'border-b-buttonsLigth bg-transparent p-0 text-base text-buttonsLigth placeholder-buttonsLigth placeholder-opacity-80 outline-none  focus:border-buttonsLigth focus:outline-none'}`}
                type="text"
                name="firstLastName"
                value={formData.firstLastName}
                onChange={handleChange}
                placeholder="como figura en el recibo"
                required
              />
            </label>
          </div>
          <div>
            <label>
              Email
              <input
                className={`w-full border-0 border-b-4 border-solid ${isDark ? 'border-b-white bg-transparent p-0 text-base text-white placeholder-white placeholder-opacity-80 outline-none  focus:border-white focus:outline-none' : 'border-b-buttonsLigth bg-transparent p-0 text-base text-buttonsLigth placeholder-buttonsLigth placeholder-opacity-80 outline-none  focus:border-buttonsLigth focus:outline-none'}`}
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="el mismo email que colocaste en el formulario"
                required
              />
            </label>
          </div>
          <div className={`w-full border-0 border-b-4 border-solid ${isDark ? 'border-b-white bg-transparent p-0 text-base text-white placeholder-white placeholder-opacity-80 outline-none  focus:border-white focus:outline-none' : 'border-b-buttonsLigth bg-transparent p-0 text-base text-buttonsLigth placeholder-buttonsLigth placeholder-opacity-80 outline-none  focus:border-buttonsLigth focus:outline-none'}`}>
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
                className={`max-h-[500px] min-h-[45px] w-full resize-none overflow-y-auto border-b-2 border-0
                ${isDark ? 'border-white bg-transparent p-0 text-base text-white placeholder-white placeholder-opacity-100 outline-none focus:border-b-2 focus:border-white focus:outline-none' : 'border-buttonsLigth bg-transparent p-0 text-base text-buttonsLigth placeholder-buttonsLigth placeholder-opacity-100 outline-none focus:border-b-2 focus:border-buttonsLigth focus:outline-none'} `}
                name="note"
                value={formData.note}
                onChange={handleChange}
                placeholder="Añade una nota mencionando el motivo del reembolso"
              />
            </label>
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
            <Link
              href={'/'}
              
            >
              <h3 className={` ${isDark ? 'w-fit border- border-b border-b-white text-center text-white' : 'text w-fit border-b border-black text-center'} `}>Salir</h3>
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RepentanceForm;
