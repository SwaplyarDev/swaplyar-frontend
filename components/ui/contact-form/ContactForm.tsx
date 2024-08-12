"use client";

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Image from 'next/image';
import InputField from './InputField';
import { FormValues } from '@/types/data';

export const FORM_URL = "https://script.google.com/macros/s/AKfycbzu28sDyTnLsc6Aq2sdAegdhQwA3Uud_Gq_Dgb6BEPIXsg0vPEVlsGqXGrEaY4WhSWq/exec";


const ContactForm = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>();
    const [loading, setLoading] = useState(false);

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        setLoading(true);

        try {
        const response = await fetch(FORM_URL, {
            method: "POST",
            body: new URLSearchParams(data as any),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        alert("¡Gracias! su Mensaje se envió exitosamente.");
        reset();
        } catch (error) {
        if (error instanceof Error) {
            console.error("Error!", error.message);
        } else {
            console.error("An unexpected error occurred", error);
        }
        } finally {
        setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
        <h4 className="text-xl font-semibold">Contáctanos</h4>
        
        <InputField
            id="Nombre"
            placeholder="Nombre completo"
            register={register('Nombre', { required: true })}
            error={errors.Nombre && "Este campo es obligatorio"}
        />
        
        <InputField
            id="Apellido"
            placeholder="Apellido Completo"
            register={register('Apellido', { required: true })}
            error={errors.Apellido && "Este campo es obligatorio"}
        />
        
        <InputField
            id="email"
            type="email"
            placeholder="Email"
            register={register('email', { required: true })}
            error={errors.email && "Este campo es obligatorio"}
        />
        
        <div className="flex flex-col">
            <textarea
            {...register('message', { required: true })}
            id="message"
            rows={7}
            placeholder="Mensaje"
            className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
            ></textarea>
            {errors.message && <span className="text-red-500">Este campo es obligatorio</span>}
        </div>
        
        <button
            type="submit"
            className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
            {loading ? "Enviando..." : "Enviar Mensaje"}
        </button>
        
        {loading && (
            <div id="loading" className="flex justify-center">
            <Image src="/gif/cargando.gif" alt="Cargando..." width={50} height={50} />
            </div>
        )}
        </form>
    );
};

export default ContactForm;
