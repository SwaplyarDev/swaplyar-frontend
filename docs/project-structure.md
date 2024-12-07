---
# 🗂️ **Estructura Principal del Proyecto**

Esta es la estructura principal del proyecto **SwaplyAr Frontend**, diseñada para mantener el código organizado y modular. A continuación, se detalla cada carpeta y su propósito.
---

```plaintext
swaplyar-frontend/
├── app/                         # Rutas principales bajo App Router
│   ├── api/                     # Endpoints de API
│   │   ├── auth/                # Rutas para autenticación (NextAuth.js)
│   │   ├── paypal/              # Rutas para transacciones PayPal
│   │   └── request/             # API para solicitudes de intercambio
│   ├── auth/                    # Rutas de autenticación
│   │   └── login-register/      # Página de login y registro
│   │       └── email-verification/  # Verificación de email
│   ├── blog/                    # Rutas relacionadas con el blog (independiente)
│   │   ├── page.tsx             # Página principal del blog
│   │   └── [slug]-[id]/         # Páginas dinámicas de detalle del blog
│   ├── info/                    # Rutas de información
│   │   ├── about-us/            # Página "Quiénes Somos"
│   │   ├── help-center/         # Centro de ayuda
│   │   ├── how-to-use/          # "Cómo usar SwaplyAr"
│   │   ├── loyalty-program/     # Programa de fidelización
│   │   ├── terms/               # Subcarpeta para términos y condiciones
│   │   │   ├── sapr-terms-conditions/
│   │   │   └── terms-and-conditions/
│   │   ├── warranty/            # Garantía
│   │   └── why-choose-swaplyar/ # Por qué elegir SwaplyAr
│   ├── request/                 # Página para gestionar solicitudes
│   ├── repentance/              # Página de arrepentimiento
│   ├── layout.tsx               # Layout principal
│   ├── page.tsx                 # Página de inicio
│   └── globals.css              # Estilos globales para la aplicación
├── components/                  # Componentes reutilizables
│   ├── auth/                    # Componentes de autenticación
│   ├── blog/                    # Componentes específicos del blog
│   │   ├── BlogPostCard.tsx     # Tarjetas para listar blogs
│   │   └── BlogDetail.tsx       # Detalle del blog
│   ├── info/                    # Componentes relacionados con info general
│   │   ├── HelpCenter.tsx       # Centro de ayuda
│   │   └── Warranty.tsx         # Garantía
│   ├── request/                 # Componentes de solicitudes de intercambio
│   ├── transactions/            # Componentes para transacciones
│   │   └── PayPal.tsx           # Integración con PayPal
│   ├── shared/                  # Componentes compartidos (cabecera, pie, etc.)
│   ├── skeleton/                # Placeholder para carga
│   └── ui/                      # Botones, modales y elementos genéricos de UI
├── hooks/                       # Hooks personalizados
│   ├── useAuth.ts               # Lógica para autenticación
│   ├── useRequest.ts            # Lógica para solicitudes
│   └── useBlog.ts               # Lógica del blog
├── store/                       # Gestión global del estado con Zustand
│   ├── authStore.ts             # Estado para autenticación
│   ├── blogStore.ts             # Estado para blogs
│   └── requestStore.ts          # Estado para solicitudes
├── public/                      # Recursos estáticos (imágenes, fuentes)
├── styles/                      # Estilos globales y específicos
│   ├── globals.css              # Estilos globales
│   ├── tailwind.css             # Base de configuración de Tailwind
│   └── components/              # Estilos específicos de componentes
├── actions/                     # Lógica para interactuar con la API
│   ├── auth.ts                  # Acciones para autenticación
│   ├── blog.ts                  # Acciones del blog
│   ├── paypal.ts                # Acciones relacionadas con PayPal
│   └── request.ts               # Acciones para solicitudes
├── lib/                         # Funciones auxiliares y servicios
│   ├── auth.ts                  # Utilidades de autenticación
│   ├── blog.ts                  # Utilidades del blog
│   ├── routes.ts                # Gestión de rutas dinámicas
│   └── utils.ts                 # Funciones generales
├── types/                       # Definiciones de tipos TypeScript
│   ├── auth.d.ts                # Tipos para autenticación
│   ├── blog.d.ts                # Tipos del blog
│   └── request.d.ts             # Tipos para solicitudes
├── tests/                       # Pruebas del proyecto
│   ├── integration/             # Tests de integración
│   └── unit/                    # Tests unitarios
├── next.config.js               # Configuración de Next.js
├── tailwind.config.js           # Configuración de Tailwind
└── package.json                 # Dependencias y scripts
```

