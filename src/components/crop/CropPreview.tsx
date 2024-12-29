import React from 'react';
import Cropper from 'react-cropper';
import { cn } from '../../lib/utils';
import { ImageFile } from '../../types';
import { useContainerSize } from '../../hooks/useContainerSize';

interface Props {
  image: ImageFile;
  cropShape: 'rectangle' | 'circle';
  setCropper: (cropper: Cropper) => void;
}

export function CropPreview({ image, cropShape, setCropper }: Props) {
  const containerStyle = useContainerSize(image.dimensions);

  return (
    <div className="flex-1 overflow-hidden p-4 pt-2">
      <div 
        className={cn(
          "max-w-full mx-auto",
          cropShape === 'circle' ? 'cropper-circle-container' : ''
        )}
        style={containerStyle}
      >
        <Cropper
          src={image.preview}
          style={{ height: '100%', width: '100%' }}
          initialAspectRatio={cropShape === 'circle' ? 1 : undefined}
          aspectRatio={cropShape === 'circle' ? 1 : undefined}
          guides={true}
          viewMode={1}
          cropBoxResizable={true}
          cropBoxMovable={true}
          toggleDragModeOnDblclick={true}
          onInitialized={(instance) => setCropper(instance)}
          className={cn(
            "max-h-full",
            cropShape === 'circle' ? 'cropper-circle' : ''
          )}
        />
      </div>
    </div>
  );
}