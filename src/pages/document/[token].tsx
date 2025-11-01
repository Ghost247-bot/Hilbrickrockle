import React, { useState, useCallback } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { 
  DocumentIcon, 
  LockClosedIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ArrowDownTrayIcon
} from '@heroicons/react/24/outline';
import { useDropzone } from 'react-dropzone';

export default function DocumentAccessPage() {
  const router = useRouter();
  const { token } = router.query;
  
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const [documentData, setDocumentData] = useState<any>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setUploadedFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'image/*': ['.png', '.jpg', '.jpeg'],
    },
    maxFiles: 1,
  });

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/document-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          action: 'verify',
          token,
          password 
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Authentication failed');
      }

      const data = await response.json();
      setDocumentData(data.link);
      setAuthenticated(true);
    } catch (error) {
      console.error('Error verifying password:', error);
      setError(error instanceof Error ? error.message : 'Invalid password');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async () => {
    if (!uploadedFile) {
      alert('Please select a file to upload');
      return;
    }

    setUploading(true);

    try {
      // For now, we'll simulate the upload by storing the file name
      // In a real implementation, you'd upload to a cloud storage service
      const uploadedUrl = `/uploads/${uploadedFile.name}`;
      
      const response = await fetch('/api/document-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          action: 'upload',
          token,
          uploaded_document_url: uploadedUrl
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Upload failed');
      }

      const data = await response.json();
      setDocumentData(data.link);
      alert('Document uploaded successfully!');
      setUploadedFile(null);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert(error instanceof Error ? error.message : 'Failed to upload document');
    } finally {
      setUploading(false);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <>
        <Head>
          <title>Secure Document Access</title>
        </Head>

        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full"
          >
            <div className="text-center mb-6">
              <div className="inline-block p-4 bg-blue-100 rounded-full mb-4">
                <LockClosedIcon className="w-12 h-12 text-blue-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Secure Document Access
              </h1>
              <p className="text-gray-600">
                Enter the password to access this document
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                <ExclamationTriangleIcon className="w-5 h-5 text-red-600 flex-shrink-0" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter password"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Verifying...' : 'Access Document'}
              </button>
            </form>
          </motion.div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{documentData?.title || 'Document'} - Secure Document</title>
      </Head>

      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            {documentData?.status === 'completed' && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                <CheckCircleIcon className="w-6 h-6 text-green-600 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-green-900">Document Completed</h3>
                  <p className="text-sm text-green-700">
                    This document has been signed and uploaded
                  </p>
                </div>
              </div>
            )}

            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {documentData?.title}
              </h1>
              {documentData?.description && (
                <p className="text-gray-600">{documentData.description}</p>
              )}
            </div>

            {documentData?.document_url && (
              <div className="mb-6">
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-3">
                    <DocumentIcon className="w-8 h-8 text-blue-600" />
                    <div>
                      <p className="font-medium text-gray-900">Document Available</p>
                      <p className="text-sm text-gray-600">{documentData.document_url}</p>
                    </div>
                  </div>
                  <a
                    href={documentData.document_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
                  >
                    <ArrowDownTrayIcon className="w-4 h-4" />
                    Download
                  </a>
                </div>
              </div>
            )}

            {documentData?.uploaded_document_url && (
              <div className="mb-6">
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-3">
                    <CheckCircleIcon className="w-8 h-8 text-green-600" />
                    <div>
                      <p className="font-medium text-gray-900">Uploaded Document</p>
                      <p className="text-sm text-gray-600">Document has been uploaded</p>
                    </div>
                  </div>
                  <a
                    href={documentData.uploaded_document_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-2"
                  >
                    <ArrowDownTrayIcon className="w-4 h-4" />
                    Download
                  </a>
                </div>
              </div>
            )}

            {documentData?.status !== 'completed' && (
              <div className="mt-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Upload Signed Document
                </h2>
                
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
                    <p className="text-blue-600 font-medium">Drop the file here...</p>
                  ) : uploadedFile ? (
                    <div>
                      <p className="text-gray-900 font-medium">{uploadedFile.name}</p>
                      <p className="text-sm text-gray-600 mt-2">
                        {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  ) : (
                    <>
                      <p className="text-gray-600 mb-2">
                        Drag and drop your signed document here, or click to select
                      </p>
                      <p className="text-sm text-gray-500">
                        PDF, DOC, DOCX, PNG, JPG (Max 10MB)
                      </p>
                    </>
                  )}
                </div>

                {uploadedFile && (
                  <div className="mt-4">
                    <button
                      onClick={handleFileUpload}
                      disabled={uploading}
                      className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {uploading ? 'Uploading...' : 'Upload Document'}
                    </button>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </>
  );
}

