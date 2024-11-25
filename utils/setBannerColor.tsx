export function setBannerColor() {
  const colors = [
    { bg: '#00B140', text: '#FDFEFD' },
    { bg: '#97D700', text: '#012D8A' },
    { bg: '#C5B783', text: '#012D8A' },
    { bg: '#FE5000', text: '#FDFEFD' },
    { bg: '#FFC72C', text: '#012D8A' },
    { bg: '#CBC4BC', text: '#012D8A' },
  ];

  // Intentamos obtener el color guardado previamente
  let currentColor = sessionStorage.getItem('bannerColor');

  if (!currentColor) {
    // Si no hay color guardado, seleccionamos uno aleatorio
    const newColor = colors[Math.floor(Math.random() * colors.length)];

    // Guardamos el nuevo color como string JSON
    sessionStorage.setItem('bannerColor', JSON.stringify(newColor));

    // Asignamos el nuevo color como el actual
    currentColor = JSON.stringify(newColor);
  }

  // Retornamos el color parseado como objeto
  return JSON.parse(currentColor);
}
