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
