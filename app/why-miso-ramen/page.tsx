import { getMisoInfo } from '@/domain/services/dataService';
import Header from '@/components/Header';

export default function WhyMisoRamenPage() {
  const misoInfo = getMisoInfo();

  return (
    <main>
      <Header />
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Why Miso Ramen?</h1>
      
      <div className="prose max-w-none mb-12">
        <p className="text-lg mb-6">
          At Mitsukabose, we believe that miso ramen is not just a dish, but a culinary art form that represents the perfect harmony of tradition and innovation.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-4">Our Miso Selection</h3>
            <p className="text-gray-600 mb-4">
              We carefully select and blend different types of miso to create our unique flavor profile. Each type of miso brings its own character to our ramen.
            </p>
            <ul className="list-disc list-inside text-gray-600">
              {misoInfo.types.map((type) => (
                <li key={type.id} className="mb-2">
                  <span className="font-medium">{type.name}</span> - {type.flavor}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-4">Our Commitment</h3>
            <p className="text-gray-600 mb-4">
              We are committed to:
            </p>
            <ul className="list-disc list-inside text-gray-600">
              <li className="mb-2">Using only the finest quality ingredients</li>
              <li className="mb-2">Maintaining traditional brewing methods</li>
              <li className="mb-2">Creating balanced and complex flavors</li>
              <li className="mb-2">Supporting local miso producers</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    </main>
  );
} 