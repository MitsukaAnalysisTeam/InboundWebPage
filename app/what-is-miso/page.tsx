import { getMisoInfo } from '@/domain/services/dataService';
import Header from '@/components/Header';

export default function WhatIsMisoPage() {
  const misoInfo = getMisoInfo();

  return (
    <main>
      <Header />
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">What is Miso?</h1>
      
      <div className="prose max-w-none mb-12">
        <p className="text-lg">{misoInfo.intro}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {misoInfo.types.map((type) => (
          <div key={type.id} className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-2">{type.name}</h3>
            <p className="text-gray-600 mb-2">Origin: {type.origin}</p>
            <p className="text-gray-600">Flavor: {type.flavor}</p>
          </div>
        ))}
      </div>
    </div>
    </main>
  );
} 