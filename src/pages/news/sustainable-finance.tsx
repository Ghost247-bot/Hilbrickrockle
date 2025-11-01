import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { FiArrowLeft, FiCalendar, FiUser, FiClock, FiShare2 } from 'react-icons/fi';

const SustainableFinancePage: React.FC = () => {
  const relatedArticles = [
    {
      title: 'ESG Compliance Framework 2024',
      excerpt: 'A comprehensive guide to environmental, social, and governance compliance.',
      image: '/images/resources/esg-checklist.jpg',
      date: 'March 15, 2024',
      category: 'ESG',
    },
    {
      title: 'Green Bonds and Sustainable Investments',
      excerpt: 'Understanding the legal landscape of green financing.',
      image: '/images/sustainable-finance.jpg',
      date: 'February 28, 2024',
      category: 'Finance',
    },
    {
      title: 'Climate Change and Corporate Law',
      excerpt: 'How climate regulations are reshaping corporate governance.',
      image: '/images/resources/q1-update.jpg',
      date: 'February 10, 2024',
      category: 'Corporate',
    },
  ];

  return (
    <>
      <Head>
        <title>Sustainable Finance | HilbrickRockle</title>
        <meta name="description" content="Exploring sustainable finance and ESG investment trends in legal practice." />
      </Head>

      {/* Hero Section */}
      <section className="relative h-[60vh] bg-gradient-to-br from-green-800 via-emerald-900 to-teal-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/sustainable-finance.jpg"
            alt="Sustainable Finance"
            fill
            style={{ objectFit: 'cover' }}
            className="opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-green-800/90 to-emerald-900/90" />
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
              Sustainable Finance
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Sustainable Finance: Shaping the Future of Responsible Investing
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-white/80">
              <div className="flex items-center">
                <FiCalendar className="mr-2" />
                March 18, 2024
              </div>
              <div className="flex items-center">
                <FiUser className="mr-2" />
                ESG Practice Group
              </div>
              <div className="flex items-center">
                <FiClock className="mr-2" />
                10 min read
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
              The global shift towards sustainable finance represents one of the most significant 
              transformations in the financial services industry. As investors increasingly prioritize 
              environmental, social, and governance (ESG) factors, legal frameworks are evolving to 
              support and regulate this growing sector.
            </p>

            <h2 className="text-3xl font-bold mt-12 mb-6">The Rise of Sustainable Finance</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Sustainable finance has moved from a niche concern to a mainstream investment strategy, 
              with trillions of dollars now allocated to ESG-focused funds. This shift is driven by 
              growing awareness of climate risks, social inequality, and corporate governance failures.
            </p>

            <div className="my-8 p-6 bg-green-50 border-l-4 border-green-600 rounded-r-lg">
              <p className="text-gray-800 italic">
                "Sustainable finance is not just about compliance—it's about creating long-term value 
                while addressing the world's most pressing challenges."
              </p>
              <p className="mt-4 text-sm text-gray-600">— ESG Advisory Team</p>
            </div>

            <h2 className="text-3xl font-bold mt-12 mb-6">Regulatory Developments</h2>
            
            <h3 className="text-2xl font-semibold mt-8 mb-4">EU Sustainable Finance Disclosure Regulation</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              The SFDR requires financial market participants to disclose how they integrate sustainability 
              risks into their investment decisions and the negative impacts of their investment choices. 
              This represents a fundamental shift toward transparency in sustainable investing.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4">Taxonomy Regulations</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              The EU Taxonomy provides a classification system for environmentally sustainable economic 
              activities, creating a common language for investors and stakeholders to assess sustainability.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4">US Climate Disclosure Rules</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              The SEC's climate disclosure requirements represent a significant step toward standardized 
              ESG reporting for US public companies, with implications for corporate governance and 
              investor relations.
            </p>

            <h2 className="text-3xl font-bold mt-12 mb-6">Sustainable Finance Products</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              The sustainable finance market has spawned a diverse range of products, each with unique 
              legal and regulatory considerations:
            </p>

            <ul className="list-disc list-inside space-y-3 text-gray-700 my-6">
              <li>Green Bonds: Debt instruments specifically earmarked for climate and environmental projects</li>
              <li>ESG Funds: Investment funds that screen and select assets based on ESG criteria</li>
              <li>Sustainability-Linked Loans: Loans with interest rates tied to sustainability performance targets</li>
              <li>Impact Investments: Investments made with the intention to generate positive, measurable social and environmental impact</li>
            </ul>

            <h2 className="text-3xl font-bold mt-12 mb-6">Legal Challenges and Opportunities</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              As the sustainable finance market matures, legal practitioners face both challenges and 
              opportunities. Greenwashing concerns require rigorous due diligence and verification 
              processes, while innovative structuring opportunities emerge for climate finance solutions.
            </p>

            <h2 className="text-3xl font-bold mt-12 mb-6">Best Practices for Legal Counsel</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Effective legal counsel in sustainable finance requires expertise across multiple areas:
            </p>

            <ul className="list-disc list-inside space-y-3 text-gray-700 my-6">
              <li>Regulatory compliance across multiple jurisdictions</li>
              <li>Documentation and disclosure requirements</li>
              <li>Impact measurement and verification methodologies</li>
              <li>Risk management and liability considerations</li>
            </ul>

            <h2 className="text-3xl font-bold mt-12 mb-6">The Future of Sustainable Finance</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              As climate risks intensify and stakeholder pressure grows, sustainable finance will become 
              increasingly central to mainstream financial services. Legal frameworks will continue to 
              evolve, creating both challenges and opportunities for practitioners and their clients.
            </p>

            <p className="text-gray-700 leading-relaxed mt-8">
              At HilbrickRockle, our ESG and financial services teams work together to provide comprehensive 
              counsel on sustainable finance matters, helping clients navigate this complex and rapidly 
              evolving landscape.
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
                <Link href={`/news/${index + 4}`}>
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

export default SustainableFinancePage;

