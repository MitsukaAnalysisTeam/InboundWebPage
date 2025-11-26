// Use canonical per-category files under infrastructure/data/menu
import ramen from '@/infrastructure/data/menu/ramen.json';
import beer from '@/infrastructure/data/menu/beer.json';
import japaneseSake from '@/infrastructure/data/menu/japanese-sake.json';
import ippin from '@/infrastructure/data/menu/ippin.json';
import lunchSpecial from '@/infrastructure/data/menu/lunch-special.json';
import sunsetSpecial from '@/infrastructure/data/menu/sunset-special.json';
import dinnerSpecial from '@/infrastructure/data/menu/dinner-special.json';
import accessData from '@/infrastructure/data/access.json';
import menuImageOrder from '@/infrastructure/data/menu_image_order.json';
import foodDrinks from '@/infrastructure/data/foodDrinks.json';
import {
  FoodDrinkItem,    
  MenuItem,
  AccessInfo
} from '../types';

export function getFoodDrinks(): FoodDrinkItem[] {
  // If a curated foodDrinks.json exists, prefer it (it contains pre-derived FoodDrinkItem-like objects)
  if (Array.isArray(foodDrinks) && foodDrinks.length > 0) {
    // map entries to FoodDrinkItem
    const fromFile = (foodDrinks as any[]).map((it) => {
      const rawCategory = (it.category || '').toString();
      const category = /beer/i.test(rawCategory)
        ? 'beer'
        : /sake/i.test(rawCategory)
        ? 'sake'
        : 'ramen';
      const rawImage = (it.imageUrl || '').toString();
      const imageUrl = rawImage && !rawImage.includes('.DS_Store') ? rawImage : '/placeholder.svg';
      const id = (it.id && it.id.toString()) || (it.name ?? '').toString().replace(/\s+/g, '-').toLowerCase();
      return {
        id,
        name: it.name ?? '',
        category,
        highlight: it.highlight ?? ((it.description || '').toString().split('\n')[0] || ''),
        imageUrl,
        description: it.description ?? '',
      } as FoodDrinkItem;
    });

    // if menu image order exists, sort by basename
    if (Array.isArray(menuImageOrder) && menuImageOrder.length > 0) {
      const orderMap = new Map(menuImageOrder.map((f, i) => [f, i]));
      return fromFile
        .map((fd) => ({ ...fd, _imageBasename: fd.imageUrl.replace(/^.*\//, '') }))
        .sort((a: any, b: any) => (orderMap.get(a._imageBasename) ?? Number.MAX_SAFE_INTEGER) - (orderMap.get(b._imageBasename) ?? Number.MAX_SAFE_INTEGER))
        .map(({ _imageBasename, ...rest }: any) => rest as FoodDrinkItem);
    }

    return fromFile;
  }

  // derive food & drink highlights from menu items (beer / sake / ramen)
  const menu: MenuItem[] = getMenuItems();
  const pick = menu.filter((m) => ['Beer', 'JapaneseSake', 'Ramen'].includes(m.category));

  return pick.map((item) => {
    const category = item.category === 'Beer' ? 'beer' : item.category === 'JapaneseSake' ? 'sake' : 'ramen';
    // sanitize imageUrl: avoid .DS_Store or invalid entries
    const rawImage = (item as any).imageUrl as string | undefined;
    const imageUrl = rawImage && !rawImage.includes('.DS_Store') ? rawImage : '/placeholder.svg';

    const result = {
      id: item.id || (item.name ?? '').replace(/\s+/g, '-').toLowerCase(),
      name: item.name,
      category,
      highlight: (item.description || '').split('\n')[0] || '',
      imageUrl,
      description: item.description || '',
    } as FoodDrinkItem;
    return result;
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
  // return combined per-category menu list
  return menuData || [];
}

export function getAccessInfo(): AccessInfo {
  return accessData;
} 