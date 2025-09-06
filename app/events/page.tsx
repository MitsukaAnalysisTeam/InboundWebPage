"use client"

import { motion } from "framer-motion"
import { Gift, MapPin, Star, Users } from "lucide-react"
import Link from "next/link"

export default function EventsPage() {
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
      {/* Hero Section */}
      <div className="relative bg-[url('/images/food-and-drinks/japanese-pattern-dark.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/50"></div>
        <div className="relative z-10 min-h-[60vh] flex flex-col justify-center items-center px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="mb-6 inline-flex items-center">
              <div className="h-[1px] w-12 bg-amber-400"></div>
              <span className="mx-4 text-amber-400 font-medium uppercase tracking-widest text-sm">
                Special Events
              </span>
              <div className="h-[1px] w-12 bg-amber-400"></div>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
              <span className="block">Join Our</span>
              <span className="text-amber-400">Community</span>
            </h1>

            <p className="text-xl text-gray-200 max-w-2xl mx-auto mb-12">
              Be part of our growing community and enjoy special rewards for your support
            </p>
          </motion.div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-16">
        {/* Introduction Section */}
        <motion.section 
          initial="hidden" 
          animate="visible" 
          variants={staggerContainer} 
          className="mb-24 text-center"
        >
          <motion.div variants={fadeIn} className="mb-12">
            <h2 className="text-4xl font-bold mb-6">Special Thank You Events</h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              We appreciate every customer who visits our restaurant and takes the time to share their experience. 
              As a token of our gratitude, we&apos;re offering special rewards for your support.
            </p>
          </motion.div>
        </motion.section>

        {/* Events Grid */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24"
        >
          {/* Website Visit Event */}
          <motion.div variants={fadeIn} className="group">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden h-full">
              <div className="p-8 lg:p-12">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center">
                    <Gift size={32} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-neutral-900">Website Visit Reward</h3>
                    <p className="text-amber-600 font-medium">Free Sticker Gift</p>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <p className="text-neutral-600 text-lg">
                    Thank you for visiting our website! We&apos;re excited to share our story and menu with you.
                  </p>
                  <p className="text-neutral-600">
                    Simply mention that you visited our website when you come to our restaurant, and we&apos;ll give you a special 
                    <span className="font-semibold text-amber-600"> Mitsukabōzu sticker</span> as a thank you gift!
                  </p>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
                  <h4 className="font-bold text-amber-800 mb-3 flex items-center gap-2">
                    <Users size={20} />
                    How to Get Your Sticker
                  </h4>
                  <ul className="space-y-2 text-amber-700">
                    <li className="flex items-start gap-2">
                      <span className="text-amber-500 mt-1">•</span>
                      <span>Visit our restaurant in person</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-500 mt-1">•</span>
                      <span>Tell our staff &quot;I visited your website&quot;</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-500 mt-1">•</span>
                      <span>Receive your free Mitsukabōzu sticker!</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Google Review Event */}
          <motion.div variants={fadeIn} className="group">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden h-full">
              <div className="p-8 lg:p-12">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center">
                    <Star size={32} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-neutral-900">Google Review Reward</h3>
                    <p className="text-amber-600 font-medium">Premium Miso Gift</p>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <p className="text-neutral-600 text-lg">
                    Your feedback helps us improve and helps other customers discover our authentic miso ramen experience.
                  </p>
                  <p className="text-neutral-600">
                    Leave a review on Google Maps and show it to our staff to receive a special 
                    <span className="font-semibold text-amber-600"> premium miso sample</span> as our thank you!
                  </p>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
                  <h4 className="font-bold text-amber-800 mb-3 flex items-center gap-2">
                    <MapPin size={20} />
                    How to Get Your Miso
                  </h4>
                  <ul className="space-y-2 text-amber-700">
                    <li className="flex items-start gap-2">
                      <span className="text-amber-500 mt-1">•</span>
                      <Link 
                        href="https://maps.app.goo.gl/HWZm8vedVNUbZzjt5" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="group transition-colors"
                      >
                        <span className="group-hover:underline">Write a review on </span>
                        <span className="text-blue-600 underline group-hover:text-blue-800">Google Maps</span>
                      </Link>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-500 mt-1">•</span>
                      <span>Show your review to our staff</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-500 mt-1">•</span>
                      <span>Receive your premium miso sample!</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Terms and Conditions */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
          className="bg-neutral-100 rounded-3xl p-8 lg:p-12"
        >
          <h3 className="text-2xl font-bold mb-6 text-center">Terms & Conditions</h3>
          <div className="max-w-4xl mx-auto space-y-4 text-neutral-600">
            <p>
              • One reward per customer per visit. Rewards are subject to availability.
            </p>
            <p>
              • Google reviews must be genuine and posted from your personal account.
            </p>
            <p>
              • These promotions are valid for dine-in customers only.
            </p>
            <p>
              • Mitsukabōzu reserves the right to modify or discontinue these promotions at any time.
            </p>
          </div>
        </motion.section>

        {/* Call to Action */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
          className="mt-24 text-center"
        >
          <div className="bg-neutral-900 text-white rounded-3xl p-12 md:p-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Join Our Community?</h2>
            <p className="text-lg text-neutral-300 max-w-2xl mx-auto mb-10">
              Visit us today and be part of our growing community. We can&apos;t wait to share our authentic miso ramen experience with you!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/menu" passHref>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-amber-500 text-black font-bold rounded-full shadow-lg hover:bg-amber-400 transition-colors"
                >
                  View Our Menu
                </motion.div>
              </Link>
              <Link href="/access" passHref>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition-colors"
                >
                  Find Us
                </motion.div>
              </Link>
            </div>
          </div>
        </motion.section>
      </main>
    </div>
  )
}