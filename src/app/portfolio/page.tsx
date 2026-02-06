'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Hero, CTA } from '@/components/sections';
import { Card, Badge, Button } from '@/components/ui';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { PORTFOLIO_PROJECTS, INDUSTRIES } from '@/lib/utils';
import { staggerContainer, staggerItem } from '@/lib/animations';

export default function Portfolio() {
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);

  const filteredProjects = selectedIndustry
    ? PORTFOLIO_PROJECTS.filter((p) => p.industry === selectedIndustry)
    : PORTFOLIO_PROJECTS;

  const uniqueIndustries = Array.from(
    new Set(PORTFOLIO_PROJECTS.map((p) => p.industry))
  );

  return (
    <>
      <Hero
        title="Our Work"
        subtitle="Portfolio"
        description="See how we've helped businesses transform their web presence and achieve their goals."
        primaryCTA={{ text: 'Start Your Project', href: '/contact' }}
        secondaryCTA={{ text: 'View Case Study', href: '#case-study' }}
        showLogos={false}
      />

      {/* Filter Section */}
      <section className="sticky top-20 z-30 bg-white border-b border-gray-200 py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3">
            <Button
              variant={selectedIndustry === null ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setSelectedIndustry(null)}
            >
              All Projects
            </Button>
            {uniqueIndustries.map((industry) => (
              <Button
                key={industry}
                variant={selectedIndustry === industry ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setSelectedIndustry(industry)}
              >
                {industry}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {filteredProjects.map((project) => (
              <motion.div key={project.id} variants={staggerItem}>
                <Card
                  hover
                  className="overflow-hidden h-full flex flex-col group"
                >
                  {/* Image Container */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <span className="text-white font-semibold flex items-center gap-2">
                        View Case Study <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <Badge className="w-fit mb-3">{project.industry}</Badge>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed flex-1">
                      {project.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                No projects found for this industry. Try another filter!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Featured Case Study */}
      <section id="case-study" className="py-20 lg:py-32 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-synergy-blue">
              Featured Case Study
            </span>
            <h2 className="mt-4 text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              {PORTFOLIO_PROJECTS[0].title}
            </h2>
          </div>

          <Card className="overflow-hidden">
            {/* Before/After Images */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8">
              {PORTFOLIO_PROJECTS[0].beforeAfter && (
                <>
                  <div>
                    <p className="text-sm font-semibold text-gray-600 mb-3">
                      Before
                    </p>
                    <div className="relative aspect-video rounded-lg overflow-hidden">
                      <Image
                        src={PORTFOLIO_PROJECTS[0].beforeAfter.before}
                        alt="Before redesign"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-600 mb-3">
                      After
                    </p>
                    <div className="relative aspect-video rounded-lg overflow-hidden">
                      <Image
                        src={PORTFOLIO_PROJECTS[0].beforeAfter.after}
                        alt="After redesign"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Case Study Details */}
            <div className="px-8 pb-8 grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  The Challenge
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {PORTFOLIO_PROJECTS[0].challenge}
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  The Solution
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {PORTFOLIO_PROJECTS[0].solution}
                </p>
              </div>
            </div>

            {/* Results */}
            {PORTFOLIO_PROJECTS[0].results && (
              <div className="px-8 pb-8 border-t border-gray-200 pt-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                  Results
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {PORTFOLIO_PROJECTS[0].results.map((result, i) => (
                    <div key={i} className="text-center p-4 bg-soft-blue rounded-lg">
                      <p className="text-2xl font-bold text-synergy-blue">
                        {result.split(' ')[0]}
                      </p>
                      <p className="text-sm text-gray-600 mt-2">
                        {result.split(' ').slice(1).join(' ')}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-synergy-blue">
              Industries We Serve
            </span>
            <h2 className="mt-4 text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Expertise Across Sectors
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {INDUSTRIES.map((industry) => (
              <Card key={industry.name} hover className="p-6 text-center">
                <div className="text-3xl mb-3">{industry.icon}</div>
                <p className="font-semibold text-gray-900">{industry.name}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
