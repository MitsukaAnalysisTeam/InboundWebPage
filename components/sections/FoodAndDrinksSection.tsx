"use client"

import { getFoodDrinks } from "@/domain/services/dataService"
import type { FoodDrinkItem } from "@/domain/types"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useState } from "react"
import Image from "next/image"
import { X } from "lucide-react"
import { AnimatePresence } from "framer-motion"

export default function FoodAndDrinksSection() {
  const items = getFoodDrinks()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  return (
    <section ref={ref} className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
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
                onClick={e => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute -top-12 right-0 text-white hover:text-amber-400 transition-colors"
                >
                  <X size={32} />
                </button>
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={selectedImage}
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
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-center mb-12"
        >
          Food & Drinks
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-2xl mx-auto mb-12 bg-white/80 rounded-xl shadow p-6 border border-amber-100"
        >
          <h3 className="text-xl font-bold text-amber-700 mb-2">Orizé Brewing</h3>
          <p className="text-gray-700">
            2019年に和歌山県で設立されたOrizé Brewingは、世界初の米麹を主原料としたビールを生み出したパイオニア的なナノブルワリーです。革新と伝統にこだわり、発酵の芸術を讃えるユニークな日本ビールを醸造しています。彼らのビールは味わいが特徴的であるだけでなく、すべて国産原料を使用したグルテンフリーのビールです。日本の文化と職人技に根ざした、真にオリジナルなビールの世界をお楽しみください。
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {items.map((item: FoodDrinkItem) => (
            <motion.div
              key={item.name}
              variants={itemVariants}
              whileHover={{
                y: -10,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all"
            >
              <motion.div
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                className="mb-4"
              >
                <div className="relative w-full h-48 mb-2">
                  <Image
                    src={item.imageUrl || "/placeholder.svg"}
                    alt={item.name}
                    fill
                    className="object-cover rounded cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => setSelectedImage(item.imageUrl)}
                  />
                </div>
                <span className="inline-block px-3 py-1 text-sm font-semibold rounded-full bg-primary text-white">
                  {item.category}
                </span>
              </motion.div>
              <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
              <p className="text-gray-600">{item.highlight}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
