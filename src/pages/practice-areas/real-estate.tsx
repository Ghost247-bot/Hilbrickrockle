import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  BuildingOffice2Icon, 
  HomeIcon, 
  MapIcon,
  CurrencyDollarIcon,
  DocumentCheckIcon,
  CheckCircleIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

const RealEstatePage: React.FC = () => {
  const services = [
    {
      title: 'Property Acquisition & Sales',
      description: 'Comprehensive support for buying and selling real estate assets',
      icon: HomeIcon,
      details: [
        'Purchase and sale agreements',
        'Title examination and insurance',
        'Closing coordination',
        'Property inspections and due diligence'
      ]
    },
    {
      title: 'Commercial Leasing',
      description: 'Strategic lease negotiations and management',
      icon: BuildingOffice2Icon,
      details: [
        'Office and retail leases',
        'Industrial and warehouse leases',
        'Lease negotiations and amendments',
        'Sublease and assignment agreements'
      ]
    },
    {
      title: 'Real Estate Finance',
      description: 'Structured financing solutions for real estate projects',
      icon: CurrencyDollarIcon,
      details: [
        'Mortgage and loan documentation',
        'Construction financing',
        'Refinancing transactions',
        'Mezzanine and bridge financing'
      ]
    },
    {
      title: 'Land Use & Zoning',
      description: 'Navigate regulatory requirements and development approvals',
      icon: MapIcon,
      details: [
        'Zoning applications and appeals',
        'Land use planning',
        'Environmental compliance',
        'Development permits and approvals'
      ]
    },
    {
      title: 'Property Development',
      description: 'Legal support for all phases of development projects',
      icon: DocumentCheckIcon,
      details: [
        'Joint venture agreements',
        'Construction contracts',
        'Entitlements and permits',
        'Project structuring'
      ]
    }
  ];

  const expertise = [
    'Residential Transactions',
    'Commercial Real Estate',
    'Multi-Family Properties',
    'Mixed-Use Developments',
    'Hospitality & Hotels',
    'Industrial Properties',
    'Real Estate Investment Trusts (REITs)',
    'Property Management'
  ];

  const propertyTypes = [
    { type: 'Commercial', projects: '500+' },
    { type: 'Residential', projects: '2,000+' },
    { type: 'Mixed-Use', projects: '150+' },
    { type: 'Development', projects: '300+' }
  ];

  const caseStudies = [
    {
      title: 'Mixed-Use Development',
      description: 'Successfully structured a $500M mixed-use development project, securing all necessary approvals and financing.',
      metrics: '$500M',
      metricLabel: 'Project Value'
    },
    {
      title: 'Portfolio Acquisition',
      description: 'Facilitated the acquisition of a 50-property commercial real estate portfolio across multiple states.',
      metrics: '50',
      metricLabel: 'Properties'
    },
    {
      title: 'REIT Formation',
      description: 'Advised on the formation and initial public offering of a real estate investment trust, raising $750M in capital.',
      metrics: '$750M',
      metricLabel: 'Capital Raised'
    }
  ];

  return (
    <>
      <Head>
        <title>Real Estate Law - Practice Areas | Hilbrick&Rockle</title>
        <meta name="description" content="Comprehensive real estate legal services including property transactions, leasing, finance, development, and zoning." />
      </Head>

      {/* Hero Section */}
      <section className="relative h-[60vh] bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-900 text-white mt-16">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-2 mb-4 text-emerald-200">
              <Link href="/practice-areas" className="hover:text-white transition-colors">
                Practice Areas
              </Link>
              <span>/</span>
              <span>Real Estate</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Real Estate Law</h1>
            <p className="text-xl md:text-2xl text-emerald-100">
              Expert legal services for all aspects of real estate transactions and development
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
                Comprehensive Real Estate Solutions
              </h2>
              <p className="text-lg text-gray-600 mb-4">
                Our real estate practice serves clients across all property types—from residential 
                homes to large-scale commercial developments. We provide strategic legal counsel 
                throughout every phase of your real estate transaction.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                With deep expertise in local regulations and market dynamics, we help clients 
                navigate complex real estate challenges while protecting their interests and 
                maximizing value.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors"
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
              className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold mb-6 text-gray-900">Our Track Record</h3>
              <div className="grid grid-cols-2 gap-6">
                {propertyTypes.map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold text-emerald-600 mb-1">{item.projects}</div>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Our Services</h2>
            <p className="text-xl text-gray-600">Comprehensive real estate legal solutions</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                  <div className="flex flex-col">
                    <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-emerald-600" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-gray-900">{service.title}</h3>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <ul className="space-y-2 flex-1">
                      {service.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-gray-600">
                          <span className="text-emerald-600 mt-1">•</span>
                          <span className="text-sm">{detail}</span>
                        </li>
                      ))}
                    </ul>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Property Expertise</h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {expertise.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-2 bg-emerald-50 rounded-lg p-4"
              >
                <CheckCircleIcon className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <span className="text-gray-700 font-medium text-sm">{item}</span>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Recent Success Stories</h2>
            <p className="text-xl text-gray-600">Notable real estate transactions and projects</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <motion.div
                key={study.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-xl p-8 text-white"
              >
                <div className="text-4xl font-bold mb-2">{study.metrics}</div>
                <div className="text-emerald-200 text-sm mb-4">{study.metricLabel}</div>
                <h3 className="text-xl font-bold mb-3">{study.title}</h3>
                <p className="text-emerald-100">{study.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Real Estate Project?</h2>
          <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
            Let our experienced real estate attorneys guide you through your next transaction or development project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-white text-emerald-600 font-medium rounded-lg hover:bg-emerald-50 transition-colors"
            >
              Contact Us
            </Link>
            <Link
              href="/booking"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-emerald-800 text-white font-medium rounded-lg hover:bg-emerald-900 transition-colors border-2 border-white/20"
            >
              Book a Consultation
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default RealEstatePage;

