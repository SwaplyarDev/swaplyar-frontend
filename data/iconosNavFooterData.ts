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

export const iconos = [
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
  {
    texto: 'Centro de Ayuda',
    iconoPath: icono_ayuda,
    iconoDarkPath: iconoDark_ayuda,
    linkPath: '/es/auth/centro-de-ayuda',
  },
];
