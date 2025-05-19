"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { getFoodDrinks } from "@/domain/services/dataService"
import type { FoodDrinkItem } from "@/domain/types"
import { DecorativeBackground } from "@/components/ui/DecorativeBackground"
import { Beer, JapaneseYenIcon as Sake, UtensilsCrossed, ChevronDown, X } from 'lucide-react'

export default function FoodAndDrinksPage() {
  const items: FoodDrinkItem[] = getFoodDrinks()
  const orizeBeers = items.filter((item) => item.category === "beer" && item.name.includes("Orize"))
  const minohBeers = items.filter((item) => item.category === "beer" && !item.name.includes("Orizé"))
  const sakes = items.filter((item) => item.category === "sake")
  const foods = items.filter((item) => item.category === "ramen")

  const [activeTab, setActiveTab] = useState<"all" | "orize" | "minoh" | "sake" | "food">("all")
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const pageRef = useRef(null)
  const isInView = useInView(pageRef, { once: true, amount: 0.1 })

  // Refs for each section for scrolling
  const orizeRef = useRef<HTMLDivElement>(null)
  const minohRef = useRef<HTMLDivElement>(null)
  const sakeRef = useRef<HTMLDivElement>(null)
  const foodRef = useRef<HTMLDivElement>(null)

  // Track scroll position to update active tab
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200 // Offset for better UX

      const sections = [
        { id: "orize", ref: orizeRef, tab: "orize" as const },
        { id: "minoh", ref: minohRef, tab: "minoh" as const },
        { id: "sake", ref: sakeRef, tab: "sake" as const },
        { id: "food", ref: foodRef, tab: "food" as const },
      ]

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section.ref.current && section.ref.current.offsetTop <= scrollPosition) {
          setActiveTab(section.tab)
          break
        }
      }

      // If we're at the top, set to "all"
      if (scrollPosition < (orizeRef.current?.offsetTop || 0) - 100) {
        setActiveTab("all")
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (section: "orize" | "minoh" | "sake" | "food") => {
    const refs = {
      orize: orizeRef,
      minoh: minohRef,
      sake: sakeRef,
      food: foodRef,
    }

    refs[section].current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
    setActiveTab(section)
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <div className="min-h-screen bg-amber-50/30" ref={pageRef}>
      <DecorativeBackground />

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-white hover:text-amber-400 transition-colors"
              >
                <X size={32} />
              </button>
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={selectedImage || "/placeholder.svg"}
                  alt="Enlarged view"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-amber-800 to-amber-700 text-white py-20">
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <div className="absolute inset-0 bg-[url('/pattern-japanese.png')] bg-repeat bg-[length:100px_100px]"></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Food & Drinks
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-amber-100 max-w-2xl mx-auto mb-8"
          >
            Discover our selection of craft beers, premium sake, and authentic ramen dishes
          </motion.p>

          {/* Navigation Tabs - Sticky on mobile */}
          <div className="sticky top-0 z-50 md:relative md:z-auto bg-amber-800/95 md:bg-transparent py-3 md:py-0 -mx-4 md:mx-0 px-4 md:px-0 backdrop-blur-sm md:backdrop-blur-none">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap justify-center gap-2 md:gap-4 mb-0 md:mb-8 overflow-x-auto no-scrollbar"
            >
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className={`px-4 md:px-6 py-2 md:py-3 rounded-full text-sm md:text-base font-medium transition-all whitespace-nowrap ${
                  activeTab === "all"
                    ? "bg-white text-amber-800 shadow-lg"
                    : "bg-amber-700/50 text-white hover:bg-amber-700/80"
                }`}
              >
                All
              </button>
              <button
                onClick={() => scrollToSection("orize")}
                className={`px-4 md:px-6 py-2 md:py-3 rounded-full text-sm md:text-base font-medium transition-all flex items-center gap-2 whitespace-nowrap ${
                  activeTab === "orize"
                    ? "bg-white text-amber-800 shadow-lg"
                    : "bg-amber-700/50 text-white hover:bg-amber-700/80"
                }`}
              >
                <Beer size={16} /> Orizé Brewing
              </button>
              <button
                onClick={() => scrollToSection("minoh")}
                className={`px-4 md:px-6 py-2 md:py-3 rounded-full text-sm md:text-base font-medium transition-all flex items-center gap-2 whitespace-nowrap ${
                  activeTab === "minoh"
                    ? "bg-white text-amber-800 shadow-lg"
                    : "bg-amber-700/50 text-white hover:bg-amber-700/80"
                }`}
              >
                <Beer size={16} /> Minoh Beer
              </button>
              <button
                onClick={() => scrollToSection("sake")}
                className={`px-4 md:px-6 py-2 md:py-3 rounded-full text-sm md:text-base font-medium transition-all flex items-center gap-2 whitespace-nowrap ${
                  activeTab === "sake"
                    ? "bg-white text-amber-800 shadow-lg"
                    : "bg-amber-700/50 text-white hover:bg-amber-700/80"
                }`}
              >
                <Sake size={16} /> Akishika Sake
              </button>
              <button
                onClick={() => scrollToSection("food")}
                className={`px-4 md:px-6 py-2 md:py-3 rounded-full text-sm md:text-base font-medium transition-all flex items-center gap-2 whitespace-nowrap ${
                  activeTab === "food"
                    ? "bg-white text-amber-800 shadow-lg"
                    : "bg-amber-700/50 text-white hover:bg-amber-700/80"
                }`}
              >
                <UtensilsCrossed size={16} /> MitsukaBose Food
              </button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="animate-bounce hidden md:block"
          >
            <ChevronDown className="mx-auto text-amber-200" size={32} />
          </motion.div>
        </div>
      </div>

      <main className="py-16">
        <div className="max-w-5xl mx-auto px-4">
          {/* Minoh Beer Section */}
          <section className="mb-24 scroll-mt-20" id="minoh" ref={minohRef}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-4 mb-12"
            >
              <Beer size={32} className="text-amber-600" />
              <h2 className="text-3xl md:text-4xl font-bold text-amber-800">Minoh Beer</h2>
              <div className="h-[2px] flex-grow bg-gradient-to-r from-amber-600 to-transparent"></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="max-w-4xl mx-auto mb-12 bg-white/80 rounded-xl shadow p-6 border border-amber-100"
            >
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-2/5 w-full flex-shrink-0">
                  <Image
                    src="/images/minoh-beer.jpg"
                    alt="Minoh Beer"
                    width={400}
                    height={250}
                    className="rounded-lg shadow cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => setSelectedImage('/images/minoh-beer.jpg')}
                  />
                </div>
                <div className="md:w-3/5 w-full">
                  <h3 className="text-xl font-bold text-amber-700 mb-2">Minoh Beer</h3>
                  <p className="text-gray-700">
                    Established in 1997 in Osaka Prefecture, Minoh Beer is a family-owned craft brewery that has earned
                    international recognition for its exceptional quality. Led by the Ohshita sisters, Minoh has won
                    numerous awards at the World Beer Cup and International Beer Competition. Their commitment to using
                    premium local ingredients and traditional brewing methods results in beers with distinctive
                    character and depth of flavor.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={container} initial="hidden" animate="show" className="space-y-12">
              {minohBeers.map((beer) => (
                <motion.div
                  key={beer.name}
                  variants={item}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-xl shadow-xl overflow-hidden transform transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-2/5 relative overflow-hidden">
                      <Image
                        src={beer.imageUrl || "/placeholder.svg"}
                        alt={beer.name}
                        width={500}
                        height={500}
                        className="object-cover w-full h-full md:h-[400px] cursor-pointer hover:opacity-90 transition-opacity"
                        onClick={() => setSelectedImage(beer.imageUrl)}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6 md:hidden">
                        <h3 className="text-2xl font-bold text-white">{beer.name}</h3>
                      </div>
                    </div>
                    <div className="md:w-3/5 p-8">
                      <h3 className="text-2xl font-bold mb-4 hidden md:block">{beer.name}</h3>
                      <div className="inline-block px-4 py-1 bg-amber-100 text-amber-800 rounded-full mb-4 font-medium">
                        {beer.highlight}
                      </div>
                      <div className="prose prose-amber max-w-none">
                        {beer.description.split("\n").map((paragraph, idx) => (
                          <p key={idx} className="mb-4 text-gray-700 leading-relaxed">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </section>

          {/* Akishika Section */}
          <section className="mb-24 scroll-mt-20" id="sake" ref={sakeRef}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-4 mb-12"
            >
              <Sake size={32} className="text-amber-600" />
              <h2 className="text-3xl md:text-4xl font-bold text-amber-800">Akishika Sake</h2>
              <div className="h-[2px] flex-grow bg-gradient-to-r from-amber-600 to-transparent"></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="max-w-4xl mx-auto mb-12 bg-white/80 rounded-xl shadow p-6 border border-amber-100"
            >
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-2/5 w-full flex-shrink-0">
                  <Image
                    src="/images/akishika-sake.jpg"
                    alt="Akishika Sake"
                    width={400}
                    height={250}
                    className="rounded-lg shadow cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => setSelectedImage('/images/akishika-sake.jpg')}
                  />
                </div>
                <div className="md:w-3/5 w-full">
                  <h3 className="text-xl font-bold text-amber-700 mb-2">Akishika Sake</h3>
                  <p className="text-gray-700">
                    Located in the mountains of Osaka Prefecture, Akishika Brewery has been crafting exceptional sake
                    since 1886. Under the guidance of master brewer Hiroaki Oku, Akishika has become renowned for its
                    commitment to organic rice cultivation and traditional brewing methods. They grow their own sake
                    rice varieties using natural farming techniques, creating pure expressions of terroir in each
                    bottle. Their sakes are characterized by depth, complexity, and a distinct sense of place.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={container} initial="hidden" animate="show" className="space-y-12">
              {sakes.map((sake) => (
                <motion.div
                  key={sake.name}
                  variants={item}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-xl shadow-xl overflow-hidden transform transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-2/5 relative overflow-hidden">
                      <Image
                        src={sake.imageUrl || "/placeholder.svg"}
                        alt={sake.name}
                        width={500}
                        height={500}
                        className="object-cover w-full h-full md:h-[400px] cursor-pointer hover:opacity-90 transition-opacity"
                        onClick={() => setSelectedImage(sake.imageUrl)}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6 md:hidden">
                        <h3 className="text-2xl font-bold text-white">{sake.name}</h3>
                      </div>
                    </div>
                    <div className="md:w-3/5 p-8">
                      <h3 className="text-2xl font-bold mb-4 hidden md:block">{sake.name}</h3>
                      <div className="inline-block px-4 py-1 bg-amber-100 text-amber-800 rounded-full mb-4 font-medium">
                        {sake.highlight}
                      </div>
                      <div className="prose prose-amber max-w-none">
                        {sake.description.split("\n").map((paragraph, idx) => (
                          <p key={idx} className="mb-4 text-gray-700 leading-relaxed">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </section>
          {/* Orizé Brewing Section */}
          <section className="mb-24 scroll-mt-20" id="orize" ref={orizeRef}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-4 mb-12"
            >
              <Beer size={32} className="text-amber-600" />
              <h2 className="text-3xl md:text-4xl font-bold text-amber-800">Orizé Brewing</h2>
              <div className="h-[2px] flex-grow bg-gradient-to-r from-amber-600 to-transparent"></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="max-w-4xl mx-auto mb-12 bg-white/80 rounded-xl shadow p-6 border border-amber-100"
            >
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-2/5 w-full flex-shrink-0">
                  <Image
                    src="/images/orize-brewing.jpg"
                    alt="Orizé Brewing"
                    width={400}
                    height={250}
                    className="rounded-lg shadow cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => setSelectedImage('/images/orize-brewing.jpg')}
                  />
                </div>
                <div className="md:w-3/5 w-full">
                  <h3 className="text-xl font-bold text-amber-700 mb-2">Orizé Brewing</h3>
                  <p className="text-gray-700">
                    Founded in 2019 in Wakayama Prefecture, Orizé Brewing is a pioneering nano-brewery that created the world&apos;s first beer brewed with rice koji as a key ingredient. Dedicated to innovation and tradition, Orizé crafts unique Japanese beers that celebrate the art of fermentation. Their brews are not only distinct in flavor but also gluten-free, made entirely with domestic ingredients. A truly original take on beer rooted in Japanese culture and craftsmanship.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={container} initial="hidden" animate="show" className="space-y-12">
              {orizeBeers.map((beer) => (
                <motion.div
                  key={beer.name}
                  variants={item}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-xl shadow-xl overflow-hidden transform transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-2/5 relative overflow-hidden">
                      <Image
                        src={beer.imageUrl || "/placeholder.svg"}
                        alt={beer.name}
                        width={500}
                        height={500}
                        className="object-cover w-full h-full md:h-[400px] cursor-pointer hover:opacity-90 transition-opacity"
                        onClick={() => setSelectedImage(beer.imageUrl)}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6 md:hidden">
                        <h3 className="text-2xl font-bold text-white">{beer.name}</h3>
                      </div>
                    </div>
                    <div className="md:w-3/5 p-8">
                      <h3 className="text-2xl font-bold mb-4 hidden md:block">{beer.name}</h3>
                      <div className="inline-block px-4 py-1 bg-amber-100 text-amber-800 rounded-full mb-4 font-medium">
                        {beer.highlight}
                      </div>
                      <div className="prose prose-amber max-w-none">
                        {beer.description.split("\n").map((paragraph, idx) => (
                          <p key={idx} className="mb-4 text-gray-700 leading-relaxed">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </section>

          {/* MitsukaBose Food Section */}
          <section className="scroll-mt-20" id="food" ref={foodRef}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-4 mb-12"
            >
              <UtensilsCrossed size={32} className="text-amber-600" />
              <h2 className="text-3xl md:text-4xl font-bold text-amber-800">MitsukaBose Food</h2>
              <div className="h-[2px] flex-grow bg-gradient-to-r from-amber-600 to-transparent"></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="max-w-4xl mx-auto mb-12 bg-white/80 rounded-xl shadow p-6 border border-amber-100"
            >
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-2/5 w-full flex-shrink-0">
                  <Image
                    src="/images/mitsukabose-food.jpg"
                    alt="MitsukaBose Food"
                    width={400}
                    height={250}
                    className="rounded-lg shadow cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => setSelectedImage('/images/mitsukabose-food.jpg')}
                  />
                </div>
                <div className="md:w-3/5 w-full">
                  <h3 className="text-xl font-bold text-amber-700 mb-2">MitsukaBose Food</h3>
                  <p className="text-gray-700">
                    MitsukaBose is a celebrated culinary establishment specializing in authentic Japanese cuisine with a
                    focus on traditional ramen and seasonal dishes. Using locally-sourced ingredients and time-honored
                    techniques, their expert chefs create dishes that honor Japan&apos;s rich culinary heritage while
                    incorporating subtle contemporary influences. Each dish is crafted with meticulous attention to
                    detail, balancing flavors, textures, and presentation.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {foods.map((food) => (
                <motion.div
                  key={food.name}
                  variants={item}
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300"
                >
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={food.imageUrl || "/placeholder.svg"}
                      alt={food.name}
                      width={600}
                      height={400}
                      className="object-cover w-full h-full transition-transform duration-500 hover:scale-110 cursor-pointer"
                      onClick={() => setSelectedImage(food.imageUrl)}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-6">
                      <h3 className="text-2xl font-bold text-white mb-2">{food.name}</h3>
                      <div className="inline-block px-3 py-1 bg-amber-500 text-white rounded-full text-sm font-medium">
                        {food.highlight}
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-700 leading-relaxed">{food.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </section>
        </div>
      </main>
    </div>
  )
}
