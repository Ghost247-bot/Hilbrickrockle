import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import { FaSearch, FaTimes } from 'react-icons/fa';
import {
  BookOpenIcon,
  NewspaperIcon,
  BriefcaseIcon,
  HomeIcon,
  PhoneIcon,
  GlobeAltIcon,
} from '@heroicons/react/24/outline';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SearchResult {
  id: string;
  title: string;
  description: string;
  url: string;
  category: 'Page' | 'Practice Area' | 'Content';
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // Load recent searches from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('recentSearches');
    if (stored) {
      setRecentSearches(JSON.parse(stored));
    }
  }, []);

  // Search data
  const searchData: SearchResult[] = [
    // Main Pages
    {
      id: 'about',
      title: 'About',
      description: 'Learn about our firm, history, and values',
      url: '/about',
      category: 'Page',
      icon: HomeIcon,
    },
    {
      id: 'practice-areas',
      title: 'Practice Areas',
      description: 'Explore our comprehensive legal practice areas',
      url: '/practice-areas',
      category: 'Page',
      icon: BookOpenIcon,
    },
    {
      id: 'insights',
      title: 'Insights & News',
      description: 'Latest legal news, insights, and updates',
      url: '/news',
      category: 'Page',
      icon: NewspaperIcon,
    },
    {
      id: 'capabilities',
      title: 'Capabilities',
      description: 'Our expertise across industries and practices',
      url: '/capabilities',
      category: 'Page',
      icon: BriefcaseIcon,
    },
    {
      id: 'global-citizenship',
      title: 'Global Citizenship',
      description: 'Our commitment to social responsibility',
      url: '/global-citizenship',
      category: 'Page',
      icon: GlobeAltIcon,
    },
    {
      id: 'contact',
      title: 'Contact Us',
      description: 'Get in touch with our team',
      url: '/contact',
      category: 'Page',
      icon: PhoneIcon,
    },
    // Practice Areas
    {
      id: 'corporate',
      title: 'Corporate Law',
      description: 'Business formation, corporate governance, and capital markets',
      url: '/practice-areas/corporate',
      category: 'Practice Area',
      icon: BookOpenIcon,
    },
    {
      id: 'ma',
      title: 'Mergers & Acquisitions',
      description: 'Strategic M&A counsel for complex transactions',
      url: '/practice-areas/ma',
      category: 'Practice Area',
      icon: BookOpenIcon,
    },
    {
      id: 'real-estate',
      title: 'Real Estate Law',
      description: 'Property transactions, leasing, and development',
      url: '/practice-areas/real-estate',
      category: 'Practice Area',
      icon: BookOpenIcon,
    },
    {
      id: 'tax',
      title: 'Tax Law',
      description: 'Tax planning, compliance, and controversy resolution',
      url: '/practice-areas/tax',
      category: 'Practice Area',
      icon: BookOpenIcon,
    },
    {
      id: 'employment',
      title: 'Employment Law',
      description: 'Employment contracts, compliance, and litigation',
      url: '/practice-areas/employment',
      category: 'Practice Area',
      icon: BookOpenIcon,
    },
  ];

  // Filter search results
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const query = searchQuery.toLowerCase().trim();
    return searchData.filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        setSearchQuery('');
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Handle result click
  const handleResultClick = (result: SearchResult) => {
    // Save to recent searches
    const updated = [result.title, ...recentSearches.filter((s) => s !== result.title)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));

    // Navigate and close
    setSearchQuery('');
    onClose();
    router.push(result.url);
  };

  // Handle recent search click
  const handleRecentSearchClick = (term: string) => {
    setSearchQuery(term);
  };

  // Handle submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchResults.length > 0) {
      handleResultClick(searchResults[0]);
    }
  };

  // Group results by category
  const groupedResults = useMemo(() => {
    const groups: { [key: string]: SearchResult[] } = {};
    searchResults.forEach((result) => {
      if (!groups[result.category]) {
        groups[result.category] = [];
      }
      groups[result.category].push(result);
    });
    return groups;
  }, [searchResults]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Search Container */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 right-0 z-50 p-4 md:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="max-w-3xl mx-auto">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-white">Search</h2>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    onClose();
                    setSearchQuery('');
                  }}
                  className="text-white hover:text-gray-300 transition-colors"
                >
                  <FaTimes className="h-6 w-6" />
                </motion.button>
              </div>

              <form onSubmit={handleSubmit} className="relative mb-6">
                <motion.input
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for pages, practice areas, or content..."
                  className="w-full px-6 py-4 bg-white bg-opacity-10 backdrop-blur-md rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoFocus
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  type="submit"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
                >
                  <FaSearch className="h-5 w-5" />
                </motion.button>
              </form>

              {/* Search Results */}
              {searchQuery.trim() && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-4 max-h-[60vh] overflow-y-auto"
                >
                  {searchResults.length > 0 ? (
                    <div className="space-y-6">
                      {Object.entries(groupedResults).map(([category, results]) => (
                        <div key={category}>
                          <h3 className="text-sm font-semibold text-blue-200 mb-3 uppercase tracking-wide">
                            {category}
                          </h3>
                          <div className="space-y-2">
                            {results.map((result) => {
                              const Icon = result.icon;
                              return (
                                <motion.button
                                  key={result.id}
                                  whileHover={{ x: 5 }}
                                  onClick={() => handleResultClick(result)}
                                  className="w-full text-left p-3 rounded-lg bg-white bg-opacity-5 hover:bg-opacity-10 transition-all flex items-start gap-3 group"
                                >
                                  {Icon && (
                                    <Icon className="w-5 h-5 text-blue-300 mt-0.5 flex-shrink-0 group-hover:text-blue-200 transition-colors" />
                                  )}
                                  <div className="flex-1 min-w-0">
                                    <div className="text-white font-medium group-hover:text-blue-200 transition-colors">
                                      {result.title}
                                    </div>
                                    <div className="text-gray-300 text-sm mt-1 line-clamp-1">
                                      {result.description}
                                    </div>
                                  </div>
                                  <FaSearch className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-1" />
                                </motion.button>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-300 text-lg">No results found</p>
                      <p className="text-gray-400 text-sm mt-2">
                        Try searching for "Corporate Law", "M&A", or "Practice Areas"
                      </p>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Recent Searches - Only show when no search query */}
              {!searchQuery.trim() && recentSearches.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mt-8"
                >
                  <h3 className="text-lg font-semibold text-white mb-4">Recent Searches</h3>
                  <div className="space-y-2">
                    {recentSearches.map((term) => (
                      <motion.button
                        key={term}
                        whileHover={{ x: 10 }}
                        onClick={() => handleRecentSearchClick(term)}
                        className="block text-gray-300 hover:text-white transition-colors text-left p-2 rounded hover:bg-white hover:bg-opacity-10"
                      >
                        {term}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Quick Links - Only show when no search query and no recent searches */}
              {!searchQuery.trim() && recentSearches.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mt-8"
                >
                  <h3 className="text-lg font-semibold text-white mb-4">Popular Searches</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {['Corporate Law', 'M&A', 'Real Estate', 'Tax Law'].map((term) => (
                      <motion.button
                        key={term}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleRecentSearchClick(term)}
                        className="p-3 rounded-lg bg-white bg-opacity-10 hover:bg-opacity-20 text-white text-left transition-all"
                      >
                        {term}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SearchOverlay; 