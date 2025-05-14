"use client"

import { getRetailItems } from "@/domain/services/dataService"
import type { RetailItem } from "@/domain/types"
import Image from "next/image"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

export default function RetailSection() {
  const items = getRetailItems()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section ref={ref} className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-center mb-12"
        >
          Retail Items
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex overflow-x-auto pb-8 gap-6 snap-x snap-mandatory"
        >
          {items.map((item: RetailItem, index) => (
            <motion.div
              key={item.name}
              className="flex-none w-80 snap-center"
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
              }}
              style={{
                transformOrigin: "center",
                willChange: "transform, box-shadow",
              }}
            >
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <motion.div className="relative h-48" whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                  <Image
                    src={`/images/retail/${item.name.toLowerCase().replace(/\s+/g, "-")}.jpg`}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </motion.div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                  <motion.p
                    className="text-lg font-bold text-primary mb-4"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    ¥{item.priceYen.toLocaleString()}
                  </motion.p>
                  <p className="text-gray-600">{item.highlight}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
