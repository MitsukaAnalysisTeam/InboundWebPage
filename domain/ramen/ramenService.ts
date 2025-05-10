import ramenData from '@/infrastructure/data/ramen.json';
import { Ramen } from './ramen';

type RamenData = {
  ramen: Array<{
    id: string;
    name: string;
    description: string;
    price: string;
    imageUrl: string;
    ingredients: string[];
    spiceLevel: 'Mild' | 'Medium' | 'Hot';
  }>;
};

export const getAllRamen = (): Ramen[] => {
  return (ramenData as RamenData).ramen;
};

export const getRamenById = (id: string): Ramen | undefined => {
  return (ramenData as RamenData).ramen.find(ramen => ramen.id === id);
}; 