import React, { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiLock, FiFileText, FiCalendar, FiDollarSign, FiUsers, FiUpload, FiDownload, FiSearch } from 'react-icons/fi';

const ClientPortalPage: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const features = [
    {
      icon: <FiFileText className="w-8 h-8" />,
      title: 'Document Access',
      description: 'Securely access and download all your case documents',
    },
    {
      icon: <FiCalendar className="w-8 h-8" />,
      title: 'Case Updates',
      description: 'Track the status and progress of your matters in real-time',
    },
    {
      icon: <FiDollarSign className="w-8 h-8" />,
      title: 'Billing & Invoices',
      description: 'View statements, invoices, and payment history',
    },
    {
      icon: <FiUsers className="w-8 h-8" />,
      title: 'Team Communication',
      description: 'Collaborate directly with your legal team',
    },
    {
      icon: <FiUpload className="w-8 h-8" />,
      title: 'Secure Upload',
      description: 'Upload sensitive documents safely and securely',
    },
    {
      icon: <FiSearch className="w-8 h-8" />,
      title: 'Document Search',
      description: 'Quickly find any document or communication',
    },
  ];

  const recentDocuments = [
    { name: 'Contract Amendment - Q1 2024.pdf', date: 'March 20, 2024', size: '2.4 MB' },
    { name: 'Case Summary - Intellectual Property.pdf', date: 'March 18, 2024', size: '1.8 MB' },
    { name: 'Legal Opinion - Regulatory Compliance.docx', date: 'March 15, 2024', size: '856 KB' },
  ];

  const upcomingTasks = [
    { title: 'Review and sign merger documents', date: 'March 25, 2024', priority: 'High' },
    { title: 'Provide additional financial records', date: 'April 1, 2024', priority: 'Medium' },
    { title: 'Schedule consultation meeting', date: 'April 5, 2024', priority: 'Low' },
  ];

  return (
    <>
      <Head>
        <title>Client Portal - HilbrickRockle</title>
        <meta name="description" content="Secure client portal for accessing your legal documents and case information." />
      </Head>

      {/* Hero Section */}
      <section className="relative h-[50vh] bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white mt-16">
        <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <div className="flex items-center mb-6">
              <FiLock className="mr-2 w-8 h-8" />
              <h1 className="text-4xl md:text-5xl font-bold">Client Portal</h1>
            </div>
            <p className="text-xl md:text-2xl text-blue-100">
              Secure access to your legal documents, case updates, and billing information
            </p>
          </motion.div>
        </div>
      </section>

      {/* Login Section */}
      {!isLoggedIn ? (
        <section className="py-16 bg-gray-50">
          <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-lg shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold mb-6 text-center">Log In to Your Portal</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your password"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setIsLoggedIn(true)}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Log In
                </button>
              </form>
              <div className="mt-6 text-center">
                <Link href="/contact" className="text-blue-600 hover:underline text-sm">
                  Need help accessing your account?
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      ) : (
        <>
          {/* Dashboard */}
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mb-12">
                <h2 className="text-3xl font-bold mb-2">Dashboard</h2>
                <p className="text-gray-600">Welcome back. Here's an overview of your matters.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg p-6">
                  <div className="text-3xl font-bold mb-2">5</div>
                  <div className="text-blue-100">Active Matters</div>
                </div>
                <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg p-6">
                  <div className="text-3xl font-bold mb-2">12</div>
                  <div className="text-green-100">Documents Pending Review</div>
                </div>
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg p-6">
                  <div className="text-3xl font-bold mb-2">3</div>
                  <div className="text-purple-100">Upcoming Deadlines</div>
                </div>
              </div>

              {/* Recent Documents */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold mb-6">Recent Documents</h3>
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  {recentDocuments.map((doc, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center">
                        <FiFileText className="w-5 h-5 text-blue-600 mr-3" />
                        <div>
                          <div className="font-medium">{doc.name}</div>
                          <div className="text-sm text-gray-500">
                            {doc.date} • {doc.size}
                          </div>
                        </div>
                      </div>
                      <button className="text-blue-600 hover:text-blue-700">
                        <FiDownload />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upcoming Tasks */}
              <div>
                <h3 className="text-2xl font-bold mb-6">Upcoming Tasks</h3>
                <div className="space-y-4">
                  {upcomingTasks.map((task, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg"
                    >
                      <div>
                        <div className="font-medium">{task.title}</div>
                        <div className="text-sm text-gray-500">{task.date}</div>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          task.priority === 'High'
                            ? 'bg-red-100 text-red-800'
                            : task.priority === 'Medium'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-green-100 text-green-800'
                        }`}
                      >
                        {task.priority}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Portal Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="text-blue-600 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Bank-Level Security</h2>
            <p className="text-xl text-gray-600 mb-8">
              Your data is protected with enterprise-grade encryption and multi-factor authentication. 
              We maintain the highest security standards to ensure your information remains confidential.
            </p>
            <div className="flex justify-center gap-8 text-gray-600">
              <div>
                <div className="text-3xl font-bold text-blue-600">256-bit</div>
                <div className="text-sm">SSL Encryption</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600">99.9%</div>
                <div className="text-sm">Uptime SLA</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600">SOC 2</div>
                <div className="text-sm">Compliant</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ClientPortalPage;

