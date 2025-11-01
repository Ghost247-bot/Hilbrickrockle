import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { FiArrowLeft, FiCalendar, FiUser, FiClock, FiShare2 } from 'react-icons/fi';

const LegalInnovationPage: React.FC = () => {
  const relatedArticles = [
    {
      title: 'AI and Legal Practice: The Future is Now',
      excerpt: 'Exploring how artificial intelligence is transforming legal services.',
      image: '/images/legal-innovation/innovation.jpg',
      date: 'March 10, 2024',
      category: 'Innovation',
    },
    {
      title: 'Digital Transformation in Law Firms',
      excerpt: 'How modern law firms are leveraging technology for better client service.',
      image: '/images/innovation.jpg',
      date: 'February 28, 2024',
      category: 'Technology',
    },
    {
      title: 'Legal Tech Trends 2024',
      excerpt: 'The most impactful legal technology trends shaping the industry.',
      image: '/images/tech-deal.jpg',
      date: 'February 15, 2024',
      category: 'Trends',
    },
  ];

  return (
    <>
      <Head>
        <title>Legal Innovation | Hilbrick-Rockle LAW</title>
        <meta name="description" content="Exploring innovation in legal practice and technology adoption." />
      </Head>

      {/* Hero Section */}
      <section className="relative h-[60vh] bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/legal-innovation/innovation.jpg"
            alt="Legal Innovation"
            fill
            style={{ objectFit: 'cover' }}
            className="opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-purple-900/90" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
          <Link
            href="/news"
            className="inline-flex items-center text-white/80 hover:text-white mb-6 group"
          >
            <FiArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to News
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="inline-block mb-4 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm">
              Legal Innovation
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Shaping the Future of Legal Practice Through Innovation
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-white/80">
              <div className="flex items-center">
                <FiCalendar className="mr-2" />
                March 20, 2024
              </div>
              <div className="flex items-center">
                <FiUser className="mr-2" />
                Innovation Team
              </div>
              <div className="flex items-center">
                <FiClock className="mr-2" />
                8 min read
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">
          <div className="flex items-center justify-between mb-8">
            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <FiShare2 className="mr-2" />
              Share Article
            </button>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-xl text-gray-700 leading-relaxed mb-6">
              The legal industry is experiencing unprecedented transformation as innovative technologies 
              reshape how legal services are delivered, accessed, and consumed. At Hilbrick-Rockle LAW, we are at 
              the forefront of this evolution, leveraging cutting-edge tools and methodologies to enhance 
              our practice and better serve our clients.
            </p>

            <h2 className="text-3xl font-bold mt-12 mb-6">Embracing Technology in Legal Practice</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Technology has become an integral part of modern legal practice. From artificial intelligence 
              and machine learning to blockchain and cloud computing, law firms are adopting innovative 
              solutions to improve efficiency, reduce costs, and deliver better outcomes for clients.
            </p>

            <div className="my-8 p-6 bg-blue-50 border-l-4 border-blue-600 rounded-r-lg">
              <p className="text-gray-800 italic">
                "Innovation in law is not just about adopting new technology—it's about fundamentally 
                reimagining how we deliver legal services and create value for our clients."
              </p>
              <p className="mt-4 text-sm text-gray-600">— Sarah Johnson, Chief Innovation Officer</p>
            </div>

            <h2 className="text-3xl font-bold mt-12 mb-6">Key Innovation Initiatives</h2>
            
            <h3 className="text-2xl font-semibold mt-8 mb-4">Artificial Intelligence and Machine Learning</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              Our AI-powered tools enable us to analyze vast amounts of legal data, identify patterns, 
              and predict outcomes with unprecedented accuracy. We use machine learning algorithms to 
              assist in document review, legal research, and case strategy development.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4">Cloud-Based Practice Management</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              Our cloud infrastructure allows seamless collaboration across offices and time zones, 
              ensuring that our clients receive timely and coordinated legal services regardless of location.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4">Client-Facing Technology</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              We've developed proprietary client portals and tools that provide real-time access to case 
              information, document management, and secure communication channels, enhancing transparency 
              and client engagement.
            </p>

            <h2 className="text-3xl font-bold mt-12 mb-6">Data Privacy and Security</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              As we embrace innovation, we remain committed to maintaining the highest standards of data 
              privacy and security. All our technological initiatives undergo rigorous security assessments 
              and comply with international data protection regulations.
            </p>

            <h2 className="text-3xl font-bold mt-12 mb-6">Training and Development</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              We invest heavily in training our attorneys and staff on new technologies and methodologies. 
              Our innovation lab provides a space for experimentation and collaboration, fostering a culture 
              of continuous learning and improvement.
            </p>

            <h2 className="text-3xl font-bold mt-12 mb-6">The Future of Legal Innovation</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Looking ahead, we see exciting opportunities in areas such as quantum computing applications, 
              augmented reality for courtroom presentations, and advanced analytics for legal decision-making. 
              We are committed to staying at the forefront of these developments and incorporating them into 
              our practice to benefit our clients.
            </p>

            <p className="text-gray-700 leading-relaxed mt-8">
              As the legal industry continues to evolve, Hilbrick-Rockle LAW will remain a leader in innovation, 
              continuously exploring new ways to enhance our services and deliver exceptional value to 
              our clients.
            </p>
          </motion.div>
        </div>
      </article>

      {/* Related Articles */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedArticles.map((article, index) => (
              <motion.article
                key={article.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <Link href={`/news/${index + 1}`}>
                  <div className="relative h-48">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className="p-6">
                    <div className="text-sm text-gray-500 mb-2">{article.date}</div>
                    <h3 className="text-xl font-bold mb-2 hover:text-blue-600 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{article.excerpt}</p>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default LegalInnovationPage;

