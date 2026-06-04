'use client';

import type { MenuItem, MenuCategory, TimeSlot } from '@/domain/types';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Info, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Provider as TooltipProvider,
  Root as TooltipRoot,
  Trigger as TooltipTrigger,
  Content as TooltipContent,
} from '@radix-ui/react-tooltip';
import { DecorativeBackground } from '@/components/ui/DecorativeBackground';

const CATEGORY_LABELS: Record<MenuCategory, { en: string; ja: string; description: string }> = {
  Ramen: {
    en: 'Ramen',
    ja: 'ラーメン',
    description: 'Traditional Japanese noodle soup with various broths and toppings',
  },
  Kaedama: {
    en: 'Kaedama',
    ja: '替え玉',
    description: 'Refill noodles to enjoy more with your remaining soup. Seasoned options available.',
  },
  Beer: {
    en: 'Beer',
    ja: 'ビール',
    description: 'Selection of Japanese and craft beers',
  },
  JapaneseSake: {
    en: 'Japanese Sake',
    ja: '日本酒',
    description: "Akishika Shuzō's sake brewed in Nose Town, Osaka. Robust, expressive sake with rich umami and vibrant acidity. Perfect pairing with ramen and Japanese side dishes.",
  },
  Wine: {
    en: 'Wine',
    ja: 'ワイン',
    description: 'Curated selection of Japanese wines, including rare Koshu varietal bottles and house pour by the glass.',
  },
  SoftDrink: {
    en: 'Soft Drinks',
    ja: 'ソフトドリンク',
    description: 'Non-alcoholic beverages including local Toyono cider, seasonal soda, house-roasted coffee, and more.',
  },
  Dessert: {
    en: 'Dessert',
    ja: 'デザート',
    description: 'Sweet endings — from nostalgic icecrine to rich cheesecake paired with house-roasted coffee.',
  },
  Ippin: {
    en: 'Side Dishes',
    ja: '一品料理',
    description: "Seasonal and fermented side dishes, including chef's selection, oden, and more. Perfect with drinks or ramen.",
  },
  LunchSpecial: {
    en: 'Lunch Special',
    ja: 'ランチスペシャル',
    description: 'Limited-time lunch specials, including the fermentation gozen set, kids set, and more.',
  },
  SunsetSpecial: {
    en: 'Sunset Special',
    ja: 'サンセットスペシャル',
    description: 'Relaxed afternoon bites and sets, available during the golden hours of 14:30–17:30.',
  },
  DinnerSpecial: {
    en: 'Dinner Special',
    ja: 'ディナースペシャル',
    description: 'Evening side sets to complement your ramen — choose from small plates, karaage, or rice options.',
  },
};

const TIME_LABELS: Record<TimeSlot, string> = {
  Lunch: '11:30〜14:30 Lunch',
  Sunset: '14:30〜17:30 Sunset',
  Dinner: '17:30〜22:00 Dinner',
  Midnight: '22:00〜23:30 Midnight (Wed–Sat)',
};

function isMidnightDay(): boolean {
  return [3, 4, 5, 6].includes(new Date().getDay()); // Wed–Sat
}

function getDefaultTimeSlot(): TimeSlot {
  const now = new Date();
  const day = now.getDay();
  const time = now.getHours() * 60 + now.getMinutes();
  if ([3, 4, 5, 6].includes(day) && time >= 1320 && time < 1410) return 'Midnight'; // 22:00-23:30 Wed-Sat
  if (time >= 1050 && time < 1320) return 'Dinner'; // 17:30-22:00
  if (time >= 870 && time < 1050) return 'Sunset'; // 14:30-17:30
  if (time >= 690 && time < 870) return 'Lunch'; // 11:30-14:30
  return 'Dinner';
}


