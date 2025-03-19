````markdown
# 🚀 Configuración Inicial

Este archivo detalla los pasos necesarios para configurar y ejecutar el proyecto **SwaplyAr** en tu entorno local.

---

## 📂 1. Clonar el Repositorio

```bash
git clone git@github.com:SwaplyAr/swaplyar-frontend.git
cd swaplyar-frontend
```
````

---

## 📦 2. Instalación de Dependencias

Ejecuta el siguiente comando para instalar todas las dependencias necesarias:

```bash
npm install
```

---

## 🔧 3. Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto y agrega las variables de entorno necesarias. A continuación, un ejemplo:

<<<<<<< HEAD

```env
# Environment Configuration
APP_ENV=development

# Authentication Secrets
AUTH_SECRET='xiqS6G4DXQaH1Wc79cPhm0WhpMS6x2p7mEh3z+7/s9i52e8hz3tiUmfi1Fc='
NEXTAUTH_SECRET='cB9cQQRXYKn5/ptRnpPhZ2QHHqAIlwMAUh7Lmi4IU+ovkhKZNHhxN6Ki9lw='

# URLs
NEXTAUTH_URL="http://localhost:3000" # Local development URL
NEXT_PUBLIC_BACKEND_URL="https://apiswaplyar.vercel.app/api" # Production backend URL
# NEXT_PUBLIC_BACKEND_URL="http://localhost:8080/api" # Uncomment for local backend testing
# NEXTAUTH_URL="https://swaplyar.vercel.app" # Uncomment for production

# Redirects
AUTH_LOGIN_REDIRECT="/"

# Project Directory
PROJECT_DIR="/ruta/al/directorio/del/proyecto"

# Google Authentication
AUTH_GOOGLE_ID="your_google_id"
AUTH_GOOGLE_SECRET="your_google_secret"

# GitHub Authentication
AUTH_GITHUB_ID="your_github_id"
AUTH_GITHUB_SECRET="your_github_secret"

# Resend Configuration
AUTH_RESEND_KEY="your_resend_key"

# Currency APIs
NEXT_PUBLIC_FREE_CURRENCY_API_KEY="fca_live_YXQDkCwBwblsav5Dpe7zG0Rl1k6Nl4WuMEd1jHco&currencies=EUR%2CUSD%2CCAD"
NEXT_PUBLIC_BLUELYTICS_API_URL="https://api.bluelytics.com.ar/v2/latest"
NEXT_PUBLIC_FREE_CURRENCY_APY_KEY=fca_live_jDqUTcYj3stjWVDFqGZCmIBAt3hIEEtiTBPSMD3N

# PayPal Client ID
NEXT_PUBLIC_PAYPAL_CLIENT_ID="Acdb_cNhM35Qa7UNeEpdSePRS6Oswvx5ohLo1KEC04ADt64RGPUuOMUZXN_Kt84b93RXFFujqDKjB8u1"
```

> # **Nota**: Asegúrate de reemplazar los valores `your_google_id`, `your_google_secret`, y otros tokens con tus credenciales reales.
>
> > > > > > > 5abfc2417a7311da888256a3d1791e60c3dace22

---

## ▶️ 4. Ejecutar el Proyecto

Para iniciar el servidor de desarrollo, ejecuta:

```bash
npm run dev
```

Luego, accede al proyecto en:

- Entorno local: [http://localhost:3000](http://localhost:3000)
- Producción: [https://swaplyar.vercel.app](https://swaplyar.vercel.app)

---

## 🤖 Scripts Disponibles

Estos son los scripts disponibles en el proyecto para tareas comunes:

- **`npm run lint`**: Ejecuta ESLint para analizar el código y encontrar errores.
- **`npm run dev`**: Inicia el servidor en modo de desarrollo.
- **`npm run tsc`**: Verifica errores de tipado en TypeScript.
- **`npm run format`**: Aplica el formato del código utilizando Prettier.
- **`npm audit`**: Analiza vulnerabilidades en las dependencias instaladas.
- **`npm run build --clean`**: Compila la aplicación para el entorno de producción.
- **`npm run start`**: Inicia el servidor utilizando la compilación de producción.

---

## 💡 Notas Finales

1. **Asegúrate de tener Node.js y npm instalados** antes de comenzar.
   - Recomendación: Utiliza la última versión estable de Node.js (LTS).
2. **Configuración de Producción**:
   - Cambia las URLs en `.env.local` al entorno de producción antes del despliegue.
3. **Variables de Entorno Sensibles**:
   - Nunca incluyas este archivo en tu sistema de control de versiones (Git). Asegúrate de que `.env.local` esté en el archivo `.gitignore`.

Este documento cubre todo lo necesario para configurar y ejecutar el proyecto en tu máquina local. 🚀

```

```
