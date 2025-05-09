 // components/HeroSection.tsx
import React from "react";

export function HeroSection() {
  return (
    <section
      className="relative h-screen bg-[url('/hero.jpg')] bg-cover bg-center"
      style={{ backgroundColor: "#F5F1E6" }}
    >
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <h1 className="text-5xl font-bold text-white mb-4">
          Welcome to Mitsukabose
        </h1>
        <p className="text-lg text-white max-w-xl">
          Discover our traditional miso ramen crafted with passion in Toyonaka, Osaka.
        </p>
      </div>
    </section>
  );
}
