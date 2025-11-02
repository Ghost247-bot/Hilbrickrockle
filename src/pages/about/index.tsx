import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Image from 'next/image';
import AboutLeadershipSlider from '../../components/AboutLeadershipSlider';

const AboutPage: React.FC = () => {
  const timeline = [
    {
      year: '1998',
      title: 'Firm Founded',
      description: 'HilbrickRockle was established in Lincoln, Nebraska',
    },
    {
      year: '1999',
      title: 'First International Office',
      description: 'Opened our first international office in London.',
    },
    {
      year: '2002',
      title: 'Global Expansion',
      description: 'Expanded operations across Europe and Asia.',
    },
    {
      year: '2020',
      title: 'Digital Innovation',
      description: 'Launched innovative legal tech solutions and virtual services.',
    },
  ];

  const values = [
    {
      title: 'Excellence',
      description: 'Delivering the highest quality legal services with precision and dedication.',
      icon: '⭐',
    },
    {
      title: 'Integrity',
      description: 'Maintaining the highest standards of professional ethics and conduct.',
      icon: '⚖️',
    },
    {
      title: 'Innovation',
      description: 'Embracing new technologies and approaches to legal practice.',
      icon: '💡',
    },
    {
      title: 'Diversity',
      description: 'Fostering an inclusive environment that values different perspectives.',
      icon: '🌍',
    },
  ];

  return (
    <>
      <Head>
        <title>About Us - HilbrickRockle</title>
        <meta name="description" content="Learn about HilbrickRockle's history, values, and leadership team." />
      </Head>

      {/* Hero Section */}
      <section className="relative h-[40vh] sm:h-[50vh] md:h-[60vh] bg-gray-900 text-white mt-16">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover opacity-50"
            src="/images/about/hero.jpg"
            alt="About HilbrickRockle"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">About Us</h1>
            <p className="text-lg sm:text-xl md:text-2xl">
              A global law firm with a legacy of excellence and innovation
            </p>
          </motion.div>
        </div>
      </section>

      {/* Firm History */}
      <section className="py-8 sm:py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 lg:mb-12">Our History</h2>
          <div className="space-y-6 sm:space-y-8">
            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="flex flex-col sm:flex-row items-start space-y-2 sm:space-y-0 sm:space-x-4"
              >
                <div className="flex-shrink-0 w-full sm:w-24 text-xl sm:text-2xl font-bold text-primary-600">
                  {item.year}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">{item.title}</h3>
                  <p className="text-sm sm:text-base text-gray-600">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-8 sm:py-12 lg:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 lg:mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-white p-4 sm:p-6 rounded-lg shadow-sm"
              >
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{value.icon}</div>
                <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">{value.title}</h3>
                <p className="text-sm sm:text-base text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <AboutLeadershipSlider />
    </>
  );
};

export default AboutPage; 