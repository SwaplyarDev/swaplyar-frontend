# SwaplyAr Frontend 🚀

**SwaplyAr** nació de una simple necesidad: intercambiar saldo y asegurar que cada persona que lo utiliza reciba lo pactado, acompañándolos en todo el proceso. El crecimiento de SwaplyAr fue exponencial debido a la confiabilidad, seguridad y velocidad en cada operación. Somos una empresa en la que los usuarios confían plenamente, ya que la transparencia es uno de nuestros pilares fundamentales. Ayudamos a que cada persona consiga lo que está buscando de una manera fácil y protegida.

![Imagen o banner representativo del proyecto](public/images/lideresencambio.png)

## 🚀 Funcionalidad principal

- **Convertir y enviar dinero de PayPal a una cuenta bancaria en tres simples pasos:**
  1. **Cotizá y solicitá**: Consulta la cotización actual y solicita el cambio.
  2. **Seguí el Flujo**: Sigue las instrucciones detalladas para proceder con tu envío de manera segura y eficiente.
  3. **Recibí tu dinero**: Recibe los pesos argentinos cotizados directamente en tu cuenta bancaria.

## 🛠️ Tecnologías Utilizadas

### Frontend

- **Next.js 14.2.5:** Framework de React para aplicaciones web.
- **TypeScript 5:** Lenguaje de programación tipado.
- **Tailwind CSS 3.4.1:** Framework de utilidades CSS para diseñar rápidamente.
- **React 18:** Librería de JavaScript para construir interfaces de usuario.
- **React Hook Form 7.52.1:** Manejador de formularios eficiente y flexible para React.
- **Material UI (MUI) 5.16.5:** Conjunto de componentes de interfaz de usuario.
- **NextAuth.js 5.0.0-beta.20**: Autenticación para aplicaciones Next.js.
- **Flowbite React 0.10.1**: Biblioteca de componentes de interfaz de usuario basada en Tailwind CSS
- **@emotion/react & @emotion/styled 11.13.0:** Para estilos CSS-in-JS.
- **react-icons 5.2.1:** Colección de iconos populares.
- **sharp 0.33.4:** Biblioteca para procesamiento de imágenes.
- **use-debounce 10.0.0:** Hook para implementar debounce en eventos.
- **@fortawesome/\*:** Varias bibliotecas para el uso de iconos de Font Awesome.
- **@heroicons/react 2.1.4:** Conjunto de iconos SVG.

### Desarrollo

- **@types/node, @types/react, @types/react-dom:** Definiciones de tipos para mejorar el desarrollo con TypeScript.
- **@tailwindcss/forms 0.5.7:** Extensión de Tailwind CSS para estilos de formularios.
- **@vercel/style-guide 6.0.0:** Guía de estilo de Vercel (opcional, si se utiliza Vercel para despliegue).
- **eslint, eslint-config-next, eslint-config-prettier:** Herramientas para análisis y formateo de código.
- **postcss, prettier, prettier-plugin-tailwindcss:** Herramientas adicionales para formateo y procesamiento de CSS.

## 📂 Estructura del Proyecto

```
swaplyar-frontend/
├── app/               # (Nuevo) Directorio App Router (Next.js 13)
│   ├── api/           # Rutas de API
│   │   ├── auth/      # Rutas de NextAuth.js
│   │   └── paypal     # Rutas para la transaccion con PayPal
│   ├── info/          # Rutas relacionadas con información
│   │   ├── about-us/  # Página "Quienes Somos"
│   │   ├── help-center/ # Página de centro de ayuda
│   │   ├── how-to-use/  # Página "Cómo usar Swaplyar"
│   │   ├── loyalty-program/ # Página del programa de fidelización
│   │   ├── terms-and-conditions/ # Página de términos y condiciones
│   │   ├── warranty/  # Página de garantía
│   │   └── why-choose-swaplyar/ # Página "Por qué elegir Swaplyar"
│   ├── auth/          # Rutas relacionadas con autenticación
│   │   ├── login/     # Página de inicio de sesión
│   │   └── new-account/ # Página de registro de nueva cuenta
│   └── request/       # Rutas relacionadas con solicitudes de intercambio
│   └── layout.js      # Layout principal de la aplicación (opcional)
│   └── page.js        # Página de inicio (opcional)
├── components/        # Componentes reutilizables
│   ├── ui/            # Componentes de interfaz de usuario
│   ├── auth/          # Componentes relacionados con la autenticación
│   ├── clientWrapper/ # Componente para envolver vistas y gestionar estados de carga
│   ├── skeleton/      # Componentes Skeleton para estados de carga
│   ├── request/       # Componentes relacionados con solicitudes de intercambio
│   └── transactions   # Componentes relacionados con la calculadora
│        └── PayPal    # Componente principal donde se hace la transaccion con PayPal
├── hooks/             # Hooks personalizados
├── store/             # Configuración del store global
├── public/            # Archivos estáticos (imágenes, fuentes, etc.)
├── styles/            # Estilos globales (CSS o módulos CSS)
├── ... otros archivos y carpetas ...
└── package.json       # Dependencias y scripts del proyecto
```

