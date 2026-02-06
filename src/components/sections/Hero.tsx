'use client';


import { motion } from 'framer-motion';
import { Button } from '@/components/ui';
import { staggerContainer, staggerItem } from '@/lib/animations';

interface HeroProps {
  title: string;
  subtitle: string;
  description: string;
  primaryCTA?: { text: string; href: string };
  secondaryCTA?: { text: string; href: string };
  showLogos?: boolean;
}

export default function Hero({
  title,
  subtitle,
  description,
  primaryCTA = { text: 'Get Started', href: '/signup' },
  secondaryCTA = { text: 'View Our Work', href: '/portfolio' },
  showLogos = true,
}: HeroProps) {
  const logos = [
    'Acme Co',
    'Tech Corp',
    'Business Inc',
    'Growth Labs',
    'Nova Systems',
  ];

  return (
    <div className="relative min-h-screen bg-deep-navy overflow-hidden pt-32 lg:pt-40 pb-20">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        {/* Mesh Gradient */}
        <div className="absolute inset-0 opacity-30 animate-mesh-move">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-synergy-blue rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
          <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-accent-purple rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
          <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-synergy-blue rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
        </div>
      </div>

      {/* Content */}
      <motion.div
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <div className="max-w-3xl mx-auto text-center">
          {/* Overline */}
          <motion.div variants={staggerItem}>
            <span className="text-xs font-semibold uppercase tracking-widest text-synergy-blue">
              {subtitle}
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            variants={staggerItem}
            className="mt-6 text-5xl md:text-7xl font-extrabold text-white leading-[1.1] tracking-tight"
          >
            {title}
          </motion.h1>

          {/* Description */}
          <motion.p variants={staggerItem} className="mt-6 text-xl text-gray-300 leading-relaxed">
            {description}
          </motion.p>

          {/* CTAs */}
          <motion.div variants={staggerItem} className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button asLink href={primaryCTA.href} size="lg">
              {primaryCTA.text}
            </Button>
            <Button variant="secondary" asLink href={secondaryCTA.href} size="lg">
              {secondaryCTA.text}
            </Button>
          </motion.div>

          {/* Social Proof */}
          {showLogos && (
            <motion.div variants={staggerItem} className="mt-16 pt-8 border-t border-gray-700">
              <p className="text-sm text-gray-400 mb-6">Trusted by 50+ Ohio businesses</p>
              <div className="flex justify-center gap-8 flex-wrap">
                {logos.map((logo, i) => (
                  <div
                    key={i}
                    className="h-10 flex items-center px-4 text-gray-500 text-sm font-medium opacity-60"
                  >
                    {logo}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
