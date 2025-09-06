'use client';

import Image from 'next/image';
import { DecorativeBackground } from '@/components/ui/DecorativeBackground';
import { MapPin, Train, Clock, Phone } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function AccessPage() {
  // Static data to avoid import issues
  const restaurantInfo = {
    name: "Fermentation, Miso & Noodles Mitsukabose",
    address: "2F, Airport Center Building, 1-6-5 Hotarugaike Higashimachi, Toyonaka, Osaka 560-0036, Japan",
    access: "1-minute walk from Hotarugaike Station East Exit (Hankyu Takarazuka Line & Osaka Monorail)",
    hours: {
      "Wed–Sat": "11:30–24:00 (Last order 23:30)",
      "Sun & Holidays": "11:30–22:00 (Last order 21:30)"
    },
    closed: ["Monday", "Tuesday"],
    phone: "+81-6-6850-3532",
    website: "https://mitsukabose.com",
    instagram: "https://www.instagram.com/mitsukabose.official/",
    twitter: "https://x.com/mitsukabose"
  };

  const accessInfo = {
    mapUrl: "http://googleusercontent.com/maps/google.com/1"
  };
  // This is the embeddable link for the iframe
  const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3276.4277464384927!2d135.44954909999998!3d34.7951789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6000f077fa0f081f%3A0x41a2ef4a75848277!2z55m66YW144Go5ZGz5ZmM44Go6bq6IOOBv-OBpOOBi-WdiuS4uw!5e0!3m2!1sja!2sjp!4v1757148904874!5m2!1sja!2sjp";

  return (
    <div className="min-h-screen bg-white">
      <DecorativeBackground />
      <main className="relative z-10">
        {/* Page Header */}
        <header className="relative z-10 pt-16 pb-12 px-4 text-center">
          <div className="max-w-md mx-auto">
            <h1 className="text-4xl md:text-5xl font-serif font-light text-[#333333] mb-2">Access</h1>
            <p className="text-lg text-[#666666] font-light">
               How to get here
            </p>
          </div>
        </header>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 pb-16">
          
          {/* Section for the Entrance Photo */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center"
          >
            <h2 className="text-3xl font-serif font-light text-[#333333] mb-6">
              Our Entrance
            </h2>
            <div className="rounded-lg overflow-hidden shadow-lg max-w-3xl mx-auto">
              <div className="relative w-full aspect-[3/4] sm:aspect-[4/3] md:aspect-[3/4]"> {/* 縦長に変更 */}
                <Image
                  src="/images/access/store-front.jpg"
                  alt="The entrance to Mitsukabose on the 2nd floor of the Airport Center Building"
                  fill
                  className="object-cover object-bottom"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 70vw, 50vw" // sizesも調整
                  priority
                />
              </div>
            </div>
            <p className="mt-4 text-lg text-gray-600">
              You&apos;ll find us on the 2nd floor of the Airport Center Building. Please come up the stairs to our entrance.
            </p>
          </motion.section>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            {/* Access Details */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="space-y-8">
                {/* By Train */}
                <div>
                  <h2 className="text-2xl font-serif font-light text-[#333333] mb-4 flex items-center">
                    <Train className="w-6 h-6 mr-3 text-[#E07A5F]" />
                    By Train
                  </h2>
                  <p className="text-lg text-gray-700">{restaurantInfo.access}</p>
                </div>

                {/* Address */}
                <div>
                  <h2 className="text-2xl font-serif font-light text-[#333333] mb-4 flex items-center">
                    <MapPin className="w-6 h-6 mr-3 text-[#E07A5F]" />
                    Address
                  </h2>
                  <p className="text-lg text-gray-700 leading-relaxed">{restaurantInfo.address}</p>
                  <a
                    href={accessInfo.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-4 px-6 py-3 bg-[#E07A5F] text-white font-bold rounded-full hover:bg-[#C25E48] transition-colors shadow"
                  >
                    Open in Google Maps
                  </a>
                </div>

                {/* Hours */}
                <div>
                  <h2 className="text-2xl font-serif font-light text-[#333333] mb-4 flex items-center">
                    <Clock className="w-6 h-6 mr-3 text-[#E07A5F]" />
                    Hours
                  </h2>
                  <ul className="text-lg text-gray-700 space-y-1">
                    {Object.entries(restaurantInfo.hours).map(([days, hours]) => (
                      <li key={days}>
                        <span className="font-semibold">{days}:</span> {hours}
                      </li>
                    ))}
                  </ul>
                   <p className="mt-2 text-gray-600">
                    Closed on {restaurantInfo.closed.join(' & ')}
                  </p>
                </div>
                
                {/* Phone */}
                <div>
                  <h2 className="text-2xl font-serif font-light text-[#333333] mb-4 flex items-center">
                    <Phone className="w-6 h-6 mr-3 text-[#E07A5F]" />
                    Phone
                  </h2>
                   <p className="text-lg text-gray-700">{restaurantInfo.phone}</p>
                </div>
              </div>
            </motion.div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative h-[400px] md:h-full rounded-lg overflow-hidden shadow-lg"
            >
              <iframe
                src={mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}