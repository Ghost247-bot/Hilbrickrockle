import React, { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Link from 'next/link';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Check if response is ok before parsing
      const contentType = response.headers.get('content-type');
      let data;
      
      if (contentType && contentType.includes('application/json')) {
        try {
          data = await response.json();
        } catch (jsonError) {
          throw new Error('Invalid response from server');
        }
      } else {
        // If not JSON, read as text
        const text = await response.text();
        throw new Error(text || 'Failed to submit form');
      }

      if (!response.ok) {
        // Handle different error response formats
        let errorMessage = 'Failed to submit form';
        
        if (data.errors && Array.isArray(data.errors)) {
          errorMessage = data.errors.join(', ');
        } else if (data.error) {
          errorMessage = data.error;
        } else if (data.message) {
          errorMessage = data.message;
        } else if (data.details) {
          errorMessage = data.details;
        }
        
        throw new Error(errorMessage);
      }

      // Success response
      if (data.success) {
        setSubmitStatus('success');
        // Clear form
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
        });
      } else {
        throw new Error(data.message || 'Failed to submit form');
      }
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Failed to submit form');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const officeLocations = [
    {
      city: 'Lincoln',
      address: 'South 13th Street, Lincoln, Nebraska 68508',
      phone: '+1 (402) 906-1200',
      email: 'newyork@hilbrickrockle.pro',
    },
    {
      city: 'London',
      address: '99 Bishopsgate, London EC2M 3XF, United Kingdom',
      phone: '+44 20 7710 1000',
      email: 'london@hilbrickrockle.pro',
    },
    {
      city: 'Hong Kong',
      address: '29th Floor, One Taikoo Place, 979 King\'s Road, Hong Kong',
      phone: '+852 2522 7886',
      email: 'hongkong@hilbrickrockle.pro',
    },
  ];

  return (
    <>
      <Head>
        <title>Contact Us - HilbrickRockle</title>
        <meta name="description" content="Get in touch with HilbrickRockle. Find our office locations and contact information." />
      </Head>

      {/* Hero Section */}
      <section className="relative h-[35vh] sm:h-[45vh] md:h-[50vh] bg-gray-900 text-white">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover opacity-50"
            src="/images/contact/hero.jpg"
            alt="Contact Us"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">Contact Us</h1>
            <p className="text-lg sm:text-xl md:text-2xl">
              Get in touch with our team of legal professionals
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-8 sm:py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Send Us a Message</h2>

              {submitStatus === 'success' && (
                <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-green-50 border border-green-200 text-green-800 rounded-lg">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="text-sm sm:text-base font-semibold">Message Sent Successfully!</p>
                      <p className="text-xs sm:text-sm mt-1">Thank you for your message. We've received it and sent a confirmation email to your address. We will get back to you within 24-48 hours.</p>
                    </div>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-50 text-red-700 rounded-md text-sm sm:text-base">
                  {errorMessage}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div>
                  <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    required
                    disabled={isSubmitting}
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="legal">Legal Services</option>
                    <option value="careers">Careers</option>
                    <option value="media">Media Inquiry</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="mt-1 block w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <button
                  type="submit"
                  className={`w-full px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base rounded-md text-white transition-colors ${
                    isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-primary-600 hover:bg-primary-700'
                  }`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="mt-8 lg:mt-0"
            >
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Office Locations</h2>
              <div className="space-y-6 sm:space-y-8">
                {officeLocations.map((office, index) => (
                  <motion.div
                    key={office.city}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    className="bg-gray-50 p-4 sm:p-6 rounded-lg"
                  >
                    <h3 className="text-lg sm:text-xl font-bold mb-2">{office.city}</h3>
                    <p className="text-sm sm:text-base text-gray-600 mb-2">{office.address}</p>
                    <p className="text-sm sm:text-base text-gray-600 mb-2">Phone: {office.phone}</p>
                    <p className="text-sm sm:text-base text-gray-600">Email: {office.email}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-8 sm:py-12 lg:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Emergency Contact</h2>
          <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8">
            For urgent legal matters, please contact our 24/7 emergency hotline
          </p>
          <div className="max-w-md mx-auto">
            <a
              href="tel:+1-800-123-4567"
              className="inline-block bg-red-600 text-white px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base rounded-md hover:bg-red-700 transition-colors"
            >
              Emergency Hotline: 1-800-123-4567
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage; 