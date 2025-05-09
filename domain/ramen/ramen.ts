export interface Ramen {
  id: string;
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  ingredients: string[];
  spiceLevel?: 'Mild' | 'Medium' | 'Hot';
} 