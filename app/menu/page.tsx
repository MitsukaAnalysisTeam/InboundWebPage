import { getMenuItems } from '@/domain/services/dataService';
import Image from 'next/image';
import Header from '@/components/Header';

export default function MenuPage() {
  const menuItems = getMenuItems();

  return (
    <main>
      <Header />
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Menu</h1>

      <div className="space-y-8">
        {menuItems.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="md:flex">
              <div className="relative w-full md:w-1/3 aspect-video md:aspect-square">
                <Image
                  src={`/images/menu/${item.id}.jpg`}
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-6 flex-1">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold">{item.name}</h3>
                  <span className="text-lg font-medium">¥{item.priceYen.toLocaleString()}</span>
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
    </div>
    </main>
  );
} 