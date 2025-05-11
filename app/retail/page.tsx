import { Section } from '@/components/Section';
import { getRetailItems } from '@/domain/services/dataService';
import Image from 'next/image';

export default function RetailPage() {
  const items = getRetailItems();

  return (
    <Section title="Retail Miso & Souvenirs">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {items.map((item) => (
          <div key={item.name} className="bg-white p-4 rounded shadow">
            <div className="relative w-full aspect-square mb-4">
              <Image
                src={`/images/retail/${item.name.toLowerCase().replace(/\s+/g, '-')}.jpg`}
                alt={item.name}
                fill
                className="object-cover rounded"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            </div>
            <h3 className="text-lg font-semibold">{item.name}</h3>
            <p className="text-sm text-gray-600 mt-1">{item.highlight}</p>
            <p className="mt-2 font-bold text-primary">¥{item.priceYen.toLocaleString()}</p>
          </div>
        ))}
      </div>
    </Section>
  );
} 