import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  CalculatorIcon, 
  DocumentTextIcon, 
  ShieldCheckIcon,
  ChartBarIcon,
  CheckCircleIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

const TaxLawPage: React.FC = () => {
  const services = [
    {
      title: 'Tax Planning & Strategy',
      description: 'Proactive tax planning to minimize liabilities and maximize savings',
      icon: ChartBarIcon,
      details: [
        'Entity structure optimization',
        'Tax-efficient business strategies',
        'Estate and gift tax planning',
        'International tax planning'
      ]
    },
    {
      title: 'Tax Compliance',
      description: 'Ensure full compliance with federal, state, and local tax requirements',
      icon: DocumentTextIcon,
      details: [
        'Tax return preparation and review',
        'Quarterly and annual filings',
        'State tax compliance',
        'Multi-state tax issues'
      ]
    },
    {
      title: 'Tax Controversy & Disputes',
      description: 'Expert representation in tax audits, appeals, and litigation',
      icon: ShieldCheckIcon,
      details: [
        'IRS audits and examinations',
        'Tax court litigation',
        'Appeals and settlements',
        'Criminal tax defense'
      ]
    },
    {
      title: 'Tax Credits & Incentives',
      description: 'Maximize available tax credits and incentive programs',
      icon: CalculatorIcon,
      details: [
        'Research & Development credits',
        'Energy tax credits',
        'Work opportunity tax credits',
        'State and local incentives'
      ]
    }
  ];

  const expertise = [
    'Corporate Tax',
    'Partnership Taxation',
    'Individual Tax Planning',
    'Estate & Gift Tax',
    'International Tax',
    'State & Local Tax',
    'Tax-Exempt Organizations',
    'Tax Accounting Methods'
  ];

  const taxStats = [
    { label: 'Tax Savings Generated', value: '$500M+' },
    { label: 'Audits Resolved', value: '1,000+' },
    { label: 'Tax Returns Filed', value: '5,000+' },
    { label: 'Client Satisfaction', value: '98%' }
  ];

  const caseStudies = [
    {
      title: 'IRS Audit Resolution',
      description: 'Successfully resolved a complex IRS audit, reducing client tax liability by $8M through strategic negotiation and documentation.',
      metrics: '$8M',
      metricLabel: 'Tax Savings'
    },
    {
      title: 'International Tax Restructuring',
      description: 'Restructured a multinational corporation\'s tax strategy, reducing effective tax rate while ensuring full compliance.',
      metrics: '25%',
      metricLabel: 'Rate Reduction'
    },
    {
      title: 'Estate Tax Planning',
      description: 'Developed comprehensive estate plan preserving $50M in family wealth through strategic gifting and trust structures.',
      metrics: '$50M',
      metricLabel: 'Estate Preserved'
    }
  ];

  return (
    <>
      <Head>
        <title>Tax Law - Practice Areas | Hilbrick&Rockle</title>
        <meta name="description" content="Expert tax law services including tax planning, compliance, controversy resolution, and tax credit optimization." />
      </Head>

      {/* Hero Section */}
      <section className="relative h-[60vh] bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 text-white mt-16">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-2 mb-4 text-purple-200">
              <Link href="/practice-areas" className="hover:text-white transition-colors">
                Practice Areas
              </Link>
              <span>/</span>
              <span>Tax Law</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Tax Law</h1>
            <p className="text-xl md:text-2xl text-purple-100">
              Strategic tax planning and compliance services to minimize liabilities and maximize savings
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
                Expert Tax Counsel for Complex Challenges
              </h2>
              <p className="text-lg text-gray-600 mb-4">
                Our tax practice combines deep technical expertise with practical business insight 
                to help clients navigate the complexities of tax law. We provide strategic planning, 
                ensure compliance, and defend clients in tax controversies.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                From proactive tax planning to resolving disputes with tax authorities, our team 
                works to minimize tax liabilities while ensuring full compliance with all applicable laws.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors"
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
              className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold mb-6 text-gray-900">Our Results</h3>
              <div className="grid grid-cols-2 gap-6">
                {taxStats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Our Tax Services</h2>
            <p className="text-xl text-gray-600">Comprehensive tax solutions for individuals and businesses</p>
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
                    <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2 text-gray-900">{service.title}</h3>
                      <p className="text-gray-600 mb-4">{service.description}</p>
                      <ul className="space-y-2">
                        {service.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-gray-600">
                            <span className="text-purple-600 mt-1">•</span>
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
                className="flex items-center gap-2 bg-purple-50 rounded-lg p-4"
              >
                <CheckCircleIcon className="w-5 h-5 text-purple-600 flex-shrink-0" />
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Success Stories</h2>
            <p className="text-xl text-gray-600">Recent tax achievements for our clients</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <motion.div
                key={study.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl p-8 text-white"
              >
                <div className="text-4xl font-bold mb-2">{study.metrics}</div>
                <div className="text-purple-200 text-sm mb-4">{study.metricLabel}</div>
                <h3 className="text-xl font-bold mb-3">{study.title}</h3>
                <p className="text-purple-100">{study.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Need Tax Assistance?</h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Our experienced tax attorneys can help you navigate complex tax challenges and optimize your tax strategy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-white text-purple-600 font-medium rounded-lg hover:bg-purple-50 transition-colors"
            >
              Contact Us
            </Link>
            <Link
              href="/booking"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-purple-800 text-white font-medium rounded-lg hover:bg-purple-900 transition-colors border-2 border-white/20"
            >
              Book a Consultation
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default TaxLawPage;

