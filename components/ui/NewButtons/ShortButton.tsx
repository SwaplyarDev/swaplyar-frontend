'use client';
import Link from 'next/link';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import useStore from '@/store/authViewStore';
import clsx from 'clsx';

interface ShortButtonProps {
    href?: string; // si viene on href, es un Link; si no, un button
    text: string;
    onButtonClick?: () => void;
    fondoOscuro?: boolean;
    transparent?: boolean; // 🆕 nueva prop para fondo transparente (light/dark)
    className?: string; // por si se queiren agregar estilos especiales en algun uso
    isDarkOverride?: boolean; // 🆕 para forzar modo oscuro o claro en componentes montados (swal por ejemplo)
}

export default function ShortButton({
    href,
    text,
    onButtonClick,
    fondoOscuro = false,
    transparent = false,
    className = '',
    isDarkOverride = false
}: ShortButtonProps) {
    const theme = useDarkTheme();
    const isDark = isDarkOverride ?? theme.isDark;


    const handleClick = () => {
        if (onButtonClick) onButtonClick();
    };

    const baseClass = `
    relative flex items-center justify-center
    rounded-3xl border p-3 font-titleFont font-semibold
    h-[38px] w-[334px] sm:h-[45px] sm:w-[340px] lg:h-[48px] lg:w-[340px]
  `;

    const colorClass = transparent
        ? clsx(
            'bg-transparent border-darkText text-darkText',
            'dark:bg-transparent dark:border-darkText dark:text-darkText',
            isDark ? 'buttonSecondDark' : 'buttonSecond'
        )
        : fondoOscuro
            ? clsx(
                'border-buttonsLigth bg-buttonsLigth text-white',
                'dark:border-darkText dark:bg-darkText dark:text-lightText',
                isDark ? 'buttonSecondDark' : 'buttonSecond'
            )
            : clsx(
                'border-buttonsLigth text-buttonsLigth',
                'dark:border-darkText dark:text-darkText',
                isDark ? 'buttonSecondDark' : 'buttonSecond'
            );

    const finalClass = clsx(baseClass, colorClass, className);

    // 🔁 Si hay href, usamos <Link>; si no, un <button>
    if (href) {
        return (
            <Link href={href} onClick={handleClick} className={finalClass}>
                {text}
            </Link>
        );
    }

    return (
        <button onClick={handleClick} className={finalClass}>
            {text}
        </button>
    );
}
