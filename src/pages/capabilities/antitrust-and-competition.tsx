import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Link from 'next/link';

const AntitrustCompetitionPage: React.FC = () => {
  const services = [
    { title: 'Merger & Acquisition Review', description: 'Navigate complex merger review processes with regulatory authorities worldwide' },
    { title: 'Cartel Defense', description: 'Comprehensive representation in cartel investigations and enforcement actions' },
    { title: 'Behavioral Compliance', description: 'Develop and implement antitrust compliance programs' },
    { title: 'Counseling & Advocacy', description: 'Strategic guidance on competition law matters' },
  ];

  return (
    <>
      <Head>
        <title>Antitrust &amp; Competition - Capabilities | H&amp;R LAW</title>
        <meta name="description" content="Expert antitrust and competition law services for mergers, cartels, and compliance." />
      </Head>
      <section className="relative h-[35vh] sm:h-[45vh] md:h-[50vh] bg-gradient-to-br from-indigo-900 to-purple-900 text-white">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-3xl">
            <Link href="/capabilities" className="text-sm sm:text-base text-indigo-200 hover:text-white mb-3 sm:mb-4 inline-block">← Back to Capabilities</Link>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">Antitrust &amp; Competition</h1>
            <p className="text-lg sm:text-xl text-indigo-100">Strategic counsel for complex antitrust matters and competition law compliance</p>
          </div>
        </div>
      </section>
      <section className="py-8 sm:py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Overview</h2>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3 sm:mb-4">Our Antitrust &amp; Competition practice provides comprehensive representation in complex competition law matters. We help clients navigate merger reviews, defend against investigations, and develop robust compliance programs.</p>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed">With deep experience across multiple jurisdictions, we deliver strategic solutions that protect our clients&apos; competitive interests while ensuring regulatory compliance.</p>
          </div>
        </div>
      </section>
      <section className="py-8 sm:py-12 lg:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 lg:mb-12 text-center">Our Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {services.map((service) => (
              <div key={service.title} className="bg-white rounded-lg shadow-md p-6 sm:p-8">
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">{service.title}</h3>
                <p className="text-sm sm:text-base text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Ready to Discuss Your Antitrust Matters?</h2>
          <p className="text-lg sm:text-xl mb-6 sm:mb-8 text-indigo-100">Contact our team for strategic counsel on competition law issues</p>
          <Link href="/contact" className="inline-block bg-white text-indigo-600 px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base rounded-lg hover:bg-indigo-50 transition-colors font-medium">Contact Us</Link>
        </div>
      </section>
    </>
  );
};

export default AntitrustCompetitionPage;


