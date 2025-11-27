import { Area } from 'react-easy-crop';

export function getRadianAngle(degreeValue: number): number {
  return (degreeValue * Math.PI) / 180;
}

export function rotateSize(width: number, height: number, rotation: number): { width: number; height: number } {
  const rotRad = getRadianAngle(rotation);
  return {
    width: Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
    height: Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
  };
}

export function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error: Event) => reject(new Error(`Error loading image: ${error.type}`)));
    image.setAttribute('crossOrigin', 'anonymous');
    image.src = url;
  });
}

export async function getCroppedImg(
  imageSrc: string,
  pixelCrop: Area,
  rotation: number = 0,
  flip: { horizontal: boolean; vertical: boolean } = { horizontal: false, vertical: false }
): Promise<File> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('No se pudo crear el contexto del canvas');

  const rotRad = getRadianAngle(rotation);

  // Calcular bounding box de la imagen rotada
  const { width: bBoxWidth, height: bBoxHeight } = rotateSize(image.width, image.height, rotation);

  // Establecer tamaño del canvas al bounding box
  canvas.width = bBoxWidth;
  canvas.height = bBoxHeight;

  // Traducir contexto del canvas a ubicación central para rotar y voltear alrededor del centro
  ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
  ctx.rotate(rotRad);
  ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
  ctx.translate(-image.width / 2, -image.height / 2);

  // Dibujar imagen rotada
  ctx.drawImage(image, 0, 0);

  const croppedCanvas = document.createElement('canvas');
  const croppedCtx = croppedCanvas.getContext('2d');
  if (!croppedCtx) throw new Error('No se pudo crear el contexto del canvas recortado');

  // Establecer tamaño del canvas recortado
  croppedCanvas.width = pixelCrop.width;
  croppedCanvas.height = pixelCrop.height;

  // Dibujar imagen recortada en el nuevo canvas
  croppedCtx.drawImage(
    canvas,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  return new Promise((resolve) => {
    croppedCanvas.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], 'cropped-image.jpg', { type: 'image/jpeg' });
        resolve(file);
      }
    }, 'image/jpeg');
  });
}

export async function getRotatedImage(imageSrc: string, rotation = 0) {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('No se pudo crear el contexto del canvas');

  const orientationChanged = rotation === 90 || rotation === -90 || rotation === 270 || rotation === -270;
  if (orientationChanged) {
    canvas.width = image.height;
    canvas.height = image.width;
  } else {
    canvas.width = image.width;
    canvas.height = image.height;
  }

  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate((rotation * Math.PI) / 180);
  ctx.drawImage(image, -image.width / 2, -image.height / 2);

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], 'cropped-image.jpg', { type: 'image/jpeg' });
        resolve(file);
      }
    }, 'image/png');
  });
}
