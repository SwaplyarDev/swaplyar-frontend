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
}

export type FormValues = {
  Nombre: string;
  Apellido: string;
  email: string;
  message: string;
};
