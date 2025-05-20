"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { getFoodDrinks } from "@/domain/services/dataService"
import type { FoodDrinkItem } from "@/domain/types"
import { Beer, JapaneseYenIcon as Sake, UtensilsCrossed, ChevronDown, X, Menu } from "lucide-react"
import Link from "next/link"

export default function FoodAndDrinksPage() {
  const items: FoodDrinkItem[] = getFoodDrinks()
  const orizeBeers = items.filter((item) => item.category === "beer" && item.name.includes("Orize"))
  const minohBeers = items.filter((item) => item.category === "beer" && !item.name.includes("Orize"))
  const sakes = items.filter((item) => item.category === "sake")
  const foods = items.filter((item) => item.category === "ramen")

  const [activeTab, setActiveTab] = useState<"all" | "minoh" | "sake" | "food" | "orize">("all")
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
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
        { id: "minoh", ref: minohRef, tab: "minoh" as const },
        { id: "sake", ref: sakeRef, tab: "sake" as const },
        { id: "food", ref: foodRef, tab: "food" as const },
        { id: "orize", ref: orizeRef, tab: "orize" as const },
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

  const scrollToSection = (section: "minoh" | "sake" | "orize" | "food" ) => {
    const refs = {
      minoh: minohRef,
      sake: sakeRef,
      food: foodRef,
      orize: orizeRef,
    }

    refs[section].current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
    setActiveTab(section)
    setMobileMenuOpen(false)
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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100" ref={pageRef}>
      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
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
                className="absolute -top-12 right-0 text-white hover:text-red-400 transition-colors"
                aria-label="Close image"
              >
                <X size={32} />
              </button>
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={selectedImage || "/placeholder.svg"}
                  alt="Enlarged view"
                  fill
                  className="object-contain rounded-lg"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <div className="relative bg-[url('/images/food-and-drinks/japanese-pattern-dark.jpg')] bg-cover bg-center text-white">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
        <div className="relative z-10 pt-20 pb-16 md:pt-32 md:pb-24">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-block mb-6"
            >
              <div className="flex items-center justify-center space-x-3 mb-4">
                <div className="h-[1px] w-12 bg-red-400"></div>
                <span className="text-red-400 font-medium uppercase tracking-wider text-sm">Discover</span>
                <div className="h-[1px] w-12 bg-red-400"></div>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-red-200">
                Food & Drinks
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-200 max-w-2xl mx-auto mb-12"
            >
              Experience authentic Japanese flavors with our curated selection of craft beers, premium sake, and
              traditional dishes
            </motion.p>
            {/* Menuページへのリンクボタン */}
            <div className="mb-8 flex justify-center">
              <Link href="/menu" passHref legacyBehavior>
                <a className="inline-block px-8 py-3 rounded-full bg-red-600 text-white font-bold text-lg shadow-lg hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2">
                  View Menu
                </a>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden fixed top-4 right-4 z-50">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="bg-black/80 text-white p-3 rounded-full shadow-lg backdrop-blur-sm"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              >
                <Menu size={24} />
              </button>
            </div>

            {/* Mobile Navigation Menu */}
            <AnimatePresence>
              {mobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="fixed inset-0 z-40 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-4 md:hidden"
                >
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="absolute top-4 right-4 text-white p-2"
                    aria-label="Close menu"
                  >
                    <X size={24} />
                  </button>
                  <div className="flex flex-col space-y-4 w-full max-w-xs">
                    <button
                      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                      className={`px-6 py-4 rounded-lg text-lg font-medium transition-all ${
                        activeTab === "all" ? "bg-red-600 text-white" : "bg-gray-800 text-white"
                      }`}
                    >
                      All
                    </button>
                    <button
                      onClick={() => scrollToSection("minoh")}
                      className={`px-6 py-4 rounded-lg text-lg font-medium transition-all flex items-center gap-3 ${
                        activeTab === "minoh" ? "bg-red-600 text-white" : "bg-gray-800 text-white"
                      }`}
                    >
                      <Beer size={20} /> Minoh Beer
                    </button>
                    <button
                      onClick={() => scrollToSection("sake")}
                      className={`px-6 py-4 rounded-lg text-lg font-medium transition-all flex items-center gap-3 ${
                        activeTab === "sake" ? "bg-red-600 text-white" : "bg-gray-800 text-white"
                      }`}
                    >
                      <Sake size={20} /> Akishika Sake
                    </button>
                    <button
                      onClick={() => scrollToSection("orize")}
                      className={`px-6 py-4 rounded-lg text-lg font-medium transition-all flex items-center gap-3 ${
                        activeTab === "orize" ? "bg-red-600 text-white" : "bg-gray-800 text-white"
                      }`}
                    >
                      <Beer size={20} /> Orizé Brewing
                    </button>
                    <button
                      onClick={() => scrollToSection("food")}
                      className={`px-6 py-4 rounded-lg text-lg font-medium transition-all flex items-center gap-3 ${
                        activeTab === "food" ? "bg-red-600 text-white" : "bg-gray-800 text-white"
                      }`}
                    >
                      <UtensilsCrossed size={20} /> MitsukaBose Food
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Desktop Navigation Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="hidden md:flex justify-center gap-2 mb-8"
            >
              <div className="bg-black/40 backdrop-blur-md p-1.5 rounded-full flex items-center">
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className={`px-6 py-3 rounded-full text-base font-medium transition-all ${
                    activeTab === "all" ? "bg-red-600 text-white shadow-lg" : "text-white hover:bg-white/10"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => scrollToSection("minoh")}
                  className={`px-6 py-3 rounded-full text-base font-medium transition-all flex items-center gap-2 ${
                    activeTab === "minoh" ? "bg-red-600 text-white shadow-lg" : "text-white hover:bg-white/10"
                  }`}
                >
                  <Beer size={18} /> Minoh Beer
                </button>
                <button
                  onClick={() => scrollToSection("sake")}
                  className={`px-6 py-3 rounded-full text-base font-medium transition-all flex items-center gap-2 ${
                    activeTab === "sake" ? "bg-red-600 text-white shadow-lg" : "text-white hover:bg-white/10"
                  }`}
                >
                  <Sake size={18} /> Akishika Sake
                </button>
                <button
                  onClick={() => scrollToSection("orize")}
                  className={`px-6 py-3 rounded-full text-base font-medium transition-all flex items-center gap-2 ${
                    activeTab === "orize" ? "bg-red-600 text-white shadow-lg" : "text-white hover:bg-white/10"
                  }`}
                >
                  <Beer size={18} /> Orizé Brewing
                </button>
                <button
                  onClick={() => scrollToSection("food")}
                  className={`px-6 py-3 rounded-full text-base font-medium transition-all flex items-center gap-2 ${
                    activeTab === "food" ? "bg-red-600 text-white shadow-lg" : "text-white hover:bg-white/10"
                  }`}
                >
                  <UtensilsCrossed size={18} /> MitsukaBose Food
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="animate-bounce hidden md:block"
            >
              <ChevronDown className="mx-auto text-red-300" size={32} />
            </motion.div>
          </div>
        </div>
      </div>

      <main className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          {/* Minoh Beer Section */}
          <section className="mb-32 scroll-mt-20" id="minoh" ref={minohRef}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-4 mb-16"
            >
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-600 text-white">
                <Beer size={32} />
              </div>
              <div>
                <div className="text-sm font-medium text-red-600 uppercase tracking-wider mb-1">Premium Selection</div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Minoh Beer</h2>
              </div>
              <div className="h-[2px] flex-grow bg-gradient-to-r from-red-600 to-transparent"></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="max-w-5xl mx-auto mb-16 overflow-hidden rounded-2xl shadow-2xl"
            >
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2 relative h-64 md:h-auto">
                  <Image
                    src="/images/food-and-drinks/minoh-beer.jpg"
                    alt="Minoh Beer"
                    fill
                    className="object-cover cursor-pointer hover:scale-105 transition-transform duration-700"
                    onClick={() => setSelectedImage("/images/food-and-drinks/minoh-beer.jpg")}
                  />
                </div>
                <div className="md:w-1/2 bg-white p-8 md:p-12 flex items-center">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <span className="w-8 h-1 bg-red-600"></span>
                      Minoh Beer
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      Established in 1997 in Osaka Prefecture, Minoh Beer is a family-owned craft brewery that has
                      earned international recognition for its exceptional quality. Led by the Ohshita sisters, Minoh
                      has won numerous awards at the World Beer Cup and International Beer Competition. Their commitment
                      to using premium local ingredients and traditional brewing methods results in beers with
                      distinctive character and depth of flavor.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={container} initial="hidden" animate="show" className="space-y-16">
              {minohBeers.map((beer, index) => (
                <motion.div key={beer.name} variants={item} className="group">
                  <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-500 group-hover:shadow-2xl">
                    <div className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                      <div className="md:w-2/5 relative overflow-hidden">
                        <div className="aspect-[4/3]">
                          <Image
                            src={beer.imageUrl || "/placeholder.svg"}
                            alt={beer.name}
                            fill
                            className="object-cover w-full h-full cursor-pointer group-hover:scale-105 transition-transform duration-700"
                            onClick={() => setSelectedImage(beer.imageUrl)}
                          />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6 md:hidden">
                          <h3 className="text-2xl font-bold text-white">{beer.name}</h3>
                        </div>
                      </div>
                      <div className="md:w-3/5 p-8 md:p-12">
                        <div className="inline-block px-4 py-1 bg-red-100 text-red-800 rounded-full mb-4 font-medium">
                          {beer.highlight}
                        </div>
                        <h3 className="text-2xl font-bold mb-6 hidden md:block">{beer.name}</h3>
                        <div className="prose prose-red max-w-none">
                          {beer.description.split("\n").map((paragraph, idx) => (
                            <p key={idx} className="mb-4 text-gray-700 leading-relaxed">
                              {paragraph}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </section>

          {/* Akishika Section */}
          <section className="mb-32 scroll-mt-20" id="sake" ref={sakeRef}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-4 mb-16"
            >
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-600 text-white">
                <Sake size={32} />
              </div>
              <div>
                <div className="text-sm font-medium text-red-600 uppercase tracking-wider mb-1">Traditional Craft</div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Akishika Sake</h2>
              </div>
              <div className="h-[2px] flex-grow bg-gradient-to-r from-red-600 to-transparent"></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="max-w-5xl mx-auto mb-16 overflow-hidden rounded-2xl shadow-2xl"
            >
              <div className="flex flex-col md:flex-row-reverse">
                <div className="md:w-1/2 relative h-64 md:h-auto">
                  <Image
                    src="/images/food-and-drinks/akishika.png"
                    alt="Akishika Sake"
                    fill
                    className="object-cover cursor-pointer hover:scale-105 transition-transform duration-700"
                    onClick={() => setSelectedImage("/images/food-and-drinks/akishika.png")}
                  />
                </div>
                <div className="md:w-1/2 bg-white p-8 md:p-12 flex items-center">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <span className="w-8 h-1 bg-red-600"></span>
                      Akishika Sake
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      Located in the mountains of Osaka Prefecture, Akishika Brewery has been crafting exceptional sake
                      since 1886. Under the guidance of master brewer Hiroaki Oku, Akishika has become renowned for its
                      commitment to organic rice cultivation and traditional brewing methods. They grow their own sake
                      rice varieties using natural farming techniques, creating pure expressions of terroir in each
                      bottle. Their sakes are characterized by depth, complexity, and a distinct sense of place.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={container} initial="hidden" animate="show" className="space-y-16">
              {sakes.map((sake, index) => (
                <motion.div key={sake.name} variants={item} className="group">
                  <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-500 group-hover:shadow-2xl">
                    <div className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                      <div className="md:w-2/5 relative overflow-hidden">
                        <div className="aspect-[4/3]">
                          <Image
                            src={sake.imageUrl || "/placeholder.svg"}
                            alt={sake.name}
                            fill
                            className="object-cover w-full h-full cursor-pointer group-hover:scale-105 transition-transform duration-700"
                            onClick={() => setSelectedImage(sake.imageUrl)}
                          />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6 md:hidden">
                          <h3 className="text-2xl font-bold text-white">{sake.name}</h3>
                        </div>
                      </div>
                      <div className="md:w-3/5 p-8 md:p-12">
                        <div className="inline-block px-4 py-1 bg-red-100 text-red-800 rounded-full mb-4 font-medium">
                          {sake.highlight}
                        </div>
                        <h3 className="text-2xl font-bold mb-6 hidden md:block">{sake.name}</h3>
                        <div className="prose prose-red max-w-none">
                          {sake.description.split("\n").map((paragraph, idx) => (
                            <p key={idx} className="mb-4 text-gray-700 leading-relaxed">
                              {paragraph}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </section>

          {/* Orizé Brewing Section */}
          <section className="mb-32 scroll-mt-20" id="orize" ref={orizeRef}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-4 mb-16"
            >
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-600 text-white">
                <Beer size={32} />
              </div>
              <div>
                <div className="text-sm font-medium text-red-600 uppercase tracking-wider mb-1">Innovative Brewing</div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Orizé Brewing</h2>
              </div>
              <div className="h-[2px] flex-grow bg-gradient-to-r from-red-600 to-transparent"></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="max-w-5xl mx-auto mb-16 overflow-hidden rounded-2xl shadow-2xl"
            >
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2 relative h-64 md:h-auto">
                  <Image
                    src="/images/food-and-drinks/orize-brewing.png"
                    alt="Orizé Brewing"
                    fill
                    className="object-cover cursor-pointer hover:scale-105 transition-transform duration-700"
                    onClick={() => setSelectedImage("/images/food-and-drinks/orize-brewing.png")}
                  />
                </div>
                <div className="md:w-1/2 bg-white p-8 md:p-12 flex items-center">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <span className="w-8 h-1 bg-red-600"></span>
                      Orizé Brewing
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      Founded in 2019 in Wakayama Prefecture, Orizé Brewing is a pioneering nano-brewery that created
                      the world&apos;s first beer brewed with rice koji as a key ingredient. Dedicated to innovation and
                      tradition, Orizé crafts unique Japanese beers that celebrate the art of fermentation. Their brews
                      are not only distinct in flavor but also gluten-free, made entirely with domestic ingredients. A
                      truly original take on beer rooted in Japanese culture and craftsmanship.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={container} initial="hidden" animate="show" className="space-y-16">
              {orizeBeers.map((beer, index) => (
                <motion.div key={beer.name} variants={item} className="group">
                  <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-500 group-hover:shadow-2xl">
                    <div className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                      <div className="md:w-2/5 relative overflow-hidden">
                        <div className="aspect-[4/3]">
                          <Image
                            src={beer.imageUrl || "/placeholder.svg"}
                            alt={beer.name}
                            fill
                            className="object-cover w-full h-full cursor-pointer group-hover:scale-105 transition-transform duration-700"
                            onClick={() => setSelectedImage(beer.imageUrl)}
                          />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6 md:hidden">
                          <h3 className="text-2xl font-bold text-white">{beer.name}</h3>
                        </div>
                      </div>
                      <div className="md:w-3/5 p-8 md:p-12">
                        <div className="inline-block px-4 py-1 bg-red-100 text-red-800 rounded-full mb-4 font-medium">
                          {beer.highlight}
                        </div>
                        <h3 className="text-2xl font-bold mb-6 hidden md:block">{beer.name}</h3>
                        <div className="prose prose-red max-w-none">
                          {beer.description.split("\n").map((paragraph, idx) => (
                            <p key={idx} className="mb-4 text-gray-700 leading-relaxed">
                              {paragraph}
                            </p>
                          ))}
                        </div>
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
              className="flex items-center gap-4 mb-16"
            >
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-600 text-white">
                <UtensilsCrossed size={32} />
              </div>
              <div>
                <div className="text-sm font-medium text-red-600 uppercase tracking-wider mb-1">Authentic Cuisine</div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">MitsukaBose Food</h2>
              </div>
              <div className="h-[2px] flex-grow bg-gradient-to-r from-red-600 to-transparent"></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="max-w-5xl mx-auto mb-16 overflow-hidden rounded-2xl shadow-2xl"
            >
              <div className="flex flex-col md:flex-row-reverse">
                <div className="md:w-1/2 relative h-64 md:h-auto">
                  <Image
                    src="/images/food-and-drinks/mitsukabose-food.jpg"
                    alt="MitsukaBose Food"
                    fill
                    className="object-cover cursor-pointer hover:scale-105 transition-transform duration-700"
                    onClick={() => setSelectedImage("/images/food-and-drinks/mitsukabose-food.jpg")}
                  />
                </div>
                <div className="md:w-1/2 bg-white p-8 md:p-12 flex items-center">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <span className="w-8 h-1 bg-red-600"></span>
                      MitsukaBose Food
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      MitsukaBose is a celebrated culinary establishment specializing in authentic Japanese cuisine with
                      a focus on traditional ramen and seasonal dishes. Using locally-sourced ingredients and
                      time-honored techniques, their expert chefs create dishes that honor Japan&apos;s rich culinary
                      heritage while incorporating subtle contemporary influences. Each dish is crafted with meticulous
                      attention to detail, balancing flavors, textures, and presentation.
                    </p>
                  </div>
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
                  className="group bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-500 hover:shadow-2xl"
                >
                  <div className="relative h-72 overflow-hidden">
                    <Image
                      src={food.imageUrl || "/placeholder.svg"}
                      alt={food.name}
                      fill
                      className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105 cursor-pointer"
                      onClick={() => setSelectedImage(food.imageUrl)}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-6">
                      <div className="inline-block px-3 py-1 bg-red-600 text-white rounded-full text-sm font-medium mb-3">
                        {food.highlight}
                      </div>
                      <h3 className="text-2xl font-bold text-white">{food.name}</h3>
                    </div>
                  </div>
                  <div className="p-8">
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
