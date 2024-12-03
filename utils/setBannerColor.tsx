export function setBannerColor() {
  const colors = [
    { bg: '#00B140', text: '#FDFEFD' },
    { bg: '#97D700', text: '#012D8A' },
    { bg: '#C5B783', text: '#012D8A' },
    { bg: '#FE5000', text: '#FDFEFD' },
    { bg: '#FFC72C', text: '#012D8A' },
    { bg: '#CBC4BC', text: '#012D8A' },
  ];

  let currentColor = sessionStorage.getItem('bannerColor');

  if (!currentColor) {
    const newColor = colors[Math.floor(Math.random() * colors.length)];

    sessionStorage.setItem('bannerColor', JSON.stringify(newColor));

    currentColor = JSON.stringify(newColor);
  }

  return JSON.parse(currentColor);
}
