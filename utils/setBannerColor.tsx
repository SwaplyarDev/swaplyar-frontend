export function setBannerColor() {
  const colors = [
    { bg: '#7800AD', text: '#EBE7E0' },
    { bg: '#97D700', text: '#011B5B' },
  ];

  let currentColor = sessionStorage.getItem('bannerColor');

  if (!currentColor) {
    const newColor = colors[Math.floor(Math.random() * colors.length)];

    sessionStorage.setItem('bannerColor', JSON.stringify(newColor));

    currentColor = JSON.stringify(newColor);
  }

  return JSON.parse(currentColor);
}
