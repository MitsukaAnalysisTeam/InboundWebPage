import misoData from '@/infrastructure/data/miso.json';
import { MisoType } from '@/domain/types';

export const getAllMiso = (): MisoType[] => {
  return misoData.types;
};

export const getMisoById = (id: string): MisoType | undefined => {
  return misoData.types.find(miso => miso.id === id);
}; 