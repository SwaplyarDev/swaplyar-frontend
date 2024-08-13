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

* **Next.js 14.2.5:** Framework de React para aplicaciones web.
* **TypeScript 5:** Lenguaje de programación tipado.
* **Tailwind CSS 3.4.1:** Framework de utilidades CSS para diseñar rápidamente.
* **React 18:** Librería de JavaScript para construir interfaces de usuario.
* **React Hook Form 7.52.1:** Manejador de formularios eficiente y flexible para React.
* **Material UI (MUI) 5.16.5:** Conjunto de componentes de interfaz de usuario.
* **NextAuth.js 5.0.0-beta.20**: Autenticación para aplicaciones Next.js.
* **Flowbite React 0.10.1**: Biblioteca de componentes de interfaz de usuario basada en Tailwind CSS
* **@emotion/react & @emotion/styled 11.13.0:** Para estilos CSS-in-JS.
* **react-icons 5.2.1:** Colección de iconos populares.
* **sharp 0.33.4:** Biblioteca para procesamiento de imágenes.
* **use-debounce 10.0.0:** Hook para implementar debounce en eventos.
* **@fortawesome/*:** Varias bibliotecas para el uso de iconos de Font Awesome.
* **@heroicons/react 2.1.4:** Conjunto de iconos SVG.

### Desarrollo

* **@types/node, @types/react, @types/react-dom:** Definiciones de tipos para mejorar el desarrollo con TypeScript.
* **@tailwindcss/forms 0.5.7:** Extensión de Tailwind CSS para estilos de formularios.
* **@vercel/style-guide 6.0.0:** Guía de estilo de Vercel (opcional, si se utiliza Vercel para despliegue).
* **eslint, eslint-config-next, eslint-config-prettier:** Herramientas para análisis y formateo de código.
* **postcss, prettier, prettier-plugin-tailwindcss:** Herramientas adicionales para formateo y procesamiento de CSS.


## 📂 Estructura del Proyecto

```
swaplyar-frontend/
├── app/               # (Nuevo) Directorio App Router (Next.js 13)
│   ├── api/           # Rutas de API
│   │   └── auth/      # Rutas de NextAuth.js
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
│   └── request/       # Componentes relacionados con solicitudes
├── public/            # Archivos estáticos (imágenes, fuentes, etc.)
├── styles/            # Estilos globales (CSS o módulos CSS)
├── ... otros archivos y carpetas ...
└── package.json
```

**Explicación:**

* **`app/`:**
    * **`api/auth/[...nextauth]`:** Ruta de NextAuth.js para manejar la autenticación.
    * **`info/`, `auth/`, `request/`:** Carpetas para agrupar las rutas relacionadas con cada sección de la aplicación.
    * **`layout.js`:** Define el diseño general de la aplicación (opcional).
    * **`page.js`:** Define la página de inicio (opcional).
* **`components/`:** Contiene componentes reutilizables, organizados por funcionalidad.
* **`public/`:** Almacena archivos estáticos accesibles públicamente.
* **`styles/`:** Contiene estilos globales que se aplican a toda la aplicación.


## 🛣️ Rutas Principales

* `/`: Página de inicio.
* `/_not-found`: Página de error 404.
* `/auth/login`: Página de inicio de sesión.
* `/auth/new-account`: Página de registro de nueva cuenta.
* `/info/about-us`: Página "Quienes Somos".
* `/info/help-center`: Página de centro de ayuda.
* `/info/how-to-use`: Página "Cómo usar Swaplyar".
* `/info/loyalty-program`: Página del programa de fidelización.
* `/info/terms-and-conditions`: Página de términos y condiciones.
* `/info/warranty`: Página de garantía.
* `/info/why-choose-swaplyar`: Página "Por qué elegir Swaplyar".
* `/request`: Página principal de solicitudes de intercambio.

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
   NEXT_PUBLIC_API_URL=[https://api.swaplyar.com](https://api.swaplyar.com)
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key
   ```

4. **Ejecutar el Proyecto**

   ```bash
   npm run dev
   ```

   Accede al proyecto en [http://localhost:3000](http://localhost:3000).

## 🤖 Scripts Disponibles

* `npm run lint`: Ejecuta ESLint para analizar el código.
* `npm run format`: Formatea el código utilizando Prettier.
* `npm run dev`: Inicia el entorno de desarrollo.
* `npm run build`: Compila la aplicación para producción.
* `npm run start`: Inicia el servidor de la aplicación compilada.

## 💪 Contribución

Si deseas contribuir al proyecto, sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios.
4. **Ejecuta `npm run format` para formatear tu código con Prettier.**
5. **Ejecuta `npm run lint` para verificar que no haya errores en el código.**
6. Haz commit de tus cambios (`git commit -m 'Agregar nueva funcionalidad'`).
7. **Actualiza tu rama con los últimos cambios de la rama principal:**
   ```bash
   git fetch origin
   git checkout main
   git pull origin main
   git checkout feature/nueva-funcionalidad
   git merge main
   ```
8. **Ejecuta `npm run build --clean` para asegurarte de que la compilación se realice correctamente y se limpien los archivos generados previamente.**
9. Envía un pull request.

**¡Gracias por contribuir a SwaplyAr!** 😊

## 🚀 Despliegue

Este proyecto está configurado para desplegarse en plataformas como Vercel o Netlify. Asegúrate de que las variables de entorno estén configuradas en la plataforma de despliegue.

---

**¡Gracias por leer!** Esperamos que esta documentación te sea útil. Si tienes alguna pregunta o necesitas más información, no dudes en contactarnos. 😊