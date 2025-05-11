import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="relative h-screen">
      <div className="absolute inset-0">
        <Image
          src="/images/hero.jpg"
          alt="Mitsukabose Ramen"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative h-full flex items-center justify-center text-center text-white">
        <div className="max-w-3xl px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Fermentation, Miso & Noodles
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Experience the art of traditional Japanese miso ramen
          </p>
          <a
            href="#menu"
            className="inline-block bg-primary text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-primary-dark transition-colors"
          >
            View Menu
          </a>
        </div>
      </div>
    </section>
  );
} 