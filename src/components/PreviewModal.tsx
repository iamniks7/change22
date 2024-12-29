import React from 'react';
import { X } from 'lucide-react';
import { ImageFile } from '../types';
import { formatFileSize } from '../lib/utils';

interface Props {
  originalImage: ImageFile;
  processedImage: {
    url: string;
    size: number;
    dimensions: {
      width: number;
      height: number;
    };
  };
  onClose: () => void;
  onDownload: () => void;
}

export function PreviewModal({ originalImage, processedImage, onClose, onDownload }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="bg-white w-full h-full md:w-[90vw] md:h-[90vh] md:rounded-xl md:max-w-6xl flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold">Image Preview</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-auto p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-center">Original</h3>
              <div className="relative rounded-xl overflow-hidden border border-gray-200">
                <img
                  src={originalImage.preview}
                  alt="Original"
                  className="w-full h-auto"
                />
              </div>
              <div className="text-center text-sm text-gray-600">
                {originalImage.dimensions && 
                  `${originalImage.dimensions.width} × ${originalImage.dimensions.height} | ${formatFileSize(originalImage.file.size)}`}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-center">Processed</h3>
              <div className="relative rounded-xl overflow-hidden border border-gray-200">
                <img
                  src={processedImage.url}
                  alt="Processed"
                  className="w-full h-auto"
                />
              </div>
              <div className="text-center text-sm text-gray-600">
                {`${processedImage.dimensions.width} × ${processedImage.dimensions.height} | ${formatFileSize(processedImage.size)}`}
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 border-t flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 font-medium transition-colors"
          >
            Close
          </button>
          <button
            onClick={onDownload}
            className="px-6 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 font-medium transition-colors"
          >
            Download
          </button>
        </div>
      </div>
    </div>
  );
}