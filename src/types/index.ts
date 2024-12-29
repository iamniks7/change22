export type Unit = 'px' | 'cm' | 'mm' | 'inch' | '%';
export type SizeUnit = 'B' | 'KB' | 'MB';
export type ImageFormat = 'original' | 'JPG' | 'JPEG' | 'PNG' | 'WEBP' | 'HEIC';

export interface ImageDimensions {
  width: number;
  height: number;
}

export interface Preset {
  name: string;
  width: number;
  height: number;
  unit: Unit;
}

export interface ImageFile {
  file: File;
  preview: string;
  dimensions?: ImageDimensions;
}

export interface DimensionLimits {
  px: number;
  cm: number;
  mm: number;
  inch: number;
  '%': number;
}