// app/types/data.ts

export interface ExchangeRate {
  blue: {
    value_buy: number; // Tasa de compra del dólar blue
  };
  // Puedes agregar otros tipos de cambio si es necesario (oficial, solidario, etc.)
}

export interface System {
  id: string; // Identificador único del sistema (paypal, payoneer-usd, etc.)
  name: string; // Nombre del sistema de pago
  logo: string; // Ruta a la imagen del logo
  logoDark: string; // Ruta a la imagen del logo en modo oscuro
  isDisabled: boolean; // Indica si el sistema de pago es deshabilitado
  coin: string; // Indica el tipo de moneda
  paymentMethod: string; // Indica el tipo de pago
  coinSign: string; // Indica el signo de la moneda
}

export type FormValues = {
  Nombre: string;
  Apellido: string;
  email: string;
  message: string;
};

export type RequestSearch = {
  numberOfRequest: string;
  lastNameRequest: string;
};
