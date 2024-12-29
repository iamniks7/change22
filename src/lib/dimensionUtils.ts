import { Unit } from '../types';
import { dimensionLimits } from './utils';

export function parseDecimalInput(value: string): number | '' {
  if (value === '') return '';

  // Remove any non-numeric characters except decimal point and minus
  const sanitizedValue = value.replace(/[^\d.-]/g, '');
  
  // Ensure only one decimal point
  const parts = sanitizedValue.split('.');
  if (parts.length > 2) return '';
  
  // Parse the sanitized value
  const parsed = parseFloat(sanitizedValue);
  
  // Return empty string if NaN or invalid number
  if (isNaN(parsed) || !isFinite(parsed)) return '';

  return parsed;
}

export function validateDimension(value: number | '', unit: Unit): boolean {
  if (value === '') return true;
  if (typeof value !== 'number') return false;
  if (isNaN(value) || !isFinite(value)) return false;
  return value >= 0 && value <= dimensionLimits[unit];
}

export function formatDimension(value: number | ''): string {
  if (value === '') return '';
  if (typeof value !== 'number' || isNaN(value) || !isFinite(value)) return '';
  
  // Format with up to 2 decimal places, but remove trailing zeros
  return Number(value.toFixed(2)).toString();
}

export function calculateAspectRatio(width: number, height: number): number {
  return width / height;
}

export function calculateDimensionWithAspectRatio(
  value: number | '',
  aspectRatio: number,
  isWidth: boolean
): number | '' {
  if (value === '') return '';
  if (typeof value !== 'number') return '';
  if (!isFinite(aspectRatio)) return '';

  if (isWidth) {
    // Calculate height from width
    return Number((value / aspectRatio).toFixed(2));
  } else {
    // Calculate width from height
    return Number((value * aspectRatio).toFixed(2));
  }
}