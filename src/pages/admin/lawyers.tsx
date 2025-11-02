import React, { useEffect, useState, ReactElement } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../../lib/supabase';
import AdminLayout from '../../components/admin/AdminLayout';
import type { NextPage } from 'next';

interface Lawyer {
  id: string;
  lawyer_id: string;
  name: string;
  email: string;
  phone: string | null;
  practice_areas: string[];
  bio: string | null;
  experience_years: number | null;
  status: string;
  created_at: string;
  updated_at: string;
}

const AdminLawyers: NextPage = () => {
  const router = useRouter();
  const [lawyers, setLawyers] = useState<Lawyer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingLawyer, setEditingLawyer] = useState<Lawyer | null>(null);
  const [formData, setFormData] = useState({
    lawyer_id: '',
    name: '',
    email: '',
    phone: '',
    practice_areas: '',
    bio: '',
    experience_years: '',
    status: 'active',
  });

  useEffect(() => {
    let isMounted = true;

    const fetchLawyers = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!isMounted) return;

        if (!session) {
          router.replace('/admin/login');
          return;
        }

        const token = session.access_token;
        const response = await fetch('/api/admin/lawyers', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!isMounted) return;

        if (!response.ok) {
          throw new Error('Failed to fetch lawyers');
        }

        const result = await response.json();
        if (result.success) {
          if (isMounted) {
            setLawyers(result.lawyers || []);
          }
        } else {
          throw new Error(result.error || 'Failed to fetch lawyers');
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
      fetchLawyers();
    }

    return () => {
      isMounted = false;
    };
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const token = session.access_token;
      const practiceAreasArray = formData.practice_areas
        .split(',')
        .map(area => area.trim())
        .filter(area => area.length > 0);

      const payload = {
        ...formData,
        practice_areas: practiceAreasArray,
        experience_years: formData.experience_years ? parseInt(formData.experience_years, 10) : null,
        phone: formData.phone || null,
        bio: formData.bio || null,
      };

      const url = '/api/admin/lawyers';
      const method = editingLawyer ? 'PATCH' : 'POST';
      const body = editingLawyer
        ? { id: editingLawyer.id, ...payload }
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
        throw new Error(result.error || 'Failed to save lawyer');
      }

      // Refresh lawyers list
      const { data: { session: newSession } } = await supabase.auth.getSession();
      if (newSession) {
        const refreshResponse = await fetch('/api/admin/lawyers', {
          headers: {
            Authorization: `Bearer ${newSession.access_token}`,
          },
        });
        const refreshResult = await refreshResponse.json();
        if (refreshResult.success) {
          setLawyers(refreshResult.lawyers || []);
        }
      }

      setShowModal(false);
      setEditingLawyer(null);
      resetForm();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to save lawyer');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this lawyer?')) {
      return;
    }

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const token = session.access_token;
      const response = await fetch(`/api/admin/lawyers?id=${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete lawyer');
      }

      // Refresh lawyers list
      setLawyers(prev => prev.filter(lawyer => lawyer.id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete lawyer');
    }
  };

  const handleEdit = (lawyer: Lawyer) => {
    setEditingLawyer(lawyer);
    setFormData({
      lawyer_id: lawyer.lawyer_id,
      name: lawyer.name,
      email: lawyer.email,
      phone: lawyer.phone || '',
      practice_areas: lawyer.practice_areas.join(', '),
      bio: lawyer.bio || '',
      experience_years: lawyer.experience_years?.toString() || '',
      status: lawyer.status,
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({
      lawyer_id: '',
      name: '',
      email: '',
      phone: '',
      practice_areas: '',
      bio: '',
      experience_years: '',
      status: 'active',
    });
    setEditingLawyer(null);
  };

  const statusColors = {
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-gray-100 text-gray-800',
  };

  return (
    <div className="space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Lawyers</h1>
            <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-600">Manage lawyer profiles</p>
          </div>
          <button
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
            className="w-full sm:w-auto px-3 sm:px-4 py-2 text-sm sm:text-base bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add Lawyer
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-gray-500">Loading lawyers...</div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800">Error: {error}</p>
          </div>
        ) : lawyers.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
            <p className="text-gray-500">No lawyers found</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <div className="inline-block min-w-full align-middle">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID
                      </th>
                      <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Practice Areas
                      </th>
                      <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Experience
                      </th>
                      <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {lawyers.map((lawyer) => (
                      <tr key={lawyer.id} className="hover:bg-gray-50">
                        <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium text-gray-900">
                          {lawyer.lawyer_id}
                        </td>
                        <td className="px-3 sm:px-6 py-3 sm:py-4">
                          <div className="text-xs sm:text-sm font-medium text-gray-900">{lawyer.name}</div>
                        </td>
                        <td className="px-3 sm:px-6 py-3 sm:py-4">
                          <div className="text-xs sm:text-sm text-gray-900">{lawyer.email}</div>
                          {lawyer.phone && (
                            <div className="text-xs sm:text-sm text-gray-500">{lawyer.phone}</div>
                          )}
                        </td>
                        <td className="px-3 sm:px-6 py-3 sm:py-4">
                          <div className="text-xs sm:text-sm text-gray-900">
                            {lawyer.practice_areas.join(', ')}
                          </div>
                        </td>
                        <td className="px-3 sm:px-6 py-3 sm:py-4">
                          <div className="text-xs sm:text-sm text-gray-900">
                            {lawyer.experience_years ? `${lawyer.experience_years} years` : 'N/A'}
                          </div>
                        </td>
                        <td className="px-3 sm:px-6 py-3 sm:py-4">
                          <span
                            className={`px-1.5 sm:px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              statusColors[lawyer.status as keyof typeof statusColors] || 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {lawyer.status}
                          </span>
                        </td>
                        <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium">
                          <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
                            <button
                              onClick={() => handleEdit(lawyer)}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(lawyer.id)}
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
                  {editingLawyer ? 'Edit Lawyer' : 'Add Lawyer'}
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
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Lawyer ID *</label>
                    <input
                      type="text"
                      value={formData.lawyer_id}
                      onChange={(e) => setFormData({ ...formData, lawyer_id: e.target.value })}
                      required
                      disabled={!!editingLawyer}
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                      placeholder="LAW-001"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Practice Areas *</label>
                  <input
                    type="text"
                    value={formData.practice_areas}
                    onChange={(e) => setFormData({ ...formData, practice_areas: e.target.value })}
                    required
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Corporate Law, M&A, Tax Law (comma-separated)"
                  />
                  <p className="mt-1 text-sm text-gray-500">Separate multiple areas with commas</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Experience (Years)</label>
                    <input
                      type="number"
                      value={formData.experience_years}
                      onChange={(e) => setFormData({ ...formData, experience_years: e.target.value })}
                      min="0"
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Bio</label>
                  <textarea
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    rows={4}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Lawyer biography and background..."
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
                    {editingLawyer ? 'Update' : 'Create'} Lawyer
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
  );
};

AdminLawyers.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default AdminLawyers;

