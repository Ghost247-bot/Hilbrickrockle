import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiCalculator, FiFileText, FiCheckSquare, FiSearch, FiDownload, FiShield } from 'react-icons/fi';

const LegalToolsPage: React.FC = () => {
  const tools = [
    {
      icon: <FiFileText className="w-8 h-8" />,
      title: 'Contract Templates',
      description: 'Access professionally drafted contract templates for common business transactions.',
      category: 'Templates',
      features: ['NDAs', 'Service Agreements', 'Employment Contracts', 'Lease Agreements'],
      available: true,
    },
    {
      icon: <FiCalculator className="w-8 h-8" />,
      title: 'Legal Calculators',
      description: 'Interactive calculators for common legal calculations and assessments.',
      category: 'Calculators',
      features: ['Damages Calculator', 'Interest Calculator', 'Retainer Estimator'],
      available: true,
    },
    {
      icon: <FiCheckSquare className="w-8 h-8" />,
      title: 'Compliance Checklists',
      description: 'Comprehensive checklists to ensure regulatory compliance across various areas.',
      category: 'Compliance',
      features: ['GDPR Checklist', 'Labor Law Checklist', 'Corporate Governance'],
      available: true,
    },
    {
      icon: <FiSearch className="w-8 h-8" />,
      title: 'Document Review Tools',
      description: 'AI-powered tools for document review and analysis.',
      category: 'AI Tools',
      features: ['Contract Analysis', 'Due Diligence Assistant', 'Risk Assessment'],
      available: true,
    },
    {
      icon: <FiShield className="w-8 h-8" />,
      title: 'Risk Assessment Tools',
      description: 'Evaluate legal and regulatory risks for your business operations.',
      category: 'Risk Management',
      features: ['Regulatory Risk Matrix', 'Compliance Score', 'Audit Checklist'],
      available: true,
    },
    {
      icon: <FiDownload className="w-8 h-8" />,
      title: 'Resource Library',
      description: 'Download guides, whitepapers, and legal resources.',
      category: 'Resources',
      features: ['Legal Guides', 'Industry Reports', 'Best Practices'],
      available: true,
    },
  ];

  const popularTemplates = [
    { name: 'Mutual Non-Disclosure Agreement', downloads: '1,234' },
    { name: 'Employment Agreement Template', downloads: '987' },
    { name: 'Software License Agreement', downloads: '856' },
    { name: 'Independent Contractor Agreement', downloads: '742' },
  ];

  return (
    <>
      <Head>
        <title>Legal Tools & Resources - Hilbrick-Rockle LAW</title>
        <meta name="description" content="Access interactive legal tools, calculators, and templates." />
      </Head>

      {/* Hero Section */}
      <section className="relative h-[50vh] bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
        <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Legal Tools & Resources</h1>
            <p className="text-xl md:text-2xl text-blue-100">
              Interactive tools, calculators, and templates to support your legal needs
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Tools Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Available Tools</h2>
            <p className="text-xl text-gray-600">
              Choose from our comprehensive suite of legal tools and resources
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tools.map((tool, index) => (
              <motion.div
                key={tool.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <div className="text-purple-600 mb-4">{tool.icon}</div>
                <div className="mb-2">
                  <span className="inline-block bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full mb-3">
                    {tool.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2">{tool.title}</h3>
                <p className="text-gray-600 mb-4">{tool.description}</p>
                <ul className="space-y-2 mb-6">
                  {tool.features.map((feature) => (
                    <li key={feature} className="flex items-center text-sm text-gray-600">
                      <span className="w-2 h-2 bg-purple-600 rounded-full mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  disabled={!tool.available}
                  className={`w-full py-2 rounded-lg font-medium transition-colors ${
                    tool.available
                      ? 'bg-purple-600 text-white hover:bg-purple-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {tool.available ? 'Access Tool' : 'Coming Soon'}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Templates */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">Popular Templates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {popularTemplates.map((template, index) => (
              <motion.div
                key={template.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md p-6 flex items-center justify-between hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center">
                  <FiFileText className="w-8 h-8 text-purple-600 mr-4" />
                  <div>
                    <h3 className="font-bold text-lg">{template.name}</h3>
                    <p className="text-gray-500 text-sm">{template.downloads} downloads</p>
                  </div>
                </div>
                <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                  Download
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold mb-4">Important Disclaimer</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              The legal tools and templates provided on this website are for informational purposes only 
              and do not constitute legal advice. While we strive to keep these resources current and accurate, 
              they should not be used as a substitute for professional legal counsel.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Before using any template or tool for your specific situation, please consult with a qualified 
              attorney who can provide advice tailored to your circumstances.
            </p>
            <Link
              href="/contact"
              className="inline-block mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Consult with an Attorney
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default LegalToolsPage;

