import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiPhone, FiMail, FiMapPin } from 'react-icons/fi';

const offices = [
  'Lincoln',
  'London',
  'Singapore',
  'Hong Kong',
  'Tokyo',
  'Dubai',
  'Paris',
  'Frankfurt',
  'Milan',
  'Los Angeles',
  'San Francisco',
  'Chicago',
  'Washington, D.C.',
  'Boston',
  'Houston',
];

// Office details mapping
const officeDetails: Record<string, {
  address: string;
  phone: string;
  email: string;
}> = {
  'Lincoln': {
    address: 'South 13th Street, Lincoln, Nebraska 68508',
    phone: '+1 (402) 906-1200',
    email: 'newyork@hilbrickrockle.pro'
  },
  'London': {
    address: '99 Bishopsgate, London EC2M 3XF, United Kingdom',
    phone: '+44 20 7710 1000',
    email: 'london@hilbrickrockle.pro'
  },
  'Singapore': {
    address: 'One Raffles Quay, North Tower, Level 25, Singapore 048583',
    phone: '+65 6535 6000',
    email: 'singapore@hilbrickrockle.pro'
  },
  'Hong Kong': {
    address: 'One International Finance Centre, 1 Harbour View Street, Central, Hong Kong',
    phone: '+852 2522 7888',
    email: 'hongkong@hilbrickrockle.pro'
  },
  'Tokyo': {
    address: 'Marunouchi Building, 2-4-1 Marunouchi, Chiyoda-ku, Tokyo 100-6325',
    phone: '+81 3 6212 3900',
    email: 'tokyo@hilbrickrockle.pro'
  },
  'Dubai': {
    address: 'Burj Khalifa, Downtown Dubai, Dubai, UAE',
    phone: '+971 4 437 2100',
    email: 'dubai@hilbrickrockle.pro'
  },
  'Paris': {
    address: '15 Avenue Matignon, 75008 Paris, France',
    phone: '+33 1 42 68 53 00',
    email: 'paris@hilbrickrockle.pro'
  },
  'Frankfurt': {
    address: 'Taunustor 1, 60310 Frankfurt, Germany',
    phone: '+49 69 6062 6000',
    email: 'frankfurt@hilbrickrockle.pro'
  },
  'Milan': {
    address: 'Via Brera 3, 20121 Milan, Italy',
    phone: '+39 02 8888 1000',
    email: 'milan@hilbrickrockle.pro'
  },
  'Los Angeles': {
    address: '555 West 5th Street, Los Angeles, CA 90013',
    phone: '+1 (213) 892-1000',
    email: 'losangeles@hilbrickrockle.pro'
  },
  'San Francisco': {
    address: '101 California Street, San Francisco, CA 94111',
    phone: '+1 (415) 777-1000',
    email: 'sanfrancisco@hilbrickrockle.pro'
  },
  'Chicago': {
    address: '233 South Wacker Drive, Chicago, IL 60606',
    phone: '+1 (312) 876-1000',
    email: 'chicago@hilbrickrockle.pro'
  },
  'Washington, D.C.': {
    address: '1400 New York Avenue NW, Washington, DC 20005',
    phone: '+1 (202) 555-1000',
    email: 'washington@hilbrickrockle.pro'
  },
  'Boston': {
    address: '200 State Street, Boston, MA 02109',
    phone: '+1 (617) 555-1000',
    email: 'boston@hilbrickrockle.pro'
  },
  'Houston': {
    address: '1000 Main Street, Houston, TX 77002',
    phone: '+1 (713) 555-1000',
    email: 'houston@hilbrickrockle.pro'
  }
};

const socialLinks = [
  { name: 'LinkedIn', href: 'https://www.linkedin.com/company/hrlaw', icon: (props: any) => (
    <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
  )},
  { name: 'X', href: 'https://twitter.com/hrlaw', icon: (props: any) => (
    <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  )},
  { name: 'Facebook', href: 'https://www.facebook.com/hrlaw', icon: (props: any) => (
    <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
    </svg>
  )},
  { name: 'YouTube', href: 'https://www.youtube.com/@hrlaw', icon: (props: any) => (
    <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  )},
];

