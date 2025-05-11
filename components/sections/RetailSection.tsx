import { getRetailItems } from '@/domain/services/dataService';
import { RetailItem } from '@/domain/types';
import Image from 'next/image';

export default function RetailSection() {
  const items = getRetailItems();

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Retail Items</h2>

        <div className="flex overflow-x-auto pb-8 gap-6 snap-x snap-mandatory">
          {items.map((item: RetailItem) => (
            <div
              key={item.name}
              className="flex-none w-80 snap-center"
            >
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={`/images/retail/${item.name.toLowerCase().replace(/\s+/g, '-')}.jpg`}
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
                  <p className="text-gray-600">{item.highlight}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 