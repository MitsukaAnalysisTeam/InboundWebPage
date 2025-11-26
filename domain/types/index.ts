export interface RestaurantInfo {
  name: string;
  address: string;
  access: string;
  hours: {
    [key: string]: string;
  };
  closed: string[];
  phone: string;
  website: string;
  instagram: string;
  twitter: string;
}


export interface FoodDrinkItem {
  id: string;
  name: string;
  category: 'ramen' | 'beer' | 'sake';
  highlight: string;
  imageUrl: string;
  description: string;
}

export interface MenuItem {
  id: string;
  category: string;
  name: string;
  priceYen: number | Record<string, number | undefined>;
  ingredients: string[];
  dietary: string[];
  allergies: string[];
  imageUrl: string;
  description: string;
  availableAt?: string[];
}

export interface RetailItem {
  name: string;
  priceYen: number;
  highlight: string;
  imageUrl: string;
  description: string;
}

export interface AccessInfo {
  station: string;
  walkTime: string;
  mapUrl: string;
  imageUrl: string;
  description: string;
} 