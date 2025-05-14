"use client"

import { BowlIcon } from "@/components/icons/BowlIcon"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

const points = [
  "We ferment our miso in-house to develop deep, complex flavors.",
  "Our unique broth blends multiple regional miso pastes for balance.",
  "House-made noodles are crafted daily to match the richness of our soup.",
  "Local ingredients from northern Osaka are used whenever possible.",
]

export default function WhyMisoRamenSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  }

  return (
    <section ref={ref} className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center mb-8"
        >
          <motion.div
            animate={inView ? { rotate: 360 } : { rotate: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            <BowlIcon className="w-12 h-12 mr-4 text-primary" />
          </motion.div>
          <h2 className="text-3xl font-bold">Why Miso Ramen?</h2>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <motion.ul
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="space-y-4"
          >
            {points.map((point, index) => (
              <motion.li key={index} variants={itemVariants} className="flex items-start">
                <motion.span
                  className="text-primary mr-3 text-xl"
                  animate={
                    inView
                      ? {
                          scale: [1, 1.2, 1],
                          color: ["#d97706", "#f59e0b", "#d97706"],
                        }
                      : {}
                  }
                  transition={{
                    duration: 1.5,
                    delay: index * 0.3 + 0.5,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatDelay: 3,
                  }}
                >
                  •
                </motion.span>
                <p className="text-lg">{point}</p>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  )
}
