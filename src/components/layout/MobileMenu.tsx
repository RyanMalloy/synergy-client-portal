'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui';
import { NAVIGATION_LINKS } from '@/lib/utils';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40 bg-gray-900/50 backdrop-blur-sm lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            className="fixed right-0 top-0 bottom-0 z-40 w-full max-w-sm bg-white shadow-2xl lg:hidden"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
          >
            <div className="p-6 pt-20 space-y-6">
              {/* Navigation Links */}
              <nav className="space-y-4">
                {NAVIGATION_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={onClose}
                    className="block text-xl font-semibold text-gray-900 py-2 hover:text-synergy-blue transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>

              {/* CTA */}
              <div className="space-y-4 pt-4 border-t border-gray-200">
                <Link href="/login" onClick={onClose} className="block">
                  <span className="text-center py-3 text-gray-600 font-semibold hover:text-gray-900 transition-colors">
                    Sign In
                  </span>
                </Link>
                <Button variant="primary" size="md" asLink href="/signup" className="w-full">
                  Get Started
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
