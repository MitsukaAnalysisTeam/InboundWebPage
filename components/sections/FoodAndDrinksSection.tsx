import { getFoodDrinks } from '@/domain/services/dataService';
import { FoodDrinkItem } from '@/domain/types';

export default function FoodAndDrinksSection() {
  const items = getFoodDrinks();

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Food & Drinks</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item: FoodDrinkItem) => (
            <div
              key={item.name}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="mb-4">
                <span className="inline-block px-3 py-1 text-sm font-semibold rounded-full bg-primary text-white">
                  {item.category}
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
              <p className="text-gray-600">{item.highlight}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 