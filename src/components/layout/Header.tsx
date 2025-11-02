import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bars3Icon,
  XMarkIcon,
  MagnifyingGlassIcon,
  UserIcon,
  BellIcon,
  ChevronDownIcon,
  CalendarIcon,
  GlobeAltIcon,
  HomeIcon,
  BookOpenIcon,
  NewspaperIcon,
  BriefcaseIcon,
  PhoneIcon,
  ArrowRightOnRectangleIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import { supabase } from '../../lib/supabase';
import SearchOverlay from '../SearchOverlay';

interface NavigationItem {
  name: string;
  href: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  children?: { name: string; href: string; description?: string }[];
}

const Header: React.FC = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [expandedMobileItems, setExpandedMobileItems] = useState<Set<string>>(new Set());
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Check user session
    const checkUser = async () => {
      try {
        // Only run in browser environment
        if (typeof window === 'undefined') {
          setIsLoading(false);
          return;
        }

        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error('Error getting session:', error);
          setUser(null);
        } else {
          setUser(session?.user || null);
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error checking user session:', error);
        setUser(null);
        setIsLoading(false);
      }
    };
    checkUser();

    // Listen for auth changes
    let subscription: { unsubscribe: () => void } | null = null;
    try {
      // Only set up subscription in browser environment
      if (typeof window !== 'undefined') {
        const authStateChangeResult = supabase.auth.onAuthStateChange((_event, session) => {
          setUser(session?.user || null);
        });
        if (authStateChangeResult?.data?.subscription) {
          subscription = authStateChangeResult.data.subscription;
        }
      }
    } catch (error) {
      console.error('Error setting up auth state listener:', error);
    }

    return () => {
      if (subscription) {
        try {
          subscription.unsubscribe();
        } catch (error) {
          console.error('Error unsubscribing from auth state changes:', error);
        }
      }
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
      Object.keys(dropdownRefs.current).forEach((key) => {
        if (dropdownRefs.current[key] && !dropdownRefs.current[key]?.contains(event.target as Node)) {
          setOpenDropdown(null);
        }
      });
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setIsUserMenuOpen(false);
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
      setIsUserMenuOpen(false);
      router.push('/');
    }
  };

  const navigation: NavigationItem[] = [
    { name: 'About', href: '/about', icon: HomeIcon },
    {
      name: 'Practice Areas',
      href: '/practice-areas',
      icon: BookOpenIcon,
      children: [
        { name: 'Corporate Law', href: '/practice-areas/corporate', description: 'Business formation and corporate governance' },
        { name: 'M&A', href: '/practice-areas/ma', description: 'Mergers and acquisitions' },
        { name: 'Real Estate', href: '/practice-areas/real-estate', description: 'Property transactions and disputes' },
        { name: 'Tax Law', href: '/practice-areas/tax', description: 'Tax planning and compliance' },
        { name: 'Employment Law', href: '/practice-areas/employment', description: 'Labor relations and employment disputes' },
      ],
    },
    { name: 'Insights', href: '/news', icon: NewspaperIcon },
    { name: 'Capabilities', href: '/capabilities', icon: BriefcaseIcon },
    { name: 'Global Citizenship', href: '/global-citizenship', icon: GlobeAltIcon },
    { name: 'Contact', href: '/contact', icon: PhoneIcon },
  ];

  const toggleDropdown = (itemName: string) => {
    setOpenDropdown(openDropdown === itemName ? null : itemName);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-200/50'
            : 'bg-white/80 backdrop-blur-sm'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center group">
                <Image 
                  src="/logo.png" 
                  alt="Hilbrick & Rockle" 
                  width={180} 
                  height={60}
                  className="h-12 w-auto object-contain drop-shadow-sm"
                  priority
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex lg:items-center lg:space-x-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                const hasChildren = item.children && item.children.length > 0;

                return (
                  <div key={item.name} className="relative" ref={(el) => { dropdownRefs.current[item.name] = el; }}>
                    {hasChildren ? (
                      <>
                        <button
                          onClick={() => toggleDropdown(item.name)}
                          className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors rounded-lg hover:bg-gray-50 group"
                        >
                          {Icon && <Icon className="w-4 h-4" />}
                          <span>{item.name}</span>
                          <ChevronDownIcon
                            className={`w-4 h-4 transition-transform ${
                              openDropdown === item.name ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                        <AnimatePresence>
                          {openDropdown === item.name && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.2 }}
                              className="absolute top-full left-0 mt-2 w-72 bg-white rounded-lg shadow-xl border border-gray-200 py-2 overflow-hidden"
                            >
                              {item.children?.map((child) => (
                                <Link
                                  key={child.name}
                                  href={child.href}
                                  className="block px-4 py-3 hover:bg-blue-50 transition-colors group"
                                  onClick={() => setOpenDropdown(null)}
                                >
                                  <div className="font-medium text-gray-900 group-hover:text-blue-600">
                                    {child.name}
                                  </div>
                                  {child.description && (
                                    <div className="text-sm text-gray-500 mt-1">{child.description}</div>
                                  )}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors rounded-lg hover:bg-gray-50"
                      >
                        {Icon && <Icon className="w-4 h-4" />}
                        <span>{item.name}</span>
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Right Side Actions */}
            <div className="hidden lg:flex lg:items-center lg:gap-3">
              {/* Search Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Search"
              >
                <MagnifyingGlassIcon className="w-5 h-5" />
              </button>

              {/* Notifications (if user is logged in) */}
              {user && (
                <button
                  className="relative p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Notifications"
                >
                  <BellIcon className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
              )}

              {/* User Menu */}
              {!isLoading && user && (
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors group"
                  >
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-semibold text-sm">
                      {user.email?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <ChevronDownIcon
                      className={`w-4 h-4 text-gray-600 transition-transform ${
                        isUserMenuOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {isUserMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 overflow-hidden"
                      >
                        <div className="px-4 py-3 border-b border-gray-200">
                          <div className="text-sm font-medium text-gray-900">{user.email}</div>
                          <div className="text-xs text-gray-500 mt-1">User Account</div>
                        </div>
                        <Link
                          href="/dashboard"
                          className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <UserIcon className="w-4 h-4" />
                          Dashboard
                        </Link>
                        <Link
                          href="/dashboard"
                          className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <Cog6ToothIcon className="w-4 h-4" />
                          Settings
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          <ArrowRightOnRectangleIcon className="w-4 h-4" />
                          Sign Out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* Book Appointment Button */}
              <Link
                href="/booking"
                className="flex items-center gap-1 px-2 py-1 text-sm bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-md hover:from-blue-700 hover:to-blue-800 transition-all shadow hover:shadow-md transform hover:scale-105"
              >
                <CalendarIcon className="w-3 h-3" />
                <span className="text-xs">Book Appointment</span>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-gray-600 hover:text-blue-600 rounded-md"
                aria-label="Search"
              >
                <MagnifyingGlassIcon className="w-6 h-6" />
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-100 focus:outline-none transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                  <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="lg:hidden border-t border-gray-200 bg-white"
              >
                <div className="pt-4 pb-6 space-y-1">
                  {navigation.map((item) => {
                    const Icon = item.icon;
                    const hasChildren = item.children && item.children.length > 0;
                    const isExpanded = expandedMobileItems.has(item.name);

                    return (
                      <div key={item.name}>
                        {hasChildren ? (
                          <>
                            <button
                              onClick={() => {
                                const newSet = new Set(expandedMobileItems);
                                if (isExpanded) {
                                  newSet.delete(item.name);
                                } else {
                                  newSet.add(item.name);
                                }
                                setExpandedMobileItems(newSet);
                              }}
                              className="flex items-center justify-between w-full px-4 py-3 text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
                            >
                              <div className="flex items-center gap-2">
                                {Icon && <Icon className="w-5 h-5" />}
                                <span>{item.name}</span>
                              </div>
                              <ChevronDownIcon
                                className={`w-5 h-5 transition-transform ${
                                  isExpanded ? 'rotate-180' : ''
                                }`}
                              />
                            </button>
                            {isExpanded && (
                              <div className="pl-8 pr-4 py-2 space-y-1 bg-gray-50">
                                {item.children?.map((child) => (
                                  <Link
                                    key={child.name}
                                    href={child.href}
                                    className="block py-2 text-sm text-gray-600 hover:text-blue-600 rounded-md"
                                    onClick={() => setIsMenuOpen(false)}
                                  >
                                    {child.name}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </>
                        ) : (
                          <Link
                            href={item.href}
                            className="flex items-center gap-2 px-4 py-3 text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {Icon && <Icon className="w-5 h-5" />}
                            <span>{item.name}</span>
                          </Link>
                        )}
                      </div>
                    );
                  })}
                  <div className="px-4 pt-4 space-y-2">
                    {user && (
                      <>
                        <Link
                          href="/dashboard"
                          className="flex items-center gap-2 px-4 py-3 text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <UserIcon className="w-5 h-5" />
                          <span>Dashboard</span>
                        </Link>
                        <button
                          onClick={() => {
                            handleLogout();
                            setIsMenuOpen(false);
                          }}
                          className="flex items-center gap-2 w-full px-4 py-3 text-base font-medium text-red-600 hover:bg-red-50 rounded-md transition-colors"
                        >
                          <ArrowRightOnRectangleIcon className="w-5 h-5" />
                          <span>Sign Out</span>
                        </button>
                      </>
                    )}
                    <Link
                      href="/booking"
                      className="flex items-center gap-1 w-full px-2 py-1.5 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-md transition-colors text-center justify-center shadow"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <CalendarIcon className="w-3 h-3" />
                      <span className="text-xs">Book Appointment</span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>

      {/* Search Overlay */}
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

export default Header;