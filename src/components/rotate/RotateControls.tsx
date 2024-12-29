import React from 'react';
import { RotateCcw, RotateCw, FlipHorizontal, FlipVertical, RefreshCcw, ZoomIn, ZoomOut } from 'lucide-react';

interface Props {
  rotation: number;
  zoom: number;
  flipX: boolean;
  flipY: boolean;
  onRotate: (degrees: number) => void;
  onZoom: (delta: number) => void;
  onFlipX: () => void;
  onFlipY: () => void;
  onReset: () => void;
}

export function RotateControls({
  rotation,
  zoom,
  flipX,
  flipY,
  onRotate,
  onZoom,
  onFlipX,
  onFlipY,
  onReset
}: Props) {
  return (
    <div className="mt-2 space-y-6">
      <div className="flex flex-wrap justify-center gap-2">
        <button
          onClick={() => onRotate(-90)}
          className="p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors text-blue-700"
          title="Rotate 90° counterclockwise"
        >
          <RotateCcw className="h-5 w-5" />
        </button>
        <button
          onClick={() => onRotate(90)}
          className="p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors text-blue-700"
          title="Rotate 90° clockwise"
        >
          <RotateCw className="h-5 w-5" />
        </button>
        <button
          onClick={onFlipX}
          className={`p-3 rounded-lg transition-colors ${
            flipX ? 'bg-blue-600 text-white' : 'bg-blue-50 hover:bg-blue-100 text-blue-700'
          }`}
          title="Flip horizontal"
        >
          <FlipHorizontal className="h-5 w-5" />
        </button>
        <button
          onClick={onFlipY}
          className={`p-3 rounded-lg transition-colors ${
            flipY ? 'bg-blue-600 text-white' : 'bg-blue-50 hover:bg-blue-100 text-blue-700'
          }`}
          title="Flip vertical"
        >
          <FlipVertical className="h-5 w-5" />
        </button>
        <button
          onClick={() => onZoom(0.2)}
          className="p-3 rounded-lg bg-green-50 hover:bg-green-100 transition-colors text-green-700"
          title="Zoom in"
        >
          <ZoomIn className="h-5 w-5" />
        </button>
        <button
          onClick={() => onZoom(-0.2)}
          className="p-3 rounded-lg bg-green-50 hover:bg-green-100 transition-colors text-green-700"
          title="Zoom out"
        >
          <ZoomOut className="h-5 w-5" />
        </button>
        <button
          onClick={onReset}
          className="p-3 rounded-lg bg-red-50 hover:bg-red-50 transition-colors text-red-500"
          title="Reset all transforms"
        >
          <RefreshCcw className="h-5 w-5" />
        </button>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">-180°</span>
        <input
          type="range"
          min="-180"
          max="180"
          value={rotation}
          onChange={(e) => onRotate(Number(e.target.value) - rotation)}
          className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <span className="text-sm text-gray-600">180°</span>
      </div>
    </div>
  );
}