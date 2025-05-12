export function HeroSection() {
  return (
    <section
      className="relative w-full h-screen bg-[url('/hero.png')] bg-cover bg-center"
      style={{ backgroundColor: "#F5F1E6" }}
    >
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">Welcome to Mitsukabose</h1>
        <p className="text-lg md:text-xl text-white max-w-xl">
          Discover our traditional miso ramen crafted with passion in Toyonaka, Osaka.
        </p>
      </div>
    </section>
  )
}

export default HeroSection
