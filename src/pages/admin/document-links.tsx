import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../../lib/supabase';
import AdminLayout from '@/components/admin/AdminLayout';

interface DocumentLink {
  id: string;
  title: string;
  description: string | null;
  client_name: string | null;
  client_email: string | null;
  unique_token: string;
  document_url: string | null;
  uploaded_document_url: string | null;
  status: string;
  expires_at: string | null;
  created_at: string;
  updated_at: string;
  accessed_at: string | null;
  completed_at: string | null;
}

const AdminDocumentLinks = () => {
  const router = useRouter();
  const [documentLinks, setDocumentLinks] = useState<DocumentLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [total, setTotal] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [editingLink, setEditingLink] = useState<DocumentLink | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    client_name: '',
    client_email: '',
    password: '',
    document_url: '',
    expires_at: '',
  });

  useEffect(() => {
    let isMounted = true;

    const fetchDocumentLinks = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!isMounted) return;

        if (!session) {
          router.replace('/admin/login');
          return;
        }

        const token = session.access_token;
        const status = router.query.status as string || statusFilter;
        const url = status === 'all' 
          ? '/api/admin/document-links'
          : `/api/admin/document-links?status=${status}`;

        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!isMounted) return;

        if (!response.ok) {
          throw new Error('Failed to fetch document links');
        }

        const result = await response.json();
        if (result.success) {
          if (isMounted) {
            setDocumentLinks(result.documentLinks || []);
            setTotal(result.total || 0);
          }
        } else {
          throw new Error(result.error || 'Failed to fetch document links');
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'An error occurred');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    if (router.isReady) {
      fetchDocumentLinks();
    }

    return () => {
      isMounted = false;
    };
  }, [router, statusFilter]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const token = session.access_token;
      const payload = {
        ...formData,
        description: formData.description || null,
        client_name: formData.client_name || null,
        client_email: formData.client_email || null,
        document_url: formData.document_url || null,
        expires_at: formData.expires_at || null,
      };

      const url = '/api/admin/document-links';
      const method = editingLink ? 'PATCH' : 'POST';
      const body = editingLink
        ? { id: editingLink.id, ...payload }
        : payload;

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || 'Failed to save document link');
      }

      // Refresh document links list
      const { data: { session: newSession } } = await supabase.auth.getSession();
      if (newSession) {
        const refreshResponse = await fetch('/api/admin/document-links', {
          headers: {
            Authorization: `Bearer ${newSession.access_token}`,
          },
        });
        const refreshResult = await refreshResponse.json();
        if (refreshResult.success) {
          setDocumentLinks(refreshResult.documentLinks || []);
        }
      }

      setShowModal(false);
      setEditingLink(null);
      resetForm();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to save document link');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this document link?')) {
      return;
    }

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const token = session.access_token;
      const response = await fetch(`/api/admin/document-links?id=${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete document link');
      }

      // Refresh document links list
      setDocumentLinks(prev => prev.filter(link => link.id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete document link');
    }
  };

  const handleEdit = (link: DocumentLink) => {
    setEditingLink(link);
    setFormData({
      title: link.title,
      description: link.description || '',
      client_name: link.client_name || '',
      client_email: link.client_email || '',
      password: '', // Don't show password
      document_url: link.document_url || '',
      expires_at: link.expires_at ? new Date(link.expires_at).toISOString().slice(0, 16) : '',
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      client_name: '',
      client_email: '',
      password: '',
      document_url: '',
      expires_at: '',
    });
    setEditingLink(null);
  };

  const copyLink = (token: string) => {
    const link = `${window.location.origin}/document/${token}`;
    navigator.clipboard.writeText(link);
    alert('Link copied to clipboard!');
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    completed: 'bg-green-100 text-green-800',
    expired: 'bg-red-100 text-red-800',
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Document Links</h1>
            <p className="mt-2 text-gray-600">Manage secure document links for clients</p>
          </div>
          <button
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Create Link
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex gap-2">
            {['all', 'pending', 'completed', 'expired'].map((status) => (
              <button
                key={status}
                onClick={() => {
                  setStatusFilter(status);
                  router.push(status === 'all' ? '/admin/document-links' : `/admin/document-links?status=${status}`);
                }}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  statusFilter === status || (statusFilter === 'all' && status === 'all')
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-gray-500">Loading document links...</div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800">Error: {error}</p>
          </div>
        ) : documentLinks.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
            <p className="text-gray-500">No document links found</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Client
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Expires
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {documentLinks.map((link) => (
                    <tr key={link.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{link.title}</div>
                        {link.description && (
                          <div className="text-sm text-gray-500 mt-1">{link.description}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {link.client_name && (
                          <div className="text-sm text-gray-900">{link.client_name}</div>
                        )}
                        {link.client_email && (
                          <div className="text-sm text-gray-500">{link.client_email}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            statusColors[link.status as keyof typeof statusColors] || 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {link.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{formatDate(link.created_at)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{formatDate(link.expires_at)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex gap-2">
                          <button
                            onClick={() => copyLink(link.unique_token)}
                            className="text-blue-600 hover:text-blue-900"
                            title="Copy link"
                          >
                            📋
                          </button>
                          <button
                            onClick={() => handleEdit(link)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(link.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingLink ? 'Edit Document Link' : 'Create Document Link'}
                </h2>
                <button
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Document Title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Document description"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Client Name</label>
                    <input
                      type="text"
                      value={formData.client_name}
                      onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Client Name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Client Email</label>
                    <input
                      type="email"
                      value={formData.client_email}
                      onChange={(e) => setFormData({ ...formData, client_email: e.target.value })}
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="client@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Access Password {editingLink ? '(leave blank to keep current)' : '*'}
                  </label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required={!editingLink}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Password for document access"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Document URL</label>
                  <input
                    type="url"
                    value={formData.document_url}
                    onChange={(e) => setFormData({ ...formData, document_url: e.target.value })}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://example.com/document.pdf"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Expires At</label>
                  <input
                    type="datetime-local"
                    value={formData.expires_at}
                    onChange={(e) => setFormData({ ...formData, expires_at: e.target.value })}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      resetForm();
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    {editingLink ? 'Update' : 'Create'} Link
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminDocumentLinks;

