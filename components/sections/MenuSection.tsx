'use client';

import { getMenuItems } from '@/domain/services/dataService';
import { MenuItem } from '@/domain/types';
import Image from 'next/image';

export default function MenuSection() {
  const items = getMenuItems();

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Menu</h2>

        <div className="flex overflow-x-auto pb-8 gap-6 snap-x snap-mandatory">
          {items.map((item: MenuItem) => (
            <div
              key={item.id}
              className="flex-none w-80 snap-center"
            >
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={`/images/menu/${item.id}.jpg`}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                  <p className="text-lg font-bold text-primary mb-4">
                    ¥{item.priceYen.toLocaleString()}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.dietary.map((diet) => (
                      <span
                        key={diet}
                        className="px-2 py-1 text-sm bg-gray-100 rounded"
                      >
                        {diet}
                      </span>
                    ))}
                  </div>

                  <details className="group">
                    <summary className="cursor-pointer text-primary font-medium">
                      Ingredients & Allergies
                    </summary>
                    <div className="mt-4 space-y-2">
                      <div>
                        <h4 className="font-medium mb-1">Ingredients:</h4>
                        <p className="text-sm text-gray-600">
                          {item.ingredients.join(', ')}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Allergies:</h4>
                        <p className="text-sm text-gray-600">
                          {item.allergies.join(', ')}
                        </p>
                      </div>
                    </div>
                  </details>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 