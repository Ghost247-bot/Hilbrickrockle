import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { supabase } from '../../lib/supabase';
import AdminLayout from '../../components/admin/AdminLayout';

interface Stats {
  totalAppointments: number;
  totalContactMessages: number;
  totalLawyers: number;
  pendingAppointments: number;
  pendingMessages: number;
  recentAppointments: number;
  confirmedAppointments: number;
  cancelledAppointments: number;
  activeLawyers: number;
  appointmentsWithDocuments: number;
  totalJobApplications: number;
  pendingJobApplications: number;
}

const AdminDashboard = () => {
  const router = useRouter();
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const fetchStats = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!isMounted) return;

        if (!session) {
          router.replace('/admin/login');
          return;
        }

        const token = session.access_token;
        const response = await fetch('/api/admin/stats', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!isMounted) return;

        if (!response.ok) {
          throw new Error('Failed to fetch statistics');
        }

        const result = await response.json();
        if (result.success) {
          if (isMounted) {
            setStats(result.stats);
          }
        } else {
          throw new Error(result.error || 'Failed to fetch statistics');
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

    fetchStats();

    return () => {
      isMounted = false;
    };
  }, [router]);

  const statCards = [
    {
      title: 'Total Appointments',
      value: stats?.totalAppointments || 0,
      icon: '📅',
      color: 'blue',
      href: '/admin/appointments',
    },
    {
      title: 'Pending Appointments',
      value: stats?.pendingAppointments || 0,
      icon: '⏳',
      color: 'yellow',
      href: '/admin/appointments?status=pending',
    },
    {
      title: 'Total Messages',
      value: stats?.totalContactMessages || 0,
      icon: '✉️',
      color: 'green',
      href: '/admin/contact-messages',
    },
    {
      title: 'Pending Messages',
      value: stats?.pendingMessages || 0,
      icon: '📬',
      color: 'orange',
      href: '/admin/contact-messages?status=pending',
    },
    {
      title: 'Total Lawyers',
      value: stats?.totalLawyers || 0,
      icon: '👨‍⚖️',
      color: 'purple',
      href: '/admin/lawyers',
    },
    {
      title: 'Active Lawyers',
      value: stats?.activeLawyers || 0,
      icon: '✅',
      color: 'green',
      href: '/admin/lawyers?status=active',
    },
    {
      title: 'Job Applications',
      value: stats?.totalJobApplications || 0,
      icon: '📋',
      color: 'indigo',
      href: '/admin/job-applications',
    },
    {
      title: 'Pending Applications',
      value: stats?.pendingJobApplications || 0,
      icon: '⏱️',
      color: 'yellow',
      href: '/admin/job-applications?status=pending',
    },
  ];

  const colorClasses = {
    blue: 'bg-blue-100 text-blue-800 border-blue-300',
    yellow: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    green: 'bg-green-100 text-green-800 border-green-300',
    orange: 'bg-orange-100 text-orange-800 border-orange-300',
    purple: 'bg-purple-100 text-purple-800 border-purple-300',
    indigo: 'bg-indigo-100 text-indigo-800 border-indigo-300',
  };

  return (
    <AdminLayout>
      <div className="space-y-4 sm:space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-600">Overview of your law firm data</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-gray-500">Loading statistics...</div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800">Error: {error}</p>
          </div>
        ) : (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {statCards.map((card) => (
                <Link
                  key={card.title}
                  href={card.href}
                  className="block"
                >
                  <div
                    className={`bg-white rounded-lg shadow-sm border-2 p-4 sm:p-6 hover:shadow-md transition-shadow cursor-pointer ${colorClasses[card.color as keyof typeof colorClasses]}`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs sm:text-sm font-medium opacity-80">{card.title}</p>
                        <p className="text-2xl sm:text-3xl font-bold mt-1 sm:mt-2">{card.value}</p>
                      </div>
                      <div className="text-3xl sm:text-4xl">{card.icon}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Additional Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-4 sm:mt-6">
              <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6">
                <p className="text-xs sm:text-sm font-medium text-gray-600">Recent Appointments (7 days)</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-1 sm:mt-2">{stats?.recentAppointments || 0}</p>
              </div>
              <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6">
                <p className="text-xs sm:text-sm font-medium text-gray-600">Confirmed Appointments</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-1 sm:mt-2">{stats?.confirmedAppointments || 0}</p>
              </div>
              <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6">
                <p className="text-xs sm:text-sm font-medium text-gray-600">Cancelled Appointments</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-1 sm:mt-2">{stats?.cancelledAppointments || 0}</p>
              </div>
              <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-600">Appointments with Documents</p>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-1 sm:mt-2">{stats?.appointmentsWithDocuments || 0}</p>
                  </div>
                  <div className="text-2xl sm:text-3xl">📎</div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6 mt-4 sm:mt-6">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <Link
                  href="/admin/appointments?status=pending"
                  className="px-3 sm:px-4 py-2 text-sm sm:text-base bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-center"
                >
                  Review Pending Appointments
                </Link>
                <Link
                  href="/admin/contact-messages?status=pending"
                  className="px-3 sm:px-4 py-2 text-sm sm:text-base bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-center"
                >
                  View Pending Messages
                </Link>
                <Link
                  href="/admin/lawyers"
                  className="px-3 sm:px-4 py-2 text-sm sm:text-base bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-center"
                >
                  Manage Lawyers
                </Link>
                <Link
                  href="/admin/document-links"
                  className="px-3 sm:px-4 py-2 text-sm sm:text-base bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-center"
                >
                  Document Links
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;

