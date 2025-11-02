import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../../lib/supabase';
import AdminLayout from '@/components/admin/AdminLayout';

interface JobApplication {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  position: string;
  location: string;
  resume: string | null;
  cover_letter: string | null;
  linkedin_url: string | null;
  portfolio_url: string | null;
  years_of_experience: string | null;
  availability: string | null;
  additional_info: string | null;
  status: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

const AdminJobApplications = () => {
  const router = useRouter();
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [positionFilter, setPositionFilter] = useState<string>('all');
  const [total, setTotal] = useState(0);
  const [selectedApplication, setSelectedApplication] = useState<JobApplication | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    let isMounted = true;

    const fetchApplications = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!isMounted) return;

        if (!session) {
          router.replace('/admin/login');
          return;
        }

        const token = session.access_token;
        const params = new URLSearchParams();
        if (statusFilter !== 'all') {
          params.append('status', statusFilter);
        }
        if (positionFilter !== 'all') {
          params.append('position', positionFilter);
        }

        const response = await fetch(`/api/admin/job-applications?${params.toString()}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!isMounted) return;

        if (!response.ok) {
          throw new Error('Failed to fetch job applications');
        }

        const result = await response.json();
        if (result.success) {
          if (isMounted) {
            setApplications(result.applications || []);
            setTotal(result.total || 0);
          }
        } else {
          throw new Error(result.error || 'Failed to fetch job applications');
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

    fetchApplications();

    return () => {
      isMounted = false;
    };
  }, [router, statusFilter, positionFilter]);

  const handleStatusChange = async (id: string, newStatus: string) => {
    setUpdatingStatus(id);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const token = session.access_token;
      const response = await fetch('/api/admin/job-applications', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id,
          status: newStatus,
          notes: notes || null,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      // Refresh applications
      const params = new URLSearchParams();
      if (statusFilter !== 'all') params.append('status', statusFilter);
      if (positionFilter !== 'all') params.append('position', positionFilter);

      const refreshResponse = await fetch(`/api/admin/job-applications?${params.toString()}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const refreshResult = await refreshResponse.json();
      if (refreshResult.success) {
        setApplications(refreshResult.applications || []);
        setTotal(refreshResult.total || 0);
        if (selectedApplication) {
          const updated = refreshResult.applications.find((a: JobApplication) => a.id === selectedApplication.id);
          if (updated) setSelectedApplication(updated);
        }
      }

      setUpdatingStatus(null);
      setNotes('');
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to update status');
      setUpdatingStatus(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'reviewed':
        return 'bg-blue-100 text-blue-800';
      case 'interviewed':
        return 'bg-purple-100 text-purple-800';
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const positions = [
    'Associate Attorney',
    'Senior Counsel',
    'Legal Operations Manager',
    'Summer Associate Program',
  ];

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Loading job applications...</div>
        </div>
      </AdminLayout>
    );
  }

  if (error && !applications.length) {
    return (
      <AdminLayout>
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          Error: {error}
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Job Applications</h1>
          <div className="text-gray-600">Total: {total}</div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="reviewed">Reviewed</option>
              <option value="interviewed">Interviewed</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Position
            </label>
            <select
              value={positionFilter}
              onChange={(e) => setPositionFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="all">All Positions</option>
              {positions.map((pos) => (
                <option key={pos} value={pos}>
                  {pos}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Applications List */}
        {applications.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
            No job applications found.
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applicant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Position
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Experience
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applied
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {applications.map((app) => (
                  <tr key={app.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {app.first_name} {app.last_name}
                      </div>
                      <div className="text-sm text-gray-500">{app.email}</div>
                      {app.phone && (
                        <div className="text-sm text-gray-500">{app.phone}</div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{app.position}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{app.location}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {app.years_of_experience || 'N/A'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                          app.status
                        )}`}
                      >
                        {app.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(app.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => {
                          setSelectedApplication(app);
                          setShowDetailsModal(true);
                          setNotes(app.notes || '');
                        }}
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Details Modal */}
        {showDetailsModal && selectedApplication && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {selectedApplication.first_name} {selectedApplication.last_name}
                    </h2>
                    <p className="text-gray-600 mt-1">{selectedApplication.email}</p>
                  </div>
                  <button
                    onClick={() => {
                      setShowDetailsModal(false);
                      setSelectedApplication(null);
                      setNotes('');
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Position</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedApplication.position}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Location</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedApplication.location}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedApplication.phone || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Experience</label>
                    <p className="mt-1 text-sm text-gray-900">
                      {selectedApplication.years_of_experience || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Availability</label>
                    <p className="mt-1 text-sm text-gray-900">
                      {selectedApplication.availability || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <select
                      value={selectedApplication.status}
                      onChange={(e) => {
                        setSelectedApplication({ ...selectedApplication, status: e.target.value });
                      }}
                      disabled={updatingStatus === selectedApplication.id}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="pending">Pending</option>
                      <option value="reviewed">Reviewed</option>
                      <option value="interviewed">Interviewed</option>
                      <option value="accepted">Accepted</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>
                </div>

                {selectedApplication.linkedin_url && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">LinkedIn</label>
                    <a
                      href={selectedApplication.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 text-sm text-indigo-600 hover:text-indigo-900"
                    >
                      {selectedApplication.linkedin_url}
                    </a>
                  </div>
                )}

                {selectedApplication.portfolio_url && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Portfolio</label>
                    <a
                      href={selectedApplication.portfolio_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 text-sm text-indigo-600 hover:text-indigo-900"
                    >
                      {selectedApplication.portfolio_url}
                    </a>
                  </div>
                )}

                {selectedApplication.cover_letter && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Cover Letter</label>
                    <div className="mt-1 p-4 bg-gray-50 rounded-md text-sm text-gray-900 whitespace-pre-wrap">
                      {selectedApplication.cover_letter}
                    </div>
                  </div>
                )}

                {selectedApplication.additional_info && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Additional Information</label>
                    <div className="mt-1 p-4 bg-gray-50 rounded-md text-sm text-gray-900 whitespace-pre-wrap">
                      {selectedApplication.additional_info}
                    </div>
                  </div>
                )}

                {selectedApplication.resume && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Resume</label>
                    <div className="mt-1">
                      {selectedApplication.resume.startsWith('data:') ? (
                        <a
                          href={selectedApplication.resume}
                          download={`${selectedApplication.first_name}_${selectedApplication.last_name}_resume.pdf`}
                          className="text-sm text-indigo-600 hover:text-indigo-900"
                        >
                          Download Resume
                        </a>
                      ) : (
                        <a
                          href={selectedApplication.resume}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-indigo-600 hover:text-indigo-900"
                        >
                          View Resume
                        </a>
                      )}
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Add notes about this applicant..."
                  />
                </div>

                <div className="flex justify-end gap-4 pt-4 border-t">
                  <button
                    onClick={() => {
                      setShowDetailsModal(false);
                      setSelectedApplication(null);
                      setNotes('');
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleStatusChange(selectedApplication.id, selectedApplication.status)}
                    disabled={updatingStatus === selectedApplication.id}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-gray-400"
                  >
                    {updatingStatus === selectedApplication.id ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminJobApplications;

