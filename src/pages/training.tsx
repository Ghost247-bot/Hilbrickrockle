import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Link from 'next/link';

const TrainingPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Training & Development - HilbrickRockle</title>
        <meta name="description" content="Professional development and training programs at HilbrickRockle." />
      </Head>

      {/* Hero Section */}
      <section className="relative h-[35vh] sm:h-[45vh] md:h-[50vh] bg-gradient-to-br from-indigo-900 via-indigo-800 to-indigo-900 text-white">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">Training & Development</h1>
            <p className="text-lg sm:text-xl md:text-2xl text-indigo-100">
              Invest in your professional growth with our comprehensive training programs
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-8 sm:py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-10 lg:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-gray-900">
              Professional Development Programs
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
              Our comprehensive training programs are designed to enhance your legal expertise, 
              develop leadership skills, and advance your career.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mt-6 sm:mt-8 lg:mt-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-gray-50 rounded-lg p-4 sm:p-6"
            >
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-gray-900">Legal Skills Training</h3>
              <p className="text-sm sm:text-base text-gray-600">
                Advanced courses in litigation, transaction law, and specialized practice areas.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-gray-50 rounded-lg p-4 sm:p-6"
            >
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-gray-900">Leadership Development</h3>
              <p className="text-sm sm:text-base text-gray-600">
                Programs designed to build effective leadership and management capabilities.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-gray-50 rounded-lg p-4 sm:p-6"
            >
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-gray-900">Technology & Innovation</h3>
              <p className="text-sm sm:text-base text-gray-600">
                Stay ahead with training on legal technology, AI tools, and digital transformation.
              </p>
            </motion.div>
          </div>

          <div className="mt-8 sm:mt-10 lg:mt-12 text-center">
            <Link
              href="/contact"
              className="inline-block bg-indigo-600 text-white px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base rounded-lg hover:bg-indigo-700 transition-colors font-medium"
            >
              Contact Us for More Information
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default TrainingPage;

