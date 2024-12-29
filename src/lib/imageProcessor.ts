import { ImageFormat, SizeUnit } from '../types';

interface ResizeOptions {
  width: number;
  height: number;
  mode: 'none' | 'fill' | 'fit' | 'stretch';
  format: ImageFormat;
  dpi?: number;
  targetSize?: {
    size: number;
    unit: SizeUnit;
  };
}

export async function processImage(file: File, options: ResizeOptions): Promise<{ data: Blob; info: { width: number; height: number; size: number } }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    img.onload = () => {
      let targetWidth = options.width;
      let targetHeight = options.height;

      // Calculate dimensions based on mode
      switch (options.mode) {
        case 'fit':
          const scale = Math.min(
            options.width / img.width,
            options.height / img.height
          );
          targetWidth = img.width * scale;
          targetHeight = img.height * scale;
          break;
        case 'fill':
          const fillScale = Math.max(
            options.width / img.width,
            options.height / img.height
          );
          targetWidth = img.width * fillScale;
          targetHeight = img.height * fillScale;
          break;
        case 'stretch':
          targetWidth = options.width;
          targetHeight = options.height;
          break;
        case 'none':
          targetWidth = img.width;
          targetHeight = img.height;
          break;
      }

      canvas.width = options.mode === 'fit' ? targetWidth : options.width;
      canvas.height = options.mode === 'fit' ? targetHeight : options.height;

      if (ctx) {
        // Fill with white background for JPG
        if (options.format.toLowerCase() === 'jpg' || options.format.toLowerCase() === 'jpeg') {
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        // Center the image
        const x = (canvas.width - targetWidth) / 2;
        const y = (canvas.height - targetHeight) / 2;

        ctx.drawImage(img, x, y, targetWidth, targetHeight);

        // Set DPI if specified
        if (options.dpi) {
          const dpi = options.dpi;
          ctx.scale(dpi / 96, dpi / 96);
        }

        // Convert to the desired format
        const format = options.format === 'original' 
          ? file.type 
          : `image/${options.format.toLowerCase()}`;
        
        let quality = 0.92;
        
        // Handle target file size
        if (options.targetSize) {
          const targetBytes = convertToBytes(options.targetSize.size, options.targetSize.unit);
          quality = calculateQualityForTargetSize(canvas, format, targetBytes);
        }

        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve({
                data: blob,
                info: {
                  width: canvas.width,
                  height: canvas.height,
                  size: blob.size
                }
              });
            } else {
              reject(new Error('Failed to create blob'));
            }
          },
          format,
          quality
        );
      }
    };

    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };

    img.src = URL.createObjectURL(file);
  });
}

function convertToBytes(size: number, unit: SizeUnit): number {
  switch (unit) {
    case 'KB':
      return size * 1024;
    case 'MB':
      return size * 1024 * 1024;
    case 'B':
    default:
      return size;
  }
}

function calculateQualityForTargetSize(
  canvas: HTMLCanvasElement,
  format: string,
  targetBytes: number,
  tolerance = 0.1
): number {
  let min = 0.1;
  let max = 1.0;
  let quality = 0.7;
  let tries = 0;
  const maxTries = 10;

  while (tries < maxTries) {
    const blob = canvas.toDataURL(format, quality);
    const size = Math.ceil((blob.length - 22) * 3 / 4); // Approximate blob size from base64

    const diff = Math.abs(size - targetBytes) / targetBytes;
    if (diff <= tolerance) {
      break;
    }

    if (size > targetBytes) {
      max = quality;
    } else {
      min = quality;
    }

    quality = (min + max) / 2;
    tries++;
  }

  return quality;
}