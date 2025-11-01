import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

const AerospaceAndDefensePage: React.FC = () => {
  const services = [
    { title: 'Strategic Counsel', description: 'Comprehensive legal guidance tailored to your business needs' },
    { title: 'Regulatory Compliance', description: 'Navigate complex regulatory requirements and compliance' },
    { title: 'Risk Management', description: 'Identify and mitigate legal and business risks' },
    { title: 'Business Development', description: 'Support growth strategies and market expansion' },
  ];

  return (
    <>
      <Head>
        <title>Aerospace & Defense - Capabilities | Hilbrick-Rockle LAW</title>
        <meta name="description" content="Legal services for aerospace and defense industries" />
      </Head>
      <section className="relative h-[50vh] bg-gradient-to-br from-blue-900 to-indigo-900 text-white">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-3xl">
            <Link href="/capabilities" className="text-blue-200 hover:text-white mb-4 inline-block">← Back to Capabilities</Link>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Aerospace & Defense</h1>
            <p className="text-xl text-blue-100">Strategic legal counsel and representation</p>
          </div>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold mb-6">Overview</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">Our Aerospace & Defense practice provides comprehensive legal representation for clients across various industries and jurisdictions.</p>
            <p className="text-lg text-gray-700 leading-relaxed">We combine deep industry knowledge with strategic legal counsel to help clients achieve their business objectives while managing legal risk effectively.</p>
          </div>
        </div>
      </section>
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service) => (
              <div key={service.title} className="bg-white rounded-lg shadow-md p-8">
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 text-blue-100">Contact our team to discuss how we can help with your legal needs</p>
          <Link href="/contact" className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors font-medium">Contact Us</Link>
        </div>
      </section>
    </>
  );
};

export default AerospaceAndDefensePage;
