import restaurantData from '@/infrastructure/data/restaurant.json';
import historyData from '@/infrastructure/data/history.json';
import misoData from '@/infrastructure/data/miso.json';
import foodDrinksData from '@/infrastructure/data/foodDrinks.json';
import menuData from '@/infrastructure/data/menu.json';
import retailData from '@/infrastructure/data/retail.json';
import accessData from '@/infrastructure/data/access.json';
import {
  RestaurantInfo,
  HistoryEvent,
  MisoInfo,
  FoodDrinkItem,
  MenuItem,
  RetailItem,
  AccessInfo
} from '../types';

export interface MisoType {
  id: string;
  name: string;
  origin: string;
  flavor: string;
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
  return foodDrinksData as FoodDrinkItem[];
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