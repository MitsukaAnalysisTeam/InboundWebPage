import { Section } from "@/components/Section";
import { getAllMiso } from "@/domain/miso/misoService";
import Image from "next/image";

export default function MisoPage() {
  const misoList = getAllMiso();

  return (
    <main className="container mx-auto px-4 py-16">
      <Section title="Our Miso Selection">
        <div className="prose max-w-none mb-8">
          <p className="text-lg">
            At Mitsukabose, we take pride in our carefully selected and blended miso varieties.
            Each type brings its own unique characteristics to our dishes, creating the perfect
            balance of flavors in our ramen.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {misoList.map((miso) => (
            <div key={miso.id} className="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105">
              <div className="relative w-full h-64">
                <Image
                  src={miso.imageUrl}
                  alt={miso.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3">{miso.name}</h3>
                <p className="text-gray-600 mb-4">{miso.description}</p>
                
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Characteristics:</h4>
                  <div className="flex flex-wrap gap-2">
                    {miso.characteristics.map((char, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                      >
                        {char}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Best For:</h4>
                  <div className="flex flex-wrap gap-2">
                    {miso.bestFor.map((use, index) => (
                      <span
                        key={index}
                        className="bg-[#2B2B2B] text-white px-3 py-1 rounded-full text-sm"
                      >
                        {use}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </main>
  );
} 