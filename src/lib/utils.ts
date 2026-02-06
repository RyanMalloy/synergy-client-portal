import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const NAVIGATION_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Portfolio', href: '/portfolio' },
] as const;

export const FOOTER_LINKS = {
  company: [
    { name: 'About', href: '/about' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Contact', href: '/contact' },
  ],
  services: [
    { name: 'Website Design', href: '#' },
    { name: 'Development', href: '#' },
    { name: 'SEO & Marketing', href: '#' },
  ],
} as const;

export const FEATURES = [
  {
    title: 'Modern Design',
    description: 'Professional, contemporary aesthetics that impress',
    icon: 'Palette',
  },
  {
    title: 'Fast & Secure',
    description: 'Optimized performance and enterprise-grade SSL security',
    icon: 'Zap',
  },
  {
    title: 'SEO Optimized',
    description: 'Built for search engine visibility from the ground up',
    icon: 'Search',
  },
  {
    title: 'Mobile First',
    description: 'Responsive across all devices and screen sizes',
    icon: 'Smartphone',
  },
  {
    title: 'Easy to Manage',
    description: 'Simple content management systems you control',
    icon: 'Settings',
  },
  {
    title: 'Ongoing Support',
    description: 'Continuous partnership for your success',
    icon: 'Heart',
  },
];

export const PROCESS_STEPS = [
  {
    number: 1,
    title: 'Discovery',
    description: 'We learn your goals, audience, and business vision',
  },
  {
    number: 2,
    title: 'Design',
    description: 'Crafting a beautiful, user-focused design system',
  },
  {
    number: 3,
    title: 'Development',
    description: 'Building your site with modern, optimized code',
  },
  {
    number: 4,
    title: 'Launch',
    description: 'Deploy and optimize your new web presence',
  },
];

export const TESTIMONIALS = [
  {
    quote:
      'Synergy completely transformed our online presence. Within 3 months, we saw a 150% increase in customer inquiries.',
    author: 'Sarah Mitchell',
    title: 'Owner, Mitchell & Co. Law Firm',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
  },
  {
    quote:
      'Working with Synergy was the best investment we made for our business. Their team understood our needs perfectly.',
    author: 'James Henderson',
    title: 'Managing Director, Henderson Healthcare Group',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
  },
  {
    quote:
      'The new website is fast, beautiful, and our customers love it. Synergy exceeded our expectations on every level.',
    author: 'Emma Rodriguez',
    title: 'CEO, Rodriguez Home Services',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
  },
];

export const PORTFOLIO_PROJECTS = [
  {
    id: 1,
    title: 'Smith Plumbing Co.',
    industry: 'Home Services',
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500&h=300&fit=crop',
    beforeAfter: {
      before: 'https://images.unsplash.com/photo-1519403981563-430f63602d4a?w=400&h=300&fit=crop',
      after: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop',
    },
    description: 'Modern website that increased leads by 200% in 6 months',
    challenge: 'Outdated website losing customers to competitors',
    solution: 'Complete redesign with modern aesthetic and SEO optimization',
    results: ['200% lead increase', '50% lower bounce rate', '3x more conversions'],
  },
  {
    id: 2,
    title: 'Norton Legal Advisors',
    industry: 'Professional Services',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop',
    description: 'Premium legal services website with case studies',
  },
  {
    id: 3,
    title: 'Green Leaf Landscaping',
    industry: 'Home Services',
    image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=500&h=300&fit=crop',
    description: 'Portfolio showcase with before/after gallery',
  },
  {
    id: 4,
    title: 'Wellness Clinic',
    industry: 'Healthcare',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500&h=300&fit=crop',
    description: 'Healthcare provider website with appointment booking',
  },
  {
    id: 5,
    title: 'Aurora Retail Group',
    industry: 'Retail',
    image: 'https://images.unsplash.com/photo-1555636222-cae831c752c5?w=500&h=300&fit=crop',
    description: 'E-commerce integration and product showcase',
  },
  {
    id: 6,
    title: 'Downtown Bistro',
    industry: 'Hospitality',
    image: 'https://images.unsplash.com/photo-1567521464027-f127ff144326?w=500&h=300&fit=crop',
    description: 'Restaurant website with menu and online reservations',
  },
];

export const INDUSTRIES = [
  { name: 'Healthcare', icon: 'Stethoscope' },
  { name: 'Professional Services', icon: 'Briefcase' },
  { name: 'Retail & E-commerce', icon: 'ShoppingCart' },
  { name: 'Home Services', icon: 'Home' },
  { name: 'Hospitality', icon: 'Coffee' },
  { name: 'Manufacturing', icon: 'Factory' },
];
