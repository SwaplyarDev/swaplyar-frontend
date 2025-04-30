'use client';
import { useState } from 'react';
import IconoFooter from './IconoFooter';
import {
  icono_solicitud,
  icono_cuentas,
  icono_transacciones,
  icono_plus,
  icono_ayuda,
  iconoDark_ayuda,
  iconoDark_cuentas,
  iconoDark_plus,
  iconoDark_solicitud,
  iconoDark_transacciones,
} from '@/utils/assets/imgDatabaseCloudinary';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';

const iconos = [
  {
    texto: 'Solicitud',
    iconoPath: icono_solicitud,
    iconoDarkPath: iconoDark_solicitud,
    linkPath: '/es/auth/solicitud',
  },
  {
    texto: 'Transacciones',
    iconoPath: icono_transacciones,
    iconoDarkPath: iconoDark_transacciones,
    linkPath: '/es/auth/historial',
  },
  { texto: 'Plus Rewards', iconoPath: icono_plus, iconoDarkPath: iconoDark_plus, linkPath: '/es/auth/plus-rewards' },
  { texto: 'Cuentas', iconoPath: icono_cuentas, iconoDarkPath: iconoDark_cuentas, linkPath: '/es/auth/cuentas' },
  { texto: 'Centro de Ayuda', iconoPath: icono_ayuda, iconoDarkPath: iconoDark_ayuda, linkPath: '#' },
];

export default function IconosFooter() {
  const { isDark } = useDarkTheme();
  const [activoIndex, setActivoIndex] = useState<number | null>(null);

  return (
    <div className="z-40 flex h-16 flex-row justify-center self-end sm-tablet2:hidden">
      {iconos.map((el, index) => (
        <IconoFooter
          key={index}
          iconoPath={isDark ? el.iconoDarkPath : el.iconoPath}
          texto={el.texto}
          activo={activoIndex === index}
          onClick={() => setActivoIndex(index)}
          linkPath={el.linkPath}
        />
      ))}
    </div>
  );
}
