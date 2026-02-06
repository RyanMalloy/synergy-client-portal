'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { PROCESS_STEPS } from '@/lib/utils';
import { staggerContainer, staggerItem } from '@/lib/animations';

export default function Process() {
  return (
    <section className="py-20 lg:py-32 bg-gray-50">
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
            Our Process
          </motion.span>
          <motion.h2
            variants={staggerItem}
            className="mt-4 text-4xl md:text-5xl font-bold text-gray-900 leading-tight"
          >
            From Concept to Launch in Weeks, Not Months
          </motion.h2>
        </motion.div>

        {/* Process Steps */}
        <motion.div
          className="max-w-4xl mx-auto"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {/* Desktop View - Horizontal */}
          <div className="hidden lg:block">
            <div className="flex items-center justify-between mb-12">
              {PROCESS_STEPS.map((step, i) => (
                <React.Fragment key={i}>
                  <motion.div variants={staggerItem} className="flex-1 text-center">
                    <div className="flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-synergy-blue text-white flex items-center justify-center text-2xl font-bold">
                        {step.number}
                      </div>
                    </div>
                    <h3 className="mt-4 text-xl font-semibold text-gray-900">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-gray-600 text-sm">{step.description}</p>
                  </motion.div>

                  {i < PROCESS_STEPS.length - 1 && (
                    <div className="flex-shrink-0 mx-4 w-12 h-0.5 bg-gradient-to-r from-synergy-blue to-transparent" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Mobile View - Vertical */}
          <div className="lg:hidden space-y-8">
            {PROCESS_STEPS.map((step, i) => (
              <motion.div key={i} variants={staggerItem} className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-synergy-blue text-white flex items-center justify-center text-lg font-bold">
                    {step.number}
                  </div>
                  {i < PROCESS_STEPS.length - 1 && (
                    <div className="w-0.5 h-16 bg-gradient-to-b from-synergy-blue to-transparent mx-auto mt-4" />
                  )}
                </div>

                <div className="flex-1 pt-2">
                  <h3 className="text-lg font-semibold text-gray-900">{step.title}</h3>
                  <p className="mt-2 text-gray-600">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