---

## 📂 **Descripción de Carpetas**

### **`app/`**

Este directorio sigue la arquitectura **App Router** de Next.js (14+). Organiza las rutas principales de la aplicación y sus funcionalidades asociadas.

- **`api/`**: Rutas para manejar solicitudes API internas.
  - **`auth/`**: Funciones para autenticación mediante **NextAuth.js**.
  - **`paypal/`**: Endpoints para gestionar transacciones de PayPal.
  - **`request/`**: API relacionada con las solicitudes de intercambio.
- **`auth/`**: Páginas para login y registro, incluyendo verificación por email.
- **`blog/`**: Páginas del blog, con rutas dinámicas para visualizar entradas específicas.
- **`info/`**: Contiene información general del sitio, como "Quiénes somos" o "Centro de ayuda".
- **`request/`**: Página para gestionar solicitudes de intercambio.
- **`repentance/`**: Página dedicada al derecho de arrepentimiento.
- **Archivos clave:**
  - **`layout.tsx`**: Define el diseño principal de la aplicación.
  - **`page.tsx`**: Representa la página de inicio.

---

### **`components/`**

Esta carpeta almacena componentes reutilizables organizados por funcionalidad específica.

- **`auth/`**: Componentes para autenticación, como formularios de inicio de sesión.
- **`blog/`**: Tarjetas y vistas relacionadas con las entradas del blog.
- **`info/`**: Componentes para secciones informativas como el centro de ayuda.
- **`shared/`**: Elementos comunes, como cabeceras o pies de página.
- **`skeleton/`**: Placeholders para mejorar la experiencia durante la carga.
- **`ui/`**: Elementos de interfaz de usuario genéricos (botones, modales).

---

### **`hooks/`**

Incluye hooks personalizados para encapsular lógica reutilizable:

- **`useAuth.ts`**: Gestión de la autenticación.
- **`useRequest.ts`**: Lógica para solicitudes de intercambio.

---

### **`store/`**

Implementa un sistema de gestión de estado global mediante **Zustand**.

- **`authStore.ts`**: Estado relacionado con autenticación.
- **`requestStore.ts`**: Manejo del estado de solicitudes.

---

### **`public/`**

Recursos estáticos accesibles públicamente, como imágenes, íconos o fuentes.

---

### **`styles/`**

Define los estilos del proyecto:

- **`globals.css`**: Estilos generales.
- **`tailwind.css`**: Configuración base de Tailwind.

---

### **`actions/`**

Lógica centralizada para interactuar con APIs:

- **`auth.ts`**: Acciones relacionadas con autenticación.
- **`paypal.ts`**: Métodos para la integración con PayPal.

---

### **`lib/`**

Funciones auxiliares y herramientas compartidas:

- **`utils.ts`**: Funciones utilitarias comunes.

---

### **`types/`**

Define los tipos de datos de TypeScript usados en el proyecto.

---

### **`tests/`**

Contiene pruebas unitarias e integraciones para asegurar la calidad del código.

---

## 🛠️ **Notas Adicionales**

1. **Estandarización**: La estructura modular facilita la escalabilidad y el mantenimiento.
2. **Gestión eficiente**: Uso de Zustand para el estado global, y hooks personalizados para manejar lógica compleja.
3. **Estilo organizado**: Los estilos globales se manejan mediante **Tailwind CSS**.

---

¡Este esquema asegura una

navegación intuitiva y un desarrollo ágil! 🚀
