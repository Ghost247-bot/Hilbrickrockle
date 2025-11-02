import React, { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { FiBook, FiCalendar, FiDownload, FiFilter, FiFileText, FiBarChart } from 'react-icons/fi';

const PublicationsPage: React.FC = () => {
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Legal Guides', 'Industry Reports', 'Case Studies', 'Newsletters', 'Whitepapers'];

  const publications = [
    {
      title: 'Guide to International M&A Transactions',
      description: 'A comprehensive guide covering the legal and strategic considerations in cross-border mergers and acquisitions.',
      category: 'Legal Guides',
      date: 'March 2024',
      image: '/images/resources/ma-guide.jpg',
      type: 'PDF',
      pages: 45,
      downloads: 1234,
      featured: true,
    },
    {
      title: 'ESG Compliance Checklist',
      description: 'Practical checklist for environmental, social, and governance compliance across jurisdictions.',
      category: 'Tools',
      date: 'February 2024',
      image: '/images/resources/esg-checklist.jpg',
      type: 'PDF',
      pages: 12,
      downloads: 856,
      featured: true,
    },
    {
      title: 'Q1 2024 Legal Update',
      description: 'Quarterly newsletter covering recent legal developments, regulatory changes, and market trends.',
      category: 'Newsletters',
      date: 'January 2024',
      image: '/images/resources/q1-update.jpg',
      type: 'PDF',
      pages: 28,
      downloads: 1845,
      featured: true,
    },
    {
      title: 'Data Privacy in the Digital Age',
      description: 'Analysis of evolving data protection regulations and best practices for compliance.',
      category: 'Whitepapers',
      date: 'December 2023',
      image: '/images/resources/featured-article.jpg',
      type: 'PDF',
      pages: 32,
      downloads: 967,
      featured: false,
    },
    {
      title: 'Real Estate Law: Key Developments 2023',
      description: 'Review of significant real estate legal developments and their implications.',
      category: 'Industry Reports',
      date: 'November 2023',
      image: '/images/resources/featured-article.jpg',
      type: 'PDF',
      pages: 40,
      downloads: 743,
      featured: false,
    },
    {
      title: 'Case Study: Successful IPO Strategy',
      description: 'In-depth analysis of a recent successful initial public offering and key legal strategies.',
      category: 'Case Studies',
      date: 'October 2023',
      image: '/images/resources/featured-article.jpg',
      type: 'PDF',
      pages: 20,
      downloads: 632,
      featured: false,
    },
  ];

  const filteredPublications = filter === 'All' 
    ? publications 
    : publications.filter(pub => pub.category === filter);

  return (
    <>
      <Head>
        <title>Publications - HilbrickRockle</title>
        <meta name="description" content="Access our library of legal guides, articles, whitepapers, and publications." />
      </Head>

      {/* Hero Section */}
      <section className="relative h-[35vh] sm:h-[45vh] md:h-[50vh] bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white mt-16">
        <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <div className="flex items-center mb-4 sm:mb-6">
              <FiBook className="mr-2 w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10" />
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">Publications</h1>
            </div>
            <p className="text-lg sm:text-xl md:text-2xl text-purple-100">
              Access our comprehensive library of legal insights, guides, and resources
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-4 sm:py-6 lg:py-8 bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            <div className="flex items-center">
              <FiFilter className="mr-2 text-gray-600" />
              <span className="text-sm sm:text-base font-medium text-gray-700">Filter by Category:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm rounded-full transition-colors ${
                    filter === category
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Publications */}
      {filter === 'All' && (
        <section className="py-8 sm:py-12 lg:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 lg:mb-12">Featured Publications</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {publications.filter(p => p.featured).map((publication, index) => (
                <motion.article
                  key={publication.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow group"
                >
                  <div className="relative h-40 sm:h-48">
                    <Image
                      src={publication.image}
                      alt={publication.title}
                      fill
                      style={{ objectFit: 'cover' }}
                      className="group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-white/90 backdrop-blur-sm px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                      {publication.type}
                    </div>
                  </div>
                  <div className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center text-gray-600 mb-2 gap-1 sm:gap-0">
                      <span className="bg-indigo-100 text-indigo-600 px-2 sm:px-3 py-1 rounded-full text-xs mr-0 sm:mr-2 w-fit">
                        {publication.category}
                      </span>
                      <span className="text-xs flex items-center">
                        <FiCalendar className="mr-1" />
                        {publication.date}
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold mb-2 group-hover:text-indigo-600 transition-colors">
                      {publication.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 sm:mb-4">{publication.description}</p>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs text-gray-500 mb-3 sm:mb-4 gap-1 sm:gap-0">
                      <span className="flex items-center">
                        <FiFileText className="mr-1" />
                        {publication.pages} pages
                      </span>
                      <span className="flex items-center">
                        <FiDownload className="mr-1" />
                        {publication.downloads} downloads
                      </span>
                    </div>
                    <button className="w-full bg-indigo-600 text-white py-2 text-sm sm:text-base rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center">
                      <FiDownload className="mr-2" />
                      Download
                    </button>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Publications */}
      <section className="py-8 sm:py-12 lg:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 lg:mb-8 gap-2 sm:gap-0">
            <h2 className="text-2xl sm:text-3xl font-bold">
              {filter === 'All' ? 'All Publications' : filter}
            </h2>
            <span className="text-sm sm:text-base text-gray-600">{filteredPublications.length} publications</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {filteredPublications.map((publication, index) => (
              <motion.article
                key={publication.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group"
              >
                <div className="relative h-40 sm:h-48">
                  <Image
                    src={publication.image}
                    alt={publication.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center text-gray-600 mb-2 gap-1 sm:gap-0">
                    <span className="bg-indigo-100 text-indigo-600 px-2 sm:px-3 py-1 rounded-full text-xs mr-0 sm:mr-2 w-fit">
                      {publication.category}
                    </span>
                    <span className="text-xs flex items-center">
                      <FiCalendar className="mr-1" />
                      {publication.date}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold mb-2 group-hover:text-indigo-600 transition-colors">
                    {publication.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3 sm:mb-4">{publication.description}</p>
                  <button className="w-full bg-indigo-600 text-white py-2 text-sm sm:text-base rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center">
                    <FiDownload className="mr-2" />
                    Download
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FiBarChart className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6" />
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Stay Updated</h2>
          <p className="text-lg sm:text-xl text-purple-100 mb-6 sm:mb-8">
            Subscribe to our newsletter to receive the latest publications and legal insights
          </p>
          <form className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg text-gray-900"
            />
            <button className="bg-white text-purple-900 px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base rounded-lg hover:bg-gray-100 transition-colors font-medium">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default PublicationsPage;

