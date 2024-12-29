import React from 'react';
import { Lock, Unlock, HelpCircle } from 'lucide-react';
import { Unit, SizeUnit, ImageFormat } from '../types';
import { presets, dimensionLimits, cn } from '../lib/utils';
import { UnitSelector } from './UnitSelector';
import { AdjustModeSelector } from './AdjustModeSelector';
import { Tooltip } from './Tooltip';
import { validateDimension, formatDimension } from '../lib/dimensionUtils';
import { useAspectRatio } from '../hooks/useAspectRatio';

export function ResizeControls({
  selectedUnit,
  width,
  height,
  maintainAspectRatio,
  dpi,
  targetSize,
  sizeUnit,
  format,
  selectedPreset,
  adjustMode,
  onUnitChange,
  onWidthChange,
  onHeightChange,
  onToggleAspectRatio,
  onDpiChange,
  onTargetSizeChange,
  onSizeUnitChange,
  onFormatChange,
  onPresetChange,
  onAdjustModeChange,
  images,
}: Props) {
  const {
    handleDimensionChange,
    canMaintainAspectRatio,
  } = useAspectRatio({
    images,
    maintainAspectRatio,
    width,
    height,
    onWidthChange,
    onHeightChange,
  });

  const isWidthValid = validateDimension(width, selectedUnit);
  const isHeightValid = validateDimension(height, selectedUnit);

  return (
    <div className="space-y-6 bg-white p-2 sm:p-4 md:p-6 rounded-xl">

      <div>
        <label className="block text-base font-medium text-gray-700 mb-2">
          Dimension Unit
        </label>
        <UnitSelector value={selectedUnit} onChange={onUnitChange} />
      </div>

      {/* Dimension Settings */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-base font-medium text-gray-700 mb-2">
              Presets for {selectedUnit.toUpperCase()} dimensions
            </label>
            <select
              value={selectedPreset}
              onChange={(e) => onPresetChange(e.target.value)}
              className="block w-full h-12 px-4 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="custom">Custom Size</option>
              {presets[selectedUnit].map((preset) => (
                <option key={preset.name} value={preset.name}>
                  {preset.name} ({preset.width}x{preset.height} {selectedUnit})
                </option>
              ))}
            </select>
          </div>

          <div className="w-full md:w-1/2">
            <div className="flex items-center gap-2 mb-2">
              <label className="block text-base font-medium text-gray-700">
                Adjust image
              </label>
              <Tooltip content="Choose how the image should fit within the dimensions">
                <HelpCircle className="h-4 w-4 text-gray-400" />
              </Tooltip>
            </div>
            <AdjustModeSelector value={adjustMode} onChange={onAdjustModeChange} />
          </div>
        </div>
      
      <div className="grid grid-cols-5 gap-4 items-start">
        <div className="col-span-2">
          <label className="block text-base font-medium text-gray-700 mb-2">
            Width
          </label>
          <div className="space-y-1">
            <div className="relative">
              <input
                type="number"
                step="any"
                value={formatDimension(width)}
                onChange={(e) => handleDimensionChange(e.target.value, 'width')}
                placeholder="-"
                className={cn(
                  "block w-full h-12 px-4 rounded-xl border focus:ring-blue-500",
                  !isWidthValid 
                    ? "border-red-300 focus:border-red-500 text-red-900" 
                    : "border-gray-300 focus:border-blue-500"
                )}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                {selectedUnit}
              </span>
            </div>
            {!isWidthValid && (
              <p className="text-sm text-red-600">
                Maximum width for {selectedUnit} is {dimensionLimits[selectedUnit]}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-center pt-8">
          <Tooltip 
            content={
              !canMaintainAspectRatio
                ? "This lock feature is only available for single image"
                : "Lock aspect ratio"
            }
          >
            <button
              onClick={onToggleAspectRatio}
              className={`p-2 rounded-lg ${!canMaintainAspectRatio ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
              disabled={!canMaintainAspectRatio}
            >
              {maintainAspectRatio ? (
                <Lock className="h-5 w-5 text-blue-500" />
              ) : (
                <Unlock className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </Tooltip>
        </div>

        <div className="col-span-2">
          <label className="block text-base font-medium text-gray-700 mb-2">
            Height
          </label>
          <div className="space-y-1">
            <div className="relative">
              <input
                type="number"
                step="any"
                value={formatDimension(height)}
                onChange={(e) => handleDimensionChange(e.target.value, 'height')}
                placeholder="-"
                className={cn(
                  "block w-full h-12 px-4 rounded-xl border focus:ring-blue-500",
                  !isHeightValid 
                    ? "border-red-300 focus:border-red-500 text-red-900" 
                    : "border-gray-300 focus:border-blue-500"
                )}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                {selectedUnit}
              </span>
            </div>
            {!isHeightValid && (
              <p className="text-sm text-red-600">
                Maximum height for {selectedUnit} is {dimensionLimits[selectedUnit]}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>


      <hr className="border-gray-200" />

      {/* File Size Settings */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-base font-medium text-gray-700 mb-2">
            Target File Size (optional)
          </label>
          <div className="relative">
            <input
              type="text"
              pattern="[0-9]*"
              value={targetSize || ''}
              onChange={(e) => onTargetSizeChange(Number(e.target.value))}
              placeholder="Not set"
              className="block w-full h-12 px-4 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
              {sizeUnit}
            </span>
          </div>
        </div>

        <div>
          <label className="block text-base font-medium text-gray-700 mb-2">
            Size Unit
          </label>
          <select
            value={sizeUnit}
            onChange={(e) => onSizeUnitChange(e.target.value as SizeUnit)}
            className="block w-full h-12 px-4 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="B">Bytes</option>
            <option value="KB">Kilobytes (KB)</option>
            <option value="MB">Megabytes (MB)</option>
          </select>
        </div>
      </div>

      <hr className="border-gray-200" />

      {/* Output Settings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-base font-medium text-gray-700 mb-2">
            Save image as
          </label>
          <select
            value={format}
            onChange={(e) => onFormatChange(e.target.value as ImageFormat)}
            className="block w-full h-12 px-4 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="original">Original</option>
            <option value="JPG">JPG</option>
            <option value="JPEG">JPEG</option>
            <option value="PNG">PNG</option>
            <option value="WEBP">WEBP</option>
            <option value="HEIC">HEIC</option>
          </select>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <label className="block text-base font-medium text-gray-700">
              DPI (optional)
            </label>
            <Tooltip content="Dots Per Inch - affects print quality">
              <HelpCircle className="h-4 w-4 text-gray-400" />
            </Tooltip>
          </div>
          <input
            type="text"
            pattern="[0-9]*"
            value={dpi || ''}
            onChange={(e) => onDpiChange(Number(e.target.value))}
            placeholder="Default"
            className="block w-full h-12 px-4 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
}