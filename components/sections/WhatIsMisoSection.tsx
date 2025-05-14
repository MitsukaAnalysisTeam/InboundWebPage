'use client'

import { getMisoInfo } from '@/domain/services/dataService';
import { MisoType } from '@/domain/types';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function WhatIsMisoSection() {
  const misoInfo = getMisoInfo();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section ref={ref} className="py-16 bg-beige-50">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-center mb-8"
        >
          What is Miso?
        </motion.h2>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-3xl mx-auto mb-12"
        >
          <p className="text-lg mb-4">{misoInfo.intro}</p>
          <p className="text-lg">
            At Mitsukabose, we carefully select and blend different types of miso to create our unique flavor profile.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {misoInfo.types.map((miso: MisoType) => (
            <motion.div
              key={miso.id}
              variants={itemVariants}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300"
              whileHover={{ 
                y: -5, 
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
            >
              <h3 className="text-xl font-semibold mb-2">{miso.name}</h3>
              <p className="text-gray-600 mb-2">Origin: {miso.origin}</p>
              <p className="text-gray-700">{miso.flavor}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
