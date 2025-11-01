import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { FiArrowLeft, FiCalendar, FiUser, FiClock, FiShare2, FiTag } from 'react-icons/fi';

interface NewsArticle {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
  author: string;
  readTime: string;
  tags: string[];
}

// Mock data - in a real app, this would come from an API or database
const newsArticles: NewsArticle[] = [
  {
    id: 1,
    title: 'Hilbrick-Rockle LAW Law Expands Technology Practice with New Partner Hire',
    excerpt: 'Leading technology lawyer joins our growing practice to strengthen our capabilities in AI and data privacy.',
    content: `
      <p>We are pleased to announce that Sarah Chen has joined our firm as a Partner in the Technology Practice. 
      With over 15 years of experience in technology law, data privacy, and cybersecurity, Sarah brings exceptional 
      expertise to our expanding technology team.</p>
      
      <p>Sarah's arrival comes at a pivotal moment as our clients navigate increasingly complex issues surrounding 
      artificial intelligence, data protection regulations, and digital transformation initiatives. Her deep knowledge 
      in these areas will significantly enhance our ability to serve technology companies, startups, and enterprises 
      undergoing digital transformation.</p>
      
      <h2>Expanding Capabilities</h2>
      <p>Our Technology Practice has experienced rapid growth over the past three years, driven by increasing demand 
      for legal counsel in emerging technology sectors. The addition of Sarah Chen represents a strategic investment 
      in our practice areas, particularly in AI governance and data privacy compliance.</p>
      
      <h2>Experience and Background</h2>
      <p>Prior to joining Hilbrick-Rockle LAW, Sarah served as in-house counsel at a leading technology company, where she 
      managed complex data privacy programs and advised on international regulatory compliance. Her experience spans 
      across GDPR, CCPA, and other emerging data protection frameworks.</p>
      
      <p>We are thrilled to welcome Sarah to our team and look forward to the contributions she will make to our 
      clients and the firm."</p>
    `,
    category: 'Firm News',
    date: 'March 15, 2024',
    image: '/images/news/tech-practice.jpg',
    author: 'Communications Team',
    readTime: '3 min read',
    tags: ['Technology', 'Firm News', 'Hiring', 'Partnership'],
  },
  {
    id: 2,
    title: 'New Legal Framework for Sustainable Finance',
    excerpt: 'Our experts analyze the latest regulatory changes affecting sustainable finance and ESG investments.',
    content: `
      <p>The European Union has introduced significant new regulations affecting sustainable finance, marking a 
      major shift in how financial institutions and investors approach ESG compliance. Our ESG practice group 
      has analyzed the implications and is ready to guide clients through this evolving landscape.</p>
      
      <h2>Key Regulatory Changes</h2>
      <p>The new framework introduces stricter disclosure requirements for financial market participants, requiring 
      detailed reporting on how sustainability risks are integrated into investment decisions. This represents a 
      fundamental shift toward greater transparency in the financial sector.</p>
      
      <h2>Impact on Investment Decisions</h2>
      <p>Financial institutions must now conduct more rigorous due diligence on the sustainability characteristics 
      of their investments. This includes assessing adverse sustainability impacts and implementing comprehensive 
      screening processes.</p>
      
      <h2>Compliance Considerations</h2>
      <p>Firms operating in EU markets need to review and update their compliance programs to align with the new 
      requirements. This includes documentation, policies, and procedures that demonstrate adherence to sustainable 
      finance principles.</p>
    `,
    category: 'Publications',
    date: 'March 14, 2024',
    image: '/images/news/sustainable-finance.jpg',
    author: 'ESG Practice Group',
    readTime: '5 min read',
    tags: ['ESG', 'Finance', 'Regulation', 'Sustainability'],
  },
  // Add more articles as needed
];

const NewsDetailPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  // In a real app, fetch the article by ID from an API
  const article = newsArticles.find((a) => a.id === Number(id));

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
          <Link href="/news" className="text-blue-600 hover:underline">
            Return to News
          </Link>
        </div>
      </div>
    );
  }

  const relatedArticles = newsArticles.filter((a) => a.id !== article.id);

  return (
    <>
      <Head>
        <title>{article.title} | Hilbrick-Rockle LAW</title>
        <meta name="description" content={article.excerpt} />
      </Head>

      {/* Hero Section */}
      <section className="relative h-[60vh] bg-gradient-to-br from-blue-900 to-purple-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={article.image}
            alt={article.title}
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
              {article.category}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">{article.title}</h1>
            <div className="flex flex-wrap items-center gap-6 text-white/80">
              <div className="flex items-center">
                <FiCalendar className="mr-2" />
                {article.date}
              </div>
              <div className="flex items-center">
                <FiUser className="mr-2" />
                {article.author}
              </div>
              <div className="flex items-center">
                <FiClock className="mr-2" />
                {article.readTime}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
              >
                <FiTag className="mr-1" />
                {tag}
              </span>
            ))}
          </div>
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <FiShare2 className="mr-2" />
            Share
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </article>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedArticles.slice(0, 3).map((relatedArticle, index) => (
                <motion.article
                  key={relatedArticle.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <Link href={`/news/${relatedArticle.id}`}>
                    <div className="relative h-48">
                      <Image
                        src={relatedArticle.image}
                        alt={relatedArticle.title}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                    <div className="p-6">
                      <div className="text-sm text-gray-500 mb-2">{relatedArticle.date}</div>
                      <h3 className="text-xl font-bold mb-2 hover:text-blue-600 transition-colors">
                        {relatedArticle.title}
                      </h3>
                      <p className="text-gray-600 text-sm">{relatedArticle.excerpt}</p>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default NewsDetailPage;

