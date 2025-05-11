import restaurantData from '@/infrastructure/data/restaurant.json';
import historyData from '@/infrastructure/data/history.json';
import misoData from '@/infrastructure/data/miso.json';
import foodDrinksData from '@/infrastructure/data/foodDrinks.json';
import menuData from '@/infrastructure/data/menu.json';
import retailData from '@/infrastructure/data/retail.json';
import accessData from '@/infrastructure/data/access.json';

export interface RestaurantInfo {
  name: string;
  address: string;
  access: string;
  hours: {
    "Wed–Sat": string;
    "Sun & Holidays": string;
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
  category: string;
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

export function getRestaurantInfo(): RestaurantInfo {
  return restaurantData;
}

export function getHistoryEvents(): HistoryEvent[] {
  return historyData;
}

export function getMisoInfo(): MisoInfo {
  return misoData;
}

export function getFoodDrinks(): FoodDrinkItem[] {
  return foodDrinksData;
}

export function getMenuItems(): MenuItem[] {
  return menuData;
}

export function getRetailItems(): RetailItem[] {
  return retailData;
}

export function getAccessInfo(): AccessInfo {
  return accessData;
} 