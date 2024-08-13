Esta documentación cubre la descripción del proyecto, la configuración inicial, y las instrucciones para desarrolladores:

---

# SwaplyAr Frontend

## Descripción

**SwaplyAr** nació de una simple necesidad: intercambiar saldo y asegurar que cada persona que lo utiliza reciba lo pactado, acompañándolos en todo el proceso. El crecimiento de SwaplyAr fue exponencial debido a la confiabilidad, seguridad y velocidad en cada operación. Somos una empresa en la que los usuarios confían plenamente, ya que la transparencia es uno de nuestros pilares fundamentales. Ayudamos a que cada persona consiga lo que está buscando de una manera fácil y protegida.

**Funcionalidad principal:**

- Convertir y enviar dinero de PayPal a una cuenta bancaria en tres simples pasos:
  1. **Cotizá y solicitá**: Consulta la cotización actual y solicita el cambio.
  2. **Seguí el Flujo**: Sigue las instrucciones detalladas para proceder con tu envío de manera segura y eficiente.
  3. **Recibí tu dinero**: Recibe los pesos argentinos cotizados directamente en tu cuenta bancaria.

## Tecnologías Utilizadas

- **Next.js 14.2.5**: Framework de React para aplicaciones web.
- **TypeScript 5**: Lenguaje de programación tipado.
- **Tailwind CSS 3.4.1**: Framework de utilidades CSS para diseñar rápidamente.
- **React 18**: Librería de JavaScript para construir interfaces de usuario.
- **React Hook Form 7.52.1**: Manejador de formularios eficiente y flexible para React.
- **Material UI (MUI) 5.16.5**: Conjunto de componentes de interfaz de usuario.
- **NextAuth.js 5.0.0-beta.20**: Autenticación para aplicaciones Next.js.

## Estructura del Proyecto

El proyecto está organizado de la siguiente manera:

- **components/**: Contiene todos los componentes reutilizables y específicos de cada ruta.
  - **/ui**: Subcomponentes de interfaz de usuario reutilizables.
  - **/auth**: Componentes relacionados con la autenticación.
  - **/request**: Componentes para manejar las solicitudes de intercambio de saldo.

## Configuración Inicial

### 1. Clonar el Repositorio

```bash
git clone git@github.com:SwaplyAr/swaplyar-frontend.git
cd swaplyar-frontend
```

### 2. Instalación de Dependencias

Asegúrate de tener [Node.js](https://nodejs.org/) instalado. Luego, instala las dependencias del proyecto:

```bash
npm install
```

### 3. Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto y agrega las variables de entorno necesarias. Un ejemplo de variables que podrías necesitar:

```env
NEXT_PUBLIC_API_URL=https://api.swaplyar.com
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
```

### 4. Ejecutar el Proyecto

Para iniciar el entorno de desarrollo:

```bash
npm run dev
```

Accede al proyecto en [http://localhost:3000](http://localhost:3000).

## Rutas Principales

- **/**: Página de inicio.
- **/info**: Información sobre el servicio.
- **/auth**: Página de autenticación.
- **/request**: Solicitudes de intercambio de saldo.

## Contribución

Si deseas contribuir al proyecto, sigue los siguientes pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz commit (`git commit -m 'Agregar nueva funcionalidad'`).
4. Envía un pull request.

## Despliegue

Este proyecto está configurado para desplegarse en plataformas como [Vercel](https://vercel.com/) o [Netlify](https://www.netlify.com/). Asegúrate de que las variables de entorno estén configuradas en la plataforma de despliegue.

---
