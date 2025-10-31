import { getMenuItems } from '@/domain/services/dataService';
import type { Ramen } from './ramen';

/**
 * Legacy API compatibility layer.
 * Uses unified menu.json via getMenuItems() and filters Ramen-category items.
 */
export const getAllRamen = (): Ramen[] => {
  const menu = getMenuItems();
  return menu.filter((m) => (m.category || '').toString().toLowerCase().includes('ramen')) as Ramen[];
};

export const getRamenById = (id: string): Ramen | undefined => {
  return getAllRamen().find((r) => r.id === id);
};