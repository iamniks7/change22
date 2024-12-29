import { useState, useEffect } from 'react';
import { ImageDimensions } from '../types';

export function useContainerSize(dimensions: ImageDimensions | undefined) {
  const [containerStyle, setContainerStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    if (!dimensions) return;
    
    const updateContainerSize = () => {
      const viewportHeight = window.innerHeight;
      const maxHeight = viewportHeight * 0.5;
      const imageRatio = dimensions.width / dimensions.height;
      
      if (dimensions.height > dimensions.width) {
        setContainerStyle({ height: maxHeight, width: 'auto' });
      } else {
        const width = maxHeight * imageRatio;
        setContainerStyle({ height: maxHeight, width });
      }
    };

    updateContainerSize();
    window.addEventListener('resize', updateContainerSize);
    return () => window.removeEventListener('resize', updateContainerSize);
  }, [dimensions]);

  return containerStyle;
}