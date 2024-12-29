import React from 'react';
import { ImageFile } from '../../types';
import { useRotateContainer } from '../../hooks/useRotateContainer';

interface Props {
  image: ImageFile;
  rotation: number;
  zoom: number;
  flipX: boolean;
  flipY: boolean;
}

export function RotatePreview({ image, rotation, zoom, flipX, flipY }: Props) {
  const { containerStyle, imageStyle } = useRotateContainer(image.dimensions);

  return (
    <div className="flex-1 overflow-hidden p-4">
      <div 
        className="relative mx-auto overflow-hidden bg-gray-100"
        style={containerStyle}
      >
        <img
          src={image.preview}
          alt="Rotate preview"
          className="absolute top-1/2 left-1/2 transition-all duration-200"
          style={{
            ...imageStyle,
            transform: `translate(-50%, -50%) rotate(${rotation}deg) scale(${zoom}) scaleX(${flipX ? -1 : 1}) scaleY(${flipY ? -1 : 1})`
          }}
        />
      </div>
    </div>
  );
}