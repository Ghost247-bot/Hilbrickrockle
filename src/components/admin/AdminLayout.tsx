import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { supabase } from '../../lib/supabase';
import { isAdmin, getAdminUser } from '../../utils/admin-auth';
import type { AdminUser } from '../../utils/admin-auth';
import NotificationBell from './NotificationBell';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);

  useEffect(() => {
    let isMounted = true;

    const checkAdminAccess = async () => {
      const adminStatus = await isAdmin();
      if (!isMounted) return;

      if (!adminStatus) {
        router.replace('/admin/login');
        return;
      }

      const user = await getAdminUser();
      if (isMounted) {
        setAdminUser(user);
        setLoading(false);
      }
    };

    checkAdminAccess();

    return () => {
      isMounted = false;
    };
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  const navItems = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
    { href: '/admin/appointments', label: 'Appointments', icon: '📅' },
    { href: '/admin/contact-messages', label: 'Messages', icon: '✉️' },
    { href: '/admin/job-applications', label: 'Job Applications', icon: '📋' },
    { href: '/admin/lawyers', label: 'Lawyers', icon: '👨‍⚖️' },
    { href: '/admin/document-links', label: 'Document Links', icon: '🔗' },
  ];

  const currentPath = router.pathname;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-gray-900 text-white">
        <div className="flex flex-col h-full">
          {/* Logo/Header */}
          <div className="p-6 border-b border-gray-800">
            <h1 className="text-xl font-bold">Admin Panel</h1>
            <p className="text-sm text-gray-400 mt-1">{adminUser?.email}</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navItems.map((item) => {
              const isActive = currentPath === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <span className="mr-3 text-xl">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-800">
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors text-white"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64">
        {/* Top Bar with Notifications */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              {navItems.find(item => item.href === currentPath)?.label || 'Admin Panel'}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <NotificationBell />
          </div>
        </div>

        <div className="p-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;

