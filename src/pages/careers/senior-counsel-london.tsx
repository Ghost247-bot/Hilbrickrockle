import React, { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { DocumentTextIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

const SeniorCounselPage: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    resume: '',
    coverLetter: '',
    linkedinUrl: '',
    portfolioUrl: '',
    yearsOfExperience: '',
    availability: '',
    additionalInfo: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setFormData(prev => ({
          ...prev,
          resume: base64String
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('/api/careers/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          position: 'Senior Counsel',
          location: 'London, UK',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit application');
      }

      if (data.success) {
        setSubmitStatus('success');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          resume: '',
          coverLetter: '',
          linkedinUrl: '',
          portfolioUrl: '',
          yearsOfExperience: '',
          availability: '',
          additionalInfo: '',
        });
      } else {
        throw new Error(data.message || 'Failed to submit application');
      }
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Failed to submit application');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Apply: Senior Counsel - London, UK | HilbrickRockle</title>
        <meta name="description" content="Apply for the Senior Counsel position in Litigation at HilbrickRockle in London, UK." />
      </Head>

      {/* Hero Section */}
      <section className="relative h-[40vh] bg-gradient-to-br from-indigo-900 via-indigo-800 to-indigo-900 text-white">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-2 mb-4 text-indigo-200">
              <Link href="/careers" className="hover:text-white transition-colors">
                Careers
              </Link>
              <span>/</span>
              <span>Senior Counsel</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Senior Counsel</h1>
            <p className="text-xl text-indigo-100">Litigation • London, UK • Full-time</p>
          </motion.div>
        </div>
      </section>

      {/* Job Description */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Job Description</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-4">
                We are seeking an experienced Senior Counsel to join our Litigation practice in London. 
                The ideal candidate will have a proven track record in complex commercial litigation, 
                international arbitration, and regulatory investigations. You will work on high-stakes matters 
                and have the opportunity to lead case teams and mentor junior associates.
              </p>
              
              <h3 className="text-xl font-bold mt-8 mb-4 text-gray-900">Key Responsibilities</h3>
              <ul className="list-disc pl-6 mb-6 text-gray-600 space-y-2">
                <li>Lead complex commercial litigation matters and arbitration proceedings</li>
                <li>Manage case strategy and client relationships</li>
                <li>Draft pleadings, motions, and other court documents</li>
                <li>Conduct depositions and examinations</li>
                <li>Supervise and mentor junior associates</li>
                <li>Represent clients in negotiations and mediations</li>
              </ul>

              <h3 className="text-xl font-bold mt-8 mb-4 text-gray-900">Qualifications</h3>
              <ul className="list-disc pl-6 mb-6 text-gray-600 space-y-2">
                <li>Qualified solicitor or barrister in England & Wales</li>
                <li>7+ years of experience in commercial litigation</li>
                <li>Strong track record in complex dispute resolution</li>
                <li>Experience in international arbitration preferred</li>
                <li>Excellent advocacy and negotiation skills</li>
                <li>Proven ability to manage large-scale litigation</li>
              </ul>

              <h3 className="text-xl font-bold mt-8 mb-4 text-gray-900">Benefits</h3>
              <ul className="list-disc pl-6 mb-6 text-gray-600 space-y-2">
                <li>Competitive compensation package</li>
                <li>Opportunity to work on high-profile international cases</li>
                <li>Professional development and partnership track</li>
                <li>Comprehensive health and wellness benefits</li>
                <li>Flexible working arrangements</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-lg shadow-lg p-8"
          >
            <h2 className="text-3xl font-bold mb-8 text-gray-900">Application Form</h2>

            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-800 rounded-lg flex items-start gap-3">
                <CheckCircleIcon className="w-6 h-6 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Application Submitted Successfully!</p>
                  <p className="text-sm mt-1">Thank you for your application. We've received it and will review it carefully. We'll get back to you within 5-7 business days.</p>
                </div>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-800 rounded-lg flex items-start gap-3">
                <XCircleIcon className="w-6 h-6 text-red-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Error Submitting Application</p>
                  <p className="text-sm mt-1">{errorMessage}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="yearsOfExperience" className="block text-sm font-medium text-gray-700 mb-2">
                  Years of Experience
                </label>
                <select
                  id="yearsOfExperience"
                  name="yearsOfExperience"
                  value={formData.yearsOfExperience}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  disabled={isSubmitting}
                >
                  <option value="">Select experience level</option>
                  <option value="5-7">5-7 years</option>
                  <option value="7-10">7-10 years</option>
                  <option value="10-15">10-15 years</option>
                  <option value="15+">15+ years</option>
                </select>
              </div>

              <div>
                <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-2">
                  Resume (PDF) <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  id="resume"
                  name="resume"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  disabled={isSubmitting}
                />
                <p className="mt-1 text-sm text-gray-500">Accepted formats: PDF, DOC, DOCX (Max 10MB)</p>
              </div>

              <div>
                <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700 mb-2">
                  Cover Letter
                </label>
                <textarea
                  id="coverLetter"
                  name="coverLetter"
                  value={formData.coverLetter}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Tell us about your litigation experience and why you're interested in this position..."
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label htmlFor="linkedinUrl" className="block text-sm font-medium text-gray-700 mb-2">
                  LinkedIn Profile URL
                </label>
                <input
                  type="url"
                  id="linkedinUrl"
                  name="linkedinUrl"
                  value={formData.linkedinUrl}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="https://linkedin.com/in/yourprofile"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label htmlFor="portfolioUrl" className="block text-sm font-medium text-gray-700 mb-2">
                  Portfolio/Website URL
                </label>
                <input
                  type="url"
                  id="portfolioUrl"
                  name="portfolioUrl"
                  value={formData.portfolioUrl}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="https://yourwebsite.com"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label htmlFor="availability" className="block text-sm font-medium text-gray-700 mb-2">
                  Availability
                </label>
                <input
                  type="text"
                  id="availability"
                  name="availability"
                  value={formData.availability}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="e.g., Available immediately, 2 weeks notice, etc."
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Information
                </label>
                <textarea
                  id="additionalInfo"
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Any additional information you'd like to share..."
                  disabled={isSubmitting}
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </button>
                <Link
                  href="/careers"
                  className="px-6 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </Link>
              </div>
            </form>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default SeniorCounselPage;

