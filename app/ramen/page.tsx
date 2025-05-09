import { Section } from "@/components/Section";
import { getAllRamen } from "@/domain/ramen/ramenService";
import Image from "next/image";

export default function RamenPage() {
  const ramenList = getAllRamen();

  return (
    <main className="container mx-auto px-4 py-16">
      <Section title="Our Ramen Menu">
        <div className="prose max-w-none mb-8">
          <p className="text-lg">
            Discover our carefully crafted ramen dishes, each featuring our signature miso broth
            and premium ingredients. From mild to spicy, we have something for everyone.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ramenList.map((ramen) => (
            <div key={ramen.id} className="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105">
              <div className="relative w-full h-64">
                <Image
                  src={ramen.imageUrl}
                  alt={ramen.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3">{ramen.name}</h3>
                <p className="text-gray-600 mb-4">{ramen.description}</p>
                <p className="text-xl font-semibold text-[#2B2B2B] mb-4">{ramen.price}</p>
                
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Ingredients:</h4>
                  <div className="flex flex-wrap gap-2">
                    {ramen.ingredients.map((ingredient, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                      >
                        {ingredient}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center">
                  <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                    Spice Level: {ramen.spiceLevel}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </main>
  );
} 