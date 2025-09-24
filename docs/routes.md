# Rutas de SwaplyAr 🚀

Este documento describe las rutas principales de la aplicación **SwaplyAr**, organizadas por secciones funcionales y propósitos. Se ha definido `es` como el locale para la organización de las rutas.

---

## 🛣️ Rutas Principales

- `/es/inicio`: Página de inicio.
- `/es/iniciar-sesion/`: Página para iniciar sesión.
- `/es/registro/`: Página para registrarse.
- `/es/formulario-de-solicitud/`: Sección principal para solicitudes.
- `/es/terminos-y-condiciones/`: Página de términos y condiciones.
- `/es/tyc-plus-rewards/`: Programa de recompensas.
- `/es/tyc-swaplyar/`: Terminos y Condiciones de SwaplyAr.
- `/es/centro-de-ayuda/`: Sección de ayuda.
  - `/es/centro-de-ayuda/cancelacion-y-reembolso/`
  - `/es/centro-de-ayuda/estado-de-solicitud/`
  - `/es/centro-de-ayuda/editar-solicitud/`
  - `/es/centro-de-ayuda/prevencion-y-fraude/`
  - `/es/centro-de-ayuda/preguntas-frecuentes/`
- `/es/garantia/`: Información sobre garantías.
- `/es/pagina-en-mantenimiento/`: Estado de mantenimiento.
- `/es/como-usar-swaplyar/`: Guía de uso de la plataforma.
- `/es/quienes-somos/`: Información sobre SwaplyAr.
- `/es/por-que-elegir-swaplyar/`: Beneficios y diferenciación.
- `/es/programa-de-fidelizacion/`: Información sobre el programa de fidelización.

---

## 🔒 Rutas de Autenticación

- **`/es/iniciar-sesion` - Iniciar Sesión**
  - Formulario de autenticación.
  - Botón de acceso con Google u otras plataformas.

- **`/es/registro` - Crear Nueva Cuenta**
  - Formulario de registro.
  - Validación de campos requeridos.

---

## 📄 Rutas de Información

- **`/es/quienes-somos` - Sobre Nosotros**
  - Información sobre la misión y visión de SwaplyAr.

- **`/es/centro-de-ayuda` - Centro de Ayuda**
  - Preguntas frecuentes y soporte.

- **`/es/como-usar-swaplyar` - Guía de Uso**
  - Tutoriales y consejos para nuevos usuarios.

- **`/es/programa-de-fidelizacion` - Programa de Fidelización**
  - Beneficios y recompensas.

- **`/es/terminos-y-condiciones` - Términos y Condiciones**
  - Detalles legales del uso de la plataforma.

- **`/es/garantia` - Garantía**
  - Políticas de garantía.

---

## 💼 Rutas Funcionales

- **`/es/inicio/formulario-de-solicitud` - Solicitudes**
  - Listado y creación de solicitudes.
    - `/es/inicio/formulario-de-solicitud/solicitud-finalizada`
    - Solicitud Finalizada
- **`/es/centro-de-ayuda/cancelacion-y-reembolso` - Arrepentimiento y Reembolsos**
  - Formulario y estado de solicitudes.

---

## 💻 Estructura del Proyecto

### **Carpetas Clave**

- **`app/`**
  - **Rutas de API:**
    - **`api/auth/[...nextauth]`**: Autenticación con NextAuth.js.
  - **Organización por Sección:**
    - `auth/`, `formulario-de-solicitud/`, `centro-de-ayuda/`, `terminos-y-condiciones/`.

- **`components/`**
  - **`ui/`**: Componentes reutilizables.
  - **`auth/`**: Formulario de login y registro.
  - **`request/`**: Componentes de solicitudes.
  - **`centro-de-ayuda/`**: Componentes para la sección de ayuda.

- **`store/`**
  - Estado global con **Zustand**.

- **`public/`**
  - Archivos estáticos (imágenes y fuentes).

- **`styles/`**
  - Estilos globales.

---

## 📝 Notas

1. **Autenticación:**
   - Protección de rutas con NextAuth.
2. **Agrupación de rutas:**
   - Organización modular para facilitar la escalabilidad.
3. **Experiencia de usuario:**
   - Uso de Skeletons para mejorar la carga de vistas.
4. **Estado global:**
   - **Zustand** para la gestión del estado global.

