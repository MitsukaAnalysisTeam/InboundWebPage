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

export default function Home() {
  const ramenList = getAllRamen();
  const misoList = getAllMiso();

  return (
    <main className="w-screen h-screen">
      <Header />
      <HeroSection />
      <WhatIsMisoSection />
      <WhyMisoRamenSection />
      <FoodAndDrinksSection />
      <MenuSection />
      <RetailSection />
      <AccessSection />
    </main>
  );
}
