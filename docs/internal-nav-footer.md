# Estructura general del Nav Interno

El nav interno se compone de de dos partes principales: una barra superior y una inferior yuxtapuestas ordenadas en columna. Ambas barras se puede diferenciar claramente en sus versiones light y dark por tener background distintos y contrastantes.

El diseño responsive contempla el ancho de pantalla desde 310px en adelante. Por debajo de 310px no se garantiza que el diseño se presente de forma adecuada. Es posible que sucedan cambios aleatorios en las posiciones y tamaños de los elementos.

## Barra Superior

La barra superior se compone por el logo de Swaply, un espacio para dar mensajes al usuario y el switch para cambiar de modo light a dark o viceversa.

Los mensajes a usuario están disponibles para un ancho de pantalla de 744px en adelante. Para anchos menores a 744px el elemento se oculta.

En las versiones Desktop, Tablet y Mobile el diseño se mantiene estable sin cambios hasta un ancho de pantalla de 340px en adelante. De 339px para abajo el logo SwaplyAr cambia a su versión reducida.

### Barra Inferior

El diseño de este componente presenta transparencias en el estado activo de los íconos y en la imagen de perfil. Esto permite que al hacer scroll se puede ver el contenido de la página en la zonas determinadas por las rutas de clip-path. Es por está característica que los elementos que integran el componente este dispuestos en fila.

Esta barra se compone de un elemento principal en el centro y de los elementos en los laterales que tiene la función de expandirse para ocupar todo el ancho de pantalla.

El elemento del centro cambia de sus diferentes versiones Desktop, Tablet y Mobile.

En la versión Mobile esta barra de navegación se integra por la sección de foto de perfil con su diseño de transparencia correspondiente y una sección para el boton de cerrar sesión.

En la versión tablet se integra por la sección de foto de perfil con su diseño de transparencia correspondiente y un botón para desplegar el menú de tablet a través del cual se puede acceder a las distintas opciones y que dentro, contiene el boton de cerrar sesión. A partir de un ancho de pantalla de 744px se agrega a lado derecho de la foto de perfil el nombre de usuario.

En la versión Desktop se agrega el nombre de usuario, el menú de iconos para acceder a las distintas opciones y el botón de cerrar sesión.

### Barra Inferior Mantenimiento

En caso de ser necesario modificar la barra de navegación considerar que los elementos que tienen transparencias son de ancho fijo. No se puede modificar su ancho sin modificar la ruta del clip-path. Modificar el ancho puede generar que aparezcan separaciones indeseadas con los elementos que están a sus lados.
