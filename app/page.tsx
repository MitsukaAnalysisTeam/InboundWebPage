import { Section } from "@/components/Section";
import { HeroSection } from "@/components/HeroSection";
import { getAllRamen } from "@/domain/ramen/ramenService";
import { getAllMiso } from "@/domain/miso/misoService";
import Image from "next/image";

export default function Home() {
  const ramenList = getAllRamen();
  const misoList = getAllMiso();

  return (
    <>
      <HeroSection />
      <main className="container mx-auto px-4 py-16">
        <Section title="Our Story">
          <div className="prose max-w-none">
            <p className="text-lg mb-4">
              Welcome to Mitsukabose, a traditional miso ramen restaurant located in Toyonaka, Osaka.
              We take pride in our carefully crafted miso broth and authentic Japanese ramen experience.
            </p>
            <p className="text-lg">
              Our restaurant has been serving delicious miso ramen since 2010,
              and we continue to innovate while maintaining traditional flavors.
            </p>
          </div>
        </Section>

        <Section title="Our Miso">
          <div className="prose max-w-none mb-8">
            <p className="text-lg">
              At Mitsukabose, we carefully select and blend different types of miso to create
              the perfect balance of flavors for our ramen. Each type of miso brings its own
              unique characteristics to our dishes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {misoList.map((miso) => (
              <div key={miso.id} className="bg-white rounded-lg shadow-md p-6 transform transition-transform duration-300 hover:scale-105">
                <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
                  <Image
                    src={miso.imageUrl}
                    alt={miso.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold mb-3">{miso.name}</h3>
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
            ))}
          </div>
        </Section>

        <Section title="Featured Ramen">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ramenList.map((ramen) => (
              <div key={ramen.id} className="bg-white rounded-lg shadow-md p-6 transform transition-transform duration-300 hover:scale-105">
                <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
                  <Image
                    src={ramen.imageUrl}
                    alt={ramen.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold mb-3">{ramen.name}</h3>
                <p className="text-gray-600 mb-4">{ramen.description}</p>
                <p className="text-lg font-semibold text-[#2B2B2B] mb-4">{ramen.price}</p>
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
                <div className="mt-4">
                  <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                    {ramen.spiceLevel}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Section>
      </main>
    </>
  );
}
