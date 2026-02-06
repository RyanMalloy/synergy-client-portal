import { Metadata } from 'next';
import { Hero, CTA } from '@/components/sections';
import { Card } from '@/components/ui';
import { CheckCircle, Award, Users, Zap } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us | Synergy Development',
  description:
    'Learn about Synergy Development and our mission to transform Ohio businesses with modern web design.',
};

export default function About() {
  const values = [
    {
      icon: Award,
      title: 'Excellence',
      description: 'Quality-first approach in every project, every time',
    },
    {
      icon: Users,
      title: 'Partnership',
      description: 'True collaboration and transparent communication',
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'Modern solutions built with cutting-edge technology',
    },
  ];

  const expertise = [
    { name: 'Next.js / React', icon: '⚛️' },
    { name: 'Tailwind CSS', icon: '🎨' },
    { name: 'Vercel Deployment', icon: '🚀' },
    { name: 'SEO Optimization', icon: '🔍' },
    { name: 'Responsive Design', icon: '📱' },
    { name: 'Performance Tuning', icon: '⚡' },
  ];

  return (
    <>
      <Hero
        title="We Build Websites That Drive Business Growth"
        subtitle="About Synergy Development"
        description="Our mission is to help Ohio businesses transform their web presence with modern, professional websites."
        primaryCTA={{ text: 'Start Your Project', href: '/contact' }}
        secondaryCTA={{ text: 'View Our Work', href: '/portfolio' }}
        showLogos={false}
      />

      {/* Our Story Section */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-synergy-blue">
                Our Story
              </span>
              <h2 className="mt-4 text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Building the Future of Web Design in Ohio
              </h2>
              <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                Founded in 2020, Synergy Development started with a simple mission: help Ohio
                businesses succeed online with modern, professional websites. We've grown from a
                small team to a trusted partner for 50+ businesses across the state.
              </p>
              <p className="mt-4 text-lg text-gray-600 leading-relaxed">
                We believe that every business deserves a website that reflects their quality and
                values. That's why we partner closely with our clients to understand their unique
                needs and deliver solutions that drive real results.
              </p>
            </div>

            <div className="relative aspect-square rounded-2xl bg-gradient-to-br from-soft-blue to-synergy-blue/10 p-8 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl font-bold text-synergy-blue">50+</div>
                <p className="mt-4 text-xl text-gray-700 font-semibold">Successful Projects</p>
                <p className="text-gray-600">Across Ohio and Beyond</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 lg:py-32 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-synergy-blue">
              Our Core Values
            </span>
            <h2 className="mt-4 text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              What Drives Us
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, i) => {
              const Icon = value.icon;
              return (
                <Card key={i} hover className="p-8">
                  <div className="flex items-center justify-center w-12 h-12 bg-soft-blue rounded-xl mb-6">
                    <Icon className="w-6 h-6 text-synergy-blue" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">{value.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-synergy-blue">
              Our Expertise
            </span>
            <h2 className="mt-4 text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Built on Modern Technology
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {expertise.map((item, i) => (
              <Card key={i} className="p-6 text-center hover:bg-soft-blue transition-colors">
                <div className="text-4xl mb-3">{item.icon}</div>
                <p className="font-semibold text-gray-900">{item.name}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-20 lg:py-32 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-synergy-blue">
              Why Synergy
            </span>
            <h2 className="mt-4 text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Why Ohio Businesses Choose Synergy
            </h2>
          </div>

          <div className="space-y-12 max-w-3xl mx-auto">
            {[
              {
                title: 'Local Understanding',
                description:
                  'We understand the Ohio market, local competition, and what resonates with your customers.',
              },
              {
                title: 'Results-Driven',
                description:
                  'We don\'t just build beautiful websites. We build websites that generate leads and drive sales.',
              },
              {
                title: 'Ongoing Partnership',
                description:
                  'Our relationship doesn\'t end at launch. We provide ongoing support and optimization.',
              },
            ].map((item, i) => (
              <div key={i} className="flex gap-6 items-start">
                <CheckCircle className="w-6 h-6 text-success flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-16 bg-white border-y border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-synergy-blue">50+</div>
              <p className="text-gray-600 mt-2">Projects Completed</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-success">5★</div>
              <p className="text-gray-600 mt-2">Average Rating</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent-purple">100%</div>
              <p className="text-gray-600 mt-2">Client Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
