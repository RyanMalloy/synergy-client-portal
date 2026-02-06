'use client';


import { motion } from 'framer-motion';
import { Button } from '@/components/ui';
import { staggerContainer, staggerItem } from '@/lib/animations';

interface CTAProps {
  title?: string;
  description?: string;
  primaryText?: string;
  primaryHref?: string;
  secondaryText?: string;
  secondaryHref?: string;
}

export default function CTA({
  title = 'Ready to Modernize Your Web Presence?',
  description = 'Start your transformation today and join 50+ growing Ohio businesses who are already seeing results.',
  primaryText = 'Start Your Project',
  primaryHref = '/contact',
  secondaryText = 'Schedule a Call',
  secondaryHref = '/contact',
}: CTAProps) {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-deep-navy via-muted-navy to-deep-navy -z-10" />
      <div className="absolute inset-0 opacity-20 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-synergy-blue rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-mesh-move" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-purple rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-mesh-move" />
      </div>

      {/* Content */}
      <motion.div
        className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center"
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <motion.h2
          variants={staggerItem}
          className="text-4xl md:text-5xl font-bold text-white leading-tight"
        >
          {title}
        </motion.h2>

        <motion.p
          variants={staggerItem}
          className="mt-6 text-xl text-gray-300 max-w-2xl mx-auto"
        >
          {description}
        </motion.p>

        <motion.div
          variants={staggerItem}
          className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button size="lg" asLink href={primaryHref}>
            {primaryText}
          </Button>
          <Button variant="secondary" size="lg" asLink href={secondaryHref}>
            {secondaryText}
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
