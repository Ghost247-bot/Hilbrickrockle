import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { FiArrowLeft, FiCalendar, FiUser, FiClock } from 'react-icons/fi';
import ShareButton from '@/components/ShareButton';

const GlobalMarketsPage: React.FC = () => {
  const relatedArticles = [
    {
      title: 'International Trade Law Updates 2024',
      excerpt: 'Recent developments in cross-border trade regulations.',
      image: '/images/global-markets.jpg',
      date: 'March 12, 2024',
      category: 'Trade',
    },
    {
      title: 'M&A Activity in Emerging Markets',
      excerpt: 'Trends and opportunities in emerging market transactions.',
      image: '/images/resources/ma-guide.jpg',
      date: 'March 5, 2024',
      category: 'M&A',
    },
    {
      title: 'Currency and Exchange Rate Regulations',
      excerpt: 'Navigating complex foreign exchange requirements.',
      image: '/images/resources/q1-update.jpg',
      date: 'February 20, 2024',
      category: 'Finance',
    },
  ];

  return (
    <>
      <Head>
        <title>Global Markets | HilbrickRockle</title>
        <meta name="description" content="Insights on global markets, international trade, and cross-border transactions." />
      </Head>

      {/* Hero Section */}
      <section className="relative h-[60vh] bg-gradient-to-br from-indigo-900 via-blue-900 to-cyan-900 text-white overflow-hidden mt-16">
        <div className="absolute inset-0">
          <Image
            src="/images/global-markets.jpg"
            alt="Global Markets"
            fill
            style={{ objectFit: 'cover' }}
            className="opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/90 to-blue-900/90" />
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
              Global Markets
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Navigating Global Markets: Opportunities and Challenges in Cross-Border Business
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-white/80">
              <div className="flex items-center">
                <FiCalendar className="mr-2" />
                March 22, 2024
              </div>
              <div className="flex items-center">
                <FiUser className="mr-2" />
                International Trade Team
              </div>
              <div className="flex items-center">
                <FiClock className="mr-2" />
                12 min read
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">
          <div className="flex items-center justify-between mb-8">
            <ShareButton title="Global Markets Outlook | HilbrickRockle" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-xl text-gray-700 leading-relaxed mb-6">
              The global economy continues to evolve at a rapid pace, creating both unprecedented 
              opportunities and complex challenges for businesses operating across borders. Understanding 
              the legal and regulatory landscape is crucial for success in international markets.
            </p>

            <h2 className="text-3xl font-bold mt-12 mb-6">Current Market Dynamics</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Global markets are experiencing significant shifts driven by geopolitical tensions, 
              technological innovation, and changing consumer preferences. These dynamics are reshaping 
              the legal framework for international business operations.
            </p>

            <div className="my-8 p-6 bg-indigo-50 border-l-4 border-indigo-600 rounded-r-lg">
              <p className="text-gray-800 italic">
                &quot;Success in global markets requires not just legal expertise, but a deep understanding 
                of economic, cultural, and political factors that shape international commerce.&quot;
              </p>
              <p className="mt-4 text-sm text-gray-600">— International Trade Advisory Team</p>
            </div>

            <h2 className="text-3xl font-bold mt-12 mb-6">Key Regulatory Developments</h2>
            
            <h3 className="text-2xl font-semibold mt-8 mb-4">Trade Agreements and Partnerships</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              New and evolving trade agreements are creating opportunities for businesses while introducing 
              complex compliance requirements. Recent developments in regional partnerships have opened 
              new markets while requiring careful navigation of rules of origin, customs procedures, and 
              tariff classifications.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4">Sanctions and Export Controls</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              The sanctions landscape continues to evolve rapidly, with new restrictions targeting specific 
              sectors, entities, and individuals. Effective compliance requires robust screening procedures 
              and ongoing monitoring of regulatory changes across multiple jurisdictions.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4">Data Protection and Privacy</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              Cross-border data flows are subject to increasingly strict regulations. The EU&apos;s General 
              Data Protection Regulation (GDPR) continues to influence global standards, while other 
              jurisdictions are implementing their own comprehensive data protection frameworks.
            </p>

            <h2 className="text-3xl font-bold mt-12 mb-6">Sector-Specific Opportunities</h2>
            
            <h3 className="text-2xl font-semibold mt-8 mb-4">Technology and Digital Services</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              The digital economy offers significant opportunities for cross-border expansion, but 
              also presents unique challenges related to data localization, platform regulation, and 
              digital taxation.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4">Healthcare and Life Sciences</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              Global healthcare markets are expanding, driven by demographics, innovation, and regulatory 
              harmonization. Cross-border transactions require careful attention to regulatory approval 
              processes and intellectual property considerations.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4">Energy and Infrastructure</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              The energy transition is creating new opportunities in renewable energy, while traditional 
              energy sectors continue to evolve. Infrastructure projects span borders and require 
              sophisticated legal structuring.
            </p>

            <h2 className="text-3xl font-bold mt-12 mb-6">Risk Management Strategies</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Effective risk management in global markets requires a comprehensive approach:
            </p>

            <ul className="list-disc list-inside space-y-3 text-gray-700 my-6">
              <li>Thorough due diligence on counterparties and markets</li>
              <li>Structuring transactions to maximize legal protections</li>
              <li>Implementing robust compliance programs</li>
              <li>Staying current with regulatory developments</li>
              <li>Developing contingency plans for geopolitical risks</li>
            </ul>

            <h2 className="text-3xl font-bold mt-12 mb-6">Dispute Resolution in Global Context</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Cross-border disputes require careful consideration of jurisdictional issues, choice of law 
              provisions, and enforcement mechanisms. International arbitration continues to be a preferred 
              method for resolving cross-border commercial disputes, providing neutrality and enforceability 
              through international conventions.
            </p>

            <h2 className="text-3xl font-bold mt-12 mb-6">Looking Ahead</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              As global markets continue to evolve, businesses must remain agile and well-informed. The 
              ability to navigate complex legal and regulatory environments will be a key differentiator 
              for successful international operations.
            </p>

            <p className="text-gray-700 leading-relaxed mt-8">
              Our global markets practice brings together expertise across multiple jurisdictions and 
              practice areas, providing integrated legal solutions for clients operating in international 
              markets.
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
                <Link href={`/news/${index + 7}`}>
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

export default GlobalMarketsPage;

