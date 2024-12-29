import { useState, useEffect } from 'react';
import { ImageFile } from '../types';
import { calculateAspectRatio, calculateDimensionWithAspectRatio, parseDecimalInput } from '../lib/dimensionUtils';

interface UseAspectRatioProps {
  images: ImageFile[];
  maintainAspectRatio: boolean;
  width: number | '';
  height: number | '';
  onWidthChange: (width: number | '') => void;
  onHeightChange: (height: number | '') => void;
}

export function useAspectRatio({
  images,
  maintainAspectRatio,
  width,
  height,
  onWidthChange,
  onHeightChange,
}: UseAspectRatioProps) {
  const [aspectRatio, setAspectRatio] = useState<number | null>(null);
  const [lastUpdated, setLastUpdated] = useState<'width' | 'height' | null>(null);

  useEffect(() => {
    if (images.length === 1 && images[0].dimensions) {
      const { width, height } = images[0].dimensions;
      setAspectRatio(calculateAspectRatio(width, height));
    } else {
      setAspectRatio(null);
    }
  }, [images]);

  useEffect(() => {
    if (!maintainAspectRatio || !aspectRatio || images.length !== 1) return;

    if (lastUpdated === 'width' && width !== '') {
      const newHeight = calculateDimensionWithAspectRatio(width, aspectRatio, true);
      onHeightChange(newHeight);
    } else if (lastUpdated === 'height' && height !== '') {
      const newWidth = calculateDimensionWithAspectRatio(height, aspectRatio, false);
      onWidthChange(newWidth);
    }
  }, [width, height, aspectRatio, maintainAspectRatio, lastUpdated]);

  const handleDimensionChange = (value: string, dimension: 'width' | 'height') => {
    setLastUpdated(dimension);
    const parsedValue = parseDecimalInput(value);
    
    if (dimension === 'width') {
      onWidthChange(parsedValue);
    } else {
      onHeightChange(parsedValue);
    }
  };

  return {
    handleDimensionChange,
    canMaintainAspectRatio: images.length === 1 && aspectRatio !== null,
  };
}