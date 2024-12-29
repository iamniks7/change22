import React from 'react';
import { cn } from '../../lib/utils';
import Cropper from 'react-cropper';

interface Props {
  cropShape: 'rectangle' | 'circle';
  setCropShape: (shape: 'rectangle' | 'circle') => void;
  cropper: Cropper | undefined;
}

export function CropControls({ cropShape, setCropShape, cropper }: Props) {
  return (
    <div className="pt-2">
      <div className="flex justify-center gap-4">
        <button
          onClick={() => {
            setCropShape('rectangle');
            if (cropper) {
              cropper.setAspectRatio(NaN);
            }
          }}
          className={cn(
            'px-4 py-2 rounded-lg transition-colors',
            cropShape === 'rectangle'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 hover:bg-gray-200'
          )}
        >
          Rectangle
        </button>
        <button
          onClick={() => {
            setCropShape('circle');
            if (cropper) {
              cropper.setAspectRatio(1);
            }
          }}
          className={cn(
            'px-4 py-2 rounded-lg transition-colors',
            cropShape === 'circle'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 hover:bg-gray-200'
          )}
        >
          Circle
        </button>
      </div>
    </div>
  );
}