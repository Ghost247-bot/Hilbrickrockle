import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { FiArrowLeft, FiHeart, FiUsers, FiClock, FiAward } from 'react-icons/fi';

const ProBonoPage: React.FC = () => {
  const programs = [
    {
      title: 'Legal Aid for Underserved Communities',
      description: 'Providing free legal services to individuals and families who cannot afford representation.',
      impact: 'Over 5,000 individuals served annually',
      icon: <FiUsers className="w-12 h-12" />,
    },
    {
      title: 'Non-Profit Organization Support',
      description: 'Assisting non-profits and charitable organizations with their legal needs.',
      impact: '150+ non-profit partners',
      icon: <FiHeart className="w-12 h-12" />,
    },
    {
      title: 'Community Legal Education',
      description: 'Conducting workshops and clinics to educate communities about their legal rights.',
      impact: '200+ workshops per year',
      icon: <FiAward className="w-12 h-12" />,
    },
  ];

  const stats = [
    { value: '100,000+', label: 'Pro Bono Hours Annually', icon: <FiClock /> },
    { value: '500+', label: 'Attorneys Participating', icon: <FiUsers /> },
    { value: '50+', label: 'Community Partners', icon: <FiHeart /> },
    { value: '$15M+', label: 'Value of Services Provided', icon: <FiAward /> },
  ];

  const recentCases = [
    {
      title: 'Housing Rights Victory',
      description: 'Successfully defended 50 families against unlawful eviction during the pandemic.',
      year: '2024',
    },
    {
      title: 'Immigration Assistance Program',
      description: 'Helped 200+ individuals with immigration paperwork and legal processes.',
      year: '2024',
    },
    {
      title: 'Veterans Benefits Clinic',
      description: 'Assisted veterans in securing over $2M in benefits and entitlements.',
      year: '2023',
    },
  ];

  return (
    <>
      <Head>
        <title>Pro Bono & Community Service - HilbrickRockle</title>
        <meta name="description" content="Learn about our pro bono legal services and community engagement initiatives." />
      </Head>

      {/* Hero Section */}
      <section className="relative h-[60vh] bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white overflow-hidden mt-16">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-indigo-900/90" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
          <Link
            href="/global-citizenship"
            className="inline-flex items-center text-white/80 hover:text-white mb-6 group"
          >
            <FiArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Global Citizenship
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="flex items-center mb-6">
              <FiHeart className="w-12 h-12 mr-4 text-blue-400" />
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                Pro Bono & Community Service
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-blue-100 leading-relaxed">
              Making a positive impact through pro bono legal services and community engagement
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Commitment to Service</h2>
              <p className="text-xl text-gray-700 leading-relaxed mb-8">
                At HilbrickRockle, we believe that access to justice is a fundamental right, not a privilege. 
                Our pro bono program is at the heart of our commitment to public service and community engagement.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Through our dedicated attorneys and staff, we provide critical legal services to those 
                who need it most, while also supporting the work of non-profit organizations that make 
                a difference in our communities.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md p-8 text-center"
              >
                <div className="text-blue-600 mb-4 flex justify-center text-4xl">
                  {stat.icon}
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Pro Bono Programs</h2>
            <p className="text-xl text-gray-600">
              Comprehensive legal support for underserved communities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <motion.div
                key={program.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-8 border border-blue-100"
              >
                <div className="text-blue-600 mb-6">{program.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{program.title}</h3>
                <p className="text-gray-700 mb-6 leading-relaxed">{program.description}</p>
                <div className="bg-blue-600 text-white px-4 py-2 rounded-lg inline-block text-sm font-medium">
                  {program.impact}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Impact */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Recent Impact</h2>
            <p className="text-xl text-gray-600">
              Stories of how our pro bono work has made a difference
            </p>
          </div>

          <div className="space-y-8">
            {recentCases.map((case_, index) => (
              <motion.div
                key={case_.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md p-8 border-l-4 border-blue-600"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-3">
                      <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium mr-3">
                        {case_.year}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{case_.title}</h3>
                    <p className="text-gray-700 text-lg leading-relaxed">{case_.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Get Involved */}
      <section className="py-16 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Get Involved</h2>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Are you a non-profit organization in need of legal assistance, or an individual facing 
              legal challenges but unable to afford representation? We're here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-white text-blue-900 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors font-medium"
              >
                Request Pro Bono Assistance
              </Link>
              <Link
                href="/careers"
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white/10 transition-colors font-medium"
              >
                Join Our Team
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default ProBonoPage;

