'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui';
import { cn } from '@/lib/utils';
import { NAVIGATION_LINKS } from '@/lib/utils';
import MobileMenu from './MobileMenu';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-white/80 backdrop-blur-lg border-b border-gray-200/50'
            : 'bg-transparent'
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <span className={cn(
                'text-xl font-bold transition-colors duration-300',
                scrolled ? 'text-deep-navy' : 'text-white'
              )}>
                Synergy
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {NAVIGATION_LINKS.map((link) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'text-sm font-medium transition-colors duration-200',
                    scrolled
                      ? 'text-gray-600 hover:text-gray-900'
                      : 'text-white/70 hover:text-white'
                  )}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.name}
                </motion.a>
              ))}
            </nav>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-4">
              <Link href="/login">
                <motion.span
                  className={cn(
                    'text-sm font-medium transition-colors duration-200 cursor-pointer',
                    scrolled
                      ? 'text-gray-600 hover:text-gray-900'
                      : 'text-white/70 hover:text-white'
                  )}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Sign In
                </motion.span>
              </Link>
              <Button size="sm" asLink href="/signup">
                Get Started
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={cn(
                'lg:hidden p-2 transition-colors',
                scrolled ? 'text-gray-600 hover:text-gray-900' : 'text-white hover:text-gray-200'
              )}
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
}