const footerLinks = [
  { name: 'About Us', href: '/about' },
  { name: 'Newsroom', href: '/news' },
  { name: 'Careers', href: '/careers' },
  { name: 'Privacy Policy', href: '/privacy' },
  { name: 'Terms of Use', href: '/terms' },
];

const Footer = () => {
  const [selectedOffice, setSelectedOffice] = useState<string | null>(null);

  const handleOfficeClick = (office: string) => {
    if (officeDetails[office]) {
      setSelectedOffice(office);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }
  };

  const handleCloseModal = () => {
    setSelectedOffice(null);
    // Restore body scroll when modal is closed
    document.body.style.overflow = '';
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Footer Content */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          {/* Logo and Description */}
          <div className="flex items-center mb-6 lg:mb-0">
            <Link href="/" className="text-xl font-bold">
              HilbrickRockle
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap gap-x-8 gap-y-4 mb-6 lg:mb-0">
            {footerLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-400 hover:text-white text-sm whitespace-nowrap"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-4">
            {socialLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <span className="sr-only">{item.name}</span>
                <item.icon className="h-5 w-5" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        {/* Office Locations */}
        <div className="py-4 border-t border-gray-800">
          <div className="flex flex-wrap gap-x-6 gap-y-2 items-center justify-center text-sm">
            {offices.map((office) => (
              <button
                key={office}
                onClick={() => handleOfficeClick(office)}
                className="text-gray-400 hover:text-white whitespace-nowrap transition-colors cursor-pointer"
              >
                {office}
              </button>
            ))}
          </div>
        </div>

        {/* Office Details Modal */}
        <AnimatePresence>
          {selectedOffice && officeDetails[selectedOffice] && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleCloseModal}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] sm:w-full max-w-md bg-white rounded-lg sm:rounded-xl shadow-xl p-4 sm:p-6 max-h-[90vh] overflow-y-auto"
                style={{ margin: 0 }}
              >
                <div className="flex justify-between items-start mb-3 sm:mb-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 pr-2">{selectedOffice}</h3>
                  <button
                    onClick={handleCloseModal}
                    className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0 p-1"
                    aria-label="Close modal"
                  >
                    <FiX className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                </div>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-start space-x-2 sm:space-x-3">
                    <FiMapPin className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mt-1 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm text-gray-500 mb-1">Address</p>
                      <p className="text-sm sm:text-base text-gray-900 break-words">{officeDetails[selectedOffice].address}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2 sm:space-x-3">
                    <FiPhone className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mt-1 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm text-gray-500 mb-1">Phone</p>
                      <a 
                        href={`tel:${officeDetails[selectedOffice].phone}`} 
                        className="text-sm sm:text-base text-blue-600 hover:text-blue-700 break-all"
                      >
                        {officeDetails[selectedOffice].phone}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2 sm:space-x-3">
                    <FiMail className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mt-1 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm text-gray-500 mb-1">Email</p>
                      <a 
                        href={`mailto:${officeDetails[selectedOffice].email}`} 
                        className="text-sm sm:text-base text-blue-600 hover:text-blue-700 break-all"
                      >
                        {officeDetails[selectedOffice].email}
                      </a>
                    </div>
                  </div>
                </div>
                <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200">
                  <Link
                    href="/contact"
                    className="block w-full text-center px-4 py-2.5 sm:py-2 text-sm sm:text-base bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    onClick={handleCloseModal}
                  >
                    Contact This Office
                  </Link>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Legal Notice */}
        <div className="border-t border-gray-800 pt-6 mt-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <p className="text-gray-400 text-sm max-w-3xl">
              Notice: We appreciate your interest in HilbrickRockle. If your inquiry relates to a legal matter and you are not already a current client of the firm, please do not transmit any confidential information to us.
            </p>
            <div className="text-gray-400 text-sm whitespace-nowrap">
              © {new Date().getFullYear()} HilbrickRockle. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 