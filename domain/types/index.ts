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

export interface HistoryEvent {
  year: number;
  event: string;
}

export interface MisoType {
  id: string;
  name: string;
  origin: string;
  flavor: string;
}

export interface MisoInfo {
  intro: string;
  types: MisoType[];
}

export interface FoodDrinkItem {
  name: string;
  category: 'ramen' | 'beer' | 'sake';
  highlight: string;
}

export interface MenuItem {
  id: string;
  name: string;
  priceYen: number;
  ingredients: string[];
  dietary: string[];
  allergies: string[];
}

export interface RetailItem {
  name: string;
  priceYen: number;
  highlight: string;
}

export interface AccessInfo {
  station: string;
  walkTime: string;
  mapUrl: string;
} 