import restaurantData from '@/infrastructure/data/restaurant.json';
import historyData from '@/infrastructure/data/history.json';
import misoData from '@/infrastructure/data/miso.json';
// Use canonical per-category files under infrastructure/data/menu
import ramen from '@/infrastructure/data/menu/ramen.json';
import beer from '@/infrastructure/data/menu/beer.json';
import japaneseSake from '@/infrastructure/data/menu/japanese-sake.json';
import ippin from '@/infrastructure/data/menu/ippin.json';
import lunchSpecial from '@/infrastructure/data/menu/lunch-special.json';
import sunsetSpecial from '@/infrastructure/data/menu/sunset-special.json';
import dinnerSpecial from '@/infrastructure/data/menu/dinner-special.json';
import menuJson from '@/infrastructure/data/menu.json';
import retailData from '@/infrastructure/data/retail.json';
import accessData from '@/infrastructure/data/access.json';
import {
  RestaurantInfo,
  HistoryEvent,
  MisoInfo,
  MisoType,
  FoodDrinkItem,
  MenuItem,
  RetailItem,
  AccessInfo
} from '../types';

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
  // derive food & drink highlights from menu items (beer / sake / ramen)
  const menu: MenuItem[] = getMenuItems();
  const pick = menu.filter((m) => ['Beer', 'JapaneseSake', 'Ramen'].includes(m.category));

  return pick.map((item) => {
    const category = item.category === 'Beer' ? 'beer' : item.category === 'JapaneseSake' ? 'sake' : 'ramen';
    return {
      name: item.name,
      category,
      highlight: (item.description || '').split('\n')[0] || '',
      imageUrl: item.imageUrl || '',
      description: item.description || '',
    } as FoodDrinkItem;
  });
}

// Combine all per-category menu JSON files located under infrastructure/data/menu
const menuData: MenuItem[] = [
  ...ramen,
  ...beer,
  ...japaneseSake,
  ...ippin,
  ...lunchSpecial,
  ...sunsetSpecial,
  ...dinnerSpecial,
];

export function getMenuItems(): MenuItem[] {
  // prefer combined per-category list; fall back to single menu.json if per-category imports are empty
  if (menuData && menuData.length > 0) return menuData;
  return (menuJson as MenuItem[]) || [];
}

export function getRetailItems(): RetailItem[] {
  return retailData;
}

export function getAccessInfo(): AccessInfo {
  return accessData;
} 