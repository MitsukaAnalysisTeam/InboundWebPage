import Header from '@/components/Header';
import HeroSection from '@/components/sections/HeroSection';
import WhatIsMisoSection from '@/components/sections/WhatIsMisoSection';
import WhyMisoRamenSection from '@/components/sections/WhyMisoRamenSection';
import FoodAndDrinksSection from '@/components/sections/FoodAndDrinksSection';
import MenuSection from '@/components/sections/MenuSection';
import RetailSection from '@/components/sections/RetailSection';
import AccessSection from '@/components/sections/AccessSection';
import { getAllRamen } from "@/domain/ramen/ramenService";
import { getAllMiso } from "@/domain/miso/misoService";
import Image from "next/image";
import { getHeroImages } from '@/lib/getHeroImages';
import { DecorativeBackground } from '@/components/ui/DecorativeBackground';

export default function Home() {
  const ramenList = getAllRamen()
  const misoList = getAllMiso()
  const heroImages = getHeroImages();

  return (
    <div className="min-h-screen bg-white">
      <DecorativeBackground />
      <div className="w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <HeroSection images={heroImages} />
          <WhatIsMisoSection />
          <WhyMisoRamenSection />
          <FoodAndDrinksSection />
          <MenuSection />
          <RetailSection />
          <AccessSection />
        </div>
      </div>
    </div>
  )
}
