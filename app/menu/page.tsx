'use client';

import { getMenuItems } from '@/domain/services/dataService';
import Image from 'next/image';

const CATEGORY_LABELS: Record<string, string> = {
  Ramen: 'Ramen',
  Beer: 'Beer',
  JapaneseSake: 'Japanese Sake',
  Ippin: 'Side Dishes',
};

export default function MenuPage() {
  const menuItems = getMenuItems();

  // カテゴリごとにグループ化
  const grouped = menuItems.reduce((acc: Record<string, typeof menuItems>, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, typeof menuItems>);

  return (
    <main>
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Menu</h1>

        {Object.keys(CATEGORY_LABELS).map((cat) => (
          grouped[cat]?.length ? (
            <section key={cat} className="mb-12">
              <h2 className="text-2xl font-bold mb-6">{CATEGORY_LABELS[cat]}</h2>
              <div className="flex overflow-x-auto pb-8 gap-6 snap-x snap-mandatory">
                {grouped[cat].map((item) => (
                  <div key={item.id} className="flex-none w-80 snap-center">
                    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
                      <div className="relative w-full aspect-square">
                        <Image
                          src={`/images/menu/${item.id}.jpg`}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>
                      <div className="p-4 flex-1 flex flex-col">
                        <h3 className="text-lg font-semibold mb-1">{item.name}</h3>
                        <p className="text-lg font-bold text-primary mb-2">¥{item.priceYen.toLocaleString()}</p>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {item.dietary.map((diet) => (
                            <span key={diet} className="px-2 py-1 text-sm bg-gray-100 rounded">{diet}</span>
                          ))}
                        </div>
                        <div className="mb-2">
                          <p id={`description-${item.id}`} className="text-sm text-gray-600 line-clamp-3">
                            {item.description}
                          </p>
                          <button
                            className="text-primary text-sm font-medium mt-1 hover:underline focus:outline-none"
                            onClick={() => {
                              const element = document.getElementById(`description-${item.id}`);
                              if (element) {
                                element.classList.toggle('line-clamp-3');
                              }
                            }}
                          >
                            details
                          </button>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium mb-2">Ingredients:</h4>
                            <div className="flex flex-wrap gap-2">
                              {item.ingredients.map((ingredient, index) => (
                                <span key={index} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                                  {ingredient}
                                </span>
                              ))}
                            </div>
                          </div>

                          {item.dietary.length > 0 && (
                            <div>
                              <h4 className="font-medium mb-2">Dietary Options:</h4>
                              <div className="flex flex-wrap gap-2">
                                {item.dietary.map((option, index) => (
                                  <span key={index} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                                    {option}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {item.allergies.length > 0 && (
                            <div>
                              <h4 className="font-medium mb-2">Allergens:</h4>
                              <div className="flex flex-wrap gap-2">
                                {item.allergies.map((allergy, index) => (
                                  <span key={index} className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                                    {allergy}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ) : null
        ))}
      </div>
    </main>
  );
} 