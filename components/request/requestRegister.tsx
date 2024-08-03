// /components/request/requestRegister.tsx

"use client";

import clsx from 'clsx';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { requestRegister } from '@/actions/request/action.requestRegister';

type FormInputs = {
    name: string;
    surname: string;
    whatsappNumber: string;
    cbuAlias: string;
    cuil: string;
    email: string;
    password: string;
    comprobante: FileList;
};

export const RequestRegisterForm = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>();

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        setErrorMessage('');
        const { name, surname, whatsappNumber, cbuAlias, cuil, email, password, comprobante } = data;

        // Prepare form data
        const formData = new FormData();
        formData.append('name', name);
        formData.append('surname', surname);
        formData.append('whatsappNumber', whatsappNumber);
        formData.append('cbuAlias', cbuAlias);
        formData.append('cuil', cuil);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('comprobante', comprobante[0]);

        // Server action
        const resp = await requestRegister(formData);

        if (!resp.ok) {
            setErrorMessage(resp.message);
            return;
        }

        const result = await signIn('credentials', {
            redirect: false,
            email,
            password,
        });

        if (result?.error) {
            setErrorMessage(result.error);
        } else {
            window.location.replace('/dashboard');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-black">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col bg-white dark:bg-gray-800 p-8 rounded shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-5 text-center text-gray-900 dark:text-white">Crear Cuenta</h2>

                <label htmlFor="name" className="text-gray-900 dark:text-gray-300">Nombre</label>
                <input
                    className={clsx(
                        "px-5 py-2 border bg-gray-200 dark:bg-gray-700 rounded mb-5 text-gray-900 dark:text-white",
                        { 'border-red-500': errors.name }
                    )}
                    type="text"
                    {...register('name', { required: true })}
                />

                <label htmlFor="surname" className="text-gray-900 dark:text-gray-300">Apellido</label>
                <input
                    className={clsx(
                        "px-5 py-2 border bg-gray-200 dark:bg-gray-700 rounded mb-5 text-gray-900 dark:text-white",
                        { 'border-red-500': errors.surname }
                    )}
                    type="text"
                    {...register('surname', { required: true })}
                />

                <label htmlFor="whatsappNumber" className="text-gray-900 dark:text-gray-300">Número de WhatsApp</label>
                <input
                    className={clsx(
                        "px-5 py-2 border bg-gray-200 dark:bg-gray-700 rounded mb-5 text-gray-900 dark:text-white",
                        { 'border-red-500': errors.whatsappNumber }
                    )}
                    type="text"
                    {...register('whatsappNumber', { required: true })}
                />

                <label htmlFor="cbuAlias" className="text-gray-900 dark:text-gray-300">CBU o Alias</label>
                <input
                    className={clsx(
                        "px-5 py-2 border bg-gray-200 dark:bg-gray-700 rounded mb-5 text-gray-900 dark:text-white",
                        { 'border-red-500': errors.cbuAlias }
                    )}
                    type="text"
                    {...register('cbuAlias', { required: true })}
                />

                <label htmlFor="cuil" className="text-gray-900 dark:text-gray-300">CUIL</label>
                <input
                    className={clsx(
                        "px-5 py-2 border bg-gray-200 dark:bg-gray-700 rounded mb-5 text-gray-900 dark:text-white",
                        { 'border-red-500': errors.cuil }
                    )}
                    type="text"
                    {...register('cuil', { required: true })}
                />

                <label htmlFor="email" className="text-gray-900 dark:text-gray-300">Correo electrónico</label>
                <input
                    className={clsx(
                        "px-5 py-2 border bg-gray-200 dark:bg-gray-700 rounded mb-5 text-gray-900 dark:text-white",
                        { 'border-red-500': errors.email }
                    )}
                    type="email"
                    {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                />

                <label htmlFor="password" className="text-gray-900 dark:text-gray-300">Contraseña</label>
                <input
                    className={clsx(
                        "px-5 py-2 border bg-gray-200 dark:bg-gray-700 rounded mb-5 text-gray-900 dark:text-white",
                        { 'border-red-500': errors.password }
                    )}
                    type="password"
                    {...register('password', { required: true, minLength: 6 })}
                />

                <label htmlFor="comprobante" className="text-gray-900 dark:text-gray-300">Comprobante</label>
                <input
                    className={clsx(
                        "px-5 py-2 border bg-gray-200 dark:bg-gray-700 rounded mb-5 text-gray-900 dark:text-white",
                        { 'border-red-500': errors.comprobante }
                    )}
                    type="file"
                    {...register('comprobante', { required: true })}
                />

                <span className="text-red-500">{errorMessage}</span>

                <button className="btn-primary">Crear cuenta</button>

                <div className="flex items-center my-5">
                    <div className="flex-1 border-t border-gray-500"></div>
                    <div className="px-2 text-gray-800 dark:text-gray-300">O</div>
                    <div className="flex-1 border-t border-gray-500"></div>
                </div>

                <Link href="/auth/login" className="btn-secondary text-center">
                    Ingresar
                </Link>
            </form>
        </div>
    );
};
