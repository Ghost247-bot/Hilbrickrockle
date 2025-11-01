import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight, FiCalendar, FiUser } from 'react-icons/fi';

const FeaturedInsights: React.FC = () => {
  const featuredInsights = [
    {
      id: 1,
      title: 'The Future of Legal Technology: AI and Automation',
      excerpt: 'Exploring how artificial intelligence is transforming legal practice and what it means for clients.',
      category: 'Technology',
      date: 'March 15, 2024',
      image: '/images/legal-innovation/innovation.jpg',
      author: 'Sarah Johnson',
      readTime: '8 min read',
      featured: true
    },
    {
      id: 2,
      title: 'ESG Compliance: A Comprehensive Guide for 2024',
      excerpt: 'Understanding the latest environmental, social, and governance requirements for businesses.',
      category: 'Compliance',
      date: 'March 14, 2024',
      image: '/images/sustainable-finance.jpg',
      author: 'Michael Chen',
      readTime: '12 min read',
      featured: true
    },
    {
      id: 3,
      title: 'International Trade Law Updates: Key Changes',
      excerpt: 'Analysis of recent developments in international trade law and their impact on global business.',
      category: 'International Law',
      date: 'March 13, 2024',
      image: '/images/global-markets.jpg',
      author: 'Emily Davis',
      readTime: '6 min read',
      featured: true
    }
  ];

  return (
    <section className="mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Insights</h2>
        <p className="text-gray-600 text-lg">Our most popular and impactful legal insights</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {featuredInsights.map((insight, index) => (
          <motion.article
            key={insight.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
          >
            <div className="relative h-48">
              <Image
                src={insight.image}
                alt={insight.title}
                fill
                style={{ objectFit: 'cover' }}
                className="group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Featured
                </span>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex items-center space-x-4 mb-3">
                <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                  {insight.category}
                </span>
                <span className="text-sm text-gray-500 flex items-center">
                  <FiCalendar className="mr-1" />
                  {insight.date}
                </span>
              </div>
              
              <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-600 transition-colors">
                <Link href={`/insights/${insight.id}`}>
                  {insight.title}
                </Link>
              </h3>
              
              <p className="text-gray-600 mb-4 line-clamp-3">
                {insight.excerpt}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span className="flex items-center">
                    <FiUser className="mr-1" />
                    {insight.author}
                  </span>
                  <span>•</span>
                  <span>{insight.readTime}</span>
                </div>
                
                <Link 
                  href={`/insights/${insight.id}`}
                  className="text-blue-600 hover:text-blue-700 transition-colors flex items-center group/link"
                >
                  Read more
                  <FiArrowRight className="ml-2 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default FeaturedInsights;
