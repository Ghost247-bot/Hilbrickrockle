import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../../lib/supabase';
import AdminLayout from '@/components/admin/AdminLayout';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  status: string;
  created_at: string;
  updated_at: string;
}

const AdminContactMessages = () => {
  const router = useRouter();
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [total, setTotal] = useState(0);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchMessages = async () => {
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
          ? '/api/admin/contact-messages'
          : `/api/admin/contact-messages?status=${status}`;

        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!isMounted) return;

        if (!response.ok) {
          throw new Error('Failed to fetch contact messages');
        }

        const result = await response.json();
        if (result.success) {
          if (isMounted) {
            setMessages(result.messages || []);
            setTotal(result.total || 0);
          }
        } else {
          throw new Error(result.error || 'Failed to fetch contact messages');
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

    // Only fetch when router is ready
    if (router.isReady) {
      fetchMessages();
    }

    return () => {
      isMounted = false;
    };
  }, [router, statusFilter]);

  const updateStatus = async (id: string, newStatus: string) => {
    setUpdatingStatus(id);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setUpdatingStatus(null);
        return;
      }

      const token = session.access_token;
      const response = await fetch('/api/admin/contact-messages', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id, status: newStatus }),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || 'Failed to update message status');
      }

      const result = await response.json();
      
      // Update both messages list and selected message
      setMessages(prev =>
        prev.map(msg => msg.id === id ? { ...msg, status: newStatus } : msg)
      );
      
      // Update selected message if it's the one being updated
      if (selectedMessage && selectedMessage.id === id) {
        setSelectedMessage({ ...selectedMessage, status: newStatus });
      }
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to update message status');
    } finally {
      setUpdatingStatus(null);
    }
  };

  const formatDate = (dateString: string) => {
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
    read: 'bg-blue-100 text-blue-800',
    replied: 'bg-green-100 text-green-800',
    archived: 'bg-gray-100 text-gray-800',
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Contact Messages</h1>
            <p className="mt-2 text-gray-600">Manage all contact form submissions</p>
          </div>
          <div className="text-sm text-gray-500">Total: {total}</div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex gap-2">
            {['all', 'pending', 'read', 'replied', 'archived'].map((status) => (
              <button
                key={status}
                onClick={() => {
                  setStatusFilter(status);
                  router.push(status === 'all' ? '/admin/contact-messages' : `/admin/contact-messages?status=${status}`);
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
            <div className="text-gray-500">Loading messages...</div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800">Error: {error}</p>
          </div>
        ) : messages.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
            <p className="text-gray-500">No messages found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Messages List */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border overflow-hidden">
              <div className="divide-y divide-gray-200 max-h-[800px] overflow-y-auto">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedMessage?.id === message.id ? 'bg-blue-50 border-l-4 border-blue-600' : ''
                    }`}
                    onClick={() => setSelectedMessage(message)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{message.name}</div>
                        <div className="text-sm text-gray-500">{message.email}</div>
                      </div>
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          statusColors[message.status as keyof typeof statusColors] || 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {message.status}
                      </span>
                    </div>
                    <div className="mt-2">
                      <div className="text-sm font-medium text-gray-900">{message.subject}</div>
                      <div className="text-sm text-gray-600 mt-1 line-clamp-2">{message.message}</div>
                    </div>
                    <div className="text-xs text-gray-400 mt-2">
                      {formatDate(message.created_at)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Message Detail */}
            <div className="lg:col-span-1">
              {selectedMessage ? (
                <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-6">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl font-bold text-gray-900">Message Details</h2>
                    <button
                      onClick={() => setSelectedMessage(null)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">From</label>
                      <div className="mt-1">
                        <div className="text-gray-900 font-medium">{selectedMessage.name}</div>
                        <div className="text-sm text-gray-600">{selectedMessage.email}</div>
                        {selectedMessage.phone && (
                          <div className="text-sm text-gray-600">{selectedMessage.phone}</div>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-500">Subject</label>
                      <div className="mt-1 text-gray-900">{selectedMessage.subject}</div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-500">Message</label>
                      <div className="mt-1 text-gray-900 whitespace-pre-wrap bg-gray-50 p-3 rounded">
                        {selectedMessage.message}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-500">Status</label>
                      <div className="mt-2">
                        <span
                          className={`px-3 py-1 text-sm font-semibold rounded-full ${
                            statusColors[selectedMessage.status as keyof typeof statusColors] || 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {selectedMessage.status}
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-500">Received</label>
                      <div className="mt-1 text-sm text-gray-600">
                        {formatDate(selectedMessage.created_at)}
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <label className="text-sm font-medium text-gray-500 mb-2 block">Update Status</label>
                      <div className="space-y-2">
                        {['pending', 'read', 'replied', 'archived'].map((status) => {
                          const isCurrentStatus = selectedMessage.status === status;
                          const isUpdating = updatingStatus === selectedMessage.id;
                          return (
                            <button
                              key={status}
                              onClick={() => {
                                if (!isCurrentStatus && !isUpdating) {
                                  updateStatus(selectedMessage.id, status);
                                }
                              }}
                              disabled={isCurrentStatus || isUpdating}
                              className={`w-full px-4 py-2 rounded-lg transition-colors text-sm font-medium flex items-center justify-center ${
                                isCurrentStatus
                                  ? 'bg-blue-600 text-white cursor-not-allowed'
                                  : isUpdating
                                  ? 'bg-gray-300 text-gray-500 cursor-wait'
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 active:bg-gray-300'
                              }`}
                            >
                              {isUpdating ? (
                                <>
                                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                  </svg>
                                  Updating...
                                </>
                              ) : (
                                `Mark as ${status.charAt(0).toUpperCase() + status.slice(1)}`
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <button
                        onClick={async () => {
                          try {
                            // Update status to replied when replying
                            if (selectedMessage.status !== 'replied') {
                              await updateStatus(selectedMessage.id, 'replied');
                            }
                            // Open email client with pre-filled content
                            const subject = encodeURIComponent(`Re: ${selectedMessage.subject}`);
                            const body = encodeURIComponent(
                              `Dear ${selectedMessage.name},\n\nThank you for contacting us.\n\n--- Original Message ---\nFrom: ${selectedMessage.name} (${selectedMessage.email})\nSubject: ${selectedMessage.subject}\n\n${selectedMessage.message}`
                            );
                            window.location.href = `mailto:${selectedMessage.email}?subject=${subject}&body=${body}`;
                          } catch (error) {
                            // If status update fails, still open email
                            const subject = encodeURIComponent(`Re: ${selectedMessage.subject}`);
                            window.location.href = `mailto:${selectedMessage.email}?subject=${subject}`;
                          }
                        }}
                        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors font-medium flex items-center justify-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        Reply via Email
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
                  <p className="text-gray-500">Select a message to view details</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminContactMessages;

