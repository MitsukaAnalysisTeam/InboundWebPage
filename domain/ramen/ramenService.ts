import ramenData from '@/infrastructure/data/ramen.json';
import { Ramen } from './ramen';

export const getAllRamen = (): Ramen[] => {
  return ramenData.ramen;
};

export const getRamenById = (id: string): Ramen | undefined => {
  return ramenData.ramen.find(ramen => ramen.id === id);
}; 