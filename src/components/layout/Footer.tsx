'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Linkedin, Twitter } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="text-xl font-bold">Synergy</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Modern web development for Ohio businesses ready to grow.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Follow us on LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Follow us on Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </motion.div>

          {/* Company Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white text-sm transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Services Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="font-semibold text-white mb-4">Services</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Website Design
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Development
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                  SEO & Marketing
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="font-semibold text-white mb-4">Contact</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li>Dublin, Ohio</li>
              <li>
                <a href="mailto:hello@synergy.dev" className="hover:text-white transition-colors">
                  hello@synergy.dev
                </a>
              </li>
              <li>
                <a href="tel:+16145551234" className="hover:text-white transition-colors">
                  (614) 555-1234
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-gray-500 text-sm">
            © {currentYear} Synergy Development LLC. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">
              Terms of Service
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
