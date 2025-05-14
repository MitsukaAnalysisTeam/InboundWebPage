'use client'

import Image from "next/image"
import { motion } from "framer-motion"
import { Parallax } from "react-scroll-parallax"
import AnimatedSection from "@/components/AnimatedSection"
import Link from "next/link"

export default function HeroSection() {
  return (
    <section className="relative w-full h-[90vh] overflow-hidden mb-20">
      {/* Background image with parallax effect */}
      <Parallax speed={-20} className="absolute inset-0 z-0">
        <div className="relative w-full h-full">
          <Image
            src="/placeholder.svg?height=1080&width=1920"
            alt="Miso Ramen"
            fill
            className="object-cover brightness-75"
            priority
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
      </Parallax>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 md:px-8">
        <AnimatedSection>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-6"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-2">Mitsukabose</h1>
            <p className="text-2xl md:text-3xl text-amber-200 font-medium">Specializing in Miso Ramen</p>
          </motion.div>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-xl md:text-2xl text-white mb-8 max-w-2xl"
          >
            Savor the authentic depth of miso in Hotarugaike, Osaka.
            <span className="block mt-2">Enjoy a bowl where tradition and innovation intertwine.</span>
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/menu">
              <button className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 text-lg rounded-md font-medium transition-colors duration-200 min-w-[180px]">
                View Menu
              </button>
            </Link>
            <Link href="/access">
              <button className="bg-transparent hover:bg-white/10 text-white border-2 border-white px-8 py-4 text-lg rounded-md font-medium transition-colors duration-200 min-w-[180px]">
                Reserve Now
              </button>
            </Link>
          </motion.div>
        </AnimatedSection>
      </div>

      {/* Scroll-down indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <div className="flex flex-col items-center text-white">
          <p className="text-sm mb-2">Scroll down to explore</p>
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
