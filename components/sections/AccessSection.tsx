"use client"

import { getAccessInfo } from "@/domain/services/dataService"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

export default function AccessSection() {
  const accessInfo = getAccessInfo()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  return (
    <section ref={ref} className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-center mb-12"
        >
          Access
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8 }}
            className="relative h-[400px] rounded-lg overflow-hidden shadow-lg"
          >
            <iframe
              src={accessInfo.mapUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="flex flex-col justify-center"
          >
            <div className="space-y-6">
              <motion.div variants={itemVariants}>
                <h3 className="text-xl font-semibold mb-2">Nearest Station</h3>
                <p className="text-lg">{accessInfo.station}</p>
                <p className="text-gray-600">{accessInfo.walkTime} walk</p>
              </motion.div>

              <motion.div variants={itemVariants}>
                <h3 className="text-xl font-semibold mb-2">Address</h3>
                <p className="text-lg">
                  2F, Airport Center Building,
                  <br />
                  1-6-5 Hotarugaike Higashimachi,
                  <br />
                  Toyonaka, Osaka 560-0036, Japan
                </p>
              </motion.div>

              <motion.div variants={itemVariants}>
                <h3 className="text-xl font-semibold mb-2">Business Hours</h3>
                <p className="text-lg">Wed–Sat & Holidays: 11:30–24:00 (Last order 23:30)</p>
                <p className="text-lg">Sun: 11:30–22:00 (Last order 21:30)</p>
                <p className="text-gray-600 mt-2">Closed on Monday and Tuesday</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
