'use client';

import { getMenuItems } from '@/domain/services/dataService';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  Provider as TooltipProvider,
  Root as TooltipRoot,
  Trigger as TooltipTrigger,
  Content as TooltipContent,
} from '@radix-ui/react-tooltip';
import { DecorativeBackground } from '@/components/ui/DecorativeBackground';

const CATEGORY_LABELS: Record<string, { en: string; ja: string; description: string }> = {
  Ramen: {
    en: 'Ramen',
    ja: 'ラーメン',
    description: 'Traditional Japanese noodle soup with various broths and toppings',
  },
  Beer: {
    en: 'Beer',
    ja: 'ビール',
    description: 'Selection of Japanese and craft beers',
  },
  JapaneseSake: {
    en: 'Japanese Sake',
    ja: '日本酒',
    description: "Akishika Shuzō's Junmai Series, brewed in Nose Town, Osaka. Robust, expressive sake with rich umami and vibrant acidity. Perfect pairing with ramen and Japanese side dishes.",
  },
  Ippin: {
    en: 'Side Dishes',
    ja: '一品料理',
    description: "Seasonal and fermented side dishes, including chef's selection, oden, and more. Perfect with drinks or ramen.",
  },
  LunchSpecial: {
    en: 'Lunch Special',
    ja: 'ランチスペシャル',
    description: "Limited-time lunch specials, including fermentation gozen set, kids set, and more. Perfect for a quick meal.",
  },
  DinnerSpecial: {
    en: 'Dinner Special',
    ja: 'ディナースペシャル',
    description: "Tasting experience featuring five appetizers paired with Osaka-brewed beer or sake.",
  },
};

const TIME_LABELS: Record<string, string> = {
  Lunch: '11:30〜14:30 Lunch',
  Sunset: '14:30〜18:00 Sunset',
  Dinner: '18:00〜22:00 Dinner',
  Midnight: '22:00〜23:30 Midnight',
};

function getDefaultTimeSlot() {
  const now = new Date();
  const hour = now.getHours();
  const min = now.getMinutes();
  const time = hour * 60 + min;
  if (time >= 1320 && time < 1410) return 'Midnight'; // 22:00-23:30
  if (time >= 1080 && time < 1320) return 'Dinner'; // 18:00-22:00
  if (time >= 870 && time < 1080) return 'Sunset'; // 14:30-18:00
  if (time >= 690 && time < 870) return 'Lunch'; // 11:30-14:30
  return 'Dinner';
}


