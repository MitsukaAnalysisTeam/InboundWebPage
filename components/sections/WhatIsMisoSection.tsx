import { getMisoInfo } from '@/domain/services/dataService';
import { MisoType } from '@/domain/types';

export default function WhatIsMisoSection() {
  const misoInfo = getMisoInfo();

  return (
    <section className="py-16 bg-beige-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">What is Miso?</h2>
        
        <div className="max-w-3xl mx-auto mb-12">
          <p className="text-lg mb-4">{misoInfo.intro}</p>
          <p className="text-lg">
            At Mitsukabose, we carefully select and blend different types of miso to create our unique flavor profile.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {misoInfo.types.map((miso: MisoType) => (
            <div
              key={miso.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-2">{miso.name}</h3>
              <p className="text-gray-600 mb-2">Origin: {miso.origin}</p>
              <p className="text-gray-700">{miso.flavor}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 