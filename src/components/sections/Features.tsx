'use client';


import { motion } from 'framer-motion';
import { Card } from '@/components/ui';
import { FEATURES } from '@/lib/utils';
import {
  Palette,
  Zap,
  Search,
  Smartphone,
  Settings,
  Heart,
} from 'lucide-react';
import { staggerContainer, staggerItem } from '@/lib/animations';

const iconMap = {
  Palette: Palette,
  Zap: Zap,
  Search: Search,
  Smartphone: Smartphone,
  Settings: Settings,
  Heart: Heart,
};

export default function Features() {
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
            Why Choose Synergy
          </motion.span>
          <motion.h2
            variants={staggerItem}
            className="mt-4 text-4xl md:text-5xl font-bold text-gray-900 leading-tight"
          >
            Everything You Need to Succeed Online
          </motion.h2>
          <motion.p
            variants={staggerItem}
            className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto"
          >
            A complete web solution built for modern Ohio businesses
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {FEATURES.map((feature, i) => {
            const Icon = iconMap[feature.icon as keyof typeof iconMap];

            return (
              <motion.div key={i} variants={staggerItem}>
                <Card hover className="h-full group p-8">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 bg-soft-blue rounded-xl group-hover:bg-synergy-blue group-hover:text-white transition-all duration-300">
                      <Icon className="w-6 h-6 text-synergy-blue group-hover:text-white" />
                    </div>
                  </div>

                  <h3 className="mt-4 text-xl font-semibold text-gray-900">
                    {feature.title}
                  </h3>

                  <p className="mt-2 text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
