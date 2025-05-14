'use client';

import { getMenuItems } from '@/domain/services/dataService';
import Image from 'next/image';
import { useState } from 'react';
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
    description: 'Traditional rice wine from different regions of Japan',
  },
  Ippin: {
    en: 'Side Dishes',
    ja: '一品料理',
    description: 'Small dishes perfect for sharing or accompanying drinks',
  },
};

export default function MenuPage() {
  const menuItems = getMenuItems();
  const [expandedDescriptions, setExpandedDescriptions] = useState<Record<string, boolean>>({});
  const [activeCategory, setActiveCategory] = useState<string | null>('Ramen');

  // Group items by category
  const grouped = menuItems.reduce(
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

        <nav className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-y border-[#FFCDB6]/30 py-4">
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex justify-center overflow-x-auto gap-8 no-scrollbar">
              {Object.keys(CATEGORY_LABELS).map((cat) =>
                grouped[cat]?.length ? (
                  <button
                    key={cat}
                    onClick={() => scrollToCategory(cat)}
                    className={`relative px-2 py-1 text-sm font-light transition-all ${
                      activeCategory === cat ? 'text-[#E07A5F]' : 'text-[#666666] hover:text-[#E07A5F]'
                    }`}
                  >
                    {CATEGORY_LABELS[cat].en}
                    {activeCategory === cat && (
                      <motion.div
                        layoutId="activeCategory"
                        className="absolute -bottom-1 left-0 right-0 h-[1px] bg-[#E07A5F]"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </button>
                ) : null,
              )}
            </div>
          </div>
        </nav>

        <main className="relative z-10 max-w-4xl mx-auto px-4 py-12">
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
                        <Image
                          src={`/images/menu/${item.id}.jpg`}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 400px"
                        />
                      </div>

                      <div className="p-6">
                        <div className="flex justify-between items-baseline mb-2">
                          <h3 className="text-xl font-light text-[#333333]">
                            {item.name}
                            <span className="block text-sm text-[#E07A5F] font-serif">{item.name}</span>
                          </h3>
                          <p className="text-[#666666] font-light">¥{item.priceYen.toLocaleString()}</p>
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

        <footer className="relative z-10 border-t border-[#FFCDB6]/30 py-12 mt-12">
          <div className="max-w-4xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-serif font-light text-[#333333] mb-4">About Japanese Cuisine</h3>
                <p className="text-sm text-[#666666] font-light">
                  Japanese cuisine is known for its seasonal ingredients, meticulous preparation, and beautiful
                  presentation. Our menu offers authentic dishes prepared with traditional techniques.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-serif font-light text-[#333333] mb-4">Dining Etiquette</h3>
                <ul className="text-sm text-[#666666] font-light space-y-2">
                  <li>• It's customary to say "Itadakimasu" before eating</li>
                  <li>• Slurping noodles is considered a compliment to the chef</li>
                  <li>• Chopsticks should never be stuck vertically in rice</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-serif font-light text-[#333333] mb-4">Have Questions?</h3>
                <p className="text-sm text-[#666666] font-light">
                  Our staff is happy to explain any dishes or ingredients. Don't hesitate to ask about recommendations
                  or dietary concerns.
                </p>
              </div>
            </div>
            <div className="mt-12 text-center">
              <p className="text-xs text-[#999999]">© 2023 Japanese Restaurant. All rights reserved.</p>
            </div>
          </div>
        </footer>
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