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
├── components/
│   ├── ui/
│   ├── auth/
│   └── request/
├── pages/
├── public/
├── styles/
├── ... otros archivos y carpetas ...
└── package.json
```

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
   NEXT_PUBLIC_API_URL=https://api.swaplyar.com
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key
   ```

4. **Ejecutar el Proyecto**

   ```bash
   npm run dev
   ```

   Accede al proyecto en [http://localhost:3000](http://localhost:3000).

## 🤖 Scripts Disponibles

* `npm run dev`: Inicia el entorno de desarrollo.
* `npm run build`: Compila la aplicación para producción.
* `npm run start`: Inicia el servidor de la aplicación compilada.
* `npm run lint`: Ejecuta ESLint para analizar el código.
* `npm run format`: Formatea el código utilizando Prettier.

## 🛣️ Rutas Principales

* `/`: Página de inicio.
* `/info`: Información sobre el servicio.
* `/auth`: Página de autenticación.
* `/request`: Solicitudes de intercambio de saldo.

## 💪 Contribución

Si deseas contribuir al proyecto, sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz commit (`git commit -m 'Agregar nueva funcionalidad'`).
4. Envía un pull request.

## 🚀 Despliegue

Este proyecto está configurado para desplegarse en plataformas como Vercel o Netlify. Asegúrate de que las variables de entorno estén configuradas en la plataforma de despliegue.

---

**¡Gracias por leer!** Esperamos que esta documentación te sea útil. Si tienes alguna pregunta o necesitas más información, no dudes en contactarnos. 😊
