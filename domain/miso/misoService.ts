import { getMisoInfo } from '@/domain/services/dataService';
import type { MisoType } from '@/domain/types';

/**
 * Compatibility layer: use centralized miso data via dataService.
 */
export const getAllMiso = (): MisoType[] => {
  return getMisoInfo().types;
};

export const getMisoById = (id: string): MisoType | undefined => {
  return getAllMiso().find((m) => m.id === id);
};