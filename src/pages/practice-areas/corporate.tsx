import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  BuildingOfficeIcon, 
  DocumentTextIcon, 
  CurrencyDollarIcon,
  UserGroupIcon,
  CheckCircleIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

const CorporateLawPage: React.FC = () => {
  const services = [
    {
      title: 'Business Formation',
      description: 'Establish your business with proper legal structure and compliance',
      icon: BuildingOfficeIcon,
      details: [
        'Corporation formation (C-Corp, S-Corp)',
        'Limited Liability Company (LLC) setup',
        'Partnership agreements',
        'Non-profit incorporation'
      ]
    },
    {
      title: 'Corporate Governance',
      description: 'Best practices for board management and corporate policies',
      icon: DocumentTextIcon,
      details: [
        'Board of directors counseling',
        'Corporate bylaws and charters',
        'Shareholder agreements',
        'Executive compensation structures'
      ]
    },
    {
      title: 'Capital Markets',
      description: 'Navigate public offerings and securities regulations',
      icon: CurrencyDollarIcon,
      details: [
        'IPO preparation and execution',
        'SEC compliance and reporting',
        'Private placements',
        'Regulatory filings'
      ]
    },
    {
      title: 'Private Equity & Venture Capital',
      description: 'Strategic guidance for investment transactions',
      icon: UserGroupIcon,
      details: [
        'Fund formation',
        'Investment agreements',
        'Due diligence coordination',
        'Exit strategies'
      ]
    }
  ];

  const expertise = [
    'Mergers & Acquisitions',
    'Securities Law Compliance',
    'Corporate Restructuring',
    'Commercial Contracts',
    'Regulatory Compliance',
    'Corporate Finance',
    'Board Advisory Services',
    'ESG Compliance'
  ];

  const caseStudies = [
    {
      title: 'Tech Startup IPO',
      description: 'Guided a technology startup through a successful $500M initial public offering, ensuring full SEC compliance and market readiness.',
      metrics: '$500M',
      metricLabel: 'IPO Value'
    },
    {
      title: 'Merger & Acquisition',
      description: 'Advised on a complex $2B cross-border merger, navigating regulatory approvals in multiple jurisdictions.',
      metrics: '$2B',
      metricLabel: 'Transaction Value'
    },
    {
      title: 'Corporate Restructuring',
      description: 'Designed and implemented a comprehensive restructuring plan for a Fortune 500 company, optimizing corporate structure for growth.',
      metrics: 'Fortune 500',
      metricLabel: 'Company Size'
    }
  ];

  return (
    <>
      <Head>
        <title>Corporate Law - Practice Areas | Hilbrick&Rockle</title>
        <meta name="description" content="Expert corporate law services including business formation, corporate governance, capital markets, and M&A transactions." />
      </Head>

      {/* Hero Section */}
      <section className="relative h-[60vh] bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white mt-16">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-2 mb-4 text-blue-200">
              <Link href="/practice-areas" className="hover:text-white transition-colors">
                Practice Areas
              </Link>
              <span>/</span>
              <span>Corporate Law</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Corporate Law</h1>
            <p className="text-xl md:text-2xl text-blue-100">
              Strategic corporate counsel for businesses of all sizes, from startups to Fortune 500 companies
            </p>
          </motion.div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                Comprehensive Corporate Legal Services
              </h2>
              <p className="text-lg text-gray-600 mb-4">
                Our corporate law practice provides strategic counsel to companies at every stage of growth. 
                From formation to exit, we help businesses navigate complex legal landscapes with confidence.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Our team combines deep regulatory knowledge with practical business acumen to deliver 
                solutions that protect your interests while enabling growth and innovation.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Schedule a Consultation
                <ArrowRightIcon className="w-5 h-5" />
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold mb-6 text-gray-900">Areas of Expertise</h3>
              <div className="grid grid-cols-2 gap-4">
                {expertise.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircleIcon className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Our Services</h2>
            <p className="text-xl text-gray-600">Comprehensive corporate legal solutions tailored to your needs</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2 text-gray-900">{service.title}</h3>
                      <p className="text-gray-600 mb-4">{service.description}</p>
                      <ul className="space-y-2">
                        {service.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-gray-600">
                            <span className="text-blue-600 mt-1">•</span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Success Stories</h2>
            <p className="text-xl text-gray-600">Recent achievements in corporate law</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <motion.div
                key={study.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-8 text-white"
              >
                <div className="text-4xl font-bold mb-2">{study.metrics}</div>
                <div className="text-blue-200 text-sm mb-4">{study.metricLabel}</div>
                <h3 className="text-xl font-bold mb-3">{study.title}</h3>
                <p className="text-blue-100">{study.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Let our experienced corporate law team help you navigate your legal challenges and opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors"
            >
              Contact Us
            </Link>
            <Link
              href="/booking"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-blue-800 text-white font-medium rounded-lg hover:bg-blue-900 transition-colors border-2 border-white/20"
            >
              Book a Consultation
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default CorporateLawPage;

