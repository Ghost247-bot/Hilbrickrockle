import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight, FiCalendar, FiUser, FiTag } from 'react-icons/fi';

const LatestBlogs: React.FC = () => {
  const latestBlogs = [
    {
      id: 1,
      title: 'Data Privacy Regulations: What Businesses Need to Know',
      excerpt: 'A comprehensive overview of current data privacy laws and their implications for businesses.',
      category: 'Privacy Law',
      date: 'March 12, 2024',
      image: '/images/tech-deal.jpg',
      author: 'James Kim',
      readTime: '7 min read',
      tags: ['GDPR', 'CCPA', 'Data Protection']
    },
    {
      id: 2,
      title: 'Mergers & Acquisitions: Due Diligence Best Practices',
      excerpt: 'Essential steps and considerations for conducting thorough due diligence in M&A transactions.',
      category: 'Corporate Law',
      date: 'March 11, 2024',
      image: '/images/healthcare-deal.jpg',
      author: 'Lisa Chang',
      readTime: '10 min read',
      tags: ['M&A', 'Due Diligence', 'Corporate']
    },
    {
      id: 3,
      title: 'Cybersecurity Legal Framework: Recent Updates',
      excerpt: 'Understanding the evolving legal landscape of cybersecurity and incident response.',
      category: 'Technology',
      date: 'March 10, 2024',
      image: '/images/innovation.jpg',
      author: 'Robert Martinez',
      readTime: '9 min read',
      tags: ['Cybersecurity', 'Incident Response', 'Compliance']
    },
    {
      id: 4,
      title: 'Employment Law: Remote Work Policies',
      excerpt: 'Legal considerations for implementing and managing remote work policies in the modern workplace.',
      category: 'Employment Law',
      date: 'March 9, 2024',
      image: '/images/energy-project.jpg',
      author: 'Amanda Foster',
      readTime: '6 min read',
      tags: ['Remote Work', 'Employment', 'HR Policies']
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
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Latest Blog Posts</h2>
        <p className="text-gray-600 text-lg">Stay updated with our most recent insights and analysis</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {latestBlogs.map((blog, index) => (
          <motion.article
            key={blog.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
          >
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3 relative h-48 md:h-auto">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <div className="flex-1 p-6">
                <div className="flex items-center space-x-4 mb-3">
                  <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">
                    {blog.category}
                  </span>
                  <span className="text-sm text-gray-500 flex items-center">
                    <FiCalendar className="mr-1" />
                    {blog.date}
                  </span>
                </div>
                
                <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-600 transition-colors">
                  <Link href={`/insights/${blog.id}`}>
                    {blog.title}
                  </Link>
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {blog.excerpt}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {blog.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="flex items-center text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                    >
                      <FiTag className="mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <FiUser className="mr-1" />
                      {blog.author}
                    </span>
                    <span>•</span>
                    <span>{blog.readTime}</span>
                  </div>
                  
                  <Link 
                    href={`/insights/${blog.id}`}
                    className="text-blue-600 hover:text-blue-700 transition-colors flex items-center group/link"
                  >
                    Read more
                    <FiArrowRight className="ml-2 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default LatestBlogs;
