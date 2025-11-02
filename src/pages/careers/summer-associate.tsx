import React, { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { DocumentTextIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

const SummerAssociatePage: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    resume: '',
    coverLetter: '',
    linkedinUrl: '',
    portfolioUrl: '',
    lawSchool: '',
    graduationYear: '',
    preferredLocation: '',
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
          position: 'Summer Associate Program',
          location: 'Multiple Locations',
          yearsOfExperience: formData.graduationYear,
          additionalInfo: `Law School: ${formData.lawSchool}\nGraduation Year: ${formData.graduationYear}\nPreferred Location: ${formData.preferredLocation}\n\nAdditional Info:\n${formData.additionalInfo || 'N/A'}`,
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
          lawSchool: '',
          graduationYear: '',
          preferredLocation: '',
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
        <title>Apply: Summer Associate Program | HilbrickRockle</title>
        <meta name="description" content="Apply for the Summer Associate Program at HilbrickRockle. Multiple locations available." />
      </Head>

      {/* Hero Section */}
      <section className="relative h-[40vh] bg-gradient-to-br from-indigo-900 via-indigo-800 to-indigo-900 text-white mt-16">
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
              <span>Summer Associate Program</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Summer Associate Program</h1>
            <p className="text-xl text-indigo-100">Recruiting • Multiple Locations • Internship</p>
          </motion.div>
        </div>
      </section>

      {/* Program Description */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Program Overview</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-4">
                Our Summer Associate Program offers law students an exceptional opportunity to gain hands-on 
                experience in a top-tier law firm environment. As a summer associate, you'll work alongside 
                experienced attorneys on real client matters, participate in professional development programs, 
                and receive mentorship to help launch your legal career.
              </p>
              
              <h3 className="text-xl font-bold mt-8 mb-4 text-gray-900">Program Highlights</h3>
              <ul className="list-disc pl-6 mb-6 text-gray-600 space-y-2">
                <li>10-week paid summer program (May-August)</li>
                <li>Work on substantive legal projects across multiple practice areas</li>
                <li>Attend client meetings and court proceedings</li>
                <li>Participate in training sessions and workshops</li>
                <li>Receive mentorship from partners and senior associates</li>
                <li>Network with attorneys and fellow summer associates</li>
                <li>Potential for full-time associate position upon graduation</li>
              </ul>

              <h3 className="text-xl font-bold mt-8 mb-4 text-gray-900">Eligibility</h3>
              <ul className="list-disc pl-6 mb-6 text-gray-600 space-y-2">
                <li>Currently enrolled in an accredited law school</li>
                <li>Strong academic performance (top 25% of class preferred)</li>
                <li>Completed at least one year of law school</li>
                <li>Demonstrated interest in one or more of our practice areas</li>
                <li>Excellent writing and analytical skills</li>
                <li>Strong interpersonal and communication abilities</li>
              </ul>

              <h3 className="text-xl font-bold mt-8 mb-4 text-gray-900">Locations</h3>
              <p className="text-gray-600 mb-4">
                Summer associate positions are available in the following offices:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-600 space-y-2">
                <li>Lincoln, Nebraska</li>
                <li>London, UK</li>
                <li>Los Angeles, CA</li>
                <li>Singapore</li>
                <li>Hong Kong</li>
              </ul>

              <h3 className="text-xl font-bold mt-8 mb-4 text-gray-900">Compensation & Benefits</h3>
              <ul className="list-disc pl-6 mb-6 text-gray-600 space-y-2">
                <li>Competitive summer associate salary</li>
                <li>Networking and social events</li>
                <li>Professional development opportunities</li>
                <li>Access to firm resources and training materials</li>
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="lawSchool" className="block text-sm font-medium text-gray-700 mb-2">
                    Law School <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="lawSchool"
                    name="lawSchool"
                    value={formData.lawSchool}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Name of your law school"
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label htmlFor="graduationYear" className="block text-sm font-medium text-gray-700 mb-2">
                    Expected Graduation Year <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="graduationYear"
                    name="graduationYear"
                    value={formData.graduationYear}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="e.g., 2025"
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="preferredLocation" className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Office Location
                </label>
                <select
                  id="preferredLocation"
                  name="preferredLocation"
                  value={formData.preferredLocation}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  disabled={isSubmitting}
                >
                  <option value="">Select preferred location</option>
                  <option value="Lincoln, Nebraska">Lincoln, Nebraska</option>
                  <option value="London, UK">London, UK</option>
                  <option value="Los Angeles, CA">Los Angeles, CA</option>
                  <option value="Singapore">Singapore</option>
                  <option value="Hong Kong">Hong Kong</option>
                  <option value="No Preference">No Preference</option>
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
                  placeholder="Tell us why you're interested in our Summer Associate Program and what you hope to gain from the experience..."
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
                <label htmlFor="availability" className="block text-sm font-medium text-gray-700 mb-2">
                  Availability (if known)
                </label>
                <input
                  type="text"
                  id="availability"
                  name="availability"
                  value={formData.availability}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="e.g., Available May-August 2024"
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
                  placeholder="Any additional information you'd like to share (academic achievements, relevant experience, etc.)..."
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

export default SummerAssociatePage;

