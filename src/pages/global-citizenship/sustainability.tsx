import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiArrowLeft, FiZap, FiAward, FiTrendingDown } from 'react-icons/fi';
import { MdNature, MdRecycling } from 'react-icons/md';

const SustainabilityPage: React.FC = () => {
  const initiatives = [
    {
      title: 'Carbon Neutrality',
      description: 'Committed to achieving carbon neutrality across all operations by 2030 through renewable energy and offset programs.',
      icon: <MdNature className="w-12 h-12" />,
    },
    {
      title: 'Waste Reduction',
      description: 'Implementing paperless operations, recycling programs, and circular economy principles throughout the firm.',
      icon: <MdRecycling className="w-12 h-12" />,
    },
    {
      title: 'Sustainable Procurement',
      description: 'Prioritizing suppliers and vendors committed to environmental responsibility and sustainable practices.',
      icon: <FiAward className="w-12 h-12" />,
    },
  ];

  const stats = [
    { value: '40%', label: 'Carbon Footprint Reduction Goal', icon: <FiTrendingDown /> },
    { value: '95%', label: 'Paperless Operations', icon: <MdRecycling /> },
    { value: '100%', label: 'Renewable Energy', icon: <FiZap /> },
    { value: '50+', label: 'Sustainability Initiatives', icon: <MdNature /> },
  ];

  const achievements = [
    {
      title: 'Carbon Footprint Reduction',
      description: 'Reduced our carbon footprint by 35% since 2020 through energy efficiency measures and renewable energy adoption.',
      year: '2020-2024',
    },
    {
      title: 'LEED Certified Offices',
      description: 'All new offices are LEED certified, featuring energy-efficient systems and sustainable building materials.',
      year: '2023',
    },
    {
      title: 'Plastic Elimination',
      description: 'Eliminated single-use plastics from all office locations and events.',
      year: '2022',
    },
  ];

  return (
    <>
      <Head>
        <title>Environmental Sustainability - HilbrickRockle</title>
        <meta name="description" content="Our commitment to environmental stewardship and sustainable practices." />
      </Head>

      {/* Hero Section */}
      <section className="relative h-[60vh] bg-gradient-to-br from-green-900 via-emerald-900 to-teal-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 to-emerald-900/90" />
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
              <MdNature className="w-12 h-12 mr-4 text-green-300" />
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                Environmental Sustainability
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-green-100 leading-relaxed">
              Leading by example in environmental stewardship and sustainable practices
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
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Environmental Commitment</h2>
              <p className="text-xl text-gray-700 leading-relaxed mb-8">
                As a leading law firm, we recognize our responsibility to operate sustainably and 
                minimize our environmental impact. Our comprehensive sustainability program addresses 
                climate change, resource conservation, and environmental stewardship.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                We are committed to being carbon neutral by 2030 and continuing to find innovative 
                ways to reduce our environmental footprint while delivering exceptional legal services.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-emerald-50">
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
                <div className="text-green-600 mb-4 flex justify-center text-4xl">
                  {stat.icon}
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Initiatives Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Sustainability Initiatives</h2>
            <p className="text-xl text-gray-600">
              Comprehensive programs addressing climate and environment
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {initiatives.map((initiative, index) => (
              <motion.div
                key={initiative.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-8 border border-green-100"
              >
                <div className="text-green-600 mb-6">{initiative.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{initiative.title}</h3>
                <p className="text-gray-700 leading-relaxed">{initiative.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Recent Achievements</h2>
            <p className="text-xl text-gray-600">
              Progress in our sustainability journey
            </p>
          </div>

          <div className="space-y-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md p-8 border-l-4 border-green-600"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-3">
                      <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-medium mr-3">
                        {achievement.year}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{achievement.title}</h3>
                    <p className="text-gray-700 text-lg leading-relaxed">{achievement.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Future Goals */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-green-900 to-emerald-900 text-white rounded-2xl p-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Goals</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                <div>
                  <div className="text-5xl font-bold mb-2">2025</div>
                  <p className="text-green-100">100% Renewable Energy</p>
                </div>
                <div>
                  <div className="text-5xl font-bold mb-2">2027</div>
                  <p className="text-green-100">50% Carbon Reduction</p>
                </div>
                <div>
                  <div className="text-5xl font-bold mb-2">2030</div>
                  <p className="text-green-100">Carbon Neutrality</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Join Our Efforts</h2>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Sustainability is a team effort. We work with clients, partners, and suppliers who 
              share our commitment to environmental responsibility.
            </p>
            <Link
              href="/contact"
              className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              Partner With Us
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default SustainabilityPage;

