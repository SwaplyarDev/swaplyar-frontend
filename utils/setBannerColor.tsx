export function setBannerColor() {
    const colors = ['#6a0dad', '#007bff', '#ff5733', '#28a745', '#ffc107']; 
    
    localStorage.removeItem('bannerColor');
    
    let currentColor = localStorage.getItem('bannerColor');
    
    if (!currentColor) {
      currentColor = colors[Math.floor(Math.random() * colors.length)];
      localStorage.setItem('bannerColor', currentColor); 
    }
  
    return currentColor;
  }
  