# Documentación: Manejo de Screens, Colores y Fonts

## **Estructura General de las Screens**
El diseño de las screens sigue una estructura que asegura la adaptabilidad en diferentes resoluciones, utilizando clases de Tailwind CSS para controlar márgenes, anchos máximos y disposición de los elementos. Aquí se describen los dos casos principales y las reglas para su implementación.

---

### **Caso 1: Div Anidado Simple**

En este caso, el contenedor externo envuelve un único div interno. Este div interno utiliza clases para ajustar el ancho según los breakpoints de pantalla. Todo el contenido se encuentra dentro del segundo div.

#### **Estructura**
```tsx
<div className="px-4 md:px-8 lg:px-4">
	<div className="w-full max-w-screen-phone xs-mini-phone2:max-w-screen-tablet md:max-w-screen-desktop">
		<<...>> {/* Contenido principal */}
		<<...>> {/* Contenido adicional */}
	</div>
</div>
```

#### **Clases Utilizadas**
1. **Contenedor externo (`<div className="px-4 md:px-8 lg:px-4">`)**:
   - Controla los márgenes horizontales.
   - `px-4`: Márgenes pequeños por defecto.
   - `md:px-8`: Márgenes más amplios en pantallas medianas.
   - `lg:px-4`: Ajusta márgenes nuevamente en pantallas grandes.

2. **Contenedor interno (`<div className="w-full max-w-screen-phone ...">`)**:
   - `w-full`: Ocupa todo el ancho disponible del contenedor padre.
   - `max-w-screen-phone`, `xs-mini-phone2:max-w-screen-tablet`, `md:max-w-screen-desktop`: Controlan el ancho máximo según el tamaño de pantalla.

---

### **Caso 2: Div Anidado con Componente Adicional**

En este caso, el contenedor externo contiene **dos divs hijos**:
1. El **primer div hijo** aloja el contenido principal.
2. El **segundo div hijo** contiene un componente adicional (por ejemplo, `FlyerComponent`).

Las clases de espaciado y tamaño se aplican directamente al **contenedor externo**, y no es necesario duplicarlas en los divs hijos.

#### **Estructura**
```tsx
<div className="px-4 md:px-8 lg:px-4 w-full max-w-screen-phone xs-mini-phone2:max-w-screen-tablet md:max-w-screen-desktop">
	<<...>> {/* Contenido principal */}
	<<...>> {/* Contenido adicional */}
</div>
```

#### **Estructura tipo 2**
```tsx
<div>
	<div className="px-4 md:px-8 lg:px-4 w-full max-w-screen-phone xs-mini-phone2:max-w-screen-tablet md:max-w-screen-desktop">
		<<...>> {/* Contenido principal */}
		<<...>> {/* Contenido adicional */}
	</div>
	<div>
		<FlyerComponent /> {/* Componente adicional */}
	</div>
</div>
```

#### **Clases Utilizadas**
1. **Contenedor externo**:
   - `px-4`, `md:px-8`, `lg:px-4`: Márgenes horizontales.
   - `w-full`: Ocupa todo el ancho del contenedor padre.
   - `max-w-screen-phone`, `xs-mini-phone2:max-w-screen-tablet`, `md:max-w-screen-desktop`: Ajustan el ancho máximo para cada breakpoint.

2. **Divs hijos**:
   - No requieren clases adicionales específicas relacionadas con espaciado o tamaño, ya que el contenedor externo se encarga de manejarlas.

---

### **Reglas Generales**
1. **Aplicación de clases principales**: En el **Caso 2**, las clases de diseño relacionadas con espaciado y tamaño se aplican exclusivamente al **contenedor externo**.
2. **Evitar duplicación de estilos**: No es necesario replicar las mismas clases en los divs hijos.
3. **Adaptabilidad**: Usar los breakpoints personalizados (`xs-mini-phone2`, etc.) para mejorar la experiencia en dispositivos con pantallas pequeñas.
4. **Simplicidad en la jerarquía**: Mantener las clases bien organizadas y centralizadas en los niveles superiores para facilitar el mantenimiento del código.

---

## **Uso de Colores Personalizados**

Los colores personalizados están configurados en el archivo `tailwind.config.ts` dentro de la sección `colors`. Estos colores se utilizan de manera similar a los colores predeterminados de Tailwind CSS.

### **Cómo Usarlos**
1. En JSX, las clases se definen con los prefijos correspondientes a los colores personalizados:
   ```tsx
   <div className="bg-custom-blue text-custom-grayD">
       <<...>>
   </div>
   ```

2. Cada color en la configuración está comentado con su valor en formato hexadecimal para facilitar su identificación. Ejemplo:
   ```js
   colors: {
       'custom-blue': '#1E40AF', // Azul personalizado
       'custom-grayD': '#4B5563', // Gris oscuro personalizado
       // Otros colores personalizados
   }
   ```

### **Reglas para los Colores**
1. **Consistencia**: Usar los nombres definidos en `tailwind.config.ts` en lugar de valores hexadecimales en línea.
2. **Mantenibilidad**: Si se necesita actualizar un color, hacerlo únicamente en la configuración de Tailwind para reflejar los cambios globalmente.
3. **Legibilidad**: Aprovechar los comentarios en la configuración para entender rápidamente qué color se está utilizando.

---

## **Uso de Fuentes Personalizadas**

Las fuentes personalizadas están configuradas en `tailwind.config.ts` y se utilizan como clases de Tailwind CSS.

### **Cómo Usarlas**
1. **Clases de Fuentes**:
   - `font-titleFont`: Aplica la fuente **OpenSans**.
   - `font-textFont`: Aplica la fuente **Roboto**.

2. **Ejemplo de Uso**:
   ```tsx
   <div className="font-titleFont font-semibold text-custom-blue">
       Este texto utiliza la fuente OpenSans con peso semi-bold.
   </div>
   <p className="font-textFont font-light text-custom-grayD">
       Este texto utiliza la fuente Roboto con peso light.
   </p>
   ```

### **Modificación del Peso de la Fuente**
Los pesos de fuente se controlan mediante las clases predefinidas de Tailwind CSS. Estas clases se aplican junto con las fuentes personalizadas.

#### **Clases de Peso**
- `font-thin`: Peso más fino.
- `font-extralight`
- `font-light`
- `font-normal`
- `font-medium`
- `font-semibold`
- `font-bold`
- `font-extrabold`
- `font-black`: Peso más grueso.

#### **Ejemplo**
```tsx
<p className="font-textFont font-thin">
    Texto con la fuente Roboto en su peso más fino.
</p>
<p className="font-titleFont font-black">
    Texto con la fuente OpenSans en su peso más grueso.
</p>
```