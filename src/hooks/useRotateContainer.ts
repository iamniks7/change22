import { useState, useEffect } from 'react';
import { ImageDimensions } from '../types';

interface ContainerStyles {
  containerStyle: React.CSSProperties;
  imageStyle: React.CSSProperties;
}

export function useRotateContainer(dimensions: ImageDimensions | undefined): ContainerStyles {
  const [styles, setStyles] = useState<ContainerStyles>({
    containerStyle: {},
    imageStyle: {}
  });

  useEffect(() => {
    if (!dimensions) return;

    const updateContainerSize = () => {
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;
      const maxContainerHeight = viewportHeight * 0.5;
      const maxContainerWidth = viewportWidth * 0.8;

      // Use the larger dimension for the container size
      const maxDimension = Math.max(dimensions.width, dimensions.height);
      const containerSize = Math.min(
        maxContainerWidth,
        maxContainerHeight,
        maxDimension
      );

      // Calculate scale to fit the image within the container
      const scale = containerSize / maxDimension;

      setStyles({
        containerStyle: {
          width: containerSize,
          height: containerSize,
          position: 'relative',
        },
        imageStyle: {
          width: dimensions.width * scale,
          height: dimensions.height * scale,
          maxWidth: 'none',
          maxHeight: 'none',
        }
      });
    };

    updateContainerSize();
    window.addEventListener('resize', updateContainerSize);
    return () => window.removeEventListener('resize', updateContainerSize);
  }, [dimensions]);

  return styles;
}