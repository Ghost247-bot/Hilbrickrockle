import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { FiArrowLeft, FiUsers, FiBriefcase, FiTrendingUp, FiAward, FiHeart } from 'react-icons/fi';

const WomenEnrichingBusinessPage: React.FC = () => {
  const programs = [
    {
      title: 'Leadership Development',
      description: 'Comprehensive training and mentorship programs designed to develop women leaders in law and business.',
      icon: <FiTrendingUp className="w-12 h-12" />,
    },
    {
      title: 'Networking Opportunities',
      description: 'Regular events, conferences, and networking sessions connecting women professionals across industries.',
      icon: <FiUsers className="w-12 h-12" />,
    },
    {
      title: 'Entrepreneurship Support',
      description: 'Resources and guidance for women entrepreneurs, including legal clinics and business mentorship.',
      icon: <FiBriefcase className="w-12 h-12" />,
    },
  ];

  const stats = [
    { value: '40%', label: 'Women Partners', icon: <FiUsers /> },
    { value: '45%', label: 'Associates Are Women', icon: <FiTrendingUp /> },
    { value: '15', label: 'Leadership Programs', icon: <FiAward /> },
    { value: '200+', label: 'Professional Events', icon: <FiHeart /> },
  ];

  const initiatives = [
    {
      title: 'Women in Leadership Summit',
      description: 'Annual gathering bringing together women leaders to share insights and build connections.',
      year: '2024',
    },
    {
      title: 'Mentorship Circles',
      description: 'Small group mentoring where experienced professionals guide emerging women leaders.',
      year: 'Ongoing',
    },
    {
      title: 'Women-Owned Business Legal Clinic',
      description: 'Pro bono legal services specifically designed for women entrepreneurs and business owners.',
      year: '2024',
    },
  ];

  return (
    <>
      <Head>
        <title>Women Enriching Business - HilbrickRockle</title>
        <meta name="description" content="Promoting the success and advancement of women in law and business." />
      </Head>

      {/* Hero Section */}
      <section className="relative h-[60vh] bg-gradient-to-br from-pink-900 via-rose-900 to-red-900 text-white overflow-hidden mt-16">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-900/90 to-rose-900/90" />
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
              <FiBriefcase className="w-12 h-12 mr-4 text-pink-300" />
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                Women Enriching Business
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-pink-100 leading-relaxed">
              Promoting the success and advancement of women in law and business
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
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
              <p className="text-xl text-gray-700 leading-relaxed mb-8">
                "Women Enriching Business" is our firm's commitment to advancing women in the legal 
                profession and supporting women leaders across all industries. We believe that diverse 
                leadership teams drive better outcomes for businesses, clients, and communities.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Through targeted programs, mentorship, and advocacy, we work to break down barriers 
                and create pathways for women to achieve their full potential in law and business.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-br from-pink-50 to-rose-50">
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
                <div className="text-rose-600 mb-4 flex justify-center text-4xl">
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Programs</h2>
            <p className="text-xl text-gray-600">
              Comprehensive support for women's professional advancement
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <motion.div
                key={program.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-lg p-8 border border-pink-100"
              >
                <div className="text-rose-600 mb-6">{program.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{program.title}</h3>
                <p className="text-gray-700 leading-relaxed">{program.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Initiatives Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Key Initiatives</h2>
            <p className="text-xl text-gray-600">
              Creating impact through targeted programs
            </p>
          </div>

          <div className="space-y-8">
            {initiatives.map((initiative, index) => (
              <motion.div
                key={initiative.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md p-8 border-l-4 border-rose-600"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-3">
                      <span className="bg-pink-100 text-rose-600 px-3 py-1 rounded-full text-sm font-medium mr-3">
                        {initiative.year}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{initiative.title}</h3>
                    <p className="text-gray-700 text-lg leading-relaxed">{initiative.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Showcase Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-pink-100 to-rose-100 rounded-2xl p-12 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Celebrating Women Leaders</h2>
              <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
                Our firm proudly features women leaders at all levels, from managing partners to 
                practice group heads. Their success is a testament to our commitment to advancing 
                women in law.
              </p>
              <Link
                href="/about"
                className="bg-rose-600 text-white px-8 py-3 rounded-lg hover:bg-rose-700 transition-colors font-medium"
              >
                Meet Our Leaders
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-br from-pink-900 via-rose-900 to-red-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Network</h2>
            <p className="text-xl text-pink-100 mb-8 leading-relaxed">
              Whether you're a law student, practicing attorney, or business professional, we invite 
              you to join us in advancing women's leadership in law and business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-white text-rose-900 px-8 py-3 rounded-lg hover:bg-pink-50 transition-colors font-medium"
              >
                Get Involved
              </Link>
              <Link
                href="/careers"
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white/10 transition-colors font-medium"
              >
                Career Opportunities
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default WomenEnrichingBusinessPage;

