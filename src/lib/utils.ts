import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Unit, DimensionLimits } from '../types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

export const dimensionLimits: DimensionLimits = {
  'px': 6000,
  'cm': 158.75,
  'mm': 1587.5,
  'inch': 62.5,
  '%': 100
};

export const presets: Record<Unit, { name: string; width: number; height: number }[]> = {
  px: [
    { name: 'Facebook Cover', width: 1920, height: 1080 },
    { name: 'Instagram Post', width: 1080, height: 1080 },
    { name: 'Twitter Header', width: 1500, height: 500 },
  ],
  cm: [
    { name: 'A4 Paper', width: 21, height: 29.7 },
    { name: 'Business Card', width: 8.5, height: 5.5 },
  ],
  mm: [
    { name: 'Passport Photo', width: 35, height: 45 },
    { name: 'ID Card', width: 85.6, height: 53.98 },
  ],
  inch: [
    { name: 'Standard Photo', width: 6, height: 4 },
    { name: 'Letter', width: 8.5, height: 11 },
  ],
  '%': [
    { name: 'Full Width', width: 100, height: 100 },
    { name: 'Half Width', width: 50, height: 50 },
  ],
};