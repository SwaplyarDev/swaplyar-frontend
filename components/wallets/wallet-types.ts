export interface DetailValue {
  text: string;
  color?: string;
}

export interface WalletDetail {
  label: string;
  value: DetailValue;
}

export interface WalletType {
  id: string;
  type: string;
  name: string;
  identifier: string;
  details: WalletDetail[];
}
