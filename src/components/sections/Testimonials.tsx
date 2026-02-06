'use client';


import { motion } from 'framer-motion';
import { Card } from '@/components/ui';
import Image from 'next/image';
import { TESTIMONIALS } from '@/lib/utils';
import { staggerContainer, staggerItem } from '@/lib/animations';

export default function Testimonials() {
  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <motion.span variants={staggerItem} className="text-xs font-semibold uppercase tracking-widest text-synergy-blue">
            Client Success Stories
          </motion.span>
          <motion.h2
            variants={staggerItem}
            className="mt-4 text-4xl md:text-5xl font-bold text-gray-900 leading-tight"
          >
            Trusted by Growing Businesses
          </motion.h2>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {TESTIMONIALS.map((testimonial, i) => (
            <motion.div key={i} variants={staggerItem}>
              <Card hover className="h-full p-8 flex flex-col">
                {/* Quote Icon */}
                <svg
                  className="w-10 h-10 text-blue-100 mb-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>

                {/* Quote Text */}
                <p className="text-lg text-gray-700 leading-relaxed mb-6 flex-1">
                  "{testimonial.quote}"
                </p>

                {/* Attribution */}
                <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.author}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.author}</p>
                    <p className="text-sm text-gray-500">{testimonial.title}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
