import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FiDownload, FiArrowRight, FiFileText, FiBookOpen } from 'react-icons/fi';

const InsightResources: React.FC = () => {
  const resources = [
    {
      id: 1,
      title: 'ESG Compliance Checklist 2024',
      description: 'A comprehensive guide to environmental, social, and governance compliance requirements.',
      type: 'PDF Guide',
      size: '2.4 MB',
      image: '/images/resources/esg-checklist.jpg',
      downloadUrl: '/downloads/esg-checklist-2024.pdf',
      category: 'Compliance'
    },
    {
      id: 2,
      title: 'M&A Due Diligence Framework',
      description: 'Essential checklist and framework for conducting thorough due diligence in mergers and acquisitions.',
      type: 'Template',
      size: '1.8 MB',
      image: '/images/resources/ma-guide.jpg',
      downloadUrl: '/downloads/ma-due-diligence-framework.pdf',
      category: 'Corporate Law'
    },
    {
      id: 3,
      title: 'Q1 2024 Legal Update',
      description: 'Quarterly summary of key legal developments and regulatory changes affecting businesses.',
      type: 'Report',
      size: '3.2 MB',
      image: '/images/resources/q1-update.jpg',
      downloadUrl: '/downloads/q1-2024-legal-update.pdf',
      category: 'Legal Updates'
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
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Resources & Downloads</h2>
        <p className="text-gray-600 text-lg">Access our comprehensive legal resources, guides, and templates</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {resources.map((resource, index) => (
          <motion.div
            key={resource.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
          >
            <div className="relative h-48">
              <Image
                src={resource.image}
                alt={resource.title}
                fill
                style={{ objectFit: 'cover' }}
                className="group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-purple-100 text-purple-800 text-sm px-3 py-1 rounded-full">
                  {resource.category}
                </span>
              </div>
              <div className="absolute top-4 right-4">
                <div className="bg-white/90 backdrop-blur-sm rounded-full p-2">
                  <FiFileText className="w-5 h-5 text-gray-700" />
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex items-center space-x-2 mb-3">
                <FiBookOpen className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-500">{resource.type}</span>
                <span className="text-gray-300">•</span>
                <span className="text-sm text-gray-500">{resource.size}</span>
              </div>
              
              <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-600 transition-colors">
                {resource.title}
              </h3>
              
              <p className="text-gray-600 mb-6 line-clamp-3">
                {resource.description}
              </p>
              
              <div className="flex items-center justify-between">
                <Link
                  href={resource.downloadUrl}
                  className="group/link flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <FiDownload className="w-4 h-4" />
                  <span>Download</span>
                </Link>
                
                <Link 
                  href={`/resources/${resource.id}`}
                  className="text-blue-600 hover:text-blue-700 transition-colors flex items-center group/preview"
                >
                  Preview
                  <FiArrowRight className="ml-1 w-4 h-4 group-hover/preview:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-center mt-8"
      >
        <Link
          href="/resources"
          className="group inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <span>View All Resources</span>
          <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </motion.div>
    </section>
  );
};

export default InsightResources;
