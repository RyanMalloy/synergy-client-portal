import { Metadata } from 'next';
import { Hero, Features, Process, Testimonials, CTA } from '@/components/sections';

export const metadata: Metadata = {
  title: 'Modern Web Design | Synergy Development',
  description:
    'Transform your business with a modern website. Synergy Development builds fast, beautiful websites for Ohio businesses.',
};

export default function Home() {
  return (
    <>
      <Hero
        title="Transform Your Business with a Modern Web Presence"
        subtitle="Web Modernization Experts"
        description="We build beautiful, fast websites that convert visitors into customers. Stop losing business to outdated web design."
        primaryCTA={{ text: 'Get Started', href: '/contact' }}
        secondaryCTA={{ text: 'View Our Work', href: '/portfolio' }}
        showLogos={true}
      />

      <Features />

      <Process />

      <Testimonials />

      <CTA
        title="Ready to Transform Your Business?"
        description="Start working with Synergy Development today and see the difference a modern website makes."
        primaryText="Schedule a Free Consultation"
        primaryHref="/contact"
        secondaryText="View Our Portfolio"
        secondaryHref="/portfolio"
      />
    </>
  );
}
