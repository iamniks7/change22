import React, { useState } from 'react';
import { X } from 'lucide-react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { CropPresets } from './CropPresets';
import { ImageFile } from '../types';
import { cn } from '../lib/utils';
import { dataURLtoFile } from '../lib/imageUtils';
import { CropControls } from './crop/CropControls';
import { CropPreview } from './crop/CropPreview';

interface Props {
  image: ImageFile;
  onClose: () => void;
  onApply: (croppedImage: string, file: File) => void;
}

export function CropModal({ image, onClose, onApply }: Props) {
  const [cropper, setCropper] = useState<Cropper>();
  const [selectedRatio, setSelectedRatio] = useState<string>('free'); 
  const [cropShape, setCropShape] = useState<'rectangle' | 'circle'>('rectangle');

  const handleApply = () => {
    if (cropper) {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const croppedCanvas = cropper.getCroppedCanvas();
      
      if (cropShape === 'circle') {
        canvas.width = croppedCanvas.width;
        canvas.height = croppedCanvas.height;
        
        if (ctx) {
          ctx.save();
          ctx.beginPath();
          ctx.arc(
            canvas.width / 2,
            canvas.height / 2,
            Math.min(canvas.width, canvas.height) / 2,
            0,
            Math.PI * 2
          );
          ctx.clip();
          ctx.drawImage(croppedCanvas, 0, 0);
          ctx.restore();

          const finalCanvas = document.createElement('canvas');
          finalCanvas.width = canvas.width;
          finalCanvas.height = canvas.height;
          const finalCtx = finalCanvas.getContext('2d');

          if (finalCtx) {
            finalCtx.save();
            finalCtx.beginPath();
            finalCtx.arc(
              finalCanvas.width / 2,
              finalCanvas.height / 2,
              Math.min(finalCanvas.width, finalCanvas.height) / 2,
              0,
              Math.PI * 2
            );
            finalCtx.clip();
            finalCtx.drawImage(canvas, 0, 0);
            finalCtx.restore();

            const croppedDataUrl = finalCanvas.toDataURL('image/png');
            const newFileName = image.file.name.replace(/\.[^/.]+$/, '') + '.png';
            const croppedFile = dataURLtoFile(croppedDataUrl, newFileName);
            onApply(croppedDataUrl, croppedFile);
          }
        }
      } else {
        const croppedDataUrl = croppedCanvas.toDataURL(image.file.type);
        const croppedFile = dataURLtoFile(croppedDataUrl, image.file.name);
        onApply(croppedDataUrl, croppedFile);
      }
    }
  };

  const handleRatioChange = (ratio: string) => {
    setSelectedRatio(ratio);
    if (cropper) {
      if (ratio === 'free') {
        cropper.setAspectRatio(NaN);
      } else if (ratio === 'original') {
        const { width, height } = image.dimensions || { width: 1, height: 1 };
        cropper.setAspectRatio(width / height);
      } else {
        const [width, height] = ratio.split(':').map(Number);
        cropper.setAspectRatio(width / height);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="bg-white w-full h-full md:w-[90vw] md:h-[90vh] md:rounded-xl md:max-w-6xl flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold">Crop Image</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <CropControls
          cropShape={cropShape}
          setCropShape={setCropShape}
          cropper={cropper}
        />

        <CropPreview
          image={image}
          cropShape={cropShape}
          setCropper={setCropper}
        />

        <div className="p-4 border-t space-y-4">
          {cropShape === 'rectangle' && (
            <div>
              <CropPresets selectedRatio={selectedRatio} onRatioChange={handleRatioChange} />
            </div>
          )}
          
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 font-medium transition-colors"
            >
              Close
            </button>
            <button
              onClick={handleApply}
              className="px-4 py-1 rounded-lg bg-green-600 text-white hover:bg-green-700 font-medium transition-colors"
            >
              Apply Cropping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}