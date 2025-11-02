import React, { useEffect } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import HeroSlideshow from '../components/HeroSlideshow';

const featuredNews = [
  {
    title: 'Leading the Future of Legal Innovation',
    category: 'Client Alert',
    description: 'Pioneering new approaches to legal services in the digital age.',
    image: '/images/innovation.jpg',
    href: '/news/legal-innovation'
  },
  {
    title: 'Sustainable Finance Initiative Launch',
    category: 'Resource',
    description: 'Driving sustainable development through innovative financial solutions.',
    image: '/images/sustainable-finance.jpg',
    href: '/news/sustainable-finance'
  },
  {
    title: 'Global Markets Outlook 2025',
    category: 'Report',
    description: 'Analysis of emerging trends and opportunities in global markets.',
    image: '/images/global-markets.jpg',
    href: '/news/global-markets'
  }
];

const recentDeals = [
  {
    title: 'Major Tech Acquisition',
    description: 'Advised on $5B cross-border technology sector acquisition',
    category: 'Technology M&A',
    image: '/images/tech-deal.jpg'
  },
  {
    title: 'Renewable Energy Project',
    description: 'Led $2B renewable energy infrastructure financing',
    category: 'Energy & Infrastructure',
    image: '/images/energy-project.jpg'
  },
  {
    title: 'Healthcare Innovation',
    description: 'Supported groundbreaking healthcare merger',
    category: 'Healthcare',
    image: '/images/healthcare-deal.jpg'
  }
];

const achievements = [
  {
    title: 'Law Firm of the Year',
    description: 'Recognized for excellence across multiple practice areas',
    source: 'Legal 500 2024'
  },
  {
    title: 'Most Innovative Law Firm',
    description: 'Leading innovation in legal services',
    source: 'Financial Times 2024'
  },
  {
    title: 'Top Global Law Firm',
    description: '#1 in cross-border transactions',
    source: 'Chambers Global 2024'
  }
];

const testimonials = [
  {
    quote: "A winning team with a truly global approach.",
    source: "Chambers Global 2024"
  },
  {
    quote: "Best in class when it comes to complex business strategies and market knowledge.",
    source: "Legal 500 2024"
  }
];

const HomePage: React.FC = () => {
  useEffect(() => {
    // Add scroll-based animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      });
    });

    document.querySelectorAll('.animate-on-scroll').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen">
      <Head>
        <title>HilbrickRockle - Global Law Firm</title>
        <meta name="description" content="HilbrickRockle is a global law firm providing comprehensive legal services across various practice areas." />
      </Head>

      {/* Hero Slideshow */}
      <HeroSlideshow />

      {/* Featured News Section */}
      <section className="py-8 sm:py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {featuredNews.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="group relative bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div className="relative h-48">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-4 sm:p-6">
                  <span className="text-xs sm:text-sm font-medium text-blue-600">
                    {item.category}
                  </span>
                  <h3 className="mt-2 text-lg sm:text-xl font-semibold text-gray-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm sm:text-base text-gray-600">
                    {item.description}
                  </p>
                  <Link
                    href={item.href}
                    className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-800"
                  >
                    Read More
                    <ChevronRightIcon className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Deals Section */}
      <section className="py-8 sm:py-12 lg:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 lg:mb-12">Recent Deals</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {recentDeals.map((deal, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div className="relative h-48">
                  <Image
                    src={deal.image}
                    alt={deal.title}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="p-4 sm:p-6">
                  <span className="text-xs sm:text-sm font-medium text-blue-600">
                    {deal.category}
                  </span>
                  <h3 className="mt-2 text-lg sm:text-xl font-semibold text-gray-900">
                    {deal.title}
                  </h3>
                  <p className="mt-2 text-sm sm:text-base text-gray-600">
                    {deal.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-8 sm:py-12 lg:py-16 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 lg:mb-12 text-center">Recognition & Achievements</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.2 }}
                className="text-center p-4 sm:p-6 rounded-lg bg-white/10 backdrop-blur-sm"
              >
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">{achievement.title}</h3>
                <p className="text-sm sm:text-base text-gray-300 mb-3 sm:mb-4">{achievement.description}</p>
                <span className="text-xs sm:text-sm font-medium text-blue-300">{achievement.source}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-8 sm:py-12 lg:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 lg:mb-12 text-center">What Others Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white p-6 sm:p-8 rounded-lg shadow-lg"
              >
                <blockquote className="text-lg sm:text-xl text-gray-900 italic mb-3 sm:mb-4">
                  "{testimonial.quote}"
                </blockquote>
                <cite className="text-sm sm:text-base text-gray-600 not-italic">— {testimonial.source}</cite>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8">Ready to Work Together?</h2>
          <Link
            href="/contact"
            className="inline-flex items-center px-6 sm:px-8 py-2 sm:py-3 border-2 border-white text-base sm:text-lg font-medium rounded-md text-white hover:bg-white hover:text-blue-800 transition-all duration-200"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 