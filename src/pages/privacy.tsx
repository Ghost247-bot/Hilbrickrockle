import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Link from 'next/link';

const PrivacyPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Privacy Policy - Hilbrick-Rockle LAW</title>
        <meta name="description" content="Read our privacy policy and learn how we protect your personal information." />
      </Head>

      {/* Hero Section */}
      <section className="relative h-[40vh] bg-gradient-to-br from-blue-900 to-indigo-900 text-white">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Privacy Policy</h1>
            <p className="text-xl text-blue-100">Last Updated: March 2024</p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="prose prose-lg max-w-none"
          >
            <h2 className="text-3xl font-bold mb-6">1. Introduction</h2>
            <p className="text-gray-700 mb-6">
              Hilbrick-Rockle LAW (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy 
              explains how we collect, use, disclose, and safeguard your information when you visit our website 
              and use our services.
            </p>

            <h2 className="text-3xl font-bold mb-6 mt-12">2. Information We Collect</h2>
            
            <h3 className="text-2xl font-semibold mb-4 mt-8">2.1 Personal Information</h3>
            <p className="text-gray-700 mb-4">
              We may collect personal information that you voluntarily provide to us when you:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
              <li>Register for an account on our website</li>
              <li>Subscribe to our newsletter or publications</li>
              <li>Request legal services or consultations</li>
              <li>Contact us through our website forms</li>
              <li>Participate in surveys or events</li>
            </ul>

            <h3 className="text-2xl font-semibold mb-4 mt-8">2.2 Automatically Collected Information</h3>
            <p className="text-gray-700 mb-6">
              When you visit our website, we may automatically collect certain information about your device and 
              browsing behavior, including IP address, browser type, operating system, access times, and pages visited.
            </p>

            <h2 className="text-3xl font-bold mb-6 mt-12">3. How We Use Your Information</h2>
            <p className="text-gray-700 mb-4">We use the information we collect to:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
              <li>Provide, maintain, and improve our legal services</li>
              <li>Respond to your inquiries and requests</li>
              <li>Send you newsletters, legal updates, and marketing communications (with your consent)</li>
              <li>Monitor and analyze website usage and trends</li>
              <li>Prevent fraud and ensure security</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2 className="text-3xl font-bold mb-6 mt-12">4. Information Sharing and Disclosure</h2>
            <p className="text-gray-700 mb-4">We may share your information in the following circumstances:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
              <li><strong>Service Providers:</strong> We may share information with third-party service providers who perform services on our behalf</li>
              <li><strong>Legal Requirements:</strong> We may disclose information when required by law or to protect our rights</li>
              <li><strong>Business Transfers:</strong> Information may be transferred in connection with a merger or acquisition</li>
              <li><strong>With Your Consent:</strong> We may share information with your explicit consent</li>
            </ul>

            <h2 className="text-3xl font-bold mb-6 mt-12">5. Data Security</h2>
            <p className="text-gray-700 mb-6">
              We implement appropriate technical and organizational security measures to protect your personal 
              information. However, no method of transmission over the internet or electronic storage is 100% 
              secure, and we cannot guarantee absolute security.
            </p>

            <h2 className="text-3xl font-bold mb-6 mt-12">6. Your Rights and Choices</h2>
            <p className="text-gray-700 mb-4">Depending on your location, you may have certain rights regarding your personal information:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
              <li><strong>Access:</strong> Request access to your personal information</li>
              <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
              <li><strong>Deletion:</strong> Request deletion of your personal information</li>
              <li><strong>Objection:</strong> Object to processing of your personal information</li>
              <li><strong>Portability:</strong> Request transfer of your personal information</li>
              <li><strong>Withdrawal:</strong> Withdraw consent where processing is based on consent</li>
            </ul>

            <h2 className="text-3xl font-bold mb-6 mt-12">7. Cookies and Tracking Technologies</h2>
            <p className="text-gray-700 mb-6">
              We use cookies and similar tracking technologies to collect and store information about your 
              preferences and browsing behavior. You can set your browser to refuse cookies, but this may 
              affect website functionality.
            </p>

            <h2 className="text-3xl font-bold mb-6 mt-12">8. International Data Transfers</h2>
            <p className="text-gray-700 mb-6">
              Your information may be transferred to and processed in countries other than your country of 
              residence. We ensure appropriate safeguards are in place to protect your information in accordance 
              with this Privacy Policy.
            </p>

            <h2 className="text-3xl font-bold mb-6 mt-12">9. Children&apos;s Privacy</h2>
            <p className="text-gray-700 mb-6">
              Our services are not intended for individuals under the age of 18. We do not knowingly collect 
              personal information from children.
            </p>

            <h2 className="text-3xl font-bold mb-6 mt-12">10. Changes to This Privacy Policy</h2>
            <p className="text-gray-700 mb-6">
              We may update this Privacy Policy from time to time. We will notify you of any material changes 
              by posting the new Privacy Policy on our website and updating the &quot;Last Updated&quot; date.
            </p>

            <h2 className="text-3xl font-bold mb-6 mt-12">11. Contact Us</h2>
            <p className="text-gray-700 mb-6">
              If you have questions about this Privacy Policy or wish to exercise your rights, please contact us:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <p className="text-gray-700 mb-2">
                <strong>Hilbrick-Rockle LAW</strong><br />
                Email: privacy@hrlaw.com<br />
                Phone: +1 (555) 123-4567<br />
                Address: 123 Legal Avenue, Suite 100, City, State 12345
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer Links */}
      <section className="py-8 bg-gray-50 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-6 justify-center">
            <Link href="/terms" className="text-blue-600 hover:text-blue-700">
              Terms of Service
            </Link>
            <Link href="/contact" className="text-blue-600 hover:text-blue-700">
              Contact Us
            </Link>
            <Link href="/" className="text-blue-600 hover:text-blue-700">
              Home
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default PrivacyPage;

