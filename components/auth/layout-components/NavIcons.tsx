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

export enum ActiveTab {
  SOLICITUD = 'solicitud',
  HISTORIAL = 'historial',
  PLUSREWARDS = 'plus-rewards',
  CUENTASASOCIADAS = 'cuentas',
  CENTRODEAYUDA = 'centro-de-ayuda',
}
type NavIconsProps = {
  isFooter?: boolean;
};
export const NavIcons = ({ isFooter }: NavIconsProps) => {
  const pathname = usePathname();
  const isActive = pathname.split('/')[3];
  const { isDark } = useDarkTheme();
  
  const navItems = [
    { 
      key: ActiveTab.SOLICITUD, 
      href: '/es/auth/solicitud', 
      text: 'Solicitud', 
      icon: SolicitudIcon,
      activeKey: 'solicitud'
    },
    { 
      key: ActiveTab.HISTORIAL, 
      href: '/es/auth/historial', 
      text: 'Historial', 
      icon: HistorialIcon,
      activeKey: ActiveTab.HISTORIAL
    },
    { 
      key: ActiveTab.PLUSREWARDS, 
      href: '/es/auth/plus-rewards', 
      text: 'Plus Rewards', 
      icon: PlusRewardsIcon,
      activeKey: ActiveTab.PLUSREWARDS
    },
    { 
      key: ActiveTab.CUENTASASOCIADAS, 
      href: '/es/auth/cuentas', 
      text: 'Cuentas', 
      icon: CuentasAsociadasIcon,
      activeKey: ActiveTab.CUENTASASOCIADAS
    },
    { 
      key: ActiveTab.CENTRODEAYUDA, 
      href: '/es/auth/centro-de-ayuda', 
      text: 'Centro de Ayuda', 
      icon: CentroDeAyudaIcon,
      activeKey: ActiveTab.CENTRODEAYUDA
    }
  ];

  return (
    <div className="relative flex w-full items-end justify-around">
      {navItems.map((item, index) => {
        const IconComponent = item.icon;
        const isItemActive = isActive === item.activeKey;
        const isLastItem = index === navItems.length - 1;
        const isPaddingRight = !isLastItem && !(navItems[index + 1] && isActive === navItems[index + 1].activeKey);
        return (
          <div
            key={item.key}
            className={
              isFooter && isItemActive
                ? `relative bottom-0 w-full`
                : 'h-full'
            }
          >
            <div className="flex items-center justify-center h-full relative -mr-[0.5px]">
              {/* Clip-path background para elemento activo */}
              {isItemActive && (
                <div className='overflow-x-hidden absolute h-full w-[202px] inset-0'>
                  <div className={`-top-[1px] h-full mask-icon w-[202px] ${isDark ? 'bg-custom-whiteD' : 'bg-nav-blue'} absolute inset-0`} />
                </div>
              )}

              <Link href={item.href} className={`${!isActive && 'cursor-pointer'} relative z-10 h-full`}>
                {isItemActive ? (
                  <IconsTablet 
                    text={item.text} 
                    classname={`relative -translate-y-4 xs:translate-y-[50px]`}
                  >
                    <IconComponent />
                  </IconsTablet>
                ) : (
                    <IconComponent classname={`header-icon-svg h-full content-end ${isPaddingRight ? "lg:pr-4" : ""} ${isDark ? 'bg-custom-whiteD' : 'bg-nav-blue'}`} />
                )}
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};
