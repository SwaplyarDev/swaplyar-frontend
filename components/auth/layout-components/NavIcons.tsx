'use client';
import CentroDeAyudaIcon from '@/components/icons-internal/icons-desktop/CentroDeAyuda/CentroDeAyudaIcon';
import CuentasAsociadasIcon from '@/components/icons-internal/icons-desktop/CuentasAsociadas/CuentasAsociadasIcon';
import HistorialIcon from '@/components/icons-internal/icons-desktop/historial/HistorialIcon';
import PlusRewardsIcon from '@/components/icons-internal/icons-desktop/PlusRewards/PlusRewardsIcon';
import SolicitudIcon from '@/components/icons-internal/icons-desktop/solicitud/SolicitudIcon';
import IconsTablet from '@/components/icons-internal/icons-tablet/IconsTablet';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Agregar carga dinamica componentizando

export enum ActiveTab {
  SOLICITUD = 'solicitud',
  HISTORIAL = 'historial',
  PLUSREWARDS = 'plus-rewards',
  CUENTASASOCIADAS = 'cuentas',
  CENTRODEAYUDA = 'ayuda',
}
type NavIconsProps = {
  isFooter?: boolean;
};
export const NavIcons = ({ isFooter }: NavIconsProps) => {
  const pathname = usePathname();
  const isActive = pathname.split('/')[3];
  const { isDark } = useDarkTheme();
  return (
    <div className="relative flex w-full items-end justify-around">
      <div
        className={
          isFooter && isActive === 'solicitud'
            ? `${isDark ? 'montanaDark-footer' : 'montana-footer'} relative bottom-0 w-full`
            : ''
        }
      >
        <div className="flex items-center justify-center">
          <Link href={`/es/auth/solicitud`} className="cursor-pointer">
            {isActive === 'solicitud' ? (
              <IconsTablet text="Solicitud" classname="relative -translate-y-6 xs:translate-y-9 lg:mr-5">
                <SolicitudIcon />
              </IconsTablet>
            ) : (
              <SolicitudIcon classname="lg:pr-5" />
            )}
          </Link>
        </div>
      </div>
      <div
        className={
          isFooter && isActive === ActiveTab.HISTORIAL
            ? `${isDark ? 'montanaDark-footer' : 'montana-footer'} relative bottom-0 w-full`
            : ''
        }
      >
        <div className="flex items-center justify-center">
          <Link href={`/es/auth/historial`} className="cursor-pointer">
            {isActive === ActiveTab.HISTORIAL ? (
              <IconsTablet text="Historial" classname="relative -translate-y-6 xs:translate-y-9 lg:mr-5">
                <HistorialIcon />
              </IconsTablet>
            ) : (
              <HistorialIcon classname="lg:pr-5" />
            )}
          </Link>
        </div>
      </div>
      <div
        className={
          isFooter && isActive === ActiveTab.PLUSREWARDS
            ? `${isDark ? 'montanaDark-footer' : 'montana-footer'} relative bottom-0 w-full`
            : ''
        }
      >
        <div className="flex items-center justify-center">
          <Link href={`/es/auth/plus-rewards`} className="cursor-pointer">
            {isActive === ActiveTab.PLUSREWARDS ? (
              <IconsTablet text="Plus Rewards" classname="relative -translate-y-6 xs:translate-y-9 lg:mr-5">
                <PlusRewardsIcon />
              </IconsTablet>
            ) : (
              <PlusRewardsIcon classname="lg:pr-5" />
            )}
          </Link>
        </div>
      </div>
      <div
        className={
          isFooter && isActive === ActiveTab.CUENTASASOCIADAS
            ? `${isDark ? 'montanaDark-footer' : 'montana-footer'} relative bottom-0 w-full`
            : ''
        }
      >
        <div className="flex items-center justify-center">
          <Link href={`/es/auth/cuentas`} className="cursor-pointer">
            {isActive === ActiveTab.CUENTASASOCIADAS ? (
              <IconsTablet text="Cuentas" classname="relative -translate-y-6 xs:translate-y-9 lg:mr-5">
                <CuentasAsociadasIcon />
              </IconsTablet>
            ) : (
              <CuentasAsociadasIcon classname="lg:pr-5" />
            )}
          </Link>
        </div>
      </div>
      <div
        className={
          isFooter && isActive === ActiveTab.CENTRODEAYUDA
            ? `${isDark ? 'montanaDark-footer' : 'montana-footer'} relative bottom-0 w-full`
            : ''
        }
      >
        <div className="flex items-center justify-center">
          <Link href={`/es/auth/ayuda`} className="cursor-pointer">
            {isActive === ActiveTab.CENTRODEAYUDA ? (
              <IconsTablet text="Ayuda" classname="relative -translate-y-6 xs:translate-y-9">
                <CentroDeAyudaIcon />
              </IconsTablet>
            ) : (
              <CentroDeAyudaIcon classname="" />
            )}
          </Link>
        </div>
      </div>
    </div>
  );
};