export default function MenuClient() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [expandedDescriptions, setExpandedDescriptions] = useState<Record<string, boolean>>({});
  const [activeCategory, setActiveCategory] = useState<string | null>('Ramen');
  const [activeTime, setActiveTime] = useState<TimeSlot>(getDefaultTimeSlot());
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const midnightAvailable = isMidnightDay();

  useEffect(() => {
    setActiveTime(getDefaultTimeSlot());
  }, []);

  // Fetch menu from API (which tries DB, falls back to JSON files)
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch('/api/menu');
        if (!res.ok) throw new Error('Failed to fetch menu');
        else console.log('Menu fetched successfully from API');

        const data = await res.json();
        if (mounted && Array.isArray(data)) setMenuItems(data as MenuItem[]);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Error fetching menu:', err);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  // 時間帯でフィルタ
  const filteredMenuItems = menuItems.filter(item =>
    item.availableAt ? item.availableAt.includes(activeTime) : activeTime === 'Dinner'
  );

  // Group items by category
  const grouped = filteredMenuItems.reduce(
    (acc: Record<string, typeof menuItems>, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item);
      return acc;
    },
    {} as Record<string, typeof menuItems>,
  );

  const toggleDescription = (id: string) => {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const scrollToCategory = (category: string) => {
    const element = document.getElementById(`category-${category}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveCategory(category);
    }
  };

  return (
    <TooltipProvider delayDuration={200} skipDelayDuration={100}>
      <div className="min-h-screen bg-background">
        <DecorativeBackground />
        {/* Image Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="relative max-w-4xl w-full"
                onClick={e => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute -top-12 right-0 text-washi hover:text-kohaku transition-colors"
                >
                  <X size={32} />
                </button>
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={selectedImage}
                    alt="Enlarged view"
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        <header className="relative z-10 pt-20 pb-6 px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-[9px] tracking-[0.5em] text-kohaku uppercase mb-2 font-light">
                Mitsukabose
              </p>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="font-serif text-4xl md:text-5xl font-light text-foreground mb-2 tracking-wide"
            >
              Menu
            </motion.h1>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center justify-center gap-3"
            >
              <div className="w-8 h-px bg-kasshoku/20" />
              <p className="text-sm text-foreground-soft font-light">
                <span className="font-serif tracking-[0.3em]">お品書き</span>
                <span className="mx-2 text-muted/40">·</span>
                <span className="text-xs">Fermented Miso Ramen &amp; Craft Beer</span>
              </p>
              <div className="w-8 h-px bg-kasshoku/20" />
            </motion.div>
          </div>
        </header>

        {/* 時間帯タブ */}
        <nav className="sticky top-0 z-30 bg-kasshoku-deep/95 backdrop-blur-md shadow-[0_2px_20px_-4px_rgba(31,26,20,0.5)] py-3 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="overflow-x-auto no-scrollbar">
              <div className="flex justify-center min-w-max gap-2">
                {(Object.keys(TIME_LABELS) as TimeSlot[])
                  .filter(time => time !== 'Midnight' || midnightAvailable)
                  .map(time => (
                  <button
                    key={time}
                    onClick={() => setActiveTime(time)}
                    className={`relative px-4 py-2 text-xs tracking-[0.15em] uppercase font-light whitespace-nowrap transition-all duration-300 rounded-sm ${
                      activeTime === time
                        ? 'bg-shibu-aka text-washi shadow-[0_4px_12px_-4px_rgba(178,58,43,0.6)]'
                        : 'text-kohaku-soft/70 hover:text-kohaku-soft border border-washi/10 hover:border-washi/30'
                    }`}
                  >
                    {TIME_LABELS[time]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </nav>

        <nav className="sticky top-[56px] z-20 bg-background/95 backdrop-blur-md border-b border-kasshoku/10 shadow-[0_4px_16px_-8px_rgba(91,58,41,0.15)] py-2.5">
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex justify-start overflow-x-auto no-scrollbar gap-1">
              {(Object.keys(CATEGORY_LABELS) as MenuCategory[]).map((cat) =>
                grouped[cat]?.length ? (
                  <button
                    key={cat}
                    onClick={() => scrollToCategory(cat)}
                    className={`relative px-3 py-1.5 text-sm font-light rounded-sm transition-all duration-200 whitespace-nowrap ${
                      activeCategory === cat
                        ? 'text-shibu-aka'
                        : 'text-foreground-soft hover:text-shibu-aka'
                    }`}
                  >
                    {CATEGORY_LABELS[cat].en}
                    {activeCategory === cat && (
                      <motion.div
                        layoutId="activeCategory"
                        className="absolute bottom-0 left-0 w-full h-0.5 bg-shibu-aka"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                      />
                    )}
                  </button>
                ) : null,
              )}
            </div>
          </div>
        </nav>

        <main className="relative z-10 max-w-5xl mx-auto px-3 sm:px-4 py-6">
          {(Object.keys(CATEGORY_LABELS) as MenuCategory[]).map((cat) =>
            grouped[cat]?.length ? (
              <section id={`category-${cat}`} key={cat} className="mb-14 scroll-mt-28">
                {/* Category header — compact */}
                <div className="mb-5 flex items-center gap-4">
                  <div className="flex-1 h-px bg-kasshoku/12" />
                  <div className="text-center flex-none">
                    <p className="text-[9px] tracking-[0.35em] text-kohaku uppercase mb-0.5 font-light">
                      {CATEGORY_LABELS[cat].ja}
                    </p>
                    <h2 className="font-serif text-xl md:text-2xl font-light text-foreground tracking-wide">
                      {CATEGORY_LABELS[cat].en}
                    </h2>
                  </div>
                  <div className="flex-1 h-px bg-kasshoku/12" />
                  {/* Item count badge */}
                  <span className="flex-none text-[10px] text-muted font-light tabular-nums">
                    {grouped[cat].length} items
                  </span>
                </div>
                <p className="text-center text-foreground-soft font-light text-xs max-w-md mx-auto mb-6 leading-relaxed">
                  {CATEGORY_LABELS[cat].description}
                </p>

                {/* Grid layout: 2 cols mobile, 3 cols desktop */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                  {grouped[cat].map((item, itemIndex) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.15 }}
                      transition={{ duration: 0.45, delay: Math.min(itemIndex * 0.05, 0.3), ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="group bg-background-soft/50 border border-kasshoku/8 rounded-md overflow-hidden shadow-[0_2px_16px_-6px_rgba(91,58,41,0.1)] hover:shadow-[0_8px_32px_-8px_rgba(91,58,41,0.2)] transition-all duration-300 hover:-translate-y-0.5 h-full flex flex-col">
                        {/* Image — compact */}
                        <div className="relative aspect-[4/3] overflow-hidden bg-background-soft flex-none">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-muted text-[9px] tracking-widest uppercase font-light">No Image</span>
                          </div>
                          <Image
                            src={item.imageUrl}
                            alt={item.name}
                            fill
                            className="object-cover cursor-zoom-in group-hover:scale-105 transition-transform duration-700 ease-out"
                            sizes="(max-width: 768px) 50vw, 280px"
                            onClick={() => setSelectedImage(item.imageUrl)}
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                          />
                          {/* Price badge */}
                          <div className="absolute bottom-0 right-0 m-2">
                            {typeof item.priceYen === 'number' ? (
                              <span className="bg-kasshoku-deep/80 backdrop-blur-sm text-kohaku-soft text-[10px] font-light px-2 py-0.5 rounded-sm tracking-wider">
                                ¥{item.priceYen.toLocaleString()}
                              </span>
                            ) : (
                              <span className="bg-kasshoku-deep/80 backdrop-blur-sm text-kohaku-soft text-[10px] font-light px-2 py-0.5 rounded-sm tracking-wider">
                                ¥{Math.min(...Object.values(item.priceYen as Record<string, number>)).toLocaleString()}〜
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="p-3 sm:p-4 flex flex-col flex-1">
                          {/* Title */}
                          <h3 className="font-serif text-sm sm:text-base font-light text-foreground tracking-wide mb-1 leading-snug line-clamp-2">
                            {item.name}
                          </h3>

                          {/* Multi-price table — collapsed on mobile */}
                          {typeof item.priceYen === 'object' && (
                            <div className="mb-2 border-t border-kasshoku/8 pt-1.5 mt-1 hidden sm:block">
                              {Object.entries(item.priceYen as Record<string, number>).map(([size, price]) => (
                                <div key={size} className="flex justify-between items-baseline py-px">
                                  <span className="text-[10px] text-muted font-light truncate mr-1.5 max-w-[55%]">{size}</span>
                                  <span className="text-[10px] text-foreground font-light tabular-nums whitespace-nowrap">¥{price.toLocaleString()}</span>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Description — 2 lines on mobile, 3 on desktop */}
                          <div className="flex-1">
                            <div className={`text-foreground-soft text-xs sm:text-sm font-light leading-relaxed ${
                              expandedDescriptions[item.id] ? '' : 'line-clamp-2 sm:line-clamp-3'
                            }`}>
                              {item.description}
                            </div>
                            {item.description.length > 80 && (
                              <button
                                className="inline-flex items-center gap-0.5 text-shibu-aka text-[10px] sm:text-xs mt-1 hover:text-shibu-aka-deep transition-colors focus:outline-none"
                                onClick={() => toggleDescription(item.id)}
                              >
                                {expandedDescriptions[item.id] ? (
                                  <><span>Less</span><ChevronUp className="w-2.5 h-2.5" /></>
                                ) : (
                                  <><span>More</span><ChevronDown className="w-2.5 h-2.5" /></>
                                )}
                              </button>
                            )}
                          </div>

                          {/* Tags — compact */}
                          <div className="mt-2.5 pt-2 border-t border-kasshoku/8 space-y-1">
                            {item.ingredients.length > 0 && (
                              <div className="flex flex-wrap gap-0.5">
                                {item.ingredients.slice(0, 3).map((ing: string, i: number) => (
                                  <span key={i} className="px-1.5 py-px bg-background text-muted rounded-full text-[8px] sm:text-[9px] font-light border border-kasshoku/8">
                                    {ing}
                                  </span>
                                ))}
                                {item.ingredients.length > 3 && (
                                  <span className="px-1 py-px text-muted text-[8px] font-light">+{item.ingredients.length - 3}</span>
                                )}
                              </div>
                            )}
                            <div className="flex flex-wrap gap-0.5">
                              {item.dietary.map((opt: string, i: number) => (
                                <TooltipRoot key={`${opt}-${i}`}>
                                  <TooltipTrigger asChild>
                                    <span className="px-1.5 py-px bg-matcha/10 text-matcha rounded-full text-[8px] sm:text-[9px] font-light flex items-center gap-px cursor-help">
                                      {opt}<Info className="w-2 h-2" />
                                    </span>
                                  </TooltipTrigger>
                                  <TooltipContent side="top" className="bg-kasshoku-deep text-washi text-xs px-3 py-2 rounded-sm shadow-xl">
                                    {getDietaryDescription(opt)}
                                  </TooltipContent>
                                </TooltipRoot>
                              ))}
                              {item.allergies.map((alg: string, i: number) => (
                                <span key={i} className="px-1.5 py-px bg-shibu-aka/10 text-shibu-aka rounded-full text-[8px] sm:text-[9px] font-light">
                                  {alg}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>
            ) : null,
          )}
        </main>
      </div>
    </TooltipProvider>
  );
}

function getDietaryDescription(option: string): string {
  const descriptions: Record<string, string> = {
    Vegetarian: "Contains no meat, poultry, fish, or seafood, but may contain eggs or dairy",
    Vegan: "Contains no animal products or by-products whatsoever",
    "Gluten-Free": "Contains no wheat, barley, rye, or other gluten-containing ingredients",
    ベジタリアン: "Contains no meat, poultry, fish, or seafood, but may contain eggs or dairy",
    ビーガン: "Contains no animal products or by-products whatsoever",
  };

  return descriptions[option] || option;
} 