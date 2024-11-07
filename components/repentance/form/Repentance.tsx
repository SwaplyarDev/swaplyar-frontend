'use client';
import React, { useState } from 'react';
import { Post1_404 } from '@/../../utils/assets/img-database';
import SelectCountry from '@/components/request/form/inputs/selectCountry';
import Image from 'next/image';
import './repentance.css';

const RepentanceForm = () => {
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
  const blockAll = false;

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
    <div className="flex justify-start flex-grow min-h-full py-20">
      <div className="w-1/4 ml-20 my-20">
        <h2 className="text-center text-xl">Buscar una transferencia</h2>
        <p className="text-center">
          Ingresa los datos tal cual aparece en el email enviado
        </p>
        <div className="flex justify-center">
          <Image src={Post1_404} alt="post1" width={400} height={500} className='espejo'/>
        </div>
      </div>
      <div className="mr-3 border-l-2 border-l-white flex w-2/5 flex-col justify-center h-full align-baseline">
        
      <form
        onSubmit={handleSubmit}
        className="ml-7 h-full mt-3 flex flex-col flex-wrap justify-evenly"
      >
        
        <div>
          <label>
            NUMERO DE REFERENCIA
            <input
              className="w-full"
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
              className="w-full"
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
              className="w-full"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="el mismo email que colocaste en el formulario"
              required
            />
          </label>
        </div>
        <div className="input-repentance">
          <SelectCountry
            errors={errors}
            setValue={setValue}
            setCurrentCountry={setCurrentCountry}
            register={register}
            blockAll={blockAll}
          />
        </div>
        <div>
          <label>
            NOTA OPCIONAL
            <textarea
              className="w-full"
              name="note"
              value={formData.note}
              onChange={handleChange}
              placeholder="Añade una nota mencionando el motivo del reembolso"
            />
          </label>
        </div>
        <div className='flex justify-center text-center'>
        <div className='flex flex-col text-center flex-wrap content-center w-2/4'>
          <button className='btn rounded-full w-fit'>Buscar transferencia</button>
          <button>Salir</button>
        </div>
        </div>
      </form>
      </div>
    </div>
  );
};

export default RepentanceForm;
