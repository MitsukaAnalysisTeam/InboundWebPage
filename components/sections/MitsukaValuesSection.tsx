'use client'

import React, { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { GrapeIcon as Grain } from 'lucide-react'

const values = [
  {
    number: "①",
    title: "What Mitsukabōzu Values Most",
    body: (
      <>
        <p className="mb-4">We value &quot;cultivating people.&quot;<br />
        Mitsukabōzu is not just a restaurant that serves miso ramen, local sake, or craft beer.<br />
        As a &quot;theme park of fermentation, miso, and noodles,&quot; our mission is to be a place where everyone involved—diners, staff, producers, and the local community—can experience the essence of fermentation: transformation, deepening, and connection.</p>
        <ul className="list-disc pl-5 mb-4 space-y-1">
          <li>A single bowl of ramen can reset someone&rsquo;s day,</li>
          <li>Spark laughter between strangers,</li>
          <li>Become a source of pride for the one who made it.</li>
        </ul>
        <p>We cherish these invisible values more than anything.</p>
      </>
    ),
  },
  {
    number: "②",
    title: "A Turning Point for Mitsukabōzu",
    body: (
      <>
        <p className="mb-4">In 2022, after over a decade of serving miso ramen in both Hotarugaike and Umeda, Mitsukabōzu made the decision to consolidate its operations back to its origin—Hotarugaike.<br />
        This move wasn&rsquo;t just a &quot;downsizing,&quot; but rather the beginning of a re-fermentation. Our goal was not only to be &quot;rooted in the community,&quot; but to become a presence that ferments with the community.</p>
        <ul className="list-disc pl-5 mb-4 space-y-1">
          <li>Use local ingredients,</li>
          <li>Share the heart and soul of the producers,</li>
          <li>Create a space where local residents, workers, and travelers can come together, blending into a living ecosystem where &quot;people and the community ferment together.&quot;</li>
        </ul>
        <p>Mitsukabōzu is not just a restaurant.<br />It&rsquo;s a micro-fermentation hub.<br />This marked a new chapter for Mitsukabōzu starting in 2022—and the true beginning of the vision we had when we first opened.</p>
      </>
    ),
  },
  {
    number: "③",
    title: "The Charm of Osaka (Hokusetsu)",
    body: (
      <>
        <p className="mb-4">
          &quot;A community where warmth and the culture of fermentation naturally take root.&quot;<br />
          In the northern part of Osaka, the Hokusetsu area strikes a perfect balance between city life and nature. From town, you can see the satoyama (rural foothills) woven into the landscape. With Itami Airport nearby, it offers easy domestic access, and it&rsquo;s home to national universities, Expo &#39;70 Park, and many locals who nurture their community and small, meaningful cultures.
        </p>
        <ul className="list-disc pl-5 mb-4 space-y-1">
          <li>Akishika Sake Brewery grows pesticide-free rice in the mountains of Nose.</li>
          <li>Minoh Beer brews craft beer at the foot of the Minoh mountains.</li>
          <li>In places like Suita and Minoh, people run local markets full of community love.</li>
        </ul>
        <p>This region provides fertile ground for enjoying both what remains unchanged and what evolves over time.<br />
        Mitsukabōzu has taken root in this very &quot;fermentation-friendly&quot; place, and together with our team, we continue to cultivate it every day.</p>
      </>
    ),
  },
];

export default function MitsukaValuesSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 })
  
  return (
    <section 
      ref={sectionRef}
      className="py-20 relative overflow-hidden bg-gradient-to-b from-amber-50 to-white" 
      id="values"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', 
          backgroundSize: '30px 30px' 
        }} />
      </div>
      
      {/* Floating decoration elements */}
      <motion.div 
        className="absolute top-20 left-10 text-amber-600/20 hidden lg:block"
        animate={{ 
          y: [0, 15, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity,
          ease: "easeInOut" 
        }}
      >
        <Grain size={120} />
      </motion.div>
      
      <motion.div 
        className="absolute bottom-20 right-10 text-amber-600/20 hidden lg:block"
        animate={{ 
          y: [0, -15, 0],
          rotate: [0, -5, 0]
        }}
        transition={{ 
          duration: 7, 
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      >
        <Grain size={100} />
      </motion.div>
      
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-5xl font-bold mb-4 text-amber-800">
            What Is <span className="text-amber-600">MitsukaBōzu</span>?
          </h2>
          <div className="w-20 h-1 bg-amber-500 mx-auto rounded-full"></div>
        </motion.div>
        
        <div className="max-w-4xl mx-auto">
          {values.map((v, index) => (
            <motion.div 
              key={v.number}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ 
                duration: 0.7, 
                delay: index * 0.2 + 0.3,
                ease: "easeOut"
              }}
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
              className="mb-12 bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300"
            >
              <div className="p-8 relative">
                {/* Number badge */}
                <div className="absolute -top-2 -left-2 w-14 h-14 flex items-center justify-center bg-amber-600 text-white rounded-br-2xl rounded-tl-lg shadow-md">
                  <span className="text-2xl font-bold">{v.number}</span>
                </div>
                
                <div className="ml-12">
                  <h3 className="text-xl sm:text-2xl font-bold text-amber-800 mb-4 mt-1">
                    {v.title}
                  </h3>
                  
                  <motion.div 
                    className="text-gray-700 leading-relaxed"
                    initial={{ opacity: 0.8 }}
                    whileHover={{ opacity: 1 }}
                  >
                    {v.body}
                  </motion.div>
                </div>
              </div>
              
              {/* Bottom decorative bar */}
              <div className="h-2 bg-gradient-to-r from-amber-400 via-amber-600 to-amber-500"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
