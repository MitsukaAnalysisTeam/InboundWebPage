import Header from '@/components/Header';
import HeroSection from '@/components/sections/HeroSection';
import MitsukaValuesSection from '@/components/sections/MitsukaValuesSection';
import AccessSection from '@/components/sections/AccessSection';
import { getHeroImages } from '@/lib/getHeroImages';
import { DecorativeBackground } from '@/components/ui/DecorativeBackground';

export default function Home() {
  const heroImages = getHeroImages();

  return (
    <div className="min-h-screen bg-white">
      <DecorativeBackground />
    <div className="w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <HeroSection images={heroImages} />
          <MitsukaValuesSection />
        <AccessSection />
        </div>
      </div>
    </div>
  )
}
