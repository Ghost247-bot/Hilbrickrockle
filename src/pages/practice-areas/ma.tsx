import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  ArrowsRightLeftIcon, 
  DocumentMagnifyingGlassIcon, 
  UserGroupIcon,
  ChartBarIcon,
  CheckCircleIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

const MAPage: React.FC = () => {
  const services = [
    {
      title: 'Due Diligence',
      description: 'Comprehensive investigation and analysis of target companies',
      icon: DocumentMagnifyingGlassIcon,
      details: [
        'Financial and legal audits',
        'Regulatory compliance review',
        'Intellectual property assessment',
        'Risk analysis and mitigation'
      ]
    },
    {
      title: 'Transaction Structuring',
      description: 'Design optimal deal structures for maximum value',
      icon: ChartBarIcon,
      details: [
        'Asset vs. stock purchase',
        'Merger structures',
        'Joint venture formation',
        'Tax-efficient structures'
      ]
    },
    {
      title: 'Negotiation & Closing',
      description: 'Strategic negotiation to protect your interests',
      icon: UserGroupIcon,
      details: [
        'Purchase agreements',
        'Representations and warranties',
        'Closing coordination',
        'Post-closing integration'
      ]
    },
    {
      title: 'Cross-Border Transactions',
      description: 'International M&A expertise across jurisdictions',
      icon: ArrowsRightLeftIcon,
      details: [
        'Multi-jurisdictional compliance',
        'Regulatory approvals',
        'Cultural and legal considerations',
        'Foreign investment regulations'
      ]
    }
  ];

  const expertise = [
    'Strategic Acquisitions',
    'Divestitures & Spin-offs',
    'Hostile Takeovers',
    'Friendly Mergers',
    'Leveraged Buyouts',
    'Private Equity Transactions',
    'Joint Ventures',
    'Post-Merger Integration'
  ];

  const transactionTypes = [
    { type: 'Private M&A', value: '$50M+' },
    { type: 'Public M&A', value: '$500M+' },
    { type: 'Cross-Border', value: 'Global' },
    { type: 'Sectors Covered', value: '25+' }
  ];

  const caseStudies = [
    {
      title: 'Tech Sector Acquisition',
      description: 'Led a $3.5B acquisition of a technology company, navigating complex regulatory approvals and integration planning.',
      metrics: '$3.5B',
      metricLabel: 'Transaction Value'
    },
    {
      title: 'Cross-Border Merger',
      description: 'Facilitated a cross-border merger between US and European entities, coordinating multiple regulatory bodies.',
      metrics: '5',
      metricLabel: 'Jurisdictions'
    },
    {
      title: 'Private Equity Exit',
      description: 'Structured a successful exit strategy for a private equity portfolio company, maximizing returns for stakeholders.',
      metrics: '2.5x',
      metricLabel: 'Return Multiple'
    }
  ];

  return (
    <>
      <Head>
        <title>Mergers & Acquisitions - Practice Areas | Hilbrick&Rockle</title>
        <meta name="description" content="Expert M&A legal services for mergers, acquisitions, divestitures, and strategic transactions across all industries." />
      </Head>

      {/* Hero Section */}
      <section className="relative h-[60vh] bg-gradient-to-br from-indigo-900 via-indigo-800 to-indigo-900 text-white">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-2 mb-4 text-indigo-200">
              <Link href="/practice-areas" className="hover:text-white transition-colors">
                Practice Areas
              </Link>
              <span>/</span>
              <span>Mergers & Acquisitions</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Mergers & Acquisitions</h1>
            <p className="text-xl md:text-2xl text-indigo-100">
              Strategic M&A counsel for complex transactions from negotiation to successful integration
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
                Navigate Complex M&A Transactions
              </h2>
              <p className="text-lg text-gray-600 mb-4">
                Our M&A practice brings decades of experience to every transaction, from initial strategy 
                through due diligence, negotiation, and successful closing. We've advised on deals ranging 
                from startup acquisitions to multi-billion dollar mergers.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Whether you're buying, selling, or merging, our team ensures your transaction is structured 
                optimally, risks are mitigated, and value is maximized.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
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
              className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold mb-6 text-gray-900">Transaction Experience</h3>
              <div className="grid grid-cols-2 gap-6">
                {transactionTypes.map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold text-indigo-600 mb-1">{item.value}</div>
                    <div className="text-sm text-gray-600">{item.type}</div>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Our M&A Services</h2>
            <p className="text-xl text-gray-600">End-to-end support for successful transactions</p>
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
                    <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2 text-gray-900">{service.title}</h3>
                      <p className="text-gray-600 mb-4">{service.description}</p>
                      <ul className="space-y-2">
                        {service.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-gray-600">
                            <span className="text-indigo-600 mt-1">•</span>
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

      {/* Expertise Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Areas of Expertise</h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {expertise.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-2 bg-indigo-50 rounded-lg p-4"
              >
                <CheckCircleIcon className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                <span className="text-gray-700 font-medium">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Recent Transactions</h2>
            <p className="text-xl text-gray-600">Successfully completed M&A deals</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <motion.div
                key={study.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-xl p-8 text-white"
              >
                <div className="text-4xl font-bold mb-2">{study.metrics}</div>
                <div className="text-indigo-200 text-sm mb-4">{study.metricLabel}</div>
                <h3 className="text-xl font-bold mb-3">{study.title}</h3>
                <p className="text-indigo-100">{study.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Execute Your Transaction?</h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Partner with our M&A experts to navigate your next deal with confidence and strategic advantage.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-white text-indigo-600 font-medium rounded-lg hover:bg-indigo-50 transition-colors"
            >
              Contact Us
            </Link>
            <Link
              href="/booking"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-indigo-800 text-white font-medium rounded-lg hover:bg-indigo-900 transition-colors border-2 border-white/20"
            >
              Book a Consultation
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default MAPage;