**Explicación:**

- **`app/`:**
  - **`api/auth/[...nextauth]`:** Ruta de NextAuth.js para manejar la autenticación.
  - **`info/`, `auth/`, `request/`:** Carpetas para agrupar las rutas relacionadas con cada sección de la aplicación.
  - **`layout.js`:** Define el diseño general de la aplicación (opcional).
  - **`page.js`:** Define la página de inicio (opcional).
- **`components/`:** Contiene componentes reutilizables, organizados por funcionalidad.
  - **`ui/`:** Componentes de interfaz de usuario reutilizables.
  - **`auth/`:** Componentes relacionados con la autenticación, como formularios de inicio de sesión y registro.
  - **`clientWrapper/`:** Componente que envuelve vistas para gestionar estados de carga, mostrando skeletons cuando sea necesario.
  - **`skeleton/`:** Componentes Skeleton que se muestran mientras las vistas se están cargando, mejorando la experiencia de usuario.
  - **`request/`:** Componentes específicos para gestionar solicitudes de intercambio.
- **`hooks/`:** Contiene hooks personalizados para gestionar lógica compartida.
- **`store/`:** Contiene la configuración del store global, usando Zustand para manejar el estado global de la aplicación.
- **`public/`:** Almacena archivos estáticos accesibles públicamente, como imágenes y fuentes.
- **`styles/`:** Contiene estilos globales que se aplican a toda la aplicación.

## 🛣️ Rutas Principales

- `/`: Página de inicio.
- `/_not-found`: Página de error 404.
- `/auth/login`: Página de inicio de sesión.
- `/auth/new-account`: Página de registro de nueva cuenta.
- `/info/about-us`: Página "Quienes Somos".
- `/info/help-center`: Página de centro de ayuda.
- `/info/how-to-use`: Página "Cómo usar Swaplyar".
- `/info/loyalty-program`: Página del programa de fidelización.
- `/info/terms-and-conditions`: Página de términos y condiciones.
- `/info/warranty`: Página de garantía.
- `/info/why-choose-swaplyar`: Página "Por qué elegir Swaplyar".
- `/request`: Página principal de solicitudes de intercambio.

## 💲 PayPal

### Componente PayPal

- **Props Dinámicos**: El componente acepta los siguientes props:

  - `currency`: Moneda en la que se realiza el pago.
  - `amount`: Monto que se desea pagar.
  - `handleDirection`: Función callback que se ejecuta tras la aprobación del pago.

- **Creación de Ordenes**: El componente envía una solicitud `POST` a la API `/api/paypal` para crear una orden en PayPal utilizando los valores de `currency` y `amount`.

- **Captura de Pago**: Cuando el pago es aprobado (`onApprove`), se captura la información del pagador (nombre y correo) y se almacena en `localStorage`. Después, se ejecuta la función `handleDirection`.

- **Manejo de Errores y Cancelaciones**: En caso de que el usuario cancele el pago o haya algún error, se llama a la función `setPaypal()` para gestionar estos eventos.

### API de PayPal

La ruta `/api/paypal` en el servidor maneja la creación de órdenes en PayPal. Estos son los pasos que sigue:

- **Autenticación**: Se obtiene un token de acceso de PayPal utilizando las credenciales `clientId` y `secretKey`.

- **Creación de Orden**: Con el token, se crea una orden de compra a través de la API de PayPal, incluyendo la moneda y el monto proporcionado por el usuario.

- **Manejo de Errores**: Si ocurre algún problema al obtener el token o crear la orden, se devuelve un mensaje de error.

### Documentación y ayuda para entender PayPal

