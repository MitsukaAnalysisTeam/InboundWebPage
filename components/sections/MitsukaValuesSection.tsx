"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { GrapeIcon, Droplets, Wheat, Utensils, MapPin } from "lucide-react"

interface Value {
  number: string;
  title: string;
  icon: React.ReactNode;
  body: React.ReactNode;
}

const values = [
  {
    number: "①",
    title: "What Mitsukabōzu Values Most",
    icon: <Utensils className="w-8 h-8" />,
    body: (
      <>
        <p className="mb-4">
          We value &quot;cultivating people.&quot;
          <br />
          Mitsukabōzu is not just a restaurant that serves miso ramen, local sake, or craft beer.
          <br />
          As a &quot;theme park of fermentation, miso, and noodles,&quot; our mission is to be a place where everyone
          involved—diners, staff, producers, and the local community—can experience the essence of fermentation:
          transformation, deepening, and connection.
        </p>
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
    icon: <Droplets className="w-8 h-8" />,
    body: (
      <>
        <p className="mb-4">
          In 2022, after over a decade of serving miso ramen in both Hotarugaike and Umeda, Mitsukabōzu made the
          decision to consolidate its operations back to its origin—Hotarugaike.
          <br />
          This move wasn&rsquo;t just a &quot;downsizing,&quot; but rather the beginning of a re-fermentation. Our goal
          was not only to be &quot;rooted in the community,&quot; but to become a presence that ferments with the
          community.
        </p>
        <ul className="list-disc pl-5 mb-4 space-y-1">
          <li>Use local ingredients,</li>
          <li>Share the heart and soul of the producers,</li>
          <li>
            Create a space where local residents, workers, and travelers can come together, blending into a living
            ecosystem where &quot;people and the community ferment together.&quot;
          </li>
        </ul>
        <p>
          Mitsukabōzu is not just a restaurant.
          <br />
          It&rsquo;s a micro-fermentation hub.
          <br />
          This marked a new chapter for Mitsukabōzu starting in 2022—and the true beginning of the vision we had when we
          first opened.
        </p>
      </>
    ),
  },
  {
    number: "③",
    title: "The Charm of Osaka (Hokusetsu)",
    icon: <MapPin className="w-8 h-8" />,
    body: (
      <>
        <p className="mb-4">
          &quot;A community where warmth and the culture of fermentation naturally take root.&quot;
          <br />
          In the northern part of Osaka, the Hokusetsu area strikes a perfect balance between city life and nature. From
          town, you can see the satoyama (rural foothills) woven into the landscape. With Itami Airport nearby, it
          offers easy domestic access, and it&rsquo;s home to national universities, Expo &#39;70 Park, and many locals
          who nurture their community and small, meaningful cultures.
        </p>
        <ul className="list-disc pl-5 mb-4 space-y-1">
          <li>Akishika Sake Brewery grows pesticide-free rice in the mountains of Nose.</li>
          <li>Minoh Beer brews craft beer at the foot of the Minoh mountains.</li>
          <li>In places like Suita and Minoh, people run local markets full of community love.</li>
        </ul>
        <p>
          This region provides fertile ground for enjoying both what remains unchanged and what evolves over time.
          <br />
          Mitsukabōzu has taken root in this very &quot;fermentation-friendly&quot; place, and together with our team,
          we continue to cultivate it every day.
        </p>
      </>
    ),
  },
]

export default function MitsukaValuesSection() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])

  return (
    <section ref={containerRef} className="py-24 relative overflow-hidden" id="values">
      {/* Japanese-inspired background */}
      <motion.div className="absolute inset-0 z-0" style={{ y: backgroundY }}>
        <div className="absolute inset-0 bg-gradient-to-b from-amber-50 via-amber-100/50 to-white" />
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <pattern id="seigaiha" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M0,10 a10,10 0 0,0 20,0 a10,10 0 0,0 -20,0 z" fill="none" stroke="#000" strokeWidth="0.5" />
              <path d="M0,10 a5,5 0 0,0 10,0 a5,5 0 0,0 -10,0 z" fill="none" stroke="#000" strokeWidth="0.5" />
              <path d="M10,10 a10,10 0 0,0 20,0 a10,10 0 0,0 -20,0 z" fill="none" stroke="#000" strokeWidth="0.5" />
              <path d="M10,10 a5,5 0 0,0 10,0 a5,5 0 0,0 -10,0 z" fill="none" stroke="#000" strokeWidth="0.5" />
            </pattern>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#seigaiha)" />
          </svg>
        </div>
      </motion.div>

      {/* Floating decoration elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {[...Array(15)].map((_, i) => {
          // 固定の初期値を設定
          const initialX = ((i * 7) % 100);  // 0から100の間で均等に分布
          const initialY = ((i * 13) % 100); // 0から100の間で均等に分布
          const initialScale = 0.5 + ((i * 11) % 100) / 100; // 0.5から1.5の間
          const initialRotate = (i * 24) % 360; // 0から360の間

          return (
            <motion.div
              key={i}
              className="absolute text-amber-600/10"
              initial={{
                x: `${initialX}%`,
                y: `${initialY}%`,
                scale: initialScale,
                rotate: initialRotate,
              }}
              animate={{
                y: [`${initialY}%`, `${(initialY + 50) % 100}%`],
                rotate: [initialRotate, (initialRotate + 180) % 360],
              }}
              transition={{
                duration: 15 + (i * 5),
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                repeatType: "reverse",
              }}
            >
              {i % 3 === 0 ? (
                <GrapeIcon size={30 + ((i * 17) % 40)} />
              ) : i % 3 === 1 ? (
                <Droplets size={30 + ((i * 19) % 40)} />
              ) : (
                <Wheat size={30 + ((i * 23) % 40)} />
              )}
            </motion.div>
          );
        })}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <ValuesSectionHeader />

        <div className="max-w-5xl mx-auto mt-20">
          {values.map((value, index) => (
            <ValueCard key={index} value={value} index={index} />
          ))}
        </div>
      </div>

      {/* Japanese-inspired decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-16 bg-amber-800/5 z-0">
        <div className="absolute bottom-0 left-0 w-full">
          <svg viewBox="0 0 1200 30" preserveAspectRatio="none" className="w-full h-8">
            <path d="M0,0 Q300,30 600,0 T1200,0 V30 H0 Z" fill="#FEF3C7" fillOpacity="0.3" />
            <path d="M0,5 Q300,35 600,5 T1200,5 V30 H0 Z" fill="#FEF3C7" fillOpacity="0.3" />
          </svg>
        </div>
      </div>
    </section>
  )
}

function ValuesSectionHeader() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.7 }}
      className="text-center relative"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="inline-block relative"
      >
        <div className="absolute -inset-1 bg-amber-200/30 rounded-full blur-xl"></div>
        <h2 className="text-4xl sm:text-6xl font-bold mb-6 text-amber-800 relative">
          <span className="relative inline-block">
            What Is{" "}
            <motion.span
              className="text-amber-600 relative inline-block"
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              MitsukaBōzu
              <motion.div
                className="absolute -bottom-1 left-0 w-full h-1 bg-amber-500 rounded-full"
                animate={{
                  scaleX: [0.7, 1, 0.7],
                  x: ["-15%", "0%", "-15%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
            </motion.span>
            ?
          </span>
        </h2>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="max-w-2xl mx-auto"
      >
        <p className="text-lg text-amber-800/80 mb-8">
        Welcome to the world of fermentation through our values and story
        </p>

        <div className="flex items-center justify-center space-x-2">
          <div className="w-16 h-0.5 bg-amber-500/50 rounded-full"></div>
          <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
          <div className="w-16 h-0.5 bg-amber-500/50 rounded-full"></div>
        </div>
      </motion.div>
    </motion.div>
  )
}

function ValueCard({ value, index }: { value: Value; index: number }) {
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: false, amount: 0.3 })

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 100 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
      transition={{
        duration: 0.8,
        delay: index * 0.2,
        ease: "easeOut",
      }}
      className="mb-20 relative"
    >
      {/* Connecting line between cards */}
      {index < values.length - 1 && (
        <motion.div
          className="absolute left-1/2 bottom-0 w-0.5 h-20 bg-gradient-to-b from-amber-400 to-transparent"
          initial={{ scaleY: 0, opacity: 0 }}
          animate={isInView ? { scaleY: 1, opacity: 1 } : { scaleY: 0, opacity: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          style={{ translateX: "-50%", translateY: "100%" }}
        />
      )}

      <div className="relative">
        {/* Number badge with Japanese-inspired design */}
        <motion.div
          className="absolute -top-6 -left-6 z-10 md:-left-10 md:-top-10"
          initial={{ rotate: -10, scale: 0.8 }}
          animate={isInView ? { rotate: 0, scale: 1 } : { rotate: -10, scale: 0.8 }}
          transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
        >
          <div className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center bg-amber-600 text-white rounded-full shadow-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10 z-0">
              <svg className="w-full h-full opacity-20" viewBox="0 0 100 100">
                <pattern id={`japanese-pattern-${index}`} patternUnits="userSpaceOnUse" width="20" height="20">
                  <path d="M0,10 a10,10 0 0,0 20,0 a10,10 0 0,0 -20,0 z" fill="none" stroke="#FFF" strokeWidth="0.5" />
                </pattern>
                <rect x="0" y="0" width="100%" height="100%" fill={`url(#japanese-pattern-${index})`} />
              </svg>
            </div>
            <span className="text-3xl md:text-4xl font-bold relative z-10">{value.number}</span>
          </div>
        </motion.div>

        <motion.div
          className="bg-white rounded-2xl shadow-xl overflow-hidden relative z-0"
          whileHover={{
            scale: 1.02,
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Top decorative pattern */}
          <div className="h-3 bg-gradient-to-r from-amber-400 via-amber-600 to-amber-500"></div>

          <div className="p-8 md:p-10 pt-8 md:pt-10">
            <div className="ml-14 md:ml-16">
              <div className="flex items-center mb-6">
                <motion.div
                  className="mr-4 text-amber-600"
                  animate={{
                    rotate: [0, 10, 0, -10, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: index * 1.5,
                  }}
                >
                  {value.icon}
                </motion.div>
                <h3 className="text-2xl md:text-3xl font-bold text-amber-800">{value.title}</h3>
              </div>

              <motion.div
                className="prose prose-amber prose-lg max-w-none text-gray-700"
                initial={{ opacity: 0.8 }}
                whileHover={{ opacity: 1 }}
              >
                {value.body}
              </motion.div>
            </div>
          </div>

          {/* Side decorative element */}
          <div className="absolute top-0 right-0 h-full w-2 bg-amber-100"></div>

          {/* Bottom decorative pattern */}
          <div className="h-1 bg-amber-200"></div>
        </motion.div>
      </div>
    </motion.div>
  )
}
