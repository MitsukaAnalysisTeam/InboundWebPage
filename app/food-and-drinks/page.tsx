"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { getFoodDrinks } from "@/domain/services/dataService"
import type { FoodDrinkItem } from "@/domain/types"
import { Beer, JapaneseYenIcon as Sake, UtensilsCrossed, ChevronDown, X } from "lucide-react"
import Link from "next/link"

export default function FoodAndDrinksPage() {
  const items: FoodDrinkItem[] = getFoodDrinks()
  // normalize names to strip diacritics (e.g. Orizé -> Orize) for reliable matching
  const normalize = (s: string) =>
    s?.normalize?.("NFD")?.replace(/\p{Diacritic}/gu, "")?.toLowerCase() ?? "";

  const orizeBeers = items.filter(
    (item) => item.category === "beer" && normalize(item.name).includes("orize")
  )
  const minohBeers = items.filter(
    (item) => item.category === "beer" && !normalize(item.name).includes("orize")
  )
  const sakes = items.filter((item) => item.category === "sake")
  const foods = items.filter((item) => item.category === "ramen")

  const [activeTab, setActiveTab] = useState<"all" | "minoh" | "orize" | "sake" | "food">("all")
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  // const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Refs for each section for scrolling
  const heroRef = useRef<HTMLDivElement>(null)
  const orizeRef = useRef<HTMLDivElement>(null)
  const minohRef = useRef<HTMLDivElement>(null)
  const sakeRef = useRef<HTMLDivElement>(null)
  const foodRef = useRef<HTMLDivElement>(null)

  // const isHeroInView = useInView(heroRef, { once: false, amount: 0.3 })
  const isOrizeInView = useInView(orizeRef, { once: false, amount: 0.3 })
  const isMinohInView = useInView(minohRef, { once: false, amount: 0.3 })
  const isSakeInView = useInView(sakeRef, { once: false, amount: 0.3 })
  const isFoodInView = useInView(foodRef, { once: false, amount: 0.3 })

  // Track scroll position to update active tab
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200 // Offset for better UX

      const sections = [
        { id: "minoh", ref: minohRef, tab: "minoh" as const },
        { id: "orize", ref: orizeRef, tab: "orize" as const },
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

  const scrollToSection = (section: "minoh" | "orize" | "sake" | "food") => {
    const refs = {
      minoh: minohRef,
      sake: sakeRef,
      food: foodRef,
      orize: orizeRef,
    }

    if (refs[section].current) {
      const headerHeight = 120 // ヘッダー＋ナビゲーションバーの高さ
      const element = refs[section].current
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      })
      setActiveTab(section)
      // setMobileMenuOpen(false)
    }
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
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
      <div
        ref={heroRef}
        className="relative bg-[url('/images/food-and-drinks/japanese-pattern-dark.jpg')] bg-cover bg-center"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/50"></div>
        <div className="relative z-10 min-h-[90vh] flex flex-col justify-center items-center px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="mb-6 inline-flex items-center">
              <div className="h-[1px] w-12 bg-amber-400"></div>
              <span className="mx-4 text-amber-400 font-medium uppercase tracking-widest text-sm">
                Authentic Experience
              </span>
              <div className="h-[1px] w-12 bg-amber-400"></div>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
              <span className="block">Taste of</span>
              <span className="text-amber-400">Japan</span>
            </h1>

            <p className="text-xl text-gray-200 max-w-2xl mx-auto mb-12">
              Discover our curated selection of authentic Japanese craft beers, premium sake, and traditional dishes
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/menu" passHref>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-amber-500 text-black font-bold rounded-full shadow-lg hover:bg-amber-400 transition-colors"
                >
                  View Full Menu
                </motion.div>
              </Link>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection("minoh")}
                className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition-colors"
              >
                Explore Selections
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce"
          >
            <ChevronDown className="text-amber-400" size={36} />
          </motion.div>
        </div>
      </div>

      {/* Navigation */}
      <div className="sticky top-0 z-40 bg-neutral-900 shadow-md">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center px-4 py-4">
            <div className="text-white font-bold text-xl">Our Selections</div>

            {/* Mobile menu button */}
            {/* <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white p-2"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button> */}

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-1">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === "all" ? "bg-amber-500 text-black" : "text-white hover:bg-neutral-800"
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => scrollToSection("minoh")}
                className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                  activeTab === "minoh" ? "bg-amber-500 text-black" : "text-white hover:bg-neutral-800"
                }`}
              >
                <Beer size={18} /> Minoh Beer
              </button>
              <button
                onClick={() => scrollToSection("orize")}
                className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                  activeTab === "orize" ? "bg-amber-500 text-black" : "text-white hover:bg-neutral-800"
                }`}
              >
                <Beer size={18} /> Orizé Brewing
              </button>
              <button
                onClick={() => scrollToSection("sake")}
                className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                  activeTab === "sake" ? "bg-amber-500 text-black" : "text-white hover:bg-neutral-800"
                }`}
              >
                <Sake size={18} /> Akishika Sake
              </button>
              <button
                onClick={() => scrollToSection("food")}
                className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                  activeTab === "food" ? "bg-amber-500 text-black" : "text-white hover:bg-neutral-800"
                }`}
              >
                <UtensilsCrossed size={18} /> MitsukaBose Food
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {/* <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-neutral-900 overflow-hidden"
          >
            <div className="flex flex-col p-4 space-y-2">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className={`p-3 rounded-lg text-left ${activeTab === "all" ? "bg-amber-500 text-black" : "text-white"}`}
              >
                Overview
              </button>
              <button
                onClick={() => scrollToSection("minoh")}
                className={`p-3 rounded-lg text-left flex items-center gap-3 ${
                  activeTab === "minoh" ? "bg-amber-500 text-black" : "text-white"
                }`}
              >
                <Beer size={20} /> Minoh Beer
              </button>
              <button
                onClick={() => scrollToSection("orize")}
                className={`p-3 rounded-lg text-left flex items-center gap-3 ${
                  activeTab === "orize" ? "bg-amber-500 text-black" : "text-white"
                }`}
              >
                <Beer size={20} /> Orizé Brewing
              </button>
              <button
                onClick={() => scrollToSection("sake")}
                className={`p-3 rounded-lg text-left flex items-center gap-3 ${
                  activeTab === "sake" ? "bg-amber-500 text-black" : "text-white"
                }`}
              >
                <Sake size={20} /> Akishika Sake
              </button>
              <button
                onClick={() => scrollToSection("food")}
                className={`p-3 rounded-lg text-left flex items-center gap-3 ${
                  activeTab === "food" ? "bg-amber-500 text-black" : "text-white"
                }`}
              >
                <UtensilsCrossed size={20} /> MitsukaBose Food
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence> */}

      <main className="max-w-7xl mx-auto px-4 py-16">
        {/* Introduction Section */}
        <motion.section initial="hidden" animate="visible" variants={staggerContainer} className="mb-24 text-center">
          <motion.div variants={fadeIn} className="mb-12">
            <h2 className="text-4xl font-bold mb-6">Authentic Japanese Experience</h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              We&apos;ve carefully selected the finest Japanese craft beverages and dishes to bring you an authentic taste of
              Japan. Each item in our collection represents the pinnacle of Japanese craftsmanship and tradition.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <motion.div variants={fadeIn} className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Beer size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">Craft Beer</h3>
              <p className="text-neutral-600">
                Discover Japan&apos;s thriving craft beer scene with our selection of award-winning brews from Minoh and
                innovative koji-fermented beers from Orizé.
              </p>
            </motion.div>

            <motion.div variants={fadeIn} className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sake size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">Premium Sake</h3>
              <p className="text-neutral-600">
                Experience the depth and complexity of Akishika&apos;s organic sake, crafted using traditional methods and
                locally-grown rice varieties.
              </p>
            </motion.div>

            <motion.div variants={fadeIn} className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <UtensilsCrossed size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">Traditional Food</h3>
              <p className="text-neutral-600">
                Savor authentic Japanese cuisine from MitsukaBose, featuring meticulously prepared dishes that honor
                Japan&apos;s culinary heritage.
              </p>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Minoh Beer Section */}
        <section ref={minohRef} id="minoh" className="mb-32 scroll-mt-40">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isMinohInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <div className="flex items-center gap-4 mb-6">
              <Beer size={24} className="text-amber-500" />
              <h2 className="text-3xl font-bold">Minoh Beer</h2>
              <div className="h-[1px] flex-grow bg-neutral-200"></div>
            </div>
            <p className="text-lg text-neutral-600 max-w-3xl">
              Established in 1997 in Osaka Prefecture, Minoh Beer is a family-owned craft brewery that has earned
              international recognition for its exceptional quality. Led by the Ohshita sisters, their commitment to
              using premium local ingredients results in beers with distinctive character and depth of flavor.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {minohBeers.map((beer) => (
              <motion.div key={beer.id} variants={fadeIn} className="group">
                <div className="bg-white rounded-3xl shadow-md overflow-hidden h-full flex flex-col">
                  <div className="relative h-56">
                    <Image
                      src={beer.imageUrl}
                      alt={beer.name}
                      fill
                      className="object-cover cursor-pointer group-hover:scale-105 transition-transform duration-500"
                      onClick={() => setSelectedImage(beer.imageUrl)}
                    />
                  </div>
                  <div className="p-6 flex flex-col gap-4">
                    <div className="inline-block px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
                      {beer.highlight}
                    </div>
                    <h3 className="text-xl font-bold">{beer.name}</h3>
                    <p className="text-neutral-600 line-clamp-4">{beer.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Orizé Brewing Section */}
        <section ref={orizeRef} id="orize" className="mb-32 scroll-mt-40">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isOrizeInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <div className="flex items-center gap-4 mb-6">
              <Beer size={24} className="text-amber-500" />
              <h2 className="text-3xl font-bold">Orizé Brewing</h2>
              <div className="h-[1px] flex-grow bg-neutral-200"></div>
            </div>
            <p className="text-lg text-neutral-600 max-w-3xl">
              Founded in 2019 in Wakayama Prefecture, Orizé Brewing is a pioneering nano-brewery that created the
              world&apos;s first beer brewed with rice koji. Their unique Japanese beers celebrate the art of fermentation,
              offering gluten-free options made entirely with domestic ingredients.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {orizeBeers.map((beer) => (
              <motion.div key={beer.id} variants={fadeIn} className="group">
                <div className="bg-white rounded-3xl shadow-md overflow-hidden h-full flex flex-col">
                  <div className="relative h-56">
                    <Image
                      src={beer.imageUrl}
                      alt={beer.name}
                      fill
                      className="object-cover cursor-pointer group-hover:scale-105 transition-transform duration-500"
                      onClick={() => setSelectedImage(beer.imageUrl)}
                    />
                  </div>
                  <div className="p-6 flex flex-col gap-4">
                    <div className="inline-block px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
                      {beer.highlight}
                    </div>
                    <h3 className="text-xl font-bold">{beer.name}</h3>
                    <p className="text-neutral-600 line-clamp-4">{beer.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Akishika Sake Section */}
        <section ref={sakeRef} id="sake" className="mb-32 scroll-mt-40">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isSakeInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <div className="flex items-center gap-4 mb-6">
              <Sake size={24} className="text-amber-500" />
              <h2 className="text-3xl font-bold">Akishika Sake</h2>
              <div className="h-[1px] flex-grow bg-neutral-200"></div>
            </div>
            <p className="text-lg text-neutral-600 max-w-3xl">
              Located in the mountains of Osaka Prefecture, Akishika Brewery has been crafting exceptional sake since
              1886. Under the guidance of master brewer Hiroaki Oku, they grow their own sake rice varieties using
              natural farming techniques, creating pure expressions of terroir in each bottle.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sakes.map((sake) => (
              <motion.div key={sake.id} variants={fadeIn} className="group">
                <div className="bg-white rounded-3xl shadow-md overflow-hidden h-full flex flex-col">
                  <div className="relative h-56">
                    <Image
                      src={sake.imageUrl}
                      alt={sake.name}
                      fill
                      className="object-cover cursor-pointer group-hover:scale-105 transition-transform duration-500"
                      onClick={() => setSelectedImage(sake.imageUrl)}
                    />
                  </div>
                  <div className="p-6 flex flex-col gap-4">
                    <div className="inline-block px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
                      {sake.highlight}
                    </div>
                    <h3 className="text-xl font-bold">{sake.name}</h3>
                    <p className="text-neutral-600 line-clamp-4">{sake.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>


        {/* MitsukaBose Food Section */}
        <section ref={foodRef} id="food" className="scroll-mt-40">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isFoodInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <div className="flex items-center gap-4 mb-6">
              <UtensilsCrossed size={24} className="text-amber-500" />
              <h2 className="text-3xl font-bold">MitsukaBose Food</h2>
              <div className="h-[1px] flex-grow bg-neutral-200"></div>
            </div>
            <p className="text-lg text-neutral-600 max-w-3xl">
              MitsukaBose is a celebrated culinary establishment specializing in authentic Japanese cuisine with a focus
              on traditional ramen and seasonal dishes. Using locally-sourced ingredients and time-honored techniques,
              their expert chefs create dishes that honor Japan&apos;s rich culinary heritage.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={isFoodInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {foods.map((food, index) => (
              <motion.div key={`${food.name}-${index}`} variants={fadeIn} transition={{ delay: index * 0.1 }} className="group">
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden h-full flex flex-col">
                  <div className="relative h-64">
                    <Image
                      src={food.imageUrl || "/placeholder.svg"}
                      alt={food.name}
                      fill
                      className="object-cover cursor-pointer group-hover:scale-105 transition-transform duration-700"
                      onClick={() => setSelectedImage(food.imageUrl)}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                      <div className="p-6">
                        <div className="inline-block px-3 py-1 bg-amber-500 text-white rounded-full text-sm font-medium mb-2">
                          {food.highlight}
                        </div>
                        <h3 className="text-2xl font-bold text-white">{food.name}</h3>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 flex-grow">
                    <p className="text-neutral-600">{food.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Call to Action */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
          className="mt-24 text-center"
        >
          <div className="bg-neutral-900 text-white rounded-3xl p-12 md:p-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Experience Authentic Japanese Flavors?</h2>
            <p className="text-lg text-neutral-300 max-w-2xl mx-auto mb-10">
              Visit us today to enjoy our carefully curated selection of craft beers, premium sake, and traditional
              Japanese dishes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/menu" passHref>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-amber-500 text-black font-bold rounded-full shadow-lg hover:bg-amber-400 transition-colors"
                >
                  View Full Menu
                </motion.div>
              </Link>
            </div>
          </div>
        </motion.section>
      </main>
    </div>
  )
}
