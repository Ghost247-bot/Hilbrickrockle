import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../../lib/supabase';
import AdminLayout from '../../components/admin/AdminLayout';

interface Document {
  filename: string;
  path: string;
  type: string;
  size: number;
  uploaded_at: string;
}

interface Appointment {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  date: string;
  time: string;
  practice_area: string;
  lawyer_id: string | null;
  message: string | null;
  status: string;
  created_at: string;
  documents: Document[] | null;
  lawyers: { name: string; lawyer_id: string } | null;
}

const AdminAppointments: React.FC = () => {
  const router = useRouter();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [total, setTotal] = useState(0);
  const [showCancelConfirm, setShowCancelConfirm] = useState<string | null>(null);
  const [showNoteModal, setShowNoteModal] = useState<Appointment | null>(null);

  useEffect(() => {
    // Handle ESC key to close modals
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowCancelConfirm(null);
        setShowNoteModal(null);
      }
    };

    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  useEffect(() => {
    let isMounted = true;

    const fetchAppointments = async () => {
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
          ? '/api/admin/appointments'
          : `/api/admin/appointments?status=${status}`;

        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!isMounted) return;

        if (!response.ok) {
          throw new Error('Failed to fetch appointments');
        }

        const result = await response.json();
        if (result.success) {
          if (isMounted) {
            setAppointments(result.appointments || []);
            setTotal(result.total || 0);
          }
        } else {
          throw new Error(result.error || 'Failed to fetch appointments');
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
      fetchAppointments();
    }

    return () => {
      isMounted = false;
    };
  }, [router, statusFilter]);

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const token = session.access_token;
      const response = await fetch('/api/admin/appointments', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id, status: newStatus }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to update appointment');
      }

      // Refresh appointments
      setAppointments(prev =>
        prev.map(apt => apt.id === id ? { ...apt, status: newStatus } : apt)
      );

      // Close cancel confirmation if it was open
      setShowCancelConfirm(null);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to update appointment');
    }
  };

  const handleCancelClick = (id: string) => {
    setShowCancelConfirm(id);
  };

  const handleCancelConfirm = (id: string) => {
    updateStatus(id, 'cancelled');
  };

  const handleViewNote = (appointment: Appointment) => {
    setShowNoteModal(appointment);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
    completed: 'bg-blue-100 text-blue-800',
  };

  return (
    <AdminLayout>
      <div className="space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Appointments</h1>
            <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-600">Manage all appointment bookings</p>
          </div>
          <div className="text-xs sm:text-sm text-gray-500">Total: {total}</div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border p-3 sm:p-4">
          <div className="flex flex-wrap gap-2">
            {['all', 'pending', 'confirmed', 'cancelled', 'completed'].map((status) => (
              <button
                key={status}
                onClick={() => {
                  setStatusFilter(status);
                  router.push(status === 'all' ? '/admin/appointments' : `/admin/appointments?status=${status}`);
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
            <div className="text-gray-500">Loading appointments...</div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800">Error: {error}</p>
          </div>
        ) : appointments.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
            <p className="text-gray-500">No appointments found</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <div className="inline-block min-w-full align-middle">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Client
                      </th>
                      <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date & Time
                      </th>
                      <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Practice Area
                      </th>
                      <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Lawyer
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
                    {appointments.map((appointment) => (
                      <tr key={appointment.id} className="hover:bg-gray-50">
                        <td className="px-3 sm:px-6 py-3 sm:py-4">
                          <div>
                            <div className="text-xs sm:text-sm font-medium text-gray-900">{appointment.name}</div>
                            <div className="text-xs sm:text-sm text-gray-500">{appointment.email}</div>
                            {appointment.phone && (
                              <div className="text-xs sm:text-sm text-gray-500">{appointment.phone}</div>
                            )}
                          </div>
                        </td>
                        <td className="px-3 sm:px-6 py-3 sm:py-4">
                          <div className="text-xs sm:text-sm text-gray-900">{formatDate(appointment.date)}</div>
                          <div className="text-xs sm:text-sm text-gray-500">{appointment.time}</div>
                        </td>
                        <td className="px-3 sm:px-6 py-3 sm:py-4">
                          <div className="text-xs sm:text-sm text-gray-900">{appointment.practice_area}</div>
                        </td>
                        <td className="px-3 sm:px-6 py-3 sm:py-4">
                          <div className="text-xs sm:text-sm text-gray-900">
                            {appointment.lawyers?.name || appointment.lawyer_id || 'Not assigned'}
                          </div>
                        </td>
                        <td className="px-3 sm:px-6 py-3 sm:py-4">
                          <span
                            className={`px-1.5 sm:px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              statusColors[appointment.status as keyof typeof statusColors] || 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {appointment.status}
                          </span>
                        </td>
                        <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium">
                          <div className="flex flex-col gap-1 sm:gap-2">
                            <div className="flex flex-wrap gap-1 sm:gap-2">
                            {appointment.status !== 'confirmed' && (
                              <button
                                onClick={() => updateStatus(appointment.id, 'confirmed')}
                                className="text-green-600 hover:text-green-900 transition-colors"
                              >
                                Confirm
                              </button>
                            )}
                            {appointment.status !== 'cancelled' && (
                              <button
                                onClick={() => handleCancelClick(appointment.id)}
                                className="text-red-600 hover:text-red-900 transition-colors"
                              >
                                Cancel
                              </button>
                            )}
                            {appointment.message && (
                              <button
                                onClick={() => handleViewNote(appointment)}
                                className="text-blue-600 hover:text-blue-900 transition-colors"
                              >
                                View Note
                              </button>
                            )}
                          </div>
                          {appointment.documents && appointment.documents.length > 0 && (
                            <div className="mt-2">
                              <span className="text-xs text-gray-500">
                                📎 {appointment.documents.length} document{appointment.documents.length > 1 ? 's' : ''}
                              </span>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Cancel Confirmation Modal */}
        {showCancelConfirm && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowCancelConfirm(null)}
          >
            <div 
              className="bg-white rounded-lg shadow-xl p-4 sm:p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Cancel Appointment?</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                Are you sure you want to cancel this appointment? This action cannot be undone.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-end">
                <button
                  onClick={() => setShowCancelConfirm(null)}
                  className="px-3 sm:px-4 py-2 text-sm sm:text-base text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  No, Keep It
                </button>
                <button
                  onClick={() => handleCancelConfirm(showCancelConfirm)}
                  className="px-3 sm:px-4 py-2 text-sm sm:text-base text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Yes, Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* View Note Modal */}
        {showNoteModal && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setShowNoteModal(null)}
          >
            <div 
              className="bg-white rounded-lg shadow-xl p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Appointment Note</h3>
                <button
                  onClick={() => setShowNoteModal(null)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Close"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="mb-4 pb-4 border-b border-gray-200">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Client Name</p>
                    <p className="text-base text-gray-900">{showNoteModal.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Email</p>
                    <p className="text-base text-gray-900">{showNoteModal.email}</p>
                  </div>
                  {showNoteModal.phone && (
                    <div>
                      <p className="text-sm font-medium text-gray-500">Phone</p>
                      <p className="text-base text-gray-900">{showNoteModal.phone}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-medium text-gray-500">Date & Time</p>
                    <p className="text-base text-gray-900">
                      {formatDate(showNoteModal.date)} at {showNoteModal.time}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Practice Area</p>
                    <p className="text-base text-gray-900">{showNoteModal.practice_area}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Status</p>
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        statusColors[showNoteModal.status as keyof typeof statusColors] || 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {showNoteModal.status}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500 mb-2">Message/Note</p>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <p className="text-base text-gray-900 whitespace-pre-wrap">{showNoteModal.message || 'No message provided'}</p>
                </div>
              </div>

              {/* Documents Section */}
              {showNoteModal.documents && showNoteModal.documents.length > 0 && (
                <div className="mt-6">
                  <p className="text-sm font-medium text-gray-500 mb-2">Uploaded Documents</p>
                  <div className="space-y-2">
                    {showNoteModal.documents.map((doc, index) => {
                      const fileSizeKB = (doc.size / 1024).toFixed(2);
                      return (
                        <div
                          key={index}
                          className="bg-gray-50 rounded-lg p-3 border border-gray-200 flex items-center justify-between hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <div className="text-2xl">
                              {doc.type.includes('pdf') ? '📄' : 
                               doc.type.includes('image') ? '🖼️' : 
                               doc.type.includes('word') || doc.type.includes('document') ? '📝' : '📎'}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">{doc.filename}</p>
                              <p className="text-xs text-gray-500">{fileSizeKB} KB • {doc.type}</p>
                            </div>
                          </div>
                          <a
                            href={doc.path}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-4 px-3 py-1.5 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
                          >
                            View
                          </a>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setShowNoteModal(null)}
                  className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminAppointments;

