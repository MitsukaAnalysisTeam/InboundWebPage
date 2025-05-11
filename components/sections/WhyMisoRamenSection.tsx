import { BowlIcon } from '@/components/icons/BowlIcon';

const points = [
  "We ferment our miso in-house to develop deep, complex flavors.",
  "Our unique broth blends multiple regional miso pastes for balance.",
  "House-made noodles are crafted daily to match the richness of our soup.",
  "Local ingredients from northern Osaka are used whenever possible."
];

export default function WhyMisoRamenSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center mb-8">
          <BowlIcon className="w-12 h-12 mr-4 text-primary" />
          <h2 className="text-3xl font-bold">Why Miso Ramen?</h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <ul className="space-y-4">
            {points.map((point, index) => (
              <li key={index} className="flex items-start">
                <span className="text-primary mr-3">•</span>
                <p className="text-lg">{point}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
} 