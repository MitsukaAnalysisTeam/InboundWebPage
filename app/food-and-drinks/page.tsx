import { getFoodDrinks, type FoodDrinkItem } from '@/domain/services/dataService';

export default function FoodAndDrinksPage() {
  const items = getFoodDrinks();

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Food & Drinks</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((item: FoodDrinkItem) => (
          <div key={item.name} className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-2">{item.name}</h3>
            <p className="text-gray-600">{item.highlight}</p>
            <span className="inline-block mt-2 px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600">
              {item.category}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
} 