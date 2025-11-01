import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiArrowLeft, FiUsers, FiTarget, FiHeart, FiAward } from 'react-icons/fi';

const DiversityPage: React.FC = () => {
  const initiatives = [
    {
      title: 'Recruitment & Hiring',
      description: 'Active recruitment from diverse talent pools and partnerships with HBCUs, Hispanic-serving institutions, and other organizations.',
      icon: <FiUsers className="w-12 h-12" />,
    },
    {
      title: 'Professional Development',
      description: 'Mentorship programs, sponsorship opportunities, and leadership development for underrepresented attorneys.',
      icon: <FiTarget className="w-12 h-12" />,
    },
    {
      title: 'Inclusive Culture',
      description: 'Affinity groups, cultural celebrations, and initiatives that foster belonging and understanding.',
      icon: <FiHeart className="w-12 h-12" />,
    },
  ];

  const stats = [
    { value: '45%', label: 'Women Partners', icon: <FiUsers /> },
    { value: '35%', label: 'Racial & Ethnic Diversity', icon: <FiTarget /> },
    { value: '20+', label: 'Affinity Groups', icon: <FiHeart /> },
    { value: '$500K+', label: 'Annual Investment', icon: <FiAward /> },
  ];

  const programs = [
    {
      title: 'Mentorship Program',
      description: 'Pairing diverse attorneys with senior mentors to support career advancement.',
    },
    {
      title: 'Scholarship Fund',
      description: 'Supporting diverse law students through scholarships and summer programs.',
    },
    {
      title: 'Leadership Pipeline',
      description: 'Identifying and developing diverse talent for leadership roles.',
    },
  ];

  return (
    <>
      <Head>
        <title>Belong As You Are - HilbrickRockle</title>
        <meta name="description" content="Our commitment to diversity, equity, and inclusion." />
      </Head>

      {/* Hero Section */}
      <section className="relative h-[60vh] bg-gradient-to-br from-purple-900 via-pink-900 to-rose-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 to-pink-900/90" />
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
              <FiHeart className="w-12 h-12 mr-4 text-pink-400" />
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                Belong As You Are
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-pink-100 leading-relaxed">
              Fostering an inclusive environment where diversity is celebrated and everyone can thrive
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
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Commitment</h2>
              <p className="text-xl text-gray-700 leading-relaxed mb-8">
                Diversity, equity, and inclusion are fundamental to who we are as a firm. We believe 
                that a diverse workforce with varied perspectives, backgrounds, and experiences makes 
                us stronger and better equipped to serve our clients.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our "Belong As You Are" initiative reflects our commitment to creating an environment 
                where every individual feels valued, respected, and empowered to succeed.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-br from-purple-50 to-pink-50">
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
                <div className="text-pink-600 mb-4 flex justify-center text-4xl">
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Initiatives</h2>
            <p className="text-xl text-gray-600">
              Building a more inclusive legal profession
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {initiatives.map((initiative, index) => (
              <motion.div
                key={initiative.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-8 border border-purple-100"
              >
                <div className="text-pink-600 mb-6">{initiative.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{initiative.title}</h3>
                <p className="text-gray-700 leading-relaxed">{initiative.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Supporting Programs</h2>
            <p className="text-xl text-gray-600">
              Concrete actions to advance diversity and inclusion
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {programs.map((program, index) => (
                <motion.div
                  key={program.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-md p-8 border-l-4 border-pink-600"
                >
                  <h3 className="text-2xl font-bold mb-3">{program.title}</h3>
                  <p className="text-gray-700 text-lg leading-relaxed">{program.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-br from-purple-900 via-pink-900 to-rose-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Us</h2>
            <p className="text-xl text-pink-100 mb-8 leading-relaxed">
              We're committed to building a diverse and inclusive legal profession. Join us in 
              creating an environment where everyone belongs.
            </p>
            <Link
              href="/careers"
              className="bg-white text-purple-900 px-8 py-3 rounded-lg hover:bg-pink-50 transition-colors font-medium"
            >
              Explore Career Opportunities
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default DiversityPage;

