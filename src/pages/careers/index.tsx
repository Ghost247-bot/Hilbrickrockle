import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const CareersPage: React.FC = () => {
  const jobOpportunities = [
    {
      title: 'Associate Attorney',
      location: 'Lincoln, Nebraska',
      department: 'Corporate',
      type: 'Full-time',
      link: '/careers/associate-attorney-ny',
    },
    {
      title: 'Senior Counsel',
      location: 'London, UK',
      department: 'Litigation',
      type: 'Full-time',
      link: '/careers/senior-counsel-london',
    },
    {
      title: 'Legal Operations Manager',
      location: 'Los Angeles, CA',
      department: 'Operations',
      type: 'Full-time',
      link: '/careers/legal-ops-manager-la',
    },
    {
      title: 'Summer Associate Program',
      location: 'Multiple Locations',
      department: 'Recruiting',
      type: 'Internship',
      link: '/careers/summer-associate',
    },
  ];

  const cultureValues = [
    {
      title: 'Excellence',
      description: 'We strive for the highest standards in everything we do.',
      icon: '⭐',
    },
    {
      title: 'Collaboration',
      description: 'Working together to achieve exceptional results for our clients.',
      icon: '🤝',
    },
    {
      title: 'Innovation',
      description: 'Embracing new ideas and technologies to deliver better solutions.',
      icon: '💡',
    },
    {
      title: 'Diversity & Inclusion',
      description: 'Fostering an inclusive environment where everyone can thrive.',
      icon: '🌈',
    },
  ];

  return (
    <>
      <Head>
        <title>Careers - HilbrickRockle</title>
        <meta name="description" content="Join our team of exceptional legal professionals and build your career at HilbrickRockle." />
      </Head>

      {/* Hero Section */}
      <section className="relative h-[40vh] sm:h-[50vh] md:h-[60vh] bg-gray-900 text-white">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover opacity-50"
            src="/images/careers/hero.jpg"
            alt="Careers at HilbrickRockle"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">Careers</h1>
            <p className="text-lg sm:text-xl md:text-2xl">
              Join our team of exceptional legal professionals
            </p>
          </motion.div>
        </div>
      </section>

      {/* Job Opportunities */}
      <section className="py-8 sm:py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 lg:mb-12">Current Opportunities</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {jobOpportunities.map((job, index) => (
              <motion.div
                key={job.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-white rounded-lg shadow-md p-4 sm:p-6 border border-gray-200"
              >
                <h3 className="text-lg sm:text-xl font-bold mb-2">{job.title}</h3>
                <div className="flex flex-col sm:flex-row sm:items-center text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 gap-1 sm:gap-0">
                  <span className="sm:mr-4">{job.location}</span>
                  <span className="sm:mr-4">{job.department}</span>
                  <span>{job.type}</span>
                </div>
                <Link
                  href={job.link}
                  className="inline-block bg-primary-600 text-white px-4 sm:px-6 py-2 text-sm sm:text-base rounded-md hover:bg-primary-700 transition-colors"
                >
                  Apply Now
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Firm Culture */}
      <section className="py-8 sm:py-12 lg:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 lg:mb-12 text-center">Our Culture</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {cultureValues.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="text-center"
              >
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{value.icon}</div>
                <h3 className="text-lg sm:text-xl font-bold mb-2">{value.title}</h3>
                <p className="text-sm sm:text-base text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-8 sm:py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 lg:mb-12 text-center">Application Process</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">📝</div>
              <h3 className="text-lg sm:text-xl font-bold mb-2">Submit Application</h3>
              <p className="text-sm sm:text-base text-gray-600">
                Complete your online application with required documents
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center"
            >
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">👥</div>
              <h3 className="text-lg sm:text-xl font-bold mb-2">Interview Process</h3>
              <p className="text-sm sm:text-base text-gray-600">
                Meet with our team through multiple interview rounds
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-center"
            >
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🎉</div>
              <h3 className="text-lg sm:text-xl font-bold mb-2">Join Our Team</h3>
              <p className="text-sm sm:text-base text-gray-600">
                Begin your journey with HilbrickRockle
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Recruiting */}
      <section className="py-8 sm:py-12 lg:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Questions?</h2>
          <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8">
            Our recruiting team is here to help with any questions about our opportunities
          </p>
          <Link
            href="/contact"
            className="inline-block bg-primary-600 text-white px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base rounded-md hover:bg-primary-700 transition-colors"
          >
            Contact Recruiting
          </Link>
        </div>
      </section>
    </>
  );
};

export default CareersPage; 