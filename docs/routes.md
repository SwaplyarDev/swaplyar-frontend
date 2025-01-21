# Rutas de SwaplyAr 🚀

Este documento describe las rutas principales de la aplicación **SwaplyAr**, organizadas por secciones funcionales y propósitos.

---

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
- `/repentance`: Página principal de arrepentimiento.

## 🗺️ Rutas Generales

- **`/` - Página de Inicio**

  - **Descripción:** La página principal que da la bienvenida a los usuarios.
  - **Componentes Clave:**
    - Información introductoria.
    - Botones de acceso rápido a las secciones clave.

- **`/_not-found` - Error 404**
  - **Descripción:** Página que se muestra cuando una ruta no existe.
  - **Componentes Clave:**
    - Mensaje explicativo.
    - Botón para volver al inicio.

---

## 🔒 Rutas de Autenticación

- **`/auth/login` - Iniciar Sesión**

  - **Descripción:** Página para que los usuarios inicien sesión en la plataforma.
  - **Componentes Clave:**
    - Formulario de autenticación.
    - Botón de acceso con Google u otras plataformas.

- **`/auth/new-account` - Crear Nueva Cuenta**
  - **Descripción:** Página para el registro de nuevos usuarios.
  - **Componentes Clave:**
    - Formulario de registro.
    - Validación de campos requeridos.

---

## 📄 Rutas de Información

- **`/info/about-us` - Sobre Nosotros**

  - **Descripción:** Página con información sobre la misión y visión de SwaplyAr.
  - **Componentes Clave:**
    - Texto estático.
    - Sección de contacto.

- **`/info/help-center` - Centro de Ayuda**

  - **Descripción:** Proporciona soporte y respuestas a preguntas frecuentes.
  - **Componentes Clave:**
    - FAQ.
    - Botones de contacto.

- **`/info/how-to-use` - Cómo Usar SwaplyAr**

  - **Descripción:** Instrucciones para que los usuarios aprovechen al máximo la plataforma.
  - **Componentes Clave:**
    - Tutoriales.
    - Consejos para nuevos usuarios.

- **`/info/loyalty-program` - Programa de Fidelización**

  - **Descripción:** Explica los beneficios y recompensas del programa de fidelización.
  - **Componentes Clave:**
    - Detalles del programa.
    - Formulario de inscripción.

- **`/info/terms-and-conditions` - Términos y Condiciones**

  - **Descripción:** Página con los términos legales de uso de la plataforma.
  - **Componentes Clave:**
    - Texto estático.
    - Sección de aceptación.

- **`/info/warranty` - Garantía**

  - **Descripción:** Información sobre políticas de garantía de productos.
  - **Componentes Clave:**
    - Detalles de cobertura.
    - Botones para iniciar reclamaciones.

- **`/info/why-choose-swaplyar` - Por qué Elegir SwaplyAr**
  - **Descripción:** Ventajas y diferenciadores de la plataforma.
  - **Componentes Clave:**
    - Listado de beneficios.
    - Testimonios de usuarios.

---

## 💼 Rutas Funcionales

- **`/request` - Solicitudes de Intercambio**

  - **Descripción:** Página principal para gestionar solicitudes de intercambio.
  - **Componentes Clave:**
    - Listado de solicitudes.
    - Formulario para crear nuevas solicitudes.

- **`/repentance` - Arrepentimiento**
  - **Descripción:** Página para gestionar solicitudes de arrepentimiento o devoluciones.
  - **Componentes Clave:**
    - Formulario para iniciar un arrepentimiento.
    - Lista de solicitudes enviadas.

---

## 📂 Estructura del Proyecto

### **Carpetas Clave**

- **`app/`**

  - **Rutas de API:**
    - **`api/auth/[...nextauth]`:** Ruta para manejar la autenticación con NextAuth.js.
  - **Agrupación por Sección:**
    - `info/`, `auth/`, `request/`, `repentance/`: Carpetas para organizar rutas relacionadas.
  - **Layouts y Páginas:**
    - **`layout.js`:** Define el diseño general de la aplicación (opcional).
    - **`page.js`:** Define la página de inicio (opcional).

- **`components/`**

  - **`ui/`:** Componentes de interfaz de usuario reutilizables.
  - **`auth/`:** Componentes para manejar autenticación (por ejemplo, formularios de inicio de sesión y registro).
  - **`clientWrapper/`:** Componente para gestionar estados de carga, mostrando skeletons si es necesario.
  - **`skeleton/`:** Componentes Skeleton para mejorar la experiencia de usuario.
  - **`request/`:** Componentes específicos para gestionar solicitudes de intercambio.
  - **`repentance/`:** Componentes específicos para solicitudes de arrepentimiento.

- **`hooks/`**

  - Hooks personalizados para manejar lógica compartida.

- **`store/`**

  - Configuración del estado global utilizando **Zustand**.

- **`public/`**

  - Almacén de archivos estáticos accesibles públicamente, como imágenes y fuentes.

- **`styles/`**
  - Estilos globales que se aplican en toda la aplicación.

---

## 📝 Notas

1. **Autenticación:**
   - Las rutas protegidas dependen de la validación de un token generado por NextAuth.
2. **Agrupación de rutas:**
   - Las carpetas `info/`, `auth/`, `request/` y `repentance/` organizan las vistas relacionadas para mantener un proyecto modular y escalable.
3. **Experiencia de usuario:**
   - Utiliza Skeletons (`skeleton/`) para cargar vistas con datos dinámicos, mejorando la percepción de velocidad.
4. **Estado global:**
   - **Zustand** gestiona el estado global y asegura una experiencia consistente en toda la aplicación.
