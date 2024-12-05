```markdown
# 🗂️ **Estructura Principal del Proyecto**

Esta es la estructura principal del proyecto **SwaplyAr Frontend**, diseñada para mantener el código organizado y modular. A continuación, se detalla cada carpeta y su propósito.

---

```plaintext
swaplyar-frontend/
├── app/               # (Nuevo) Directorio App Router (Next.js 13)
│   ├── api/           # Rutas de API
│   │   ├── auth/      # Rutas de autenticación con NextAuth.js
│   │   └── paypal/    # Rutas para transacciones con PayPal
│   ├── info/          # Rutas de información general
│   │   ├── about-us/               # Página "Quiénes Somos"
│   │   ├── help-center/            # Página de Centro de Ayuda
│   │   ├── how-to-use/             # Página "Cómo usar SwaplyAr"
│   │   ├── loyalty-program/        # Página del Programa de Fidelización
│   │   ├── terms-and-conditions/   # Página de Términos y Condiciones
│   │   ├── warranty/               # Página de Garantía
│   │   └── why-choose-swaplyar/    # Página "Por qué elegir SwaplyAr"
│   ├── auth/          # Rutas relacionadas con autenticación
│   │   ├── login/     # Página de inicio de sesión
│   │   └── new-account/ # Página de registro
│   ├── request/       # Rutas para solicitudes de intercambio
│   ├── repentance/    # Página "Arrepentimiento"
│   ├── layout.js      # Layout principal de la aplicación
│   └── page.js        # Página de inicio
├── components/        # Componentes reutilizables
│   ├── ui/            # Componentes de interfaz de usuario
│   ├── auth/          # Componentes relacionados con autenticación
│   ├── clientWrapper/ # Gestión de estados de carga
│   ├── skeleton/      # Componentes Skeleton para carga
│   ├── request/       # Componentes de solicitudes de intercambio
│   └── transactions/  # Componentes de transacciones
│       └── paypal/    # Componentes para transacciones con PayPal
├── hooks/             # Hooks personalizados
├── store/             # Configuración del store global (Zustand)
├── public/            # Archivos estáticos (imágenes, fuentes, etc.)
├── styles/            # Estilos globales (CSS o Tailwind)
├── actions/           # Acciones para interactuar con la API
│   ├── blogs/         # Acciones relacionadas con blogs
│   └── paypal/        # Acciones relacionadas con PayPal
├── lib/               # Utilidades y funciones auxiliares
│   ├── utils.ts       # Funciones utilitarias
├── types/             # Definiciones de tipos TypeScript
│   ├── blogs/         # Tipos relacionados con blogs
│   └── paypal/        # Tipos relacionados con PayPal
├── ...                # Otros archivos y carpetas importantes
└── [package.json](http://_vscodecontentref_/0)       # Dependencias y scripts del proyecto
```

---

## 📂 **Descripción de Carpetas**

### **`app/`**
Este directorio sigue la arquitectura **App Router** de Next.js 13+ y organiza las rutas principales de la aplicación.

- **`api/`**: Contiene las rutas para la API.
  - **`auth/`**: Implementación de autenticación con **NextAuth.js**.
  - **`paypal/`**: Lógica para gestionar transacciones con PayPal.
- **`info/`**: Rutas de información general como "Quiénes Somos", "Cómo usar SwaplyAr" y más.
- **`auth/`**: Rutas para el inicio de sesión y registro.
- **`request/`**: Manejo de rutas de solicitudes de intercambio.
- **`repentance/`**: Página dedicada a la funcionalidad de reembolso o arrepentimiento.
- **`layout.js`**: Define el diseño principal compartido por todas las páginas.
- **`page.js`**: Página de inicio de la aplicación.

---

### **`components/`**
Almacena componentes reutilizables organizados por funcionalidad.

- **`ui/`**: Componentes genéricos de interfaz de usuario (botones, modales, etc.).
- **`auth/`**: Componentes específicos para autenticación, como formularios.
- **`clientWrapper/`**: Componente para manejar estados de carga y envolturas de vistas.
- **`skeleton/`**: Componentes **Skeleton** para mostrar mientras las vistas se cargan.
- **`request/`**: Componentes relacionados con solicitudes de intercambio.
- **`transactions/`**: Componentes para la funcionalidad de transacciones, como integración con **PayPal**.

---

### **`hooks/`**
Aquí se encuentran los **hooks personalizados** que encapsulan lógica reutilizable para manejar datos y estados.

---

### **`store/`**
Contiene la configuración del **store global**, implementado con **Zustand** para la gestión del estado de la aplicación.

---

### **`public/`**
Archivos estáticos accesibles públicamente, como imágenes, iconos y fuentes.

---

### **`styles/`**
Contiene los estilos globales del proyecto. Puede incluir:
- **CSS tradicional**.
- **Tailwind CSS** (si se usa en el proyecto).

---

### **`actions/`**
Contiene las acciones para interactuar con la API.
- **blogs/** (Acciones relacionadas con blogs).
- **paypal/** (Acciones relacionadas con PayPal).

---

### **`lib/`**
Utilidades y funciones auxiliares.
- **utils.ts** (Funciones utilitarias).

---

### **`types/`**
Definiciones de tipos TypeScript.
- **blogs/** (Tipos relacionados con blogs).
- **paypal/** (Tipos relacionados con PayPal).

---

### **`package.json`**
Este archivo especifica las dependencias del proyecto y los scripts necesarios para la ejecución y desarrollo.

---

## 🛠️ **Notas Adicionales**

1. **Estandarización**: Todas las carpetas y archivos siguen una estructura modular para facilitar la escalabilidad y el mantenimiento.
2. **Componentización**: Se prioriza la reutilización de componentes, especialmente para funcionalidades comunes como autenticación y transacciones.
3. **Gestión de Estados**: La arquitectura del estado global utiliza **Zustand**, ofreciendo una solución ligera y eficiente.

--- 

¡Esta estructura está diseñada para garantizar un desarrollo limpio y colaborativo! 🚀
```