# PayPal API y Componente

Este documento detalla la integración de la API de PayPal en la aplicación **SwaplyAr**, incluyendo el funcionamiento del componente PayPal y la ruta API correspondiente.

---

## 💻 Componente PayPal

El componente PayPal gestiona la interacción del usuario con el sistema de pagos.

### **Props**

El componente acepta los siguientes props dinámicos para personalizar su funcionamiento:

- **`currency`**: Especifica la moneda en la que se realizará el pago (por ejemplo, USD, EUR).
- **`amount`**: Define el monto total a pagar.
- **`handleDirection`**: Función callback que se ejecuta tras la aprobación del pago, permitiendo redirigir al usuario o realizar otras acciones.

### **Flujo del Componente**

1. **Creación de Órdenes**:

   - El componente realiza una solicitud `POST` a la API `/api/paypal` para crear una orden de compra.
   - Los valores de `currency` y `amount` se envían como parte de la solicitud.

2. **Captura de Pago**:

   - Cuando el usuario aprueba el pago (`onApprove`), el sistema captura la información del pagador:
     - Nombre completo del pagador.
     - Correo electrónico asociado al pago.
   - Estos datos se almacenan en `localStorage` para posibles usos posteriores.
   - Finalmente, se ejecuta la función `handleDirection` proporcionada como prop.

3. **Manejo de Errores y Cancelaciones**:
   - Si el usuario cancela el proceso de pago o ocurre un error durante el flujo:
     - Se ejecuta una función interna `setPaypal()` para manejar estos eventos.
     - Se puede mostrar un mensaje de error o redirigir al usuario.

---

## 🛠️ API `/api/paypal`

La ruta API de PayPal es responsable de manejar la comunicación con los servidores de PayPal. Aquí están los pasos que sigue:

### **1. Autenticación**

- **Proceso**:
  - La API obtiene un **token de acceso** de PayPal utilizando las credenciales `clientId` y `secretKey`.
- **Propósito**:
  - Este token se requiere para realizar solicitudes autorizadas a la API de PayPal.

### **2. Creación de Órdenes**

- **Proceso**:
  - Utilizando el token de acceso, la API realiza una solicitud para crear una orden en PayPal.
  - Incluye detalles como la moneda (`currency`) y el monto (`amount`).
- **Respuesta**:
  - Si la solicitud es exitosa, se devuelve un `orderID` al frontend, que se usa para continuar el flujo de pago.

### **3. Manejo de Errores**

- **Proceso**:
  - Si ocurre un problema durante la autenticación o la creación de la orden:
    - Se captura el error.
    - Se devuelve un mensaje detallado al cliente para informar sobre el problema.

---

## 🔗 Recursos de PayPal

### Documentación Oficial

1. [PayPal REST API](https://developer.paypal.com/api/rest/): Guía oficial para entender cómo usar las API de PayPal.
2. [PayPal Developer Dashboard](https://developer.paypal.com/home/): Portal para:
   - Crear aplicaciones.
   - Configurar credenciales.
   - Obtener cuentas de prueba.
   - Cambiar entre los entornos **sandbox** y **producción**.

### Recursos Educativos

- **Video Explicativo**:
  - [PayPal y Next.js](https://www.youtube.com/watch?v=ouqcQunk0fU&t=438s&ab_channel=FaztCode): Un tutorial introductorio sobre cómo integrar PayPal con Next.js. Aunque algunos parámetros pueden haber cambiado, sigue siendo útil para entender el flujo general.

---

## 🎯 Notas Adicionales

- **Entornos de PayPal**:

  - La integración se prueba inicialmente en el entorno **sandbox**.
  - Una vez funcional, se migra al entorno de **producción** utilizando las credenciales apropiadas.

- **Seguridad**:

  - Las credenciales (`clientId` y `secretKey`) nunca deben estar expuestas en el frontend.
  - Asegúrate de almacenarlas de manera segura en variables de entorno en el servidor.

- **Almacenamiento Local**:
  - La información del pagador almacenada en `localStorage` debe manejarse conforme a las regulaciones locales de protección de datos, como el GDPR.

Este archivo proporciona una guía completa sobre cómo funciona la integración de PayPal en la aplicación, tanto desde el frontend como desde el backend.
