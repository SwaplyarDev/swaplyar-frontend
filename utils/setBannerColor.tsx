export function setBannerColor() {
  const colors = [
    { bg: '#2DCCD3', text: '#FDFEFD' },
    { bg: '#97D700', text: '#012D8A' },
    { bg: '#B614FF', text: '#FDFEFD' },
  ];

  let currentColor = sessionStorage.getItem('bannerColor');

  if (!currentColor) {
    const newColor = colors[Math.floor(Math.random() * colors.length)];

    sessionStorage.setItem('bannerColor', JSON.stringify(newColor));

    currentColor = JSON.stringify(newColor);
  }

  return JSON.parse(currentColor);
}
