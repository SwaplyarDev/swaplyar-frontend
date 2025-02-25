type TIcon = 'success' | 'info' | 'warning' | 'error';
export interface IPopUpProps {
  icon: TIcon;
  title?: string;
  text?: string;
  isDark: boolean;
}