- **Documentación**: [PayPal REST API](https://developer.paypal.com/api/rest/)

- **Dashboard de desarrollo**: [PayPal Developer](https://developer.paypal.com/home/) aquí se obtienen tanto las cuentas de prueba y se registra la aplicación para su uso, cambiando el entorno de desarrollo a uno de producción.

- **Video explicativo**: [PayPal y Next.js](https://www.youtube.com/watch?v=ouqcQunk0fU&t=438s&ab_channel=FaztCode) un video explicativo en donde, si bien esta algo desactualizado ya que algunos parámetros cambian sirve para entender como funciona en general el comportamiento del código.

## 🚀 Configuración Inicial

1. **Clonar el Repositorio**

   ```bash
   git clone git@github.com:SwaplyAr/swaplyar-frontend.git
   cd swaplyar-frontend
   ```

2. **Instalación de Dependencias**

   ```bash
   npm install
   ```

3. **Variables de Entorno**

   Crea un archivo `.env.local` en la raíz del proyecto y agrega las variables de entorno necesarias.

   ```env
        # Authjs
        AUTH_SECRET='your_auth_secret'
        NEXTAUTH_SECRET='your_nextauth_secret'

        NEXTAUTH_URL="http://localhost:8080/api/"

        # AUTH_LOGIN_REDIRECT
        AUTH_LOGIN_REDIRECT="/products/company"
        APP_ENV="development"
        PROJECT_DIR="/ruta/al/directorio/del/proyecto"

        # GOOGLE
        AUTH_GOOGLE_ID="your_google_id"
        AUTH_GOOGLE_SECRET="your_google_secret"

        # GITHUB
        AUTH_GITHUB_ID="your_github_id"
        AUTH_GITHUB_SECRET="your_github_secret"

        # Resend
        AUTH_RESEND_KEY="your_resend_key"

        # FreeCurrencyAPI
        NEXT_PUBLIC_FREE_CURRENCY_API_KEY="fca_live_jDqUTcYj3stjWVDFqGZCmIBAt3hIEEtiTBPSMD3N"

        # Bluelytics
        NEXT_PUBLIC_BLUELYTICS_API_URL="https://api.bluelytics.com.ar/v2/latest"
        NEXT_PUBLIC_FREE_CURRENCY_APY_KEY=fca_live_jDqUTcYj3stjWVDFqGZCmIBAt3hIEEtiTBPSMD3N


        NEXT_PUBLIC_PAYPAL_CLIENT_ID="Acdb_cNhM35Qa7UNeEpdSePRS6Oswvx5ohLo1KEC04ADt64RGPUuOMUZXN_Kt84b93RXFFujqDKjB8u1"
   ```

4. **Ejecutar el Proyecto**

```bash
npm run dev
```

Accede al proyecto en [http://localhost:3000](http://localhost:3000).

## 🤖 Scripts Disponibles

- `npm run lint`: Ejecuta ESLint para analizar el código.
- `npm run dev`: Inicia el entorno de desarrollo.
- `npm run tsc`: Para chequear errores de tipado (TypeScript)
- `npm run format`: Formatea el código utilizando Prettier.
- `npm audit`: Para revisar vulnerabilidades de dependencias
- `npm run build --clean`: Compila la aplicación para producción.
- `npm run start`: Inicia el servidor de la aplicación compilada.

---

## 💪 Contribución

1. **Crea una nueva rama para tu funcionalidad o corrección desde la rama principal `developer`:**

   ```bash
   git checkout developer
   git pull origin developer
   git checkout -b feature/nueva-funcionalidad
   ```

2. **Realiza tus cambios.**

3. **Ejecuta pruebas y asegúrate de que todo funcione correctamente:**

   ```bash
   npm run lint
   npm run format
   npm run build --clean
   ```

4. **Confirma tus cambios y empuja la rama a tu repositorio:**

   ```bash
   git add .
   git commit -m "Descripción de los cambios"
   git push origin feature/nueva-funcionalidad
   ```

5. **Crea un Pull Request (PR) desde tu rama hacia la rama `developer`.**

6. **Antes de realizar el Pull Request, actualiza tu rama con los últimos cambios de `developer`:**

   ```bash
   git checkout developer
   git pull origin developer
   git checkout feature/nueva-funcionalidad
   git rebase developer
   ```

   **Si hay conflictos, resuélvelos y continua con el rebase:**

   ```bash
   git add .
   git rebase --continue
   ```

7. **Finalmente, empuja los cambios a tu rama remota:**

   ```bash
   git push origin feature/nueva-funcionalidad --force-with-lease
   ```

8. **Fusionar el PR::**

   - Después de fusionar, puedes eliminar la rama `feature/nueva-funcionalidad` tanto localmente como en el repositorio remoto.

   ```bash
   git checkout developer
   git pull origin developer
   git merge feature/nueva-funcionalidad
   ```

9. **Eliminar la Rama Temporal:**

   - Después de fusionar, puedes eliminar la rama `feature/nueva-funcionalidad` tanto localmente como en el repositorio remoto.

   ```bash
   git branch -d feature/nueva-funcionalidad
   git push origin --delete feature/nueva-funcionalidad
   ```

**¡Gracias por contribuir a SwaplyAr!** 😊

---

## 🚀 Despliegue

progreso...

---

**¡Gracias por leer!** Esperamos que esta documentación te sea útil. Si tienes alguna pregunta o necesitas más información, no dudes en contactarnos. 😊
