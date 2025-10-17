"use client";

import { useDarkTheme } from "@/components/ui/theme-Provider/themeProvider";
import { useRef } from "react";
import LoadingGif from "@/components/ui/LoadingGif/LoadingGif";

import clsx from "clsx";

interface UpdatePictureModalProps {
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    loading: boolean;
    file: File | null;

}

export const UpdatePictureModal = ({
    handleFileChange,
    loading,
    file,

}: UpdatePictureModalProps) => {
    const { isDark } = useDarkTheme();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleSelectClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="mt-6">

            {/* Input oculto */}
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
            />

            <div className={`flex flex-col sm:flex-row  items-center lg:items-start justify-end gap-4 ${file && "justify-between"}`}>
                {/* Botón para seleccionar/cambiar archivo */}
                <button
                    type="button"
                    disabled={loading}
                    onClick={handleSelectClick}
                    className={clsx(
                        loading
                            ? 'border-disabledButtonsLigth  dark:border-disabledButtonsDark  dark:text-darkText'
                            : isDark
                                ? 'buttonSecondDark dark:text-lightText'
                                : 'buttonSecond',
                        !file &&
                        "bg-buttonsLigth text-white",
                        'relative w-[174px] h-[48px] items-center justify-center rounded-3xl border border-buttonsLigth text-[16px]  px-[14px] py-[12px] font-titleFont font-semibold  transition-opacity hover:opacity-90 disabled:opacity-50 dark:border-darkText dark:bg-disabledButtonsDark dark:text-darkText'
                    )}
                >
                    {file ? "Cambiar foto" : "Cargar foto"}
                </button>

                {/* Botón para guardar - SOLO cuando hay archivo seleccionado */}
                {file && (
                    loading ? (
                        <div className="w-[174px] h-[48px] flex justify-center ">
                            <LoadingGif color={isDark ? '#ebe7e0' : '#012c8a'} size="40px" />
                        </div>
                    ) : (
                        <button

                            type="submit"
                            className={clsx(

                                loading
                                    ? 'border-disabledButtonsLigth bg-disabledButtonsLigth dark:border-disabledButtonsDark dark:bg-disabledButtonsDark dark:text-darkText'
                                    : isDark
                                        ? 'buttonSecondDark dark:text-lightText'
                                        : 'buttonSecond',


                                'relative w-[174px] h-[48px] items-center justify-center rounded-3xl border border-buttonsLigth bg-buttonsLigth text-[16px]  px-[14px] py-[12px] font-titleFont font-semibold text-darkText transition-opacity hover:opacity-90 disabled:opacity-50 dark:border-darkText dark:bg-disabledButtonsDark dark:text-darkText'
                            )}
                        >
                            Guardar foto
                        </button>
                    )
                )}


            </div>
        </div>
    );
};