import CentroDeAyudaIcon from '@/components/icons-internal/icons-desktop/CentroDeAyuda/CentroDeAyudaIcon';
import CuentasAsociadasIcon from '@/components/icons-internal/icons-desktop/CuentasAsociadas/CuentasAsociadasIcon';
import HistorialIcon from '@/components/icons-internal/icons-desktop/historial/HistorialIcon';
import PlusRewardsIcon from '@/components/icons-internal/icons-desktop/PlusRewards/PlusRewardsIcon';
import SolicitudIcon from '@/components/icons-internal/icons-desktop/solicitud/SolicitudIcon';
import IconsTablet from '@/components/icons-internal/icons-tablet/IconsTablet';
import useWindowWidth from '@/hooks/useWindowWidth';
import { useState } from 'react';

enum TabView {
  NONE,
  SOLICITUD,
  HISTORIAL,
  PLUSREWARDS,
  CUENTASASOCIADAS,
  CENTRODEAYUDA,
}

export const NavIcons = ({
  setTabDesktop,
  tabDesktop,
}: {
  setTabDesktop: (tab: TabView) => void;
  tabDesktop: TabView;
}) => {
  const windowWidth = useWindowWidth();
  const isMobile = () => (windowWidth >= 390 ? false : true);
  return (
    <div className="relative flex w-full items-end justify-around">
      <div className="cursor-pointer" onClick={() => setTabDesktop(TabView.SOLICITUD)}>
        {tabDesktop === TabView.SOLICITUD ? (
          <IconsTablet text="Solcitud" classname="relative -translate-y-9 md:translate-y-9">
            <SolicitudIcon />
          </IconsTablet>
        ) : (
          <SolicitudIcon classname="lg:pr-5" />
        )}
      </div>
      <div className="cursor-pointer" onClick={() => setTabDesktop(TabView.HISTORIAL)}>
        {tabDesktop === TabView.HISTORIAL ? (
          <IconsTablet text="Historial" classname="relative -translate-y-9 md:translate-y-9">
            <HistorialIcon />
          </IconsTablet>
        ) : (
          <HistorialIcon classname="lg:pr-5" />
        )}
      </div>
      <div className="cursor-pointer" onClick={() => setTabDesktop(TabView.PLUSREWARDS)}>
        {tabDesktop === TabView.PLUSREWARDS ? (
          <IconsTablet text="Plus Rewards" classname="relative -translate-y-9 md:translate-y-9">
            <PlusRewardsIcon />
          </IconsTablet>
        ) : (
          <PlusRewardsIcon classname="lg:pr-5" />
        )}
      </div>
      <div className="cursor-pointer" onClick={() => setTabDesktop(TabView.CUENTASASOCIADAS)}>
        {tabDesktop === TabView.CUENTASASOCIADAS ? (
          <IconsTablet text="Cuentas" classname="relative -translate-y-9 md:translate-y-9">
            <CuentasAsociadasIcon />
          </IconsTablet>
        ) : (
          <CuentasAsociadasIcon classname="lg:pr-5" />
        )}
      </div>
      <div className="cursor-pointer" onClick={() => setTabDesktop(TabView.CENTRODEAYUDA)}>
        {tabDesktop === TabView.CENTRODEAYUDA ? (
          <IconsTablet text="Ayuda" classname="relative -translate-y-9 md:translate-y-9">
            <CentroDeAyudaIcon />
          </IconsTablet>
        ) : (
          <CentroDeAyudaIcon classname="lg:pr-5" />
        )}
      </div>
    </div>
  );
};