export default function MenuPage() {
  const menuItems = getMenuItems();
  const [expandedDescriptions, setExpandedDescriptions] = useState<Record<string, boolean>>({});
  const [activeCategory, setActiveCategory] = useState<string | null>('Ramen');
  const [activeTime, setActiveTime] = useState<string>(getDefaultTimeSlot());

  useEffect(() => {
    setActiveTime(getDefaultTimeSlot());
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
      <div className="min-h-screen bg-white">
        <DecorativeBackground />
        <header className="relative z-10 pt-16 pb-12 px-4 text-center">
          <div className="max-w-md mx-auto">
            <h1 className="text-4xl md:text-5xl font-serif font-light text-[#333333] mb-2">Menu</h1>
            <p className="text-lg text-[#666666] font-light">
              <span className="font-serif">お品書き</span> - Traditional Japanese Cuisine
            </p>
          </div>
        </header>

        {/* 時間帯タブ */}
        <nav className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-[#FFCDB6]/30 py-2 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="overflow-x-auto no-scrollbar">
              <div className="flex justify-center min-w-max py-2">
                {Object.keys(TIME_LABELS).map(time => (
                  <button
                    key={time}
                    onClick={() => setActiveTime(time)}
                    className={`px-3 py-2 mx-1 rounded-full font-medium text-sm whitespace-nowrap transition-all ${
                      activeTime === time ? 'bg-[#E07A5F] text-white' : 'bg-[#FFF5F0] text-[#E07A5F] hover:bg-[#FFE5D0]'
                    }`}
                  >
                    {TIME_LABELS[time]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </nav>

        <nav className="sticky top-[72px] z-20 bg-white/90 backdrop-blur-md border-y border-[#FFCDB6]/30 py-3">
          <div className="max-w-4xl mx-auto px-4">
            <div className="relative overflow-hidden">
              <div className="flex justify-start overflow-x-auto py-1 no-scrollbar mx-auto max-w-full">
                {Object.keys(CATEGORY_LABELS).map((cat) =>
                  grouped[cat]?.length ? (
                    <button
                      key={cat}
                      onClick={() => scrollToCategory(cat)}
                      className={`relative px-3 py-1.5 mx-1.5 text-sm font-medium rounded-md transition-all whitespace-nowrap ${
                        activeCategory === cat
                          ? "text-[#E07A5F] bg-[#FFF5F0]"
                          : "text-[#666666] hover:text-[#E07A5F] hover:bg-[#FFF5F0]/50"
                      }`}
                    >
                      {CATEGORY_LABELS[cat].en}
                      {activeCategory === cat && (
                        <motion.div
                          layoutId="activeCategory"
                          className="absolute bottom-0 left-0 w-full h-0.5 bg-[#E07A5F]"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                    </button>
                  ) : null,
                )}
              </div>
            </div>
          </div>
        </nav>

        <main className="pt-[144px] relative z-10 max-w-4xl mx-auto px-4 py-12">
          {Object.keys(CATEGORY_LABELS).map((cat) =>
            grouped[cat]?.length ? (
              <section id={`category-${cat}`} key={cat} className="mb-24 scroll-mt-24">
                <div className="mb-12 text-center">
                  <h2 className="inline-block text-2xl font-serif font-light text-[#333333] relative">
                    {CATEGORY_LABELS[cat].en}
                    <span className="ml-2 text-lg text-[#E07A5F] font-serif">({CATEGORY_LABELS[cat].ja})</span>
                    <div className="absolute -bottom-3 left-0 right-0 h-[1px] bg-[#FFCDB6]"></div>
                  </h2>
                  <p className="mt-4 text-[#666666] font-light max-w-lg mx-auto">{CATEGORY_LABELS[cat].description}</p>
                </div>

                <div className="flex overflow-x-auto pb-8 gap-6 snap-x snap-mandatory">
                  {grouped[cat].map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                      className="flex-none w-80 snap-center bg-white rounded-lg shadow-md overflow-hidden"
                    >
                      <div className="relative h-48">
                        <div className="absolute inset-0 bg-[#F5F5F5] flex items-center justify-center">
                          <span className="text-[#999999] text-sm font-light">No Image</span>
                        </div>
                        <Image
                          src={`/images/menu/${item.id}.jpg`}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 400px"
                          onError={(e) => {
                            const img = e.target as HTMLImageElement;
                            img.style.display = 'none';
                          }}
                        />
                      </div>

                      <div className="p-6">
                        <div className="flex justify-between items-baseline mb-2">
                          <h3 className="text-xl font-light text-[#333333]">
                            {item.name}
                            <span className="block text-sm text-[#E07A5F] font-serif">{item.name}</span>
                          </h3>
                          {typeof item.priceYen === 'object' ? (
                            <div className="text-right">
                              {Object.entries(item.priceYen as Record<string, number>).map(([size, price]) => (
                                <p key={size} className="text-[#666666] font-light text-sm">
                                  {size}: ¥{price.toLocaleString()}
                                </p>
                              ))}
                            </div>
                          ) : (
                            <p className="text-[#666666] font-light">¥{item.priceYen.toLocaleString()}</p>
                          )}
                        </div>

                        <div className="mb-4">
                          <div
                            className={`text-[#666666] text-sm font-light ${
                              expandedDescriptions[item.id] ? '' : 'line-clamp-2'
                            }`}
                          >
                            {item.description}
                          </div>
                          {item.description.length > 100 && (
                            <button
                              className="flex items-center text-[#E07A5F] text-xs mt-1 hover:text-[#C25E48] focus:outline-none"
                              onClick={() => toggleDescription(item.id)}
                            >
                              {expandedDescriptions[item.id] ? (
                                <>
                                  <span>Show less</span>
                                  <ChevronUp className="w-3 h-3 ml-1" />
                                </>
                              ) : (
                                <>
                                  <span>Read more</span>
                                  <ChevronDown className="w-3 h-3 ml-1" />
                                </>
                              )}
                            </button>
                          )}
                        </div>

                        <div className="space-y-3">
                          <div>
                            <h4 className="text-xs uppercase tracking-wider text-[#999999] mb-1">Ingredients</h4>
                            <div className="flex flex-wrap gap-1">
                              {item.ingredients.map((ingredient: string, index: number) => (
                                <span
                                  key={index}
                                  className="px-2 py-0.5 bg-[#FFF5F0] text-[#E07A5F] rounded-full text-xs font-light"
                                >
                                  {ingredient}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="flex gap-4 text-xs">
                            {item.dietary.length > 0 && (
                              <div>
                                <h4 className="uppercase tracking-wider text-[#999999] mb-1">Dietary</h4>
                                <div className="flex flex-wrap gap-1">
                                  {item.dietary.map((option: string, index: number) => (
                                    <TooltipRoot key={`${option}-${index}`}>
                                      <TooltipTrigger asChild>
                                        <span className="px-2 py-0.5 bg-[#F0F9F0] text-[#6B9080] rounded-full text-xs font-light flex items-center gap-1">
                                          {option}
                                          <Info className="w-3 h-3" />
                                        </span>
                                      </TooltipTrigger>
                                      <TooltipContent side="top" align="center" className="bg-white p-2 rounded shadow-lg text-sm">
                                        <p>{getDietaryDescription(option)}</p>
                                      </TooltipContent>
                                    </TooltipRoot>
                                  ))}
                                </div>
                              </div>
                            )}

                            {item.allergies.length > 0 && (
                              <div>
                                <h4 className="uppercase tracking-wider text-[#999999] mb-1">Allergens</h4>
                                <div className="flex flex-wrap gap-1">
                                  {item.allergies.map((allergy: string, index: number) => (
                                    <span
                                      key={index}
                                      className="px-2 py-0.5 bg-[#FFF0F0] text-[#E76F51] rounded-full text-xs font-light"
                                    >
                                      {allergy}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
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