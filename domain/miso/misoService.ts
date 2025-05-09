import misoData from '@/infrastructure/data/miso.json';
import { Miso } from './miso';

export const getAllMiso = (): Miso[] => {
  return misoData.miso;
};

export const getMisoById = (id: string): Miso | undefined => {
  return misoData.miso.find(miso => miso.id === id);
}; 