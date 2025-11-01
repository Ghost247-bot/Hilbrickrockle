import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  UserGroupIcon, 
  ScaleIcon, 
  ShieldCheckIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

const EmploymentLawPage: React.FC = () => {
  const services = [
    {
      title: 'Employment Contracts',
      description: 'Draft and negotiate comprehensive employment agreements',
      icon: DocumentTextIcon,
      details: [
        'Executive employment agreements',
        'Non-compete and non-disclosure agreements',
        'Separation and severance agreements',
        'Independent contractor agreements'
      ]
    },
    {
      title: 'Workplace Compliance',
      description: 'Ensure compliance with federal and state employment laws',
      icon: ShieldCheckIcon,
      details: [
        'Wage and hour compliance (FLSA)',
        'Family and Medical Leave Act (FMLA)',
        'ADA and disability accommodations',
        'Workplace safety (OSHA)'
      ]
    },
    {
      title: 'Employment Litigation',
      description: 'Defend employers in employment-related disputes and litigation',
      icon: ScaleIcon,
      details: [
        'Wrongful termination claims',
        'Discrimination and harassment defense',
        'Wage and hour litigation',
        'Class action defense'
      ]
    },
    {
      title: 'Labor Relations',
      description: 'Navigate union relations and collective bargaining',
      icon: UserGroupIcon,
      details: [
        'Collective bargaining agreements',
        'Union organizing response',
        'Grievance procedures',
        'Unfair labor practice charges'
      ]
    }
  ];

  const expertise = [
    'Discrimination & Harassment',
    'Wrongful Termination',
    'Wage & Hour Disputes',
    'Workers\' Compensation',
    'Employee Benefits (ERISA)',
    'Executive Compensation',
    'Workplace Investigations',
    'Employment Policies'
  ];

  const stats = [
    { label: 'Cases Resolved', value: '2,500+' },
    { label: 'Companies Served', value: '500+' },
    { label: 'Compliance Reviews', value: '1,000+' },
    { label: 'Success Rate', value: '95%' }
  ];

  const caseStudies = [
    {
      title: 'Class Action Defense',
      description: 'Successfully defended a Fortune 500 company in a multi-state wage and hour class action, achieving favorable settlement terms.',
      metrics: '$50M+',
      metricLabel: 'Claims Defended'
    },
    {
      title: 'Discrimination Litigation',
      description: 'Obtained summary judgment in complex employment discrimination case, saving client significant costs and reputational damage.',
      metrics: '100%',
      metricLabel: 'Success Rate'
    },
    {
      title: 'Workplace Policy Audit',
      description: 'Conducted comprehensive policy review for large employer, identifying and correcting compliance issues before they became problems.',
      metrics: '50+',
      metricLabel: 'Policies Reviewed'
    }
  ];

  return (
    <>
      <Head>
        <title>Employment Law - Practice Areas | Hilbrick&Rockle</title>
        <meta name="description" content="Comprehensive employment law services including compliance, litigation defense, employment contracts, and labor relations." />
      </Head>

      {/* Hero Section */}
      <section className="relative h-[60vh] bg-gradient-to-br from-amber-900 via-amber-800 to-amber-900 text-white">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-2 mb-4 text-amber-200">
              <Link href="/practice-areas" className="hover:text-white transition-colors">
                Practice Areas
              </Link>
              <span>/</span>
              <span>Employment Law</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Employment Law</h1>
            <p className="text-xl md:text-2xl text-amber-100">
              Expert employment law counsel to protect your business and workforce
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
                Protect Your Business & Workforce
              </h2>
              <p className="text-lg text-gray-600 mb-4">
                Our employment law practice provides strategic counsel to employers navigating 
                the complex landscape of federal and state employment laws. We help businesses 
                maintain compliant, productive workplaces while minimizing legal risk.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                From proactive compliance reviews to aggressive litigation defense, our team 
                combines deep legal expertise with practical business solutions to protect 
                your interests.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-amber-600 text-white font-medium rounded-lg hover:bg-amber-700 transition-colors"
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
              className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold mb-6 text-gray-900">Our Track Record</h3>
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold text-amber-600 mb-1">{stat.value}</div>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Our Employment Services</h2>
            <p className="text-xl text-gray-600">Comprehensive solutions for employment-related legal needs</p>
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
                    <div className="flex-shrink-0 w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6 text-amber-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2 text-gray-900">{service.title}</h3>
                      <p className="text-gray-600 mb-4">{service.description}</p>
                      <ul className="space-y-2">
                        {service.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-gray-600">
                            <span className="text-amber-600 mt-1">•</span>
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
                className="flex items-center gap-2 bg-amber-50 rounded-lg p-4"
              >
                <CheckCircleIcon className="w-5 h-5 text-amber-600 flex-shrink-0" />
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Success Stories</h2>
            <p className="text-xl text-gray-600">Recent employment law achievements</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <motion.div
                key={study.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-amber-600 to-amber-700 rounded-xl p-8 text-white"
              >
                <div className="text-4xl font-bold mb-2">{study.metrics}</div>
                <div className="text-amber-200 text-sm mb-4">{study.metricLabel}</div>
                <h3 className="text-xl font-bold mb-3">{study.title}</h3>
                <p className="text-amber-100">{study.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-amber-600 to-amber-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Need Employment Law Assistance?</h2>
          <p className="text-xl text-amber-100 mb-8 max-w-2xl mx-auto">
            Our experienced employment attorneys can help protect your business and ensure workplace compliance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-white text-amber-600 font-medium rounded-lg hover:bg-amber-50 transition-colors"
            >
              Contact Us
            </Link>
            <Link
              href="/booking"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-amber-800 text-white font-medium rounded-lg hover:bg-amber-900 transition-colors border-2 border-white/20"
            >
              Book a Consultation
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default EmploymentLawPage;

