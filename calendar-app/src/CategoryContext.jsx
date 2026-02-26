import { createContext, useContext } from 'react';
import { CATEGORIES } from './constants';

export const CategoryContext = createContext(CATEGORIES);

export function useCategories() {
  return useContext(CategoryContext);
}

/**
 * Palette of colors for dynamically generated categories.
 * These are visually distinct and avoid clashing with existing category colors.
 */
const DYNAMIC_PALETTE = [
  { color: '#E91E63', textColor: '#fff' },  // Pink
  { color: '#3F51B5', textColor: '#fff' },  // Indigo
  { color: '#009688', textColor: '#fff' },  // Teal
  { color: '#FF5722', textColor: '#fff' },  // Deep Orange
  { color: '#795548', textColor: '#fff' },  // Brown
  { color: '#607D8B', textColor: '#fff' },  // Blue Grey
  { color: '#8BC34A', textColor: '#333' },  // Light Green
  { color: '#FF9800', textColor: '#333' },  // Orange
  { color: '#00BCD4', textColor: '#fff' },  // Cyan
  { color: '#9C27B0', textColor: '#fff' },  // Purple
  { color: '#CDDC39', textColor: '#333' },  // Lime
  { color: '#F44336', textColor: '#fff' },  // Red
  { color: '#2196F3', textColor: '#fff' },  // Blue
  { color: '#4CAF50', textColor: '#fff' },  // Green
  { color: '#FFC107', textColor: '#333' },  // Amber
];

/**
 * Build a category map from events.
 * Known categories keep their preset colors.
 * New categories get auto-assigned colors from the palette.
 */
export function buildCategoryMap(events) {
  const categories = { ...CATEGORIES };
  let paletteIndex = 0;

  for (const ev of events) {
    const cat = ev.category;
    if (cat && !categories[cat]) {
      categories[cat] = DYNAMIC_PALETTE[paletteIndex % DYNAMIC_PALETTE.length];
      paletteIndex++;
    }
  }

  return categories;
}
