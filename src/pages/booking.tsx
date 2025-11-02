import React, { useState, useCallback, useEffect } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { 
  CalendarIcon, 
  DocumentIcon, 
  XMarkIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  practiceArea: string;
  lawyerId: string;
  message: string;
}

interface Lawyer {
  lawyer_id: string;
  name: string;
  practice_areas: string | string[]; // Can be string (comma-separated) or array
  bio?: string;
  experience_years?: number;
  title?: string;
  image_url?: string;
  ref_code?: string;
}

interface UploadedFile {
  file: File;
  id: string;
}

const BookingPage: React.FC = () => {
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    practiceArea: '',
    lawyerId: '',
    message: '',
  });

  const [lawyers, setLawyers] = useState<Lawyer[]>([]);
  const [loadingLawyers, setLoadingLawyers] = useState(true);
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch available lawyers
  useEffect(() => {
    const fetchLawyers = async () => {
      try {
        console.log('Fetching lawyers from /api/lawyers...');
        
        // Use absolute URL to avoid issues
        const apiUrl = '/api/lawyers';
        
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          redirect: 'manual', // Don't follow redirects automatically
        });
        
        console.log('Response status:', response.status);
        console.log('Response URL:', response.url);
        console.log('Response type:', response.type);
        
        // Check for redirect status codes
        if (response.status >= 300 && response.status < 400) {
          console.error('Redirect detected:', response.status);
          setErrorMessage('Server redirect detected. This may indicate a configuration issue.');
          setLoadingLawyers(false);
          return;
        }
        
        if (!response.ok) {
          // Try to get error message from response
          const contentType = response.headers.get('content-type');
          let errorData;
          
          if (contentType && contentType.includes('application/json')) {
            try {
              errorData = await response.json();
            } catch (e) {
              errorData = { error: `HTTP ${response.status}: ${response.statusText}` };
            }
          } else {
            const text = await response.text();
            errorData = { error: text || `HTTP ${response.status}: ${response.statusText}` };
          }
          
          console.error('Error response:', errorData);
          
          // For 500 errors, show user-friendly message
          if (response.status === 500) {
            const userMessage = errorData.message || errorData.error || 'Database configuration issue';
            setErrorMessage(`${userMessage}. Lawyer selection is optional - you can still proceed with your booking.`);
          } else {
            setErrorMessage(errorData.message || errorData.error || 'Failed to load lawyer list. Lawyer selection is optional - you can still proceed with your booking.');
          }
        } else {
          // Check content-type for successful response too
          const contentType = response.headers.get('content-type');
          let data;
          
          if (contentType && contentType.includes('application/json')) {
            try {
              data = await response.json();
            } catch (jsonError) {
              console.error('Failed to parse JSON response:', jsonError);
              setErrorMessage('Invalid response from server. Lawyer selection is optional - you can still proceed with your booking.');
              setLoadingLawyers(false);
              return;
            }
          } else {
            console.error('Non-JSON response received');
            setErrorMessage('Unexpected response format. Lawyer selection is optional - you can still proceed with your booking.');
            setLoadingLawyers(false);
            return;
          }
          console.log('Lawyers data received:', data);
          console.log('Number of lawyers:', data.lawyers?.length || 0);
          
          // Transform practice_areas from string to array if needed
          const processedLawyers = (data.lawyers || []).map((lawyer: Lawyer) => ({
            ...lawyer,
            practice_areas: Array.isArray(lawyer.practice_areas) 
              ? lawyer.practice_areas 
              : typeof lawyer.practice_areas === 'string' && lawyer.practice_areas.trim()
                ? lawyer.practice_areas.split(',').map(area => area.trim()).filter(area => area.length > 0)
                : []
          }));
          
          setLawyers(processedLawyers);
          if (processedLawyers.length === 0 && data.lawyers?.length === 0) {
            console.warn('No lawyers returned from API');
            setErrorMessage('No lawyers available in the database. Please contact support or try again later.');
          } else {
            setErrorMessage(''); // Clear any previous errors if we got lawyers
          }
        }
      } catch (error) {
        console.error('Error fetching lawyers:', error);
        if (error instanceof TypeError && error.message === 'Failed to fetch') {
          setErrorMessage('Unable to connect to the server. Please check if the development server is running and try again.');
        } else {
          setErrorMessage(error instanceof Error ? error.message : 'Network error. Please check your connection and try again.');
        }
      } finally {
        setLoadingLawyers(false);
      }
    };
    fetchLawyers();
  }, []);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map(file => ({
      file,
      id: Math.random().toString(36).substring(7),
    }));
    setFiles(prev => [...prev, ...newFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'image/*': ['.png', '.jpg', '.jpeg'],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
  });

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    // Validate required fields
    if (!formData.name || !formData.email || !formData.date || !formData.time || !formData.practiceArea) {
      setSubmitStatus('error');
      setErrorMessage('Please fill in all required fields');
      setIsSubmitting(false);
      return;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSubmitStatus('error');
      setErrorMessage('Please enter a valid email address');
      setIsSubmitting(false);
      return;
    }

    try {
      // Create FormData for file upload
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone || '');
      formDataToSend.append('date', formData.date);
      formDataToSend.append('time', formData.time);
      formDataToSend.append('practiceArea', formData.practiceArea);
      formDataToSend.append('lawyerId', formData.lawyerId);
      formDataToSend.append('message', formData.message || '');

      // Append files
      files.forEach((fileObj, index) => {
        formDataToSend.append(`file_${index}`, fileObj.file);
      });

      const response = await fetch('/api/booking', {
        method: 'POST',
        body: formDataToSend,
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
        // If not JSON, read as text to get error message
        const text = await response.text();
        throw new Error(text || 'Failed to submit booking');
      }

      if (!response.ok) {
        // Show more detailed error if available
        const errorMsg = data.details 
          ? `${data.error || data.message}: ${data.details}`
          : (data.error || data.message || data.errors?.join(', ') || 'Failed to submit booking');
        throw new Error(errorMsg);
      }

      setSubmitStatus('success');
      // Clear form
      setFormData({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        practiceArea: '',
        lawyerId: '',
        message: '',
      });
      setFiles([]);
    } catch (error) {
      console.error('Error submitting booking:', error);
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Failed to submit booking');
    } finally {
      setIsSubmitting(false);
    }
  };

  const practiceAreas = [
    'Corporate Law',
    'Mergers & Acquisitions',
    'Real Estate',
    'Tax Law',
    'Employment Law',
    'Litigation',
    'Intellectual Property',
    'Other',
  ];

  // Get minimum date (today)
  const today = new Date().toISOString().split('T')[0];

  return (
    <>
      <Head>
        <title>Book an Appointment - Hilbrick&Rockle</title>
        <meta name="description" content="Schedule a consultation with our legal experts. Book your appointment today." />
      </Head>

      {/* Hero Section */}
      <section className="relative h-[40vh] bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Book an Appointment</h1>
            <p className="text-xl text-blue-100">
              Schedule a consultation with our legal experts. We're here to help with your legal needs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-900">Appointment Details</h2>

            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3"
              >
                <CheckCircleIcon className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-green-900 mb-1">Booking Submitted Successfully!</h3>
                  <p className="text-green-700 text-sm">
                    We've received your appointment request. You will receive a confirmation email shortly with your booking details.
                  </p>
                </div>
              </motion.div>
            )}

            {submitStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3"
              >
                <ExclamationTriangleIcon className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-red-900 mb-1">Error Submitting Booking</h3>
                  <p className="text-red-700 text-sm">{errorMessage}</p>
                </div>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              {/* Appointment Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    min={today}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Time <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="time"
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="practiceArea" className="block text-sm font-medium text-gray-700 mb-2">
                    Practice Area <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="practiceArea"
                    name="practiceArea"
                    value={formData.practiceArea}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select an area</option>
                    {practiceAreas.map((area) => (
                      <option key={area} value={area}>
                        {area}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Lawyer Selection */}
              <div>
                <label htmlFor="lawyerId" className="block text-sm font-medium text-gray-700 mb-2">
                  Select Lawyer <span className="text-gray-500 text-xs">(Optional)</span>
                </label>
                {loadingLawyers ? (
                  <div className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span className="text-gray-600">Loading lawyers...</span>
                  </div>
                ) : errorMessage && lawyers.length === 0 ? (
                  <div className="w-full px-4 py-3 border border-red-300 rounded-lg bg-red-50">
                    <p className="text-sm text-red-700">
                      {errorMessage || 'No lawyers available at the moment. You can still proceed with the booking.'}
                    </p>
                  </div>
                ) : lawyers.length === 0 ? (
                  <div className="w-full px-4 py-3 border border-orange-300 rounded-lg bg-orange-50">
                    <p className="text-sm text-orange-700">
                      No lawyers available at the moment. You can still proceed with the booking.
                    </p>
                  </div>
                ) : (
                  <select
                    id="lawyerId"
                    name="lawyerId"
                    value={formData.lawyerId}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select a lawyer</option>
                    {lawyers.map((lawyer) => {
                      const practiceAreas = Array.isArray(lawyer.practice_areas) 
                        ? lawyer.practice_areas 
                        : typeof lawyer.practice_areas === 'string' && lawyer.practice_areas.trim()
                          ? lawyer.practice_areas.split(',').map(area => area.trim()).filter(area => area.length > 0)
                          : [];
                      
                      return (
                        <option key={lawyer.lawyer_id} value={lawyer.lawyer_id}>
                          {lawyer.name}
                          {lawyer.title && ` - ${lawyer.title}`}
                          {practiceAreas.length > 0 && ` (${practiceAreas.join(', ')})`}
                        </option>
                      );
                    })}
                  </select>
                )}
                {formData.lawyerId && lawyers.find(l => l.lawyer_id === formData.lawyerId) && (() => {
                  const selectedLawyer = lawyers.find(l => l.lawyer_id === formData.lawyerId);
                  const practiceAreas = selectedLawyer ? (
                    Array.isArray(selectedLawyer.practice_areas) 
                      ? selectedLawyer.practice_areas 
                      : typeof selectedLawyer.practice_areas === 'string' && selectedLawyer.practice_areas.trim()
                        ? selectedLawyer.practice_areas.split(',').map(area => area.trim()).filter(area => area.length > 0)
                        : []
                  ) : [];
                  
                  return (
                    <div className="mt-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-sm font-medium text-blue-900">
                        {selectedLawyer?.name}
                        {selectedLawyer?.title && `, ${selectedLawyer.title}`}
                      </p>
                      {practiceAreas.length > 0 && (
                        <p className="text-xs text-blue-700 mt-1">
                          Practice Areas: {practiceAreas.join(', ')}
                        </p>
                      )}
                      {selectedLawyer?.bio && (
                        <p className="text-xs text-blue-700 mt-1">
                          {selectedLawyer.bio}
                        </p>
                      )}
                      {selectedLawyer?.experience_years && (
                        <p className="text-xs text-blue-600 mt-1">
                          {selectedLawyer.experience_years} years of experience
                        </p>
                      )}
                    </div>
                  );
                })()}
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Information
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Please provide any additional details about your legal matter..."
                />
              </div>

              {/* Document Upload Section */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Documents (Optional)
                </label>
                <p className="text-sm text-gray-500 mb-4">
                  You can upload relevant documents such as contracts, agreements, or other legal documents.
                  Supported formats: PDF, DOC, DOCX, PNG, JPG (Max 10MB per file)
                </p>

                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                    isDragActive
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
                  }`}
                >
                  <input {...getInputProps()} />
                  <DocumentIcon className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  {isDragActive ? (
                    <p className="text-blue-600 font-medium">Drop the files here...</p>
                  ) : (
                    <>
                      <p className="text-gray-600 mb-2">
                        Drag and drop files here, or click to select files
                      </p>
                      <p className="text-sm text-gray-500">
                        PDF, DOC, DOCX, PNG, JPG (Max 10MB)
                      </p>
                    </>
                  )}
                </div>

                {/* Uploaded Files List */}
                {files.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <p className="text-sm font-medium text-gray-700">
                      Uploaded Files ({files.length})
                    </p>
                    {files.map((fileObj) => (
                      <div
                        key={fileObj.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <DocumentIcon className="w-5 h-5 text-blue-600 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {fileObj.file.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {(fileObj.file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(fileObj.id)}
                          className="ml-4 p-1 text-red-600 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
                        >
                          <XMarkIcon className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full md:w-auto px-3 py-1.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-medium rounded-md hover:from-blue-700 hover:to-blue-800 transition-all shadow hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1"
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-3 w-3 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <span className="text-xs">Submitting...</span>
                    </>
                  ) : (
                    <>
                      <CalendarIcon className="w-3 h-3" />
                      <span className="text-xs">Book Appointment</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Information Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CalendarIcon className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Flexible Scheduling</h3>
              <p className="text-gray-600 text-sm">
                Choose a date and time that works best for you
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <DocumentIcon className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Document Review</h3>
              <p className="text-gray-600 text-sm">
                Upload relevant documents for our team to review
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircleIcon className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Quick Confirmation</h3>
              <p className="text-gray-600 text-sm">
                Receive instant email confirmation of your booking
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BookingPage;

